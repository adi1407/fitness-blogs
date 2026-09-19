import type { PublicBlogArticle } from "@/lib/api/blog";
import { HomeKnowledgeKeepBand } from "@/features/home/components/HomeKnowledgeKeepBand";

type HomeMagazineProps = {
  articles: PublicBlogArticle[];
};

/** Home shell: Karakeep-style keep only (no sphere / gallery stack). */
export function HomeMagazine({ articles }: HomeMagazineProps) {
  return <HomeKnowledgeKeepBand articles={articles} />;
}
