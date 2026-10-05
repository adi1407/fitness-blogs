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
import { BodyStatsFields } from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import { numField, parseNum, setNumField, type NumField } from "@/features/tools/lib/calcFields";
import { WALK_PACES, calcStepsCalories, type WalkPaceId } from "@/features/tools/lib/calcMathMore";
import { takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";
import { cn } from "@/lib/utils";

const TOOL = "steps-to-calories-calculator" as const;

export function StepsToCaloriesCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const stats = useBodyStats({ profile: calc.profile });
  const [steps, setSteps] = useState<NumField>(numField(10000));
  const [pace, setPace] = useState<WalkPaceId>("moderate");

  /* eslint-disable react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    stats.applyHandoff(takeHandoff(["sex", "kg", "cm"] as const));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const { kg, cm, sex } = stats;
  const stepsN = parseNum(steps);
  const validSteps = stepsN != null && stepsN >= 100 && stepsN <= 100_000 ? Math.round(stepsN) : null;

  const computed = useMemo(() => {
    if (kg == null || cm == null || validSteps == null) return null;
    return calcStepsCalories({ steps: validSteps, kg, cm, sex, pace });
  }, [kg, cm, sex, pace, validSteps]);

  const { shown: result, runId, runCalculate } = useCalcResult<NonNullable<typeof computed>>(
    TOOL,
    `${stats.key}|${steps}|${pace}`,
  );

  const payload: CalcSavePayload | null =
    result && kg != null && cm != null && validSteps != null
      ? {
          tool: TOOL,
          inputs: { steps: validSteps, pace, sex, kg: Math.round(kg * 10) / 10, cm: Math.round(cm) },
          result: { label: "Calories burned", value: result.kcal, unit: "kcal", km: result.km },
          profile: stats.toProfile(),
        }
      : null;

  return (
    <CalcWorkspace
      title="Walking energy"
      purpose="Convert a step count into distance and calories using your height, weight and pace."
      signedInAs={calc.memberName}
      inputs={
        <>
          <FieldLabel label="Steps">
            <CalcInput
              type="number"
              inputMode="numeric"
              min={100}
              max={100000}
              step={500}
              value={steps}
              onChange={(e) => setNumField(e.target.value, setSteps)}
              aria-label="Number of steps"
            />
            {steps !== "" && validSteps == null ? (
              <p className="mt-1.5 text-xs text-red-700">Enter between 100 and 100,000 steps.</p>
            ) : null}
          </FieldLabel>
          <FieldLabel label="Walking pace">
            <div className="grid gap-2 sm:grid-cols-3">
              {WALK_PACES.map((p) => {
                const active = pace === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPace(p.id)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none",
                      active ? "border-primary bg-[#0A0A0A] text-white" : "border-border bg-white hover:border-primary/40",
                    )}
                  >
                    <span className="block text-sm font-semibold">{p.label}</span>
                    <span className={cn("mt-0.5 block text-xs", active ? "text-white/70" : "text-muted-foreground")}>
                      {p.helper}
                    </span>
                  </button>
                );
              })}
            </div>
          </FieldLabel>
          <BodyStatsFields stats={stats} showAge={false} />
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
          Calculate calories
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label={`${validSteps?.toLocaleString("en-IN") ?? ""} steps burns about`}
            value={result?.kcal ?? ""}
            unit="kcal"
          />
          {result ? (
            <div className="mt-4 space-y-3">
              <div className="grid gap-2 sm:grid-cols-3">
                <ResultChip label="Distance" value={`${result.km} km`} />
                <ResultChip label="Walking time" value={`≈ ${result.minutes} min`} />
                <ResultChip label="Above resting" value={`${result.netKcal} kcal`} />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                &ldquo;Above resting&rdquo; removes what you&apos;d burn sitting
                still anyway — that&apos;s the number to use when thinking
                about a calorie deficit. Estimated stride: {result.strideCm} cm.
              </p>
              <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
                Don&apos;t eat these calories back one-for-one. Your{" "}
                <Link href="/tdee-calculator" className="font-semibold underline">
                  TDEE
                </Link>{" "}
                already includes your usual activity level.
              </p>
            </div>
          ) : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/calorie-deficit-calculator" className="fk-link font-semibold">
            Calorie deficit calculator
          </Link>
          <Link href="/tdee-calculator" className="fk-link font-semibold">
            TDEE calculator
          </Link>
          <Link href="/weight-loss" className="fk-link font-semibold">
            Weight loss guide
          </Link>
        </div>
      }
    />
  );
}
