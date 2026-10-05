/** Math for the deficit, body-fat, 1RM, water and steps calculators — educational estimates only. */
import { ACTIVITY_LEVELS, CALORIE_FLOOR, mifflinBmr, type ActivityId, type Sex } from "./calcMath";

const KCAL_PER_KG_FAT = 7700;
/** Upper end of commonly advised loss rate: ~1% of body weight per week. */
const MAX_WEEKLY_LOSS_FRACTION = 0.01;

/* ---------------------------------------------------------------- deficit */

export type DeficitInput = {
  sex: Sex;
  age: number;
  kg: number;
  cm: number;
  activity: ActivityId;
  targetKg: number;
  weeks: number;
};

export function calcDeficitPlan(input: DeficitInput) {
  const { sex, age, kg, cm, activity, targetKg, weeks } = input;
  const factor = ACTIVITY_LEVELS.find((a) => a.id === activity)?.factor ?? 1.55;
  const bmr = Math.round(mifflinBmr(sex, kg, cm, age));
  const tdee = Math.round(bmr * factor);
  const floor = CALORIE_FLOOR[sex];
  const kgToLose = Math.max(0, Math.round((kg - targetKg) * 10) / 10);

  const days = Math.max(1, Math.round(weeks * 7));
  const dailyDeficit = Math.round((kgToLose * KCAL_PER_KG_FAT) / days);
  const rawTarget = tdee - dailyDeficit;
  const weeklyKg = Math.round((kgToLose / Math.max(weeks, 0.1)) * 100) / 100;
  const weeklyPct = Math.round((weeklyKg / kg) * 1000) / 10;

  const tooFast = weeklyKg > kg * MAX_WEEKLY_LOSS_FRACTION;
  const belowFloor = rawTarget < floor;

  // Safe timeline: the slower of the ~1%/week limit and the calorie floor.
  const maxDailyDeficit = Math.max(0, tdee - floor);
  const weeksByRate = kgToLose / (kg * MAX_WEEKLY_LOSS_FRACTION);
  const weeksByFloor =
    maxDailyDeficit > 0 ? (kgToLose * KCAL_PER_KG_FAT) / (maxDailyDeficit * 7) : Infinity;
  const safeWeeks = Math.ceil(Math.max(weeksByRate, weeksByFloor));
  const safeTarget =
    Number.isFinite(safeWeeks) && safeWeeks > 0
      ? Math.max(floor, Math.round(tdee - (kgToLose * KCAL_PER_KG_FAT) / (safeWeeks * 7)))
      : tdee;

  return {
    bmr,
    tdee,
    floor,
    kgToLose,
    dailyDeficit,
    target: Math.max(floor, Math.round(rawTarget)),
    weeklyKg,
    weeklyPct,
    tooFast,
    belowFloor,
    /** Maintenance is at/below the floor: no deficit can be suggested safely. */
    noRoom: maxDailyDeficit === 0,
    safeWeeks: Number.isFinite(safeWeeks) ? safeWeeks : null,
    safeTarget,
  };
}

/* --------------------------------------------------------------- body fat */

export type BodyFatInput = {
  sex: Sex;
  cm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
  kg?: number | null;
};

export type BodyFatBand = "essential" | "athletic" | "fitness" | "average" | "high";

/** American Council on Exercise reference bands (% body fat). */
const BF_BANDS: Record<Sex, { band: BodyFatBand; max: number }[]> = {
  male: [
    { band: "essential", max: 6 },
    { band: "athletic", max: 14 },
    { band: "fitness", max: 18 },
    { band: "average", max: 25 },
    { band: "high", max: Infinity },
  ],
  female: [
    { band: "essential", max: 14 },
    { band: "athletic", max: 21 },
    { band: "fitness", max: 25 },
    { band: "average", max: 32 },
    { band: "high", max: Infinity },
  ],
};

export const BODY_FAT_BAND_LABEL: Record<BodyFatBand, string> = {
  essential: "Essential fat",
  athletic: "Athletic",
  fitness: "Fitness",
  average: "Average",
  high: "Above average",
};

