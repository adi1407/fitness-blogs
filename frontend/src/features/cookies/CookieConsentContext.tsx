"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CONSENT,
  readStoredConsent,
  writeStoredConsent,
  type CookieConsent,
} from "@/lib/cookies/consent";

type CookieConsentContextValue = {
  consent: CookieConsent | null;
  decided: boolean;
  bannerOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
  acceptAll: () => void;
  essentialOnly: () => void;
  savePreferences: (analytics: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

function makeDecision(analytics: boolean): CookieConsent {
  return {
    v: 1,
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
  };
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setBannerOpen(!stored);
  }, []);

  const persist = useCallback((next: CookieConsent) => {
    writeStoredConsent(next);
    setConsent(next);
    setBannerOpen(false);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent: consent ?? { ...DEFAULT_CONSENT },
      decided: Boolean(consent?.decidedAt),
      bannerOpen,
      openBanner: () => setBannerOpen(true),
      closeBanner: () => {
        if (consent?.decidedAt) setBannerOpen(false);
      },
      acceptAll: () => persist(makeDecision(true)),
      essentialOnly: () => persist(makeDecision(false)),
      savePreferences: (analytics: boolean) => persist(makeDecision(analytics)),
    }),
    [consent, bannerOpen, persist],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
