# Implementation plan

## Domain migration — October 28, 2026

- [x] Replace duplicated production SEO origins with `src/lib/site.ts` (`https://attictobasement.com`).
- [x] Apply the origin to canonical tags, Open Graph, structured data, metadata base, sitemap, and robots.txt.
- [x] Audit all 36 live sitemap paths, internal page links, and 64 protocol/host/path samples; record redirect defects.
- [x] Complete production-build, lint, and generated-output validation (36 sitemap URLs/canonicals/Open Graph URLs).
- [ ] Publish the code fix.
- [ ] Verify corrected metadata, sitemap, and robots on production after deployment.
- [ ] Kyle: correct Vercel domain redirects and recheck chains.
- [ ] Kyle: verify/complete Search Console Change of Address and submit corrected sitemap after technical validation.
- [ ] Cortnee: confirm priority services and authoritative public profiles; update their website links.
- [ ] Record indexing and combined old/new Search Console clicks and impressions once data is available.

Evidence, acceptance criteria, and account handoff: [domain migration runbook](runbooks/domain-migration.md).
