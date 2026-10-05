"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  ResultChip,
  ResultHero,
} from "@/features/tools/components/CalcWorkspace";
import {
  ActivityField,
  BodyStatsFields,
} from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import {
  numField,
  parseNum,
  roundNumField,
  setNumField,
  type NumField,
} from "@/features/tools/lib/calcFields";
import { isActivityId, kgToLb, lbToKg, type ActivityId } from "@/features/tools/lib/calcMath";
import { calcDeficitPlan } from "@/features/tools/lib/calcMathMore";
import { takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";

const TOOL = "calorie-deficit-calculator" as const;

export function CalorieDeficitCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const [activity, setActivity] = useState<ActivityId>("light");
  const [target, setTarget] = useState<NumField>(numField(65));
  const [weeks, setWeeks] = useState<NumField>(numField(12));
  const stats = useBodyStats({
    profile: calc.profile,
    applyProfileExtras: (p) => {
      if (p.activity) setActivity(p.activity);
    },
  });

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    const h = takeHandoff(["sex", "age", "kg", "cm", "activity"] as const);
    stats.applyHandoff(h);
    if (isActivityId(h.activity)) setActivity(h.activity);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  const { ageN, kg, cm, sex, weightUnit } = stats;
  const [targetUnit, setTargetUnit] = useState(weightUnit);
  if (targetUnit !== weightUnit) {
    setTargetUnit(weightUnit);
    const t = parseNum(target);
    if (t != null) {
      setTarget(roundNumField(weightUnit === "lb" ? kgToLb(t) : lbToKg(t)));
    }
  }
  const targetRaw = parseNum(target);
  const targetKg =
    targetRaw == null || targetRaw <= 0 ? null : weightUnit === "kg" ? targetRaw : lbToKg(targetRaw);
  const weeksN = parseNum(weeks);
  const validWeeks = weeksN != null && weeksN >= 1 && weeksN <= 104 ? weeksN : null;
  const targetError =
    targetKg != null && kg != null && targetKg >= kg
      ? "Your goal weight should be below your current weight."
      : null;

  const computed = useMemo(() => {
    if (ageN == null || kg == null || cm == null || targetKg == null || validWeeks == null) return null;
    if (targetKg >= kg) return null;
    return calcDeficitPlan({ sex, age: ageN, kg, cm, activity, targetKg, weeks: validWeeks });
  }, [sex, ageN, kg, cm, activity, targetKg, validWeeks]);

  const { shown: result, runId, runCalculate } = useCalcResult<NonNullable<typeof computed>>(
    TOOL,
    `${stats.key}|${activity}|${target}|${weeks}`,
  );

  const unit = weightUnit;
  const show = (k: number) => (unit === "kg" ? `${k} kg` : `${Math.round(kgToLb(k) * 10) / 10} lb`);

  const payload: CalcSavePayload | null =
    result && kg != null && targetKg != null && validWeeks != null
      ? {
          tool: TOOL,
          inputs: {
            sex,
            age: ageN ?? 0,
            kg: Math.round(kg * 10) / 10,
            cm: Math.round(cm ?? 0),
            activity,
            targetKg: Math.round(targetKg * 10) / 10,
            weeks: validWeeks,
          },
          result: {
            label: "Daily calorie target",
            value: result.target,
            unit: "kcal/day",
            deficit: result.dailyDeficit,
            tdee: result.tdee,
            safeWeeks: result.safeWeeks ?? 0,
          },
          profile: { ...stats.toProfile(), activity },
        }
      : null;

  return (
    <CalcWorkspace
      title="Deficit planner"
      purpose="Turn a goal weight and timeline into a daily calorie target — and check it's realistic."
      signedInAs={calc.memberName}
      inputs={
        <>
          <BodyStatsFields stats={stats} weightLabel="Current weight" />
          <ActivityField value={activity} onChange={setActivity} />
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldLabel label={`Goal weight (${unit})`}>
              <CalcInput
                type="number"
                min={1}
                value={target}
                onChange={(e) => setNumField(e.target.value, setTarget)}
                aria-label={`Goal weight in ${unit}`}
              />
            </FieldLabel>
            <FieldLabel label="Timeline (weeks)">
              <CalcInput
                type="number"
                inputMode="numeric"
                min={1}
                max={104}
                value={weeks}
                onChange={(e) => setNumField(e.target.value, setWeeks)}
                aria-label="Timeline in weeks"
              />
            </FieldLabel>
          </div>
          {targetError ? <p className="text-xs text-red-700">{targetError}</p> : null}
          {weeks !== "" && validWeeks == null ? (
            <p className="text-xs text-red-700">Enter a timeline between 1 and 104 weeks.</p>
          ) : null}
        </>
      }
      calculateSlot={
        <Button
          type="button"
          disabled={!computed}
          onClick={() => {
            if (computed) runCalculate(computed);
          }}
        >
          Plan my deficit
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Eat about"
            value={result?.target.toLocaleString("en-IN") ?? ""}
            unit="kcal/day"
          />
          {result ? (
            <div className="mt-4 space-y-3">
              <div className="grid gap-2 sm:grid-cols-3">
                <ResultChip label="Maintenance (TDEE)" value={`${result.tdee.toLocaleString("en-IN")} kcal`} />
                <ResultChip label="Daily deficit" value={`${result.dailyDeficit.toLocaleString("en-IN")} kcal`} />
                <ResultChip label="Weekly loss" value={`${show(result.weeklyKg)} (${result.weeklyPct}%)`} />
              </div>
              {result.noRoom ? (
                <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
                  Your estimated maintenance is already close to the minimum
                  intake we&apos;d suggest without supervision. Focus on more
                  daily movement and strength training, and talk to a
                  dietitian before cutting calories further.
                </p>
              ) : result.tooFast || result.belowFloor ? (
                <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
                  <strong>This timeline is aggressive.</strong>{" "}
                  {result.belowFloor
                    ? `It would need you to eat below ${result.floor.toLocaleString("en-IN")} kcal a day, so we've capped the target there. `
                    : "It's faster than about 1% of your body weight a week. "}
                  {result.safeWeeks
                    ? `A more sustainable plan: about ${result.safeWeeks} weeks at roughly ${result.safeTarget.toLocaleString("en-IN")} kcal a day.`
                    : null}
                </p>
              ) : (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Losing {show(result.kgToLose)} over {validWeeks} weeks is a
                  realistic pace. Keep protein high and lift weights so most of
                  the loss comes from fat, not muscle.
                </p>
              )}
              <p className="text-xs leading-relaxed text-muted-foreground">
                Expect the scale to bounce around with water and food in your
                gut. Judge progress on 2–3 week averages, and re-run this as
                your weight drops — maintenance falls with it.
              </p>
            </div>
          ) : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/protein-calculator" className="fk-link font-semibold">
            Protein calculator
          </Link>
          <Link href="/steps-to-calories-calculator" className="fk-link font-semibold">
            Steps to calories
          </Link>
          <Link href="/weight-loss" className="fk-link font-semibold">
            Weight loss guide
          </Link>
        </div>
      }
    />
  );
}
