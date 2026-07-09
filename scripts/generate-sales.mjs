#!/usr/bin/env node
/**
 * Deterministic generator for src/lib/data/sales.ts.
 *
 * Reads the a2b-scrape /scrape JSON from stdin (or a file path argument) and
 * rewrites the `sales` array in sales.ts, implementing the rules from
 * docs/system/runbooks/update-estate-sales.md that were previously applied by
 * a Claude CLI session:
 *   - estatesales.net is the source of truth; .org supplies externalUrlOrg
 *   - replace the array, never append; past sales drop out
 *   - dates span first–last day, en dash, " | " before the time range
 *
 * Exits non-zero on malformed/failed scrape input so the caller aborts
 * instead of wiping good data. A successful scrape with zero listings is
 * legitimate and writes an empty array.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SALES_FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "lib", "data", "sales.ts");

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

// Ordered keyword → category map applied to title + description.
// First match wins per category; listings get 3–5 categories, padded
// from DEFAULT_CATEGORIES when keywords are sparse.
const CATEGORY_RULES = [
    [/\bcars?\b|vehicles?\b|automobile/i, "Cars"],
    [/motorcycles?\b|harley/i, "Motorcycles"],
    [/mid.?century|\bmcm\b/i, "Mid-Century Furniture"],
    [/jewelry|jewellery|glitz|diamonds?\b|sterling silver/i, "Jewelry"],
    [/\bglam\b|fashion|clothing|handbags?|purses?|apparel/i, "Fashion"],
    [/furniture/i, "Furniture"],
    [/antiques?\b/i, "Antiques"],
    [/collect/i, "Collectibles"],
    [/vintage|retro/i, "Vintage"],
    [/eclectic/i, "Eclectic"],
    [/\bart\b|paintings?\b|artwork/i, "Art"],
    [/\btools?\b|workshop/i, "Tools"],
    [/vinyl|\brecords\b/i, "Vinyl Records"],
    [/\bbooks?\b/i, "Books"],
    [/\bchina\b|crystal|glassware|porcelain/i, "Glassware"],
    [/\bcoins?\b/i, "Coins"],
    [/\btoys?\b|\bdolls?\b/i, "Toys"],
    [/fishing|hunting|camping|outdoorsman/i, "Outdoors"],
    [/decor/i, "Home Decor"],
];

const DEFAULT_CATEGORIES = ["Antiques", "Collectibles", "Vintage"];

function main() {
    const input = process.argv[2]
        ? readFileSync(process.argv[2], "utf8")
        : readFileSync(0, "utf8");

    let scrape;
    try {
        scrape = JSON.parse(input);
    } catch {
        fail("Input is not valid JSON");
    }

    if (scrape.success !== true) {
        fail(`Scrape reported failure: ${JSON.stringify(scrape.sources ?? scrape.error ?? scrape)}`);
    }
    if (scrape.sources?.estatesales_net?.status !== "ok") {
        fail(`estatesales.net source not ok: ${JSON.stringify(scrape.sources)}`);
    }
    if (!Array.isArray(scrape.listings)) {
        fail("Scrape JSON has no listings array");
    }

    const listings = [...scrape.listings].sort((a, b) =>
        (a.startDate + a.endDate + a.id).localeCompare(b.startDate + b.endDate + b.id),
    );

    for (const listing of listings) {
        for (const field of ["id", "title", "startDate", "endDate", "city", "state", "sourceUrl"]) {
            if (!listing[field]) {
                fail(`Listing ${listing.id ?? "(no id)"} is missing required field "${field}"`);
            }
        }
    }

    if (listings.length === 0) {
        console.warn("WARNING: scrape succeeded with zero listings — writing an empty sales array");
    }

    const entries = listings.map((listing) => ({
        id: "", // assigned below once all titles/cities are known
        title: listing.title,
        dates: formatDates(listing),
        startDate: listing.startDate,
        endDate: listing.endDate,
        area: `${listing.city}, ${listing.state}`,
        categories: deriveCategories(listing),
        externalUrlNet: listing.sourceUrl,
        externalUrlOrg: listing.altUrl || undefined,
    }));
    assignIds(entries, listings);

    writeSalesFile(entries);

    console.log(`Generated ${entries.length} sale(s):`);
    for (const entry of entries) {
        console.log(`  - ${entry.id} | ${entry.dates}${entry.externalUrlOrg ? "" : " | NOTE: no .org URL matched"}`);
    }
}

/** "carmichael-july-2026"; collisions add title words, then the sale number. */
function assignIds(entries, listings) {
    const base = (entry) => `${slugify(entry.area.split(",")[0])}-${monthName(entry.startDate).toLowerCase()}-${entry.startDate.slice(0, 4)}`;

    const counts = new Map();
    for (const entry of entries) {
        counts.set(base(entry), (counts.get(base(entry)) ?? 0) + 1);
    }

    const used = new Set();
    entries.forEach((entry, i) => {
        let id = base(entry);
        if (counts.get(id) > 1) {
            const citySlug = slugify(entry.area.split(",")[0]);
            const skip = new Set([...citySlug.split("-"), "and", "the", "of", "more", "a", "an"]);
            const titleWords = slugify(entry.title)
                .split("-")
                .filter((word) => !skip.has(word))
                .slice(0, 3)
                .join("-");
            id = `${citySlug}-${titleWords}-${monthName(entry.startDate).toLowerCase()}-${entry.startDate.slice(0, 4)}`;
        }
        if (used.has(id)) {
            id = `${id}-${listings[i].id.replace(/\D/g, "")}`;
        }
        used.add(id);
        entry.id = id;
    });
}

