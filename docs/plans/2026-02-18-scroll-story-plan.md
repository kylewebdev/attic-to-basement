# Scroll-Story Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the homepage's placeholder sections with an 8-beat emotional narrative scroll story orchestrated by a monolithic GSAP ScrollTrigger timeline.

**Architecture:** A `ScrollStory` client component wraps all section components and owns a single GSAP timeline with `scrub: true`. Each section component receives the timeline ref and a start position, adding its own tweens to the parent timeline inside `useGSAP`. On mobile (`< 640px`), scrub is disabled and sections use intersection-based reveals. `prefers-reduced-motion` disables all animation.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, GSAP 3 + ScrollTrigger + @gsap/react, Lenis smooth scroll, Tailwind CSS v4

**Design Doc:** `docs/plans/2026-02-18-scroll-story-design.md`

**Existing Patterns:**
- `src/lib/gsap.ts` exports `gsap`, `useGSAP`, `ScrollTrigger` (already registered)
- `SmoothScroll.tsx` wraps the app with ReactLenis and syncs ScrollTrigger
- `Header.tsx` shows the pattern for `useGSAP` with `ScrollTrigger.create()`
- All section components are server components by default; add `"use client"` only for components that need GSAP
- Colors: `sage-50` through `sage-700`, `warm-white`, `warm-50/100/200`, `gold-400`, `stone-*`
- Fonts: `font-serif` (Libre Baskerville) for headings, `font-sans` (Nunito Sans) for body
- Touch targets: `min-h-11 min-w-11` (44px)
- The `Button` component accepts `href`, `variant`, `children`
- The `SectionHeading` component accepts `title`, `subtitle`, `align`

**No test framework is configured.** Verification uses `npm run build` (TypeScript strict + Next.js compilation) and `npm run lint`. Visual verification via `npm run dev`.

---

## Task 1: Create ScrollStory wrapper

**Files:**
- Create: `src/components/sections/ScrollStory.tsx`

**Step 1: Create the ScrollStory component**

This is the master timeline owner. It creates a GSAP timeline with `scrub: true`, calculates section positions, and passes the timeline to children via React context.

