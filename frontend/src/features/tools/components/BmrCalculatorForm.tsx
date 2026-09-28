"use client";

import { useMemo, useState } from "react";
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
  cmToFtIn,
  ftInToCm,
  kgToLb,
  lbToKg,
  mifflinBmr,
  type Sex,
} from "@/features/tools/lib/calcMath";
import { handoffHref } from "@/features/tools/lib/calcHandoff";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";

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
  const [age, setAge] = useState<NumField>(numField(30));
  const [weight, setWeight] = useState<NumField>(numField(70));
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState<NumField>(numField(170));
  const [ft, setFt] = useState<NumField>(numField(5));
  const [inches, setInches] = useState<NumField>(numField(7));

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

  const computed = useMemo(() => {
    if (
      ageN == null ||
      ageN <= 0 ||
      weightKg == null ||
      weightKg <= 0 ||
      height == null ||
      height <= 0
    ) {
      return null;
    }
    return {
      bmr: Math.round(mifflinBmr(sex, weightKg, height, ageN)),
      sex,
      age: ageN,
      kg: Math.round(weightKg),
      cm: Math.round(height),
    };
  }, [sex, weightKg, height, ageN]);

  const { shown: result, runId, runCalculate } = useCalcResult<NonNullable<typeof computed>>(
    acknowledged,
    requestAck,
    [memberId, sex, age, weight, weightUnit, heightUnit, heightCm, ft, inches].join("|"),
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
              onChange={(e) => setNumField(e.target.value, setAge)}
            />
          </FieldLabel>
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
            disabled={!computed}
            onClick={() => {
              if (computed) runCalculate(computed);
            }}
          >
            Calculate BMR
          </Button>
        ) : null
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Estimated BMR"
            value={result?.bmr ?? ""}
            unit="kcal/day"
          />
          {result ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Calories before activity. Add training and daily movement in the
              TDEE calculator for a maintenance estimate.
            </p>
          ) : null}
        </>
      }
      footer={
        <Link
          href={
            result
              ? handoffHref("/tools/tdee-calculator", {
                  sex: result.sex,
                  age: result.age,
                  kg: result.kg,
                  cm: result.cm,
                })
              : "/tools/tdee-calculator"
          }
          className="fk-link text-sm font-semibold"
        >
          Add activity → TDEE calculator
        </Link>
      }
    />
  );
}
