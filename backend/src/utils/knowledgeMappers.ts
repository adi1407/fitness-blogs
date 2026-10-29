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

export function mapCmsFood(row: Record<string, unknown>) {
  const slug = String(row.slug ?? "");
  const servings = parseJson(row.servings, []);
  const tips = parseJson(row.tips, []);
  return {
    id: row.id,
    slug,
    name: row.name,
    hindiName: row.hindi_name ?? "",
    category: row.category,
    diet: row.diet,
    isVeg: row.is_veg !== false,
    basisLabel: row.basis_label ?? "",
    kcal: Number(row.kcal ?? 0),
    proteinG: Number(row.protein_g ?? 0),
    carbsG: Number(row.carbs_g ?? 0),
    fatG: Number(row.fat_g ?? 0),
    fiberG: Number(row.fiber_g ?? 0),
    calciumMg: row.calcium_mg == null ? null : Number(row.calcium_mg),
    ironMg: row.iron_mg == null ? null : Number(row.iron_mg),
    servings: Array.isArray(servings) ? servings : [],
    source: row.source ?? "",
    sourceRef: row.source_ref ?? "",
    sourceName: row.source_name ?? "",
    sourceNote: row.source_note ?? "",
    intro: row.intro ?? "",
    tips: Array.isArray(tips) ? tips.map(String) : [],
    relatedSlugs: asStringArray(row.related_slugs),
    compareSlug: row.compare_slug ? String(row.compare_slug) : null,
    published: row.published === true,
    sortOrder: Number(row.sort_order ?? 0),
    managedBy: row.managed_by === "cms" ? "cms" : "seed",
    imageUrl: String(row.image_url ?? ""),
    imageAlt: String(row.image_alt ?? ""),
    path: slug ? `/foods/${slug}` : null,
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
    imageUrl: String(row.image_url ?? ""),
    imageAlt: String(row.image_alt ?? ""),
    prepMinutes: row.prep_minutes != null ? Number(row.prep_minutes) : null,
    cookMinutes: row.cook_minutes != null ? Number(row.cook_minutes) : null,
    totalMinutes: row.total_minutes != null ? Number(row.total_minutes) : null,
    timeNote: String(row.time_note ?? ""),
    servings: row.servings != null ? Number(row.servings) : null,
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
