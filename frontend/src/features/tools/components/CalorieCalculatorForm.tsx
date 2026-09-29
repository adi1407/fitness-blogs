"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  MacroBar,
  ResultHero,
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import {
  ActivityField,
  BodyStatsFields,
} from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import {
  numField,
  parseNum,
  setNumField,
  type NumField,
} from "@/features/tools/lib/calcFields";
import {
  calcCaloriePlan,
  isActivityId,
  type ActivityId,
  type CaloriePace,
  type CaloriePlan,
} from "@/features/tools/lib/calcMath";
import {
  handoffHref,
  handoffNumber,
  takeHandoff,
} from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import { ARTICLES } from "@/features/tools/content/links";
import type { CalcSavePayload, CalorieGoal } from "@/features/tools/types";
import { cn } from "@/lib/utils";

const TOOL = "calorie-calculator" as const;

const fmt = (n: number) => n.toLocaleString("en-IN");

function isGoal(v: unknown): v is CalorieGoal {
  return v === "loss" || v === "maintain" || v === "gain";
}

function targetLabel(plan: CaloriePlan): string {
  if (plan.goal === "maintain") return "Daily calories to maintain";
  if (plan.goal === "loss") {
    return plan.pace === "gentle"
      ? "Daily calories for gentle fat loss"
      : "Daily calories for steady fat loss";
  }
  return plan.pace === "gentle"
    ? "Daily calories for lean muscle gain"
    : "Daily calories for muscle gain";
}

function weeklyText(kg: number): string {
  if (kg === 0) return "Weight should stay roughly stable.";
  const abs = Math.abs(kg).toFixed(2).replace(/0$/, "");
  return kg < 0
    ? `Expected change: about −${abs} kg a week at first.`
    : `Expected change: about +${abs} kg a week (much of it will not be fat if you train).`;
}

