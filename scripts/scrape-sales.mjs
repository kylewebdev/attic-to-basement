#!/usr/bin/env node
/**
 * Self-contained estate-sales scraper (ported from the a2b-scrape repo so the
 * GitHub Actions workflow needs no cross-repo checkout). Prints the same JSON
 * shape as a2b-scrape's /scrape endpoint, consumed by generate-sales.mjs:
 *
 *   { success, scrapedAt, sources: { estatesales_net, estatesales_org }, listings }
 *
 * - EstateSales.NET is the sole listing source, fetched from the JSON API its
 *   Angular app uses. Each sale's description comes from the detail page's
 *   embedded SSR state (best effort).
 * - EstateSales.org is only fetched to attach each sale's .org URL as altUrl,
 *   matched by zip + title-slug prefix. Never fatal.
 *
 * Exits non-zero (with success:false JSON on stdout) if the .NET fetch fails.
 */

const NET = {
    name: "estatesales.net",
    baseUrl: "https://www.estatesales.net",
    apiPath: "/api/legacy/queries/companies/company-sales",
    orgId: 156176, // Attic to Basement Estate Liquidators
};

const ORG = {
    name: "estatesales.org",
    baseUrl: "https://estatesales.org",
    companyPath: "/estate-sale-companies/attic-to-basement-estate-liquidators-23935",
};

// Wall-clock timezone of the sales — the .NET API returns local times with a
// misleading "Z" suffix, so status math must use this zone, not the machine's.
const TIMEZONE = "America/Los_Angeles";

const BROWSER_HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
};

async function main() {
    const sources = {};
    let listings = [];

    const [netResult, orgResult] = await Promise.allSettled([
        scrapeNet(),
        fetchOrgSaleLinks(),
    ]);

    if (netResult.status === "fulfilled") {
        listings = netResult.value;
        sources.estatesales_net = { status: "ok", count: listings.length };
    } else {
        sources.estatesales_net = { status: "error", message: netResult.reason.message };
    }

    if (orgResult.status === "fulfilled") {
        attachOrgUrls(listings, orgResult.value);
        sources.estatesales_org = { status: "ok", matched: listings.filter((l) => l.altUrl).length };
    } else {
        sources.estatesales_org = { status: "error", message: orgResult.reason.message };
    }

    const success = netResult.status === "fulfilled";
    console.log(JSON.stringify({
        success,
        scrapedAt: new Date().toISOString(),
        sources,
        listings,
    }, null, 2));

    if (!success) process.exit(1);
}

// ─── EstateSales.NET ─────────────────────────────────────────────────

async function scrapeNet() {
    const query = encodeURIComponent(JSON.stringify({ orgId: NET.orgId }));
    const url = `${NET.baseUrl}${NET.apiPath}?query=${query}&explicitTypes=DateTime`;

    const res = await fetchWithRetry(url, { headers: { Accept: "application/json" } });
    const data = await res.json();

    if (!data || !Array.isArray(data.sales)) {
        throw new Error('Unexpected estatesales.net API response — missing "sales" array. The endpoint may have changed.');
    }

    const listings = data.sales
        .map(toListing)
        .filter((listing) => listing.status !== "ended");

    await Promise.allSettled(
        listings.map(async (listing) => {
            listing.description = await fetchDescription(listing);
        }),
    );

    return listings;
}

function toListing(sale) {
    const postal = sale.saleAddress?.postalCode || {};
    const start = sale.firstLocalStartDate?._value || "";
    const end = sale.lastLocalEndDate?._value || "";

    const firstDay = sale.months?.[0]?.dates?.[0];
    const startTime = firstDay
        ? `${formatTime(firstDay.localStartDate?._value || "")} to ${formatTime(firstDay.localEndDate?._value || "")}`
        : "";

    return {
        id: `esn-${sale.saleId}`,
        source: NET.name,
        sourceUrl: sale.saleUrl ? `${NET.baseUrl}${sale.saleUrl}` : "",
        altUrl: undefined,
        title: (sale.saleName || "").trim(),
        city: (postal.cityName || "").trim(),
        state: (postal.stateCode || "").trim(),
        zip: (postal.postalCodeNumber || "").trim(),
        startDate: start.slice(0, 10),
        startTime,
        endDate: end.slice(0, 10) || start.slice(0, 10),
        description: "",
        photoCount: sale.salePictureCount || undefined,
        status: deriveStatus(start, end),
    };
}

