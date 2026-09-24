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
  numField,
  parseNum,
  roundNumField,
  setNumField,
  type NumField,
} from "@/features/tools/lib/calcFields";
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
import { useCalcReveal } from "@/features/tools/hooks/useCalcReveal";
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
  const [age, setAge] = useState<NumField>(numField(30));
  const [weight, setWeight] = useState<NumField>(numField(70));
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState<NumField>(numField(170));
  const [ft, setFt] = useState<NumField>(numField(5));
  const [inches, setInches] = useState<NumField>(numField(7));
  const [activity, setActivity] = useState<ActivityId>("moderate");
  const [prefsReady, setPrefsReady] = useState(!memberId);
  const { revealed, runCalculate } = useCalcReveal(
    acknowledged,
    requestAck,
    memberId,
  );

  useEffect(() => {
    if (!memberId) {
      setPrefsReady(true);
      return;
    }
    setPrefsReady(false);
    const prefs = loadCalcPrefs(memberId);
    if (prefs.sex) setSex(prefs.sex);
    if (prefs.age) setAge(numField(prefs.age));
    if (prefs.weightKg) {
      setWeight(
        prefs.weightUnit === "lb"
          ? roundNumField(kgToLb(prefs.weightKg))
          : roundNumField(prefs.weightKg),
      );
      setWeightUnit(prefs.weightUnit ?? "kg");
    }
    if (prefs.heightCm) {
      setHeightCm(numField(prefs.heightCm));
      const fi = cmToFtIn(prefs.heightCm);
      setFt(numField(fi.ft));
      setInches(numField(fi.inches));
      setHeightUnit(prefs.heightUnit ?? "cm");
    }
    if (prefs.activity) setActivity(prefs.activity);
    setPrefsReady(true);
  }, [memberId]);

  const ageN = parseNum(age);
  const weightN = parseNum(weight);
  const heightCmN = parseNum(heightCm);
  const ftN = parseNum(ft);
  const inN = parseNum(inches);

  const weightKg =
    weightN == null ? null : weightUnit === "kg" ? weightN : lbToKg(weightN);
  const height =
    heightUnit === "cm"
      ? heightCmN
      : ftN == null || inN == null
        ? null
        : ftInToCm(ftN, inN);

  const inputsValid =
    ageN != null && weightKg != null && height != null && height > 0;

  const result = useMemo(() => {
    if (!inputsValid || weightKg == null || height == null || ageN == null) {
      return null;
    }
    return calcTdee(sex, weightKg, height, ageN, activity);
  }, [inputsValid, sex, weightKg, height, ageN, activity]);

  const persist = (extra?: Parameters<typeof saveCalcPrefs>[1]) => {
    if (weightKg == null || height == null || ageN == null || !result) return;
    saveCalcPrefs(memberId, {
      sex,
      age: ageN,
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
              onChange={(e) => setNumField(e.target.value, setAge)}
            />
          </FieldLabel>

          <FieldLabel label="Weight">
            <div className="flex gap-2">
              <CalcInput
                type="number"
                min={30}
                max={400}
                value={weight}
                onChange={(e) => setNumField(e.target.value, setWeight)}
              />
              <SegmentedControl
                value={weightUnit}
                onChange={(u) => {
                  if (u === weightUnit) return;
                  if (weightN != null) {
                    setWeight(
                      u === "lb"
                        ? roundNumField(kgToLb(weightN))
                        : roundNumField(lbToKg(weightN)),
                    );
                  }
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
                  if (u === "ft" && heightUnit === "cm" && heightCmN != null) {
                    const fi = cmToFtIn(heightCmN);
                    setFt(numField(fi.ft));
                    setInches(numField(fi.inches));
                  } else if (
                    u === "cm" &&
                    heightUnit === "ft" &&
                    ftN != null &&
                    inN != null
                  ) {
                    setHeightCm(numField(ftInToCm(ftN, inN)));
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
                  onChange={(e) => setNumField(e.target.value, setHeightCm)}
                />
              ) : (
                <div className="flex gap-2">
                  <CalcInput
                    type="number"
                    min={4}
                    max={8}
                    value={ft}
                    onChange={(e) => setNumField(e.target.value, setFt)}
                    aria-label="Feet"
                  />
                  <CalcInput
                    type="number"
                    min={0}
                    max={11}
                    value={inches}
                    onChange={(e) => setNumField(e.target.value, setInches)}
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
        isSignedIn ? (
          <Button
            type="button"
            className="w-full sm:w-auto"
            disabled={!prefsReady || !inputsValid}
            onClick={() => {
              if (!inputsValid || !result) return;
              runCalculate();
              persist();
            }}
          >
            Calculate TDEE
          </Button>
        ) : null
      }
      results={
        <>
          <ResultHero
            show={revealed && result != null}
            label="Estimated TDEE"
            value={result?.tdee ?? ""}
            unit="kcal/day"
          />
          {revealed && result ? (
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
            onClick={() => {
              if (result) {
                persist({ tdee: result.tdee, calorieTarget: result.tdee });
              }
            }}
          >
            Macro calculator
          </Link>
        </div>
      }
    />
  );
}
