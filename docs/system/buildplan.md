Here's the updated build plan:

# Build Plan — Attic To Basement

## Feature — Production Ready (COMPLETE)

What's needed to go from "builds cleanly" to "ready for launch."

### Step 1: Schema.org structured data ✅

- [x] Add JSON-LD `LocalBusiness` schema to root layout (name, phone, address, geo, hours, logo, sameAs links)
- [x] Add `Service` schema to `/estate-sales`, `/estate-liquidation`, `/appraisals`
- [x] Add `Review` / `AggregateRating` schema to `/reviews`
- [x] Add `BreadcrumbList` schema to all interior pages
- [ ] Validate with Google Rich Results Test

### Step 2: Sitemap and robots.txt ✅

- [x] Add `sitemap.ts` to `src/app/` (Next.js auto-generates XML sitemap)
- [x] Add `robots.ts` to `src/app/` (allow all, reference sitemap URL)

### Step 3: PostHog analytics ✅

- [x] Install `posthog-js` dependency
- [x] Configure `instrumentation-client.ts` for Next.js 15.3+ initialization
- [x] Set up reverse proxy via `next.config.ts` rewrites (`/ingest` → PostHog)
- [x] Instrument 10 custom events across 7 files (form submissions, CTA clicks, phone clicks, nav opens, filter selections, external link clicks)
- [x] Create PostHog dashboard with 5 Insights
- [x] Update privacy policy to disclose PostHog tracking

### Step 4: Image optimization ✅

- [x] Add favicon and touch icons to `/public`
- [x] Add OG image (1200x630) for social sharing
- [x] Add OG/Twitter image metadata to `getPageMetadata()`
- [x] Replace Unsplash placeholder images with real client photos
- [ ] Add meaningful alt text describing final image content

### Step 5: 404 page ✅

- [x] Create `src/app/not-found.tsx` with branded styling
- [x] Include nav back to homepage and consultation CTA
- [x] Match site design language

### Step 6: Accessibility audit ✅

- [x] Skip-to-content link (Header → main#main-content)
- [x] MobileNav: dialog role, aria-modal, focus trap, Escape key, focus restore
- [x] ConsultationForm: aria-live regions for success/error, aria-disabled on submit
- [x] Aria-labels on all homepage scroll sections
- [ ] Run axe-core or Lighthouse accessibility audit on every page
- [ ] Verify color contrast meets WCAG AA (especially sage-on-dark combos)

### Step 7: Performance audit ✅

- [x] Run Lighthouse on every page — target 90+ performance
- [x] Verify LCP < 2.5s, CLS < 0.1
- [x] Verify total page weight < 1MB per page (excluding lazy images)
- [x] Check bundle size — tree-shake GSAP if possible
- [x] Ensure fonts load with `font-display: swap` (already configured)

### Step 8: Vercel Speed Insights ✅

- [x] Install `@vercel/speed-insights` dependency
- [x] Add `<SpeedInsights />` component to root layout

### Step 9: Legal pages ✅

- [x] Create `/privacy` page with 9-section privacy policy (covers Formspree, PostHog, Vercel)
- [x] Create `/terms` page with 9-section terms of service
- [x] Add metadata entries for both pages in `lib/metadata.ts`
- [x] Add both pages to `sitemap.ts` (yearly change frequency, 0.3 priority)
- [x] Add breadcrumb schemas via page layouts
- [x] Add privacy and terms links to Footer

### Step 10: Newsletter signup ✅

- [x] Create `NewsletterSignup` component with EstateSales.org subscribe link
- [x] Add to `/estate-sales` page after sale listings
- [x] Topographic contour SVG background styling

### Step 11: Theme toggle ✅

- [x] ThemeProvider with light/dark/system modes (default: dark)
- [x] ThemeScript for flash-free initial render
- [x] ThemeToggle button component in header

---

## Feature — Final Polish

Last round before handing off to the client.

### Step 1: Content review ✅

- [x] Client reviews and approves all page copy
- [x] Replace dummy estate sale listings with real data (or hide section if no upcoming sales)
- [x] Verify all phone numbers, email addresses, and external links are correct
- [x] Verify Instagram handle (@abe.liquidators) links correctly
- [x] Verify BBB, Yelp, EstateSales.net, EstateSales.org links are correct

### Step 2: Cross-browser testing ✅

- [x] Chrome (desktop + mobile)
- [x] Safari (desktop + iOS)
- [x] Firefox
- [x] Edge
- [x] Test scroll story animations on each browser
- [x] Test form submission end-to-end on each browser

### Step 3: Mobile device testing ✅

- [x] Test on real iOS device (iPhone)
- [x] Test on real Android device
- [x] Verify click-to-call works on mobile
- [x] Verify no horizontal scrolling at any viewport
- [x] Verify hamburger menu opens/closes correctly

### Step 4: Pre-launch SEO checklist

- [ ] Validate structured data (Google Rich Results Test)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify canonical URLs resolve correctly
- [ ] Verify Open Graph previews render on Facebook/LinkedIn/Twitter
- [ ] Set up 301 redirects if any old URLs change

### Step 5: Deployment

- [x] Verify `.env` variables are set in Vercel dashboard (NEXT_PUBLIC_FORMSPREE_ID, NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST)
- [x] Deploy to Vercel production
- [ ] Point abeliquidators.com DNS to Vercel
- [ ] Verify SSL certificate is active (HTTPS)
- [ ] Smoke test all pages on live domain
- [ ] Test form submission on live domain
- [ ] Test click-to-call on live domain

---

## Notes

- **No CMS at launch** — all content is hardcoded but structured for future CMS extraction
- **Real photos needed** — professional headshot of Cortnee, estate sale staging shots, detail shots of items, team photos
- **`type: "module"` warning** — Tailwind logs a minor warning about package.json missing `"type": "module"`; doesn't affect builds

---

## Change Log (2026-02-27)

**Completed work not previously reflected in the plan:**

- **Phase 2 Step 3 (PostHog)** — Was an empty stub. Now filled in: `posthog-js` installed, `instrumentation-client.ts` configured for Next.js 15.3+, reverse proxy set up in `next.config.ts`, 10 custom events instrumented across 7 files, PostHog dashboard created, privacy policy updated.
- **Phase 2 Step 8 (Vercel Speed Insights)** — New. `@vercel/speed-insights` added as a dependency and `<SpeedInsights />` rendered in root layout.
- **Phase 2 Step 9 (Legal pages)** — New. `/privacy` and `/terms` pages created with full content, metadata, sitemap entries, breadcrumb schemas, and Footer links.
- **Phase 2 Step 10 (Newsletter signup)** — New. `NewsletterSignup` component created with EstateSales.org subscribe link (replaced earlier Mailchimp approach). Added to `/estate-sales` page.
- **Phase 2 Step 11 (Theme toggle)** — New. ThemeProvider, ThemeScript, and ThemeToggle components added for light/dark mode switching.
- **Phase 3 Step 5 (Deployment)** — `.env` line updated to reflect PostHog variables now also set in Vercel dashboard.
