/**
 * Lightweight OpenPanel track client (env-gated).
 * No-op when NEXT_PUBLIC_OPENPANEL_CLIENT_ID is unset.
 * Analytics events are also no-op until the visitor opts in via cookie consent.
 * @see docs/ANALYTICS_OPENPANEL.md
 */

import { hasAnalyticsConsent } from "@/lib/cookies/consent";

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

/** Fire-and-forget event. Safe to call from client components. */
export function trackEvent(name: string, properties?: TrackProps): void {
  if (!CLIENT_ID || typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

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
