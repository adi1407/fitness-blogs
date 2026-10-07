/** Locked blog taxonomy: exactly 3 primary categories → subcategories → articles. */

export type BlogCategorySlug =
  | "muscle-building"
  | "weight-loss"
  | "nutrition";

export type BlogSubcategoryDef = {
  slug: string;
  label: string;
  /** Unique 2–3 sentence intro for the subcategory listing page. */
  intro?: string;
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
      {
        slug: "muscle-growth-hypertrophy",
        label: "Muscle Growth & Hypertrophy",
        intro:
          "How muscle actually grows, and how long it realistically takes. These guides explain hypertrophy in plain language so you can set honest expectations for your first months and years of training.",
      },
      { slug: "bulking", label: "Bulking" },
      {
        slug: "muscle-building-nutrition",
        label: "Muscle Building Nutrition",
        intro:
          "What to eat to build muscle: protein targets per kg of body weight, calories for a lean gain, and evidence-based supplements like creatine. Every guide uses foods you can find in an Indian kitchen.",
      },
      { slug: "strength-performance", label: "Strength & Performance" },
      {
        slug: "training-programs",
        label: "Training Programs",
        intro:
          "The training principles behind every good program, starting with progressive overload. Learn how to add reps, sets or load week to week so you keep getting stronger without getting hurt.",
      },
      {
        slug: "beginner-muscle-building",
        label: "Beginner Muscle Building",
        intro:
          "Starting the gym? These beginner guides cover what to eat, how to train in your first months, and the simple habits that drive most early progress.",
      },
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
      {
        slug: "fat-loss-basics",
        label: "Fat Loss Basics",
        intro:
          "How fat loss really works, including why you cannot spot-reduce belly fat. Start here for the fundamentals: an energy deficit, enough protein, strength training and patience.",
      },
      {
        slug: "calorie-deficit",
        label: "Calorie Deficit",
        intro:
          "How many calories to eat to lose weight, and how to calculate a calorie deficit you can sustain. These guides turn maintenance calories into a daily target, with worked examples for common goals like losing 10 kg.",
      },
      {
        slug: "weight-loss-nutrition",
        label: "Weight Loss Nutrition",
        intro:
          "Which Indian foods help with weight loss, and which ones only seem to. Compare rice and roti, paneer and other staples by calories and protein so your meals keep you full in a deficit.",
      },
      {
        slug: "diet-meal-planning",
        label: "Diet & Meal Planning",
        intro:
          "Practical weight-loss meal ideas built from everyday Indian food. Find high-protein breakfasts and lighter dinners that fit a calorie target without special diet products.",
      },
      { slug: "cardio-weight-loss", label: "Cardio & Weight Loss" },
      {
        slug: "strength-training-weight-loss",
        label: "Strength Training for Weight Loss",
      },
      {
        slug: "walking-daily-activity",
        label: "Walking & Daily Activity",
        intro:
          "How much walking helps you lose weight, and how daily steps add up over a week. Learn what step counts research supports and how to raise your daily activity without burning out.",
      },
      {
        slug: "intermittent-fasting",
        label: "Intermittent Fasting",
        intro:
          "Does intermittent fasting work for weight loss? These guides explain what 16:8 and other eating windows really do, how they compare with a regular calorie deficit, and who should skip fasting.",
      },
      { slug: "beginner-weight-loss", label: "Beginner Weight Loss" },
      {
        slug: "weight-loss-plateaus",
        label: "Weight Loss Plateaus",
        intro:
          "Not losing weight even though you are eating less? Work through the real reasons the scale gets stuck, from water retention to under-counted calories, and what to change first.",
      },
      { slug: "sustainable-weight-loss", label: "Sustainable Weight Loss" },
      { slug: "weight-loss-mistakes", label: "Weight Loss Mistakes" },
      {
        slug: "weight-loss-myths",
        label: "Weight Loss Myths",
        intro:
          "Common weight-loss myths, checked against the evidence. Find out whether rice and other usual suspects really stop fat loss, or whether total calories matter more.",
      },
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
      {
        slug: "protein",
        label: "Protein",
        intro:
          "How much protein you need per day, and the best high-protein Indian foods to get there. Includes calories and protein for paneer, eggs and chicken, plus an honest look at whey protein safety.",
      },
      { slug: "carbohydrates", label: "Carbohydrates" },
      {
        slug: "dietary-fats",
        label: "Dietary Fats",
        intro:
          "Which fats to eat and how much is okay, including ghee. These guides look at heart health, weight loss and sensible portions for the fats used in Indian cooking.",
      },
      { slug: "fiber", label: "Fiber" },
      { slug: "vitamins-minerals", label: "Vitamins & Minerals" },
      {
        slug: "hydration",
        label: "Hydration",
        intro:
          "How much water you should drink a day, and when you need more. Learn how body size, heat and exercise change your needs, and simple signs that you are drinking enough.",
      },
      { slug: "meal-planning", label: "Meal Planning" },
      {
        slug: "sports-nutrition",
        label: "Sports Nutrition",
        intro:
          "Eating around training: protein timing, pre- and post-workout meals, and what actually matters for performance and recovery. Daily totals come first; timing is the fine-tuning.",
      },
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

export function isBlogCategorySlug(slug: string): slug is BlogCategorySlug {
  return (BLOG_CATEGORY_SLUGS as readonly string[]).includes(slug);
}
