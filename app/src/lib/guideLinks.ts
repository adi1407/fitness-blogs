import { SITE_URL } from "@/config";
import type { ToolId } from "./tools";

export type GuideLink = { title: string; url: string };

/** Live article URLs (opened via `openLink`, which routes them to the native reader). */
function guide(title: string, cluster: string, slug: string, number: number): GuideLink {
  return { title, url: `${SITE_URL}/blog/${cluster}/${slug}/${number}` };
}

export const GUIDES = {
  caloriesToLoseWeight: guide("How many calories should I eat to lose weight?", "weight-loss/calorie-deficit", "how-many-calories-should-i-eat-to-lose-weight", 793576630),
  calorieDeficit: guide("How to calculate your calorie deficit", "weight-loss/calorie-deficit", "how-to-calculate-your-calorie-deficit", 635175506),
  bellyFat: guide("How to lose belly fat", "weight-loss/fat-loss-basics", "how-to-lose-belly-fat", 355528441),
  proteinPerDay: guide("How much protein do you need per day?", "nutrition/protein", "how-much-protein-do-you-need-per-day", 210790133),
  proteinMuscle: guide("How much protein to build muscle?", "muscle-building/muscle-building-nutrition", "how-much-protein-to-build-muscle", 418755868),
  indianProteinFoods: guide("Best high-protein Indian foods", "nutrition/protein", "best-high-protein-indian-foods", 414579475),
  vegProtein: guide("Vegetarian protein sources in India", "nutrition/protein", "vegetarian-protein-sources-india", 495682082),
  indianWeightLossFoods: guide("Best Indian foods for weight loss", "weight-loss/weight-loss-nutrition", "best-indian-foods-for-weight-loss", 676191478),
  riceVsRoti: guide("Rice vs roti for weight loss", "weight-loss/weight-loss-nutrition", "rice-vs-roti-for-weight-loss", 785934834),
  beginnerGymDiet: guide("Beginner gym diet plan", "muscle-building/beginner-muscle-building", "beginner-gym-diet-plan", 912245706),
  indianDietPlan: guide("7-day Indian diet plan for weight loss", "weight-loss/diet-meal-planning", "indian-diet-plan-for-weight-loss", 859354254),
  plan1500: guide("1500 calorie Indian diet plan", "weight-loss/diet-meal-planning", "1500-calorie-indian-diet-plan", 966317033),
  maintenanceCalories: guide("What are maintenance calories?", "nutrition/calories-energy", "maintenance-calories", 561064519),
  bmrVsTdee: guide("BMR vs TDEE: what's the difference?", "nutrition/calories-energy", "bmr-vs-tdee", 557888306),
  walking: guide("Does walking help you lose weight?", "weight-loss/walking-daily-activity", "does-walking-help-you-lose-weight", 727382084),
  waterPerDay: guide("How much water should you drink a day?", "nutrition/hydration", "how-much-water-should-you-drink", 225187540),
  buildMuscleTime: guide("How long does it take to build muscle?", "muscle-building/muscle-growth-hypertrophy", "how-long-does-it-take-to-build-muscle", 739011960),
  progressiveOverload: guide("What is progressive overload?", "muscle-building/training-programs", "what-is-progressive-overload", 399232323),
} as const;

/** Related guides per food category (same choices as the website's food pages). */
export const FOOD_CATEGORY_GUIDES: Record<string, GuideLink[]> = {
  pulses: [GUIDES.indianProteinFoods, GUIDES.vegProtein, GUIDES.indianWeightLossFoods],
  dairy: [GUIDES.indianProteinFoods, GUIDES.vegProtein, GUIDES.proteinMuscle],
  eggs: [GUIDES.indianProteinFoods, GUIDES.proteinMuscle, GUIDES.beginnerGymDiet],
  "meat-fish": [GUIDES.proteinMuscle, GUIDES.indianProteinFoods, GUIDES.beginnerGymDiet],
  cereals: [GUIDES.riceVsRoti, GUIDES.indianWeightLossFoods, GUIDES.indianDietPlan],
  fruits: [GUIDES.indianWeightLossFoods, GUIDES.caloriesToLoseWeight, GUIDES.bellyFat],
  vegetables: [GUIDES.indianWeightLossFoods, GUIDES.caloriesToLoseWeight, GUIDES.bellyFat],
  "nuts-seeds": [GUIDES.indianProteinFoods, GUIDES.indianWeightLossFoods, GUIDES.calorieDeficit],
  "fats-sweeteners": [GUIDES.indianWeightLossFoods, GUIDES.calorieDeficit, GUIDES.caloriesToLoseWeight],
};

export const FOOD_CALCULATORS: Record<"protein" | "energy", ToolId[]> = {
  protein: ["protein", "macro", "calorie"],
  energy: ["calorie", "deficit", "macro"],
};
