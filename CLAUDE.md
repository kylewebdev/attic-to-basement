# CLAUDE.md

4-space indentation (not the typical 2 for JS/TS).

Read `docs/system/buildplan.md` for the current implementation plan before starting feature work. Update the buildplan when completing a step.

Brand voice, business context, and design specs live in `docs/system/context/` — read these before writing copy or making design decisions.

## Brand
- `docs/system/context/brand-and-business.md` — Brand guidelines and business context summary

## Estate sales updates

Follow `docs/system/runbooks/update-estate-sales.md` exactly. Only modify `src/lib/data/sales.ts`. Replace the array contents — never append. estatesales.net is the source of truth; only take `externalUrlOrg` and multi-day date corrections from .org.

## Forms

Anti-spam uses a honeypot field — no CAPTCHA.
