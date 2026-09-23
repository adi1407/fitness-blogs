import { apiFetch } from "@/lib/api/client";

export const MUSCLE_GROUPS = [
  "chest",
  "back",
  "shoulders",
  "arms",
  "legs",
  "core",
  "cardio",
] as const;

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number];

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: "Chest",
  back: "Back",
  shoulders: "Shoulders",
  arms: "Arms",
  legs: "Legs",
  core: "Core",
  cardio: "Cardio",
};

export function isMuscleGroup(value: string): value is MuscleGroup {
  return (MUSCLE_GROUPS as readonly string[]).includes(value);
}

export type PublicExercise = {
  id: string;
  muscleGroup: string;
  slug: string;
  title: string;
  excerpt: string;
  quickAnswer: string;
  bodyHtml: string;
  formCues: string[];
  commonMistakes: string[];
  programmingNotes: string;
  equipment: string[];
  difficulty: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  metaTitle: string;
  metaDescription: string;
  status: string;
  robotsIndex: boolean;
  sortOrder: number;
  path: string | null;
  publishedAt: string | null;
  updatedAt?: string;
};

export type PublicRecipe = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  quickAnswer: string;
  bodyHtml: string;
  ingredients: unknown[];
  steps: unknown[];
  calories: number | null;
  proteinG: number | null;
  carbsG: number | null;
  fatG: number | null;
  cuisineTags: string[];
  mealType: string;
  metaTitle: string;
  metaDescription: string;
  status: string;
  robotsIndex: boolean;
  sortOrder: number;
  path: string | null;
  publishedAt: string | null;
  updatedAt?: string;
};

export type PublicKnowledgePage = {
  id: string;
  section: string;
  slug: string;
  isHub: boolean;
  title: string;
  excerpt: string;
  bodyHtml: string;
  metaTitle: string;
  metaDescription: string;
  status: string;
  robotsIndex: boolean;
  sortOrder: number;
  path: string | null;
  publishedAt: string | null;
  updatedAt?: string;
};

export async function fetchExercises(group?: string): Promise<PublicExercise[]> {
  const qs = group ? `?group=${encodeURIComponent(group)}` : "";
  try {
    const data = await apiFetch<{ exercises: PublicExercise[] }>(
      `/public/exercises${qs}`,
    );
    return data.exercises ?? [];
  } catch {
    return [];
  }
}

export async function fetchExercise(
  group: string,
  slug: string,
): Promise<{ exercise: PublicExercise; related: PublicExercise[] } | null> {
  try {
    return await apiFetch(`/public/exercises/${group}/${slug}`);
  } catch {
    return null;
  }
}

export async function fetchRecipes(): Promise<PublicRecipe[]> {
  try {
    const data = await apiFetch<{ recipes: PublicRecipe[] }>("/public/recipes");
    return data.recipes ?? [];
  } catch {
    return [];
  }
}

export async function fetchRecipe(
  slug: string,
): Promise<{ recipe: PublicRecipe; related: PublicRecipe[] } | null> {
  try {
    return await apiFetch(`/public/recipes/${slug}`);
  } catch {
    return null;
  }
}

export async function fetchKnowledgeSection(
  section: "programs" | "reviews",
): Promise<{
  hub: PublicKnowledgePage | null;
  pages: PublicKnowledgePage[];
}> {
  try {
    return await apiFetch(`/public/knowledge/${section}`);
  } catch {
    return { hub: null, pages: [] };
  }
}

export async function fetchKnowledgePage(
  section: "programs" | "reviews",
  slug: string,
): Promise<{
  page: PublicKnowledgePage;
  related: PublicKnowledgePage[];
} | null> {
  try {
    return await apiFetch(`/public/knowledge/${section}/${slug}`);
  } catch {
    return null;
  }
}
