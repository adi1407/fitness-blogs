"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Per-visit results reveal. Educational ack stays global; results stay hidden
 * until the user clicks Calculate on this tool entry.
 */
export function useCalcReveal(
  acknowledged: boolean,
  requestAck: () => void,
  resetKey?: string | null,
) {
  const [revealed, setRevealed] = useState(false);
  const pendingRef = useRef(false);

  useEffect(() => {
    setRevealed(false);
    pendingRef.current = false;
  }, [resetKey]);

  useEffect(() => {
    if (acknowledged && pendingRef.current) {
      pendingRef.current = false;
      setRevealed(true);
    }
  }, [acknowledged]);

  const runCalculate = useCallback(() => {
    if (acknowledged) {
      setRevealed(true);
      return true;
    }
    pendingRef.current = true;
    requestAck();
    return false;
  }, [acknowledged, requestAck]);

  return { revealed, runCalculate };
}
