# Dark Color Scheme: Charcoal Shell + Sage Accents

**Date:** 2026-02-18
**Status:** Approved

## Summary

Shift the site from a light warm-neutral palette to a dark charcoal aesthetic. Keep sage greens as the primary accent color. Text flips to light tones. The result is a moody, grounded "shadow charcoal with sage" identity.

## Approach

**Charcoal Shell + Sage Accents** — warm charcoal backgrounds (Tailwind stone-950/900 range) with existing sage mid/dark greens as accent colors. Sage 50-200 (currently light tones) become dark sage-tinted surface colors for section alternation.

## New Token Map

### Warm neutrals → Charcoal scale (backgrounds/surfaces)

| Token | Old | New | Role |
|-------|-----|-----|------|
| `warm-white` | `#faf9f6` | `#1c1917` | Body background (stone-950) |
| `warm-50` | `#f5f3ef` | `#292524` | Card/elevated surfaces (stone-900) |
| `warm-100` | `#e8e4dc` | `#44403c` | Borders, input borders (stone-700) |
| `warm-200` | `#d4cec3` | `#57534e` | Muted text, dividers (stone-600) |

### Sage palette — darken light end, keep accents

| Token | Old | New | Role |
|-------|-----|-----|------|
| `sage-50` | `#f6f7f4` | `#232820` | Sage-tinted dark surface (alt sections) |
| `sage-100` | `#e8ebe3` | `#2d3529` | Sage-tinted border/decoration |
| `sage-200` | `#d1d7c7` | `#3d4a35` | Progress lines, subtle sage borders |
| `sage-300` | `#a8b496` | `#a8b496` | Unchanged — light sage accent text |
| `sage-400` | `#7f9268` | `#7f9268` | Unchanged — secondary accent |
| `sage-500` | `#5c7a45` | `#5c7a45` | Unchanged — primary buttons, links |
| `sage-600` | `#4a6338` | `#4a6338` | Unchanged — hover states |
| `sage-700` | `#3a4d2d` | `#3a4d2d` | Unchanged — active/pressed states |

### Gold accent — unchanged

| Token | Value | Role |
|-------|-------|------|
| `gold-400` | `#c8a951` | Stars, hero glow, warm punctuation |

### Text color mapping (stone-* usage flips)

| Usage | Old | New |
|-------|-----|-----|
| Headings (was `stone-800`) | `#292524` | `#e8e4dc` (warm off-white) |
| Body text (was `stone-700`) | `#44403c` | `#d6d3d1` (stone-300) |
| Muted/subtitle (was `stone-500`) | `#78716c` | `#a8a29e` (stone-400) |
| Interactive text (was `sage-600`) | `#4a6338` | sage-300 `#a8b496` or sage-400 `#7f9268` |

## Contrast Checks (WCAG AA)

| Combination | Ratio | Result |
|-------------|-------|--------|
| Body `#d6d3d1` on `#1c1917` | ~12.5:1 | Pass |
| Headings `#e8e4dc` on `#1c1917` | ~14.2:1 | Pass |
| Muted `#a8a29e` on `#1c1917` | ~7.0:1 | Pass |
| Sage-400 `#7f9268` on `#1c1917` | ~4.8:1 | Pass |
| Sage-300 `#a8b496` on `#1c1917` | ~7.5:1 | Pass |
| White on sage-500 `#5c7a45` | ~5.2:1 | Pass |
| Sage-500 on card `#292524` | ~3.2:1 | Pass (large text) |

## Key Design Decisions

1. **Body bg `#1c1917`** (stone-950) — warm, not stark black. Grounded feel.
2. **Cards on `#292524`** (stone-900) — enough elevation to separate from body.
3. **Sage 50-200 become dark sage tones** for alternating section backgrounds. Subtle green warmth against neutral charcoal.
4. **Text flips to light** — headings warm off-white, body stone-300, muted stone-400.
5. **Sage accent links shift lighter** — sage-600 text becomes sage-300/sage-400 for contrast on dark.
6. **Footer** already uses light-on-dark; minor adjustments needed since page bg is now also dark.
7. **Header** flips to charcoal/transparent with light nav text.

## Scope of Changes

### Token definitions (globals.css)
- Update all `--color-warm-*` values
- Update `--color-sage-50` through `--color-sage-200` values
- Update base body/heading text colors

### Tailwind config (tailwind.config.ts)
- Update prose color variables to match new light-on-dark text

### Component updates (text color class swaps)
Every component using `stone-500/600/700/800` for text needs to flip to the light equivalents. Key files:
- `globals.css` — base body and heading colors
- `Header.tsx` / `MobileNav.tsx` — nav text, logo, hamburger
- `Footer.tsx` — already mostly light, verify against new bg
- `Hero.tsx` — heading/subtitle text, blob colors
- `Hook.tsx` — heading/subtitle text
- `Process.tsx` — step text, timeline
- `SocialProof.tsx` — stats, badges
- `ServiceArea.tsx` — section text, map
- `ServiceAreaMap.tsx` — SVG fills
- `Turn.tsx` — section text
- `TheAsk.tsx` — section text, CTA links
- `ConsultationCTA.tsx` — section text
- `Tension.tsx` — GSAP animation hex values
- `Button.tsx` — secondary/ghost variant colors
- `Card.tsx` — card bg, text, borders
- `TestimonialCard.tsx` — card bg, text, borders
- `SectionHeading.tsx` — heading/subtitle colors
- `ConsultationForm.tsx` — labels, inputs, borders, placeholders

## What stays unchanged
- Button structure and sage-500/600/700 for primary interactive states
- Gold-400 for stars and decorative warmth
- Font families and sizes
- Layout and component structure
- All functionality
