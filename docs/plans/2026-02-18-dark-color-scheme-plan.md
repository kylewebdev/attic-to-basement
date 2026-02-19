# Dark Color Scheme Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Shift the entire site from a light warm-neutral palette to a dark charcoal aesthetic with sage green accents.

**Architecture:** Update CSS design tokens in `globals.css` first (the foundation), then update `tailwind.config.ts` prose colors, then sweep through every component to flip text color classes from dark-on-light to light-on-dark. Form inputs switch from white backgrounds to charcoal surfaces.

**Tech Stack:** Tailwind CSS v4 (using `@theme` directive), Next.js, TypeScript

**Design reference:** `docs/plans/2026-02-18-dark-color-scheme-design.md`

---

### Task 1: Update design tokens and base styles

**Files:**
- Modify: `src/styles/globals.css:1-50`
- Modify: `tailwind.config.ts:1-23`

**Step 1: Update color tokens in globals.css**

Replace the `@theme` block token values:

```css
@theme {
  /* Sage green palette — dark end repurposed as dark surfaces */
  --color-sage-50: #232820;
  --color-sage-100: #2d3529;
  --color-sage-200: #3d4a35;
  --color-sage-300: #a8b496;
  --color-sage-400: #7f9268;
  --color-sage-500: #5c7a45;
  --color-sage-600: #4a6338;
  --color-sage-700: #3a4d2d;

  /* Charcoal neutrals (replaces warm neutrals) */
  --color-warm-white: #1c1917;
  --color-warm-50: #292524;
  --color-warm-100: #44403c;
  --color-warm-200: #57534e;

  /* Gold accent — unchanged */
  --color-gold-400: #c8a951;

  /* Typography — unchanged */
  --font-sans: var(--font-nunito-sans), "Nunito Sans", sans-serif;
  --font-serif: var(--font-libre-baskerville), "Libre Baskerville", serif;
}
```

**Step 2: Update base styles in globals.css**

Change the body and heading base classes:

```css
@layer base {
  body {
    @apply bg-warm-white text-stone-300 font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif text-stone-200;
  }

  :focus-visible {
    @apply outline-2 outline-offset-2 outline-sage-500;
  }
}
```

**Step 3: Update tailwind.config.ts prose colors**

```typescript
typography: {
  DEFAULT: {
    css: {
      "--tw-prose-body": "#d6d3d1",      // stone-300
      "--tw-prose-headings": "#e7e5e4",   // stone-200
      "--tw-prose-links": "#a8b496",      // sage-300
      "--tw-prose-bold": "#e7e5e4",       // stone-200
      "h1, h2, h3, h4": {
        fontFamily: "var(--font-serif)",
      },
    },
  },
},
```

**Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds (there may be visual issues in components but no compile errors)

**Step 5: Commit**

```bash
git add src/styles/globals.css tailwind.config.ts
git commit -m "feat: update design tokens to dark charcoal palette"
```

---

### Task 2: Update layout components (Header, MobileNav, Footer)

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/MobileNav.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Update Header.tsx**

Line 53 — header background:
```
OLD: className="fixed top-0 left-0 right-0 z-40 bg-warm-white/95 backdrop-blur-sm py-4 transition-[padding]"
NEW: className="fixed top-0 left-0 right-0 z-40 bg-warm-white/95 backdrop-blur-sm py-4 transition-[padding]"
```
Note: `bg-warm-white/95` stays the same — the token value changed so this is now charcoal.

Line 57 — logo text:
```
OLD: className="font-serif text-xl text-stone-800 hover:text-sage-600 transition-colors"
NEW: className="font-serif text-xl text-stone-200 hover:text-sage-300 transition-colors"
```

Line 67 — nav links:
```
OLD: className="text-sm font-sans text-stone-600 hover:text-sage-600 transition-colors"
NEW: className="text-sm font-sans text-stone-400 hover:text-sage-300 transition-colors"
```

