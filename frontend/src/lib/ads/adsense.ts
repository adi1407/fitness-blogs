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

export type AdPlacement = "article_mid" | "article_end" | "page_end";

const validSlot = (v: string | undefined) => (v && /^\d{8,12}$/.test(v.trim()) ? v.trim() : "");

/**
 * Manual ad unit IDs (AdSense → Ads → By ad unit). Each placement falls back
 * to NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT. Env vars are referenced literally so
 * Next.js inlines them into the client bundle.
 */
const DEFAULT_SLOT = validSlot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT);
const AD_SLOTS: Record<AdPlacement, string> = {
  article_mid: validSlot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MID) || DEFAULT_SLOT,
  article_end: validSlot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_END) || DEFAULT_SLOT,
  page_end: validSlot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_PAGE_END) || DEFAULT_SLOT,
};

/** Empty string when ads are off or no unit is configured for the placement. */
export function adSlotFor(placement: AdPlacement): string {
  return ADSENSE_CLIENT ? AD_SLOTS[placement] : "";
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
