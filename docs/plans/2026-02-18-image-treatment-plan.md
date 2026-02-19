# Image Treatment Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace tacky stock photo backgrounds on subpage heroes and TheAsk CTA with elevated abstract visuals — SVG organic blobs + gradients on subpages, warm radial glow on TheAsk.

**Architecture:** The Hero component drops its `backgroundImage` prop in favor of a `colorScheme` prop that selects from predefined gradient + SVG blob configurations. TheAsk replaces its Unsplash image with a CSS radial gradient and a breathing animation. No new dependencies.

**Tech Stack:** React, Tailwind CSS, inline SVG, CSS animations

---

### Task 1: Add breathing animation keyframe to globals.css

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Add the `breathe` keyframe**

At the end of `globals.css`, after the `@layer base` block, add:

```css
/* ===== Animations ===== */
@keyframes breathe {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
```

**Step 2: Verify the dev server still compiles**

Run: `npm run dev` (check for CSS parse errors in terminal)
Expected: No errors

**Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add breathe keyframe animation"
```

---

### Task 2: Rewrite Hero component with SVG blob backgrounds

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Step 1: Replace the entire Hero component**

The new Hero component:
- Removes the `backgroundImage` prop and `Image` import
- Adds a `colorScheme` prop with 5 variants (one per subpage)
- Renders 2-3 absolutely-positioned SVG blobs per variant
- Renders a gradient background via inline style

```tsx
import Button from "@/components/ui/Button";

type ColorScheme = "estate-sales" | "estate-liquidation" | "appraisals" | "our-promise" | "reviews";

interface HeroProps {
  title: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  colorScheme?: ColorScheme;
}

const colorSchemes: Record<ColorScheme, {
  gradient: string;
  blobs: Array<{ color: string; size: number; top?: string; bottom?: string; left?: string; right?: string; borderRadius: string }>;
}> = {
  "estate-sales": {
    gradient: "linear-gradient(135deg, var(--color-warm-white) 0%, var(--color-sage-50) 100%)",
    blobs: [
      { color: "var(--color-sage-200)", size: 380, top: "-80px", right: "-60px", borderRadius: "60% 40% 50% 70% / 50% 60% 40% 60%" },
      { color: "var(--color-warm-200)", size: 280, bottom: "-40px", left: "-50px", borderRadius: "40% 60% 70% 30% / 60% 40% 50% 60%" },
      { color: "var(--color-sage-100)", size: 200, top: "20%", left: "60%", borderRadius: "50% 60% 40% 70% / 40% 50% 60% 50%" },
    ],
  },
  "estate-liquidation": {
    gradient: "linear-gradient(150deg, var(--color-warm-white) 0%, var(--color-warm-100) 100%)",
    blobs: [
      { color: "var(--color-sage-100)", size: 350, top: "-70px", left: "-80px", borderRadius: "50% 60% 40% 70% / 60% 40% 60% 50%" },
      { color: "var(--color-gold-400)", size: 240, bottom: "-50px", right: "-40px", borderRadius: "60% 40% 50% 60% / 50% 60% 40% 70%" },
    ],
  },
  appraisals: {
    gradient: "linear-gradient(160deg, var(--color-warm-50) 0%, var(--color-sage-50) 100%)",
    blobs: [
      { color: "var(--color-sage-300)", size: 320, top: "-60px", right: "-70px", borderRadius: "45% 55% 60% 40% / 55% 45% 50% 60%" },
      { color: "var(--color-warm-200)", size: 300, bottom: "-80px", left: "-60px", borderRadius: "55% 45% 40% 60% / 50% 60% 55% 45%" },
      { color: "var(--color-sage-100)", size: 180, top: "30%", right: "20%", borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%" },
    ],
  },
  "our-promise": {
    gradient: "linear-gradient(140deg, var(--color-warm-white) 0%, var(--color-warm-50) 100%)",
    blobs: [
      { color: "var(--color-sage-200)", size: 360, bottom: "-60px", right: "-80px", borderRadius: "50% 60% 45% 55% / 55% 45% 60% 50%" },
      { color: "var(--color-warm-100)", size: 300, top: "-50px", left: "-40px", borderRadius: "45% 55% 50% 60% / 60% 40% 55% 45%" },
    ],
  },
  reviews: {
    gradient: "linear-gradient(130deg, var(--color-sage-50) 0%, var(--color-warm-white) 100%)",
    blobs: [
      { color: "var(--color-sage-100)", size: 340, top: "-70px", left: "-60px", borderRadius: "55% 45% 60% 40% / 45% 55% 40% 60%" },
      { color: "var(--color-gold-400)", size: 200, bottom: "-40px", right: "-50px", borderRadius: "40% 60% 45% 55% / 60% 40% 55% 45%" },
    ],
  },
};

// Opacity per color token for the blob fills
function getBlobOpacity(color: string): number {
  if (color.includes("gold-400")) return 0.08;
  if (color.includes("sage-300")) return 0.15;
  if (color.includes("sage-200")) return 0.25;
  if (color.includes("sage-100")) return 0.2;
  if (color.includes("warm-200")) return 0.2;
  if (color.includes("warm-100")) return 0.25;
  return 0.2;
}

export default function Hero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  colorScheme,
}: HeroProps) {
  const scheme = colorScheme ? colorSchemes[colorScheme] : null;

  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-warm-white overflow-hidden"
      style={scheme ? { background: scheme.gradient } : undefined}
    >
      {scheme && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {scheme.blobs.map((blob, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: blob.size,
                height: blob.size,
                top: blob.top,
                bottom: blob.bottom,
                left: blob.left,
                right: blob.right,
                borderRadius: blob.borderRadius,
                backgroundColor: blob.color,
                opacity: getBlobOpacity(blob.color),
                filter: "blur(40px)",
              }}
            />
          ))}
        </div>
      )}
      <div className="relative max-w-4xl mx-auto px-4 text-center">
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

