import { SITE_URL } from "@/config";

/** Hub photography served by fitlives.in (`frontend/public/images/hubs`). */
const hub = (category: string, n: number, small = false) =>
  `${SITE_URL}/images/hubs/${category}/f${n}${small ? "-sm" : ""}.webp`;

export const IMG = {
  powerBowl: hub("nutrition", 1),
  indianThali: hub("nutrition", 5),
  mealPrep: hub("nutrition", 20),
  veggieBowl: hub("nutrition", 26),
  healthyBreakfast: hub("nutrition", 36),
  produceSpread: hub("nutrition", 35),
  deadlift: hub("muscle-building", 8),
  barbellSquat: hub("muscle-building", 33),
  bicepCurl: hub("muscle-building", 2),
  dumbbellRow: hub("muscle-building", 4),
  gymInterior: hub("training", 3),
  gymFloor: hub("training", 22),
  mobilityStretch: hub("training", 31),
  outdoorRun: hub("weight-loss", 30),
  healthConsult: hub("tools", 6),
  checkup: hub("tools", 25),
} as const;

/** ~480px variant for thumbnails. */
export function thumb(src: string) {
  return src.includes("/images/hubs/") ? src.replace(/\.webp$/, "-sm.webp") : src;
}

export const MUSCLE_GROUP_IMAGE: Record<string, string> = {
  chest: IMG.gymFloor,
  back: IMG.dumbbellRow,
  legs: IMG.barbellSquat,
  shoulders: IMG.gymInterior,
  arms: IMG.bicepCurl,
  core: IMG.mobilityStretch,
  cardio: IMG.outdoorRun,
};

const RECIPE_FALLBACKS = [IMG.powerBowl, IMG.veggieBowl, IMG.mealPrep, IMG.indianThali, IMG.healthyBreakfast];

export function recipeImage(slug: string) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return RECIPE_FALLBACKS[h % RECIPE_FALLBACKS.length];
}
