# Programmatic SEO — Service Area Pages

## Overview

Generate a landing page for every **service x city** combination. These pages are NOT linked from the site navigation — they exist solely for Google indexing via the sitemap. Each page funnels organic search traffic back to the main service pages and contact page.

**Primary keyword focus: "estate sales"** — this is the money term. Every page should lead with "estate sales" in titles, H1s, and content. Secondary terms like "estate liquidation" and "appraisals" get woven in but "estate sales in {City}" is the #1 target across the board.

---

## Keyword Strategy

The primary goal is to rank for **"estate sales in {city}"** for every city in our service area. This is the high-intent keyword that drives revenue.

| Priority | Keyword Pattern | Example |
|----------|----------------|---------|
| **Primary** | "estate sales in {city}" | "estate sales in Roseville" |
| **Secondary** | "estate sale companies {city}" | "estate sale companies Elk Grove" |
| **Secondary** | "estate liquidation {city}" | "estate liquidation Folsom" |
| **Tertiary** | "estate sale services near {city}" | "estate sale services near Auburn" |
| **Tertiary** | "personal property appraisals {city}" | "personal property appraisals Sacramento" |

The estate sales pages should also naturally include long-tail variations: "estate sale company in {city}", "estate sales near {city}", "estate sale service {county} county", "{city} estate sale help".

---

## Services (2)

Estate sales and estate liquidation are the same service (we liquidate the estate by hosting a sale), so they're combined into one page that targets both keyword sets. Estate sales pages are the priority — they're the revenue driver.

| Slug | Service Name | Priority | Links Back To |
|------|-------------|----------|---------------|
| `estate-sales` | Estate Sales & Liquidation | **Primary** | `/estate-sales`, `/estate-liquidation` |
| `appraisals` | Personal Property Appraisals | Secondary | `/appraisals` |

## Cities (12)

Primary service area cities across Sacramento, Placer, El Dorado, and Yolo counties:

| City | County | Slug |
|------|--------|------|
| Sacramento | Sacramento | `sacramento` |
| Citrus Heights | Sacramento | `citrus-heights` |
| Elk Grove | Sacramento | `elk-grove` |
| Rancho Cordova | Sacramento | `rancho-cordova` |
| West Sacramento | Yolo | `west-sacramento` |
| Roseville | Placer | `roseville` |
| Rocklin | Placer | `rocklin` |
| Lincoln | Placer | `lincoln` |
| Auburn | Placer | `auburn` |
| Folsom | Sacramento | `folsom` |
| Placerville | El Dorado | `placerville` |
| El Dorado Hills | El Dorado | `el-dorado-hills` |

**Total pages: 2 services x 12 cities = 24 pages**

> This list can be expanded later (e.g., Davis, Woodland, Loomis, Granite Bay, Fair Oaks, Carmichael, Orangevale, Yuba City). Adding a city means adding one entry to the data array — no new code.

---

## URL Structure

```
/services/{city-slug}/{service-slug}
```

Examples:
- `/services/roseville/estate-sales`
- `/services/folsom/appraisals`

**Why city first:** Groups all services for a city under one path segment, which is cleaner for Google and allows potential future city-level index pages.

---

## Implementation Approach

### Data Layer — `src/lib/data/service-areas.ts`

A single data file defines everything needed to generate all 24 pages:

```ts
type ServiceArea = {
  city: string;
  slug: string;
  county: string;
  state: string;
  zip: string; // representative zip for geo meta
};

type ServiceType = {
  name: string;
  slug: string;
  parentPath: string; // main service page to link back to
  shortDescription: string;
  keywords: string[];
  // content blocks for the page template
  intro: string;
  benefits: string[];
  process: { title: string; description: string }[];
};
```

Each page's content is composed from the combination of the city data + service data, with city name interpolated into templates. This avoids duplicate content issues by making each page contextually relevant to its location.

### Page Route — `src/app/services/[city]/[service]/page.tsx`

