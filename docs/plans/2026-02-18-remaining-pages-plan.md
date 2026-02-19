# Remaining Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Flesh out 5 existing stub pages and add a new /contact page with full content, scroll reveal animations, and shared data files.

**Architecture:** Each page composes existing UI components (Card, SectionHeading, TestimonialCard, Button) with inline sections. Shared data lives in `src/lib/data/` TypeScript files. A lightweight `useScrollReveal` hook provides fade-in-on-scroll for all secondary pages. No new GSAP usage — Intersection Observer only.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4

---

### Task 1: Create shared testimonials data file

Extract testimonials from `SocialProof.tsx` into a shared data file and update the homepage component to import from it.

**Files:**
- Create: `src/lib/data/testimonials.ts`
- Modify: `src/components/sections/SocialProof.tsx:9-52`

**Step 1: Create the testimonials data file**

Create `src/lib/data/testimonials.ts`:

```typescript
export interface Testimonial {
  quote: string;
  name: string;
  source: "Yelp" | "BBB" | "EstateSales.org" | "EstateSales.net";
  rating: number;
  category: "settling" | "downsizing" | "buyer";
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Cortnee and her team turned what felt like an impossible task into something completely manageable. They organized my mother's entire home in just three days.",
    name: "Sarah M.",
    source: "Yelp",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "We were settling my father's estate from out of state and Cortnee handled every detail. The itemized report after the sale was incredibly thorough.",
    name: "David R.",
    source: "BBB",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "I've been to dozens of estate sales and ABE's are always the best organized. Fair prices, friendly staff, and the homes are staged beautifully.",
    name: "Linda K.",
    source: "EstateSales.org",
    rating: 5,
    category: "buyer",
  },
  {
    quote:
      "Made an impossible situation manageable. We were grieving and overwhelmed, and Cortnee treated everything with such care and respect.",
    name: "James T.",
    source: "Yelp",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "Professional from start to finish. The sale brought in more than we expected, and the donation coordination afterward was a wonderful touch.",
    name: "Patricia H.",
    source: "EstateSales.org",
    rating: 4,
    category: "settling",
  },
  {
    quote:
      "After my aunt passed, I had no idea where to start with her house full of antiques. Cortnee walked me through every step and made the whole process feel manageable.",
    name: "Michelle W.",
    source: "Yelp",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "We downsized from a four-bedroom to a condo and ABE handled everything we couldn't take with us. The staging was incredible and we got great value.",
    name: "Robert & Carol S.",
    source: "BBB",
    rating: 5,
    category: "downsizing",
  },
  {
    quote:
      "As a buyer, I keep coming back to ABE sales. Everything is clearly priced, well-organized, and the staff is always helpful and friendly.",
    name: "Tom D.",
    source: "EstateSales.net",
    rating: 5,
    category: "buyer",
  },
  {
    quote:
      "Cortnee's appraisal was thorough and fair. She found value in items we would have donated without thinking twice. Highly recommend for anyone going through this process.",
    name: "Angela F.",
    source: "Yelp",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "Moving to assisted living was overwhelming, but ABE made the transition so much easier. They were patient, respectful, and handled everything with care.",
    name: "Dorothy M.",
    source: "EstateSales.org",
    rating: 5,
    category: "downsizing",
  },
  {
    quote:
      "Great finds at fair prices. The sales are always well-organized and the team is knowledgeable about what they're selling. Will definitely be back.",
    name: "Kevin L.",
    source: "EstateSales.net",
    rating: 4,
    category: "buyer",
  },
];

/** Curated subset for homepage SocialProof section */
export const homepageTestimonials = testimonials.slice(0, 5);

export const stats = [
  { value: 20, suffix: "+", label: "Years Combined Experience" },
  { value: 4.5, suffix: "", label: "Star Average Rating", decimals: 1 },
  { value: 49, suffix: "+", label: "Reviews on Yelp" },
  { value: 0, suffix: "", label: "BBB Accredited", isBadge: true },
] as const;
```

**Step 2: Update SocialProof to import from shared data**

In `src/components/sections/SocialProof.tsx`, replace the inline `testimonials` and `stats` arrays (lines 9-52) with:

```typescript
import { homepageTestimonials as testimonials, stats } from "@/lib/data/testimonials";
```

