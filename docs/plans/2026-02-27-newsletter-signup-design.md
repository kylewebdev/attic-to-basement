# Newsletter Signup Callout — Design Document

**Date:** 2026-02-27
**Status:** Approved

## Goal

Add a newsletter signup form targeting estate sale buyers — people who want to be notified about upcoming sales, interesting finds, and sale day details.

## Approach

A reusable `NewsletterSignup` section component placed on key buyer-facing pages. Not in the footer (low engagement, wrong audience mix) and not duplicated across both locations (overkill for a 6-page site).

## Component: `NewsletterSignup`

**File:** `src/components/sections/NewsletterSignup.tsx`
**Type:** Client component (`"use client"` — needs form state)

### Content

- **Headline:** "Never Miss a Sale" (serif, `text-3xl`)
- **Subtext:** "Get notified about upcoming estate sales, interesting finds, and sale day details — straight to your inbox."
- **Form:** Inline email input + submit button (single row on desktop, stacked on mobile)
- **Success state:** Replaces form with "You're in!" confirmation
- **Error state:** Inline error message below the form

### Visual Style

- `bg-bg-alt` background (matches existing section alternation pattern)
- Centered content, `max-w-3xl` container
- Input and button styling matches `ConsultationForm` (same border, focus ring, rounded-lg patterns)
- Compact section — `py-12 md:py-16` (smaller than full content sections)

### Mailchimp Integration

- Submits directly to Mailchimp's embedded form endpoint via POST
- Form action URL stored in `NEXT_PUBLIC_MAILCHIMP_URL` env var
- Includes Mailchimp's honeypot bot-trap field
- No server-side API route needed

### Placement

- **Estate Sales page** (`/estate-sales`): Between the sale listings and the "Have a home that needs an estate sale?" cross-sell section. Highest-intent location for buyers.
- **Homepage:** Not initially. The scroll-story GSAP animation system would require additional integration work for a non-animated section. Can revisit later.

### Analytics

- PostHog event on success: `newsletter_subscribed` with `{ location: "estate_sales_page" }`
- PostHog event on failure: `newsletter_signup_errored`

## Out of Scope

- Mailchimp account setup and audience creation (owner responsibility)
- Homepage placement (future consideration)
- Double opt-in configuration (handled in Mailchimp settings)
- Unsubscribe flow (handled by Mailchimp)