/** U.S. Navy circumference method (Hodgdon & Beckett), metric form. */
export function calcBodyFat(input: BodyFatInput) {
  const { sex, cm, neckCm, waistCm, hipCm, kg } = input;
  let pct: number | null = null;
  if (sex === "male") {
    const d = waistCm - neckCm;
    if (d > 0) pct = 495 / (1.0324 - 0.19077 * Math.log10(d) + 0.15456 * Math.log10(cm)) - 450;
  } else if (hipCm != null) {
    const d = waistCm + hipCm - neckCm;
    if (d > 0) pct = 495 / (1.29579 - 0.35004 * Math.log10(d) + 0.221 * Math.log10(cm)) - 450;
  }
  if (pct == null || !Number.isFinite(pct) || pct < 2 || pct > 70) return null;

  const rounded = Math.round(pct * 10) / 10;
  const band = BF_BANDS[sex].find((b) => rounded < b.max)?.band ?? "high";
  const fatKg = kg != null ? Math.round(kg * (rounded / 100) * 10) / 10 : null;
  const leanKg = kg != null && fatKg != null ? Math.round((kg - fatKg) * 10) / 10 : null;
  const waistToHeight = Math.round((waistCm / cm) * 100) / 100;
  return { pct: rounded, band, fatKg, leanKg, waistToHeight };
}

/* --------------------------------------------------------------------- 1RM */

export function calcOneRepMax(weight: number, reps: number) {
  if (weight <= 0 || reps < 1 || reps > 12) return null;
  if (reps === 1) {
    return { oneRm: round1(weight), epley: round1(weight), brzycki: round1(weight), table: repTable(weight) };
  }
  const epley = weight * (1 + reps / 30);
  const brzycki = (weight * 36) / (37 - reps);
  const oneRm = (epley + brzycki) / 2;
  return { oneRm: round1(oneRm), epley: round1(epley), brzycki: round1(brzycki), table: repTable(oneRm) };
}

/** Typical %1RM per rep count (NSCA-style reference table). */
const PCT_BY_REPS: [number, number][] = [
  [1, 100],
  [2, 95],
  [3, 93],
  [4, 90],
  [5, 87],
  [6, 85],
  [8, 80],
  [10, 75],
  [12, 70],
];

function repTable(oneRm: number) {
  return PCT_BY_REPS.map(([reps, pct]) => ({ reps, pct, load: roundToPlate(oneRm * (pct / 100)) }));
}

/** Nearest 2.5 (smallest common plate pair). */
function roundToPlate(n: number) {
  return Math.round(n / 2.5) * 2.5;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

/* ------------------------------------------------------------------- water */

export type WaterInput = {
  kg: number;
  exerciseMin: number;
  climate: "mild" | "hot";
  status?: "none" | "pregnant" | "breastfeeding";
};

/** Drinks (not total water): ~33 ml/kg baseline + exercise + heat + pregnancy/lactation (EFSA). */
export function calcWater({ kg, exerciseMin, climate, status = "none" }: WaterInput) {
  const base = kg * 33;
  const exercise = (Math.max(0, Math.min(exerciseMin, 300)) / 30) * 350;
  const heat = climate === "hot" ? 500 : 0;
  const extra = status === "pregnant" ? 300 : status === "breastfeeding" ? 700 : 0;
  const ml = Math.round((base + exercise + heat + extra) / 50) * 50;
  return {
    ml,
    litres: Math.round(ml / 100) / 10,
    glasses: Math.round(ml / 250),
    parts: {
      base: Math.round(base / 50) * 50,
      exercise: Math.round(exercise / 50) * 50,
      heat,
      extra,
    },
  };
}

/* ------------------------------------------------------------------- steps */

export const WALK_PACES = [
  { id: "slow", label: "Easy", helper: "~3.2 km/h, strolling", kmh: 3.2, met: 2.8 },
  { id: "moderate", label: "Moderate", helper: "~4.8 km/h, everyday pace", kmh: 4.8, met: 3.5 },
  { id: "brisk", label: "Brisk", helper: "~5.6 km/h, purposeful", kmh: 5.6, met: 4.3 },
] as const;

export type WalkPaceId = (typeof WALK_PACES)[number]["id"];

export type StepsInput = {
  steps: number;
  kg: number;
  cm: number;
  sex: Sex;
  pace: WalkPaceId;
};

/** Stride ≈ 41.5% (men) / 41.3% (women) of height; energy from Compendium METs. */
export function calcStepsCalories({ steps, kg, cm, sex, pace }: StepsInput) {
  const p = WALK_PACES.find((x) => x.id === pace) ?? WALK_PACES[1];
  const strideCm = cm * (sex === "male" ? 0.415 : 0.413);
  const km = (steps * strideCm) / 100_000;
  const hours = km / p.kmh;
  const gross = p.met * kg * hours;
  const net = (p.met - 1) * kg * hours;
  return {
    km: Math.round(km * 100) / 100,
    minutes: Math.round(hours * 60),
    strideCm: Math.round(strideCm),
    kcal: Math.round(gross),
    netKcal: Math.round(net),
    met: p.met,
  };
}
