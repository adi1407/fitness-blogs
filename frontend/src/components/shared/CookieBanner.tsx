"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/features/cookies/CookieConsentContext";
import { cn } from "@/lib/utils";

const primaryBtn =
  "inline-flex h-11 items-center justify-center rounded-full bg-[#0A0A0A] px-4 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:ring-offset-2 sm:h-9";
const secondaryBtn =
  "inline-flex h-11 items-center justify-center rounded-full border border-border bg-white px-4 text-sm font-semibold text-foreground transition hover:border-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:ring-offset-2 sm:h-9";
const textBtn =
  "inline-flex h-11 items-center px-2 text-sm font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800] sm:h-9";

export function CookieBanner() {
  const {
    consent,
    bannerOpen,
    closeBanner,
    acceptAll,
    essentialOnly,
    savePreferences,
    decided,
  } = useCookieConsent();
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);

  if (!bannerOpen) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[1300] sm:p-4"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
    >
      {/* Mobile: full-width bottom sheet that scrolls inside itself; sm+: floating card. */}
      <div className="pointer-events-auto mx-auto max-h-[85dvh] max-w-3xl overflow-y-auto overscroll-contain rounded-t-2xl border-t border-border bg-white px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] sm:max-h-none sm:overflow-visible sm:rounded-2xl sm:border sm:p-5 sm:shadow-2xl sm:shadow-black/15">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 hidden size-9 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white sm:inline-flex">
            <Cookie className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="cookie-banner-title"
              className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground sm:text-sm"
            >
              <Cookie className="size-4 shrink-0 sm:hidden" aria-hidden />
              Cookies on fitlives
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
              We count visits anonymously without cookies.{" "}
              <strong className="font-medium text-foreground">Accept</strong>{" "}
              also allows Google Analytics cookies and sign-in (upvotes,
              bookmarks, saved results).{" "}
              <strong className="font-medium text-foreground">Reject</strong>{" "}
              keeps cookieless counts only, with non-personalised ads and no
              sign-in. Ads keep the site free.{" "}
              <Link href="/cookie-policy" className="fk-link">
                Cookie Policy
              </Link>
            </p>

            {customize ? (
              <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 px-3 py-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-0.5 size-5 shrink-0 rounded border-input accent-[#0A0A0A] sm:size-4"
                />
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    Analytics cookies &amp; sign-in
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                    Google Analytics cookies and the sign-in session cookie.
                    Leaving this off keeps cookieless page counts only and
                    signs you out.
                  </span>
                </span>
              </label>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={acceptAll}
                aria-label="Accept cookies"
                className={primaryBtn}
              >
                <span className="sm:hidden">Accept</span>
                <span className="hidden sm:inline">Accept cookies</span>
              </button>
              <button
                type="button"
                onClick={essentialOnly}
                aria-label="Reject optional cookies"
                className={secondaryBtn}
              >
                <span className="sm:hidden">Reject optional</span>
                <span className="hidden sm:inline">Reject optional cookies</span>
              </button>

              <div className="col-span-2 flex items-center justify-between gap-2 sm:contents">
                {customize ? (
                  <button
                    type="button"
                    onClick={() => savePreferences(analytics)}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-full px-4 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 sm:h-9 sm:flex-none"
                    style={{ background: "#FF9800" }}
                  >
                    Save choices
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAnalytics(consent?.analytics ?? false);
                      setCustomize(true);
                    }}
                    className={cn(textBtn, "-ml-2 sm:ml-0")}
                  >
                    Customize
                  </button>
                )}
                {decided ? (
                  <button
                    type="button"
                    onClick={closeBanner}
                    className={cn(textBtn, "sm:ml-auto")}
                  >
                    Close
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openBanner } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openBanner}
      className={cn("fk-link text-xs", className)}
    >
      Cookie settings
    </button>
  );
}
