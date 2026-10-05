import { env } from "../config/env";

/**
 * IndexNow key. Public by design: the same value is served from the site at
 * `/{key}.txt` (frontend/public), which proves we own the host.
 */
const INDEXNOW_KEY = process.env.INDEXNOW_KEY?.trim() || "4fe32676c077552c0a3ff77ed9b99db5";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const TIMEOUT_MS = 8_000;

function siteOrigin(): URL | null {
  try {
    const url = new URL(env.publicSiteUrl);
    if (url.protocol !== "https:" || url.hostname === "localhost") return null;
    return url;
  } catch {
    return null;
  }
}

/**
 * Tell Bing / Yandex / Seznam (IndexNow partners) that URLs changed.
 * Fire-and-forget: never throws, never blocks the request that triggered it.
 */
export function pingIndexNow(paths: Array<string | null | undefined>): void {
  if (env.nodeEnv !== "production") return;
  const origin = siteOrigin();
  if (!origin) return;

  const urlList = [...new Set(paths.filter((p): p is string => Boolean(p)))].map(
    (p) => new URL(p, origin).toString(),
  );
  if (urlList.length === 0) return;

  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: origin.host,
      key: INDEXNOW_KEY,
      keyLocation: `${origin.origin}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
    .then((res) => {
      if (!res.ok && res.status !== 202) {
        console.warn(`[indexnow] ${res.status} for ${urlList.length} url(s)`);
      }
    })
    .catch((err: unknown) => {
      console.warn("[indexnow] ping failed", err instanceof Error ? err.message : err);
    });
}
