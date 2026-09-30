/** Public by design — it is published in every site's ads.txt. */
const PRODUCTION_ADSENSE_CLIENT = "ca-pub-1696625365436242";

/**
 * Google AdSense publisher ID (`ca-pub-` + 16 digits). NEXT_PUBLIC_ADSENSE_CLIENT
 * overrides it; otherwise only production builds load ads (never `next dev`).
 * Invalid values disable ads.
 */
const raw =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ||
  (process.env.NODE_ENV === "production" ? PRODUCTION_ADSENSE_CLIENT : "");

export const ADSENSE_CLIENT = /^ca-pub-\d{16}$/.test(raw) ? raw : "";

export function isAdSenseConfigured(): boolean {
  return Boolean(ADSENSE_CLIENT);
}

/** `ads.txt` seller line; `pub-…` is the client ID without the `ca-` prefix. */
export function adsTxtLine(): string {
  return `google.com, ${ADSENSE_CLIENT.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0`;
}

/**
 * Regions where Google requires opt-in consent before personalised ads
 * (EEA, UK, Switzerland). Ad signals default to denied there until Accept.
 */
export const OPT_IN_AD_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];
