"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { CalcAuthGate } from "@/features/tools/components/CalcAuthGate";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  ResultChip,
  ResultHero,
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import {
  ACTIVITY_LEVELS,
  calcTdee,
  cmToFtIn,
  ftInToCm,
  kgToLb,
  lbToKg,
  type ActivityId,
  type Sex,
} from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";
import { cn } from "@/lib/utils";

export function TdeeCalculatorForm() {
  return (
    <CalcAuthGate
      toolName="TDEE calculator"
      tool="tdee-calculator"
      actionLabel="unlock your TDEE estimate"
    >
      {(gate) => <TdeeInner {...gate} />}
    </CalcAuthGate>
  );
}

function TdeeInner({
  memberId,
  memberName,
  isSignedIn,
  acknowledged,
  requestAck,
  requestSignIn,
}: {
  memberId: string | null;
  memberName: string | null;
  isSignedIn: boolean;
  acknowledged: boolean;
  requestAck: () => void;
  requestSignIn: () => void;
}) {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState(170);
  const [ft, setFt] = useState(5);
  const [inches, setInches] = useState(7);
  const [activity, setActivity] = useState<ActivityId>("moderate");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!memberId) return;
    const prefs = loadCalcPrefs(memberId);
    if (prefs.sex) setSex(prefs.sex);
    if (prefs.age) setAge(prefs.age);
    if (prefs.weightKg) {
      setWeight(
        prefs.weightUnit === "lb"
          ? Math.round(kgToLb(prefs.weightKg))
          : Math.round(prefs.weightKg),
      );
      setWeightUnit(prefs.weightUnit ?? "kg");
    }
    if (prefs.heightCm) {
      setHeightCm(prefs.heightCm);
      const fi = cmToFtIn(prefs.heightCm);
      setFt(fi.ft);
      setInches(fi.inches);
      setHeightUnit(prefs.heightUnit ?? "cm");
    }
    if (prefs.activity) setActivity(prefs.activity);
    setHydrated(true);
  }, [memberId]);

  const weightKg = weightUnit === "kg" ? weight : lbToKg(weight);
  const height =
    heightUnit === "cm" ? heightCm : ftInToCm(ft, inches);

  const result = useMemo(
    () => calcTdee(sex, weightKg, height, age, activity),
    [sex, weightKg, height, age, activity],
  );

  const persist = (extra?: Parameters<typeof saveCalcPrefs>[1]) => {
    saveCalcPrefs(memberId, {
      sex,
      age,
      weightKg,
      heightCm: height,
      activity,
      tdee: result.tdee,
      weightUnit,
      heightUnit,
      ...extra,
    });
  };

  return (
    <CalcWorkspace
      title="Know your daily calories"
      purpose="Estimate maintenance energy from body stats and activity — educational only."
      signedInAs={isSignedIn ? memberName : null}
      locked={!isSignedIn}
      lockTitle="Sign in to calculate TDEE"
      lockDescription="Sign in or create an account with Google to enter your stats and see BMR, TDEE, and goal calorie ranges."
      onUnlockClick={requestSignIn}
      inputs={
        <>
          <FieldLabel label="Sex">
            <SegmentedControl
              value={sex}
              onChange={setSex}
              options={[
                { id: "male", label: "Male" },
                { id: "female", label: "Female" },
              ]}
            />
          </FieldLabel>

          <FieldLabel label="Age">
            <CalcInput
              type="number"
              min={15}
              max={100}
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
            />
          </FieldLabel>

          <FieldLabel label="Weight">
            <div className="flex gap-2">
              <CalcInput
                type="number"
                min={30}
                max={400}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
              />
              <SegmentedControl
                value={weightUnit}
                onChange={(u) => {
                  if (u === weightUnit) return;
                  setWeight(
                    u === "lb"
                      ? Math.round(kgToLb(weight))
                      : Math.round(lbToKg(weight)),
                  );
                  setWeightUnit(u);
                }}
                options={[
                  { id: "kg", label: "kg" },
                  { id: "lb", label: "lb" },
                ]}
              />
            </div>
          </FieldLabel>

          <FieldLabel label="Height">
            <div className="space-y-2">
              <SegmentedControl
                value={heightUnit}
                onChange={(u) => {
                  if (u === "ft" && heightUnit === "cm") {
                    const fi = cmToFtIn(heightCm);
                    setFt(fi.ft);
                    setInches(fi.inches);
                  } else if (u === "cm" && heightUnit === "ft") {
                    setHeightCm(ftInToCm(ft, inches));
                  }
                  setHeightUnit(u);
                }}
                options={[
                  { id: "cm", label: "cm" },
                  { id: "ft", label: "ft / in" },
                ]}
              />
              {heightUnit === "cm" ? (
                <CalcInput
                  type="number"
                  min={120}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                />
              ) : (
                <div className="flex gap-2">
                  <CalcInput
                    type="number"
                    min={4}
                    max={8}
                    value={ft}
                    onChange={(e) => setFt(Number(e.target.value) || 0)}
                    aria-label="Feet"
                  />
                  <CalcInput
                    type="number"
                    min={0}
                    max={11}
                    value={inches}
                    onChange={(e) => setInches(Number(e.target.value) || 0)}
                    aria-label="Inches"
                  />
                </div>
              )}
            </div>
          </FieldLabel>

          <div>
            <p className="text-sm font-medium">Activity</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {ACTIVITY_LEVELS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActivity(a.id)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left transition",
                    activity === a.id
                      ? "border-primary bg-[#0A0A0A] text-white"
                      : "border-border bg-white hover:border-primary/40",
                  )}
                >
                  <span className="block text-sm font-semibold">{a.label}</span>
                  <span
                    className={cn(
                      "mt-0.5 block text-xs",
                      activity === a.id
                        ? "text-white/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {a.helper}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      }
      calculateSlot={
        !acknowledged ? (
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => {
              requestAck();
              if (hydrated || memberId) persist();
            }}
          >
            Calculate TDEE
          </Button>
        ) : null
      }
      results={
        <>
          <ResultHero
            show={acknowledged}
            label="Estimated TDEE"
            value={result.tdee}
            unit="kcal/day"
          />
          {acknowledged ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                BMR (resting) ≈ {result.bmr} kcal/day
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <ResultChip
                  label="Fat loss start"
                  value={`~${result.cut} kcal`}
                  href="/tools/calorie-calculator"
                  onClick={() =>
                    persist({ tdee: result.tdee, calorieTarget: result.cut })
                  }
                />
                <ResultChip
                  label="Maintain"
                  value={`~${result.maintain} kcal`}
                  href="/tools/macro-calculator"
                  onClick={() =>
                    persist({
                      tdee: result.tdee,
                      calorieTarget: result.maintain,
                    })
                  }
                />
                <ResultChip
                  label="Surplus start"
                  value={`~${result.bulk} kcal`}
                  href="/tools/calorie-calculator"
                  onClick={() =>
                    persist({ tdee: result.tdee, calorieTarget: result.bulk })
                  }
                />
              </div>
            </div>
          ) : null}
        </>
      }
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/weight-loss" className="fk-link font-semibold">
            Weight loss guide
          </Link>
          <Link
            href="/tools/macro-calculator"
            className="fk-link font-semibold"
            onClick={() =>
              persist({ tdee: result.tdee, calorieTarget: result.tdee })
            }
          >
            Macro calculator
          </Link>
        </div>
      }
    />
  );
}
