import type { ReactNode } from "react";
import Link from "next/link";

type ArticleRef = { slug: string; href: string };

/**
 * Links to a cluster article only when it is published; otherwise renders
 * plain text (or nothing when `hideIfMissing` is set) so draft URLs never 404.
 */
export function MaybeArticleLink({
  article,
  isPublished,
  className,
  hideIfMissing = false,
  children,
}: {
  article: ArticleRef;
  isPublished: (article: ArticleRef) => boolean;
  className?: string;
  hideIfMissing?: boolean;
  children: ReactNode;
}) {
  if (!isPublished(article)) {
    return hideIfMissing ? null : <span className={className}>{children}</span>;
  }
  return (
    <Link href={article.href} className={className}>
      {children}
    </Link>
  );
}
