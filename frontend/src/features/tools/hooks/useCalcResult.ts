"use client";

import { useCallback, useState } from "react";

type Shown<T> = { value: T; run: number };

/**
 * Results are a snapshot taken when the user clicks Calculate. Editing any
 * input (or switching account) clears the snapshot, so a stale or half-typed
 * result is never shown; every Calculate click produces a fresh run.
 */
export function useCalcResult<T>(
  acknowledged: boolean,
  requestAck: () => void,
  inputsKey: string,
) {
  const [shown, setShown] = useState<Shown<T> | null>(null);
  const [pending, setPending] = useState<T | null>(null);
  const [prevKey, setPrevKey] = useState(inputsKey);

  if (prevKey !== inputsKey) {
    setPrevKey(inputsKey);
    setShown(null);
    setPending(null);
  }

  if (acknowledged && pending !== null) {
    setPending(null);
    setShown((prev) => ({ value: pending, run: (prev?.run ?? 0) + 1 }));
  }

  const runCalculate = useCallback(
    (value: T) => {
      if (acknowledged) {
        setShown((prev) => ({ value, run: (prev?.run ?? 0) + 1 }));
        return;
      }
      setPending(value);
      requestAck();
    },
    [acknowledged, requestAck],
  );

  return {
    shown: shown?.value ?? null,
    runId: shown?.run ?? 0,
    runCalculate,
  };
}
