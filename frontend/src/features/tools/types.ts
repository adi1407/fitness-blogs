import type { ActivityId, Sex } from "@/features/tools/lib/calcMath";

export const CALC_TOOLS = {
  "calorie-calculator": "Calorie calculator",
  "tdee-calculator": "TDEE calculator",
  "bmr-calculator": "BMR calculator",
  "macro-calculator": "Macro calculator",
  "protein-calculator": "Protein calculator",
  "bmi-calculator": "BMI calculator",
} as const;

export type CalcTool = keyof typeof CALC_TOOLS;

export type CalorieGoal = "loss" | "maintain" | "gain";

/** Body details a member can save once and reuse across calculators. */
export type CalcProfile = {
  sex?: Sex;
  age?: number;
  kg?: number;
  cm?: number;
  weightUnit?: "kg" | "lb";
  heightUnit?: "cm" | "ft";
  activity?: ActivityId;
  goal?: CalorieGoal;
  bodyFatPct?: number;
};

type Flat = Record<string, string | number | boolean>;

/** `result.label` + `result.value` (+ optional `unit`) drive the account list. */
export type CalcSavePayload = {
  tool: CalcTool;
  inputs: Flat;
  result: Flat & { label: string; value: string | number; unit?: string };
  profile?: CalcProfile;
};

export type SavedCalcResult = {
  id: string;
  tool: CalcTool;
  inputs: Flat;
  result: CalcSavePayload["result"];
  createdAt: string;
};
