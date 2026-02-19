# ABE Liquidators

Marketing website for **Attic to Basement Estate Liquidators** (abeliquidators.com) — a Northern California estate liquidation company. Built with [Next.js](https://nextjs.org) App Router, React, and Tailwind CSS.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, [Tailwind CSS](https://tailwindcss.com) 4
- **Animation:** [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering/) smooth scroll
- **Deployment:** [Vercel](https://vercel.com)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start development server       |
| `npm run build`  | Create production build         |
| `npm run start`  | Serve production build locally  |
| `npm run lint`   | Run ESLint                      |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Header, Footer, fonts)
│   ├── page.tsx                # Homepage
│   ├── estate-sales/           # /estate-sales
│   ├── estate-liquidation/     # /estate-liquidation
│   ├── appraisals/             # /appraisals
│   ├── our-promise/            # /our-promise
│   ├── reviews/                # /reviews
│   └── contact/                # /contact
├── components/
│   ├── layout/                 # Header, Footer, MobileNav, SmoothScroll
│   ├── ui/                     # Button, Card, SaleCard, SectionHeading, TestimonialCard
│   ├── sections/               # Homepage sections (Hero, SocialProof, Process,
│   │                           #   ServiceArea, ConsultationCTA, ScrollStory, etc.)
│   └── forms/                  # ConsultationForm
├── lib/
│   ├── metadata.ts             # Centralized SEO metadata per page
│   ├── gsap.ts                 # GSAP registration and config
│   ├── useScrollReveal.ts      # Scroll-triggered reveal hook
│   └── data/                   # Hardcoded content
│       ├── sales.ts            # Sales/listing data
│       └── testimonials.ts     # Customer testimonials
├── styles/
│   └── globals.css             # Tailwind base + global styles
docs/
├── brand.md                    # Brand voice, values, visual identity
├── prd.md                      # Product requirements
└── story-driven.md             # Story-driven page strategy
```

## Pages

| Route                | Purpose                              |
| -------------------- | ------------------------------------ |
| `/`                  | Homepage — hero, services, trust signals, CTA |
| `/estate-sales`      | Estate sale services detail           |
| `/estate-liquidation`| Liquidation services detail           |
| `/appraisals`        | Appraisal services detail             |
| `/our-promise`       | Company values and approach           |
| `/reviews`           | Customer testimonials                 |
| `/contact`           | Consultation form and contact info    |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://gsap.com/docs)