Remove the entire `const testimonials = [...]` and `const stats = [...]` blocks.

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. Homepage renders identically.

**Step 4: Commit**

```bash
git add src/lib/data/testimonials.ts src/components/sections/SocialProof.tsx
git commit -m "refactor: extract testimonials to shared data file"
```

---

### Task 2: Create shared sales data file

**Files:**
- Create: `src/lib/data/sales.ts`

**Step 1: Create the sales data file**

Create `src/lib/data/sales.ts`:

```typescript
export interface Sale {
  id: string;
  title: string;
  dates: string;
  area: string;
  categories: string[];
  externalUrl?: string;
  imageAlt?: string;
}

/**
 * Current and upcoming sale listings.
 * Update this array to add/remove sales.
 * When empty, the estate-sales page shows an empty state.
 */
export const sales: Sale[] = [];
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/lib/data/sales.ts
git commit -m "feat: add sales data file for upcoming listings"
```

---

### Task 3: Create useScrollReveal hook

**Files:**
- Create: `src/lib/useScrollReveal.ts`

**Step 1: Create the hook**

Create `src/lib/useScrollReveal.ts`:

```typescript
"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll reveal using Intersection Observer.
 * Add `data-reveal` to elements that should fade in on scroll.
 * Add `data-reveal-delay="N"` for staggered delays (in ms).
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements =
      containerRef.current.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReduced) {
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    // Set initial hidden state
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      const delay = el.getAttribute("data-reveal-delay");
      if (delay) {
        el.style.transitionDelay = `${delay}ms`;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "none";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/lib/useScrollReveal.ts
git commit -m "feat: add useScrollReveal hook for secondary pages"
```

---

### Task 4: Create SaleCard component

**Files:**
- Create: `src/components/ui/SaleCard.tsx`

**Step 1: Create the component**

Create `src/components/ui/SaleCard.tsx`:

```typescript
import type { Sale } from "@/lib/data/sales";

interface SaleCardProps {
  sale: Sale;
}

export default function SaleCard({ sale }: SaleCardProps) {
  return (
    <div className="rounded-xl bg-warm-50 border border-warm-100 p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-serif text-xl text-stone-800">{sale.title}</h3>
      </div>

      <p className="text-sage-600 font-semibold text-sm mb-1">{sale.dates}</p>
      <p className="text-stone-500 text-sm mb-4">{sale.area}</p>

      {sale.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {sale.categories.map((cat) => (
            <span
              key={cat}
              className="text-xs bg-sage-50 text-sage-600 px-2 py-1 rounded-full border border-sage-100"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {sale.externalUrl && (
        <a
          href={sale.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-sage-600 hover:text-sage-700 font-semibold transition-colors"
        >
          View on EstateSales.net
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/ui/SaleCard.tsx
git commit -m "feat: add SaleCard component for upcoming sales"
```

---

### Task 5: Add contact metadata and Hero color scheme

**Files:**
- Modify: `src/lib/metadata.ts`
- Modify: `src/components/sections/Hero.tsx`

**Step 1: Add contact to metadata**

In `src/lib/metadata.ts`, add `"contact"` to the `PageKey` union type and add the entry to `pages`:

```typescript
type PageKey =
  | "home"
  | "estateSales"
  | "estateLiquidation"
  | "appraisals"
  | "ourPromise"
  | "reviews"
  | "contact";
```

Add to the `pages` record:

```typescript
  contact: {
    title: "Contact Us | Free Consultation | ABE Liquidators",
    description:
      "Schedule a free, no-obligation estate sale consultation. Call (916) 521-1077 or fill out our contact form. Available 24/7.",
    path: "/contact",
  },
```

**Step 2: Add contact color scheme to Hero**

In `src/components/sections/Hero.tsx`, add `"contact"` to the `ColorScheme` type:

```typescript
type ColorScheme = "estate-sales" | "estate-liquidation" | "appraisals" | "our-promise" | "reviews" | "contact";
```

Add to the `colorSchemes` record:

