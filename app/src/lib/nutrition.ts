import type { FoodSummary } from "@/api/foods";

export type Nutrients = { kcal: number; proteinG: number; carbsG: number; fatG: number; fiberG: number };

/** Scale per-100 g values to a gram amount, rounded for display. */
export function forGrams(food: Pick<FoodSummary, keyof Nutrients>, grams: number): Nutrients {
  const k = grams / 100;
  const r1 = (v: number) => Math.round(v * k * 10) / 10;
  return {
    kcal: Math.round(food.kcal * k),
    proteinG: r1(food.proteinG),
    carbsG: r1(food.carbsG),
    fatG: r1(food.fatG),
    fiberG: r1(food.fiberG),
  };
}

/** Share of calories from protein / carbs / fat (Atwater 4/4/9), summing to 100. */
export function macroSplit(food: Pick<FoodSummary, "proteinG" | "carbsG" | "fatG">) {
  const p = food.proteinG * 4;
  const c = food.carbsG * 4;
  const f = food.fatG * 9;
  const total = p + c + f;
  if (!total) return { proteinPct: 0, carbsPct: 0, fatPct: 0 };
  const proteinPct = Math.round((p / total) * 100);
  const fatPct = Math.round((f / total) * 100);
  return { proteinPct, carbsPct: Math.max(0, 100 - proteinPct - fatPct), fatPct };
}

/** Grams of protein per 100 kcal — the most useful "protein density" number. */
export function proteinPer100Kcal(food: Pick<FoodSummary, "proteinG" | "kcal">) {
  return food.kcal ? Math.round((food.proteinG / food.kcal) * 1000) / 10 : 0;
}

export function isHighProtein(food: Pick<FoodSummary, "proteinG" | "kcal">) {
  return food.proteinG >= 15 || proteinPer100Kcal(food) >= 10;
}

export function isLowCalorie(food: Pick<FoodSummary, "kcal">) {
  return food.kcal <= 60;
}

/** "Rajma (Red Kidney Beans)" → "Rajma". */
export function shortName(name: string) {
  return name.replace(/\s*\(.*\)\s*$/, "").trim();
}

export function formatG(v: number) {
  return `${Number.isInteger(v) ? v : v.toFixed(1)} g`;
}
