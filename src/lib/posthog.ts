import posthog from "posthog-js";

/**
 * Safe PostHog wrapper that silently swallows errors on browsers
 * where PostHog fails to initialize (e.g. Samsung Internet).
 */
export function capture(
  event: string,
  properties?: Record<string, unknown>
): void {
  try {
    posthog.capture(event, properties);
  } catch {
    // Silently ignore — analytics should never break the UI
  }
}

export function captureException(err: unknown): void {
  try {
    posthog.captureException(err);
  } catch {
    // Silently ignore
  }
}
