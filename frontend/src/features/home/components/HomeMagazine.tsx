import { getApiBase } from "@/lib/api/client";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { HomeHeroSlider } from "@/features/home/components/HomeHeroSlider";
import { HomeLatestList } from "@/features/home/components/HomeLatestList";
import { HomeCategorySections } from "@/features/home/components/HomeCategorySections";

type HomeMagazineProps = {
  articles: PublicBlogArticle[];
};

export function HomeMagazine({ articles }: HomeMagazineProps) {
  const latest = articles.slice(0, 5);
  const apiIsLocalhost = getApiBase().includes("localhost");

  if (articles.length === 0) {
    return (
      <section className="mx-auto w-full max-w-3xl flex-1 px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">FitKnowledge</h1>
        <p className="mt-4 text-muted-foreground">
          No published articles yet. Check back soon — or browse Tools while the
          library grows.
        </p>
        {apiIsLocalhost ? (
          <p className="mt-4 text-sm text-red-600">
            Site API is still pointed at localhost. Set{" "}
            <code className="font-mono">API_URL</code> to your Render API and
            redeploy.
          </p>
        ) : null}
      </section>
    );
  }

  return (
    <>
      <h1 className="sr-only">FitKnowledge — latest fitness guides and news</h1>
      <HomeHeroSlider articles={latest} />
      <HomeLatestList articles={latest} />
      <HomeCategorySections articles={articles} />
    </>
  );
}
