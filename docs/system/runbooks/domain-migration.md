# Domain migration: abeliquidators.com → attictobasement.com

Audit date: October 28, 2026. Canonical origin: `https://attictobasement.com`.

Kyle will handle Vercel and Search Console account changes. No account changes or profile edits were performed during this implementation.

## Application change

`src/lib/site.ts` is the single production origin for canonical tags, Open Graph URLs/images, root metadata base, structured-data identities/URLs, sitemap URLs, and robots.txt. Resource and city/service metadata use the same origin through the metadata module. The refresh-link documentation also uses the new domain.

Do not replace the separate `log.abeliquidators.com` intake service, Gmail address, or social handles as part of this website-domain change. Resource publishing/noindex settings remain as configured.

Local validation passed: ESLint, production build/TypeScript, and generated-output assertions for all 36 unique sitemap entries, matching new-domain canonical and Open Graph URLs, new-domain business schema, no old-origin strings in those HTML files, and the corrected robots sitemap directive.

Existing indexing exception: the three resource articles in the sitemap inherit `noindex, nofollow` from `src/app/resources/layout.tsx`, which explicitly marks Resources as draft. This change preserves that publishing decision. Before treating all 36 entries as indexing targets, decide whether to publish those articles or exclude them from the sitemap. Do not silently remove their noindex setting during the domain migration.

## Live baseline before deployment

- All 36 sitemap entries and all 36 corresponding page canonicals still use `abeliquidators.com`.
- All 36 pages on the new apex domain return 200. All 36 old HTTPS apex paths redirect once with 308 to their matching new paths and return 200.
- robots.txt points to `https://abeliquidators.com/sitemap.xml`.
- Internal page links found across the 36 pages resolve successfully. `/resources` also returns 200 and remains intentionally noindex. No old-domain website anchors were found in those pages.
- 64 samples cover all eight combinations of HTTP/HTTPS and old/new apex/www hosts, using home, three services, contact, Sacramento estate sales, legacy `/estatesales`, and a query-string example. Query strings are preserved. This is sampled variant coverage, not proof of every historical path.
- A deliberately nonexistent old HTTPS apex path redirects once to the same new path and returns a genuine 404.

Full responses summarized in [redirect audit CSV](domain-migration-redirect-audit-2026-10-28.csv), including all 36 old sitemap paths.

| Source | Observed behavior for current paths | Required account follow-up |
| --- | --- | --- |
| `https://abeliquidators.com` | 308 directly to matching new apex path | Preserve |
| `https://www.abeliquidators.com` | **307** to matching new apex path | Change to permanent 308 or 301 |
| `http://abeliquidators.com` | 308 to old HTTPS, then 308 to new HTTPS | Evaluate edge routing to eliminate the extra hop |
| `http://www.abeliquidators.com` | 308 to old HTTPS www, then 307 to new apex | Make permanent and evaluate a direct destination |
| `https://attictobasement.com` | 200 | Canonical production host |
| `http://attictobasement.com` | 308 to canonical HTTPS | Preserve |
| `https://www.attictobasement.com` | **200 duplicate host** | Permanent redirect to new apex, preserving path/query |
| `http://www.attictobasement.com` | 308 to new HTTPS www, then 200 | Redirect to canonical apex; recheck hop count |

Legacy `/estatesales` currently redirects to `/estate-sales` in Next.js. On old HTTPS hosts this takes two redirects; old HTTP hosts take three. Configure a specific legacy-path destination before generic domain redirects where the hosting layer supports it. Do not assume changing `next.config.ts` can override an earlier hosting-level redirect. Vercel's HTTP-to-HTTPS routing may require separate treatment; verify actual responses after changes and document any remaining platform constraint. [Vercel redirect documentation](https://vercel.com/docs/routing/redirects).

## Kyle: Vercel and deployment verification

1. Deploy the reviewed code commit to production.
2. In the project's domain settings, make `attictobasement.com` the production destination. Set old www and new www to permanent redirects to `attictobasement.com`. Preserve old apex redirects, paths, and queries.
3. Resolve the HTTP and legacy-path chains at the earliest applicable routing layer. Keep old domains and TLS active. Never redirect all old paths to the homepage.
4. Verify the live sitemap has exactly 36 unique new-domain URLs (unless content changes), all returning 200 with matching new-domain canonicals and no unexpected noindex. Verify robots.txt references `https://attictobasement.com/sitemap.xml` and structured data/Open Graph use the new origin.
5. Repeat the CSV samples after routing changes: require permanent statuses, matching final path/query, no loops, and one hop where supported. Check a nonexistent old path still ends at a genuine 404. Add any important historical paths from GSC before claiming complete historical coverage.

## Kyle: Search Console, after technical validation

1. Use an account with owner access to both old and new properties. Verify old www/non-www coverage and check for an already-active Change of Address before submitting another request.
2. Open the old property's Settings → Change of Address, select the new property, run Google's checks, and complete or verify the move. Record source, target, date, and the actual status shown. Google's tool does not automatically include subdomains such as www; verify the applicable old variants separately. [Google's Change of Address instructions](https://support.google.com/webmasters/answer/9370220).
3. In the new property, submit `https://attictobasement.com/sitemap.xml`. Record submission time, processing status, discovered URL count, and errors. Submission is not proof of indexing.
4. Use URL Inspection for `/`, `/estate-sales`, `/estate-liquidation`, `/appraisals`, `/contact`, and Cortnee's priority city/service URLs. Record indexed status and Google's selected canonical. Request indexing where appropriate; leave processing data marked pending.
5. Export comparable dates, search type, and filters for disjoint old/new properties. Sum clicks and impressions across domains; do not double-count overlapping domain and URL-prefix properties. Track weekly totals and a comparable 28-day baseline, plus important URL indexing/canonical status. Annotate deployment and Change of Address dates. Do not infer an immediate uplift from migration or an apparent old-to-new traffic shift.

No authenticated GSC baseline, indexing results, Change of Address status, or sitemap submission was available during this audit.

## Cortnee: profiles and priority URLs

Suggested initial service URLs to confirm: `/estate-sales`, `/estate-liquidation`, `/appraisals`, and the priority city/service pages. These are audit samples, not confirmed business priorities.

| Profile | Evidence and action |
| --- | --- |
| [EstateSales.org](https://estatesales.org/estate-sale-companies/attic-to-basement-estate-liquidators-23935) | Live HTTP 200; page links to `http://www.abeliquidators.com`. Update website to `https://attictobasement.com/`. |
| [BBB](https://www.bbb.org/us/ca/sacramento/profile/estate-liquidators/attic-to-basement-estate-liquidators-1156-90098497) | Web reader shows old apex website link (crawl reported two days old); direct request blocked with 403. Confirm in account and update. |
| [Yelp](https://www.yelp.com/biz/attic-to-basement-estate-liquidators-sacramento) | Cached web reader shows old www website link; direct request blocked with 403. Cached evidence is stale; verify current account value. |
| [EstateSales.net](https://www.estatesales.net/companies/CA/Sacramento/95821/156176) | HTTP 200 but JavaScript shell prevents website-field verification. Schema uses Citrus Heights/95610 for the same company ID while footer/reviews use Sacramento/95821. Confirm preferred profile URL before consolidating. |
| Google Business Profile and social accounts | Website-field values not verified. Confirm public profile URLs and set website fields to the new apex. The rendered pages include both TikTok handles `@abeliquidators` and `@attic.to.basement`; confirm the authoritative handle before changing links. |

These are account follow-ups, not completed profile updates. Do not interpret anti-bot responses as broken public profiles.
