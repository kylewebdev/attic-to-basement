# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ABE Liquidators (abeliquidators.com) — a 6-page marketing website for a Northern California estate liquidation company. The site prioritizes trust, empathy, and conversion (consultation form submissions).

## Tech Stack

- **Framework:** Next.js (App Router) with React
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Content:** Hardcoded (structured for future CMS extraction)
- **Form handling:** Formspree or Resend (serverless, no backend)
- **Analytics:** Google Analytics 4 via Google Tag Manager

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run start        # Serve production build locally
```

## Architecture

```
src/
├── app/                    # Next.js App Router — one page.tsx per route
│   ├── layout.tsx          # Root layout (Header, Footer, metadata, GTM)
│   ├── page.tsx            # Homepage (/)
│   ├── estate-sales/       # /estate-sales
│   ├── estate-liquidation/ # /estate-liquidation
│   ├── appraisals/         # /appraisals
│   ├── our-promise/        # /our-promise
│   └── reviews/            # /reviews
├── components/
│   ├── layout/             # Header, Footer, MobileNav
│   ├── ui/                 # Button, Card, SectionHeading, TestimonialCard
│   ├── sections/           # Homepage sections (Hero, TrustBar, ServicesOverview,
│   │                       #   HowItWorks, ServiceArea, TestimonialHighlight,
│   │                       #   MeetCortnee, ConsultationCTA)
│   └── forms/              # ConsultationForm (reusable across pages)
├── lib/
│   └── metadata.ts         # Centralized SEO metadata per page
└── styles/
    └── globals.css          # Tailwind base + global styles
```

Pages are composed of section components. Each page has a hero, content sections, and a consultation CTA. The ConsultationForm is a shared component embedded on the homepage and linked from every other page.

## Key Requirements

### Performance
- Lighthouse Performance 90+, LCP < 2.5s, CLS < 0.1
- Page weight < 1MB (excluding lazy-loaded images)
- Images in WebP/AVIF with responsive srcsets

### SEO
- Unique title/meta description per page (defined in `lib/metadata.ts`)
- Schema.org JSON-LD: LocalBusiness, Service, Review, BreadcrumbList
- Proper heading hierarchy (single H1 per page)
- XML sitemap, canonical URLs, Open Graph + Twitter Card tags

### Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML, keyboard navigable, visible focus indicators
- Touch targets minimum 44x44px
- Sufficient color contrast

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (< 640px), tablet (640–1024px), desktop (1024px+)
- Sticky header that shrinks on scroll; hamburger menu on mobile

## Brand & Design Guidelines

Full brand guide: `docs/brand.md`. Key points:

- **Tone:** Warm, reassuring, professional. Lead with empathy, follow with competence. Never salesy, corporate, or dismissive of sentimental value.
- **Voice:** First-person plural ("we"). Plain language, no jargon. Confident but not condescending.
- **Visual direction:** Clean, airy, grounded. Warm neutrals (earth tones, muted sage/slate, warm whites). Generous whitespace — the site should feel calming.
- **Typography:** Humanist sans-serif for body, soft serif for headlines. Prioritize readability (audience skews older, often reading under stress).
- **Photography:** Real over stock. Warm natural lighting. Staged estate sales, detail shots, candid team photos. No generic handshake/clipboard stock.
- **Avoid:** Discount/clearance aesthetics (bright reds, neons), overly polished imagery, pressure language ("act now"), clinical terms ("asset disposal").

## Business Context

- **Client:** Cortnee Beggs, owner of Attic to Basement Estate Liquidators
- **Service area:** Bay Area, Greater Sacramento, Placer County, El Dorado County, Sierra foothills
- **Phone:** (916) 521-1077
- **Primary conversion:** Free consultation form submission
- **Every page must have a clear path to schedule a free consultation**
- Anti-spam: honeypot field on forms (no CAPTCHA unless spam becomes an issue)

## Reference Documents

- `docs/prd.md` — Full product requirements with page-by-page specs
- `docs/brand.md` — Brand voice, values, visual identity, messaging framework
