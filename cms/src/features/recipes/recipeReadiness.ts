/** Mirrors the API's recipe publish gate (backend/src/services/recipeGates.ts). */
export type RecipeReadinessInput = {
  imageUrl: string;
  imageAlt: string;
  prepMinutes: number | null;
  cookMinutes: number | null;
  totalMinutes: number | null;
  servings: number | null;
  calories: number | null;
  proteinG: number | null;
  carbsG: number | null;
  fatG: number | null;
  ingredients: string[];
  steps: string[];
  excerpt: string;
  metaDescription: string;
};

export type ReadinessCheck = { label: string; ok: boolean };

export function recipeReadiness(r: RecipeReadinessInput): ReadinessCheck[] {
  const sum = (r.prepMinutes ?? 0) + (r.cookMinutes ?? 0);
  return [
    { label: "Recipe photo (https)", ok: /^https:\/\//.test(r.imageUrl) },
    { label: "Photo alt text", ok: r.imageAlt.trim().length > 0 },
    { label: "Prep time", ok: r.prepMinutes != null && r.prepMinutes > 0 },
    { label: "Cook time (0 if no cooking)", ok: r.cookMinutes != null },
    { label: "Total time ≥ prep + cook", ok: r.totalMinutes == null || r.totalMinutes >= sum },
    { label: "Servings", ok: r.servings != null && r.servings >= 1 },
    {
      label: "Calories, protein, carbs and fat per serving",
      ok: [r.calories, r.proteinG, r.carbsG, r.fatG].every((v) => v != null),
    },
    { label: "At least 2 ingredients", ok: r.ingredients.length >= 2 },
    { label: "At least 2 steps", ok: r.steps.length >= 2 },
    { label: "Excerpt or meta description", ok: Boolean(r.excerpt.trim() || r.metaDescription.trim()) },
  ];
}
