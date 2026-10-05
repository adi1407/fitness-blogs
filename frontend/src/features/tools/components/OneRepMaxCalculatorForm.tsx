"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  ResultHero,
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import { CalcTable } from "@/features/tools/components/CalcTable";
import { numField, parseNum, setNumField, type NumField } from "@/features/tools/lib/calcFields";
import { kgToLb, lbToKg } from "@/features/tools/lib/calcMath";
import { calcOneRepMax } from "@/features/tools/lib/calcMathMore";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";

const TOOL = "one-rep-max-calculator" as const;

const ZONES: Record<number, string> = {
  1: "Max strength",
  2: "Strength",
  3: "Strength",
  4: "Strength",
  5: "Strength",
  6: "Strength / size",
  8: "Hypertrophy",
  10: "Hypertrophy",
  12: "Hypertrophy / endurance",
};

const LIFTS = ["Bench press", "Squat", "Deadlift", "Overhead press", "Other"] as const;

export function OneRepMaxCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const [unit, setUnitRaw] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState<NumField>(numField(60));
  const [reps, setReps] = useState<NumField>(numField(8));
  const [lift, setLift] = useState<(typeof LIFTS)[number]>("Bench press");

  function setUnit(u: "kg" | "lb") {
    if (u === unit) return;
    const w = parseNum(weight);
    if (w != null) setWeight(numField(Math.round((u === "lb" ? kgToLb(w) : lbToKg(w)) * 10) / 10));
    setUnitRaw(u);
  }

  const weightN = parseNum(weight);
  const repsN = parseNum(reps);
  const validReps = repsN != null && Number.isInteger(repsN) && repsN >= 1 && repsN <= 12 ? repsN : null;

  const computed = useMemo(() => {
    if (weightN == null || weightN <= 0 || validReps == null) return null;
    return calcOneRepMax(weightN, validReps);
  }, [weightN, validReps]);

  const { shown: result, runId, runCalculate } = useCalcResult<NonNullable<typeof computed>>(
    TOOL,
    `${unit}|${weight}|${reps}|${lift}`,
  );

  const payload: CalcSavePayload | null =
    result && weightN != null && validReps != null
      ? {
          tool: TOOL,
          inputs: { lift, weight: weightN, reps: validReps, unit },
          result: { label: `${lift} 1RM`, value: result.oneRm, unit },
        }
      : null;

  return (
    <CalcWorkspace
      title="Strength estimate"
      purpose="Estimate your one-rep max from a set you've already done — no need to test a true max."
      signedInAs={calc.memberName}
      inputs={
        <>
          <FieldLabel label="Exercise">
            <select
              value={lift}
              onChange={(e) => setLift(e.target.value as (typeof LIFTS)[number])}
              className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/30"
              aria-label="Exercise"
            >
              {LIFTS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </FieldLabel>
          <FieldLabel label="Weight lifted">
            <div className="flex gap-2">
              <CalcInput
                type="number"
                min={1}
                value={weight}
                onChange={(e) => setNumField(e.target.value, setWeight)}
                aria-label={`Weight lifted in ${unit}`}
              />
              <div className="w-32 shrink-0">
                <SegmentedControl
                  value={unit}
                  onChange={setUnit}
                  options={[
                    { id: "kg", label: "kg" },
                    { id: "lb", label: "lb" },
                  ]}
                />
              </div>
            </div>
          </FieldLabel>
          <FieldLabel label="Reps completed (1–12)">
            <CalcInput
              type="number"
              inputMode="numeric"
              min={1}
              max={12}
              value={reps}
              onChange={(e) => setNumField(e.target.value, setReps)}
              aria-label="Repetitions completed"
            />
            {reps !== "" && validReps == null ? (
              <p className="mt-1.5 text-xs text-red-700">
                Enter a whole number from 1 to 12 — estimates get unreliable above 12 reps.
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground">
                Use a set taken close to failure with good form.
              </p>
            )}
          </FieldLabel>
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
          Estimate 1RM
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label={`Estimated ${lift.toLowerCase()} 1RM`}
            value={result?.oneRm ?? ""}
            unit={unit}
          />
          {result ? (
            <div className="mt-4 space-y-3">
              <p className="text-xs text-muted-foreground">
                Epley {result.epley} {unit} · Brzycki {result.brzycki} {unit} — we show the average.
              </p>
              <CalcTable
                caption="Working loads by rep target (rounded to 2.5)"
                head={["Reps", `Load (${unit})`, "Typical use"]}
                rows={result.table.map((r) => [
                  String(r.reps),
                  `${r.load} · ${r.pct}%`,
                  ZONES[r.reps] ?? "",
                ])}
              />
              <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
                An estimate, not a target to test. If you do attempt a heavy
                single, warm up thoroughly and use a spotter or safety pins.
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
          <Link href="/body-fat-calculator" className="fk-link font-semibold">
            Body fat calculator
          </Link>
          <Link href="/muscle-building" className="fk-link font-semibold">
            Muscle building guide
          </Link>
        </div>
      }
    />
  );
}
