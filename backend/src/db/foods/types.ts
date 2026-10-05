export const FOOD_CATEGORIES = [
  "pulses",
  "cereals",
  "dairy",
  "eggs",
  "meat-fish",
  "fruits",
  "vegetables",
  "nuts-seeds",
  "fats-sweeteners",
] as const;

export type FoodCategory = (typeof FOOD_CATEGORIES)[number];

export type FoodServing = {
  label: string;
  /** Grams of the food in the form described by `basisLabel`. */
  grams: number;
};

/**
 * One seeded food. Nutrients are per 100 g of the form in `basisLabel`,
 * copied from the cited source record — never estimated.
 */
export type FoodSeed = {
  slug: string;
  name: string;
  hindiName: string;
  category: FoodCategory;
  diet: "veg" | "egg" | "non-veg";
  basisLabel: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  calciumMg: number | null;
  ironMg: number | null;
  /** First entry is the default serving. */
  servings: FoodServing[];
  source: "IFCT 2017" | "USDA FoodData Central";
  /** Source record id, e.g. IFCT food code "L003". */
  sourceRef: string;
  /** Record name exactly as in the source. */
  sourceName: string;
  /** How a value was derived when it isn't a direct copy (e.g. energy from macros). */
  sourceNote?: string;
  intro: string;
  tips: string[];
  relatedSlugs: string[];
  compareSlug?: string;
};
