# Scroll-Story Homepage Design

## Overview

Remap the homepage from its current placeholder sections to an 8-beat emotional narrative scroll story, as described in `docs/story-driven.md`. The entire homepage is orchestrated by a single monolithic GSAP ScrollTrigger timeline.

## Decisions

| Decision | Choice |
|----------|--------|
| Section mapping | Full remap to storyboard's 8-beat arc |
| Animation architecture | Monolithic ScrollTrigger timeline |
| Desktop animations | Full `scrub: true` scroll-linked |
| Mobile animations | Intersection-based reveals (no scrub) |
| Service area map | Custom SVG with scroll-animated region fills |
| Photography | Placeholder slots (brand colors/gradients) |
| Tension effect | Staggered text reveals (progressive weight) |
| Process layout | Vertical stepped timeline |
| Testimonials | Placeholder content matching storyboard criteria |
| Reduced motion | All animations disabled, static layout |

## Architecture

### Master Timeline

`ScrollStory.tsx` wraps all section components and owns a single GSAP timeline:

```
page.tsx
└── <ScrollStory>          ← master timeline, scrub: true
    ├── <Hook />           ← 1.5vh, 0-12.5%
    ├── <Tension />        ← 2.0vh, 12.5-29%
    ├── <Turn />           ← 1.0vh, 29-37.5%
    ├── <Process />        ← 3.0vh, 37.5-62.5%
    ├── <ServiceArea />    ← 1.0vh, 62.5-71%
    ├── <SocialProof />    ← 2.0vh, 71-87.5%
    ├── <TheAsk />         ← 1.0vh, 87.5-96%
    └── (Footer in layout) ← 0.5vh, 96-100%
```

Total scroll distance: ~12 viewport heights.

Each section component receives the parent timeline ref and a position value. Inside `useGSAP`, each section adds its animation segment at the correct timeline position using `timeline.add(sectionTween, position)`.

On mobile (`< 640px`), scrub is disabled. Sections use `toggleActions: "play none none none"` with intersection-based triggers instead.

`prefers-reduced-motion` detected via `window.matchMedia`. If true, all animations are skipped — everything renders statically.

---

## Sections

### Section 1: Hook

**Height:** 150vh. **Pace:** Slow, meditative.

**Content:**
- Headline: "A lifetime of memories. One decision to make."
- Subtext: "Whether you are downsizing, settling an estate, or simply ready for a fresh start, the weight of sorting through a home full of belongings can feel impossible. You do not have to carry it alone."
- Animated down-arrow scroll indicator

**Animation (scrubbed, % of section):**
1. 0-30%: Headline fades in (`opacity: 0, y: 30` to visible)
2. 20-60%: Subtext fades in (overlapping start)
3. 50-80%: Background placeholder slow-zooms (`scale: 1.0` to `1.05`, Ken Burns)
4. 70-100%: Scroll indicator fades out

**Layout:** Full viewport, content centered. Muted warm background (sage-50). Placeholder image behind text with low-opacity overlay.

**Mobile:** Headline and subtext fade in on intersection. No background zoom.

---

### Section 2: Tension

**Height:** 200vh. **Pace:** Medium, building weight.

**Content:**
- Headline: "Every room tells a story. Every drawer holds a decision."
- Four questions revealed sequentially:
  1. "What is worth selling? What should be donated? What do you keep?"
  2. "How do you price a lifetime of collected things fairly?"
  3. "Who handles the marketing, the staging, the buyers, the cleanup?"
  4. "And how do you do all of this while grieving, or while managing a move, or while living 200 miles away?"

**Animation (scrubbed):**
1. 0-15%: Section headline fades in
2. 15-35%: Question 1 slides up
3. 30-50%: Question 2 appears, slightly larger/bolder
4. 45-65%: Question 3, spacing tightens
5. 60-80%: Question 4 — heaviest, darkest color
6. 80-100%: All hold (the "let the weight sit" beat)