```typescript
  contact: {
    gradient: "linear-gradient(145deg, var(--color-warm-white) 0%, var(--color-sage-50) 50%, var(--color-warm-50) 100%)",
    blobs: [
      { color: "var(--color-sage-200)", opacity: 0.25, size: 370, top: "-90px", left: "-50px", borderRadius: "55% 45% 50% 60% / 50% 55% 45% 60%" },
      { color: "var(--color-warm-100)", opacity: 0.2, size: 260, bottom: "-50px", right: "-60px", borderRadius: "45% 55% 60% 40% / 55% 45% 50% 60%" },
    ],
  },
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/lib/metadata.ts src/components/sections/Hero.tsx
git commit -m "feat: add contact page metadata and Hero color scheme"
```

---

### Task 6: Add situation dropdown to ConsultationForm

**Files:**
- Modify: `src/components/forms/ConsultationForm.tsx`

**Step 1: Add the dropdown**

In `src/components/forms/ConsultationForm.tsx`, add a situation dropdown between the city/zip field and the description textarea. After the city/zip `<div>` block (after line 111), add:

```tsx
      <div>
        <label htmlFor="situation" className="block text-sm font-semibold text-stone-700 mb-1">
          What best describes your situation?
        </label>
        <select
          id="situation"
          name="situation"
          className="w-full rounded-lg border border-warm-100 bg-white px-4 py-3 text-stone-700 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
          defaultValue=""
        >
          <option value="" disabled>Select one...</option>
          <option value="settling">Settling an estate</option>
          <option value="downsizing">Downsizing</option>
          <option value="cleanout">Property cleanout</option>
          <option value="appraisal">Appraisal needed</option>
          <option value="buying">Buying at a sale</option>
          <option value="other">Other</option>
        </select>
      </div>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/forms/ConsultationForm.tsx
git commit -m "feat: add situation dropdown to consultation form"
```

---

### Task 7: Build /estate-sales page

**Files:**
- Modify: `src/app/estate-sales/page.tsx`

**Step 1: Replace the page content**

Replace the entire contents of `src/app/estate-sales/page.tsx`:

```tsx
"use client";

import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import SaleCard from "@/components/ui/SaleCard";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { sales } from "@/lib/data/sales";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function EstateSalesPage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      <Hero
        title="Upcoming Estate Sales"
        subtitle="Browse our current and upcoming sales. Addresses are posted at 6 AM on sale day."
        colorScheme="estate-sales"
      />

      <section className="py-16 md:py-24 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4">
          {sales.length > 0 ? (
            <>
              <div data-reveal>
                <SectionHeading title="Current & Upcoming Sales" />
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {sales.map((sale, i) => (
                  <div key={sale.id} data-reveal data-reveal-delay={i * 100}>
                    <SaleCard sale={sale} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div data-reveal className="text-center py-12">
              <p className="font-serif text-2xl text-stone-800 mb-4">
                No upcoming sales right now.
              </p>
              <p className="text-stone-500 max-w-md mx-auto mb-6">
                Follow us on Instagram or check back soon to see what is next.
              </p>
              <a
                href="https://www.instagram.com/abe.liquidators"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sage-600 hover:text-sage-700 font-semibold transition-colors"
              >
                @abe.liquidators on Instagram
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Cross-sell for sellers */}
      <section className="py-12 bg-sage-50">
        <div className="max-w-3xl mx-auto px-4 text-center" data-reveal>
          <p className="font-serif text-2xl text-stone-800 mb-4">
            Have a home that needs an estate sale?
          </p>
          <p className="text-stone-500 mb-6">
            We handle everything from the first walkthrough to the final sweep.
          </p>
          <Button href="/contact" variant="primary">
            Schedule a Free Consultation
          </Button>
        </div>
      </section>

      <ConsultationCTA />
    </div>
  );
}
```

**Important:** Since this page now uses `"use client"` for the scroll reveal hook, the metadata export must be moved. Create a separate metadata file or use `generateMetadata`. The simplest approach: keep metadata as a named export from a separate `metadata.ts` file in the route directory, or inline it.

Actually, Next.js App Router requires metadata to be exported from a Server Component. Since we're adding `"use client"`, we need to handle this. The cleanest approach: export metadata from a separate file.

Create `src/app/estate-sales/metadata.ts`:

```typescript
import { getPageMetadata } from "@/lib/metadata";
export const metadata = getPageMetadata("estateSales");
```

Wait — Next.js requires metadata to be in `page.tsx` or `layout.tsx`. The better pattern: create a `layout.tsx` for metadata, keep the page as a client component.

Create `src/app/estate-sales/layout.tsx`:

