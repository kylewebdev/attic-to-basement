# ABE Liquidators Scaffold Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Scaffold a working Next.js skeleton with navigation, layout, Tailwind v4 theme, GSAP/Lenis integration, and page shells for the ABE Liquidators marketing site.

**Architecture:** Next.js App Router with `src/` directory. Tailwind v4 CSS-first configuration for design tokens, JS config only for typography plugin. Lenis for smooth scroll via a React provider in the root layout. GSAP with `useGSAP` hook for animations, plugins pre-registered in a shared lib file. React Compiler enabled for automatic rendering optimization.

**Tech Stack:** Next.js 15+, React 19+, TypeScript, Tailwind CSS v4, GSAP + @gsap/react, Lenis, @tailwindcss/typography, Formspree, React Compiler

**Design doc:** `docs/plans/2026-02-18-scaffold-design.md`

---

### Task 1: Initialize Next.js Project & Install Dependencies

**Files:**
- Create: project root via `create-next-app`
- Modify: `package.json` (additional deps)

**Step 1: Create Next.js project**

Run in the project root (`/home/kyle/Code/abel`):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git --use-npm
```

If it fails because the directory is non-empty, use a temp directory:

```bash
npx create-next-app@latest /tmp/abel-scaffold --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git --use-npm
cp -r /tmp/abel-scaffold/* /home/kyle/Code/abel/
cp /tmp/abel-scaffold/.gitignore /home/kyle/Code/abel/
cp /tmp/abel-scaffold/.eslintrc* /home/kyle/Code/abel/ 2>/dev/null
cp /tmp/abel-scaffold/eslint.config.* /home/kyle/Code/abel/ 2>/dev/null
rm -rf /tmp/abel-scaffold
```

**Step 2: Install additional dependencies**

```bash
npm install gsap @gsap/react lenis @tailwindcss/typography
```

**Step 3: Enable React Compiler**

In `next.config.ts`, add `reactCompiler: true`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
}

export default nextConfig
```

**Step 4: Clean boilerplate**

- Delete all demo content from `src/app/page.tsx` (replace with empty export)
- Delete demo styles from `src/app/globals.css` (keep only `@import "tailwindcss"`)
- Remove default font imports (Geist) from `src/app/layout.tsx`
- Move `src/app/globals.css` to `src/styles/globals.css`
- Update the import in `layout.tsx` from `./globals.css` to `@/styles/globals.css`
- Delete any default SVG/image files from `src/app/` or `public/` (except `favicon.ico`)

Temporary `src/app/page.tsx`:

```tsx
export default function HomePage() {
  return <main><h1>ABE Liquidators</h1></main>
}
```

Temporary `src/app/layout.tsx`:

```tsx
import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Step 5: Verify the project builds**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: initialize Next.js project with dependencies

Next.js App Router + TypeScript + Tailwind v4 + ESLint.
Additional deps: gsap, @gsap/react, lenis, @tailwindcss/typography.
React Compiler enabled. Boilerplate cleaned."
```

---

### Task 2: Tailwind v4 Theme & Global Styles

**Files:**
- Create: `src/styles/globals.css` (replace contents)
- Create: `tailwind.config.ts`

**Step 1: Write the Tailwind v4 theme in `src/styles/globals.css`**

```css
@import "tailwindcss";
@config "../../tailwind.config.ts";

/* ===== Design Tokens ===== */
@theme {
  /* Sage green palette — primary accent */
  --color-sage-50: #f6f7f4;
  --color-sage-100: #e8ebe3;
  --color-sage-200: #d1d7c7;
  --color-sage-300: #a8b496;
  --color-sage-400: #7f9268;
  --color-sage-500: #5c7a45;
  --color-sage-600: #4a6338;
  --color-sage-700: #3a4d2d;

  /* Warm neutrals */
  --color-warm-white: #faf9f6;
  --color-warm-50: #f5f3ef;
  --color-warm-100: #e8e4dc;
  --color-warm-200: #d4cec3;

  /* Gold accent */
  --color-gold-400: #c8a951;

  /* Typography — references next/font CSS variables set on <html> */
  --font-sans: var(--font-nunito-sans), "Nunito Sans", sans-serif;
  --font-serif: var(--font-libre-baskerville), "Libre Baskerville", serif;
}

