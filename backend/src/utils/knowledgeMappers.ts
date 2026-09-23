import {
  exercisePath,
  knowledgePath,
  KNOWLEDGE_HUB_SLUG,
  recipePath,
} from "../constants/knowledgeContent";

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v)).filter(Boolean);
  }
  return [];
}

function parseJson(value: unknown, fallback: unknown = []) {
  if (value == null) return fallback;
  if (typeof value === "object") return value;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export function mapExercise(row: Record<string, unknown>) {
  const muscleGroup = String(row.muscle_group ?? "");
  const slug = String(row.slug ?? "");
  return {
    id: row.id,
    muscleGroup,
    slug,
    title: row.title,
    excerpt: row.excerpt,
    quickAnswer: row.quick_answer,
    bodyHtml: row.body_html,
    formCues: asStringArray(row.form_cues),
    commonMistakes: asStringArray(row.common_mistakes),
    programmingNotes: row.programming_notes,
    equipment: asStringArray(row.equipment),
    difficulty: row.difficulty,
    primaryMuscles: asStringArray(row.primary_muscles),
    secondaryMuscles: asStringArray(row.secondary_muscles),
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    status: row.status,
    robotsIndex: row.robots_index !== false,
    sortOrder: Number(row.sort_order ?? 0),
    path: muscleGroup && slug ? exercisePath(muscleGroup, slug) : null,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapRecipe(row: Record<string, unknown>) {
  const slug = String(row.slug ?? "");
  return {
    id: row.id,
    slug,
    title: row.title,
    excerpt: row.excerpt,
    quickAnswer: row.quick_answer,
    bodyHtml: row.body_html,
    ingredients: parseJson(row.ingredients, []),
    steps: parseJson(row.steps, []),
    calories: row.calories != null ? Number(row.calories) : null,
    proteinG: row.protein_g != null ? Number(row.protein_g) : null,
    carbsG: row.carbs_g != null ? Number(row.carbs_g) : null,
    fatG: row.fat_g != null ? Number(row.fat_g) : null,
    cuisineTags: asStringArray(row.cuisine_tags),
    mealType: row.meal_type,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    status: row.status,
    robotsIndex: row.robots_index !== false,
    sortOrder: Number(row.sort_order ?? 0),
    path: slug ? recipePath(slug) : null,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapKnowledgePage(row: Record<string, unknown>) {
  const section = String(row.section ?? "");
  const slug = String(row.slug ?? KNOWLEDGE_HUB_SLUG);
  const isHub = slug === KNOWLEDGE_HUB_SLUG;
  return {
    id: row.id,
    section,
    slug,
    isHub,
    title: row.title,
    excerpt: row.excerpt,
    bodyHtml: row.body_html,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    status: row.status,
    robotsIndex: row.robots_index !== false,
    sortOrder: Number(row.sort_order ?? 0),
    path: knowledgePath(section, slug),
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
