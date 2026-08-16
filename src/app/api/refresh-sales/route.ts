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
            if (response.statusCode === 401 || response.statusCode === 403) {
                return html(424, "The update link needs its GitHub authorization renewed. Please contact Kyle.");
            }
            return html(424, "Could not start the update. Please try again in a minute.");
        }
    } catch (error) {
        const detail = error instanceof Error
            ? `${error.name}: ${error.message}`
            : "Unknown error";
        console.error(`refresh-sales dispatch request failed: ${detail}`);
        return html(424, "Could not reach the update service. Please try again in a minute.");
    }

    return html(
        200,
        "Update started! The website will show the latest sales in a few minutes.",
    );
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
            family: 4,
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
            response.setTimeout(options.timeoutMs, () => {
                response.destroy(new Error(`GitHub response timed out after ${options.timeoutMs}ms`));
            });
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
            reject(new Error(`GitHub request timed out after ${options.timeoutMs}ms`));
            request.destroy();
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
        {
            status,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "X-Refresh-Route-Version": "6",
            },
        },
    ) as NextResponse;
}
