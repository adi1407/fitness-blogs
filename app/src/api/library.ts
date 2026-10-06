import { apiGet } from "./client";

export type Difficulty = "beginner" | "intermediate" | "advanced" | string;

export type Exercise = {
  id: string;
  muscleGroup: string;
  slug: string;
  title: string;
  excerpt: string | null;
  quickAnswer: string | null;
  bodyHtml: string | null;
  formCues: string[];
  commonMistakes: string[];
  programmingNotes: string | null;
  equipment: string[];
  difficulty: Difficulty | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  path: string | null;
  updatedAt: string | null;
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  quickAnswer: string | null;
  bodyHtml: string | null;
  ingredients: string[];
  steps: string[];
  calories: number | null;
  proteinG: number | null;
  carbsG: number | null;
  fatG: number | null;
  cuisineTags: string[];
  mealType: string | null;
  path: string | null;
  updatedAt: string | null;
};

export type KnowledgeSection = "programs" | "reviews";

export type KnowledgePage = {
  id: string;
  section: KnowledgeSection;
  slug: string;
  isHub: boolean;
  title: string;
  excerpt: string | null;
  bodyHtml: string | null;
  path: string | null;
  updatedAt: string | null;
};

export type Taxonomy = {
  categories: {
    id: string;
    slug: string;
    label: string;
    description: string | null;
    subcategories: { id: string; slug: string; label: string }[];
  }[];
};

export const MUSCLE_GROUPS = ["chest", "back", "legs", "shoulders", "arms", "core", "cardio"] as const;

export const MUSCLE_GROUP_LABEL: Record<string, string> = {
  chest: "Chest",
  back: "Back",
  legs: "Legs",
  shoulders: "Shoulders",
  arms: "Arms",
  core: "Core",
  cardio: "Cardio",
};

export const MEAL_TYPE_LABEL: Record<string, string> = {
  breakfast: "Breakfast",
  "lunch-dinner": "Lunch & dinner",
  snack: "Snack",
  dessert: "Dessert",
};

const asArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

function normaliseRecipe(r: Recipe): Recipe {
  return {
    ...r,
    ingredients: asArray<unknown>(r.ingredients).map(String),
    steps: asArray<unknown>(r.steps).map(String),
    cuisineTags: asArray<string>(r.cuisineTags),
  };
}

export const fetchExercises = (signal?: AbortSignal) =>
  apiGet<{ exercises: Exercise[] }>("/public/exercises", signal).then((d) => d.exercises);

export const fetchExercise = (group: string, slug: string, signal?: AbortSignal) =>
  apiGet<{ exercise: Exercise; related: Exercise[] }>(
    `/public/exercises/${encodeURIComponent(group)}/${encodeURIComponent(slug)}`,
    signal,
  );

export const fetchRecipes = (signal?: AbortSignal) =>
  apiGet<{ recipes: Recipe[] }>("/public/recipes", signal).then((d) => d.recipes.map(normaliseRecipe));

export const fetchRecipe = (slug: string, signal?: AbortSignal) =>
  apiGet<{ recipe: Recipe; related: Recipe[] }>(`/public/recipes/${encodeURIComponent(slug)}`, signal).then(
    (d) => ({ recipe: normaliseRecipe(d.recipe), related: d.related.map(normaliseRecipe) }),
  );

export const fetchKnowledge = (section: KnowledgeSection, signal?: AbortSignal) =>
  apiGet<{ hub: KnowledgePage | null; pages: KnowledgePage[] }>(`/public/knowledge/${section}`, signal);

export const fetchKnowledgePage = (section: KnowledgeSection, slug: string, signal?: AbortSignal) =>
  apiGet<{ page: KnowledgePage; related: KnowledgePage[] }>(
    `/public/knowledge/${section}/${encodeURIComponent(slug)}`,
    signal,
  );

export const fetchTaxonomy = (signal?: AbortSignal) => apiGet<Taxonomy>("/public/taxonomy", signal);
