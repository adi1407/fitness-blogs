/**
 * Google AdSense publisher ID (`ca-pub-` + 16 digits), set as
 * NEXT_PUBLIC_ADSENSE_CLIENT in Vercel. Invalid or missing values disable ads.
 */
const raw = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ?? "";

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
