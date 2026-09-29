"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  CalcWorkspace,
  FieldLabel,
  ResultHero,
} from "@/features/tools/components/CalcWorkspace";
import { BodyStatsFields } from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import {
  PROTEIN_GOALS,
  calcProtein,
  type ProteinGoalId,
} from "@/features/tools/lib/calcMath";
import { takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload, CalorieGoal } from "@/features/tools/types";
import { cn } from "@/lib/utils";

const TOOL = "protein-calculator" as const;

const GOAL_FROM_PROFILE: Record<CalorieGoal, ProteinGoalId> = {
  loss: "fat-loss",
  maintain: "general",
  gain: "muscle",
};

export function ProteinCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const [goal, setGoal] = useState<ProteinGoalId>("muscle");
  const stats = useBodyStats({
    profile: calc.profile,
    applyProfileExtras: (p) => {
      if (p.goal) setGoal(GOAL_FROM_PROFILE[p.goal]);
    },
  });

  /* eslint-disable react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    stats.applyHandoff(takeHandoff(["kg"] as const));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const { kg } = stats;
  const computed = useMemo(() => {
    if (kg == null) return null;
    return calcProtein(kg, goal);
  }, [kg, goal]);

  const { shown: result, runId, runCalculate } = useCalcResult<
    NonNullable<typeof computed>
  >(TOOL, `${stats.key}|${goal}`);

  const payload: CalcSavePayload | null = result
    ? {
        tool: TOOL,
        inputs: { kg: Math.round(result.kg * 10) / 10, goal },
        result: {
          label: "Daily protein",
          value: result.grams,
          unit: "g/day",
          low: result.low,
          high: result.high,
        },
        profile: { kg: Math.round(result.kg * 10) / 10, weightUnit: stats.weightUnit },
      }
    : null;

  return (
    <CalcWorkspace
      title="Daily protein"
      purpose="Estimate grams per day from body weight and goal — then plan meals to hit it."
      signedInAs={calc.memberName}
      inputs={
        <>
          <BodyStatsFields
            stats={stats}
            showSex={false}
            showAge={false}
            showHeight={false}
            weightLabel="Body weight"
          />
          <FieldLabel label="Goal">
            <div className="grid gap-2">
              {PROTEIN_GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={goal === g.id}
                  onClick={() => setGoal(g.id)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none",
                    goal === g.id
                      ? "border-primary bg-[#0A0A0A] text-white"
                      : "border-border bg-white hover:border-primary/40",
                  )}
                >
                  <span className="text-sm font-semibold">{g.label}</span>
                  <span
                    className={cn(
                      "text-xs",
                      goal === g.id ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    {g.factor} g/kg
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
          Calculate protein
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Estimated daily protein"
            value={result?.grams ?? ""}
            unit="g/day"
          />
          {result ? (
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                Practical range {result.low}–{result.high} g based on{" "}
                {result.kg.toFixed(1)} kg ({result.factor} g per kg).
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border bg-white px-4 py-3">
                  <p className="text-xs">Over 3 meals</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    ~{Math.round(result.grams / 3)} g each
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white px-4 py-3">
                  <p className="text-xs">Over 4 meals</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    ~{Math.round(result.grams / 4)} g each
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed">
                For scale: 100 g paneer has about 18–21 g protein, a cup of
                cooked dal 10–15 g, two eggs 12–13 g and 200 g curd 6–8 g.
                If you have kidney disease, check your protein target with
                your doctor.
              </p>
            </div>
          ) : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/nutrition/protein" className="fk-link font-semibold">
            Protein guide
          </Link>
          <Link href="/foods/indian" className="fk-link font-semibold">
            Indian high-protein foods
          </Link>
          <Link href="/tools/macro-calculator" className="fk-link font-semibold">
            Macro calculator
          </Link>
        </div>
      }
    />
  );
}
