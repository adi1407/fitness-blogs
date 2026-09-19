"use client";

import type { PublicBlogArticle } from "@/lib/api/blog";
import { HomeNewsCarouselHero } from "@/features/home/components/HomeNewsCarouselHero";
import { HomeKnowledgeKeepBand } from "@/features/home/components/HomeKnowledgeKeepBand";
import { HomeScrollMorphBand } from "@/features/home/components/HomeScrollMorphBand";
import { HomeMasonryScrollBand } from "@/features/home/components/HomeMasonryScrollBand";
import { HomeFaqBand } from "@/features/home/components/HomeFaqBand";
import { HomeGhostFoldBand } from "@/features/home/components/HomeGhostFoldBand";

type HomeMagazineProps = {
  articles: PublicBlogArticle[];
};

/**
 * Home composition: carousel → keep → scroll-morph resolver → masonry
 * fly-in → FAQ scroller → fold/ghost CTA.
 */
export function HomeMagazine({ articles }: HomeMagazineProps) {
  return (
    <>
      <HomeNewsCarouselHero articles={articles} />
      <HomeKnowledgeKeepBand articles={articles} />
      <HomeScrollMorphBand />
      <HomeMasonryScrollBand />
      <HomeFaqBand />
      <HomeGhostFoldBand />
    </>
  );
}
