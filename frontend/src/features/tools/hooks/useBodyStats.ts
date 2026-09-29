"use client";

import { useEffect, useRef, useState } from "react";
import {
  numField,
  parseNum,
  roundNumField,
  type NumField,
} from "@/features/tools/lib/calcFields";
import { handoffNumber } from "@/features/tools/lib/calcHandoff";
import {
  cmToFtIn,
  ftInToCm,
  kgToLb,
  lbToKg,
  type Sex,
} from "@/features/tools/lib/calcMath";
import type { CalcProfile } from "@/features/tools/types";

export type BodyStats = ReturnType<typeof useBodyStats>;

type Options = {
  /** Saved member profile; applied once unless URL hand-off values were used. */
  profile: CalcProfile | null;
  /** Extra profile fields owned by the form (activity, goal, …). */
  applyProfileExtras?: (profile: CalcProfile) => void;
};

/** Shared sex / age / weight / height state with unit toggles and pre-fill. */
export function useBodyStats({ profile, applyProfileExtras }: Options) {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<NumField>(numField(30));
  const [weight, setWeight] = useState<NumField>(numField(70));
  const [weightUnit, setWeightUnitRaw] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnitRaw] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState<NumField>(numField(170));
  const [ft, setFt] = useState<NumField>(numField(5));
  const [inches, setInches] = useState<NumField>(numField(7));

  const prefillDone = useRef(false);
  const extrasRef = useRef(applyProfileExtras);
  useEffect(() => {
    extrasRef.current = applyProfileExtras;
  });

  const ageN = parseNum(age);
  const weightN = parseNum(weight);
  const heightCmN = parseNum(heightCm);
  const ftN = parseNum(ft);
  const inN = parseNum(inches);

  const kg =
    weightN == null || weightN <= 0
      ? null
      : weightUnit === "kg"
        ? weightN
        : lbToKg(weightN);
  const cm =
    heightUnit === "cm"
      ? heightCmN != null && heightCmN > 0
        ? heightCmN
        : null
      : ftN == null || inN == null || ftN <= 0
        ? null
        : ftInToCm(ftN, inN);
  const validAge = ageN != null && ageN >= 15 && ageN <= 100 ? ageN : null;

  function setWeightUnit(u: "kg" | "lb") {
    if (u === weightUnit) return;
    if (weightN != null) {
      setWeight(roundNumField(u === "lb" ? kgToLb(weightN) : lbToKg(weightN)));
    }
    setWeightUnitRaw(u);
  }

  function setHeightUnit(u: "cm" | "ft") {
    if (u === heightUnit) return;
    if (u === "ft" && heightCmN != null) {
      const fi = cmToFtIn(heightCmN);
      setFt(numField(fi.ft));
      setInches(numField(fi.inches));
    } else if (u === "cm" && ftN != null && inN != null) {
      setHeightCm(numField(ftInToCm(ftN, inN)));
    }
    setHeightUnitRaw(u);
  }

  function setKg(value: number, unit: "kg" | "lb" = weightUnit) {
    setWeightUnitRaw(unit);
    setWeight(roundNumField(unit === "kg" ? value : kgToLb(value)));
  }

  function setCm(value: number, unit: "cm" | "ft" = heightUnit) {
    setHeightUnitRaw(unit);
    setHeightCm(roundNumField(value));
    const fi = cmToFtIn(value);
    setFt(numField(fi.ft));
    setInches(numField(fi.inches));
  }

  /** Apply URL hand-off values. Returns true when any were used. */
  function applyHandoff(h: Partial<Record<"sex" | "age" | "kg" | "cm", string>>) {
    let used = false;
    if (h.sex === "male" || h.sex === "female") {
      setSex(h.sex);
      used = true;
    }
    const a = handoffNumber(h.age, 15, 100);
    if (a != null) {
      setAge(numField(Math.round(a)));
      used = true;
    }
    const k = handoffNumber(h.kg, 30, 300);
    if (k != null) {
      setKg(k, "kg");
      used = true;
    }
    const c = handoffNumber(h.cm, 120, 230);
    if (c != null) {
      setCm(c, "cm");
      used = true;
    }
    if (used) prefillDone.current = true;
    return used;
  }

  /* eslint-disable react-hooks/set-state-in-effect -- profile arrives async after hydration */
  useEffect(() => {
    if (!profile || prefillDone.current) return;
    prefillDone.current = true;
    if (profile.sex) setSex(profile.sex);
    if (profile.age != null) setAge(numField(profile.age));
    if (profile.kg != null) {
      const unit = profile.weightUnit ?? "kg";
      setWeightUnitRaw(unit);
      setWeight(roundNumField(unit === "kg" ? profile.kg : kgToLb(profile.kg)));
    }
    if (profile.cm != null) {
      const unit = profile.heightUnit ?? "cm";
      setHeightUnitRaw(unit);
      setHeightCm(roundNumField(profile.cm));
      const fi = cmToFtIn(profile.cm);
      setFt(numField(fi.ft));
      setInches(numField(fi.inches));
    }
    extrasRef.current?.(profile);
  }, [profile]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /** Profile fields for saving (only valid values). */
  function toProfile(): CalcProfile {
    const p: CalcProfile = { sex, weightUnit, heightUnit };
    if (validAge != null) p.age = Math.round(validAge);
    if (kg != null) p.kg = Math.round(kg * 10) / 10;
    if (cm != null) p.cm = Math.round(cm);
    return p;
  }

  return {
    sex,
    setSex,
    age,
    setAge,
    weight,
    setWeight,
    weightUnit,
    setWeightUnit,
    heightUnit,
    setHeightUnit,
    heightCm,
    setHeightCm,
    ft,
    setFt,
    inches,
    setInches,
    ageN: validAge,
    kg,
    cm,
    applyHandoff,
    toProfile,
    key: [sex, age, weight, weightUnit, heightUnit, heightCm, ft, inches].join("|"),
  };
}
