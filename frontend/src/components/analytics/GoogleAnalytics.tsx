"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCookieConsent } from "@/features/cookies/CookieConsentContext";
import { COOKIE_CONSENT_KEY } from "@/lib/cookies/consent";
import {
  ADSENSE_CLIENT,
  isAdSenseConfigured,
  OPT_IN_AD_REGIONS,
} from "@/lib/ads/adsense";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
const ADS_ON = isAdSenseConfigured();

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

/** GA cookies live on the registrable domain (e.g. `.fitlives.in`). */
function deleteGaCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const part of document.cookie.split("; ")) {
    const name = part.split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_") && name !== "_gid") continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${d ? `; Domain=${d}` : ""}`;
    }
  }
}

/**
 * GA4 with Consent Mode v2 (advanced): the tag loads for every visitor with
 * storage denied, so non-consenting visits send cookieless pings that GA can
 * model. “Accept cookies” grants `analytics_storage`. With AdSense on, ad
 * signals are granted until the visitor rejects (denied by default in
 * opt-in regions until Accept).
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX in Vercel Production.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent, decided } = useCookieConsent();
  const granted = consent?.analytics === true;
  const lastGranted = useRef<boolean | null>(null);

  useEffect(() => {
    if (typeof window.gtag !== "function" || !decided) return;
    if (lastGranted.current === granted) return;
    const wasGranted = lastGranted.current;
    lastGranted.current = granted;
    const ads = ADS_ON && granted ? "granted" : "denied";
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads,
    });
    if (wasGranted && !granted) deleteGaCookies();
  }, [granted, decided]);

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pagePath(pathname, searchParams),
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  if (!GA_ID) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
  );
}

/**
 * Render in the root `<head>`: defines `gtag` and the consent defaults before
 * hydration so no hit can be sent ahead of them. Reads the saved choice so
 * returning visitors who accepted are granted from the first page view.
 * AdSense is injected from here because React hoists async `<script>` tags
 * above inline ones, which could run it before the consent defaults.
 */
export function GoogleConsentInit() {
  if (!GA_ID && !ADS_ON) return null;
  const js = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var decided = false, accepted = false;
try {
  var m = document.cookie.match(/(?:^|; )${COOKIE_CONSENT_KEY}=([^;]*)/);
  var c = m ? JSON.parse(decodeURIComponent(m[1])) : null;
  decided = !!c && typeof c.analytics === 'boolean';
  accepted = decided && c.analytics === true;
} catch (e) {}
var ads = ${ADS_ON} && (decided ? accepted : true) ? 'granted' : 'denied';
gtag('consent', 'default', {
  analytics_storage: accepted ? 'granted' : 'denied',
  ad_storage: ads,
  ad_user_data: ads,
  ad_personalization: ads
});
if (!decided) {
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    region: ${JSON.stringify(OPT_IN_AD_REGIONS)}
  });
}
gtag('js', new Date());
${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: false });` : ""}
${
  ADS_ON
    ? `var s = document.createElement('script');
s.async = true;
s.crossOrigin = 'anonymous';
s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}';
document.head.appendChild(s);`
    : ""
}`;
  return <script id="ga4-consent" dangerouslySetInnerHTML={{ __html: js }} />;
}

export function isGoogleAnalyticsConfigured(): boolean {
  return Boolean(GA_ID);
}
