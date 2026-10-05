import { getApiBase } from "@/lib/api/client";
import type { FoodDetail, FoodSummary } from "@/features/foods/types";

export const FOODS_REVALIDATE = 3600;

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${getApiBase()}${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
      next: { revalidate: FOODS_REVALIDATE, tags: ["foods"] },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Foods API ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Foods API")) throw err;
    throw new Error("Foods API unreachable", { cause: err });
  }
}

/** All published foods. Throws when the API is down so ISR keeps the last good page. */
export async function fetchFoods(): Promise<FoodSummary[]> {
  const data = await getJson<{ foods: FoodSummary[] }>("/public/foods");
  return data?.foods ?? [];
}

/** One food, or null when it doesn't exist / isn't published. */
export async function fetchFood(slug: string): Promise<FoodDetail | null> {
  return getJson<FoodDetail>(`/public/foods/${encodeURIComponent(slug)}`);
}

/** Like `fetchFoods`, but never throws — for non-critical lists (search, sitemap). */
export async function fetchFoodsSafe(): Promise<FoodSummary[]> {
  try {
    return await fetchFoods();
  } catch {
    return [];
  }
}
