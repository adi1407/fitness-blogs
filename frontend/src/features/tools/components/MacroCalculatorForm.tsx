"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  MacroBar,
  ResultHero,
} from "@/features/tools/components/CalcWorkspace";
import { BodyStatsFields } from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import {
  numField,
  parseNum,
  roundNumField,
  setNumField,
  type NumField,
} from "@/features/tools/lib/calcFields";
import { calcMacros } from "@/features/tools/lib/calcMath";
import { handoffNumber, takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";
import { cn } from "@/lib/utils";

const TOOL = "macro-calculator" as const;

const PROTEIN_OPTIONS = [
  { id: 1.2, label: "1.2 g/kg", helper: "General health" },
  { id: 1.6, label: "1.6 g/kg", helper: "Active" },
  { id: 1.8, label: "1.8 g/kg", helper: "Fat loss" },
  { id: 2.0, label: "2.0 g/kg", helper: "Muscle gain" },
] as const;

export function MacroCalculatorForm() {
  const reduce = useReducedMotion();
  const calc = useCalcMember(TOOL);
  const [calories, setCalories] = useState<NumField>(numField(2000));
  const [proteinPerKg, setProteinPerKg] = useState<number>(1.8);
  const stats = useBodyStats({
    profile: calc.profile,
    applyProfileExtras: (p) => {
      if (p.goal === "gain") setProteinPerKg(2.0);
      else if (p.goal === "maintain") setProteinPerKg(1.6);
      else if (p.goal === "loss") setProteinPerKg(1.8);
    },
  });

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    const h = takeHandoff(["calories", "kg"] as const);
    const c = handoffNumber(h.calories, 1000, 6000);
    if (c != null) setCalories(roundNumField(c));
    stats.applyHandoff({ kg: h.kg });
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  const caloriesN = parseNum(calories);
  const caloriesValid = caloriesN != null && caloriesN >= 800 && caloriesN <= 8000;
  const { kg } = stats;

  const computed = useMemo(() => {
    if (!caloriesValid || caloriesN == null || kg == null) return null;
    return calcMacros(caloriesN, kg, proteinPerKg);
  }, [caloriesValid, caloriesN, kg, proteinPerKg]);

  const { shown: result, runId, runCalculate } = useCalcResult<
    NonNullable<typeof computed>
  >(TOOL, [calories, stats.key, proteinPerKg].join("|"));

  const payload: CalcSavePayload | null =
    result && caloriesN != null && kg != null
      ? {
          tool: TOOL,
          inputs: {
            calories: Math.round(caloriesN),
            kg: Math.round(kg * 10) / 10,
            proteinPerKg,
          },
          result: {
            label: "Macros",
            value: `${result.protein}P / ${result.carbs}C / ${result.fat}F`,
            unit: "g/day",
            protein: result.protein,
            carbs: result.carbs,
            fat: result.fat,
          },
          profile: { kg: Math.round(kg * 10) / 10, weightUnit: stats.weightUnit },
        }
      : null;

  return (
    <CalcWorkspace
      title="Split with purpose"
      purpose="Turn a calorie target into daily protein, carbs and fat in grams."
      signedInAs={calc.memberName}
      inputs={
        <>
          <FieldLabel label="Daily calories">
            <CalcInput
              type="number"
              inputMode="numeric"
              min={800}
              max={8000}
              value={calories}
              onChange={(e) => setNumField(e.target.value, setCalories)}
              aria-label="Daily calories"
            />
            {calories !== "" && caloriesN != null && !caloriesValid ? (
              <p className="mt-1.5 text-xs text-red-700">
                Enter between 800 and 8,000 kcal.
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground">
                Don&apos;t know it? Get your target from the{" "}
                <Link href="/calorie-calculator" className="fk-link">
                  calorie calculator
                </Link>
                .
              </p>
            )}
          </FieldLabel>
          <BodyStatsFields
            stats={stats}
            showSex={false}
            showAge={false}
            showHeight={false}
            weightLabel="Body weight"
          />
          <FieldLabel label="Protein level">
            <div className="grid grid-cols-2 gap-2">
              {PROTEIN_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={proteinPerKg === opt.id}
                  onClick={() => setProteinPerKg(opt.id)}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-left transition focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none",
                    proteinPerKg === opt.id
                      ? "border-primary bg-[#0A0A0A] text-white"
                      : "border-border bg-white hover:border-primary/40",
                  )}
                >
                  <span className="block text-sm font-semibold">{opt.label}</span>
                  <span
                    className={cn(
                      "text-xs",
                      proteinPerKg === opt.id
                        ? "text-white/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {opt.helper}
                  </span>
                </button>
              ))}
            </div>
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
          Calculate macros
        </Button>
      }
      results={
        result ? (
          <motion.div
            key={runId}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(
                [
                  ["Protein", result.protein],
                  ["Carbs", result.carbs],
                  ["Fat", result.fat],
                ] as const
              ).map(([label, grams]) => (
                <div key={label} className="rounded-xl bg-brand-50 p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {grams}
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      g
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <MacroBar
              proteinPct={result.pct.protein}
              carbsPct={result.pct.carbs}
              fatPct={result.pct.fat}
            />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Protein is set from your body weight, fat at about 25% of
              calories, and carbs fill the rest.
              {result.carbs === 0
                ? " Your protein and fat already use all the calories — raise calories or lower the protein level."
                : ""}
            </p>
          </motion.div>
        ) : (
          <ResultHero show={false} label="" value="" />
        )
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/protein-calculator" className="fk-link font-semibold">
            Protein calculator
          </Link>
          <Link href="/foods/indian" className="fk-link font-semibold">
            Indian foods
          </Link>
          <Link href="/nutrition/protein" className="fk-link font-semibold">
            Protein guide
          </Link>
        </div>
      }
    />
  );
}
