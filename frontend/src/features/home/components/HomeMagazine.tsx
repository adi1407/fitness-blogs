"use client";

import type { PublicBlogArticle } from "@/lib/api/blog";
import { HomePillarsHero } from "@/features/home/components/HomePillarsHero";
import { HomeKnowledgeKeepBand } from "@/features/home/components/HomeKnowledgeKeepBand";
import { HomeScrollMorphBand } from "@/features/home/components/HomeScrollMorphBand";
import { HomeMasonryScrollBand } from "@/features/home/components/HomeMasonryScrollBand";
import { HomeFaqBand } from "@/features/home/components/HomeFaqBand";
import { HomeGhostFoldBand } from "@/features/home/components/HomeGhostFoldBand";

type HomeMagazineProps = {
  articles: PublicBlogArticle[];
};

/**
 * Home: pillars hero → keep masonry → scroll-morph → masonry fly-in →
 * FAQ → fold/ghost CTA.
 */
export function HomeMagazine({ articles }: HomeMagazineProps) {
  return (
    <>
      <HomePillarsHero />
      <HomeKnowledgeKeepBand articles={articles} />
      <HomeScrollMorphBand />
      <HomeMasonryScrollBand />
      <HomeFaqBand />
      <HomeGhostFoldBand />
    </>
  );
}
