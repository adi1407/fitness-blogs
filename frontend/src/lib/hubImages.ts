/**
 * Local hub photography under `public/images/hubs/{category}/fN.png`.
 * Missing on disk: f27, f28, f52–f55.
 *
 * Prefer “clean” photos for cards. Use “poster” graphics only in full-bleed
 * bands — they already include headline text.
 */

const f = (category: string, n: number) =>
  `/images/hubs/${category}/f${n}.png`;

/** Clean photography — best for cards, carousels, morph thumbs */
export const HUB = {
  // Nutrition / food → hubs/nutrition/
  powerBowl: f("nutrition", 1),
  chickenBowl: f("nutrition", 7),
  saladBowl: f("nutrition", 9),
  mealPrep: f("nutrition", 20),
  indianThali: f("nutrition", 5),
  indianThaliWide: f("nutrition", 24),
  veggieBowl: f("nutrition", 26),
  produceSpread: f("nutrition", 35),
  healthyBreakfast: f("nutrition", 36),

  // Training / muscle → hubs/muscle-building/ + hubs/training/
  bicepCurl: f("muscle-building", 2),
  gymInterior: f("training", 3),
  dumbbellRow: f("muscle-building", 4),
  deadlift: f("muscle-building", 8),
  dumbbellRowWide: f("muscle-building", 21),
  gymFloor: f("training", 22),
  bicepCurlWide: f("muscle-building", 23),
  deadliftWide: f("muscle-building", 29),
  bicepFocus: f("muscle-building", 32),
  barbellSquat: f("muscle-building", 33),

  // Cardio / weight loss → hubs/weight-loss/
  outdoorRun: f("weight-loss", 30),

  // Recovery / mobility / mindset
  mobilityStretch: f("training", 31),
  meditation: f("about", 34),

  // Tools / EEAT → hubs/tools/
  healthConsult: f("tools", 6),
  checkup: f("tools", 25),
} as const;

/**
 * Poster / hero graphics with baked-in FITLIVES copy.
 * Use as standalone full-bleed bands — avoid stacking more UI text on top.
 */
export const HUB_POSTER = {
  // hubs/home/
  sunsetMindset: f("home", 10),
  disciplineMeal: f("home", 11),
  buildStrongerYou: f("home", 12),
  betterChoices: f("home", 13),
  disciplineToday: f("home", 14),
  disciplineBetterYou: f("home", 15),
  disciplineBetterYouAlt: f("home", 16),
  gymNeon: f("home", 17),
  gymGold: f("home", 18),
  mountainDiscipline: f("home", 19),
  progressLooksGood: f("home", 37),
  disciplineReality: f("home", 38),
  lifestyleBench: f("home", 39),
  tyingShoes: f("home", 40),
  rooftopLiveStronger: f("home", 51),

  // hubs/about/
  calmerMindWoman: f("about", 41),
  betterSleep: f("about", 46),
  rooftopMeditate: f("about", 47),

  // hubs/nutrition/
  nutritionKitchen: f("nutrition", 43),
  mealPrepKitchen: f("nutrition", 48),

  // hubs/weight-loss/
  runBetterYou: f("weight-loss", 44),

  // hubs/training/
  strengthHydrateSplit: f("training", 42),
  recoverFoamRoll: f("training", 45),

  // hubs/muscle-building/
  strengthTomorrow: f("muscle-building", 49),
  deadliftBrand: f("muscle-building", 50),
} as const;

/** Category cover fallbacks when an article has no featured image */
export const CATEGORY_COVERS: Record<string, string> = {
  "muscle-building": HUB.deadlift,
  "weight-loss": HUB.outdoorRun,
  nutrition: HUB.chickenBowl,
  training: HUB.barbellSquat,
  default: HUB.gymInterior,
};

/** Home / training scroll-morph cluster (20 thumbs) */
export const SCROLL_MORPH_IMAGES = [
  HUB.powerBowl,
  HUB.bicepCurl,
  HUB.gymInterior,
  HUB.dumbbellRow,
  HUB.indianThali,
  HUB.healthConsult,
  HUB.chickenBowl,
  HUB.deadlift,
  HUB.saladBowl,
  HUB.veggieBowl,
  HUB.outdoorRun,
  HUB.bicepFocus,
  HUB.bicepCurlWide,
  HUB.barbellSquat,
  HUB.meditation,
  HUB.mobilityStretch,
  HUB.healthyBreakfast,
  HUB.produceSpread,
  HUB.mealPrep,
  HUB.indianThaliWide,
];

/** Tools / foods auto-sliders — mix clean photos + branded posters */
export const TOOL_SLIDER_IMAGES = [
  HUB.healthConsult,
  HUB.chickenBowl,
  HUB_POSTER.nutritionKitchen,
  HUB.powerBowl,
  HUB_POSTER.deadliftBrand,
  HUB.veggieBowl,
  HUB_POSTER.runBetterYou,
  HUB.saladBowl,
];

export const FOODS_STRIP_IMAGES = [
  HUB.indianThali,
  HUB.indianThaliWide,
  HUB_POSTER.mealPrepKitchen,
  HUB.chickenBowl,
  HUB.mealPrep,
  HUB.veggieBowl,
  HUB_POSTER.nutritionKitchen,
  HUB.produceSpread,
];

/** Weight-loss split-axis strip */
export const WEIGHT_LOSS_IMAGES = [
  HUB.outdoorRun,
  HUB.powerBowl,
  HUB.deadlift,
  HUB.saladBowl,
  HUB.mobilityStretch,
  HUB.mealPrep,
  HUB.checkup,
  HUB.veggieBowl,
];