**Visual:** Progressive color weight (sage-100 to sage-500 text). Slight font-size increase per question. Clean warm-white background, no imagery.

**Mobile:** Questions fade in sequentially with stagger delay. No progressive sizing.

---

### Section 3: The Turn

**Height:** 100vh. **Pace:** Quick snap, relief.

**Content:**
- Headline: "That is where we come in."
- Subtext: "Attic to Basement Estate Liquidators handles everything, from the first walkthrough to the final sweep, so you do not have to figure it out alone."
- Supporting: "Over 20 years of combined experience across Northern California. Hundreds of families served. Led by Cortnee Beggs, who treats every home like it matters, because it does."
- Placeholder image slot for team/Cortnee photo

**Animation (scrubbed):**
1. 0-20%: Background brightens (warm-white to lighter tone)
2. 15-50%: Headline snaps in (`opacity: 0, y: -20`, faster than Hook)
3. 40-70%: Subtext and supporting text fade in
4. 50-80%: Photo placeholder slides in from right
5. 80-100%: Content holds

**Layout:** Two-column desktop (text left, photo right). Stacked on mobile/tablet. Background sage-50/warm cream.

**Mobile:** Single column, photo above text. Fade in on intersection.

---

### Section 4: Process

**Height:** 300vh. **Pace:** Steady, ordered.

**Content:** Six steps:
1. **Free Consultation** — "You call or fill out a form. We come to you, walk through the property, and talk through your goals. No cost, no pressure, no obligation."
2. **Planning and Appraisal** — "We evaluate everything in the home. Our certified team prices items accurately based on current market value, not guesswork. Together, we build a plan tailored to your timeline and needs."
3. **Organizing and Staging** — "We transform the space. Items are sorted, cleaned, displayed, and arranged for maximum buyer appeal."
4. **Marketing and Promotion** — "Your sale gets listed on EstateSales.net, EstateSales.org, and promoted across our channels. Addresses go live at 6 AM on sale day. We bring the buyers to you."
5. **Sale Day Execution** — "We run the entire sale: managing foot traffic, answering questions, handling transactions, and keeping everything organized and secure. You can be there or not. We have it covered."
6. **Post-Sale Resolution** — "After the sale, we handle remaining items through buyout, cleanout, or coordinated donation to a nonprofit of your choice. You get an itemized list of everything sold. The home is left clean and ready for its next chapter."

**Animation (scrubbed):**
1. 0-10%: Section headline "From attic to basement. Here is how it works." fades in
2. 10-100%: Each step occupies ~15% of scroll:
   - Vertical progress line extends downward
   - Step number/icon scales from 0 to 1
   - Title appears
   - Description fades in
   - Previous step text fades to 0.4 opacity

**Layout:** Vertical timeline, thin sage progress line on left. Step numbers in circles. Title + description right of each circle. Simple line icons per step (decorative).

**Mobile:** Same vertical layout. Steps fade in on scroll.

---

### Section 5: Service Area

**Height:** 100vh. **Pace:** Fast, visual.

**Content:**
- Headline: "Serving Northern California, from the Bay to the Foothills"
- SVG map with five regions
- Subtext: "Not sure if you are in our range? Call us. We will figure it out."

**Animation (scrubbed):**
1. 0-20%: Headline fades in
2. 20-80%: SVG regions fill sequentially — Sacramento, Bay Area, Placer County, El Dorado County, Sierra foothills. Each transitions from stroke-only outline to filled sage with a subtle scale pulse
3. 80-100%: Subtext fades in

**SVG map:** Simplified Northern California outline. Five labeled regions as individual `<path>` elements for GSAP targeting. Inline SVG component.

**Mobile:** Map stacks above text. Regions fill on intersection with stagger.

---

### Section 6: Social Proof

**Height:** 200vh. **Pace:** Medium, let the proof land.

