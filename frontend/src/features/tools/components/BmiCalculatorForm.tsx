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
  numField,
  parseNum,
  roundNumField,
  setNumField,
  type NumField,
} from "@/features/tools/lib/calcFields";
import {
  calcBmi,
  cmToFtIn,
  ftInToCm,
  kgToLb,
  lbToKg,
} from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";
import { useCalcReveal } from "@/features/tools/hooks/useCalcReveal";

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
  const [weight, setWeight] = useState<NumField>(numField(70));
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState<NumField>(numField(170));
  const [ft, setFt] = useState<NumField>(numField(5));
  const [inches, setInches] = useState<NumField>(numField(7));
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
    setPrefsReady(true);
  }, [memberId]);

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

  const inputsValid = weightKg != null && height != null && height > 0;

  const result = useMemo(() => {
    if (!inputsValid || weightKg == null || height == null) return null;
    return calcBmi(weightKg, height);
  }, [inputsValid, weightKg, height]);

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
                  value={heightCm}
                  onChange={(e) => setNumField(e.target.value, setHeightCm)}
                />
              ) : (
                <div className="flex gap-2">
                  <CalcInput
                    type="number"
                    value={ft}
                    onChange={(e) => setNumField(e.target.value, setFt)}
                  />
                  <CalcInput
                    type="number"
                    value={inches}
                    onChange={(e) => setNumField(e.target.value, setInches)}
                  />
                </div>
              )}
            </div>
          </FieldLabel>
        </>
      }
      calculateSlot={
        isSignedIn ? (
          <Button
            type="button"
            disabled={!prefsReady || !inputsValid}
            onClick={() => {
              if (!inputsValid || weightKg == null || height == null) return;
              runCalculate();
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
            show={revealed && result != null}
            label="BMI"
            value={result?.bmi ?? ""}
          />
          {revealed && result ? (
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
