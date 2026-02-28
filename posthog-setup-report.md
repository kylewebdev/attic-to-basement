<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the ABE Liquidators Next.js App Router project. Here's a summary of everything that was set up:

**SDK initialization** was added via `instrumentation-client.ts` at the project root — the correct approach for Next.js 15.3+. This initializes PostHog with a reverse proxy through `/ingest` (configured in `next.config.ts`), exception capture enabled, and debug mode in development.

**10 custom events** were instrumented across 7 files, focusing on the most business-critical user actions: consultation form submissions and errors, phone number clicks, CTA button clicks, review filter interactions, external platform link clicks, Instagram clicks, and mobile navigation engagement.

**Environment variables** (`NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`) were written to `.env.local` and are referenced via `process.env` — no keys are hardcoded anywhere.

## Files changed

| File | Changes |
|------|---------|
| `instrumentation-client.ts` | **New file** — PostHog client-side initialization for Next.js 15.3+ |
| `next.config.ts` | Added PostHog reverse proxy rewrites and `skipTrailingSlashRedirect` |
| `.env.local` | Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` |

## Events instrumented

| Event | Description | File |
|-------|-------------|------|
| `consultation_form_submitted` | User submits the free consultation request form successfully | `src/components/forms/ConsultationForm.tsx` |
| `consultation_form_errored` | Consultation form submission fails with a server or network error | `src/components/forms/ConsultationForm.tsx` |
| `consultation_page_viewed` | User views the contact/consultation page (top of conversion funnel) | `src/app/contact/page.tsx` |
| `phone_number_clicked` | User clicks a phone number link to call the business | `src/app/contact/page.tsx`, `src/components/sections/TheAsk.tsx` |
| `cta_clicked` | User clicks the primary "Schedule Your Free Consultation" CTA on the homepage | `src/components/sections/TheAsk.tsx` |
| `review_filter_selected` | User clicks a filter tab on the Reviews page | `src/app/reviews/page.tsx` |
| `external_review_platform_clicked` | User clicks a link to Yelp, BBB, EstateSales.org, or EstateSales.net | `src/app/reviews/page.tsx` |
| `instagram_link_clicked` | User clicks the Instagram profile link on the Estate Sales page | `src/app/estate-sales/page.tsx` |
| `mobile_nav_opened` | User opens the mobile navigation drawer | `src/components/layout/Header.tsx` |
| `mobile_nav_cta_clicked` | User clicks the Free Consultation CTA inside the mobile nav drawer | `src/components/layout/MobileNav.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

**Dashboard**
- [Analytics basics](https://us.posthog.com/project/144315/dashboard/1317210)

**Insights**
- [Consultation Conversion Funnel](https://us.posthog.com/project/144315/insights/SKQtuWNc) — Contact page views → form submissions funnel
- [Lead Generation Actions (Daily)](https://us.posthog.com/project/144315/insights/qfeliBU5) — Daily trend of form submissions, phone clicks, and CTA clicks
- [Consultation Form Success vs Error Rate](https://us.posthog.com/project/144315/insights/4U3B7Jfc) — Weekly form health monitoring
- [External Link & Social Engagement](https://us.posthog.com/project/144315/insights/tT8Y0kxE) — Clicks to Yelp, BBB, and Instagram
- [Mobile Navigation Engagement](https://us.posthog.com/project/144315/insights/yrbEBzox) — Mobile nav opens vs CTA clicks inside the drawer

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