/* ===== Base Styles ===== */
@layer base {
  body {
    @apply bg-warm-white text-stone-700 font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif text-stone-800;
  }

  /* Accessible focus ring */
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-sage-500;
  }
}
```

**Step 2: Create `tailwind.config.ts` for typography plugin**

```ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  plugins: [typography],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#44403c",
            "--tw-prose-headings": "#292524",
            "--tw-prose-links": "#4a6338",
            "--tw-prose-bold": "#292524",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-serif)",
            },
          },
        },
      },
    },
  },
} satisfies Config;
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. The `font-sans`, `font-serif`, `bg-sage-500`, `text-warm-white`, etc. utilities are now available.

**Step 4: Commit**

```bash
git add src/styles/globals.css tailwind.config.ts
git commit -m "style: configure Tailwind v4 theme with brand design tokens

Sage green palette, warm neutrals, gold accent, Libre Baskerville +
Nunito Sans font families. Typography plugin with prose overrides."
```

---

### Task 3: Lib Files

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/lib/metadata.ts`
- Create: `.env.local`

**Step 1: Create `src/lib/gsap.ts`**

```ts
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, useGSAP, ScrollTrigger };
```

**Step 2: Create `src/lib/metadata.ts`**

```ts
import type { Metadata } from "next";

const siteUrl = "https://abeliquidators.com";
const siteName = "ABE Liquidators";

type PageKey =
  | "home"
  | "estateSales"
  | "estateLiquidation"
  | "appraisals"
  | "ourPromise"
  | "reviews";

const pages: Record<PageKey, { title: string; description: string; path: string }> = {
  home: {
    title: "Estate Sale Services Sacramento | ABE Liquidators",
    description:
      "Full-service estate sales, buyouts, cleanouts, and appraisals across Northern California. Free consultation. 20+ years experience.",
    path: "",
  },
  estateSales: {
    title: "Estate Sale Management | ABE Liquidators",
    description:
      "Professional estate sale services from setup to cleanup. Free estimates, expert pricing, and full marketing included.",
    path: "/estate-sales",
  },
  estateLiquidation: {
    title: "Estate Liquidation Services | ABE Liquidators",
    description:
      "Estate sales, buyouts, and cleanouts for Northern California families. Fully insured, bonded, and experienced.",
    path: "/estate-liquidation",
  },
  appraisals: {
    title: "Personal Property Appraisals | ABE Liquidators",
    description:
      "Accurate appraisals for household goods, antiques, collectibles, and more. Expert valuations backed by 20+ years of experience.",
    path: "/appraisals",
  },
  ourPromise: {
    title: "Our Commitment to You | ABE Liquidators",
    description:
      "Transparent, respectful, and professional estate liquidation. Learn about ABE's values and client-centered approach.",
    path: "/our-promise",
  },
  reviews: {
    title: "Client Reviews and Testimonials | ABE Liquidators",
    description:
      "See what families across Northern California say about working with ABE Liquidators. 4.5 stars across review platforms.",
    path: "/reviews",
  },
};

