# Build Plan — Attic To Basement

## Phase 1 — MVP (COMPLETE)

All core pages built, styled, and building successfully.

### Step 1: Project scaffold and design system ✅

- Next.js App Router + TypeScript + Tailwind CSS
- Font setup (Libre Baskerville + Nunito Sans)
- Global styles, color tokens, dark warm palette
- Reusable UI components: Button, Card, SectionHeading, TestimonialCard, SaleCard

### Step 2: Layout shell ✅

- Header with sticky scroll behavior, desktop nav, mobile hamburger
- MobileNav slide-out drawer
- Footer with contact info, social links, nav links
- SmoothScroll wrapper (Lenis)

### Step 3: Homepage scroll story ✅

- ScrollStory GSAP-driven narrative (desktop: scrub timeline, mobile: intersection reveals)
- Sections: Hook → Tension → Turn → Process → ServiceArea → SocialProof → TheAsk
- Respects `prefers-reduced-motion`
- Mobile fallbacks for all scroll-driven sections

### Step 4: Interior pages ✅

- `/estate-sales` — service detail + SaleCard listings (dummy data)
- `/estate-liquidation` — buyouts, cleanouts, service types
- `/appraisals` — appraisal services, categories, credentials
- `/our-promise` — values, Cortnee bio, trust signals
- `/reviews` — filterable testimonials by category (15+ reviews)
- `/contact` — standalone form page with full contact info

### Step 5: Consultation form ✅

- ConsultationForm component (shared across pages)
- Formspree integration (honeypot spam protection, no CAPTCHA)
- Fields: name, phone, email, city/zip, situation dropdown, description, contact preference
- Success/error states

### Step 6: SEO metadata ✅

- Unique title + meta description per page (`lib/metadata.ts`)
- Open Graph + Twitter Card tags
- Canonical URLs via `metadataBase`

---

## Phase 2 — Production Ready (COMPLETE)

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

### Step 3: PostHog

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

### Step 7: Performance audit

- [x] Run Lighthouse on every page — target 90+ performance
- [x] Verify LCP < 2.5s, CLS < 0.1
- [x] Verify total page weight < 1MB per page (excluding lazy images)
- [x] Check bundle size — tree-shake GSAP if possible
- [x] Ensure fonts load with `font-display: swap` (already configured)

---

## Phase 3 — Final Polish

Last round before handing off to the client.

### Step 1: Content review

- [x] Client reviews and approves all page copy
- [x] Replace dummy estate sale listings with real data (or hide section if no upcoming sales)
- [x] Verify all phone numbers, email addresses, and external links are correct
- [x] Verify Instagram handle (@abe.liquidators) links correctly
- [x] Verify BBB, Yelp, EstateSales.net, EstateSales.org links are correct

### Step 2: Cross-browser testing

- [x] Chrome (desktop + mobile)
- [x] Safari (desktop + iOS)
- [x] Firefox
- [x] Edge
- [x] Test scroll story animations on each browser
- [x] Test form submission end-to-end on each browser

### Step 3: Mobile device testing

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

- [x] Verify `.env` variables are set in Vercel dashboard (NEXT_PUBLIC_FORMSPREE_ID)
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