Line 79 — hamburger button:
```
OLD: className="lg:hidden p-2 text-stone-600 hover:text-stone-800 min-h-11 min-w-11 flex items-center justify-center"
NEW: className="lg:hidden p-2 text-stone-400 hover:text-stone-200 min-h-11 min-w-11 flex items-center justify-center"
```

**Step 2: Update MobileNav.tsx**

Line 63 — drawer background:
```
OLD: className="absolute right-0 top-0 h-full w-72 bg-warm-white shadow-xl translate-x-full"
NEW: className="absolute right-0 top-0 h-full w-72 bg-warm-50 shadow-xl translate-x-full"
```
Note: Use `warm-50` (now `#292524`) for slight elevation from body bg.

Line 69 — close button:
```
OLD: className="p-2 text-stone-600 hover:text-stone-800 min-h-11 min-w-11 flex items-center justify-center"
NEW: className="p-2 text-stone-400 hover:text-stone-200 min-h-11 min-w-11 flex items-center justify-center"
```

Line 84 — nav links:
```
OLD: className="block py-3 text-lg text-stone-700 hover:text-sage-600 transition-colors"
NEW: className="block py-3 text-lg text-stone-300 hover:text-sage-300 transition-colors"
```

**Step 3: Update Footer.tsx**

The footer is already light-on-dark. Now that the page bg is also dark, it needs differentiation.

Line 20 — footer wrapper:
```
OLD: className="bg-stone-800 text-warm-100 py-12"
NEW: className="bg-warm-50 text-stone-300 py-12 border-t border-warm-100"
```
Note: Footer uses `warm-50` (stone-900 equivalent) with a subtle border to separate from the body `warm-white` (stone-950).

Line 28, 31, 43, 58, 77, 84 — all `text-warm-200` instances:
```
OLD: text-warm-200
NEW: text-stone-400
```

Line 91 — bottom border:
```
OLD: className="mt-10 pt-6 border-t border-stone-700 text-center text-sm text-warm-200"
NEW: className="mt-10 pt-6 border-t border-warm-100 text-center text-sm text-stone-400"
```

Line 34 — phone link:
```
OLD: className="inline-block mt-3 text-sage-300 hover:text-sage-200 font-semibold transition-colors"
NEW: className="inline-block mt-3 text-sage-300 hover:text-sage-400 font-semibold transition-colors"
```
Note: sage-200 is now a dark tone, so hover needs to go lighter (sage-400).

**Step 4: Verify dev server renders**

Run: `npm run dev`
Check header, footer, and mobile nav visually.

**Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/MobileNav.tsx src/components/layout/Footer.tsx
git commit -m "feat: update layout components for dark color scheme"
```

---

### Task 3: Update UI components (Button, Card, TestimonialCard, SectionHeading)

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Card.tsx`
- Modify: `src/components/ui/TestimonialCard.tsx`
- Modify: `src/components/ui/SectionHeading.tsx`

**Step 1: Update Button.tsx**

Lines 14-21 — variant styles:
```typescript
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700",
  secondary:
    "border-2 border-sage-500 text-sage-300 hover:bg-sage-50 active:bg-sage-100",
  ghost:
    "text-sage-300 hover:text-sage-400 hover:bg-sage-50",
};
```
Changes: secondary `text-sage-600` → `text-sage-300`. Ghost `text-sage-600` → `text-sage-300`, `hover:text-sage-700` → `hover:text-sage-400`. The bg classes (`sage-50`, `sage-100`) now point to dark sage tones, which is correct behavior.

**Step 2: Update Card.tsx**

Line 12 — card wrapper:
```
OLD: className="rounded-xl bg-warm-50 border border-warm-100 p-6 h-full"
NEW: className="rounded-xl bg-warm-50 border border-warm-100 p-6 h-full"
```
Note: No change needed — `warm-50` and `warm-100` token values already updated to charcoal tones.

