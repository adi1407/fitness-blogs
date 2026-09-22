/** Shared educational calculator math — not clinical advice. */

export type Sex = "male" | "female";

export const ACTIVITY_LEVELS = [
  {
    id: "sedentary",
    label: "Sedentary",
    helper: "Desk work, little exercise",
    factor: 1.2,
  },
  {
    id: "light",
    label: "Lightly active",
    helper: "1–3 light sessions / week",
    factor: 1.375,
  },
  {
    id: "moderate",
    label: "Moderately active",
    helper: "3–5 training days / week",
    factor: 1.55,
  },
  {
    id: "very",
    label: "Very active",
    helper: "Hard training most days",
    factor: 1.725,
  },
] as const;

export type ActivityId = (typeof ACTIVITY_LEVELS)[number]["id"];

export const PROTEIN_GOALS = [
  { id: "general", label: "General health", factor: 1.2 },
  { id: "fat-loss", label: "Fat loss", factor: 1.8 },
  { id: "muscle", label: "Muscle building", factor: 2.0 },
] as const;

export type ProteinGoalId = (typeof PROTEIN_GOALS)[number]["id"];

/** Mifflin–St Jeor resting energy (kcal/day). */
export function mifflinBmr(
  sex: Sex,
  kg: number,
  cm: number,
  age: number,
): number {
  const base = 10 * kg + 6.25 * cm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function calcTdee(
  sex: Sex,
  kg: number,
  cm: number,
  age: number,
  activity: ActivityId,
) {
  const bmr = Math.round(mifflinBmr(sex, kg, cm, age));
  const factor =
    ACTIVITY_LEVELS.find((a) => a.id === activity)?.factor ?? 1.55;
  const tdee = Math.round(bmr * factor);
  return {
    bmr,
    tdee,
    cut: Math.round(tdee * 0.8),
    maintain: tdee,
    bulk: Math.round(tdee * 1.1),
  };
}

export function calcCalorieTarget(
  maintenance: number,
  goal: "loss" | "maintain" | "gain",
) {
  const mult = goal === "loss" ? 0.8 : goal === "gain" ? 1.1 : 1;
  const target = Math.round(maintenance * mult);
  return {
    target,
    weeklyDeficit:
      goal === "loss" ? Math.round((maintenance - target) * 7) : 0,
  };
}

export function calcMacros(
  calories: number,
  weightKg: number,
  proteinPerKg: number,
) {
  const protein = Math.round(weightKg * proteinPerKg);
  const proteinKcal = protein * 4;
  const fat = Math.round((calories * 0.25) / 9);
  const fatKcal = fat * 9;
  const carbs = Math.max(
    0,
    Math.round((calories - proteinKcal - fatKcal) / 4),
  );
  const totalKcal = protein * 4 + carbs * 4 + fat * 9;
  return {
    protein,
    carbs,
    fat,
    pct: {
      protein: totalKcal > 0 ? Math.round((protein * 4 * 100) / totalKcal) : 0,
      carbs: totalKcal > 0 ? Math.round((carbs * 4 * 100) / totalKcal) : 0,
      fat: totalKcal > 0 ? Math.round((fat * 9 * 100) / totalKcal) : 0,
    },
  };
}

export function calcProtein(
  weightKg: number,
  goal: ProteinGoalId,
) {
  const factor = PROTEIN_GOALS.find((g) => g.id === goal)?.factor ?? 1.6;
  const grams = Math.round(weightKg * factor);
  return {
    kg: weightKg,
    grams,
    low: Math.round(weightKg * (factor - 0.2)),
    high: Math.round(weightKg * (factor + 0.2)),
    factor,
  };
}

export type BmiCategoryId =
  | "underweight"
  | "normal"
  | "overweight"
  | "obesity";

export function calcBmi(weightKg: number, heightCm: number) {
  const m = heightCm / 100;
  const bmi = m > 0 ? weightKg / (m * m) : 0;
  const rounded = Math.round(bmi * 10) / 10;
  let categoryId: BmiCategoryId = "normal";
  let categoryLabel = "Normal weight (screening)";
  if (bmi < 18.5) {
    categoryId = "underweight";
    categoryLabel = "Underweight (screening)";
  } else if (bmi < 25) {
    categoryId = "normal";
    categoryLabel = "Normal weight (screening)";
  } else if (bmi < 30) {
    categoryId = "overweight";
    categoryLabel = "Overweight (screening)";
  } else {
    categoryId = "obesity";
    categoryLabel = "Obesity (screening)";
  }
  return { bmi: rounded, categoryId, categoryLabel };
}

export function lbToKg(lb: number) {
  return lb * 0.453592;
}

export function kgToLb(kg: number) {
  return kg / 0.453592;
}

export function cmToFtIn(cm: number) {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inches = Math.round(totalIn - ft * 12);
  return { ft, inches };
}

export function ftInToCm(ft: number, inches: number) {
  return Math.round((ft * 12 + inches) * 2.54);
}
