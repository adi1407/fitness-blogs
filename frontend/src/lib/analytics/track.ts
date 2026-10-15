/**
 * Custom analytics events, sent to GA4 via gtag. Page views are sent by
 * `GoogleAnalytics` itself. A no-op until gtag has loaded (consent-gated).
 */

type TrackProps = Record<string, string | number | boolean | null | undefined>;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/** Fire-and-forget GA4 event. Safe to call from client components. */
export function trackEvent(name: string, properties?: TrackProps): void {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") return;
  const params: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(properties ?? {})) {
    if (value !== null && value !== undefined) params[key] = value;
  }
  gtag("event", name, params);
}
