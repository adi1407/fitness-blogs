"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isOpenPanelEnabled, trackPageView } from "@/lib/analytics/openpanel";
import { useCookieConsent } from "@/features/cookies/CookieConsentContext";

/** Client page-view tracker for App Router — only after analytics consent. */
export function OpenPanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useCookieConsent();
  const analyticsOn = consent?.analytics === true;

  useEffect(() => {
    if (!isOpenPanelEnabled() || !analyticsOn) return;
    const qs = searchParams?.toString();
    trackPageView(qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams, analyticsOn]);

  return <>{children}</>;
}
