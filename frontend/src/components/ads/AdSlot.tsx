"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, adSlotFor, type AdPlacement } from "@/lib/ads/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  placement: AdPlacement;
  className?: string;
};

/**
 * Manual AdSense unit with reserved height so the page doesn't shift when the
 * ad loads. Renders nothing until a unit ID is configured for the placement.
 */
export function AdSlot({ placement, className = "" }: Props) {
  const slot = adSlotFor(placement);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const ins = insRef.current;
    if (!slot || !ins || ins.dataset.pushed) return;
    ins.dataset.pushed = "1";
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and duplicate pushes throw; the reserved space stays empty.
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside aria-label="Advertisement" className={`ad-slot ${className}`}>
      <p className="ad-slot__label">Advertisement</p>
      <ins
        ref={insRef}
        suppressHydrationWarning
        className="adsbygoogle ad-slot__unit"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="rectangle"
        data-full-width-responsive="false"
      />
    </aside>
  );
}
