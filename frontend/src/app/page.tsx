import type { Metadata } from "next";
import { HomeMagazine } from "@/features/home/components/HomeMagazine";
import { fetchPublishedArticles } from "@/lib/api/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "FitKnowledge — Latest Fitness Guides & News",
  },
  description:
    "Latest FitKnowledge articles on muscle building, weight loss, and nutrition — plus free calculators and educational tools.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "FitKnowledge — Latest Fitness Guides & News",
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
