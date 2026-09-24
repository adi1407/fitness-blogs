"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCookieConsent } from "@/features/cookies/CookieConsentContext";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pagePath(pathname: string, searchParams: { toString(): string } | null) {
  const qs = searchParams?.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

/**
 * GA4 loads only after analytics cookie consent.
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX in Vercel Production.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useCookieConsent();
  const analyticsOn = consent?.analytics === true;

  useEffect(() => {
    if (!GA_ID || !analyticsOn || typeof window.gtag !== "function") return;
    window.gtag("config", GA_ID, {
      page_path: pagePath(pathname, searchParams),
      anonymize_ip: true,
    });
  }, [pathname, searchParams, analyticsOn]);

  if (!GA_ID || !analyticsOn) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}

export function isGoogleAnalyticsConfigured(): boolean {
  return Boolean(GA_ID);
}