**Content:**
- Headline: "Do not take our word for it."
- 5 placeholder testimonial cards (quote, name/initials, platform, stars)
- Stats bar: 20+ years, 4.5/5 stars, 49+ Yelp reviews, BBB Accredited
- "See all reviews" link to `/reviews`
- Platform badges (Yelp, BBB)

**Animation (scrubbed):**
1. 0-15%: Headline fades in
2. 15-55%: Testimonial cards stagger in (`opacity: 0, y: 40`, 10% offset between cards)
3. 55-80%: Stats bar with animated counters (0 to final value, synced to scroll)
4. 80-100%: "See all reviews" link and badges fade in

**Layout:** Headline centered. Cards in 2-col grid (desktop) / 1-col (mobile). Stats bar full-width, four evenly-spaced blocks.

**Placeholder testimonials:** 5 quotes matching storyboard criteria — mention Cortnee, describe transformation, reference emotional relief, mix of sellers and buyers.

**Mobile:** Cards stack single column. Stats count on intersection.

---

### Section 7: The Ask

**Height:** 100vh. **Pace:** Slow, focused.

**Content:**
- Headline: "Ready to talk? We are ready to listen."
- Subtext: "Schedule your free, no-obligation consultation. We will come to you, walk through your situation, and give you a clear plan. No surprises."
- CTA button: "Schedule Your Free Consultation" → `/contact`
- Secondary: "Prefer to call? (916) 521-1077. We are available 24/7."

**Animation (scrubbed):**
1. 0-30%: Background simplifies, other elements fade
2. 20-60%: Headline scales up from `scale: 0.95, opacity: 0`
3. 50-80%: Subtext and CTA button fade in
4. 70-100%: Phone number fades in, everything holds

**Layout:** Full viewport, centered. Maximum whitespace. No images or cards. Warm sage-50 background or placeholder for "clean empty room" photo.

**Note:** This is a simplified CTA — no inline form. The existing `ConsultationCTA.tsx` with its form stays available for other pages.

**Mobile:** Same layout, naturally responsive. Fade in on intersection.

---

## File Changes

### Create
| File | Purpose |
|------|---------|
| `src/components/sections/ScrollStory.tsx` | Master timeline wrapper |
| `src/components/sections/Hook.tsx` | Section 1 — emotional hook |
| `src/components/sections/Tension.tsx` | Section 2 — build overwhelm |
| `src/components/sections/Turn.tsx` | Section 3 — brand intro / relief |
| `src/components/sections/Process.tsx` | Section 4 — 6-step timeline |
| `src/components/sections/SocialProof.tsx` | Section 6 — testimonials + stats |
| `src/components/sections/TheAsk.tsx` | Section 7 — conversion CTA |
| `src/components/sections/ServiceAreaMap.tsx` | SVG map component |

### Modify
| File | Change |
|------|--------|
| `src/app/page.tsx` | Replace section imports with ScrollStory + new sections |
| `src/components/sections/ServiceArea.tsx` | Update to use SVG map |

### Remove
| File | Reason |
|------|--------|
| `src/components/sections/TrustBar.tsx` | Merged into SocialProof |
| `src/components/sections/ServicesOverview.tsx` | Merged into Process |
| `src/components/sections/MeetCortnee.tsx` | Replaced by Turn |
| `src/components/sections/HowItWorks.tsx` | Replaced by Process |
| `src/components/sections/TestimonialHighlight.tsx` | Replaced by SocialProof |

### Keep (unchanged)
| File | Reason |
|------|--------|
| `src/components/sections/ConsultationCTA.tsx` | Still used on non-homepage pages |
| `src/components/sections/Hero.tsx` | May be reused on other pages |

## Performance

- Lazy-load placeholder images below the fold
- `will-change: transform, opacity` on animated elements
- GSAP ScrollTrigger with `scrub: true` for smooth scroll-linked animations
- Total page weight target: < 3MB (per storyboard)
- SVG map is inline (no network request)
- `prefers-reduced-motion` respected globally
