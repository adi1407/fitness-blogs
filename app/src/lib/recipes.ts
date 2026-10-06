const MEALS = ["breakfast", "lunch", "dinner", "snack", "dessert"] as const;
export type Meal = (typeof MEALS)[number];

/** "breakfast-dinner" → ["breakfast", "dinner"]. */
export function mealsOf(mealType: string | null): Meal[] {
  if (!mealType) return [];
  return mealType.split("-").filter((m): m is Meal => (MEALS as readonly string[]).includes(m));
}

export function mealLabel(mealType: string | null) {
  return mealsOf(mealType)
    .map((m) => m[0].toUpperCase() + m.slice(1))
    .join(" · ");
}

export const MEAL_FILTERS = MEALS.filter((m) => m !== "dessert");

const FRACTIONS: [number, string][] = [
  [0.25, "1/4"],
  [0.333, "1/3"],
  [0.5, "1/2"],
  [0.667, "2/3"],
  [0.75, "3/4"],
];

function formatQty(n: number) {
  const whole = Math.floor(n);
  const rest = n - whole;
  if (rest < 0.05) return String(whole);
  const frac = FRACTIONS.find(([v]) => Math.abs(v - rest) < 0.05);
  if (frac) return whole ? `${whole} ${frac[1]}` : frac[1];
  return String(Math.round(n * 10) / 10);
}

/**
 * Scale the leading quantity of an ingredient line ("200g paneer", "1/2 cup peas", "1 1/2 tsp").
 * Lines without a leading number ("Salt, coriander leaves") are returned unchanged.
 */
export function scaleIngredient(line: string, factor: number) {
  if (factor === 1) return line;
  const m = line.match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)(.*)$/s);
  if (!m) return line;
  const raw = m[1];
  let qty: number;
  if (raw.includes("/")) {
    const parts = raw.split(/\s+/);
    const [num, den] = parts[parts.length - 1].split("/").map(Number);
    qty = (parts.length === 2 ? Number(parts[0]) : 0) + (den ? num / den : 0);
  } else {
    qty = Number(raw);
  }
  if (!Number.isFinite(qty) || qty <= 0) return line;
  return `${formatQty(qty * factor)}${m[2]}`;
}
