# Programmatic SEO Strategy

## Approach

Location-based programmatic SEO targeting Northern California service areas. A matrix of **12 cities x 2 services** generates **24 landing pages** at `/services/[city]/[service]`, all statically rendered at build time.

Adding a city or service means updating the data arrays — every page, sitemap entry, and schema block regenerates automatically.

## Data sources

| File | Drives |
|------|--------|
| `src/lib/data/service-areas.ts` | City list (slug, county, zip) and service definitions (slug, descriptions, keywords, benefits, process steps) |
| `src/lib/data/sales.ts` | Active estate sale events (feeds Event schema on `/estate-sales`) |
| `src/lib/data/testimonials.ts` | Client quotes, ratings, aggregate stats |
| `src/lib/data/faqs.tsx` | FAQ content in JSX + plain-text (plain-text version ready for FAQPage schema) |

## How pages are templated

Each service object in `service-areas.ts` contains **functions** (not static strings) that accept city/county and return tailored copy:

- `description(city, county)` — page body content
- `metaDescription(city, county)` — meta description with phone number baked in
- `keywords(city, county)` — keyword array with city/county variations
- Benefits array, process steps, and cross-link text for sibling services

`generateStaticParams()` produces all city/service combos. `generateMetadata()` templates title tags, descriptions, canonical URLs, geo meta tags, and OpenGraph/Twitter cards per combination.

## Structured data (JSON-LD)

All schema lives in `src/lib/schema.ts`, rendered via `src/components/seo/JsonLd.tsx`.

| Schema | Where | Purpose |
|--------|-------|---------|
| `ProfessionalService` | Root layout (every page) | Business identity, hours, area served, service catalog, founder, social links |
| `Service` | `/estate-sales`, `/estate-liquidation`, `/appraisals` layouts | Individual service markup |
| `BreadcrumbList` | Service pages + service area pages | Navigation hierarchy |
| `ServiceArea` | `/services/[city]/[service]` | City + county area served, localized description |
| `Event` | `/estate-sales` layout | One per active sale (date-gated via `isSaleActive()`) |

FAQPage schema is staged (`faqPlainText` in `faqs.tsx`) but not yet wired up.

## Sitemap and crawl config

- **`src/app/sitemap.ts`** — dynamically includes all static pages + all 24 service area pages with priority tiers (home 1.0, core services 0.8–0.9, service areas 0.5–0.7)
- **`src/app/robots.ts`** — allow all, points to sitemap
- **Canonical URLs** on every page to prevent duplicate content
- **301 redirect:** `/estatesales` → `/estate-sales` (in `next.config.ts`)

## Metadata strategy

- **Static pages:** centralized in `src/lib/metadata.ts` via `getPageMetadata(page)` — title, description, keywords, robots, canonical, geo tags, OG/Twitter cards
- **Dynamic pages:** `generateMetadata()` in the route file — same fields, templated per city/service
- **Geo targeting:** `geo.region` (US-CA) and `geo.placename` (city name) meta tags on all pages
- **Shared OG image:** `/og-image.jpg` (1200x630) — no dynamic generation yet

## Internal linking

Service area pages cross-link to:
- The parent service page (`/estate-sales` or `/appraisals`)
- The sibling service in the same city (estate sales ↔ appraisals)

This creates a tight mesh between the programmatic pages and the core service pages.

## Key conventions

- All 24 pages are **fully static** (no SSR, no ISR) — built at `next build` time
- Content variations are **meaningful, not spun** — descriptions reference county-specific details and local context
- Phone number `(916) 521-1077` is embedded directly in meta descriptions for click-to-call from SERPs
- Estate sale Event schema is date-gated: sales drop off after 5 PM on their end date
