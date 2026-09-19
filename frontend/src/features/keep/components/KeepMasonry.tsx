"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { articleHref } from "@/features/home/utils/articleMedia";
import { KeepArticleCard } from "@/features/keep/components/KeepArticleCard";

type Props = {
  articles: PublicBlogArticle[];
  className?: string;
  /** Force denser columns (e.g. related section under article) */
  dense?: boolean;
  compact?: boolean;
  animate?: boolean;
};

export function KeepMasonry({
  articles,
  className = "",
  dense = false,
  compact = false,
  animate = true,
}: Props) {
  const reduceMotion = useReducedMotion();
  const items = articles.filter((a) => Boolean(articleHref(a)));
  if (items.length === 0) return null;

  const cols = dense
    ? "columns-1 gap-3 sm:columns-2 lg:columns-3"
    : "columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4";

  return (
    <div className={`${cols} ${className}`}>
      {items.map((article, i) => {
        const card = (
          <KeepArticleCard
            article={article}
            index={i}
            compact={compact}
          />
        );

        if (!animate || reduceMotion) {
          return (
            <div key={article.id} className="mb-3 break-inside-avoid">
              {card}
            </div>
          );
        }

        return (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.35,
              delay: Math.min(i * 0.03, 0.24),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-3 break-inside-avoid"
          >
            {card}
          </motion.div>
        );
      })}
    </div>
  );
}
