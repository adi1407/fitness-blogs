import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";
import { HomeMagazine } from "@/features/home/components/HomeMagazine";
import { fetchPublishedArticles } from "@/lib/api/blog";
import { BRAND_NAME, BRAND_SLOGAN } from "@/lib/brand";

export const revalidate = 300;

const HOME_TITLE = `${BRAND_NAME} — ${BRAND_SLOGAN} | Fitness Guides`;

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: `${BRAND_SLOGAN} Evidence-informed articles on muscle building, weight loss, and nutrition — plus free calculators and educational tools.`,
  alternates: { canonical: "/" },
  openGraph: {
    ...OG_DEFAULTS,
    title: HOME_TITLE,
    description:
      "Browse the latest evidence-informed fitness articles across muscle building, weight loss, and nutrition.",
    url: "/",
  },
};

export default async function HomePage() {
  const articles = await fetchPublishedArticles({ limit: 48 });

  return (
    <main className="flex w-full flex-1 flex-col">
      <HomeMagazine articles={articles} />
    </main>
  );
}
