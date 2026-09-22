/** Signed-in calculator prefs — localStorage keyed by member id. */

import type { ActivityId, ProteinGoalId, Sex } from "./calcMath";

export type CalcPrefs = {
  sex?: Sex;
  age?: number;
  weightKg?: number;
  heightCm?: number;
  activity?: ActivityId;
  /** Last estimated TDEE (kcal) for calorie/macro handoff */
  tdee?: number;
  /** Last goal calorie target */
  calorieTarget?: number;
  proteinGoal?: ProteinGoalId;
  proteinPerKg?: number;
  weightUnit?: "kg" | "lb";
  heightUnit?: "cm" | "ft";
};

function key(memberId: string) {
  return `fitlives-calc-prefs:${memberId}`;
}

export function loadCalcPrefs(memberId: string | undefined | null): CalcPrefs {
  if (!memberId || typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(key(memberId));
    if (!raw) return {};
    return JSON.parse(raw) as CalcPrefs;
  } catch {
    return {};
  }
}

export function saveCalcPrefs(
  memberId: string | undefined | null,
  patch: Partial<CalcPrefs>,
): void {
  if (!memberId || typeof window === "undefined") return;
  try {
    const next = { ...loadCalcPrefs(memberId), ...patch };
    localStorage.setItem(key(memberId), JSON.stringify(next));
  } catch {
    /* ignore */
  }
}