Line 14 — heading:
```
OLD: className="font-serif text-xl text-stone-800 mb-2"
NEW: className="font-serif text-xl text-stone-200 mb-2"
```

Line 15 — description:
```
OLD: className="text-stone-600 leading-relaxed"
NEW: className="text-stone-400 leading-relaxed"
```

**Step 3: Update TestimonialCard.tsx**

Line 15 — card wrapper:
No change needed (uses `warm-50` and `warm-100` which are now dark).

Line 21 — unfilled stars:
```
OLD: className={i < rating ? "text-gold-400" : "text-warm-200"}
NEW: className={i < rating ? "text-gold-400" : "text-warm-100"}
```
Note: `warm-200` is now stone-600, which is too close to the dark bg. Use `warm-100` (stone-700) for unfilled stars.

Line 29 — quote text:
```
OLD: className="text-stone-700 leading-relaxed italic mb-4"
NEW: className="text-stone-300 leading-relaxed italic mb-4"
```

Line 32 — footer text:
```
OLD: className="text-sm text-stone-500"
NEW: className="text-sm text-stone-400"
```

Line 33 — cite name:
```
OLD: className="not-italic font-semibold text-stone-700"
NEW: className="not-italic font-semibold text-stone-200"
```

**Step 4: Update SectionHeading.tsx**

Line 14 — heading:
```
OLD: className="font-serif text-3xl md:text-4xl text-stone-800"
NEW: className="font-serif text-3xl md:text-4xl text-stone-200"
```

Line 18 — subtitle:
```
OLD: className="mt-4 text-lg text-stone-500 max-w-2xl mx-auto"
NEW: className="mt-4 text-lg text-stone-400 max-w-2xl mx-auto"
```

**Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Card.tsx src/components/ui/TestimonialCard.tsx src/components/ui/SectionHeading.tsx
git commit -m "feat: update UI components for dark color scheme"
```

---

### Task 4: Update homepage sections — Hook, Tension, Turn

**Files:**
- Modify: `src/components/sections/Hook.tsx`
- Modify: `src/components/sections/Tension.tsx`
- Modify: `src/components/sections/Turn.tsx`

**Step 1: Update Hook.tsx**

Line 126 — headline:
```
OLD: className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-tight"
NEW: className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-200 leading-tight"
```

Line 132 — subtext:
```
OLD: className="mt-8 text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed"
NEW: className="mt-8 text-lg md:text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed"
```

Line 143 — scroll indicator:
```
OLD: className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-400 animate-bounce"
NEW: className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-500 animate-bounce"
```

**Step 2: Update Tension.tsx**

Line 49 — GSAP starting color (faded/unread text):
```
OLD: { color: "#d6d3d1" }, // stone-300
NEW: { color: "#57534e" }, // stone-600 (dimmed on dark bg)
```

Line 50 — GSAP ending color (revealed text):
```
OLD: { color: "#292524", duration: wordDur, ease: "power1.out" },
NEW: { color: "#e7e5e4", duration: wordDur, ease: "power1.out" },
```
Note: stone-200 for revealed text on dark bg.

Line 69 — initial text color class:
```
OLD: className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed lg:leading-relaxed text-center text-stone-300"
NEW: className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed lg:leading-relaxed text-center text-stone-600"
```
Note: Must match the GSAP starting color.

**Step 3: Update Turn.tsx**

Line 71 — headline:
```
OLD: className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-800 leading-tight"
NEW: className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-200 leading-tight"
```

Line 78 — subtext:
```
OLD: className="mt-6 text-lg text-stone-600 leading-relaxed"
NEW: className="mt-6 text-lg text-stone-400 leading-relaxed"
```

Line 87 — supporting text:
```
OLD: className="mt-4 text-stone-500 leading-relaxed"
NEW: className="mt-4 text-stone-400 leading-relaxed"
```

**Step 4: Commit**

```bash
git add src/components/sections/Hook.tsx src/components/sections/Tension.tsx src/components/sections/Turn.tsx
git commit -m "feat: update Hook, Tension, Turn sections for dark scheme"
```

---

### Task 5: Update homepage sections — Process, ServiceArea, ServiceAreaMap

**Files:**
- Modify: `src/components/sections/Process.tsx`
- Modify: `src/components/sections/ServiceArea.tsx`
- Modify: `src/components/sections/ServiceAreaMap.tsx`

**Step 1: Update Process.tsx**

Line 135 — headline:
```
OLD: className="font-serif text-3xl md:text-4xl text-stone-800 text-center mb-16"
NEW: className="font-serif text-3xl md:text-4xl text-stone-200 text-center mb-16"
```

Line 178 — step title:
```
OLD: className="font-serif text-xl md:text-2xl text-stone-800 mb-2"
NEW: className="font-serif text-xl md:text-2xl text-stone-200 mb-2"
```

Line 181 — step description:
```
OLD: className="text-stone-500 leading-relaxed"
NEW: className="text-stone-400 leading-relaxed"
```

**Step 2: Update ServiceArea.tsx**

Line 107 — headline:
```
OLD: className="font-serif text-3xl md:text-4xl text-stone-800 mb-12"
NEW: className="font-serif text-3xl md:text-4xl text-stone-200 mb-12"
```

Line 117 — subtext:
```
OLD: className="text-lg text-stone-500"
NEW: className="text-lg text-stone-400"
```

Line 122 — phone link:
```
OLD: className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
NEW: className="text-sage-300 hover:text-sage-400 font-semibold transition-colors"
```

Line 67 — GSAP fill animation (sage-200 with transparency):
```
OLD: fill: "rgba(209, 215, 199, 0.5)", // sage-200 with transparency
NEW: fill: "rgba(61, 74, 53, 0.5)", // sage-200 (now dark sage) with transparency
```

Line 68 — GSAP stroke color:
```
OLD: stroke: "#5c7a45", // sage-500
NEW: stroke: "#a8b496", // sage-300 (lighter for visibility on dark)
```

**Step 3: Update ServiceAreaMap.tsx**

Line 81 — surrounding county stroke:
```
OLD: className="text-stone-300"
NEW: className="text-stone-600"
```

Line 112 — service label text fill:
```
OLD: className="fill-stone-700 font-sans"
NEW: className="fill-stone-300 font-sans"
```

**Step 4: Commit**

```bash
git add src/components/sections/Process.tsx src/components/sections/ServiceArea.tsx src/components/sections/ServiceAreaMap.tsx
git commit -m "feat: update Process, ServiceArea sections for dark scheme"
```

---

### Task 6: Update homepage sections — SocialProof, TheAsk, ConsultationCTA

**Files:**
- Modify: `src/components/sections/SocialProof.tsx`
- Modify: `src/components/sections/TheAsk.tsx`
- Modify: `src/components/sections/ConsultationCTA.tsx`

**Step 1: Update SocialProof.tsx**

Line 156 — headline:
```
OLD: className="font-serif text-3xl md:text-4xl text-stone-800 text-center mb-12"
NEW: className="font-serif text-3xl md:text-4xl text-stone-200 text-center mb-12"
```

Line 192 — stat numbers:
```
OLD: className="text-2xl md:text-3xl font-serif text-sage-600 font-bold"
NEW: className="text-2xl md:text-3xl font-serif text-sage-300 font-bold"
```

Line 203 — stat labels:
```
OLD: className="mt-1 text-sm text-stone-500"
NEW: className="mt-1 text-sm text-stone-400"
```

**Step 2: Update TheAsk.tsx**

Line 75 — headline:
```
OLD: className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-800 leading-tight"
NEW: className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-200 leading-tight"
```

Line 82 — subtext:
```
OLD: className="mt-6 text-lg text-stone-500 leading-relaxed"
NEW: className="mt-6 text-lg text-stone-400 leading-relaxed"
```

Line 95 — phone text:
```
OLD: className="mt-6 text-stone-500"
NEW: className="mt-6 text-stone-400"
```

Line 100 — phone link:
```
OLD: className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
NEW: className="text-sage-300 hover:text-sage-400 font-semibold transition-colors"
```

**Step 3: Update ConsultationCTA.tsx**

Line 13 — headline:
```
OLD: className="font-serif text-3xl md:text-4xl text-stone-800"
NEW: className="font-serif text-3xl md:text-4xl text-stone-200"
```

Line 16 — subtitle:
```
OLD: className="mt-4 text-lg text-stone-500 max-w-xl mx-auto"
NEW: className="mt-4 text-lg text-stone-400 max-w-xl mx-auto"
```

Line 22 — phone link:
```
OLD: className="inline-block mt-3 text-sage-600 hover:text-sage-700 font-semibold transition-colors"
NEW: className="inline-block mt-3 text-sage-300 hover:text-sage-400 font-semibold transition-colors"
```

**Step 4: Commit**

```bash
git add src/components/sections/SocialProof.tsx src/components/sections/TheAsk.tsx src/components/sections/ConsultationCTA.tsx
git commit -m "feat: update SocialProof, TheAsk, ConsultationCTA for dark scheme"
```

---

### Task 7: Update Hero and ConsultationForm

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/forms/ConsultationForm.tsx`