export function getPageMetadata(page: PageKey): Metadata {
  const { title, description, path } = pages[page];
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
```

**Step 3: Create `.env.local`**

```
# Formspree form ID — get from https://formspree.io
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
```

**Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 5: Commit**

```bash
git add src/lib/gsap.ts src/lib/metadata.ts .env.local
git commit -m "feat: add GSAP registration and SEO metadata helpers

lib/gsap.ts registers useGSAP + ScrollTrigger plugins.
lib/metadata.ts provides per-page SEO metadata from the PRD.
.env.local placeholder for Formspree form ID."
```

---

### Task 4: UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/TestimonialCard.tsx`

**Step 1: Create `src/components/ui/Button.tsx`**

```tsx
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700",
  secondary:
    "border-2 border-sage-500 text-sage-600 hover:bg-sage-50 active:bg-sage-100",
  ghost:
    "text-sage-600 hover:text-sage-700 hover:bg-sage-50",
};

export default function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const styles = [
    "inline-flex items-center justify-center",
    "px-6 py-3 rounded-lg",
    "font-sans font-semibold text-sm",
    "transition-colors duration-200",
    "min-h-11 min-w-11", // 44px touch target
    variantStyles[variant],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
```

**Step 2: Create `src/components/ui/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="font-serif text-3xl md:text-4xl text-stone-800">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-stone-500 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

**Step 3: Create `src/components/ui/Card.tsx`**

```tsx
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function Card({ title, description, href, icon }: CardProps) {
  const content = (
    <div className="rounded-xl bg-warm-50 border border-warm-100 p-6 h-full">
      {icon && <div className="mb-4 text-sage-500">{icon}</div>}
      <h3 className="font-serif text-xl text-stone-800 mb-2">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:shadow-md transition-shadow duration-200">
        {content}
      </Link>
    );
  }

  return content;
}
```

**Step 4: Create `src/components/ui/TestimonialCard.tsx`**

```tsx
interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  rating,
}: TestimonialCardProps) {
  return (
    <blockquote className="rounded-xl bg-warm-50 border border-warm-100 p-6">
      {rating && (
        <div className="flex gap-1 mb-3" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={i < rating ? "text-gold-400" : "text-warm-200"}
              aria-hidden="true"
            >
              ★
            </span>
          ))}
        </div>
      )}
      <p className="text-stone-700 leading-relaxed italic mb-4">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="text-sm text-stone-500">
        <cite className="not-italic font-semibold text-stone-700">{name}</cite>
        {" — "}
        {location}
      </footer>
    </blockquote>
  );
}
```

**Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds (components aren't imported yet, but TypeScript should still compile them).

**Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI components — Button, SectionHeading, Card, TestimonialCard

Button with primary/secondary/ghost variants and 44px touch targets.
SectionHeading with serif title and optional subtitle.
Card for service/value blocks. TestimonialCard with star ratings."
```

---

### Task 5: SmoothScroll & Footer

**Files:**
- Create: `src/components/layout/SmoothScroll.tsx`
- Create: `src/components/layout/Footer.tsx`

**Step 1: Create `src/components/layout/SmoothScroll.tsx`**

```tsx
"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
```

**Step 2: Create `src/components/layout/Footer.tsx`**

```tsx
import Link from "next/link";

const navLinks = [
  { label: "Estate Sales", href: "/estate-sales" },
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
  { label: "Our Promise", href: "/our-promise" },
  { label: "Reviews", href: "/reviews" },
];

const externalLinks = [
  { label: "BBB", href: "https://www.bbb.org" },
  { label: "Yelp", href: "https://www.yelp.com" },
  { label: "EstateSales.net", href: "https://www.estatesales.net" },
  { label: "EstateSales.org", href: "https://www.estatesales.org" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-warm-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <p className="font-serif text-xl text-white mb-2">
              ABE Liquidators
            </p>
            <p className="text-sm text-warm-200">
              Attic to Basement Estate Liquidators
            </p>
            <p className="text-sm text-warm-200 mt-1">Sacramento, CA 95821</p>
            <a
              href="tel:+19165211077"
              className="inline-block mt-3 text-sage-300 hover:text-sage-200 font-semibold transition-colors"
            >
              (916) 521-1077
            </a>
            <div className="mt-2">
              <a
                href="https://www.instagram.com/abe.liquidators"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-warm-200 hover:text-white transition-colors"
              >
                @abe.liquidators
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="font-semibold text-white mb-3">Pages</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* External links + service area */}
          <div>
            <p className="font-semibold text-white mb-3">Find Us</p>
            <ul className="space-y-2 mb-6">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-warm-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-warm-200">
              Serving the Bay Area, Greater Sacramento, Placer County, El Dorado
              County, and the Sierra foothills.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-700 text-center text-sm text-warm-200">
          &copy; {new Date().getFullYear()} Attic to Basement Estate
          Liquidators. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/components/layout/SmoothScroll.tsx src/components/layout/Footer.tsx
git commit -m "feat: add SmoothScroll (Lenis) and Footer components

SmoothScroll wraps ReactLenis with ScrollTrigger sync.
Footer with company info, navigation, external links, service area."
```

---

