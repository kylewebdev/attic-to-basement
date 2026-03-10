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