```tsx
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("estateSales");

export default function EstateSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

And remove the metadata export from `page.tsx` (the client component version above already omits it).

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/estate-sales/
git commit -m "feat: build out estate-sales page with upcoming listings"
```

---

### Task 8: Build /estate-liquidation page

**Files:**
- Modify: `src/app/estate-liquidation/page.tsx`
- Create: `src/app/estate-liquidation/layout.tsx`

**Step 1: Create layout for metadata**

Create `src/app/estate-liquidation/layout.tsx`:

```tsx
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("estateLiquidation");

export default function EstateLiquidationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**Step 2: Replace the page content**

Replace `src/app/estate-liquidation/page.tsx`:

```tsx
"use client";

import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/lib/useScrollReveal";

const services = [
  {
    title: "Estate Sales",
    description:
      "Full-service estate sale management. We organize, stage, price, market, execute, and clean up. You receive an itemized accounting of every sale. Remaining items are handled through buyout, donation, or disposal. One team, start to finish.",
  },
  {
    title: "Estate Buyouts",
    description:
      "Need to move faster than a traditional sale allows? We make a fair offer on the entire contents of a home. Quick, clean, and straightforward — ideal when speed matters more than maximizing individual item value.",
  },
  {
    title: "Cleanouts",
    description:
      "After a sale, after a buyout, or on their own. We clear out and clean up the property so it is ready for sale, rental, or whatever comes next. Donations are coordinated with the nonprofit of your choice.",
  },
];

const differentiators = [
  "Fully insured and bonded",
  "All necessary certifications and licenses",
  "Over 20 years of combined experience",
  "Tailored plans for every timeline and situation",
  "Post-sale donation coordination included",
];

