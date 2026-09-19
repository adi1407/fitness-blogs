"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { EducationalCalcGate } from "@/features/tools/components/EducationalCalcGate";

const ACTIVITY = [
  { id: "sedentary", label: "Sedentary", factor: 1.2 },
  { id: "light", label: "Lightly active", factor: 1.375 },
  { id: "moderate", label: "Moderately active", factor: 1.55 },
  { id: "very", label: "Very active", factor: 1.725 },
] as const;

function mifflinBmr(
  sex: "male" | "female",
  kg: number,
  cm: number,
  age: number,
) {
  const base = 10 * kg + 6.25 * cm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function TdeeCalculatorForm() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] =
    useState<(typeof ACTIVITY)[number]["id"]>("moderate");

  const result = useMemo(() => {
    const bmr = Math.round(mifflinBmr(sex, weight, height, age));
    const factor = ACTIVITY.find((a) => a.id === activity)?.factor ?? 1.55;
    const tdee = Math.round(bmr * factor);
    return {
      bmr,
      tdee,
      cut: Math.round(tdee * 0.8),
      maintain: tdee,
      bulk: Math.round(tdee * 1.1),
    };
  }, [sex, age, weight, height, activity]);

  return (
    <EducationalCalcGate toolName="TDEE calculator" tool="tdee-calculator">
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
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium">Activity</span>
              <select
                className="mt-2 w-full rounded-xl border border-border px-3 py-2"
                value={activity}
                onChange={(e) =>
                  setActivity(e.target.value as (typeof ACTIVITY)[number]["id"])
                }
              >
                {ACTIVITY.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {!acknowledged ? (
            <div className="mt-6">
              <Button type="button" onClick={requestAck}>
                Calculate TDEE
              </Button>
            </div>
          ) : (
            <div className="mt-8 space-y-3 rounded-xl bg-brand-50 p-5">
              <p className="text-sm text-muted-foreground">
                BMR ≈ {result.bmr} kcal · TDEE ≈ {result.tdee} kcal
              </p>
              <ul className="space-y-1 text-sm">
                <li>
                  <strong>Fat loss start:</strong> ~{result.cut} kcal
                </li>
                <li>
                  <strong>Maintenance:</strong> ~{result.maintain} kcal
                </li>
                <li>
                  <strong>Surplus start:</strong> ~{result.bulk} kcal
                </li>
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/weight-loss" className="text-sm text-primary underline">
              Weight loss guide
            </Link>
            <Link
              href="/tools/macro-calculator"
              className="text-sm text-primary underline"
            >
              Macro calculator
            </Link>
          </div>
        </div>
      )}
    </EducationalCalcGate>
  );
}
