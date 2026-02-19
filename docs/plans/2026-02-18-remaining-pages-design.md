# Remaining Pages Design

## Summary

Flesh out the 5 existing secondary pages (currently Hero + CTA shells) and add a new `/contact` page. All pages use existing UI components with light Intersection Observer scroll reveals. Content is hardcoded in TypeScript data files, structured for future CMS extraction.

## Pages

### 1. `/estate-sales` — Upcoming Sales

Serves the buyer audience with browsable sale listings.

**Sections:**
1. **Hero** (existing) — "Upcoming Estate Sales" / "Browse our current and upcoming sales. Addresses are posted at 6 AM on sale day."
2. **Sale Listings** — Grid of `SaleCard` components showing: sale dates, general area, preview image placeholder, item categories (tags), link to EstateSales.net listing
3. **Empty State** — Shown when `sales` array is empty: "No upcoming sales right now. Follow us on Instagram or check back soon."
4. **Cross-sell CTA** — "Have a home that needs an estate sale? Schedule a free consultation." Links to /contact
5. **ConsultationCTA** (existing)

**New component:** `SaleCard` — date, area, categories, external link
**Data file:** `lib/data/sales.ts` — typed `Sale[]` array

### 2. `/estate-liquidation` — Liquidation Services

Detail page for estate sales management, buyouts, and cleanout services.

**Sections:**
1. **Hero** (existing) — keep current title/subtitle
2. **Service Blocks** — 3 expanded `Card` components:
   - **Estate Sales** — Full-service estate sale management. Organize, stage, price, market, execute, clean up. Itemized accounting. Remaining items handled through buyout, donation, or disposal.
   - **Estate Buyouts** — Fair offer on entire contents. Quick, clean, straightforward. For when speed matters more than maximizing individual item value.
   - **Cleanouts** — Post-sale, post-buyout, or standalone. Clear out and clean up. Donation coordination with nonprofit of client's choice.
3. **Differentiators Strip** — Callout bar with: Fully insured and bonded, All certifications and licenses, 20+ years combined experience, Tailored plans, Post-sale donation coordination
4. **ConsultationCTA** (existing) — "Not sure which service you need? Start with a free consultation."

**New components:** None

### 3. `/appraisals` — Appraisal Services

Detail page for personal property appraisal services.

**Sections:**
1. **Hero** (existing) — keep current title/subtitle
2. **What We Appraise** — Grid of category cards: Household Goods, Antiques, Collectibles, Furniture, Fine Art, Jewelry & Accessories
3. **When You Need an Appraisal** — Use case list with icons: Estate sale preparation, Insurance documentation, Legal/probate proceedings, Divorce settlements, Charitable donation valuation
4. **Credentials** — Certified appraisals, Market-informed assessments, 20+ years experience
5. **ConsultationCTA** (existing) — "Need an accurate valuation?"

**New components:** None — uses `Card` and `SectionHeading`

### 4. `/our-promise` — About & Values

Builds trust. Shows the humans behind the business.

**Sections:**
1. **Hero** (existing) — "The People Behind the Promise"
2. **Cortnee's Story** — Two-column: image placeholder (left) + bio paragraph (right). Placeholder copy in brand voice following the framework: "Cortnee Beggs started ABE Liquidators because [origin]. After [X years], she has built a team that [core value]. Her approach is simple: [philosophy]."
3. **Our Values** — 5 value blocks in a responsive grid:
   - Trust & Transparency
   - Expertise You Can Rely On
   - Confidentiality & Respect
   - Efficiency Without Shortcuts
   - Good Neighbors
4. **Credentials Strip** — BBB Accredited, Insured & Bonded, Licensed & Certified
5. **CTA** — "See what our clients have to say." links to /reviews

**New components:** None — `Card` for value blocks, inline layout for bio

### 5. `/reviews` — Testimonials

Dedicated social proof page.

**Sections:**
1. **Hero** (existing) — "What Families Are Saying" / star rating in subtitle
2. **Category Filter** — Tag buttons: All, Settling an Estate, Downsizing, Buyer Experience. Client-side filter with `useState`.
3. **Testimonial Grid** — CSS columns masonry layout, `TestimonialCard` components. Shows all testimonials from shared data file (8-12+).
4. **External Platform Links** — Buttons to Yelp, BBB, EstateSales.org, EstateSales.net profiles
5. **ConsultationCTA** (existing)

**Data file:** `lib/data/testimonials.ts` — all testimonials with `category` field. Homepage `SocialProof` imports a curated subset.

### 6. `/contact` — New Page

Dedicated conversion endpoint.

**Sections:**
1. **Hero** (existing, new "contact" color scheme) — "Let Us Take It From Here" / "Schedule your free consultation or reach out with any questions."
2. **Two-Column Layout:**
   - Left: `ConsultationForm` (existing component, enhanced with situation dropdown)
   - Right: Contact info — phone (916) 521-1077, "Available 24/7", Sacramento CA 95821, Instagram @abe.liquidators, service area note
3. **Reassurance Line** — "We typically respond within 24 hours. Your information stays private, always."

**New:** Add "contact" color scheme to Hero component. Update nav "Free Consultation" button to link to `/contact`.

## Shared Infrastructure

### Data Files

**`lib/data/testimonials.ts`**
```typescript
interface Testimonial {
  quote: string;
  name: string;
  source: "Yelp" | "BBB" | "EstateSales.org" | "EstateSales.net";
  rating: number;
  category: "settling" | "downsizing" | "buyer";
}
```
- Contains all testimonials (8-12+)
- Homepage `SocialProof` imports top 5 by index
- Reviews page imports all

**`lib/data/sales.ts`**
```typescript
interface Sale {
  id: string;
  title: string;
  dates: string;
  area: string;
  categories: string[];
  externalUrl?: string;
  imageAlt?: string;
}
```

### Scroll Reveal

Lightweight `useScrollReveal` hook using Intersection Observer:
- Targets elements with `data-reveal` attribute
- Applies `opacity: 0 -> 1` and `translateY: 20px -> 0` transition
- `threshold: 0.1`, triggers once
- Respects `prefers-reduced-motion` (skips animation)
- Used on all secondary pages, not the homepage (which has GSAP)

### Navigation Update

Header "Free Consultation" button: `/#consultation` -> `/contact`

### Form Enhancement

Add `situation` dropdown to `ConsultationForm`:
- Options: Settling an estate, Downsizing, Property cleanout, Appraisal needed, Buying at a sale, Other
- Positioned after city/zip field

### Metadata

Add `contact` entry to `lib/metadata.ts` for the new page.

## Animation Approach

All secondary pages use the same pattern:
- No GSAP on secondary pages
- Intersection Observer via `useScrollReveal` hook
- Simple CSS transitions: `opacity` and `transform`
- 0.6s duration, ease-out
- Staggered delays for grid items (0.1s increments)
- Respects `prefers-reduced-motion`

## Component Inventory

| Component | Status | Used By |
|-----------|--------|---------|
| Hero | Existing (add "contact" scheme) | All pages |
| ConsultationCTA | Existing | All pages |
| ConsultationForm | Existing (add dropdown) | Homepage, /contact |
| Card | Existing | /estate-liquidation, /appraisals, /our-promise |
| SectionHeading | Existing | All secondary pages |
| TestimonialCard | Existing | /reviews, homepage |
| Button | Existing | All pages |
| SaleCard | **New** | /estate-sales |
