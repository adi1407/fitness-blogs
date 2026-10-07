import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/features/blog/components/ArticleCard";
import { BlogBreadcrumbs } from "@/features/blog/components/BlogBreadcrumbs";
import { articleHref } from "@/features/home/utils/articleMedia";
import { fetchPublishedArticles } from "@/lib/api/blog";
import {
  findCategory,
  findSubcategory,
  isBlogCategorySlug,
  type BlogCategoryDef,
  type BlogSubcategoryDef,
} from "@/lib/blogTaxonomy";
import { OG_DEFAULTS, breadcrumbLd, collectionPageLd } from "@/lib/seo";

export const revalidate = 600;

type PageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

function subcategoryIntro(
  category: BlogCategoryDef,
  subcategory: BlogSubcategoryDef,
): string {
  return (
    subcategory.intro ??
    `Practical, evidence-informed reading on ${subcategory.label.toLowerCase()} within ${category.label.toLowerCase()}. Educational content only; consult a professional for personal guidance.`
  );
}

/** First sentence(s) of the intro that fit a meta description. */
function metaDescription(intro: string): string {
  if (intro.length <= 160) return intro;
  const sentences = intro.match(/[^.!?]+[.!?]+/g) ?? [intro];
  let out = "";
  for (const s of sentences) {
    const next = `${out}${s}`.trim();
    if (next.length > 160) break;
    out = `${next} `;
  }
  return out.trim() || `${intro.slice(0, 157).trimEnd()}...`;
}

function listArticles(category: string, subcategory: string, limit: number) {
  return fetchPublishedArticles({
    category,
    subcategory,
    limit,
    revalidate,
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  if (!category || !subcategory) {
    return { title: "Not found", robots: { index: false } };
  }

  const articles = await listArticles(category.slug, subcategory.slug, 48);
  const title = `${subcategory.label} Guides (${category.label})`;
  const description = metaDescription(subcategoryIntro(category, subcategory));
  const path = `/blog/${category.slug}/${subcategory.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: articles.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      ...OG_DEFAULTS,
      title: `${title} | fitlives`,
      description,
      url: path,
    },
  };
}

export default async function BlogSubcategoryPage({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  if (!isBlogCategorySlug(categorySlug)) notFound();

  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  if (!category || !subcategory) notFound();

  const articles = await listArticles(category.slug, subcategory.slug, 48);
  const path = `/blog/${category.slug}/${subcategory.slug}`;
  const intro = subcategoryIntro(category, subcategory);

  const listItems = articles.flatMap((a) => {
    const href = articleHref(a);
    return href && a.title ? [{ name: a.title, path: href }] : [];
  });

  return (
    <main className="fk-page fk-page--content flex-1 py-12">
      <JsonLd
        data={breadcrumbLd([
          ["Home", "/"],
          ["Blog", "/blog"],
          [category.label, `/${category.slug}`],
          [subcategory.label, path],
        ])}
      />
      {listItems.length > 0 ? (
        <JsonLd
          data={collectionPageLd({
            name: `${subcategory.label} guides`,
            description: metaDescription(intro),
            path,
            items: listItems,
          })}
        />
      ) : null}
      <BlogBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.label, href: `/${category.slug}` },
          { label: subcategory.label },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="fk-meta-accent">{category.label}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {subcategory.label}
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {intro}
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          {subcategory.label} articles
        </h2>
        {articles.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-border px-5 py-8 text-sm text-muted-foreground">
            No published articles in this subcategory yet. Explore related
            topics under{" "}
            <Link href={`/${category.slug}`} className="fk-link">
              {category.label}
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 divide-y divide-border border-t border-border">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
        <p className="mt-8 text-sm text-muted-foreground">
          More in{" "}
          <Link href={`/${category.slug}`} className="fk-link">
            the {category.label.toLowerCase()} guide
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
