import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { articleHref, articleImage } from "@/features/home/utils/articleMedia";

type HomeCategorySectionsProps = {
  articles: PublicBlogArticle[];
};

export function HomeCategorySections({ articles }: HomeCategorySectionsProps) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-4 pb-16 sm:px-6 lg:px-8">
      {BLOG_TAXONOMY.map((cat) => {
        const items = articles
          .filter((a) => a.categorySlug === cat.slug)
          .slice(0, 6);
        if (items.length === 0) return null;

        return (
          <section key={cat.slug} aria-labelledby={`home-cat-${cat.slug}`}>
            <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
              <div>
                <h2
                  id={`home-cat-${cat.slug}`}
                  className="text-2xl font-semibold tracking-tight"
                >
                  {cat.label}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {cat.description}
                </p>
              </div>
              <Link
                href={`/blog/${cat.slug}`}
                className="shrink-0 text-sm font-semibold text-primary hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((article) => {
                const href = articleHref(article);
                if (!href) return null;
                return (
                  <Link
                    key={article.id}
                    href={href}
                    className="group overflow-hidden rounded-xl border border-border bg-white transition hover:border-primary"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={articleImage(article)}
                        alt=""
                        className="size-full object-contain object-center transition group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-4">
                      {article.subcategoryLabel ? (
                        <p className="text-xs font-medium text-muted-foreground">
                          {article.subcategoryLabel}
                        </p>
                      ) : null}
                      <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground group-hover:text-primary line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt ? (
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {article.excerpt}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
