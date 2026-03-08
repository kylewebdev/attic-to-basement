<wizard-report>
# PostHog post-wizard report

The wizard has completed a targeted pass to fill gaps in the existing PostHog instrumentation. PostHog was already initialized via `instrumentation-client.ts` with exception capture, a reverse proxy, and debug mode. This pass added 5 new events across 4 files — with one new client component (`ServiceAreaCTA`) created to enable tracking on the Server Component service area pages.

## New events added

| Event | Description | File |
|-------|-------------|------|
| `service_area_cta_clicked` | User clicks "Schedule a Free Consultation" on a programmatic SEO service area page | `src/app/services/[city]/[service]/ServiceAreaCTA.tsx` (new) |
| `service_area_phone_clicked` | User clicks the phone number on a programmatic SEO service area page | `src/app/services/[city]/[service]/ServiceAreaCTA.tsx` (new) |
| `estate_sale_cross_sell_cta_clicked` | User clicks the cross-sell CTA at the bottom of the estate sales page | `src/app/estate-sales/page.tsx` |
| `appraisals_bbb_link_clicked` | User clicks the BBB accreditation link in the appraisals credentials section | `src/app/appraisals/page.tsx` |
| `global_error_captured` | Unhandled global error caught and reported via `captureException` | `src/app/global-error.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

**Dashboard**
- [Analytics basics](https://us.posthog.com/project/144315/dashboard/1340981)

**Insights**
- [Consultation Conversion Funnel](https://us.posthog.com/project/144315/insights/PiTQOCOM) — CTA click → page view → form submit funnel
- [Lead Generation Over Time](https://us.posthog.com/project/144315/insights/Bg1pejL0) — Daily form submissions and phone clicks
- [All Conversions by Channel](https://us.posthog.com/project/144315/insights/Yi4TeHpY) — Phone, form, and newsletter totals
- [Service Area Page Conversions](https://us.posthog.com/project/144315/insights/ERP5Ps8V) — Conversions from SEO landing pages
- [Engagement: Reviews & Social Links](https://us.posthog.com/project/144315/insights/RFR3skvY) — External link engagement weekly

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
