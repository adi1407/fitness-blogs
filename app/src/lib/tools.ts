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

export const TOOL_GROUPS: ToolGroup[] = ["Energy", "Nutrition", "Body", "Training"];

export function isToolId(v: unknown): v is ToolId {
  return TOOLS.some((t) => t.id === v);
}