```tsx
"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

interface ScrollStoryContextValue {
  timeline: gsap.core.Timeline | null;
  registerSection: (
    position: number,
    duration: number,
    callback: (tl: gsap.core.Timeline, start: number, dur: number) => void
  ) => void;
}

const ScrollStoryContext = createContext<ScrollStoryContextValue>({
  timeline: null,
  registerSection: () => {},
});

export function useScrollStory() {
  return useContext(ScrollStoryContext);
}

// Section heights in vh units, matching the storyboard
const SECTION_HEIGHTS = [150, 200, 100, 300, 100, 200, 100]; // 7 sections, 1250vh total

function getSectionPosition(index: number): { start: number; duration: number } {
  const total = SECTION_HEIGHTS.reduce((sum, h) => sum + h, 0);
  let offset = 0;
  for (let i = 0; i < index; i++) {
    offset += SECTION_HEIGHTS[i];
  }
  return { start: offset / total, duration: SECTION_HEIGHTS[index] / total };
}

export { getSectionPosition, SECTION_HEIGHTS };

export default function ScrollStory({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const registrations = useRef<
    Array<{
      position: number;
      duration: number;
      callback: (tl: gsap.core.Timeline, start: number, dur: number) => void;
    }>
  >([]);

  const registerSection = (
    position: number,
    duration: number,
    callback: (tl: gsap.core.Timeline, start: number, dur: number) => void
  ) => {
    registrations.current.push({ position, duration, callback });
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // Check for mobile — use intersection reveals instead of scrub
      const isMobile = window.matchMedia("(max-width: 639px)").matches;

      if (isMobile) {
        // Mobile: simple intersection-based reveals for each section
        const sections = containerRef.current.querySelectorAll("[data-scroll-section]");
        sections.forEach((section) => {
          const targets = section.querySelectorAll("[data-animate]");
          if (targets.length === 0) return;

          gsap.set(targets, { opacity: 0, y: 30 });

          ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {
              gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
              });
            },
            once: true,
          });
        });
        return;
      }

      // Desktop: monolithic scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      timelineRef.current = tl;

      // Process all registered sections
      registrations.current.forEach(({ position, duration, callback }) => {
        callback(tl, position, duration);
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <ScrollStoryContext.Provider
      value={{ timeline: timelineRef.current, registerSection }}
    >
      <div ref={containerRef}>{children}</div>
    </ScrollStoryContext.Provider>
  );
}
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Successful build with no TypeScript errors

**Step 3: Commit**

```bash
git add src/components/sections/ScrollStory.tsx
git commit -m "feat: add ScrollStory master timeline wrapper"
```

---

## Task 2: Create Hook section

**Files:**
- Create: `src/components/sections/Hook.tsx`

**Step 1: Create the Hook component**

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

export default function Hook() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(0);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector("[data-hook-headline]");
    const subtext = sectionRef.current.querySelector("[data-hook-subtext]");
    const bg = sectionRef.current.querySelector("[data-hook-bg]");
    const arrow = sectionRef.current.querySelector("[data-hook-arrow]");

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: d * 0.3, ease: "power2.out" },
        s
      );
    }
    if (subtext) {
      tl.fromTo(
        subtext,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: d * 0.4, ease: "power2.out" },
        s + d * 0.2
      );
    }
    if (bg) {
      tl.fromTo(
        bg,
        { scale: 1 },
        { scale: 1.05, duration: d * 0.3, ease: "none" },
        s + d * 0.5
      );
    }
    if (arrow) {
      tl.to(arrow, { opacity: 0, duration: d * 0.3 }, s + d * 0.7);
    }
  });

  useGSAP(() => {}, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="relative min-h-[150vh] flex items-start justify-center overflow-hidden"
    >
      {/* Background placeholder */}
      <div
        data-hook-bg
        data-animate
        className="absolute inset-0 bg-gradient-to-b from-warm-white to-warm-50"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-40 md:pt-52">
        <h1
          data-hook-headline
          data-animate
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-tight"
        >
          A lifetime of memories. One decision to make.
        </h1>
        <p
          data-hook-subtext
          data-animate
          className="mt-8 text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed"
        >
          Whether you are downsizing, settling an estate, or simply ready for a
          fresh start, the weight of sorting through a home full of belongings
          can feel impossible. You do not have to carry it alone.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        data-hook-arrow
        data-animate
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-400 animate-bounce"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/components/sections/Hook.tsx
git commit -m "feat: add Hook section (scroll story beat 1)"
```

---

## Task 3: Create Tension section

**Files:**
- Create: `src/components/sections/Tension.tsx`

**Step 1: Create the Tension component**

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

const questions = [
  "What is worth selling? What should be donated? What do you keep?",
  "How do you price a lifetime of collected things fairly?",
  "Who handles the marketing, the staging, the buyers, the cleanup?",
  "And how do you do all of this while grieving, or while managing a move, or while living 200 miles away?",
];

// Progressive text styling — each question gets heavier
const questionStyles = [
  "text-stone-400 text-lg md:text-xl",
  "text-stone-500 text-xl md:text-2xl",
  "text-stone-600 text-xl md:text-2xl font-medium",
  "text-stone-700 text-2xl md:text-3xl font-semibold",
];

