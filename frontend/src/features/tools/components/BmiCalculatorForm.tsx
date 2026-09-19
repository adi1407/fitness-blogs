"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { EducationalCalcGate } from "@/features/tools/components/EducationalCalcGate";

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight (screening category)";
  if (bmi < 25) return "Normal weight (screening category)";
  if (bmi < 30) return "Overweight (screening category)";
  return "Obesity (screening category)";
}

export function BmiCalculatorForm() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);

  const result = useMemo(() => {
    const m = height / 100;
    const bmi = m > 0 ? weight / (m * m) : 0;
    return { bmi: Math.round(bmi * 10) / 10, category: bmiCategory(bmi) };
  }, [weight, height]);

  return (
    <EducationalCalcGate toolName="BMI calculator" tool="bmi-calculator">
      {({ acknowledged, requestAck }) => (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
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
              <span className="font-medium">Height (cm)</span>
              <input
                type="number"
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 0)}
              />
            </label>
          </div>

          {!acknowledged ? (
            <div className="mt-6">
              <Button type="button" onClick={requestAck}>
                Calculate BMI
              </Button>
            </div>
          ) : (
            <div className="mt-8 rounded-xl bg-brand-50 p-5">
              <p className="text-sm text-muted-foreground">BMI</p>
              <p className="mt-1 text-4xl font-semibold">{result.bmi}</p>
              <p className="mt-2 text-sm text-muted-foreground">{result.category}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                BMI is a population screening metric — it does not measure body
                fat, muscle, or health directly.
              </p>
            </div>
          )}

          <Link
            href="/weight-loss"
            className="mt-6 inline-block text-sm text-primary underline"
          >
            Weight loss guide
          </Link>
        </div>
      )}
    </EducationalCalcGate>
  );
}
