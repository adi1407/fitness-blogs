import type { Href } from "expo-router";

import { GUIDES, type GuideLink } from "./guideLinks";
import type { ToolId } from "./tools";

export type NextStep = {
  kind: "calculator" | "article" | "food";
  title: string;
  /** One line on why this is the logical next move. */
  why: string;
  /** Native route, or a fitlives.in URL opened through `openLink`. */
  href?: Href;
  url?: string;
};

export type JourneyResult = { value: number; goal?: "loss" | "maintain" | "gain" };

function calc(id: ToolId, title: string, why: string): NextStep {
  return { kind: "calculator", title, why, href: `/calculator/${id}` };
}

function read(g: GuideLink, why: string): NextStep {
  return { kind: "article", title: g.title, why, url: g.url };
}

const FOODS: NextStep = {
  kind: "food",
  title: "Indian food calories & protein chart",
  why: "Calories, protein, carbs and fat for Indian foods.",
  href: "/foods",
};

/** A ready-made meal plan close to the user's fat-loss target. */
function dietPlanStep(r: JourneyResult): NextStep {
  return r.value >= 1000 && r.value <= 1700
    ? read(GUIDES.plan1500, "A full day of Indian meals near your target, with gram weights.")
    : read(GUIDES.indianDietPlan, "A week of Indian meals you can scale to your target.");
}

/**
 * Same guided paths as the website (frontend/src/features/tools/content/journeys.ts).
 * The body profile is shared by every calculator, so the next one opens pre-filled.
 */
const JOURNEYS: Record<ToolId, (r: JourneyResult) => NextStep[]> = {
  tdee: () => [
    calc("deficit", "Set a fat-loss target", "Turn maintenance into a daily target and a safe timeline."),
    calc("protein", "Find your daily protein", "Protein keeps muscle while you eat less."),
    read(GUIDES.maintenanceCalories, "What your TDEE number means and how to check it on the scale."),
  ],
  bmr: () => [
    calc("tdee", "Add your activity (TDEE)", "BMR is calories at rest — TDEE adds your day."),
    read(GUIDES.bmrVsTdee, "Which of the two numbers to eat by, and why."),
  ],
  calorie: (r) => [
    calc("macro", "Split it into macros", "Turn your calorie target into protein, carbs and fat."),
    calc("protein", "Check your protein", "Set protein first; fill the rest with carbs and fats."),
    r.goal === "gain"
      ? read(GUIDES.proteinMuscle, "How much protein a lean gain actually needs.")
      : r.goal === "maintain"
        ? read(GUIDES.maintenanceCalories, "How to confirm maintenance with two weeks of weigh-ins.")
        : dietPlanStep(r),
  ],
  deficit: (r) => [
    calc("macro", "Split your target into macros", "Hit the deficit without losing muscle."),
    calc("protein", "Set protein for fat loss", "Higher protein keeps you full and protects muscle."),
    dietPlanStep(r),
  ],
  protein: () => [
    calc("macro", "Build full macros", "Fit your protein into a daily calorie budget."),
    read(GUIDES.indianProteinFoods, "Hit your number with dal, paneer, eggs and more."),
    read(GUIDES.vegProtein, "Vegetarian? Sources ranked by protein per calorie."),
  ],
  macro: () => [
    read(GUIDES.indianProteinFoods, "Indian foods ranked by protein to fill your macros."),
    FOODS,
    calc("water", "Check your water", "Hydration for your weight and training."),
  ],
  bmi: () => [
    calc("body-fat", "Estimate body fat", "BMI can't tell muscle from fat; a tape measure can."),
    calc("tdee", "Find your daily calories", "Know your maintenance before changing your weight."),
    read(GUIDES.caloriesToLoseWeight, "Calories to eat if you want to lose weight."),
  ],
  "body-fat": () => [
    calc("tdee", "Find your daily calories", "Set calories around your body-fat goal."),
    calc("protein", "Set your protein", "Protein drives the recomposition you're after."),
    read(GUIDES.bellyFat, "What actually reduces belly fat (and what doesn't)."),
  ],
  "one-rep-max": () => [
    read(GUIDES.progressiveOverload, "Use your 1RM to add weight week after week."),
    calc("protein", "Fuel your training", "Daily protein for muscle gain."),
    read(GUIDES.buildMuscleTime, "Realistic muscle-gain timelines."),
  ],
  water: () => [
    read(GUIDES.waterPerDay, "How much water you need, explained."),
    calc("protein", "Find your daily protein", "The next number most people need."),
  ],
  steps: () => [
    calc("tdee", "See your full daily burn", "Steps are one part of your TDEE."),
    calc("deficit", "Plan a deficit", "Combine walking with a sensible calorie target."),
    read(GUIDES.walking, "How much walking helps weight loss."),
  ],
};

export function nextStepsFor(tool: ToolId, result: JourneyResult): NextStep[] {
  return JOURNEYS[tool](result);
}
