"use client";

import type { PublicBlogArticle } from "@/lib/api/blog";
import { HomeNewsCarouselHero } from "@/features/home/components/HomeNewsCarouselHero";
import { HomeKnowledgeKeepBand } from "@/features/home/components/HomeKnowledgeKeepBand";

type HomeMagazineProps = {
  articles: PublicBlogArticle[];
};

/** Home: news carousel hero, then Karakeep-style keep masonry. */
export function HomeMagazine({ articles }: HomeMagazineProps) {
  return (
    <>
      <HomeNewsCarouselHero articles={articles} />
      <HomeKnowledgeKeepBand articles={articles} />
    </>
  );
}
