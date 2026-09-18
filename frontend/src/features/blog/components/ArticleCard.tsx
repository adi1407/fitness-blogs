import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import {
  articleHref,
  articleImage,
} from "@/features/home/utils/articleMedia";

type ArticleCardProps = {
  article: PublicBlogArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const href = articleHref(article);
  if (!href) return null;

  return (
    <article className="group border-b border-border py-5 last:border-b-0">
      <Link href={href} className="flex gap-4 sm:gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={articleImage(article)}
          alt=""
          className="h-20 w-28 shrink-0 rounded-lg object-cover sm:h-24 sm:w-36"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {article.categoryLabel && (
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-medium text-foreground ring-1 ring-brand-100">
                {article.categoryLabel}
              </span>
            )}
            {article.subcategoryLabel && <span>{article.subcategoryLabel}</span>}
            {article.readingTime > 0 && (
              <span>· {article.readingTime} min read</span>
            )}
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
            {article.title}
          </h3>
          {article.excerpt ? (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {article.excerpt}
            </p>
          ) : null}
          <span className="mt-3 inline-block text-sm font-semibold text-primary group-hover:underline">
            Read article →
          </span>
        </div>
      </Link>
    </article>
  );
}