/** "July 9–11th, 2026 | 9 AM – 3 PM" (ordinal on the final day only). */
function formatDates(listing) {
    const [startYear, startMonth, startDay] = listing.startDate.split("-").map(Number);
    const [endYear, endMonth, endDay] = listing.endDate.split("-").map(Number);

    let dates;
    if (listing.startDate === listing.endDate) {
        dates = `${MONTH_NAMES[startMonth - 1]} ${ordinal(startDay)}, ${endYear}`;
    } else if (startMonth === endMonth && startYear === endYear) {
        dates = `${MONTH_NAMES[startMonth - 1]} ${startDay}–${ordinal(endDay)}, ${endYear}`;
    } else {
        dates = `${MONTH_NAMES[startMonth - 1]} ${startDay} – ${MONTH_NAMES[endMonth - 1]} ${ordinal(endDay)}, ${endYear}`;
    }

    const time = formatTimeRange(listing.startTime);
    return time ? `${dates} | ${time}` : dates;
}

/** "9am to 3pm" → "9 AM – 3 PM"; "9:30am to 2pm" → "9:30 AM – 2 PM". */
function formatTimeRange(startTime) {
    const match = (startTime || "").match(/^(\d{1,2}(?::\d{2})?)(am|pm)\s+to\s+(\d{1,2}(?::\d{2})?)(am|pm)$/i);
    if (!match) return "";
    return `${match[1]} ${match[2].toUpperCase()} – ${match[3]} ${match[4].toUpperCase()}`;
}

function deriveCategories(listing) {
    const text = `${listing.title} ${listing.description || ""}`;
    const categories = [];

    for (const [pattern, category] of CATEGORY_RULES) {
        if (categories.length >= 5) break;
        if (pattern.test(text) && !categories.includes(category)) {
            // "Mid-Century Furniture" subsumes plain "Furniture"
            if (category === "Furniture" && categories.includes("Mid-Century Furniture")) continue;
            categories.push(category);
        }
    }

    for (const fallback of DEFAULT_CATEGORIES) {
        if (categories.length >= 3) break;
        if (!categories.includes(fallback)) categories.push(fallback);
    }

    return categories;
}

function writeSalesFile(entries) {
    const current = readFileSync(SALES_FILE, "utf8");
    const marker = "export const sales: Sale[] = ";
    const markerIndex = current.indexOf(marker);
    if (markerIndex === -1) {
        fail(`Could not find "${marker}" in ${SALES_FILE}`);
    }

    const header = current.slice(0, markerIndex);
    const array = entries.length === 0
        ? "[];"
        : `[\n${entries.map(renderEntry).join("\n")}\n];`;

    writeFileSync(SALES_FILE, `${header}${marker}${array}\n`);
}

function renderEntry(entry) {
    const lines = [
        "    {",
        `        id: ${JSON.stringify(entry.id)},`,
        `        title: ${JSON.stringify(entry.title)},`,
        `        dates: ${JSON.stringify(entry.dates)},`,
        `        startDate: ${JSON.stringify(entry.startDate)},`,
        `        endDate: ${JSON.stringify(entry.endDate)},`,
        `        area: ${JSON.stringify(entry.area)},`,
        `        categories: [${entry.categories.map((c) => JSON.stringify(c)).join(", ")}],`,
        `        externalUrlNet:\n            ${JSON.stringify(entry.externalUrlNet)},`,
    ];
    if (entry.externalUrlOrg) {
        lines.push(`        externalUrlOrg:\n            ${JSON.stringify(entry.externalUrlOrg)},`);
    }
    lines.push("    },");
    return lines.join("\n");
}

function slugify(text) {
    return (text || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function monthName(isoDate) {
    return MONTH_NAMES[Number(isoDate.slice(5, 7)) - 1];
}

function ordinal(day) {
    const suffix = day % 100 >= 11 && day % 100 <= 13
        ? "th"
        : { 1: "st", 2: "nd", 3: "rd" }[day % 10] ?? "th";
    return `${day}${suffix}`;
}

function fail(message) {
    console.error(`ERROR: ${message}`);
    process.exit(1);
}

main();
