"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/features/cookies/CookieConsentContext";
import { cn } from "@/lib/utils";

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
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[1300] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-border bg-white p-4 shadow-2xl shadow-black/15 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white">
            <Cookie className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="cookie-banner-title"
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              Cookies on fitlives
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              <strong className="font-medium text-foreground">Accept</strong>{" "}
              allows optional analytics (OpenPanel) so we can improve guides.{" "}
              <strong className="font-medium text-foreground">Reject</strong>{" "}
              turns analytics off. Essential cookies still run either way
              (sign-in session and remembering this choice). We do not use
              advertising cookies.{" "}
              <Link href="/cookie-policy" className="fk-link text-sm">
                Cookie Policy
              </Link>
            </p>

            {customize ? (
              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 px-3 py-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 size-4 rounded border-input accent-[#0A0A0A]"
                />
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    Analytics
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                    Page views and events via OpenPanel. Rejecting optional
                    cookies leaves this off. Sign-in still works.
                  </span>
                </span>
              </label>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex h-9 items-center rounded-full bg-[#0A0A0A] px-4 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Accept cookies
              </button>
              <button
                type="button"
                onClick={essentialOnly}
                className="inline-flex h-9 items-center rounded-full border border-border bg-white px-4 text-sm font-semibold text-foreground transition hover:border-[#0A0A0A]"
              >
                Reject optional cookies
              </button>
              {customize ? (
                <button
                  type="button"
                  onClick={() => savePreferences(analytics)}
                  className="inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold text-white transition hover:opacity-90"
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
                  className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                >
                  Customize
                </button>
              )}
              {decided ? (
                <button
                  type="button"
                  onClick={closeBanner}
                  className={cn(
                    "ml-auto inline-flex h-9 items-center px-2 text-sm text-muted-foreground hover:text-foreground",
                  )}
                >
                  Close
                </button>
              ) : null}
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
