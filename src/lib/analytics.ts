declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * Safe Google Analytics wrapper that no-ops when gtag hasn't loaded
 * (e.g. blocked by an ad blocker) so analytics never breaks the UI.
 */
export function capture(
    event: string,
    properties?: Record<string, unknown>
): void {
    try {
        window.gtag?.("event", event, properties);
    } catch {
        // Silently ignore — analytics should never break the UI
    }
}

export function captureException(err: unknown): void {
    try {
        window.gtag?.("event", "exception", {
            description: err instanceof Error ? err.message : String(err),
            fatal: false,
        });
    } catch {
        // Silently ignore
    }
}
