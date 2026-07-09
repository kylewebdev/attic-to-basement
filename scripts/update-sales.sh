#!/usr/bin/env bash
set -euo pipefail

# ─── PATH: ensure node/npm are available (needed for cron) ───────────
eval "$(/home/kyle/.local/bin/mise activate bash 2>/dev/null)" || true

# ─── Config ───────────────────────────────────────────────────────────
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRAPE_URL="${SCRAPE_URL:-http://localhost:3005/scrape?fresh=true}"
SCRAPE_TIMEOUT="${SCRAPE_TIMEOUT:-120}"
LOG_FILE="${PROJECT_DIR}/scripts/update-sales.log"

# ─── Helpers ──────────────────────────────────────────────────────────
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
die() { log "ERROR: $*"; exit 1; }

# ─── Step 0: Ensure scrape server is running ─────────────────────────
SCRAPE_SERVER_DIR="$HOME/Code/a2b-scrape"
STARTED_SERVER=false

# Stop the scrape server on any exit path (success, die, or early exit)
# but only if this script was the one that started it.
cleanup() {
    if [ "$STARTED_SERVER" = true ] && [ -n "${SCRAPE_PID:-}" ]; then
        kill "$SCRAPE_PID" 2>/dev/null
        log "Stopped scrape server (PID ${SCRAPE_PID})"
    fi
}
trap cleanup EXIT

if ! curl -s --max-time 5 -o /dev/null "http://localhost:3005" 2>&1; then
    log "Scrape server not running — starting it..."
    cd "$SCRAPE_SERVER_DIR" || die "Scrape server directory not found at ${SCRAPE_SERVER_DIR}"
    npm run dev >> "$LOG_FILE" 2>&1 &
    SCRAPE_PID=$!

    # Wait up to 15s for the server to be ready
    for i in $(seq 1 15); do
        if curl -s --max-time 2 -o /dev/null "http://localhost:3005" 2>&1; then
            break
        fi
        sleep 1
    done

    if ! curl -s --max-time 2 -o /dev/null "http://localhost:3005" 2>&1; then
        kill "$SCRAPE_PID" 2>/dev/null
        die "Scrape server failed to start"
    fi

    STARTED_SERVER=true
    log "Scrape server started (PID ${SCRAPE_PID})"
fi

# ─── Step 1: Scrape ──────────────────────────────────────────────────
log "Scraping estate sale data from ${SCRAPE_URL}..."
SCRAPE_JSON=$(curl -sf --max-time "$SCRAPE_TIMEOUT" "$SCRAPE_URL") \
    || die "Scrape request failed or timed out after ${SCRAPE_TIMEOUT}s"

# ─── Step 2: Regenerate sales.ts ─────────────────────────────────────
# The generator validates the scrape JSON (fails on scrape errors or
# malformed listings, so a bad scrape never wipes good data) and rewrites
# only the sales array in src/lib/data/sales.ts.
log "Generating sales.ts..."
cd "$PROJECT_DIR"

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

# Server cleanup runs automatically via the EXIT trap (see Step 0).
