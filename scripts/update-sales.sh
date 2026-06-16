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

# Quick sanity check (no jq dependency)
LISTING_COUNT=$(echo "$SCRAPE_JSON" | grep -o '"id"' | wc -l)
log "Received ${LISTING_COUNT} listings"

if [ "$LISTING_COUNT" -eq 0 ]; then
    log "WARNING: Zero listings returned. Skipping update."
    exit 0
fi

# ─── Step 2: Update sales.ts via Claude ───────────────────────────────
log "Updating sales.ts with Claude..."
cd "$PROJECT_DIR"

CLAUDE_BIN="${CLAUDE_BIN:-$(command -v claude || echo "$HOME/.local/bin/claude")}"
[ -x "$CLAUDE_BIN" ] || die "claude CLI not found at ${CLAUDE_BIN}"

cat <<EOF | "$CLAUDE_BIN" -p --allowedTools "Read,Edit,Glob,Grep" >> "$LOG_FILE" 2>&1 || die "Claude failed to update sales.ts"
You are updating estate sale listings. Follow the runbook at docs/system/runbooks/update-estate-sales.md exactly.

Here is the scraped JSON data:

${SCRAPE_JSON}

Update src/lib/data/sales.ts with this data. Do NOT commit — just update the file.
EOF

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

# ─── Cleanup: Stop server if we started it ────────────────────────────
if [ "$STARTED_SERVER" = true ] && [ -n "${SCRAPE_PID:-}" ]; then
    kill "$SCRAPE_PID" 2>/dev/null
    log "Stopped scrape server (PID ${SCRAPE_PID})"
fi
