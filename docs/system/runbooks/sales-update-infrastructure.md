# Runbook: Sales Update Infrastructure

How estate-sales listings get from EstateSales.NET onto the site, as of 2026-07-09.

## Pipeline

```
scripts/scrape-sales.mjs      → scrapes EstateSales.NET JSON API (+ .org URLs), prints JSON
scripts/generate-sales.mjs    → validates JSON, rewrites the sales array in src/lib/data/sales.ts
npm run build                 → validation gate
git commit + push             → Vercel deploys
```

Both scripts are dependency-free Node (built-in `fetch`). A full scrape takes ~1 second.
The a2b-scrape repo still exists as a standalone local API but is no longer part of
this pipeline.

## Where it runs

**GitHub Actions** (`.github/workflows/update-sales.yml`), triggered by:

1. **Schedule** — daily at 19:00 UTC (noon PDT / 11 AM PST).
2. **Manual** — "Run workflow" button on the Actions tab (also in the GitHub mobile app).
3. **Client refresh link** — `https://abeliquidators.com/api/refresh-sales?token=…`
   fires a `repository_dispatch`. See setup below.
4. **Workflow file edits** — pushes touching the workflow file run it once as a smoke test.

No repo secrets are needed for 1, 2, and 4 — the default `GITHUB_TOKEN` pushes the
data commit. Failed runs email the repo owner (default GitHub notification).

`scripts/update-sales.sh` remains as a manual fallback that runs the same pipeline
from a local machine.

## Client refresh link setup (one-time)

The `/api/refresh-sales` route needs two Vercel environment variables:

1. **`SALES_REFRESH_TOKEN`** — any long random string (`openssl rand -hex 24`).
   This goes in the bookmark URL given to the client.
2. **`GH_DISPATCH_TOKEN`** — a fine-grained GitHub PAT:
   GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token,
   Repository access: only `kylewebdev/attic-to-basement`,
   Permissions: **Contents: Read and write**. Set a long expiration and calendar the renewal.

Add both in Vercel → Project → Settings → Environment Variables (Production), redeploy,
then give the client: `https://abeliquidators.com/api/refresh-sales?token=<SALES_REFRESH_TOKEN>`

Until both vars are set the route safely returns 503 ("Refresh is not configured").

## Failure behavior

- Scrape fails (site blocking, endpoint change) → generator exits non-zero → workflow
  fails → GitHub emails the owner. **The last-known-good sales.ts stays deployed.**
- Zero listings with a healthy scrape → legitimately writes an empty array (site shows
  its "No upcoming sales" state).
- The .org URL lookup is best-effort; a sale without a matched .org link just omits
  `externalUrlOrg`.

## Known risks

- The EstateSales.NET endpoint (`/api/legacy/queries/companies/company-sales`) is
  unofficial. If it changes shape, the scraper throws rather than writing bad data.
- GitHub-hosted runner IPs could get bot-blocked by EstateSales.NET. If scheduled runs
  start failing while `scripts/update-sales.sh` works locally, that's the likely cause —
  fall back to the local cron and consider a self-hosted runner.
