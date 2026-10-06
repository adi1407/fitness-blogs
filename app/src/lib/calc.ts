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

export function isActivityId(value: unknown): value is ActivityId {
  return ACTIVITY_LEVELS.some((a) => a.id === value);
}

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

/** Katch–McArdle resting energy from lean mass (kcal/day). */
export function katchMcArdleBmr(kg: number, bodyFatPct: number): number {
  const leanKg = kg * (1 - bodyFatPct / 100);
  return 370 + 21.6 * leanKg;
}

export type CalorieGoal = "loss" | "maintain" | "gain";
export type CaloriePace = "gentle" | "moderate";

/** Lowest daily intake this tool will suggest without professional support. */
export const CALORIE_FLOOR: Record<Sex, number> = { female: 1200, male: 1500 };

const KCAL_PER_KG_FAT = 7700;

const PACE_FACTOR: Record<CalorieGoal, Record<CaloriePace, number>> = {
  loss: { gentle: 0.9, moderate: 0.8 },
  maintain: { gentle: 1, moderate: 1 },
  gain: { gentle: 1.05, moderate: 1.1 },
};

const PLAN_PROTEIN_PER_KG: Record<CalorieGoal, number> = {
  loss: 1.8,
  maintain: 1.6,
  gain: 2.0,
};

export type CaloriePlanInput = {
  sex: Sex;
  age: number;
  kg: number;
  cm: number;
  activity: ActivityId;
  goal: CalorieGoal;
  pace: CaloriePace;
  bodyFatPct?: number | null;
};

/**
 * Full calorie picture from body stats: BMR → TDEE → goal target, with
 * alternative ranges, macros, and a safety floor that targets never go below.
 */
export function calcCaloriePlan(input: CaloriePlanInput) {
  const { sex, age, kg, cm, activity, goal, pace } = input;
  const bf =
    input.bodyFatPct != null && input.bodyFatPct >= 3 && input.bodyFatPct <= 60
      ? input.bodyFatPct
      : null;
  const bmr = Math.round(
    bf != null ? katchMcArdleBmr(kg, bf) : mifflinBmr(sex, kg, cm, age),
  );
  const factor =
    ACTIVITY_LEVELS.find((a) => a.id === activity)?.factor ?? 1.55;
  const tdee = Math.round(bmr * factor);
  const floor = CALORIE_FLOOR[sex];

  const atFloor = (kcal: number) => Math.max(floor, Math.round(kcal));
  const lossGentle = atFloor(tdee * PACE_FACTOR.loss.gentle);
  const lossModerate = atFloor(tdee * PACE_FACTOR.loss.moderate);
  const gainGentle = Math.round(tdee * PACE_FACTOR.gain.gentle);
  const gainModerate = Math.round(tdee * PACE_FACTOR.gain.moderate);

  const rawTarget = tdee * PACE_FACTOR[goal][pace];
  const target = goal === "loss" ? atFloor(rawTarget) : Math.round(rawTarget);
  const floorApplied = goal === "loss" && Math.round(rawTarget) < floor;
  /** Maintenance is already at/below the floor — no deficit is suggested. */
  const deficitNotAdvised = goal === "loss" && target >= tdee;

  const dailyDelta = target - tdee;
  const weeklyKg =
    Math.round(((dailyDelta * 7) / KCAL_PER_KG_FAT) * 100) / 100;

  const m = cm / 100;
  const bmi = m > 0 ? kg / (m * m) : 0;
  /** For BMI above 30, base protein on a reference weight (BMI 27) instead. */
  const proteinKg = bf == null && bmi > 30 ? 27 * m * m : kg;
  const macros = calcMacros(target, proteinKg, PLAN_PROTEIN_PER_KG[goal]);

  return {
    formula: bf != null ? ("katch-mcardle" as const) : ("mifflin" as const),
    bmr,
    tdee,
    target,
    goal,
    pace,
    floor,
    floorApplied,
    deficitNotAdvised,
    dailyDelta,
    weeklyKg,
    loss: { gentle: lossGentle, moderate: lossModerate },
    gain: { gentle: gainGentle, moderate: gainModerate },
    macros,
    proteinPerKg: PLAN_PROTEIN_PER_KG[goal],
    proteinAdjusted: proteinKg !== kg,
  };
}

export type CaloriePlan = ReturnType<typeof calcCaloriePlan>;

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
  return {
    bmi: rounded,
    categoryId,
    categoryLabel,
    asianCategoryId: asianBmiCategory(rounded),
  };
}

/**
 * Lower action points used for Asian Indians (Indian consensus guidelines;
 * WHO expert consultation for Asian populations): 23 overweight, 25 obesity.
 */
export function asianBmiCategory(bmi: number): BmiCategoryId {
  if (bmi < 18.5) return "underweight";
  if (bmi < 23) return "normal";
  if (bmi < 25) return "overweight";
  return "obesity";
}

export const BMI_CATEGORY_LABEL: Record<BmiCategoryId, string> = {
  underweight: "Underweight",
  normal: "Healthy range",
  overweight: "Overweight",
  obesity: "Obesity",
};

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