async function fetchDescription(listing) {
    try {
        const res = await fetchWithRetry(listing.sourceUrl, { retries: 1 });
        const html = await res.text();

        const stateMatch = html.match(
            /<script id="estatesales-net-state" type="application\/json">([\s\S]*?)<\/script>/,
        );
        if (!stateMatch) return "";

        const json = stateMatch[1]
            .replace(/&q;/g, '"')
            .replace(/&s;/g, "'")
            .replace(/&l;/g, "<")
            .replace(/&g;/g, ">")
            .replace(/&a;/g, "&");
        const state = JSON.parse(json);

        const saleId = listing.id.replace("esn-", "");
        const entity = state.NGRX_STATE?.["feature.traditionalSaleViewState"]?.entitiesById?.[saleId];
        return (entity?.plainTextDescription || "").trim();
    } catch {
        return "";
    }
}

function formatTime(localTimestamp) {
    const match = localTimestamp.match(/T(\d{2}):(\d{2})/);
    if (!match) return "";
    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const suffix = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    return minutes === "00" ? `${hours}${suffix}` : `${hours}:${minutes}${suffix}`;
}

function deriveStatus(start, end) {
    if (!start) return "upcoming";

    const now = new Intl.DateTimeFormat("sv-SE", {
        timeZone: TIMEZONE,
        dateStyle: "short",
        timeStyle: "medium",
    }).format(new Date()).replace(" ", "T");

    if (now < start.slice(0, 19)) return "upcoming";
    if (end && now > end.slice(0, 19)) return "ended";
    return "active";
}

// ─── EstateSales.org URL matching ────────────────────────────────────

const SALE_LINK_REGEX = /href="(\/estate-sales\/[a-z]{2}\/[a-z0-9-]+\/(\d{5})\/([a-z0-9-]+?)-(\d+))"/g;

async function fetchOrgSaleLinks() {
    const res = await fetchWithRetry(`${ORG.baseUrl}${ORG.companyPath}`);
    const html = await res.text();

    const linksByPath = new Map();
    for (const match of html.matchAll(SALE_LINK_REGEX)) {
        const [, path, zip, slug, saleId] = match;
        linksByPath.set(path, {
            url: `${ORG.baseUrl}${path}`,
            zip,
            slug,
            saleId: parseInt(saleId, 10),
        });
    }

    return [...linksByPath.values()].sort((a, b) => b.saleId - a.saleId);
}

function attachOrgUrls(listings, orgLinks) {
    const available = [...orgLinks];

    for (const listing of listings) {
        const titleSlug = slugify(listing.title);
        const candidates = available.filter((link) => link.zip === listing.zip);

        // The .org page also lists past sales, so an unmatched listing is left
        // without altUrl rather than guessed — a missing link beats a wrong one.
        const match = candidates
            .filter((link) => titleSlug.startsWith(link.slug) || link.slug.startsWith(titleSlug))
            .sort((a, b) => b.slug.length - a.slug.length)[0];

        if (match) {
            listing.altUrl = match.url;
            available.splice(available.indexOf(match), 1);
        } else {
            console.error(`[org-links] No estatesales.org link matched "${listing.title}" (${listing.zip})`);
        }
    }
}

function slugify(text) {
    return (text || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// ─── HTTP ────────────────────────────────────────────────────────────

async function fetchWithRetry(url, options = {}) {
    const retries = options.retries ?? 2;
    const timeoutMs = options.timeoutMs ?? 15_000;
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
        if (attempt > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
        try {
            const res = await fetch(url, {
                headers: { ...BROWSER_HEADERS, ...options.headers },
                signal: AbortSignal.timeout(timeoutMs),
                redirect: "follow",
            });
            if (!res.ok) {
                throw new Error(`HTTP ${res.status} for ${url}`);
            }
            return res;
        } catch (err) {
            lastError = err;
        }
    }

    throw lastError;
}

main();
