import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/features/blog/components/ArticleCard";
import { BlogBreadcrumbs } from "@/features/blog/components/BlogBreadcrumbs";
import { fetchPublishedArticles } from "@/lib/api/blog";
import {
  findCategory,
  findSubcategory,
  isBlogCategorySlug,
} from "@/lib/blogTaxonomy";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type PageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  if (!category || !subcategory) {
    return { title: "Not found", robots: { index: false } };
  }

  const articles = await fetchPublishedArticles({
    category: category.slug,
    subcategory: subcategory.slug,
    limit: 1,
  });
  const description = `${subcategory.label} articles under ${category.label}. ${category.description}`;

  return {
    title: `${subcategory.label} — ${category.label}`,
    description,
    alternates: {
      canonical: `/blog/${category.slug}/${subcategory.slug}`,
    },
    robots: articles.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${subcategory.label} | fitlives`,
      description,
      url: `/blog/${category.slug}/${subcategory.slug}`,
    },
  };
}

export default async function BlogSubcategoryPage({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  if (!isBlogCategorySlug(categorySlug)) notFound();

  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  if (!category || !subcategory) notFound();

  const articles = await fetchPublishedArticles({
    category: category.slug,
    subcategory: subcategory.slug,
    limit: 48,
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.label,
        item: `${siteUrl}/blog/${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: subcategory.label,
        item: `${siteUrl}/blog/${category.slug}/${subcategory.slug}`,
      },
    ],
  };

  return (
    <main className="fk-page fk-page--content flex-1 py-12">
      <JsonLd data={breadcrumbLd} />
      <BlogBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.label, href: `/blog/${category.slug}` },
          { label: subcategory.label },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="fk-meta-accent">{category.label}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {subcategory.label}
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Practical, evidence-informed reading on {subcategory.label.toLowerCase()}{" "}
          within {category.label.toLowerCase()}. Educational content only —
          consult a professional for personal guidance.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Articles</h2>
        {articles.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-border px-5 py-8 text-sm text-muted-foreground">
            No published articles in this subcategory yet. Explore related
            topics under{" "}
            <Link
              href={`/blog/${category.slug}`}
              className="fk-link"
            >
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
      </section>
    </main>
  );
}
