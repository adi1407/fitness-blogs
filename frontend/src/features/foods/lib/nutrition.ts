import type { FoodServing, FoodSummary } from "@/features/foods/types";

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

/**
 * "1 medium roti (30 g atta)" → "Roti", "1 egg white (≈30 g)" → "Egg White",
 * "1 katori cooked dal (…)" → "Katori"; falls back to "Serving".
 */
export function servingNoun(serving: FoodServing | null | undefined) {
  const grams = serving?.label.match(/^(\d+) g\b/);
  if (grams && grams[1] !== "100") return `${grams[1]} g`;
  const m = serving?.label.match(/^1 (?:small |medium |large |big )?([^(]+?)\s*(?:\(|$)/i);
  if (!m) return "Serving";
  const words = m[1].split(/\s+/).filter((w) => /^[a-z]+$/i.test(w));
  if (!words.length) return "Serving";
  const picked = words.length <= 2 && words.length === m[1].split(/\s+/).length ? words : words.slice(0, 1);
  return picked.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

export function formatG(v: number) {
  return `${Number.isInteger(v) ? v : v.toFixed(1)} g`;
}

/** Plain-language goal notes computed from the numbers, not opinions. */
export function goalNotes(food: FoodSummary): { weightLoss: string; muscle: string } {
  const density = proteinPer100Kcal(food);
  const name = shortName(food.name);
  const serving = food.defaultServing;
  const servingKcal = serving ? forGrams(food, serving.grams).kcal : null;

  let weightLoss: string;
  if (food.kcal <= 60) {
    weightLoss = `${name} is low in calories (${food.kcal} kcal per 100 g), so it adds volume to meals without adding much energy.`;
  } else if (food.kcal >= 450) {
    weightLoss = `${name} is energy-dense (${food.kcal} kcal per 100 g). It can fit a weight-loss diet, but measure portions — small amounts add up quickly.`;
  } else if (food.fiberG >= 8 || density >= 7) {
    weightLoss = `${name} is filling for its calories thanks to its ${food.fiberG >= 8 ? "fibre" : "protein"}${servingKcal != null ? ` (${serving!.label}: about ${servingKcal} kcal)` : ""}. A good fit for a calorie deficit in normal portions.`;
  } else {
    weightLoss = `${name} fits a weight-loss diet in measured portions${servingKcal != null ? ` (${serving!.label}: about ${servingKcal} kcal)` : ""}. Total daily calories matter more than any single food.`;
  }

  let muscle: string;
  if (density >= 10) {
    muscle = `Excellent protein for the calories: about ${density} g of protein per 100 kcal. A strong choice when you're trying to hit a daily protein target.`;
  } else if (density >= 5) {
    muscle = `A useful protein source with about ${density} g of protein per 100 kcal. Combine it with other protein foods across the day.`;
  } else {
    muscle = `Not a significant protein source (${density} g per 100 kcal). Pair it with dal, paneer, eggs, curd or meat to reach your protein target.`;
  }
  return { weightLoss, muscle };
}
