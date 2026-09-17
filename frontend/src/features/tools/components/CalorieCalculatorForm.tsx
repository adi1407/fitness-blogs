"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { EducationalCalcGate } from "@/features/tools/components/EducationalCalcGate";

export function CalorieCalculatorForm() {
  const [tdee, setTdee] = useState(2200);
  const [goal, setGoal] = useState<"loss" | "maintain" | "gain">("loss");

  const result = useMemo(() => {
    const mult = goal === "loss" ? 0.8 : goal === "gain" ? 1.1 : 1;
    const target = Math.round(tdee * mult);
    return { target, weekly: Math.round((tdee - target) * 7) };
  }, [tdee, goal]);

  return (
    <EducationalCalcGate toolName="calorie calculator">
      {({ acknowledged, requestAck }) => (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium">Maintenance calories (TDEE)</span>
              <input
                type="number"
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={tdee}
                onChange={(e) => setTdee(Number(e.target.value) || 0)}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium">Goal</span>
              <select
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={goal}
                onChange={(e) =>
                  setGoal(e.target.value as "loss" | "maintain" | "gain")
                }
              >
                <option value="loss">Fat loss (~20% deficit)</option>
                <option value="maintain">Maintain</option>
                <option value="gain">Muscle gain (~10% surplus)</option>
              </select>
            </label>
          </div>

          {!acknowledged ? (
            <div className="mt-6">
              <Button type="button" onClick={requestAck}>
                Calculate calories
              </Button>
            </div>
          ) : (
            <div className="mt-8 rounded-xl bg-brand-50 p-5">
              <p className="text-sm text-muted-foreground">Daily calorie target</p>
              <p className="mt-1 text-4xl font-semibold">{result.target} kcal</p>
              {goal === "loss" ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Rough weekly deficit ≈ {result.weekly} kcal (not fat loss
                  guarantee).
                </p>
              ) : null}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/tools/tdee-calculator" className="text-primary underline">
              Estimate TDEE first
            </Link>
            <Link href="/tools/macro-calculator" className="text-primary underline">
              Split into macros
            </Link>
          </div>
        </div>
      )}
    </EducationalCalcGate>
  );
}
