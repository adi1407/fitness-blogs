export type FoodDiet = "veg" | "egg" | "non-veg";

export type FoodServing = { label: string; grams: number };

export type FoodSummary = {
  slug: string;
  name: string;
  hindiName: string;
  category: string;
  diet: FoodDiet;
  /** Nutrients are per 100 g of this form, e.g. "dry (uncooked) dal". */
  basisLabel: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  defaultServing: FoodServing | null;
  updatedAt: string;
};

export type Food = FoodSummary & {
  calciumMg: number | null;
  ironMg: number | null;
  servings: FoodServing[];
  source: string;
  sourceRef: string;
  sourceName: string;
  sourceNote: string;
  intro: string;
  tips: string[];
  compareSlug: string | null;
};

export type FoodDetail = { food: Food; compare: Food | null; related: FoodSummary[] };

export const FOOD_CATEGORY_LABEL: Record<string, string> = {
  pulses: "Dals & pulses",
  cereals: "Grains & cereals",
  dairy: "Milk & dairy",
  eggs: "Eggs",
  "meat-fish": "Meat & fish",
  fruits: "Fruits",
  vegetables: "Vegetables",
  "nuts-seeds": "Nuts & seeds",
  "fats-sweeteners": "Fats & sweeteners",
};

export const DIET_LABEL: Record<FoodDiet, string> = {
  veg: "Veg",
  egg: "Egg",
  "non-veg": "Non-veg",
};