**Step 1: Update Hero.tsx**

Line 93 — headline:
```
OLD: className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-tight"
NEW: className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-200 leading-tight"
```

Line 97 — subtitle:
```
OLD: className="mt-6 text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed"
NEW: className="mt-6 text-lg md:text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed"
```

**Step 2: Update ConsultationForm.tsx**

Line 38 — success box:
```
OLD: className="rounded-xl bg-sage-50 border border-sage-200 p-8 text-center"
NEW: className="rounded-xl bg-sage-50 border border-sage-200 p-8 text-center"
```
Note: Token values already updated, no class change needed.

Line 39 — success heading:
```
OLD: className="font-serif text-2xl text-stone-800 mb-2"
NEW: className="font-serif text-2xl text-stone-200 mb-2"
```

Line 40 — success body:
```
OLD: className="text-stone-600"
NEW: className="text-stone-400"
```

Lines 60, 75, 87, 102, 115, 129 — all form labels (`text-stone-700`):
```
OLD: text-stone-700
NEW: text-stone-300
```
Apply to all 6 label elements (name, phone, email, city, description, contact method legend).

Lines 68, 82, 95, 109, 123 — all input fields:
```
OLD: className="w-full rounded-lg border border-warm-100 bg-white px-4 py-3 text-stone-700 placeholder:text-warm-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
NEW: className="w-full rounded-lg border border-warm-100 bg-warm-50 px-4 py-3 text-stone-200 placeholder:text-stone-500 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
```
Changes: `bg-white` → `bg-warm-50` (dark surface), `text-stone-700` → `text-stone-200` (light input text), `placeholder:text-warm-200` → `placeholder:text-stone-500` (muted placeholder).

Apply same changes to the textarea on line 123.

Lines 141, 150 — radio label text:
```
OLD: className="text-sm text-stone-700"
NEW: className="text-sm text-stone-300"
```

**Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/forms/ConsultationForm.tsx
git commit -m "feat: update Hero and ConsultationForm for dark scheme"
```

---

### Task 8: Final build verification

**Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors.

**Step 3: Visual spot-check**

Run: `npm run dev`
Check these pages in browser:
- Homepage: all scroll sections render, text is legible, hero blobs show against dark bg
- Any subpage with Hero component
- ConsultationForm: inputs visible, placeholder text readable
- Footer: visually distinct from body
- Mobile nav: opens, readable

**Step 4: Commit any fixes if needed**
