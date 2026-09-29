"use client";

import { useCallback, useState } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";
import type { CalcTool } from "@/features/tools/types";

type Shown<T> = { value: T; run: number };

/**
 * Results are a snapshot taken when the user clicks Calculate. Editing any
 * input clears the snapshot, so a stale or half-typed result is never shown;
 * every Calculate click produces a fresh run.
 */
export function useCalcResult<T>(tool: CalcTool, inputsKey: string) {
  const [shown, setShown] = useState<Shown<T> | null>(null);
  const [prevKey, setPrevKey] = useState(inputsKey);

  if (prevKey !== inputsKey) {
    setPrevKey(inputsKey);
    setShown(null);
  }

  const runCalculate = useCallback(
    (value: T) => {
      setShown((prev) => ({ value, run: (prev?.run ?? 0) + 1 }));
      trackEvent("calc_complete", { tool });
    },
    [tool],
  );

  return {
    shown: shown?.value ?? null,
    runId: shown?.run ?? 0,
    runCalculate,
  };
}
