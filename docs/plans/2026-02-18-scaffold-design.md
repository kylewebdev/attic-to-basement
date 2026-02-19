# ABE Liquidators — Project Scaffold Design

**Date:** 2026-02-18
**Status:** Approved

## Overview

Scaffold the ABE Liquidators marketing website using `create-next-app` (App Router, TypeScript, Tailwind CSS v4). The scaffold produces a working skeleton with navigation, layout, global styles, and page shells — no section content yet.

## Decisions

- **Approach:** `create-next-app@latest` + manual customization (strip boilerplate, add brand config, build component structure)
- **Fonts:** Libre Baskerville (serif, headlines) + Nunito Sans (sans, body) via `next/font/google`
- **Color direction:** Muted sage green as primary accent, warm neutrals
- **Form handling:** Formspree (drop-in endpoint, env var for ID)
- **Smooth scroll:** Lenis (`lenis/react` ReactLenis provider)
- **Animation:** GSAP + `@gsap/react` (`useGSAP` hook), ScrollTrigger pre-registered
- **Tailwind v4:** Design tokens in `@theme` layer in CSS; `tailwind.config.ts` only for `@tailwindcss/typography` plugin + prose overrides

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `sage-50` | `#f6f7f4` | Lightest backgrounds |
| `sage-100` | `#e8ebe3` | Section alternating bg |
| `sage-200` | `#d1d7c7` | Borders, dividers |
| `sage-300` | `#a8b496` | Muted accents |
| `sage-400` | `#7f9268` | Secondary buttons |
| `sage-500` | `#5c7a45` | Primary accent |
| `sage-600` | `#4a6338` | Primary hover |
| `sage-700` | `#3a4d2d` | Dark accent |
| `warm-white` | `#faf9f6` | Page background |
| `warm-50` | `#f5f3ef` | Card backgrounds |
| `warm-100` | `#e8e4dc` | Subtle borders |
| `warm-200` | `#d4cec3` | Muted text |
| `stone-700` | `#44403c` | Body text |
| `stone-800` | `#292524` | Headings |
| `stone-900` | `#1c1917` | Darkest text |
| `gold-400` | `#c8a951` | Accent highlights (stars, badges) |

## Typography

- **Headlines:** Libre Baskerville (serif), `stone-800`
- **Body:** Nunito Sans (sans-serif), `stone-700`
- Loaded via `next/font/google` with CSS variables on `<html>` for Tailwind to reference

## Animation Tooling

### GSAP

- Packages: `gsap`, `@gsap/react`
- `lib/gsap.ts` registers plugins once: `gsap.registerPlugin(useGSAP, ScrollTrigger)`
- Components import from `lib/gsap.ts` to ensure registration
- All animated components use `"use client"` directive
- `useGSAP` hook replaces `useEffect` for animation — handles cleanup automatically
- Event-driven animations use `contextSafe()` for proper cleanup

### Lenis

- Package: `lenis` (uses `lenis/react` subpath)
- `SmoothScroll.tsx` client component wraps `<ReactLenis root>` in layout
- Config: `autoRaf: true`
- Lenis scroll events connected to `ScrollTrigger.update()` in the SmoothScroll component

## Component Architecture

### Layout (`components/layout/`)

| Component | Type | Description |
|---|---|---|
| `Header.tsx` | Client | Sticky header, logo, nav links, "Free Consultation" CTA. Shrinks on scroll via GSAP. Hamburger on mobile. |
| `Footer.tsx` | Server | Company info, nav links, phone (click-to-call), social/external links, copyright. |
| `MobileNav.tsx` | Client | Slide-out drawer with overlay. GSAP animated open/close. |
| `SmoothScroll.tsx` | Client | ReactLenis wrapper + ScrollTrigger sync. |

### UI (`components/ui/`)

| Component | Type | Description |
|---|---|---|
| `Button.tsx` | Server | Variants: `primary`, `secondary`, `ghost`. Renders as `<a>` or `<button>` via `href` prop. |
| `Card.tsx` | Server | Optional icon/image, heading, body, optional link. |
| `SectionHeading.tsx` | Server | Serif H2 + optional subtitle. Center or left-align via prop. |
| `TestimonialCard.tsx` | Server | Quote, attribution (name, location), optional star rating. |

### Sections (`components/sections/`)

Homepage-specific: `Hero.tsx` (client), `TrustBar.tsx`, `ServicesOverview.tsx`, `HowItWorks.tsx`, `ServiceArea.tsx`, `TestimonialHighlight.tsx`, `MeetCortnee.tsx`, `ConsultationCTA.tsx`

Only Hero is a client component at scaffold time. Others become client components when GSAP animations are added.

### Forms (`components/forms/`)

| Component | Type | Description |
|---|---|---|
| `ConsultationForm.tsx` | Client | Name, Phone, Email, City/Zip, Description, Preferred Contact Method (radio). Honeypot anti-spam. Formspree submission. Success/error states. |

### Lib (`lib/`)

| File | Purpose |
|---|---|
| `metadata.ts` | Centralized per-page SEO metadata (title, description, OG tags) |
| `gsap.ts` | GSAP plugin registration + re-exports |

## Page Structure

### Root Layout (`app/layout.tsx`)

- Loads fonts via `next/font/google`, sets CSS variables on `<html>`
- Renders: `<Header />` → `<main>{children}</main>` → `<Footer />`
- Wrapped in `<SmoothScroll>` (Lenis)
- GTM script placeholder (commented out)
- Default metadata (site name, OG defaults)
- `LocalBusiness` JSON-LD schema block

### Page Shells

| Route | H1 / Hero Text | Bottom Section |
|---|---|---|
| `/` | "We handle everything so you don't have to" | `<ConsultationCTA />` with embedded `<ConsultationForm />` |
| `/estate-sales` | "Full-Service Estate Sales, Start to Finish" | `<ConsultationCTA />` |
| `/estate-liquidation` | "Comprehensive Estate Liquidation Solutions" | `<ConsultationCTA />` |
| `/appraisals` | "Accurate, Professional Appraisals" | `<ConsultationCTA />` |
| `/our-promise` | "Our Commitment to You" | `<ConsultationCTA />` |
| `/reviews` | "What Our Clients Say" | `<ConsultationCTA />` |

Each page exports `metadata` from `lib/metadata.ts` with title, description, and canonical URL per the PRD SEO table.

## Tailwind v4 Configuration

### `globals.css` — `@theme` layer

All design tokens: colors, font families, and any custom spacing/breakpoints.

### `tailwind.config.ts` — minimal

- `@tailwindcss/typography` plugin registration
- Prose style overrides (font family, heading styles, link colors)

## File Tree

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── estate-sales/page.tsx
│   ├── estate-liquidation/page.tsx
│   ├── appraisals/page.tsx
│   ├── our-promise/page.tsx
│   └── reviews/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── SmoothScroll.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeading.tsx
│   │   └── TestimonialCard.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ServiceArea.tsx
│   │   ├── TestimonialHighlight.tsx
│   │   ├── MeetCortnee.tsx
│   │   └── ConsultationCTA.tsx
│   └── forms/
│       └── ConsultationForm.tsx
├── lib/
│   ├── metadata.ts
│   └── gsap.ts
└── styles/
    └── globals.css
```

**Config files (root):** `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`, `.env.local` (Formspree ID placeholder)

## Excluded from Scaffold

- Placeholder images / `public/images/`
- `robots.txt` / `sitemap.xml` (Next.js generates at build time)
- GTM/GA4 scripts (placeholder only)
- Interior page section content (hero + CTA shells only)
- Page-specific JSON-LD schemas (Service, Review, BreadcrumbList)
