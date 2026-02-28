# AI Assistant Instructions — ABE Liquidators

## Getting Started

- Read this file before starting any task.
- Check `docs/system/buildplan.md` for the current implementation plan.
- Check `docs/system/conventions.md` for project conventions and patterns.
- Reference files in `docs/system/context/` for brand, business, and design context.

## Project

ABE Liquidators (abeliquidators.com) — a 6-page marketing website for a Northern California estate liquidation company. The site prioritizes trust, empathy, and conversion (consultation form submissions).

## Tech Stack

- **Framework:** Next.js (App Router) with React
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Content:** Hardcoded (structured for future CMS extraction)
- **Form handling:** Formspree or Resend (serverless, no backend)
- **Analytics:** PostHog

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
│   ├── layout.tsx          # Root layout (Header, Footer, metadata)
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

## Reference Documents

- `docs/system/context/prd.md` — Full product requirements with page-by-page specs
- `docs/system/context/brand.md` — Brand voice, values, visual identity, messaging framework
- `docs/system/context/brand-and-business.md` — Brand guidelines and business context summary
- `docs/system/context/story-driven.md` — Scroll-story homepage narrative
- `docs/system/context/plans/` — Design and implementation plans

## Runbooks

- `docs/system/runbooks/update-estate-sales.md` — Process for updating estate sale listings in `src/lib/data/sales.ts`. Follow this when trying to update estate sales.

## Workflow

1. **Read** the relevant plan section or issue before writing code.
2. **Implement** in small, focused commits.
3. **Test** your changes before marking work as done.
4. **Update** the buildplan when completing a step.

## Conventions Reference

See `docs/system/conventions.md` for:
- Code style and formatting rules
- Naming conventions
- File organization patterns
