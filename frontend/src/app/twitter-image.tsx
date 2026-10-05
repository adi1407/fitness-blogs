import { BRAND_NAME, BRAND_SLOGAN } from "@/lib/brand";
import { OG_SIZE, renderOgCard } from "@/lib/og/card";
import { getPublicSiteUrl } from "@/lib/siteUrl";

export const alt = `${BRAND_NAME} — ${BRAND_SLOGAN}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return renderOgCard({
    origin: getPublicSiteUrl(),
    eyebrow: "Guides · Calculators · Indian foods",
    title: BRAND_SLOGAN,
  });
}
