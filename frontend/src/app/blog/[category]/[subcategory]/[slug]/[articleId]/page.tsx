import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogArticleView } from "@/features/blog/components/BlogArticleView";
import { fetchPublishedArticleBySlug } from "@/lib/api/blog";
import {
  findCategory,
  findSubcategory,
  isBlogCategorySlug,
} from "@/lib/blogTaxonomy";

export const dynamic = "force-dynamic";

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
    return { title: article.metaTitle || article.title };
  }

  const title = article.metaTitle || article.title;
  const description =
    article.metaDescription ||
    article.excerpt ||
    article.quickAnswer ||
    "Educational fitness article from fitlives.";

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
      title,
      description,
      url: article.path ?? undefined,
      type: "article",
      images: article.ogImage || article.featuredImage
        ? [article.ogImage || article.featuredImage!]
        : undefined,
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

  if (
    article.articleNumber == null ||
    String(article.articleNumber) !== articleId
  ) {
    notFound();
  }

  if (
    article.categorySlug &&
    article.subcategorySlug &&
    (article.categorySlug !== categorySlug ||
      article.subcategorySlug !== subcategorySlug)
  ) {
    redirect(
      canonicalPath(
        article.categorySlug,
        article.subcategorySlug,
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
