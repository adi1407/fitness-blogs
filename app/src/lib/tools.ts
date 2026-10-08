import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

export type ToolId =
  | "calorie"
  | "deficit"
  | "tdee"
  | "bmr"
  | "macro"
  | "protein"
  | "bmi"
  | "body-fat"
  | "water"
  | "one-rep-max"
  | "steps";

export type ToolGroup = "Energy" | "Nutrition" | "Body" | "Training";

export type ToolMeta = {
  id: ToolId;
  title: string;
  blurb: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  group: ToolGroup;
  webPath: string;
};

/** Mirrors the calculators on fitlives.in/tools. */
export const TOOLS: ToolMeta[] = [
  {
    id: "calorie",
    title: "Calorie calculator",
    blurb: "Maintenance calories, goal target and macros.",
    icon: "flame-outline",
    group: "Energy",
    webPath: "/calorie-calculator",
  },
  {
    id: "deficit",
    title: "Calorie deficit calculator",
    blurb: "A safe daily target and timeline for your goal weight.",
    icon: "trending-down-outline",
    group: "Energy",
    webPath: "/calorie-deficit-calculator",
  },
  {
    id: "tdee",
    title: "TDEE calculator",
    blurb: "Total daily energy expenditure with cut and bulk targets.",
    icon: "speedometer-outline",
    group: "Energy",
    webPath: "/tdee-calculator",
  },
  {
    id: "bmr",
    title: "BMR calculator",
    blurb: "Calories your body burns at rest.",
    icon: "bed-outline",
    group: "Energy",
    webPath: "/bmr-calculator",
  },
  {
    id: "steps",
    title: "Steps to calories",
    blurb: "Distance, time and calories from your step count.",
    icon: "walk-outline",
    group: "Energy",
    webPath: "/steps-to-calories-calculator",
  },
  {
    id: "protein",
    title: "Protein calculator",
    blurb: "Daily protein target for your weight and goal.",
    icon: "barbell-outline",
    group: "Nutrition",
    webPath: "/protein-calculator",
  },
  {
    id: "macro",
    title: "Macro calculator",
    blurb: "Protein, carbs and fat split for your goal.",
    icon: "pie-chart-outline",
    group: "Nutrition",
    webPath: "/macro-calculator",
  },
  {
    id: "water",
    title: "Water intake calculator",
    blurb: "How much to drink for your weight, training and climate.",
    icon: "water-outline",
    group: "Nutrition",
    webPath: "/water-intake-calculator",
  },
  {
    id: "bmi",
    title: "BMI calculator",
    blurb: "BMI with WHO and Asian-Indian cut-offs.",
    icon: "body-outline",
    group: "Body",
    webPath: "/bmi-calculator",
  },
  {
    id: "body-fat",
    title: "Body fat calculator",
    blurb: "US Navy tape-measure estimate with fat and lean mass.",
    icon: "analytics-outline",
    group: "Body",
    webPath: "/body-fat-calculator",
  },
  {
    id: "one-rep-max",
    title: "One-rep max calculator",
    blurb: "Estimate your 1RM and training loads by reps.",
    icon: "trophy-outline",
    group: "Training",
    webPath: "/one-rep-max-calculator",
  },
];

export type ToolSection = { id: string; heading: string; blurb: string; tools: ToolId[] };

/** Same grouping as fitlives.in/tools. */
export const TOOL_SECTIONS: ToolSection[] = [
  {
    id: "nutrition",
    heading: "Calories & nutrition",
    blurb: "Work out how much to eat — and what to eat it as.",
    tools: ["calorie", "deficit", "tdee", "bmr", "macro", "protein", "water"],
  },
  {
    id: "body",
    heading: "Body composition",
    blurb: "Screening numbers to track alongside the mirror and the tape.",
    tools: ["bmi", "body-fat"],
  },
  {
    id: "training",
    heading: "Training & activity",
    blurb: "Plan your lifting loads and see what your daily steps are worth.",
    tools: ["one-rep-max", "steps"],
  },
];

/** "Which calculator do I need?" — start from the question. */
export const TOOL_GUIDE: { goal: string; tool: ToolId }[] = [
  { goal: "I want to lose weight by a certain date", tool: "deficit" },
  { goal: "How many calories should I eat?", tool: "calorie" },
  { goal: "How many calories do I burn in a day?", tool: "tdee" },
  { goal: "How much protein do I need?", tool: "protein" },
  { goal: "I want grams of protein, carbs and fat", tool: "macro" },
  { goal: "Am I a healthy weight for my height?", tool: "bmi" },
  { goal: "How much of my weight is fat?", tool: "body-fat" },
  { goal: "What weight should I lift for 8 reps?", tool: "one-rep-max" },
  { goal: "How many calories did my walk burn?", tool: "steps" },
  { goal: "How much water should I drink?", tool: "water" },
];

/** Same mapping as `calculatorCtaFor` on the website (frontend/src/lib/api/blog.ts). */
const TOOL_BY_SUBCATEGORY: Record<string, ToolId> = {
  "muscle-growth-hypertrophy": "protein",
  bulking: "calorie",
  "muscle-building-nutrition": "protein",
  "strength-performance": "one-rep-max",
  "training-programs": "one-rep-max",
  "beginner-muscle-building": "macro",
  "advanced-muscle-building": "one-rep-max",
  "recovery-muscle-growth": "protein",
  "muscle-building-mistakes": "protein",
  "muscle-building-science": "protein",
  "fat-loss-basics": "tdee",
  "calorie-deficit": "deficit",
  "weight-loss-nutrition": "calorie",
  "diet-meal-planning": "macro",
  "cardio-weight-loss": "steps",
  "strength-training-weight-loss": "body-fat",
  "walking-daily-activity": "steps",
  "intermittent-fasting": "calorie",
  "beginner-weight-loss": "deficit",
  "weight-loss-plateaus": "tdee",
  "sustainable-weight-loss": "deficit",
  "weight-loss-mistakes": "tdee",
  "weight-loss-myths": "calorie",
  "weight-maintenance": "tdee",
  "nutrition-basics": "macro",
  "calories-energy": "bmr",
  protein: "protein",
  carbohydrates: "macro",
  "dietary-fats": "macro",
  "meal-planning": "macro",
  hydration: "water",
  "sports-nutrition": "protein",
  "pre-workout-nutrition": "protein",
  "post-workout-nutrition": "protein",
  "food-labels-portions": "calorie",
};

const TOOL_BY_CATEGORY: Record<string, ToolId> = {
  "weight-loss": "calorie",
  "muscle-building": "protein",
  nutrition: "macro",
};

/** Most relevant calculator for an article: subcategory first, then category. */
export function toolForArticle(category: string | null, subcategory: string | null): ToolMeta | null {
  const id = (subcategory && TOOL_BY_SUBCATEGORY[subcategory]) || (category && TOOL_BY_CATEGORY[category]);
  return id ? toolById(id) : null;
}

/** Calculator for a website path such as `/tdee-calculator` (or the old `/tools/tdee-calculator`). */
export function toolByWebPath(pathname: string): ToolMeta | null {
  const path = pathname.replace(/^\/tools(?=\/[a-z-]+-calculator)/, "").replace(/\/+$/, "");
  return TOOLS.find((t) => t.webPath === path) ?? null;
}

export function toolById(id: ToolId): ToolMeta {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) throw new Error(`Unknown tool: ${id}`);
  return tool;
}

export function isToolId(v: unknown): v is ToolId {
  return TOOLS.some((t) => t.id === v);
}
