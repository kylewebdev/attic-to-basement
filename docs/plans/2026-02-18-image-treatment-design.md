# Image Treatment Overhaul

## Problem

The subpage hero images (full-bleed Unsplash stock photos behind text with a heavy white overlay) and TheAsk section background feel tacky and generic. The homepage Hook Ken Burns effect works, but the rest of the image usage needs to be elevated.

## Decisions

- **Subpage heroes:** Replace stock photos with SVG organic shapes + warm gradients (Option B)
- **TheAsk CTA:** Replace stock photo with a warm radial gradient glow (Option A)
- **Homepage Hook:** No changes (Ken Burns effect stays)
- **Turn section:** No changes (boxed team photo stays)

## Design: Subpage Heroes

Remove all 5 Unsplash `backgroundImage` props. Replace with a warm gradient background + 2-3 soft SVG blob shapes per page.

### Color palette per page

| Page               | Gradient                  | Blob accents               |
|--------------------|---------------------------|----------------------------|
| Estate Sales       | warm-white to sage-50     | sage-200/30, warm-200/20   |
| Estate Liquidation | warm-white to warm-100    | sage-100/25, gold-400/10   |
| Appraisals         | warm-50 to sage-50        | sage-300/15, warm-200/25   |
| Our Promise        | warm-white to warm-50     | sage-200/20, warm-100/30   |
| Reviews            | sage-50 to warm-white     | sage-100/20, gold-400/08   |

### SVG blobs

- Soft, organic rounded shapes (amoeba forms)
- 2-3 per hero, each 200-400px
- Positioned at corners/edges (peek in from the periphery)
- Very low opacity (8-30%) so they're atmospheric, not distracting
- Each page gets slightly different blob positions for visual variety

### Hero component changes

- Remove `backgroundImage` prop
- Add a `colorScheme` prop that selects gradient + blob set
- SVG blobs are inline (no network requests)
- Remove `Image` import and overlay div

## Design: TheAsk CTA

Remove the Unsplash background image and overlay. Replace with a centered radial gradient "spotlight."

### Gradient spec

- Center: soft golden warmth (between warm-100 and gold-400/15)
- Edges: fade to warm-white
- Shape: `radial-gradient(ellipse at center, <warm-gold> 0%, transparent 70%)`
- Subtle breathing animation: opacity oscillates 0.8-1.0 over ~6s

### Component changes

- Remove `Image` component and overlay div
- Add CSS radial gradient background div with breathing animation
- Keep all existing GSAP scroll animations for text/CTA elements
