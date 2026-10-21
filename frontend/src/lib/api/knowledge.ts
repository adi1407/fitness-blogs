import { apiFetch, isApiNotFound } from "@/lib/api/client";

/** Same window as the knowledge pages' `revalidate`; cached fetches keep those pages static (ISR). */
const KNOWLEDGE_CACHE = { next: { revalidate: 120, tags: ["knowledge"] } };

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

/*
 * Lists throw and details return null only on a real 404. If an outage were
 * treated as "empty" or "not found", ISR would cache that and replace the last
 * good page with a 404 for crawlers; throwing keeps the stale page instead.
 */

async function fetchDetail<T>(path: string): Promise<T | null> {
  try {
    return await apiFetch<T>(path, KNOWLEDGE_CACHE);
  } catch (err) {
    if (isApiNotFound(err)) return null;
    throw err;
  }
}

export async function fetchExercises(group?: string): Promise<PublicExercise[]> {
  const qs = group ? `?group=${encodeURIComponent(group)}` : "";
  const data = await apiFetch<{ exercises: PublicExercise[] }>(
    `/public/exercises${qs}`,
    KNOWLEDGE_CACHE,
  );
  return data.exercises ?? [];
}

export async function fetchExercise(
  group: string,
  slug: string,
): Promise<{ exercise: PublicExercise; related: PublicExercise[] } | null> {
  return fetchDetail(
    `/public/exercises/${encodeURIComponent(group)}/${encodeURIComponent(slug)}`,
  );
}

export async function fetchRecipes(): Promise<PublicRecipe[]> {
  const data = await apiFetch<{ recipes: PublicRecipe[] }>(
    "/public/recipes",
    KNOWLEDGE_CACHE,
  );
  return data.recipes ?? [];
}

export async function fetchRecipe(
  slug: string,
): Promise<{ recipe: PublicRecipe; related: PublicRecipe[] } | null> {
  return fetchDetail(`/public/recipes/${encodeURIComponent(slug)}`);
}

export async function fetchKnowledgeSection(
  section: "programs" | "reviews",
): Promise<{
  hub: PublicKnowledgePage | null;
  pages: PublicKnowledgePage[];
}> {
  return apiFetch(`/public/knowledge/${section}`, KNOWLEDGE_CACHE);
}

export async function fetchKnowledgePage(
  section: "programs" | "reviews",
  slug: string,
): Promise<{
  page: PublicKnowledgePage;
  related: PublicKnowledgePage[];
} | null> {
  return fetchDetail(`/public/knowledge/${section}/${encodeURIComponent(slug)}`);
}

/** For `generateStaticParams`: an API outage at build time must not fail the deploy. */
export async function staticParamsOrEmpty<T>(load: () => Promise<T[]>): Promise<T[]> {
  try {
    return await load();
  } catch (err) {
    console.warn("[knowledge] generateStaticParams skipped; pages render on first visit", err);
    return [];
  }
}
