/**
 * Lightweight OpenPanel track client (env-gated), also forwarding events to GA4.
 * The OpenPanel post is a no-op when NEXT_PUBLIC_OPENPANEL_CLIENT_ID is unset.
 * Cookieless (plain cross-origin POST, no credentials), so it runs for every
 * visitor regardless of the cookie choice.
 * @see docs/ANALYTICS_OPENPANEL.md
 */

type TrackProps = Record<string, string | number | boolean | null | undefined>;

const CLIENT_ID = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ?? "";
const API_URL = (
  process.env.NEXT_PUBLIC_OPENPANEL_API_URL ?? "https://api.openpanel.dev"
).replace(/\/$/, "");

export function isOpenPanelEnabled(): boolean {
  return Boolean(CLIENT_ID);
}

export function openPanelDashboardUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_OPENPANEL_DASHBOARD_URL?.trim();
  return url || null;
}

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/** GA4 gets custom events too (page views are sent by GoogleAnalytics itself). */
function forwardToGa(name: string, properties?: TrackProps): void {
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function" || name === "page_view") return;
  const params: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(properties ?? {})) {
    if (value !== null && value !== undefined) params[key] = value;
  }
  gtag("event", name, params);
}

/** Fire-and-forget event to OpenPanel and GA4. Safe to call from client components. */
export function trackEvent(name: string, properties?: TrackProps): void {
  if (typeof window === "undefined") return;
  forwardToGa(name, properties);
  if (!CLIENT_ID) return;

  const payload = {
    type: "track",
    payload: {
      name,
      properties: {
        path: window.location.pathname,
        ...properties,
      },
    },
  };

  void fetch(`${API_URL}/track`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "openpanel-client-id": CLIENT_ID,
    },
    body: JSON.stringify(payload),
    credentials: "omit",
    keepalive: true,
  }).catch(() => {
    /* ignore analytics failures */
  });
}

export function trackPageView(path?: string): void {
  trackEvent("page_view", {
    path: path ?? (typeof window !== "undefined" ? window.location.pathname : ""),
    title: typeof document !== "undefined" ? document.title : "",
  });
}
