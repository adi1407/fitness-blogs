"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { EducationalCalcGate } from "@/features/tools/components/EducationalCalcGate";

function mifflinBmr(
  sex: "male" | "female",
  kg: number,
  cm: number,
  age: number,
) {
  const base = 10 * kg + 6.25 * cm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function BmrCalculatorForm() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);

  const bmr = useMemo(
    () => Math.round(mifflinBmr(sex, weight, height, age)),
    [sex, age, weight, height],
  );

  return (
    <EducationalCalcGate toolName="BMR calculator" tool="bmr-calculator">
      {({ acknowledged, requestAck }) => (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium">Sex</span>
              <select
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={sex}
                onChange={(e) => setSex(e.target.value as "male" | "female")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium">Age</span>
              <input
                type="number"
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || 0)}
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
                Calculate BMR
              </Button>
            </div>
          ) : (
            <div className="mt-8 rounded-xl bg-brand-50 p-5">
              <p className="text-sm text-muted-foreground">
                Estimated BMR (Mifflin–St Jeor)
              </p>
              <p className="mt-1 text-4xl font-semibold">{bmr} kcal/day</p>
            </div>
          )}

          <Link
            href="/tools/tdee-calculator"
            className="mt-6 inline-block text-sm text-primary underline"
          >
            Convert BMR → TDEE
          </Link>
        </div>
      )}
    </EducationalCalcGate>
  );
}
