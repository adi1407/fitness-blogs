"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { EducationalCalcGate } from "@/features/tools/components/EducationalCalcGate";

export function MacroCalculatorForm() {
  const [calories, setCalories] = useState(2000);
  const [weight, setWeight] = useState(70);
  const [proteinPerKg, setProteinPerKg] = useState(1.8);

  const result = useMemo(() => {
    const protein = Math.round(weight * proteinPerKg);
    const proteinKcal = protein * 4;
    const fat = Math.round((calories * 0.25) / 9);
    const fatKcal = fat * 9;
    const carbs = Math.max(0, Math.round((calories - proteinKcal - fatKcal) / 4));
    return { protein, fat, carbs };
  }, [calories, weight, proteinPerKg]);

  return (
    <EducationalCalcGate toolName="macro calculator" tool="macro-calculator">
      {({ acknowledged, requestAck }) => (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm">
              <span className="font-medium">Calories</span>
              <input
                type="number"
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value) || 0)}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium">Weight (kg)</span>
              <input
                type="number"
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium">Protein g/kg</span>
              <input
                type="number"
                step="0.1"
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={proteinPerKg}
                onChange={(e) => setProteinPerKg(Number(e.target.value) || 0)}
              />
            </label>
          </div>

          {!acknowledged ? (
            <div className="mt-6">
              <Button type="button" onClick={requestAck}>
                Calculate macros
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-3 rounded-xl bg-brand-50 p-5 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="text-2xl font-semibold">{result.protein} g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="text-2xl font-semibold">{result.carbs} g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fat</p>
                <p className="text-2xl font-semibold">{result.fat} g</p>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/foods/indian" className="text-primary underline">
              Indian foods
            </Link>
            <Link href="/nutrition/protein" className="text-primary underline">
              Protein guide
            </Link>
          </div>
        </div>
      )}
    </EducationalCalcGate>
  );
}
