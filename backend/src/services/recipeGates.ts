import type { mapRecipe } from "../utils/knowledgeMappers";

type Recipe = ReturnType<typeof mapRecipe>;

/**
 * What a published recipe needs for a valid Google recipe result: a real photo
 * (Google's only hard requirement besides the name), times, yield (required once
 * nutrition is given), nutrition, and a usable ingredient list and method.
 */
export function recipePublishGaps(r: Recipe): string[] {
  const gaps: string[] = [];
  if (!/^https:\/\//.test(r.imageUrl)) gaps.push("Add a recipe photo");
  else if (!r.imageAlt.trim()) gaps.push("Add photo alt text");
  if (r.prepMinutes == null || r.prepMinutes <= 0) gaps.push("Add prep time");
  if (r.cookMinutes == null) gaps.push("Add cook time (0 if there is no cooking)");
  if (r.totalMinutes != null && r.totalMinutes < (r.prepMinutes ?? 0) + (r.cookMinutes ?? 0)) {
    gaps.push("Total time can't be shorter than prep + cook");
  }
  if (r.servings == null || r.servings < 1) gaps.push("Add servings");
  if (r.calories == null || r.proteinG == null || r.carbsG == null || r.fatG == null) {
    gaps.push("Add calories, protein, carbs and fat per serving");
  }
  if (r.ingredients.length < 2) gaps.push("List at least 2 ingredients");
  if (r.steps.length < 2) gaps.push("List at least 2 steps");
  if (!String(r.excerpt ?? "").trim() && !String(r.metaDescription ?? "").trim()) {
    gaps.push("Add an excerpt or meta description");
  }
  return gaps;
}
