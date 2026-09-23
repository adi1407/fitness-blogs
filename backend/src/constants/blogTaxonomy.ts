/** Locked blog taxonomy: exactly 3 primary categories → subcategories → articles. */

export type BlogCategorySlug =
  | "muscle-building"
  | "weight-loss"
  | "nutrition";

export type BlogSubcategoryDef = {
  slug: string;
  label: string;
};

export type BlogCategoryDef = {
  slug: BlogCategorySlug;
  label: string;
  description: string;
  subcategories: BlogSubcategoryDef[];
};

export const BLOG_TAXONOMY: BlogCategoryDef[] = [
  {
    slug: "muscle-building",
    label: "Muscle Building",
    description:
      "Muscle growth, hypertrophy, bulking, strength, training, and muscle-building nutrition.",
    subcategories: [
      { slug: "muscle-growth-hypertrophy", label: "Muscle Growth & Hypertrophy" },
      { slug: "bulking", label: "Bulking" },
      { slug: "muscle-building-nutrition", label: "Muscle Building Nutrition" },
      { slug: "strength-performance", label: "Strength & Performance" },
      { slug: "training-programs", label: "Training Programs" },
      { slug: "beginner-muscle-building", label: "Beginner Muscle Building" },
      { slug: "advanced-muscle-building", label: "Advanced Muscle Building" },
      { slug: "recovery-muscle-growth", label: "Recovery & Muscle Growth" },
      { slug: "muscle-building-mistakes", label: "Muscle Building Mistakes" },
      { slug: "muscle-building-science", label: "Muscle Building Science" },
    ],
  },
  {
    slug: "weight-loss",
    label: "Weight Loss",
    description:
      "Fat loss, calorie deficits, nutrition, exercise, and sustainable weight management.",
    subcategories: [
      { slug: "fat-loss-basics", label: "Fat Loss Basics" },
      { slug: "calorie-deficit", label: "Calorie Deficit" },
      { slug: "weight-loss-nutrition", label: "Weight Loss Nutrition" },
      { slug: "diet-meal-planning", label: "Diet & Meal Planning" },
      { slug: "cardio-weight-loss", label: "Cardio & Weight Loss" },
      {
        slug: "strength-training-weight-loss",
        label: "Strength Training for Weight Loss",
      },
      { slug: "walking-daily-activity", label: "Walking & Daily Activity" },
      { slug: "intermittent-fasting", label: "Intermittent Fasting" },
      { slug: "beginner-weight-loss", label: "Beginner Weight Loss" },
      { slug: "weight-loss-plateaus", label: "Weight Loss Plateaus" },
      { slug: "sustainable-weight-loss", label: "Sustainable Weight Loss" },
      { slug: "weight-loss-mistakes", label: "Weight Loss Mistakes" },
      { slug: "weight-loss-myths", label: "Weight Loss Myths" },
      { slug: "weight-maintenance", label: "Weight Maintenance" },
    ],
  },
  {
    slug: "nutrition",
    label: "Nutrition",
    description:
      "Calories, macros, micronutrients, food quality, hydration, and meal planning.",
    subcategories: [
      { slug: "nutrition-basics", label: "Nutrition Basics" },
      { slug: "calories-energy", label: "Calories & Energy" },
      { slug: "protein", label: "Protein" },
      { slug: "carbohydrates", label: "Carbohydrates" },
      { slug: "dietary-fats", label: "Dietary Fats" },
      { slug: "fiber", label: "Fiber" },
      { slug: "vitamins-minerals", label: "Vitamins & Minerals" },
      { slug: "hydration", label: "Hydration" },
      { slug: "meal-planning", label: "Meal Planning" },
      { slug: "sports-nutrition", label: "Sports Nutrition" },
      { slug: "pre-workout-nutrition", label: "Pre-Workout Nutrition" },
      { slug: "post-workout-nutrition", label: "Post-Workout Nutrition" },
      { slug: "dietary-patterns", label: "Dietary Patterns" },
      { slug: "food-labels-portions", label: "Food Labels & Portions" },
      { slug: "nutrition-myths", label: "Nutrition Myths" },
      { slug: "nutrition-science", label: "Nutrition Science" },
    ],
  },
];

export const BLOG_CATEGORY_SLUGS = BLOG_TAXONOMY.map((c) => c.slug) as [
  BlogCategorySlug,
  ...BlogCategorySlug[],
];

/** Cross-category topic labels for article metadata (not nested categories). */
export const BLOG_TOPICS = [
  "Protein",
  "Calories",
  "Macros",
  "Hypertrophy",
  "Progressive Overload",
  "Calorie Deficit",
  "Body Composition",
  "Strength",
  "Recovery",
  "Sleep",
  "Hydration",
  "Meal Planning",
  "Performance",
  "Beginner Fitness",
  "Indian Nutrition",
] as const;

export function blogArticlePath(
  categorySlug: string,
  subcategorySlug: string,
  articleSlug: string,
  articleNumber?: number | null,
): string {
  const base = `/blog/${categorySlug}/${subcategorySlug}/${articleSlug}`;
  if (
    articleNumber != null &&
    Number.isFinite(Number(articleNumber)) &&
    Number(articleNumber) > 0
  ) {
    return `${base}/${articleNumber}`;
  }
  return base;
}

export function findCategory(slug: string): BlogCategoryDef | undefined {
  return BLOG_TAXONOMY.find((c) => c.slug === slug);
}

export function findSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): BlogSubcategoryDef | undefined {
  return findCategory(categorySlug)?.subcategories.find(
    (s) => s.slug === subcategorySlug,
  );
}
