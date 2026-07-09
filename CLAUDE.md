# CLAUDE.md

4-space indentation (not the typical 2 for JS/TS).

Read `docs/system/buildplan.md` for the current implementation plan before starting feature work. Update the buildplan when completing a step.

Brand voice, business context, and design specs live in `docs/system/context/` — read these before writing copy or making design decisions.

## Brand
- `docs/system/context/brand-and-business.md` — Brand guidelines and business context summary

## Estate sales updates

Automated via GitHub Actions (`.github/workflows/update-sales.yml`, daily + manual + `repository_dispatch`): `scripts/scrape-sales.mjs` scrapes, `scripts/generate-sales.mjs` deterministically rewrites the `sales` array in `src/lib/data/sales.ts`. Don't hand-edit that array — fix the generator instead. Infrastructure details: `docs/system/runbooks/sales-update-infrastructure.md`; format spec: `docs/system/runbooks/update-estate-sales.md`. estatesales.net is the source of truth; .org only supplies `externalUrlOrg`.

## Forms

Anti-spam uses a honeypot field — no CAPTCHA.
