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
  cmToFtIn,
  ftInToCm,
  kgToLb,
  lbToKg,
  mifflinBmr,
  type Sex,
} from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";

export function BmrCalculatorForm() {
  return (
    <CalcAuthGate
      toolName="BMR calculator"
      tool="bmr-calculator"
      actionLabel="unlock your BMR estimate"
    >
      {(gate) => <BmrInner {...gate} />}
    </CalcAuthGate>
  );
}

function BmrInner({
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
  }, [memberId]);

  const weightKg = weightUnit === "kg" ? weight : lbToKg(weight);
  const height = heightUnit === "cm" ? heightCm : ftInToCm(ft, inches);
  const bmr = useMemo(
    () => Math.round(mifflinBmr(sex, weightKg, height, age)),
    [sex, weightKg, height, age],
  );

  return (
    <CalcWorkspace
      title="Resting burn"
      purpose="Estimate calories before activity using Mifflin–St Jeor — educational only."
      signedInAs={isSignedIn ? memberName : null}
      locked={!isSignedIn}
      lockTitle="Sign in to calculate BMR"
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
                sex,
                age,
                weightKg,
                heightCm: height,
                weightUnit,
                heightUnit,
              });
            }}
          >
            Calculate BMR
          </Button>
        ) : null
      }
      results={
        <>
          <ResultHero
            show={acknowledged}
            label="Estimated BMR"
            value={bmr}
            unit="kcal/day"
          />
          {acknowledged ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Calories before activity. Add training and daily movement in the
              TDEE calculator for a maintenance estimate.
            </p>
          ) : null}
        </>
      }
      footer={
        <Link
          href="/tools/tdee-calculator"
          className="fk-link text-sm font-semibold"
          onClick={() =>
            saveCalcPrefs(memberId, {
              sex,
              age,
              weightKg,
              heightCm: height,
              weightUnit,
              heightUnit,
            })
          }
        >
          Add activity → TDEE calculator
        </Link>
      }
    />
  );
}
