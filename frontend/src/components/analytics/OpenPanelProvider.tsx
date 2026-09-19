"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isOpenPanelEnabled, trackPageView } from "@/lib/analytics/openpanel";

/** Client page-view tracker for App Router. */
export function OpenPanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isOpenPanelEnabled()) return;
    const qs = searchParams?.toString();
    trackPageView(qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams]);

  return <>{children}</>;
}
