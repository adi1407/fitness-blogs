import type { FoodDiet, FoodSummary } from "@/features/foods/types";
import { forGrams, proteinPer100Kcal } from "@/features/foods/lib/nutrition";

export type RankingSort = "serving" | "calorie" | "weight";

export const RANKING_SORT_LABEL: Record<RankingSort, string> = {
  serving: "Per serving",
  calorie: "Per 100 kcal",
  weight: "Per 100 g",
};

export type RankedFood = {
  slug: string;
  name: string;
  hindiName: string;
  diet: FoodDiet;
  basisLabel: string;
  servingLabel: string;
  servingProteinG: number;
  servingKcal: number;
  per100KcalG: number;
  per100gG: number;
};

export function toRankedFoods(foods: FoodSummary[]): RankedFood[] {
  return foods.map((f) => {
    const serving = f.defaultServing ?? { label: "100 g", grams: 100 };
    const n = forGrams(f, serving.grams);
    return {
      slug: f.slug,
      name: f.name,
      hindiName: f.hindiName,
      diet: f.diet,
      basisLabel: f.basisLabel,
      servingLabel: serving.label,
      servingProteinG: n.proteinG,
      servingKcal: n.kcal,
      per100KcalG: proteinPer100Kcal(f),
      per100gG: Math.round(f.proteinG * 10) / 10,
    };
  });
}

const SORT_KEY: Record<RankingSort, (f: RankedFood) => number> = {
  serving: (f) => f.servingProteinG,
  calorie: (f) => f.per100KcalG,
  weight: (f) => f.per100gG,
};

export function rankBy(foods: RankedFood[], sort: RankingSort, diet?: FoodDiet | null): RankedFood[] {
  const key = SORT_KEY[sort];
  return foods
    .filter((f) => !diet || f.diet === diet)
    .sort((a, b) => key(b) - key(a) || a.name.localeCompare(b.name));
}
