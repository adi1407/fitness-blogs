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

export const EXERCISE_DIFFICULTIES = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export type ExerciseDifficulty = (typeof EXERCISE_DIFFICULTIES)[number];

export const KNOWLEDGE_SECTIONS = ["programs", "reviews"] as const;

export type KnowledgeSection = (typeof KNOWLEDGE_SECTIONS)[number];

/** Reserved slug for section index / hub copy. */
export const KNOWLEDGE_HUB_SLUG = "_hub";

export const CONTENT_STATUSES = ["draft", "published"] as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export function isMuscleGroup(value: string): value is MuscleGroup {
  return (MUSCLE_GROUPS as readonly string[]).includes(value);
}

export function isKnowledgeSection(value: string): value is KnowledgeSection {
  return (KNOWLEDGE_SECTIONS as readonly string[]).includes(value);
}

export function exercisePath(group: string, slug: string): string {
  return `/exercises/${group}/${slug}`;
}

export function recipePath(slug: string): string {
  return `/recipes/${slug}`;
}

export function knowledgePath(section: string, slug: string): string {
  if (slug === KNOWLEDGE_HUB_SLUG || !slug) return `/${section}`;
  return `/${section}/${slug}`;
}
