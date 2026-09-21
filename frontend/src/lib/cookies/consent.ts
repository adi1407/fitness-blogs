export const COOKIE_CONSENT_KEY = "fk_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export type CookieConsent = {
  v: 1;
  /** Always true — required for sign-in and security. */
  necessary: true;
  /** OpenPanel page views and events. Off until the visitor opts in. */
  analytics: boolean;
  decidedAt: string;
};

export const DEFAULT_CONSENT: CookieConsent = {
  v: 1,
  necessary: true,
  analytics: false,
  decidedAt: "",
};

export function parseConsent(raw: string | null | undefined): CookieConsent | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<CookieConsent>;
    if (data.v !== 1 || typeof data.analytics !== "boolean") return null;
    return {
      v: 1,
      necessary: true,
      analytics: data.analytics,
      decidedAt: typeof data.decidedAt === "string" ? data.decidedAt : "",
    };
  } catch {
    return null;
  }
}

export function readStoredConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;
  const fromCookie = readCookie(COOKIE_CONSENT_KEY);
  const parsed = parseConsent(fromCookie);
  if (parsed) return parsed;
  try {
    return parseConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
  } catch {
    return null;
  }
}

export function writeStoredConsent(consent: CookieConsent) {
  const value = JSON.stringify(consent);
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore quota / private mode */
  }
  if (typeof document === "undefined") return;
  const encoded = encodeURIComponent(value);
  document.cookie = `${COOKIE_CONSENT_KEY}=${encoded}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax`;
}

export function hasAnalyticsConsent(): boolean {
  return readStoredConsent()?.analytics === true;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split("; ");
  const prefix = `${name}=`;
  for (const part of parts) {
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }
  return null;
}
