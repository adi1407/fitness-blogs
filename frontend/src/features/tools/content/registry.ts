import type { CalculatorContent } from "@/features/tools/components/CalculatorPageShell";
import { bmiContent } from "./bmi";
import { bmrContent } from "./bmr";
import { bodyFatContent } from "./body-fat";
import { calorieContent } from "./calorie";
import { calorieDeficitContent } from "./calorie-deficit";
import { macroContent } from "./macro";
import { oneRepMaxContent } from "./one-rep-max";
import { proteinContent } from "./protein";
import { stepsToCaloriesContent } from "./steps-to-calories";
import { tdeeContent } from "./tdee";
import { waterIntakeContent } from "./water-intake";

/** Root-level calculator path → page content (used by the sitemap for real lastModified dates). */
export const CALCULATOR_CONTENT: Record<string, CalculatorContent> = {
  "/calorie-calculator": calorieContent,
  "/calorie-deficit-calculator": calorieDeficitContent,
  "/tdee-calculator": tdeeContent,
  "/bmr-calculator": bmrContent,
  "/macro-calculator": macroContent,
  "/protein-calculator": proteinContent,
  "/bmi-calculator": bmiContent,
  "/body-fat-calculator": bodyFatContent,
  "/one-rep-max-calculator": oneRepMaxContent,
  "/water-intake-calculator": waterIntakeContent,
  "/steps-to-calories-calculator": stepsToCaloriesContent,
};
