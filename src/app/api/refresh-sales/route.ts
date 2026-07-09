import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REPO = "kylewebdev/attic-to-basement";

/**
 * Trigger the "Update estate sales" GitHub Actions workflow. Meant to be
 * bookmarked as a plain link (e.g. on the client's phone):
 *
 *   https://abeliquidators.com/api/refresh-sales?token=<SALES_REFRESH_TOKEN>
 *
 * Requires two Vercel env vars:
 *   SALES_REFRESH_TOKEN — shared secret expected in the ?token= param
 *   GH_DISPATCH_TOKEN   — fine-grained GitHub PAT for this repo with
 *                         "Contents: read and write" (used for repository_dispatch)
 */
export async function GET(request: NextRequest) {
    const refreshToken = process.env.SALES_REFRESH_TOKEN;
    const githubToken = process.env.GH_DISPATCH_TOKEN;

    if (!refreshToken || !githubToken) {
        return html(503, "Refresh is not configured.");
    }

    const provided = request.nextUrl.searchParams.get("token") ?? "";
    if (!safeEqual(provided, refreshToken)) {
        return html(401, "Not authorized.");
    }

    const recent = await checkRecentRun();
    if (recent === "running") {
        return html(200, "An update is already on its way! The website will show the latest sales in a few minutes.");
    }
    if (recent === "cooldown") {
        return html(200, "The website was just updated. If your latest changes aren't showing, wait 10 minutes and tap the link again.");
    }

    const response = await fetch(`https://api.github.com/repos/${REPO}/dispatches`, {
        method: "POST",
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${githubToken}`,
            "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({ event_type: "update-sales" }),
    });

    if (response.status !== 204) {
        const detail = await response.text();
        console.error(`refresh-sales dispatch failed: ${response.status} ${detail}`);
        return html(502, "Could not start the update. Please try again in a minute.");
    }

    return html(
        200,
        "Update started! The website will show the latest sales in a few minutes.",
    );
}

const COOLDOWN_MINUTES = 10;

/**
 * Debounce duplicate taps by consulting the workflow's own run history
 * (stateless, so it works across serverless instances). Returns:
 *   "running"  — a run is queued or executing right now
 *   "cooldown" — the newest run started less than COOLDOWN_MINUTES ago
 *   "clear"    — go ahead and dispatch (including when the check itself
 *                fails: fail open so a GitHub API hiccup can't block updates)
 */
async function checkRecentRun(): Promise<"running" | "cooldown" | "clear"> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${REPO}/actions/workflows/update-sales.yml/runs?per_page=1`,
            {
                headers: { Accept: "application/vnd.github+json" },
                signal: AbortSignal.timeout(5000),
                cache: "no-store",
            },
        );
        if (!response.ok) return "clear";

        const data = await response.json();
        const run = data.workflow_runs?.[0];
        if (!run) return "clear";

        if (run.status === "queued" || run.status === "in_progress") {
            return "running";
        }
        const ageMs = Date.now() - new Date(run.created_at).getTime();
        if (ageMs < COOLDOWN_MINUTES * 60 * 1000) {
            return "cooldown";
        }
        return "clear";
    } catch {
        return "clear";
    }
}

function safeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

function html(status: number, message: string): NextResponse {
    return new NextResponse(
        `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1">
<body style="font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 80vh; margin: 0; padding: 24px; text-align: center;">
<p style="font-size: 1.25rem; max-width: 28rem;">${message}</p>
</body>`,
        { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
    ) as NextResponse;
}
