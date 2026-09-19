"use client";

import type { PublicBlogArticle } from "@/lib/api/blog";
import { HomeNewsCarouselHero } from "@/features/home/components/HomeNewsCarouselHero";
import { HomeKnowledgeKeepBand } from "@/features/home/components/HomeKnowledgeKeepBand";
import { HomeGhostFoldBand } from "@/features/home/components/HomeGhostFoldBand";

type HomeMagazineProps = {
  articles: PublicBlogArticle[];
};

/** Home: news carousel hero, keep masonry, then fold/ghost CTA band. */
export function HomeMagazine({ articles }: HomeMagazineProps) {
  return (
    <>
      <HomeNewsCarouselHero articles={articles} />
      <HomeKnowledgeKeepBand articles={articles} />
      <HomeGhostFoldBand />
    </>
  );
}
