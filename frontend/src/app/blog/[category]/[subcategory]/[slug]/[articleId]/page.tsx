import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogArticleView } from "@/features/blog/components/BlogArticleView";
import { fetchPublishedArticleBySlug } from "@/lib/api/blog";
import { ogImageUrl } from "@/lib/og/card";
import { OG_DEFAULTS, pageTitle } from "@/lib/seo";
import {
  findCategory,
  findSubcategory,
  isBlogCategorySlug,
} from "@/lib/blogTaxonomy";

export const revalidate = 300;

type PageProps = {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
    articleId: string;
  }>;
};

function canonicalPath(
  category: string,
  subcategory: string,
  slug: string,
  articleNumber: number,
): string {
  return `/blog/${category}/${subcategory}/${slug}/${articleNumber}`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, articleId } = await params;
  const payload = await fetchPublishedArticleBySlug(slug);
  if (!payload) {
    return { title: "Article not found", robots: { index: false } };
  }
  const { article } = payload;
  if (
    article.articleNumber != null &&
    String(article.articleNumber) !== articleId
  ) {
    return {
      title: pageTitle(article.metaTitle || article.title),
      alternates: { canonical: article.path ?? undefined },
    };
  }

  const title = pageTitle(article.metaTitle || article.title);
  const description =
    article.metaDescription ||
    article.excerpt ||
    article.quickAnswer ||
    "Educational fitness article from fitlives.";

  const shareImage =
    article.ogImage ||
    article.featuredImage ||
    ogImageUrl({
      title: article.title,
      eyebrow: article.subcategoryLabel || article.categoryLabel || undefined,
    });

  return {
    title,
    description,
    robots:
      article.robotsIndex === false
        ? { index: false, follow: true }
        : undefined,
    alternates: {
      canonical: article.path ?? undefined,
    },
    openGraph: {
      ...OG_DEFAULTS,
      title,
      description,
      url: article.path ?? undefined,
      type: "article",
      images: [shareImage],
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default async function BlogArticleByIdPage({ params }: PageProps) {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
    slug,
    articleId,
  } = await params;

  if (!isBlogCategorySlug(categorySlug)) notFound();
  if (!/^\d{9}$/.test(articleId)) notFound();

  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  if (!category || !subcategory) notFound();

  const payload = await fetchPublishedArticleBySlug(slug);
  if (!payload?.article?.slug) notFound();
  const { article, related } = payload;

  if (article.articleNumber == null) notFound();

  if (
    String(article.articleNumber) !== articleId ||
    (article.categorySlug &&
      article.subcategorySlug &&
      (article.categorySlug !== categorySlug ||
        article.subcategorySlug !== subcategorySlug))
  ) {
    permanentRedirect(
      canonicalPath(
        article.categorySlug || categorySlug,
        article.subcategorySlug || subcategorySlug,
        article.slug!,
        article.articleNumber,
      ),
    );
  }

  return (
    <BlogArticleView
      article={article}
      related={related}
      categoryLabel={category.label}
      subcategoryLabel={subcategory.label}
      categorySlug={category.slug}
      subcategorySlug={subcategory.slug}
    />
  );
}
