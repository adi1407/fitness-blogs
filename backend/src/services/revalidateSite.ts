import { env } from "../config/env";

const TIMEOUT_MS = 8_000;

/** Cache tags the site's /api/revalidate route accepts (must match its allow-list). */
export type SiteCacheTag = "articles" | "knowledge" | "foods" | "product-picks";

/**
 * Ask the Next.js site to drop cached pages so a publish/edit shows up
 * immediately instead of after the ISR window. Fire-and-forget; never throws.
 * No-op until REVALIDATE_SECRET is set on both the API and the site.
 */
export function revalidateSite(
  paths: Array<string | null | undefined>,
  tags: SiteCacheTag[] = ["articles"],
): void {
  if (!env.revalidateSecret) return;
  let endpoint: string;
  try {
    endpoint = new URL("/api/revalidate", env.publicSiteUrl).toString();
  } catch {
    return;
  }

  const unique = [...new Set(paths.filter((p): p is string => Boolean(p)))];
  void fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.revalidateSecret}`,
    },
    body: JSON.stringify({ tags, paths: unique }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
    .then((res) => {
      if (!res.ok) console.warn(`[revalidate] site responded ${res.status}`);
    })
    .catch((err: unknown) => {
      console.warn(
        "[revalidate] request failed",
        err instanceof Error ? err.message : err,
      );
    });
}
