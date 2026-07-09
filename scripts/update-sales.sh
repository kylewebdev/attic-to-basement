#!/usr/bin/env bash
set -euo pipefail

# Local/manual runner for the estate-sales update. The same pipeline runs in
# GitHub Actions (.github/workflows/update-sales.yml) on a daily schedule —
# this script is the fallback for running it by hand from this machine.

# ─── PATH: ensure node/npm are available (needed for cron) ───────────
eval "$(/home/kyle/.local/bin/mise activate bash 2>/dev/null)" || true

# ─── Config ───────────────────────────────────────────────────────────
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_FILE="${PROJECT_DIR}/scripts/update-sales.log"

# ─── Helpers ──────────────────────────────────────────────────────────
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
die() { log "ERROR: $*"; exit 1; }

cd "$PROJECT_DIR"

# ─── Step 1: Scrape ──────────────────────────────────────────────────
log "Scraping estate sale data..."
SCRAPE_JSON=$(node scripts/scrape-sales.mjs) \
    || die "Scrape failed"

# ─── Step 2: Regenerate sales.ts ─────────────────────────────────────
# The generator validates the scrape JSON (fails on scrape errors or
# malformed listings, so a bad scrape never wipes good data) and rewrites
# only the sales array in src/lib/data/sales.ts.
log "Generating sales.ts..."
echo "$SCRAPE_JSON" | node scripts/generate-sales.mjs >> "$LOG_FILE" 2>&1 \
    || die "sales.ts generation failed — see log above"

log "sales.ts updated"

# ─── Step 3: Build ────────────────────────────────────────────────────
log "Running build to validate..."
npm run build >> "$LOG_FILE" 2>&1 \
    || die "Build failed after sales update"

log "Build passed"

# ─── Step 4: Commit & push ────────────────────────────────────────────
if git -C "$PROJECT_DIR" diff --quiet src/lib/data/sales.ts; then
    log "No changes to sales.ts — nothing to commit"
    exit 0
fi

git -C "$PROJECT_DIR" add src/lib/data/sales.ts
git -C "$PROJECT_DIR" commit -m "content: update estate sales data"
git -C "$PROJECT_DIR" push

log "Committed and pushed successfully"