Key decisions:
- Blobs are CSS `div` elements with `border-radius` for organic shapes and `filter: blur(40px)` for soft edges — simpler than SVG paths and equally effective
- Opacity is derived from the color token to keep the design doc ratios (gold at 8%, sage-300 at 15%, etc.)
- No `Image` import needed anymore

**Step 2: Verify it compiles**

Run: `npm run dev`
Expected: No TypeScript errors. Subpages may look wrong temporarily (they still pass `backgroundImage`) — that's fixed in the next task.

**Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: replace Hero background image with SVG blob + gradient system"
```

---

### Task 3: Update all 5 subpages to use colorScheme

**Files:**
- Modify: `src/app/estate-sales/page.tsx`
- Modify: `src/app/estate-liquidation/page.tsx`
- Modify: `src/app/appraisals/page.tsx`
- Modify: `src/app/our-promise/page.tsx`
- Modify: `src/app/reviews/page.tsx`

**Step 1: Update estate-sales/page.tsx**

Replace the `backgroundImage` prop with `colorScheme`:

```tsx
<Hero
  title="Full-Service Estate Sales, Start to Finish"
  subtitle="We handle every aspect of your estate sale with care and expertise."
  colorScheme="estate-sales"
/>
```

**Step 2: Update estate-liquidation/page.tsx**

```tsx
<Hero
  title="Comprehensive Estate Liquidation Solutions"
  subtitle="Not every situation calls for a traditional sale. We offer multiple paths tailored to your needs."
  colorScheme="estate-liquidation"
/>
```

**Step 3: Update appraisals/page.tsx**

```tsx
<Hero
  title="Accurate, Professional Appraisals"
  subtitle="Knowing what your belongings are worth is the foundation of a successful estate sale."
  colorScheme="appraisals"
/>
```

**Step 4: Update our-promise/page.tsx**

```tsx
<Hero
  title="Our Commitment to You"
  subtitle="We understand the emotional weight of estate liquidation. Here's what you can expect from us."
  colorScheme="our-promise"
/>
```

**Step 5: Update reviews/page.tsx**

```tsx
<Hero
  title="What Our Clients Say"
  subtitle="The best measure of our work is the experience of the families we serve."
  colorScheme="reviews"
/>
```

**Step 6: Visually verify all 5 pages in the browser**

Run: `npm run dev`
Visit each page and confirm:
- No stock photo visible
- Warm gradient background renders
- Soft blurry blobs visible at edges
- Text still readable and centered
- Each page looks subtly different

**Step 7: Commit**

```bash
git add src/app/estate-sales/page.tsx src/app/estate-liquidation/page.tsx src/app/appraisals/page.tsx src/app/our-promise/page.tsx src/app/reviews/page.tsx
git commit -m "feat: switch all subpage heroes to blob + gradient colorSchemes"
```

---

### Task 4: Replace TheAsk background with warm radial glow

**Files:**
- Modify: `src/components/sections/TheAsk.tsx`

**Step 1: Replace the Image background with a radial gradient**

Remove the `Image` import from next/image. Replace the background `div` that contains the `Image` and overlay with a radial gradient div that uses the `breathe` animation.

The updated background section (replaces lines 64-73):

```tsx
<div
  className="absolute inset-0"
  aria-hidden="true"
  style={{
    background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-gold-400) 12%, var(--color-warm-100)) 0%, var(--color-warm-white) 70%)",
    animation: "breathe 6s ease-in-out infinite",
  }}
/>
```

Also remove the `import Image from "next/image";` line at the top since it's no longer used.

**Step 2: Visually verify in browser**

Run: `npm run dev`
Scroll to TheAsk section on homepage. Confirm:
- Warm golden glow visible at center
- Fades to warm-white at edges
- Subtle breathing animation (opacity pulsing)
- Text and CTA still render correctly
- GSAP scroll animations still work

**Step 3: Commit**

```bash
git add src/components/sections/TheAsk.tsx
git commit -m "feat: replace TheAsk stock photo with warm radial glow"
```

---

### Task 5: Build verification

**Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors

**Step 3: Commit if any fixes were needed, otherwise done**
