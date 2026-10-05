/** Published cluster articles linked from calculator pages. */
export const ARTICLES = {
  caloriesToLoseWeight: {
    title: "How many calories should I eat to lose weight?",
    href: "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight/793576630",
  },
  calorieDeficit: {
    title: "How to calculate your calorie deficit",
    href: "/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit/635175506",
  },
  lose10kg: {
    title: "How many calories should I eat to lose 10 kg?",
    href: "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-10-kg/185338238",
  },
  bellyFat: {
    title: "How to lose belly fat",
    href: "/blog/weight-loss/fat-loss-basics/how-to-lose-belly-fat/355528441",
  },
  walking: {
    title: "Does walking help you lose weight?",
    href: "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight/727382084",
  },
  proteinPerDay: {
    title: "How much protein do you need per day?",
    href: "/blog/nutrition/protein/how-much-protein-do-you-need-per-day/210790133",
  },
  proteinMuscle: {
    title: "How much protein to build muscle?",
    href: "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle/418755868",
  },
  proteinTiming: {
    title: "Protein before or after workout?",
    href: "/blog/nutrition/sports-nutrition/protein-before-or-after-workout/887645991",
  },
  indianProteinFoods: {
    title: "Best high-protein Indian foods",
    href: "/blog/nutrition/protein/best-high-protein-indian-foods/414579475",
  },
  indianWeightLossFoods: {
    title: "Best Indian foods for weight loss",
    href: "/blog/weight-loss/weight-loss-nutrition/best-indian-foods-for-weight-loss/676191478",
  },
  riceVsRoti: {
    title: "Rice vs roti for weight loss",
    href: "/blog/weight-loss/weight-loss-nutrition/rice-vs-roti-for-weight-loss/785934834",
  },
  beginnerGymDiet: {
    title: "Beginner gym diet plan",
    href: "/blog/muscle-building/beginner-muscle-building/beginner-gym-diet-plan/912245706",
  },
  buildMuscleTime: {
    title: "How long does it take to build muscle?",
    href: "/blog/muscle-building/muscle-growth-hypertrophy/how-long-does-it-take-to-build-muscle/739011960",
  },
  progressiveOverload: {
    title: "What is progressive overload?",
    href: "/blog/muscle-building/training-programs/what-is-progressive-overload/399232323",
  },
} as const;

export type LinkItem = { title: string; href: string; description?: string };

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