### Task 6: Header & MobileNav

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MobileNav.tsx`

**Step 1: Create `src/components/layout/MobileNav.tsx`**

```tsx
"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Estate Sales", href: "/estate-sales" },
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
  { label: "Our Promise", href: "/our-promise" },
  { label: "Reviews", href: "/reviews" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: overlayRef });

  useEffect(() => {
    if (!overlayRef.current || !drawerRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, visibility: "visible", duration: 0.3 });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.visibility = "hidden";
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 opacity-0 invisible"
      aria-hidden={!isOpen}
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close menu"
      />

      {/* Drawer */}
      <nav
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-72 bg-warm-white shadow-xl translate-x-full"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-stone-600 hover:text-stone-800 min-h-11 min-w-11 flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="px-6 space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block py-3 text-lg text-stone-700 hover:text-sage-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-6 mt-6">
          <Button href="/#consultation" variant="primary" className="w-full">
            Free Consultation
          </Button>
        </div>
      </nav>
    </div>
  );
}
```

**Step 2: Create `src/components/layout/Header.tsx`**

```tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import MobileNav from "@/components/layout/MobileNav";

const navLinks = [
  { label: "Estate Sales", href: "/estate-sales" },
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
  { label: "Our Promise", href: "/our-promise" },
  { label: "Reviews", href: "/reviews" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (!headerRef.current) return;
          if (self.scroll() > 80) {
            gsap.to(headerRef.current, {
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              duration: 0.3,
            });
          } else {
            gsap.to(headerRef.current, {
              paddingTop: "1rem",
              paddingBottom: "1rem",
              boxShadow: "none",
              duration: 0.3,
            });
          }
        },
      });
    },
    { scope: headerRef }
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 bg-warm-white/95 backdrop-blur-sm py-4 transition-[padding]"
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl text-stone-800 hover:text-sage-600 transition-colors">
            ABE Liquidators
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-sans text-stone-600 hover:text-sage-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/#consultation" variant="primary">
              Free Consultation
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-stone-600 hover:text-stone-800 min-h-11 min-w-11 flex items-center justify-center"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/MobileNav.tsx
git commit -m "feat: add Header with scroll shrink and MobileNav drawer

Header: sticky, shrinks on scroll via GSAP ScrollTrigger, desktop nav
links, mobile hamburger trigger. 44px touch targets.
MobileNav: slide-out drawer with GSAP animations, overlay backdrop."
```

---

### Task 7: ConsultationForm & Section Components

**Files:**
- Create: `src/components/forms/ConsultationForm.tsx`
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/ConsultationCTA.tsx`
- Create: `src/components/sections/TrustBar.tsx`
- Create: `src/components/sections/ServicesOverview.tsx`
- Create: `src/components/sections/HowItWorks.tsx`
- Create: `src/components/sections/ServiceArea.tsx`
- Create: `src/components/sections/TestimonialHighlight.tsx`
- Create: `src/components/sections/MeetCortnee.tsx`

**Step 1: Create `src/components/forms/ConsultationForm.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";

export default function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-sage-50 border border-sage-200 p-8 text-center">
        <p className="font-serif text-2xl text-stone-800 mb-2">Thank you!</p>
        <p className="text-stone-600">
          We&apos;ve received your message and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="text"
        name="_gotcha"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-1">
          Name <span className="text-sage-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-warm-100 bg-white px-4 py-3 text-stone-700 placeholder:text-warm-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
          placeholder="Your full name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded-lg border border-warm-100 bg-white px-4 py-3 text-stone-700 placeholder:text-warm-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-1">
            Email <span className="text-sage-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-warm-100 bg-white px-4 py-3 text-stone-700 placeholder:text-warm-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-semibold text-stone-700 mb-1">
          City or Zip Code
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className="w-full rounded-lg border border-warm-100 bg-white px-4 py-3 text-stone-700 placeholder:text-warm-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
          placeholder="Sacramento, 95821, etc."
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-stone-700 mb-1">
          How can we help? <span className="text-sage-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className="w-full rounded-lg border border-warm-100 bg-white px-4 py-3 text-stone-700 placeholder:text-warm-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors resize-y"
          placeholder="Tell us briefly about your situation..."
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-semibold text-stone-700 mb-2">
          Preferred contact method
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contact_method"
              value="phone"
              defaultChecked
              className="text-sage-500 focus:ring-sage-500"
            />
            <span className="text-sm text-stone-700">Phone</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contact_method"
              value="email"
              className="text-sage-500 focus:ring-sage-500"
            />
            <span className="text-sm text-stone-700">Email</span>
          </label>
        </div>
      </fieldset>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please try again or call us at{" "}
          <a href="tel:+19165211077" className="underline">(916) 521-1077</a>.
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Schedule a Free Consultation"}
      </Button>
    </form>
  );
}
```

