/**
 * Timings and yield for the seeded recipes, read from each guide's steps.
 * `totalMinutes` is set only when the recipe has waiting time (soaking, sprouting,
 * cooling) on top of prep + cook; `timeNote` says what that time is.
 */
export type RecipeTiming = {
  prepMinutes: number;
  cookMinutes: number;
  totalMinutes?: number;
  timeNote?: string;
  servings: number;
};

export const RECIPE_TIMES: Record<string, RecipeTiming> = {
  "paneer-bhurji-high-protein": { prepMinutes: 5, cookMinutes: 15, servings: 1 },
  "dal-rice-protein-plate": { prepMinutes: 5, cookMinutes: 20, servings: 1 },
  "egg-bhurji-roti": {
    prepMinutes: 15,
    cookMinutes: 10,
    timeNote: "Prep includes resting the roti dough for 10 minutes.",
    servings: 1,
  },
  "greek-yogurt-fruit-bowl": { prepMinutes: 5, cookMinutes: 0, servings: 1 },
  "chicken-stir-fry-veggies": { prepMinutes: 10, cookMinutes: 20, servings: 1 },
  "moong-chilla-stack": {
    prepMinutes: 10,
    cookMinutes: 10,
    totalMinutes: 200,
    timeNote: "Total includes soaking the dal for 3–4 hours.",
    servings: 1,
  },
  "sprout-chaat-bowl": {
    prepMinutes: 10,
    cookMinutes: 5,
    totalMinutes: 1215,
    timeNote:
      "Total includes about 8 hours of soaking and 12 hours of sprouting. With ready sprouts it takes 15 minutes.",
    servings: 1,
  },
  "peanut-chikki-protein-snack": {
    prepMinutes: 5,
    cookMinutes: 10,
    totalMinutes: 45,
    timeNote: "Total includes about 30 minutes of cooling. Makes 16 pieces; one serving is 2 pieces.",
    servings: 8,
  },
};
