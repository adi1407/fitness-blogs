"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLiveArticleSlugs } from "@/features/tools/components/LiveArticleSlugs";

type ArticleRef = { slug: string; href: string };

/**
 * Calculator prose helper: link only when the article slug is in the live set
 * provided by `LiveArticleSlugsProvider`; otherwise render plain text.
 */
export function LiveArticleLink({
  article,
  className,
  children,
}: {
  article: ArticleRef;
  className?: string;
  children: ReactNode;
}) {
  const live = useLiveArticleSlugs();
  if (live && !live.has(article.slug)) {
    return <span className={className}>{children}</span>;
  }
  return (
    <Link href={article.href} className={className}>
      {children}
    </Link>
  );
}
