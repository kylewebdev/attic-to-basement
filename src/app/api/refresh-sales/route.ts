import { timingSafeEqual } from "node:crypto";
import { request as httpsRequest } from "node:https";
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
    const githubToken = process.env.GH_DISPATCH_TOKEN?.trim();

    if (!refreshToken || !githubToken) {
        return html(503, "Refresh is not configured.");
    }

    const provided = request.nextUrl.searchParams.get("token") ?? "";
    if (!safeEqual(provided, refreshToken)) {
        return html(401, "Not authorized.");
    }

    const recent = await checkRecentRun(githubToken);
    if (recent === "running") {
        return html(200, "An update is already on its way! The website will show the latest sales in a few minutes.");
    }
    if (recent === "cooldown") {
        return html(200, "The website was just updated. If your latest changes aren't showing, wait 10 minutes and tap the link again.");
    }

    try {
        const response = await githubRequest(
            `/repos/${REPO}/dispatches`,
            githubToken,
            {
                method: "POST",
                body: JSON.stringify({ event_type: "update-sales" }),
                timeoutMs: 5000,
            },
        );

        if (response.statusCode !== 204) {
            console.error(`refresh-sales dispatch failed: ${response.statusCode} ${response.body}`);
            return html(502, "Could not start the update. Please try again in a minute.");
        }
    } catch (error) {
        const detail = error instanceof Error
            ? `${error.name}: ${error.message}`
            : "Unknown error";
        console.error(`refresh-sales dispatch request failed: ${detail}`);
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
async function checkRecentRun(
    githubToken: string,
): Promise<"running" | "cooldown" | "clear"> {
    try {
        const response = await githubRequest(
            `/repos/${REPO}/actions/workflows/update-sales.yml/runs?per_page=1`,
            githubToken,
            { timeoutMs: 2000 },
        );
        if (response.statusCode !== 200) return "clear";

        const data = JSON.parse(response.body);
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

interface GitHubRequestOptions {
    method?: "GET" | "POST";
    body?: string;
    timeoutMs: number;
}

function githubRequest(
    path: string,
    token: string,
    options: GitHubRequestOptions,
): Promise<{ statusCode: number; body: string }> {
    return new Promise((resolve, reject) => {
        const request = httpsRequest({
            hostname: "api.github.com",
            path,
            method: options.method ?? "GET",
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "User-Agent": "attic-to-basement-sales-refresh",
                "X-GitHub-Api-Version": "2022-11-28",
                ...(options.body
                    ? { "Content-Length": Buffer.byteLength(options.body) }
                    : {}),
            },
        }, (response) => {
            const chunks: Buffer[] = [];
            response.on("data", (chunk: Buffer) => chunks.push(chunk));
            response.on("end", () => {
                clearTimeout(timeout);
                resolve({
                    statusCode: response.statusCode ?? 0,
                    body: Buffer.concat(chunks).toString("utf8"),
                });
            });
            response.on("error", (error) => {
                clearTimeout(timeout);
                reject(error);
            });
        });

        const timeout = setTimeout(() => {
            request.destroy(new Error(`GitHub request timed out after ${options.timeoutMs}ms`));
        }, options.timeoutMs);

        request.on("error", (error) => {
            clearTimeout(timeout);
            reject(error);
        });

        if (options.body) request.write(options.body);
        request.end();
    });
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
