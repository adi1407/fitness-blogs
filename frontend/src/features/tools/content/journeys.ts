import { handoffHref } from "@/features/tools/lib/calcHandoff";
import { ARTICLES, FOODS } from "@/features/tools/content/links";
import type { CalcSavePayload, CalcTool } from "@/features/tools/types";

export type NextStep = {
  kind: "calculator" | "article" | "food";
  title: string;
  /** One line on why this is the logical next move. */
  why: string;
  href: string;
};

type Values = CalcSavePayload["inputs"] & CalcSavePayload["result"];
type Param = string | number | null | undefined;

/** Picks handoff keys that exist on the saved inputs/result, skipping zero placeholders. */
function pick(v: Values, keys: readonly string[]): Record<string, Param> {
  const out: Record<string, Param> = {};
  for (const k of keys) {
    const value = v[k];
    if ((typeof value === "number" && value > 0) || (typeof value === "string" && value)) {
      out[k] = value;
    }
  }
  return out;
}

const STATS = ["sex", "age", "kg", "cm"] as const;
const STATS_ACTIVITY = [...STATS, "activity"] as const;

function calc(path: string, title: string, why: string, params: Record<string, Param> = {}): NextStep {
  return { kind: "calculator", title, why, href: handoffHref(path, params) };
}

function read(a: { title: string; href: string }, why: string): NextStep {
  return { kind: "article", title: a.title, why, href: a.href };
}

function food(f: { title: string; href: string }, why: string): NextStep {
  return { kind: "food", title: f.title, why, href: f.href };
}

/** Daily calorie target as a number, from whichever field the tool stores it in. */
function targetCalories(v: Values): number | null {
  return typeof v.value === "number" && v.value >= 1000 ? Math.round(v.value) : null;
}

/** A ready-made meal plan close to the user's fat-loss target. */
function dietPlanStep(v: Values): NextStep {
  const target = targetCalories(v);
  return target !== null && target <= 1700
    ? read(ARTICLES.plan1500, "A full day of Indian meals near your target, with gram weights.")
    : read(ARTICLES.indianDietPlan, "A week of Indian meals you can scale to your target.");
}

/**
 * The guided path after each calculator: the first step is the next calculator
 * (pre-filled from this result), then a guide or food page that explains it.
 */
const JOURNEYS: Record<CalcTool, (v: Values) => NextStep[]> = {
  "tdee-calculator": (v) => [
    calc("/calorie-deficit-calculator", "Set a fat-loss target", "Turn maintenance into a daily target and a safe timeline.", pick(v, STATS_ACTIVITY)),
    calc("/protein-calculator", "Find your daily protein", "Protein keeps muscle while you eat less.", pick(v, ["kg"])),
    read(ARTICLES.maintenanceCalories, "What your TDEE number means and how to check it on the scale."),
  ],
  "bmr-calculator": (v) => [
    calc("/tdee-calculator", "Add your activity (TDEE)", "BMR is calories at rest — TDEE adds your day.", pick(v, STATS)),
    read(ARTICLES.bmrVsTdee, "Which of the two numbers to eat by, and why."),
  ],
  "calorie-calculator": (v) => [
    calc("/macro-calculator", "Split it into macros", "Turn your calorie target into protein, carbs and fat.", {
      calories: targetCalories(v),
      kg: pick(v, ["kg"]).kg,
    }),
    calc("/protein-calculator", "Check your protein", "Set protein first; fill the rest with carbs and fats.", pick(v, ["kg"])),
    v.goal === "gain"
      ? read(ARTICLES.proteinMuscle, "How much protein a lean gain actually needs.")
      : v.goal === "maintain"
        ? read(ARTICLES.maintenanceCalories, "How to confirm maintenance with two weeks of weigh-ins.")
        : dietPlanStep(v),
  ],
  "calorie-deficit-calculator": (v) => [
    calc("/macro-calculator", "Split your target into macros", "Hit the deficit without losing muscle.", {
      calories: targetCalories(v),
      kg: pick(v, ["kg"]).kg,
    }),
    calc("/protein-calculator", "Set protein for fat loss", "Higher protein keeps you full and protects muscle.", pick(v, ["kg"])),
    dietPlanStep(v),
  ],
  "protein-calculator": (v) => [
    calc("/macro-calculator", "Build full macros", "Fit your protein into a daily calorie budget.", pick(v, ["kg"])),
    read(ARTICLES.indianProteinFoods, "Hit your number with dal, paneer, eggs and more."),
    read(ARTICLES.vegProtein, "Vegetarian? Sources ranked by protein per calorie."),
  ],
  "macro-calculator": (v) => [
    read(ARTICLES.indianProteinFoods, "Indian foods ranked by protein to fill your macros."),
    food(FOODS.index, "Calories, protein, carbs and fat for Indian foods."),
    calc("/water-intake-calculator", "Check your water", "Hydration for your weight and training.", pick(v, ["kg"])),
  ],
  "bmi-calculator": (v) => [
    calc("/body-fat-calculator", "Estimate body fat", "BMI can't tell muscle from fat; a tape measure can.", pick(v, ["kg", "cm"])),
    calc("/tdee-calculator", "Find your daily calories", "Know your maintenance before changing your weight.", pick(v, ["kg", "cm"])),
    read(ARTICLES.caloriesToLoseWeight, "Calories to eat if you want to lose weight."),
  ],
  "body-fat-calculator": (v) => [
    calc("/tdee-calculator", "Find your daily calories", "Set calories around your body-fat goal.", pick(v, ["sex", "kg", "cm"])),
    calc("/protein-calculator", "Set your protein", "Protein drives the recomposition you're after.", pick(v, ["kg"])),
    read(ARTICLES.bellyFat, "What actually reduces belly fat (and what doesn't)."),
  ],
  "one-rep-max-calculator": () => [
    read(ARTICLES.progressiveOverload, "Use your 1RM to add weight week after week."),
    calc("/protein-calculator", "Fuel your training", "Daily protein for muscle gain."),
    read(ARTICLES.buildMuscleTime, "Realistic muscle-gain timelines."),
  ],
  "water-intake-calculator": (v) => [
    read(ARTICLES.waterPerDay, "How much water you need, explained."),
    calc("/protein-calculator", "Find your daily protein", "The next number most people need.", pick(v, ["kg"])),
  ],
  "steps-to-calories-calculator": (v) => [
    calc("/tdee-calculator", "See your full daily burn", "Steps are one part of your TDEE.", pick(v, ["sex", "kg", "cm"])),
    calc("/calorie-deficit-calculator", "Plan a deficit", "Combine walking with a sensible calorie target.", pick(v, ["sex", "kg", "cm"])),
    read(ARTICLES.walking, "How much walking helps weight loss."),
  ],
};

export function nextStepsFor(payload: CalcSavePayload): NextStep[] {
  return JOURNEYS[payload.tool]({ ...payload.inputs, ...payload.result });
}