**Step 2: Create `src/components/sections/Hero.tsx`**

```tsx
import Button from "@/components/ui/Button";

interface HeroProps {
  title: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export default function Hero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-warm-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {(primaryCTA || secondaryCTA) && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Button href={primaryCTA.href} variant="primary">
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button href={secondaryCTA.href} variant="secondary">
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 3: Create `src/components/sections/ConsultationCTA.tsx`**

```tsx
import ConsultationForm from "@/components/forms/ConsultationForm";

interface ConsultationCTAProps {
  showForm?: boolean;
}

export default function ConsultationCTA({ showForm = false }: ConsultationCTAProps) {
  return (
    <section id="consultation" className="py-16 md:py-24 bg-sage-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-stone-500 max-w-xl mx-auto">
            Schedule a free, no-obligation consultation. We respond to inquiries
            7 days a week.
          </p>
          <a
            href="tel:+19165211077"
            className="inline-block mt-3 text-sage-600 hover:text-sage-700 font-semibold transition-colors"
          >
            Or call us: (916) 521-1077
          </a>
        </div>

        {showForm ? (
          <ConsultationForm />
        ) : (
          <div className="text-center">
            <Button href="/#consultation" variant="primary">
              Schedule a Free Consultation
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 4: Create section stubs**

Create these 6 files, each following this pattern. Replace `COMPONENT_NAME`, `SECTION_LABEL`, and optionally the background class:

```tsx
export default function COMPONENT_NAME() {
  return (
    <section className="py-16 md:py-24 BG_CLASS">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-stone-400 text-sm uppercase tracking-widest">
          SECTION_LABEL
        </p>
      </div>
    </section>
  );
}
```

| File | Component | Label | Background |
|---|---|---|---|
| `sections/TrustBar.tsx` | `TrustBar` | Trust Bar | `bg-sage-50` |
| `sections/ServicesOverview.tsx` | `ServicesOverview` | Services Overview | `bg-warm-white` |
| `sections/HowItWorks.tsx` | `HowItWorks` | How It Works | `bg-warm-50` |
| `sections/ServiceArea.tsx` | `ServiceArea` | Service Area | `bg-warm-white` |
| `sections/TestimonialHighlight.tsx` | `TestimonialHighlight` | Testimonials | `bg-sage-50` |
| `sections/MeetCortnee.tsx` | `MeetCortnee` | Meet Cortnee | `bg-warm-white` |

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add src/components/forms/ src/components/sections/
git commit -m "feat: add ConsultationForm, Hero, ConsultationCTA, and section stubs

ConsultationForm: Formspree integration, honeypot anti-spam, accessible
labels, validation, success/error states.
Hero: flexible props for title, subtitle, CTA buttons.
ConsultationCTA: optional embedded form or link-to-form.
Section stubs for TrustBar, ServicesOverview, HowItWorks, ServiceArea,
TestimonialHighlight, MeetCortnee."
```

---

### Task 8: Root Layout & Page Shells

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/estate-sales/page.tsx`
- Create: `src/app/estate-liquidation/page.tsx`
- Create: `src/app/appraisals/page.tsx`
- Create: `src/app/our-promise/page.tsx`
- Create: `src/app/reviews/page.tsx`

**Step 1: Write `src/app/layout.tsx`**

```tsx
import { Libre_Baskerville, Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import type { Metadata } from "next";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ABE Liquidators | Estate Sales & Liquidation Services",
    template: "%s",
  },
  description:
    "Full-service estate sales, buyouts, cleanouts, and appraisals across Northern California.",
  metadataBase: new URL("https://abeliquidators.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${nunitoSans.variable}`}
    >
      <body>
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>

        {/* Google Tag Manager — uncomment when GTM ID is available
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');`,
          }}
        />
        */}
      </body>
    </html>
  );
}
```

**Step 2: Write `src/app/page.tsx` (homepage)**

```tsx
import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesOverview from "@/components/sections/ServicesOverview";
import HowItWorks from "@/components/sections/HowItWorks";
import ServiceArea from "@/components/sections/ServiceArea";
import TestimonialHighlight from "@/components/sections/TestimonialHighlight";
import MeetCortnee from "@/components/sections/MeetCortnee";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata = getPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <Hero
        title="We handle everything so you don't have to"
        subtitle="Full-service estate sales, buyouts, cleanouts, and appraisals for Northern California families. Over 20 years of combined experience."
        primaryCTA={{ label: "Schedule a Free Consultation", href: "#consultation" }}
        secondaryCTA={{ label: "Learn How It Works", href: "/estate-sales" }}
      />
      <TrustBar />
      <ServicesOverview />
      <HowItWorks />
      <ServiceArea />
      <TestimonialHighlight />
      <MeetCortnee />
      <ConsultationCTA showForm />
    </>
  );
}
```

**Step 3: Create service page shells**

Each follows this pattern. Replace `PAGE_KEY`, `HERO_TITLE`, `HERO_SUBTITLE`:

```tsx
import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata = getPageMetadata("PAGE_KEY");

