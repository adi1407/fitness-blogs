/**
 * Published cluster article link. `number` is the live article_number, which keeps
 * the link redirect-free in production; if a database ever assigns a different
 * number, the article route resolves by slug and 308s to the right URL instead of 404ing.
 */
function article(title: string, cluster: string, slug: string, number: number) {
  return { title, slug, href: `/blog/${cluster}/${slug}/${number}` };
}

/** Published cluster articles linked from calculator pages. */
export const ARTICLES = {
  caloriesToLoseWeight: article("How many calories should I eat to lose weight?", "weight-loss/calorie-deficit", "how-many-calories-should-i-eat-to-lose-weight", 793576630),
  calorieDeficit: article("How to calculate your calorie deficit", "weight-loss/calorie-deficit", "how-to-calculate-your-calorie-deficit", 635175506),
  lose10kg: article("How many calories should I eat to lose 10 kg?", "weight-loss/calorie-deficit", "how-many-calories-should-i-eat-to-lose-10-kg", 185338238),
  bellyFat: article("How to lose belly fat", "weight-loss/fat-loss-basics", "how-to-lose-belly-fat", 355528441),
  walking: article("Does walking help you lose weight?", "weight-loss/walking-daily-activity", "does-walking-help-you-lose-weight", 727382084),
  notLosingWeight: article("Why am I not losing weight?", "weight-loss/weight-loss-plateaus", "why-am-i-not-losing-weight", 686723666),
  maintenanceCalories: article("What are maintenance calories?", "nutrition/calories-energy", "maintenance-calories", 561064519),
  intermittentFasting: article("Does intermittent fasting work?", "weight-loss/intermittent-fasting", "does-intermittent-fasting-work", 723207649),
  proteinPerDay: article("How much protein do you need per day?", "nutrition/protein", "how-much-protein-do-you-need-per-day", 210790133),
  proteinMuscle: article("How much protein to build muscle?", "muscle-building/muscle-building-nutrition", "how-much-protein-to-build-muscle", 418755868),
  proteinTiming: article("Protein before or after workout?", "nutrition/sports-nutrition", "protein-before-or-after-workout", 887645991),
  indianProteinFoods: article("Best high-protein Indian foods", "nutrition/protein", "best-high-protein-indian-foods", 414579475),
  wheySafe: article("Is whey protein safe?", "nutrition/protein", "is-whey-protein-safe", 638746154),
  creatineSafe: article("Is creatine safe?", "muscle-building/muscle-building-nutrition", "is-creatine-safe", 528774226),
  waterPerDay: article("How much water should you drink a day?", "nutrition/hydration", "how-much-water-should-you-drink", 225187540),
  gheeGood: article("Is ghee good for you?", "nutrition/dietary-fats", "is-ghee-good-for-you", 466554465),
  indianWeightLossFoods: article("Best Indian foods for weight loss", "weight-loss/weight-loss-nutrition", "best-indian-foods-for-weight-loss", 676191478),
  riceVsRoti: article("Rice vs roti for weight loss", "weight-loss/weight-loss-nutrition", "rice-vs-roti-for-weight-loss", 785934834),
  beginnerGymDiet: article("Beginner gym diet plan", "muscle-building/beginner-muscle-building", "beginner-gym-diet-plan", 912245706),
  buildMuscleTime: article("How long does it take to build muscle?", "muscle-building/muscle-growth-hypertrophy", "how-long-does-it-take-to-build-muscle", 739011960),
  progressiveOverload: article("What is progressive overload?", "muscle-building/training-programs", "what-is-progressive-overload", 399232323),
} as const;

export type LinkItem = { title: string; href: string; description?: string };

/** Food database pages (seeded from IFCT 2017 in backend/src/db/foods). */
export const FOODS = {
  index: { title: "Indian food calories & protein chart", href: "/foods/indian" },
  paneer: { title: "Paneer calories & protein", href: "/foods/paneer" },
  chickenBreast: { title: "Chicken breast calories & protein", href: "/foods/chicken-breast" },
  boiledEgg: { title: "Boiled egg calories & protein", href: "/foods/boiled-egg" },
  moongDal: { title: "Moong dal calories & protein", href: "/foods/moong-dal" },
  roti: { title: "Roti calories", href: "/foods/roti" },
  rice: { title: "Rice calories", href: "/foods/rice" },
} as const;

export const CALCULATORS: Record<string, LinkItem> = {
  calorie: {
    title: "Calorie calculator",
    href: "/calorie-calculator",
    description: "Daily calories for loss, maintenance or gain",
  },
  tdee: {
    title: "TDEE calculator",
    href: "/tdee-calculator",
    description: "How many calories you burn in a day",
  },
  bmr: {
    title: "BMR calculator",
    href: "/bmr-calculator",
    description: "Calories burned at complete rest",
  },
  macro: {
    title: "Macro calculator",
    href: "/macro-calculator",
    description: "Protein, carbs and fat in grams",
  },
  protein: {
    title: "Protein calculator",
    href: "/protein-calculator",
    description: "Daily protein for your goal",
  },
  bmi: {
    title: "BMI calculator",
    href: "/bmi-calculator",
    description: "BMI with Indian and international cut-offs",
  },
  deficit: {
    title: "Calorie deficit calculator",
    href: "/calorie-deficit-calculator",
    description: "Daily calories and a safe timeline to a goal weight",
  },
  bodyFat: {
    title: "Body fat calculator",
    href: "/body-fat-calculator",
    description: "Body fat % from a tape measure (U.S. Navy method)",
  },
  oneRepMax: {
    title: "One rep max calculator",
    href: "/one-rep-max-calculator",
    description: "Estimated 1RM and training loads by rep range",
  },
  water: {
    title: "Water intake calculator",
    href: "/water-intake-calculator",
    description: "Daily water for your weight, training and climate",
  },
  steps: {
    title: "Steps to calories calculator",
    href: "/steps-to-calories-calculator",
    description: "Distance and calories burned from your step count",
  },
};
