import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";
import { HomeMagazine } from "@/features/home/components/HomeMagazine";
import { fetchPublishedArticles } from "@/lib/api/blog";
import { BRAND_NAME, BRAND_SLOGAN } from "@/lib/brand";
import { ogImageUrl } from "@/lib/og/url";

export const revalidate = 300;

const HOME_TITLE = `${BRAND_NAME} — ${BRAND_SLOGAN} | Fitness Guides`;
const HOME_DESCRIPTION = `${BRAND_SLOGAN} Evidence-informed articles on muscle building, weight loss, and nutrition — plus free calculators and educational tools.`;
const OG_DESCRIPTION =
  "Browse the latest evidence-informed fitness articles across muscle building, weight loss, and nutrition.";
const OG_IMAGE = ogImageUrl({
  title: "Fitness knowledge for real life",
  eyebrow: "Guides · Calculators · Indian foods",
});

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    ...OG_DEFAULTS,
    title: HOME_TITLE,
    description: OG_DESCRIPTION,
    url: "/",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "fitlives homepage" }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
};

export default async function HomePage() {
  const articles = await fetchPublishedArticles({ limit: 48, summary: true });

  return (
    <main className="flex w-full flex-1 flex-col">
      <HomeMagazine articles={articles} />
    </main>
  );
}
