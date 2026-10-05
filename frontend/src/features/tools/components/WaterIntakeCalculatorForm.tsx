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
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import { BodyStatsFields } from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import { numField, parseNum, setNumField, type NumField } from "@/features/tools/lib/calcFields";
import { calcWater, type WaterInput } from "@/features/tools/lib/calcMathMore";
import { takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";

const TOOL = "water-intake-calculator" as const;

type Status = NonNullable<WaterInput["status"]>;

export function WaterIntakeCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const stats = useBodyStats({ profile: calc.profile });
  const [exercise, setExercise] = useState<NumField>(numField(45));
  const [climate, setClimate] = useState<WaterInput["climate"]>("hot");
  const [status, setStatus] = useState<Status>("none");

  /* eslint-disable react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    stats.applyHandoff(takeHandoff(["sex", "kg"] as const));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const { kg, sex } = stats;
  const exerciseN = parseNum(exercise);
  const validExercise = exerciseN != null && exerciseN >= 0 && exerciseN <= 300 ? exerciseN : null;
  const effectiveStatus: Status = sex === "female" ? status : "none";

  const computed = useMemo(() => {
    if (kg == null || validExercise == null) return null;
    return calcWater({ kg, exerciseMin: validExercise, climate, status: effectiveStatus });
  }, [kg, validExercise, climate, effectiveStatus]);

  const { shown: result, runId, runCalculate } = useCalcResult<NonNullable<typeof computed>>(
    TOOL,
    `${stats.key}|${exercise}|${climate}|${effectiveStatus}`,
  );

  const payload: CalcSavePayload | null =
    result && kg != null && validExercise != null
      ? {
          tool: TOOL,
          inputs: {
            kg: Math.round(kg * 10) / 10,
            exerciseMin: validExercise,
            climate,
            status: effectiveStatus,
          },
          result: { label: "Daily water", value: result.litres, unit: "L/day", glasses: result.glasses },
          profile: stats.toProfile(),
        }
      : null;

  return (
    <CalcWorkspace
      title="Daily hydration"
      purpose="A starting estimate for how much to drink each day — adjust to thirst and urine colour."
      signedInAs={calc.memberName}
      inputs={
        <>
          <BodyStatsFields stats={stats} showAge={false} showHeight={false} />
          <FieldLabel label="Exercise per day (minutes)">
            <CalcInput
              type="number"
              inputMode="numeric"
              min={0}
              max={300}
              value={exercise}
              onChange={(e) => setNumField(e.target.value, setExercise)}
              aria-label="Exercise minutes per day"
            />
            {exercise !== "" && validExercise == null ? (
              <p className="mt-1.5 text-xs text-red-700">Enter 0–300 minutes.</p>
            ) : null}
          </FieldLabel>
          <FieldLabel label="Climate">
            <SegmentedControl
              value={climate}
              onChange={setClimate}
              options={[
                { id: "hot", label: "Hot / humid" },
                { id: "mild", label: "Mild / AC indoors" },
              ]}
            />
          </FieldLabel>
          {sex === "female" ? (
            <FieldLabel label="Pregnancy / breastfeeding">
              <SegmentedControl
                value={status}
                onChange={setStatus}
                options={[
                  { id: "none", label: "Neither" },
                  { id: "pregnant", label: "Pregnant" },
                  { id: "breastfeeding", label: "Breastfeeding" },
                ]}
              />
            </FieldLabel>
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
          Calculate water intake
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Aim to drink about"
            value={result?.litres ?? ""}
            unit="litres/day"
          />
          {result ? (
            <div className="mt-4 space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <ResultChip label="Glasses (250 ml)" value={`≈ ${result.glasses}`} />
                <ResultChip label="Baseline for your weight" value={`${(result.parts.base / 1000).toFixed(1)} L`} />
                {result.parts.exercise > 0 ? (
                  <ResultChip label="Extra for exercise" value={`+${result.parts.exercise} ml`} />
                ) : null}
                {result.parts.heat > 0 ? <ResultChip label="Extra for heat" value={`+${result.parts.heat} ml`} /> : null}
                {result.parts.extra > 0 ? (
                  <ResultChip label={effectiveStatus === "pregnant" ? "Pregnancy" : "Breastfeeding"} value={`+${result.parts.extra} ml`} />
                ) : null}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This counts all drinks — water, chaas, nimbu pani, tea and milk
                all help. Pale-yellow urine through the day is a good sign
                you&apos;re on track.
              </p>
              <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
                If you have kidney, heart or liver disease, or have been told
                to limit fluids, follow your doctor&apos;s advice instead of
                this estimate.
              </p>
            </div>
          ) : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/calorie-calculator" className="fk-link font-semibold">
            Calorie calculator
          </Link>
          <Link href="/steps-to-calories-calculator" className="fk-link font-semibold">
            Steps to calories
          </Link>
          <Link href="/nutrition" className="fk-link font-semibold">
            Nutrition guide
          </Link>
        </div>
      }
    />
  );
}
