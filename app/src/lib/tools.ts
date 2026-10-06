import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

export type ToolId = "protein" | "calorie" | "bmi";

export type ToolMeta = {
  id: ToolId;
  title: string;
  blurb: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  webPath: string;
};

export const TOOLS: ToolMeta[] = [
  {
    id: "protein",
    title: "Protein calculator",
    blurb: "Daily protein target for your weight and goal.",
    icon: "barbell-outline",
    webPath: "/protein-calculator",
  },
  {
    id: "calorie",
    title: "Calorie calculator",
    blurb: "Maintenance calories, goal target and macros.",
    icon: "flame-outline",
    webPath: "/calorie-calculator",
  },
  {
    id: "bmi",
    title: "BMI calculator",
    blurb: "BMI with WHO and Asian-Indian cut-offs.",
    icon: "body-outline",
    webPath: "/bmi-calculator",
  },
];

export function isToolId(v: unknown): v is ToolId {
  return TOOLS.some((t) => t.id === v);
}