export default function Tension() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(1);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector(
      "[data-tension-headline]"
    );
    const items = sectionRef.current.querySelectorAll("[data-tension-q]");

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: d * 0.15, ease: "power2.out" },
        s
      );
    }

    items.forEach((item, i) => {
      const segmentStart = s + d * (0.15 + i * 0.175);
      tl.fromTo(
        item,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: d * 0.15, ease: "power2.out" },
        segmentStart
      );
    });
  });

  useGSAP(() => {}, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[200vh] flex items-start justify-center bg-warm-white"
    >
      <div className="max-w-3xl mx-auto px-4 pt-32 md:pt-40 space-y-10">
        <h2
          data-tension-headline
          data-animate
          className="font-serif text-3xl md:text-4xl text-stone-800 text-center"
        >
          Every room tells a story. Every drawer holds a decision.
        </h2>

        <div className="space-y-8 pt-8">
          {questions.map((q, i) => (
            <p
              key={i}
              data-tension-q
              data-animate
              className={`leading-relaxed ${questionStyles[i]}`}
            >
              {q}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/components/sections/Tension.tsx
git commit -m "feat: add Tension section (scroll story beat 2)"
```

---

## Task 4: Create Turn section

**Files:**
- Create: `src/components/sections/Turn.tsx`

**Step 1: Create the Turn component**

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

export default function Turn() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(2);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector("[data-turn-headline]");
    const subtext = sectionRef.current.querySelector("[data-turn-subtext]");
    const supporting = sectionRef.current.querySelector(
      "[data-turn-supporting]"
    );
    const photo = sectionRef.current.querySelector("[data-turn-photo]");

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: d * 0.35, ease: "power3.out" },
        s + d * 0.15
      );
    }
    if (subtext) {
      tl.fromTo(
        subtext,
        { opacity: 0 },
        { opacity: 1, duration: d * 0.3, ease: "power2.out" },
        s + d * 0.4
      );
    }
    if (supporting) {
      tl.fromTo(
        supporting,
        { opacity: 0 },
        { opacity: 1, duration: d * 0.3, ease: "power2.out" },
        s + d * 0.4
      );
    }
    if (photo) {
      tl.fromTo(
        photo,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: d * 0.3, ease: "power2.out" },
        s + d * 0.5
      );
    }
  });

  useGSAP(() => {}, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[100vh] flex items-center bg-sage-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2
            data-turn-headline
            data-animate
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-800 leading-tight"
          >
            That is where we come in.
          </h2>
          <p
            data-turn-subtext
            data-animate
            className="mt-6 text-lg text-stone-600 leading-relaxed"
          >
            Attic to Basement Estate Liquidators handles everything, from the
            first walkthrough to the final sweep, so you do not have to figure
            it out alone.
          </p>
          <p
            data-turn-supporting
            data-animate
            className="mt-4 text-stone-500 leading-relaxed"
          >
            Over 20 years of combined experience across Northern California.
            Hundreds of families served. Led by Cortnee Beggs, who treats every
            home like it matters, because it does.
          </p>
        </div>

        {/* Photo placeholder */}
        <div
          data-turn-photo
          data-animate
          className="aspect-[4/3] rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center"
          aria-label="Team photo placeholder"
        >
          <span className="text-sage-400 text-sm uppercase tracking-widest">
            Team Photo
          </span>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/components/sections/Turn.tsx
git commit -m "feat: add Turn section (scroll story beat 3)"
```

---

## Task 5: Create Process section

**Files:**
- Create: `src/components/sections/Process.tsx`

**Step 1: Create the Process component**

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

const steps = [
  {
    number: 1,
    title: "Free Consultation",
    description:
      "You call or fill out a form. We come to you, walk through the property, and talk through your goals. No cost, no pressure, no obligation.",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    number: 2,
    title: "Planning and Appraisal",
    description:
      "We evaluate everything in the home. Our certified team prices items accurately based on current market value, not guesswork. Together, we build a plan tailored to your timeline and needs.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  },
  {
    number: 3,
    title: "Organizing and Staging",
    description:
      "We transform the space. Items are sorted, cleaned, displayed, and arranged for maximum buyer appeal.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    number: 4,
    title: "Marketing and Promotion",
    description:
      "Your sale gets listed on EstateSales.net, EstateSales.org, and promoted across our channels. Addresses go live at 6 AM on sale day. We bring the buyers to you.",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  },
  {
    number: 5,
    title: "Sale Day Execution",
    description:
      "We run the entire sale: managing foot traffic, answering questions, handling transactions, and keeping everything organized and secure. You can be there or not. We have it covered.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    number: 6,
    title: "Post-Sale Resolution",
    description:
      "After the sale, we handle remaining items through buyout, cleanout, or coordinated donation to a nonprofit of your choice. You get an itemized list of everything sold. The home is left clean and ready for its next chapter.",
    icon: "M5 13l4 4L19 7",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(3);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector(
      "[data-process-headline]"
    );
    const progressLine = sectionRef.current.querySelector(
      "[data-process-line]"
    );
    const stepEls = sectionRef.current.querySelectorAll("[data-process-step]");

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: d * 0.1, ease: "power2.out" },
        s
      );
    }

    if (progressLine) {
      tl.fromTo(
        progressLine,
        { scaleY: 0 },
        { scaleY: 1, duration: d * 0.85, ease: "none" },
        s + d * 0.1
      );
    }

    stepEls.forEach((step, i) => {
      const stepStart = s + d * (0.1 + i * 0.15);
      const icon = step.querySelector("[data-step-icon]");
      const text = step.querySelector("[data-step-text]");

      if (icon) {
        tl.fromTo(
          icon,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: d * 0.08, ease: "back.out(1.7)" },
          stepStart
        );
      }
      if (text) {
        tl.fromTo(
          text,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: d * 0.1, ease: "power2.out" },
          stepStart + d * 0.03
        );
      }

      // Fade previous step's text
      if (i > 0) {
        const prevText = stepEls[i - 1].querySelector("[data-step-text]");
        if (prevText) {
          tl.to(
            prevText,
            { opacity: 0.4, duration: d * 0.08 },
            stepStart
          );
        }
      }
    });
  });

  useGSAP(() => {}, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[300vh] bg-warm-white py-20"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2
          data-process-headline
          data-animate
          className="font-serif text-3xl md:text-4xl text-stone-800 text-center mb-16"
        >
          From attic to basement. Here is how it works.
        </h2>

        <div className="relative">
          {/* Progress line */}
          <div
            data-process-line
            className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-sage-200 origin-top"
            aria-hidden="true"
          />

          <div className="space-y-16">
            {steps.map((step) => (
              <div
                key={step.number}
                data-process-step
                className="relative flex gap-6 md:gap-8"
              >
                {/* Icon circle */}
                <div
                  data-step-icon
                  data-animate
                  className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-sage-500 text-white flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={step.icon} />
                  </svg>
                </div>

                {/* Text */}
                <div data-step-text data-animate className="pt-1">
                  <h3 className="font-serif text-xl md:text-2xl text-stone-800 mb-2">
                    Step {step.number}: {step.title}
                  </h3>
                  <p className="text-stone-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/components/sections/Process.tsx
git commit -m "feat: add Process section (scroll story beat 4)"
```

---

## Task 6: Create ServiceAreaMap SVG and update ServiceArea

**Files:**
- Create: `src/components/sections/ServiceAreaMap.tsx`
- Modify: `src/components/sections/ServiceArea.tsx`

**Step 1: Create the SVG map component**

This is a simplified SVG outline of Northern California with five labeled regions as individual paths. The paths are approximate — they mark the general areas, not precise county boundaries.

```tsx
interface ServiceAreaMapProps {
  className?: string;
}

const regions = [
  {
    id: "sacramento",
    label: "Greater Sacramento",
    d: "M120 140 L160 130 L170 150 L165 175 L140 180 L115 170 Z",
    labelX: 140,
    labelY: 160,
  },
  {
    id: "bay-area",
    label: "Bay Area",
    d: "M40 155 L75 140 L95 150 L100 175 L85 195 L55 190 L35 175 Z",
    labelX: 68,
    labelY: 170,
  },
  {
    id: "placer",
    label: "Placer County",
    d: "M155 105 L195 95 L205 120 L195 140 L165 135 L155 120 Z",
    labelX: 178,
    labelY: 120,
  },
  {
    id: "eldorado",
    label: "El Dorado County",
    d: "M175 140 L210 130 L225 150 L215 170 L185 175 L170 155 Z",
    labelX: 195,
    labelY: 155,
  },
  {
    id: "foothills",
    label: "Sierra Foothills",
    d: "M210 90 L250 70 L265 100 L255 135 L225 145 L210 125 Z",
    labelX: 238,
    labelY: 110,
  },
];

export default function ServiceAreaMap({ className = "" }: ServiceAreaMapProps) {
  return (
    <svg
      viewBox="0 0 300 280"
      className={className}
      role="img"
      aria-label="Map of Northern California service areas including Greater Sacramento, Bay Area, Placer County, El Dorado County, and Sierra Foothills"
    >
      {/* NorCal outline */}
      <path
        d="M10 50 L50 20 L120 10 L200 15 L270 40 L285 80 L275 140 L260 180 L230 220 L180 250 L120 260 L60 240 L25 200 L10 150 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-stone-300"
      />

      {/* Region paths */}
      {regions.map((region) => (
        <g key={region.id} data-region={region.id}>
          <path
            d={region.d}
            className="fill-transparent stroke-sage-300 transition-colors"
            strokeWidth="1.5"
            data-region-path
          />
          <text
            x={region.labelX}
            y={region.labelY}
            textAnchor="middle"
            className="fill-stone-600 text-[8px] font-sans"
            data-region-label
          >
            {region.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
```

**Step 2: Rewrite ServiceArea.tsx to use the map and scroll animations**

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";
import ServiceAreaMap from "./ServiceAreaMap";

export default function ServiceArea() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(4);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector("[data-area-headline]");
    const regionPaths = sectionRef.current.querySelectorAll(
      "[data-region-path]"
    );
    const regionLabels = sectionRef.current.querySelectorAll(
      "[data-region-label]"
    );
    const subtext = sectionRef.current.querySelector("[data-area-subtext]");

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: d * 0.2, ease: "power2.out" },
        s
      );
    }

    // Animate each region sequentially
    regionPaths.forEach((path, i) => {
      const regionStart = s + d * (0.2 + i * 0.12);
      tl.to(
        path,
        {
          fill: "#d1d7c7", // sage-200
          stroke: "#5c7a45", // sage-500
          duration: d * 0.1,
          ease: "power2.out",
        },
        regionStart
      );
      if (regionLabels[i]) {
        tl.fromTo(
          regionLabels[i],
          { opacity: 0 },
          { opacity: 1, duration: d * 0.08 },
          regionStart + d * 0.02
        );
      }
    });

    if (subtext) {
      tl.fromTo(
        subtext,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: d * 0.2, ease: "power2.out" },
        s + d * 0.8
      );
    }
  });

  useGSAP(() => {}, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[100vh] flex items-center bg-warm-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2
          data-area-headline
          data-animate
          className="font-serif text-3xl md:text-4xl text-stone-800 mb-12"
        >
          Serving Northern California, from the Bay to the Foothills
        </h2>

        <ServiceAreaMap className="w-full max-w-lg mx-auto text-stone-400 mb-10" />

        <p
          data-area-subtext
          data-animate
          className="text-lg text-stone-500"
        >
          Not sure if you are in our range?{" "}
          <a
            href="tel:+19165211077"
            className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
          >
            Call us
          </a>
          . We will figure it out.
        </p>
      </div>
    </section>
  );
}
```

**Step 3: Verify build passes**

Run: `npm run build`
Expected: Successful build

**Step 4: Commit**

```bash
git add src/components/sections/ServiceAreaMap.tsx src/components/sections/ServiceArea.tsx
git commit -m "feat: add SVG map and update ServiceArea (scroll story beat 5)"
```

---

## Task 7: Create SocialProof section

**Files:**
- Create: `src/components/sections/SocialProof.tsx`

**Step 1: Create the SocialProof component**

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";
import TestimonialCard from "@/components/ui/TestimonialCard";
import Button from "@/components/ui/Button";

const testimonials = [
  {
    quote:
      "Cortnee and her team turned what felt like an impossible task into something completely manageable. They organized my mother's entire home in just three days.",
    name: "Sarah M.",
    location: "Yelp",
    rating: 5,
  },
  {
    quote:
      "We were settling my father's estate from out of state and Cortnee handled every detail. The itemized report after the sale was incredibly thorough.",
    name: "David R.",
    location: "BBB",
    rating: 5,
  },
  {
    quote:
      "I've been to dozens of estate sales and ABE's are always the best organized. Fair prices, friendly staff, and the homes are staged beautifully.",
    name: "Linda K.",
    location: "EstateSales.org",
    rating: 5,
  },
  {
    quote:
      "Made an impossible situation manageable. We were grieving and overwhelmed, and Cortnee treated everything with such care and respect.",
    name: "James T.",
    location: "Yelp",
    rating: 5,
  },
  {
    quote:
      "Professional from start to finish. The sale brought in more than we expected, and the donation coordination afterward was a wonderful touch.",
    name: "Patricia H.",
    location: "EstateSales.org",
    rating: 4,
  },
];

const stats = [
  { value: 20, suffix: "+", label: "Years Combined Experience" },
  { value: 4.5, suffix: "", label: "Star Average Rating", decimals: 1 },
  { value: 49, suffix: "+", label: "Reviews on Yelp" },
  { value: 0, suffix: "", label: "BBB Accredited", isBadge: true },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(5);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector(
      "[data-social-headline]"
    );
    const cards = sectionRef.current.querySelectorAll("[data-social-card]");
    const statEls = sectionRef.current.querySelectorAll("[data-social-stat]");
    const statNumbers = sectionRef.current.querySelectorAll(
      "[data-stat-number]"
    );
    const footer = sectionRef.current.querySelector("[data-social-footer]");

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: d * 0.15, ease: "power2.out" },
        s
      );
    }

    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: d * 0.08, ease: "power2.out" },
        s + d * (0.15 + i * 0.08)
      );
    });

    statEls.forEach((stat, i) => {
      tl.fromTo(
        stat,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: d * 0.06, ease: "power2.out" },
        s + d * (0.55 + i * 0.05)
      );
    });

    // Animate counter numbers
    statNumbers.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      const decimals = parseInt(el.getAttribute("data-decimals") || "0");
      if (target > 0) {
        tl.from(
          { val: 0 },
          {
            val: target,
            duration: d * 0.2,
            ease: "power2.out",
            onUpdate: function () {
              const current = this.targets()[0].val as number;
              el.textContent = decimals > 0
                ? current.toFixed(decimals)
                : Math.round(current).toString();
            },
          },
          s + d * 0.55
        );
      }
    });

    if (footer) {
      tl.fromTo(
        footer,
        { opacity: 0 },
        { opacity: 1, duration: d * 0.15 },
        s + d * 0.8
      );
    }
  });

  useGSAP(() => {}, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[200vh] bg-sage-50 py-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2
          data-social-headline
          data-animate
          className="font-serif text-3xl md:text-4xl text-stone-800 text-center mb-12"
        >
          Do not take our word for it.
        </h2>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div key={i} data-social-card data-animate>
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                location={t.location}
                rating={t.rating}
              />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-sage-200">
          {stats.map((stat, i) => (
            <div
              key={i}
              data-social-stat
              data-animate
              className="text-center"
            >
              {stat.isBadge ? (
                <div className="text-2xl md:text-3xl font-serif text-sage-600 font-bold">
                  BBB
                </div>
              ) : (
                <div className="text-2xl md:text-3xl font-serif text-sage-600 font-bold">
                  <span
                    data-stat-number
                    data-target={stat.value}
                    data-decimals={stat.decimals || 0}
                  >
                    0
                  </span>
                  {stat.suffix}
                </div>
              )}
              <p className="mt-1 text-sm text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div
          data-social-footer
          data-animate
          className="mt-10 text-center"
        >
          <Button href="/reviews" variant="secondary">
            See All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/components/sections/SocialProof.tsx
git commit -m "feat: add SocialProof section (scroll story beat 6)"
```

---

## Task 8: Create TheAsk section

**Files:**
- Create: `src/components/sections/TheAsk.tsx`

**Step 1: Create the TheAsk component**

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";
import Button from "@/components/ui/Button";

export default function TheAsk() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(6);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector("[data-ask-headline]");
    const subtext = sectionRef.current.querySelector("[data-ask-subtext]");
    const cta = sectionRef.current.querySelector("[data-ask-cta]");
    const phone = sectionRef.current.querySelector("[data-ask-phone]");

    if (headline) {
      tl.fromTo(
        headline,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: d * 0.4, ease: "power2.out" },
        s + d * 0.2
      );
    }
    if (subtext) {
      tl.fromTo(
        subtext,
        { opacity: 0 },
        { opacity: 1, duration: d * 0.3, ease: "power2.out" },
        s + d * 0.5
      );
    }
    if (cta) {
      tl.fromTo(
        cta,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: d * 0.2, ease: "power2.out" },
        s + d * 0.5
      );
    }
    if (phone) {
      tl.fromTo(
        phone,
        { opacity: 0 },
        { opacity: 1, duration: d * 0.3 },
        s + d * 0.7
      );
    }
  });

  useGSAP(() => {}, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[100vh] flex items-center bg-warm-white"
    >
      <div className="max-w-2xl mx-auto px-4 text-center py-20">
        <h2
          data-ask-headline
          data-animate
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-800 leading-tight"
        >
          Ready to talk? We are ready to listen.
        </h2>
        <p
          data-ask-subtext
          data-animate
          className="mt-6 text-lg text-stone-500 leading-relaxed"
        >
          Schedule your free, no-obligation consultation. We will come to you,
          walk through your situation, and give you a clear plan. No surprises.
        </p>
        <div data-ask-cta data-animate className="mt-10">
          <Button href="/contact" variant="primary">
            Schedule Your Free Consultation
          </Button>
        </div>
        <p
          data-ask-phone
          data-animate
          className="mt-6 text-stone-500"
        >
          Prefer to call?{" "}
          <a
            href="tel:+19165211077"
            className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
          >
            (916) 521-1077
          </a>
          . We are available 24/7.
        </p>
      </div>
    </section>
  );
}
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/components/sections/TheAsk.tsx
git commit -m "feat: add TheAsk section (scroll story beat 7)"
```

---

## Task 9: Wire up page.tsx and clean up old files

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/sections/TrustBar.tsx`
- Delete: `src/components/sections/ServicesOverview.tsx`
- Delete: `src/components/sections/MeetCortnee.tsx`
- Delete: `src/components/sections/HowItWorks.tsx`
- Delete: `src/components/sections/TestimonialHighlight.tsx`

**Step 1: Check that old components aren't imported elsewhere**

Run: `grep -r "TrustBar\|ServicesOverview\|MeetCortnee\|HowItWorks\|TestimonialHighlight" src/ --include="*.tsx" --include="*.ts" -l`

Expected: Only `src/app/page.tsx` should appear. If other files import these, update them first.

**Step 2: Rewrite page.tsx**

Replace the contents of `src/app/page.tsx` with:

```tsx
import { getPageMetadata } from "@/lib/metadata";
import ScrollStory from "@/components/sections/ScrollStory";
import Hook from "@/components/sections/Hook";
import Tension from "@/components/sections/Tension";
import Turn from "@/components/sections/Turn";
import Process from "@/components/sections/Process";
import ServiceArea from "@/components/sections/ServiceArea";
import SocialProof from "@/components/sections/SocialProof";
import TheAsk from "@/components/sections/TheAsk";

export const metadata = getPageMetadata("home");

export default function HomePage() {
  return (
    <ScrollStory>
      <Hook />
      <Tension />
      <Turn />
      <Process />
      <ServiceArea />
      <SocialProof />
      <TheAsk />
    </ScrollStory>
  );
}
```

**Step 3: Delete old stub files**

```bash
rm src/components/sections/TrustBar.tsx
rm src/components/sections/ServicesOverview.tsx
rm src/components/sections/MeetCortnee.tsx
rm src/components/sections/HowItWorks.tsx
rm src/components/sections/TestimonialHighlight.tsx
```

**Step 4: Verify build passes**

Run: `npm run build`
Expected: Successful build with no import errors

**Step 5: Verify lint passes**

Run: `npm run lint`
Expected: No errors

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: wire up scroll story homepage, remove old placeholder sections"
```

---

## Task 10: Visual verification and adjustments

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Verify in browser**

Open `http://localhost:3000` and check:

1. All 7 sections render in order
2. Scrolling triggers animations on desktop (scrub behavior)
3. Section heights create the intended pacing (12vh total scroll)
4. The Hook headline fades in first
5. Tension questions accumulate with progressive weight
6. Turn section brightens and snaps in
7. Process timeline progresses step-by-step
8. Service area map regions fill sequentially
9. Social proof cards stagger in, stat counters animate
10. TheAsk section is clean and focused
11. Scroll indicator in Hook disappears as you scroll

**Step 3: Check mobile behavior**

Resize to mobile width (< 640px) and verify:
- Sections use simple fade-in reveals, no scrub
- Layout stacks properly (Turn photo above text, etc.)
- Touch targets are 44px minimum
- Text is readable without animation interference

**Step 4: Check reduced motion**

Enable `prefers-reduced-motion: reduce` in browser dev tools and verify:
- No animations play
- All content is visible immediately

**Step 5: Fix any issues found during verification**

Address visual bugs, animation timing, spacing, or responsive layout issues.

**Step 6: Final build check**

Run: `npm run build && npm run lint`
Expected: Both pass

**Step 7: Commit any fixes**

```bash
git add -A
git commit -m "fix: scroll story visual adjustments from manual review"
```