export default function EstateLiquidationPage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      <Hero
        title="Comprehensive Estate Liquidation Solutions"
        subtitle="Not every situation calls for a traditional sale. We offer multiple paths tailored to your needs."
        colorScheme="estate-liquidation"
      />

      {/* Service blocks */}
      <section className="py-16 md:py-24 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4">
          <div data-reveal>
            <SectionHeading
              title="Services tailored to your situation"
              subtitle="Whether you need a full estate sale, a quick buyout, or a property cleanout, we have you covered."
            />
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={service.title} data-reveal data-reveal-delay={i * 100}>
                <Card title={service.title} description={service.description} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-12 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4">
          <div data-reveal>
            <SectionHeading title="What makes us different" />
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {differentiators.map((item, i) => (
              <div
                key={i}
                data-reveal
                data-reveal-delay={i * 100}
                className="flex items-start gap-3 p-4"
              >
                <span className="text-sage-500 mt-0.5 flex-shrink-0" aria-hidden="true">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-stone-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </div>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/app/estate-liquidation/
git commit -m "feat: build out estate-liquidation page with service details"
```

---

### Task 9: Build /appraisals page

**Files:**
- Modify: `src/app/appraisals/page.tsx`
- Create: `src/app/appraisals/layout.tsx`

**Step 1: Create layout for metadata**

Create `src/app/appraisals/layout.tsx`:

```tsx
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("appraisals");

export default function AppraisalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**Step 2: Replace the page content**

Replace `src/app/appraisals/page.tsx`:

```tsx
"use client";

import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/lib/useScrollReveal";

const categories = [
  {
    title: "Household Goods",
    description: "Furniture, kitchenware, linens, decor, and everyday items assessed for fair market value.",
  },
  {
    title: "Antiques",
    description: "Period furniture, vintage items, and historical pieces evaluated with expert knowledge of current markets.",
  },
  {
    title: "Collectibles",
    description: "Coins, stamps, sports memorabilia, figurines, and specialty collections priced accurately.",
  },
  {
    title: "Furniture",
    description: "From mid-century modern to traditional hardwood pieces, we know what buyers are looking for.",
  },
  {
    title: "Fine Art",
    description: "Paintings, prints, sculptures, and decorative art appraised based on artist, condition, and provenance.",
  },
  {
    title: "Jewelry & Accessories",
    description: "Costume and fine jewelry, watches, and accessories evaluated for resale or insurance purposes.",
  },
];

const useCases = [
  "Estate sale preparation",
  "Insurance documentation",
  "Legal and probate proceedings",
  "Divorce settlements",
  "Charitable donation valuation",
];

export default function AppraisalsPage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      <Hero
        title="Accurate, Professional Appraisals"
        subtitle="Knowing what your belongings are worth is the foundation of a successful estate sale."
        colorScheme="appraisals"
      />

      {/* What we appraise */}
      <section className="py-16 md:py-24 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4">
          <div data-reveal>
            <SectionHeading
              title="What we appraise"
              subtitle="Certified appraisals for a wide range of personal property, backed by current market data."
            />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div key={cat.title} data-reveal data-reveal-delay={i * 100}>
                <Card title={cat.title} description={cat.description} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When you need an appraisal */}
      <section className="py-12 md:py-16 bg-sage-50">
        <div className="max-w-3xl mx-auto px-4">
          <div data-reveal>
            <SectionHeading title="When you need an appraisal" />
          </div>
          <ul className="mt-8 space-y-4">
            {useCases.map((item, i) => (
              <li
                key={i}
                data-reveal
                data-reveal-delay={i * 100}
                className="flex items-center gap-3"
              >
                <span className="text-sage-500 flex-shrink-0" aria-hidden="true">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-stone-700 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { label: "Certified Appraisals", detail: "Accurate, market-informed valuations" },
              { label: "20+ Years Experience", detail: "Deep knowledge across all categories" },
              { label: "Trusted & Professional", detail: "Insured, bonded, and BBB accredited" },
            ].map((cred, i) => (
              <div key={i} data-reveal data-reveal-delay={i * 100} className="p-6">
                <p className="font-serif text-xl text-stone-800 mb-2">{cred.label}</p>
                <p className="text-stone-500 text-sm">{cred.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </div>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/app/appraisals/
git commit -m "feat: build out appraisals page with categories and use cases"
```

---

### Task 10: Build /our-promise page

**Files:**
- Modify: `src/app/our-promise/page.tsx`
- Create: `src/app/our-promise/layout.tsx`

**Step 1: Create layout for metadata**

Create `src/app/our-promise/layout.tsx`:

```tsx
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("ourPromise");

export default function OurPromiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**Step 2: Replace the page content**

Replace `src/app/our-promise/page.tsx`:

```tsx
"use client";

import Hero from "@/components/sections/Hero";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { useScrollReveal } from "@/lib/useScrollReveal";

const values = [
  {
    title: "Trust & Transparency",
    description:
      "We communicate openly at every step. Honest appraisals, clear expectations, no hidden fees or surprises.",
  },
  {
    title: "Expertise You Can Rely On",
    description:
      "Our certified team brings over 20 years of combined experience to every project. We know the market, the process, and how to get the best outcome.",
  },
  {
    title: "Confidentiality & Respect",
    description:
      "Estate work is personal. We treat your belongings, your home, and your family's privacy with the care they deserve.",
  },
  {
    title: "Efficiency Without Shortcuts",
    description:
      "We work quickly when you need us to, but we never sacrifice quality or thoroughness. Every item gets the attention it deserves.",
  },
  {
    title: "Good Neighbors",
    description:
      "We manage our sales to minimize disruption to the surrounding community. Parking, foot traffic, signage — we think about all of it.",
  },
];

const credentials = [
  "BBB Accredited",
  "Fully Insured & Bonded",
  "Licensed & Certified",
];

export default function OurPromisePage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      <Hero
        title="The People Behind the Promise"
        subtitle="We understand the emotional weight of estate liquidation. Here is what you can expect from us."
        colorScheme="our-promise"
      />

      {/* Cortnee's story */}
      <section className="py-16 md:py-24 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Photo placeholder */}
            <div
              data-reveal
              className="aspect-[4/5] rounded-xl bg-warm-50 border border-warm-100 flex items-center justify-center"
            >
              <p className="text-stone-400 text-sm">Photo of Cortnee</p>
            </div>

            {/* Bio */}
            <div data-reveal data-reveal-delay="100">
              <h2 className="font-serif text-3xl text-stone-800 mb-6">
                Meet Cortnee Beggs
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Cortnee Beggs started Attic to Basement Estate Liquidators
                  because she saw families struggling through one of the hardest
                  parts of a major life transition — figuring out what to do
                  with a lifetime of belongings.
                </p>
                <p>
                  With over two decades of combined experience across Northern
                  California, she has built a team that treats every home like
                  it matters — because it does. From the first walkthrough to
                  the final sweep, her approach is simple: handle everything
                  with honesty, care, and the kind of thoroughness that lets
                  families focus on what really matters.
                </p>
                <p>
                  Whether you are settling an estate, downsizing, or just ready
                  for a fresh start, Cortnee and her team are here to make the
                  process as smooth and respectful as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-sage-50">
        <div className="max-w-5xl mx-auto px-4">
          <div data-reveal>
            <SectionHeading
              title="Our commitment to you"
              subtitle="These are the principles that guide every project we take on."
            />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div key={value.title} data-reveal data-reveal-delay={i * 100}>
                <Card title={value.title} description={value.description} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {credentials.map((cred, i) => (
              <div
                key={cred}
                data-reveal
                data-reveal-delay={i * 100}
                className="text-center px-6 py-4"
              >
                <p className="font-serif text-lg text-stone-800">{cred}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to reviews */}
      <section className="py-12 bg-sage-50">
        <div className="max-w-3xl mx-auto px-4 text-center" data-reveal>
          <p className="font-serif text-2xl text-stone-800 mb-6">
            See what our clients have to say.
          </p>
          <Button href="/reviews" variant="primary">
            Read Our Reviews
          </Button>
        </div>
      </section>
    </div>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/app/our-promise/
git commit -m "feat: build out our-promise page with bio and values"
```

---

### Task 11: Build /reviews page

**Files:**
- Modify: `src/app/reviews/page.tsx`
- Create: `src/app/reviews/layout.tsx`

**Step 1: Create layout for metadata**

Create `src/app/reviews/layout.tsx`:

```tsx
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("reviews");

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**Step 2: Replace the page content**

Replace `src/app/reviews/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import TestimonialCard from "@/components/ui/TestimonialCard";
import Button from "@/components/ui/Button";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";
import { useScrollReveal } from "@/lib/useScrollReveal";

type FilterCategory = "all" | Testimonial["category"];

const filters: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Settling an Estate", value: "settling" },
  { label: "Downsizing", value: "downsizing" },
  { label: "Buyer Experience", value: "buyer" },
];

const platformLinks = [
  { label: "Yelp", href: "https://www.yelp.com" },
  { label: "BBB", href: "https://www.bbb.org" },
  { label: "EstateSales.org", href: "https://www.estatesales.org" },
  { label: "EstateSales.net", href: "https://www.estatesales.net" },
];

export default function ReviewsPage() {
  const containerRef = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filtered =
    activeFilter === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeFilter);

  return (
    <div ref={containerRef}>
      <Hero
        title="What Families Are Saying"
        subtitle="4.5 out of 5 stars across review platforms. Here is what our clients and buyers have to say."
        colorScheme="reviews"
      />

      <section className="py-16 md:py-24 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4">
          {/* Filter tabs */}
          <div data-reveal className="flex flex-wrap gap-2 justify-center mb-10">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors min-h-11 ${
                  activeFilter === f.value
                    ? "bg-sage-500 text-white"
                    : "bg-warm-50 text-stone-600 hover:bg-warm-100 border border-warm-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Testimonial grid — CSS columns for masonry effect */}
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {filtered.map((t, i) => (
              <div key={i} className="break-inside-avoid" data-reveal data-reveal-delay={i * 50}>
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  location={t.source}
                  rating={t.rating}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-stone-500 py-12">
              No reviews in this category yet. Try selecting a different filter.
            </p>
          )}
        </div>
      </section>

      {/* External platform links */}
      <section className="py-12 bg-sage-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-serif text-xl text-stone-800 mb-6" data-reveal>
            Read more reviews on these platforms
          </p>
          <div className="flex flex-wrap justify-center gap-4" data-reveal data-reveal-delay="100">
            {platformLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-sage-500 text-sage-600 hover:bg-sage-50 font-semibold text-sm transition-colors min-h-11"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </div>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/app/reviews/
git commit -m "feat: build out reviews page with filterable testimonials"
```

---

### Task 12: Build /contact page

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/contact/layout.tsx`

**Step 1: Create layout for metadata**

Create `src/app/contact/layout.tsx`:

```tsx
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("contact");

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**Step 2: Create the page**

Create `src/app/contact/page.tsx`:

```tsx
"use client";

import Hero from "@/components/sections/Hero";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ContactPage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      <Hero
        title="Let Us Take It From Here"
        subtitle="Schedule your free consultation or reach out with any questions. No pressure, no obligation."
        colorScheme="contact"
      />

      <section className="py-16 md:py-24 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div data-reveal>
              <h2 className="font-serif text-2xl text-stone-800 mb-6">
                Request Your Free Consultation
              </h2>
              <ConsultationForm />
            </div>

            {/* Right: Contact info */}
            <div data-reveal data-reveal-delay="100">
              <h2 className="font-serif text-2xl text-stone-800 mb-6">
                Get in Touch Directly
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div>
                  <p className="text-sm font-semibold text-stone-700 mb-1">Phone</p>
                  <a
                    href="tel:+19165211077"
                    className="text-lg text-sage-600 hover:text-sage-700 font-semibold transition-colors"
                  >
                    (916) 521-1077
                  </a>
                  <p className="text-sm text-stone-500 mt-1">Available 24/7</p>
                </div>

                {/* Location */}
                <div>
                  <p className="text-sm font-semibold text-stone-700 mb-1">Location</p>
                  <p className="text-stone-600">Sacramento, CA 95821</p>
                </div>

                {/* Instagram */}
                <div>
                  <p className="text-sm font-semibold text-stone-700 mb-1">Instagram</p>
                  <a
                    href="https://www.instagram.com/abe.liquidators"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
                  >
                    @abe.liquidators
                  </a>
                </div>

                {/* Service area */}
                <div>
                  <p className="text-sm font-semibold text-stone-700 mb-1">Service Area</p>
                  <p className="text-stone-600 leading-relaxed">
                    We serve the Bay Area, Greater Sacramento, Placer County,
                    El Dorado County, and the Sierra foothills.
                  </p>
                  <p className="text-stone-500 text-sm mt-2">
                    Not sure if you are in our range? Call us. We will figure it out.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reassurance */}
          <p
            data-reveal
            className="mt-12 text-center text-stone-500 text-sm"
          >
            We typically respond within 24 hours. Your information stays private, always.
          </p>
        </div>
      </section>
    </div>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/app/contact/
git commit -m "feat: add /contact page with form and contact info"
```

---

### Task 13: Update navigation to link to /contact

**Files:**
- Modify: `src/components/layout/Header.tsx:80`
- Modify: `src/components/layout/MobileNav.tsx:93`
- Modify: `src/components/sections/ConsultationCTA.tsx:30`

**Step 1: Update Header**

In `src/components/layout/Header.tsx`, change line 80:

```tsx
// Before:
<Button href="/#consultation" variant="primary">
// After:
<Button href="/contact" variant="primary">
```

**Step 2: Update MobileNav**

In `src/components/layout/MobileNav.tsx`, change line 93:

```tsx
// Before:
<Button href="/#consultation" variant="primary" className="w-full">
// After:
<Button href="/contact" variant="primary" className="w-full">
```

**Step 3: Update ConsultationCTA fallback link**

In `src/components/sections/ConsultationCTA.tsx`, change line 31:

```tsx
// Before:
<Button href="/#consultation" variant="primary">
// After:
<Button href="/contact" variant="primary">
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/MobileNav.tsx src/components/sections/ConsultationCTA.tsx
git commit -m "feat: update navigation to link to /contact page"
```

---

### Task 14: Final verification

**Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 2: Lint**

Run: `npm run lint`
Expected: No lint errors.

**Step 3: Visual check list**

Start dev server with `npm run dev` and verify each page:

- [ ] `/estate-sales` — Shows empty state, cross-sell CTA, scroll reveals work
- [ ] `/estate-liquidation` — 3 service cards, differentiators strip, scroll reveals
- [ ] `/appraisals` — Category grid, use cases list, credentials, scroll reveals
- [ ] `/our-promise` — Photo placeholder + bio, 5 value cards, credentials, CTA to reviews
- [ ] `/reviews` — Filter buttons work, masonry grid, platform links, scroll reveals
- [ ] `/contact` — Two-column layout, form works, contact info visible, reassurance line
- [ ] Navigation — "Free Consultation" links to `/contact` in both desktop and mobile nav
- [ ] Homepage — SocialProof still works (uses shared data file)

**Step 4: Commit any fixes**

If anything needs fixing, commit the fixes.
