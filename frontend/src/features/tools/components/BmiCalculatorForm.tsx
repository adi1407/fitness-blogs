"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { CalcAuthGate } from "@/features/tools/components/CalcAuthGate";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  ResultHero,
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import {
  calcBmi,
  cmToFtIn,
  ftInToCm,
  kgToLb,
  lbToKg,
} from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";

export function BmiCalculatorForm() {
  return (
    <CalcAuthGate
      toolName="BMI calculator"
      tool="bmi-calculator"
      actionLabel="unlock your BMI screening"
    >
      {(gate) => <BmiInner {...gate} />}
    </CalcAuthGate>
  );
}

function BmiInner({
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
  const [weight, setWeight] = useState(70);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState(170);
  const [ft, setFt] = useState(5);
  const [inches, setInches] = useState(7);

  useEffect(() => {
    if (!memberId) return;
    const prefs = loadCalcPrefs(memberId);
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
  }, [memberId]);

  const weightKg = weightUnit === "kg" ? weight : lbToKg(weight);
  const height = heightUnit === "cm" ? heightCm : ftInToCm(ft, inches);
  const result = useMemo(
    () => calcBmi(weightKg, height),
    [weightKg, height],
  );

  return (
    <CalcWorkspace
      title="Screening metric"
      purpose="BMI is a population screening index — not a diagnosis or body-fat measure."
      signedInAs={isSignedIn ? memberName : null}
      locked={!isSignedIn}
      lockTitle="Sign in to calculate BMI"
      onUnlockClick={requestSignIn}
      inputs={
        <>
          <FieldLabel label="Weight">
            <div className="flex gap-2">
              <CalcInput
                type="number"
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
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                />
              ) : (
                <div className="flex gap-2">
                  <CalcInput
                    type="number"
                    value={ft}
                    onChange={(e) => setFt(Number(e.target.value) || 0)}
                  />
                  <CalcInput
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(Number(e.target.value) || 0)}
                  />
                </div>
              )}
            </div>
          </FieldLabel>
        </>
      }
      calculateSlot={
        !acknowledged ? (
          <Button
            type="button"
            onClick={() => {
              requestAck();
              saveCalcPrefs(memberId, {
                weightKg,
                heightCm: height,
                weightUnit,
                heightUnit,
              });
            }}
          >
            Calculate BMI
          </Button>
        ) : null
      }
      results={
        <>
          <ResultHero
            show={acknowledged}
            label="BMI"
            value={result.bmi}
          />
          {acknowledged ? (
            <div className="mt-4 space-y-3">
              <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-foreground">
                {result.categoryLabel}
              </span>
              <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
                Screening only — BMI does not measure body fat, muscle, or
                health directly. Consult a professional for personal advice.
              </p>
            </div>
          ) : null}
        </>
      }
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/weight-loss" className="fk-link font-semibold">
            Weight loss guide
          </Link>
          <Link href="/tools/tdee-calculator" className="fk-link font-semibold">
            TDEE calculator
          </Link>
        </div>
      }
    />
  );
}
