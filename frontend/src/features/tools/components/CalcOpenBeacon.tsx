"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";

/** Marks that a visitor opened a calculator tool page. */
export function CalcOpenBeacon({ tool }: { tool: string }) {
  useEffect(() => {
    trackEvent("calc_open", { tool });
  }, [tool]);
  return null;
}
