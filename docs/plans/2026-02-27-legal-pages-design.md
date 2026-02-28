# Design: Privacy Policy & Terms of Service Pages

## Overview

Add two legal pages to the ABE Liquidators site with user-provided content, linked from the footer.

## Routes

- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

## Page Structure

Both pages follow the same pattern:

1. **Hero** (compact — no CTA buttons): title + brief subtitle, reuse an existing colorScheme
2. **Content section** (`bg-bg-primary`, `max-w-3xl`): "Last Updated" date line, numbered sections as `<h2>` headings with `<p>` body text, `data-reveal` animations
3. **ConsultationCTA** (standard reusable component)

## Footer Changes

Add a bottom row below the existing three-column layout with links to "Privacy Policy" and "Terms of Service", visually separated from the main navigation links.

## SEO / Metadata

- Add `"privacy"` and `"terms"` entries to `lib/metadata.ts`
- Titles follow existing pattern: "Privacy Policy | Attic To Basement Estate Liquidators"
- Sitemap picks them up automatically

## Content

Content is provided verbatim by the client. Last updated date: November 30, 2023.

## Out of Scope

- No new Hero colorScheme — reuse existing
- No cards, grids, or special components — plain prose
- No table of contents or anchor links
- No cookie consent banner
