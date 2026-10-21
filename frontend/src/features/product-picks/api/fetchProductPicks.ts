import { getApiBase } from "@/lib/api/client";
import type { ProductPick, ProductPickTarget } from "@/features/product-picks/types";

const PICKS_REVALIDATE = 600;

/** Never throws: a missing box must not break the page it sits on. */
export async function fetchProductPicks(
  target: ProductPickTarget,
  opts?: { fresh?: boolean },
): Promise<ProductPick[]> {
  try {
    const res = await fetch(
      `${getApiBase()}/public/product-picks?target=${encodeURIComponent(target)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8_000),
        ...(opts?.fresh
          ? { cache: "no-store" as const }
          : { next: { revalidate: PICKS_REVALIDATE, tags: ["product-picks"] } }),
      },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { picks?: ProductPick[] };
    return data.picks ?? [];
  } catch {
    return [];
  }
}