export function CalorieCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const [activity, setActivity] = useState<ActivityId>("light");
  const [goal, setGoal] = useState<CalorieGoal>("loss");
  const [pace, setPace] = useState<CaloriePace>("moderate");
  const [showBodyFat, setShowBodyFat] = useState(false);
  const [bodyFat, setBodyFat] = useState<NumField>("");
  const [legacyTdee, setLegacyTdee] = useState<number | null>(null);

  const stats = useBodyStats({
    profile: calc.profile,
    applyProfileExtras: (p) => {
      if (p.activity) setActivity(p.activity);
      if (p.goal) setGoal(p.goal);
      if (p.bodyFatPct != null) {
        setBodyFat(numField(p.bodyFatPct));
        setShowBodyFat(true);
      }
    },
  });

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    const h = takeHandoff([
      "sex",
      "age",
      "kg",
      "cm",
      "activity",
      "goal",
      "tdee",
    ] as const);
    const usedStats = stats.applyHandoff(h);
    if (isActivityId(h.activity)) setActivity(h.activity);
    if (isGoal(h.goal)) setGoal(h.goal);
    const t = handoffNumber(h.tdee, 1000, 6000);
    if (t != null && !usedStats) setLegacyTdee(Math.round(t));
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  const bodyFatN = parseNum(bodyFat);
  const bodyFatValid = bodyFatN != null && bodyFatN >= 3 && bodyFatN <= 60;
  const bodyFatError = showBodyFat && bodyFat !== "" && !bodyFatValid;

  const { ageN, kg, cm, sex } = stats;
  const computed = useMemo(() => {
    if (ageN == null || kg == null || cm == null || bodyFatError) return null;
    return calcCaloriePlan({
      sex,
      age: ageN,
      kg,
      cm,
      activity,
      goal,
      pace,
      bodyFatPct: showBodyFat && bodyFatValid ? bodyFatN : null,
    });
  }, [sex, ageN, kg, cm, activity, goal, pace, showBodyFat, bodyFatValid, bodyFatN, bodyFatError]);

  const { shown: plan, runId, runCalculate } = useCalcResult<CaloriePlan>(
    TOOL,
    [stats.key, activity, goal, pace, showBodyFat, bodyFat].join("|"),
  );

  const kgRounded = kg != null ? Math.round(kg) : null;

  const payload: CalcSavePayload | null =
    plan && kg != null && cm != null && ageN != null
      ? {
          tool: TOOL,
          inputs: {
            sex,
            age: ageN,
            kg: Math.round(kg * 10) / 10,
            cm: Math.round(cm),
            activity,
            goal,
            pace,
            ...(plan.formula === "katch-mcardle" && bodyFatN != null
              ? { bodyFatPct: bodyFatN }
              : {}),
          },
          result: {
            label: targetLabel(plan),
            value: plan.target,
            unit: "kcal/day",
            bmr: plan.bmr,
            tdee: plan.tdee,
            protein: plan.macros.protein,
            carbs: plan.macros.carbs,
            fat: plan.macros.fat,
          },
          profile: {
            ...stats.toProfile(),
            activity,
            goal,
            ...(plan.formula === "katch-mcardle" && bodyFatN != null
              ? { bodyFatPct: bodyFatN }
              : {}),
          },
        }
      : null;

  return (
    <CalcWorkspace
      title="Your daily calorie needs"
      purpose="Enter your details once — get BMR, maintenance, goal calories and macros together."
      signedInAs={calc.memberName}
      inputs={
        <>
          {legacyTdee != null ? (
            <p className="rounded-xl border border-border bg-brand-50 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              Your link carried a maintenance estimate of{" "}
              <strong className="text-foreground">{fmt(legacyTdee)} kcal</strong>.
              Enter your details below for a full plan based on your own
              numbers.
            </p>
          ) : null}
          <BodyStatsFields stats={stats} />
          <ActivityField value={activity} onChange={setActivity} />
          <FieldLabel label="Goal">
            <SegmentedControl
              value={goal}
              onChange={setGoal}
              options={[
                { id: "loss", label: "Lose fat" },
                { id: "maintain", label: "Maintain" },
                { id: "gain", label: "Build muscle" },
              ]}
            />
          </FieldLabel>
          {goal !== "maintain" ? (
            <FieldLabel label="Pace">
              <SegmentedControl
                value={pace}
                onChange={setPace}
                options={
                  goal === "loss"
                    ? [
                        { id: "gentle", label: "Gentle (−10%)" },
                        { id: "moderate", label: "Steady (−20%)" },
                      ]
                    : [
                        { id: "gentle", label: "Lean (+5%)" },
                        { id: "moderate", label: "Standard (+10%)" },
                      ]
                }
              />
            </FieldLabel>
          ) : null}
          <div>
            <button
              type="button"
              aria-expanded={showBodyFat}
              onClick={() => setShowBodyFat((v) => !v)}
              className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-[#FF9800]"
            >
              {showBodyFat ? "Hide body-fat %" : "Know your body-fat %? (optional)"}
            </button>
            {showBodyFat ? (
              <div className="mt-2">
                <CalcInput
                  type="number"
                  min={3}
                  max={60}
                  value={bodyFat}
                  placeholder="e.g. 25"
                  onChange={(e) => setNumField(e.target.value, setBodyFat)}
                  aria-label="Body fat percentage"
                />
                <p
                  className={cn(
                    "mt-1.5 text-xs",
                    bodyFatError ? "text-red-700" : "text-muted-foreground",
                  )}
                >
                  {bodyFatError
                    ? "Enter a body-fat % between 3 and 60, or leave it empty."
                    : "With body-fat %, BMR uses the Katch–McArdle formula (based on lean mass)."}
                </p>
              </div>
            ) : null}
          </div>
        </>
      }
      calculateSlot={
        <Button
          type="button"
          className="w-full sm:w-auto"
          disabled={!computed}
          onClick={() => {
            if (computed) runCalculate(computed);
          }}
        >
          Calculate calories
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={plan != null}
            label={plan ? targetLabel(plan) : ""}
            value={plan ? fmt(plan.target) : ""}
            unit="kcal/day"
          />
          {plan ? <PlanDetails plan={plan} kg={kgRounded} /> : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href={
              plan
                ? handoffHref("/tools/macro-calculator", {
                    calories: plan.target,
                    kg: kgRounded,
                  })
                : "/tools/macro-calculator"
            }
            className="fk-link font-semibold"
          >
            Adjust macros
          </Link>
          <Link
            href={
              plan
                ? handoffHref("/tools/protein-calculator", { kg: kgRounded })
                : "/tools/protein-calculator"
            }
            className="fk-link font-semibold"
          >
            Protein calculator
          </Link>
          <Link href={ARTICLES.calorieDeficit.href} className="fk-link font-semibold">
            How a calorie deficit works
          </Link>
        </div>
      }
    />
  );
}

function PlanDetails({ plan, kg }: { plan: CaloriePlan; kg: number | null }) {
  const rows: { label: string; kcal: number; active: boolean }[] = [
    {
      label: "Lose fat — gentle (−10%)",
      kcal: plan.loss.gentle,
      active: plan.goal === "loss" && plan.pace === "gentle",
    },
    {
      label: "Lose fat — steady (−20%)",
      kcal: plan.loss.moderate,
      active: plan.goal === "loss" && plan.pace === "moderate",
    },
    { label: "Maintain weight", kcal: plan.tdee, active: plan.goal === "maintain" },
    {
      label: "Build muscle — lean (+5%)",
      kcal: plan.gain.gentle,
      active: plan.goal === "gain" && plan.pace === "gentle",
    },
    {
      label: "Build muscle — standard (+10%)",
      kcal: plan.gain.moderate,
      active: plan.goal === "gain" && plan.pace === "moderate",
    },
  ];

  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm text-muted-foreground">{weeklyText(plan.weeklyKg)}</p>

      {plan.deficitNotAdvised ? (
        <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
          Your estimated maintenance is already close to{" "}
          {fmt(plan.floor)} kcal, the lowest intake we suggest without
          professional support. Rather than eating less, focus on more daily
          movement, strength training and protein — or speak to a registered
          dietitian.
        </p>
      ) : plan.floorApplied ? (
        <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
          A full deficit would take you below {fmt(plan.floor)} kcal, so your
          target is held at {fmt(plan.floor)} kcal. Going lower is best done
          with a doctor or dietitian.
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border bg-white px-4 py-3">
          <p className="text-xs text-muted-foreground">
            BMR ({plan.formula === "katch-mcardle" ? "Katch–McArdle" : "Mifflin–St Jeor"})
          </p>
          <p className="mt-1 text-lg font-semibold">{fmt(plan.bmr)} kcal</p>
        </div>
        <div className="rounded-xl border border-border bg-white px-4 py-3">
          <p className="text-xs text-muted-foreground">Maintenance (TDEE)</p>
          <p className="mt-1 text-lg font-semibold">{fmt(plan.tdee)} kcal</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          All options
        </p>
        <ul className="mt-2 divide-y divide-border overflow-hidden rounded-xl border border-border bg-white text-sm">
          {rows.map((r) => (
            <li
              key={r.label}
              className={cn(
                "flex items-center justify-between gap-3 px-4 py-2.5",
                r.active && "bg-brand-50 font-semibold",
              )}
            >
              <span>{r.label}</span>
              <span className="shrink-0 whitespace-nowrap tabular-nums">
                {fmt(r.kcal)} kcal
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Suggested macros at {fmt(plan.target)} kcal
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(
            [
              ["Protein", plan.macros.protein],
              ["Carbs", plan.macros.carbs],
              ["Fat", plan.macros.fat],
            ] as const
          ).map(([label, grams]) => (
            <div key={label} className="rounded-xl bg-brand-50 p-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-0.5 text-xl font-semibold">
                {grams}
                <span className="ml-1 text-xs font-medium text-muted-foreground">g</span>
              </p>
            </div>
          ))}
        </div>
        <MacroBar
          proteinPct={plan.macros.pct.protein}
          carbsPct={plan.macros.pct.carbs}
          fatPct={plan.macros.pct.fat}
        />
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Protein {plan.proteinPerKg} g per kg
          {plan.proteinAdjusted ? " of a reference weight (adjusted for higher body weight)" : kg ? ` of ${kg} kg` : ""}
          , fat about 25% of calories, carbs the rest.
        </p>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        These are estimates from the details you entered — real needs vary by
        a few hundred calories. Follow a target for 2–3 weeks, watch your
        weekly average weight, then adjust by 100–200 kcal.
      </p>
    </div>
  );
}
