"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isOpenPanelEnabled, trackPageView } from "@/lib/analytics/openpanel";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

/** Client analytics for App Router. Both providers run cookieless until consent. */
export function OpenPanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isOpenPanelEnabled()) return;
    const qs = searchParams?.toString();
    trackPageView(qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams]);

  return (
    <>
      <GoogleAnalytics />
      {children}
    </>
  );
}