Next.js dynamic route using `generateStaticParams()` to produce all 24 pages at build time.

```ts
export async function generateStaticParams() {
  return cities.flatMap((city) =>
    services.map((service) => ({
      city: city.slug,
      service: service.slug,
    }))
  );
}
```

### Page Template Structure

Each generated page follows a consistent layout:

1. **H1** — "Estate Sales in {City}, CA" (for estate sales pages) / "Personal Property Appraisals in {City}, CA"
2. **Intro paragraph** — 2-3 sentences leading with "estate sales" naturally, mentioning the city and county
3. **Why choose ABE** — Trust signals (20+ years, insured, bonded, BBB accredited)
4. **Service details** — What's included (pulled from service data)
5. **Service area context** — "Serving {City} and surrounding {County} County communities"
6. **CTA section** — "Schedule Your Free Consultation" linking to `/contact`
7. **Breadcrumbs** — Home > Estate Sales > {City}

For estate sales pages, the word "estate sales" should appear in the H1, first paragraph, at least one subheading, and the CTA — without keyword stuffing.

### SEO Per Page

**Metadata** (via `generateMetadata()`):
- Title: `"Estate Sales in {City}, CA | Attic To Basement Estate Liquidators"` (estate sales pages) / `"Personal Property Appraisals in {City}, CA | ..."` (appraisal pages)
- Description: Leads with "estate sales in {City}" for estate sales pages, unique per city
- Canonical: self-referencing
- Geo tags: `geo.region: "US-CA"`, `geo.placename: "{City}"`
- Keywords: `["{service} {city}", "{service} {county} county", ...]`
- Open Graph tags

**Schema.org JSON-LD:**
- `Service` schema with `areaServed` set to the specific city
- `BreadcrumbList` schema
- `LocalBusiness` reference

**Sitemap:**
- All 24 pages added via the existing `sitemap.ts`
- Estate sales pages: Priority `0.7` (these are the money pages)
- Appraisal pages: Priority `0.5`
- Change frequency: `monthly`

### What These Pages Do NOT Have

- No link from Header, Footer, or any navigation
- No fancy sections or animations (simple, content-focused layout)
- No duplicate content from main service pages (unique templates)

---

## Internal Linking Strategy

Each service area page links to:
- The **parent service page** (e.g., `/estate-sales`) — "Learn more about our estate sale services"
- The **contact page** (`/contact`) — primary CTA
- The **reviews page** (`/reviews`) — social proof
- Other services in the same city (cross-link) — "We also offer {other service} in {City}"

This creates a hub-and-spoke model where service area pages point inward to the main site pages, passing link equity and funneling users.

---

## Content Differentiation Strategy

To avoid thin/duplicate content penalties, each page will have:

1. **City-specific intro** — Mentions the city name, county, and regional context naturally
2. **Service-specific content** — Each of the 2 services has distinct content blocks. The estate sales page targets both "estate sales" and "estate liquidation" keywords.
3. **Cross-linking** — Different internal link patterns per page
4. **Unique meta descriptions** — Templated but with city/county/service variations

The combination of `2 services x 12 cities` with templated-but-varied content creates sufficiently unique pages.

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/lib/data/service-areas.ts` | **Create** — City and service data |
| `src/app/services/[city]/[service]/page.tsx` | **Create** — Dynamic route with template |
| `src/lib/metadata.ts` | **Edit** — Add helper for service area page metadata |
| `src/lib/schema.ts` | **Edit** — Add service area schema generator |
| `src/app/sitemap.ts` | **Edit** — Add service area pages to sitemap |

---

## Future Expansion

- **Add cities** — Add an entry to the cities array, rebuild. Zero new code.
- **Add services** — Add a service entry with content blocks, rebuild.
- **City index pages** — `/services/roseville` listing all services in that city (if needed later)
- **County pages** — `/services/sacramento-county` for broader targeting
