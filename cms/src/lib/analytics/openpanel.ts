/**
 * CMS OpenPanel track client (Vite env-gated).
 * @see docs/ANALYTICS_OPENPANEL.md
 */

type TrackProps = Record<string, string | number | boolean | null | undefined>;

const CLIENT_ID = import.meta.env.VITE_OPENPANEL_CLIENT_ID ?? "";
const API_URL = String(
  import.meta.env.VITE_OPENPANEL_API_URL ?? "https://api.openpanel.dev",
).replace(/\/$/, "");

export function isOpenPanelEnabled(): boolean {
  return Boolean(CLIENT_ID);
}

export function openPanelDashboardUrl(): string | null {
  const url = String(import.meta.env.VITE_OPENPANEL_DASHBOARD_URL ?? "").trim();
  return url || null;
}

export function trackCmsEvent(name: string, properties?: TrackProps): void {
  if (!CLIENT_ID || typeof window === "undefined") return;

  const payload = {
    type: "track",
    payload: {
      name,
      properties: {
        surface: "cms",
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
    /* ignore */
  });
}