export default function PAGE_COMPONENT() {
  return (
    <>
      <Hero
        title="HERO_TITLE"
        subtitle="HERO_SUBTITLE"
      />
      <ConsultationCTA />
    </>
  );
}
```

| File | PageKey | Component | Title | Subtitle |
|---|---|---|---|---|
| `estate-sales/page.tsx` | `estateSales` | `EstateSalesPage` | Full-Service Estate Sales, Start to Finish | We handle every aspect of your estate sale with care and expertise. |
| `estate-liquidation/page.tsx` | `estateLiquidation` | `EstateLiquidationPage` | Comprehensive Estate Liquidation Solutions | Not every situation calls for a traditional sale. We offer multiple paths tailored to your needs. |
| `appraisals/page.tsx` | `appraisals` | `AppraisalsPage` | Accurate, Professional Appraisals | Knowing what your belongings are worth is the foundation of a successful estate sale. |
| `our-promise/page.tsx` | `ourPromise` | `OurPromisePage` | Our Commitment to You | We understand the emotional weight of estate liquidation. Here's what you can expect from us. |
| `reviews/page.tsx` | `reviews` | `ReviewsPage` | What Our Clients Say | The best measure of our work is the experience of the families we serve. |

**Step 4: Verify full build**

```bash
npm run build
```

Expected: Build succeeds with all 6 routes compiled.

**Step 5: Start dev server and verify all routes**

```bash
npm run dev
```

Manually verify these URLs load without errors:
- `http://localhost:3000`
- `http://localhost:3000/estate-sales`
- `http://localhost:3000/estate-liquidation`
- `http://localhost:3000/appraisals`
- `http://localhost:3000/our-promise`
- `http://localhost:3000/reviews`

Check:
- Header is sticky and visible on all pages
- Navigation links work between pages
- Mobile nav opens/closes (resize browser or use dev tools)
- Footer is present on all pages
- Homepage shows Hero + section stubs + ConsultationForm
- Service pages show Hero + ConsultationCTA link

**Step 6: Commit**

```bash
git add src/app/
git commit -m "feat: wire root layout and create all 6 page shells

Root layout: Libre Baskerville + Nunito Sans fonts, SmoothScroll
wrapper, Header, Footer, default metadata, GTM placeholder.
Homepage: Hero with CTAs, all section stubs, embedded ConsultationForm.
Service pages: Hero + ConsultationCTA link shells."
```

---

## Post-Scaffold Notes

After completing all 8 tasks, the project should:

1. Build successfully (`npm run build`)
2. Have a working dev server with all 6 routes
3. Show a sticky header with navigation between pages
4. Show a footer with company info on all pages
5. Have smooth scrolling via Lenis
6. Have GSAP ready to use via `import { gsap, useGSAP } from "@/lib/gsap"`
7. Have the consultation form on the homepage (won't submit until Formspree ID is configured)
8. Use the brand color palette and typography throughout

**What comes next (not part of this plan):**
- Build out each section component with real content
- Add placeholder images to `public/images/`
- Add LocalBusiness JSON-LD schema
- Configure Formspree with a real form ID
- Add GTM/GA4 with real container ID
