import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/features/blog/components/BlogArticleView";
import { fetchArticlePreview } from "@/lib/api/blog";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { token } = await params;
  const payload = await fetchArticlePreview(token);
  if (!payload) {
    return {
      title: "Preview unavailable",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `Preview: ${payload.article.title || "Untitled"}`,
    robots: { index: false, follow: false },
  };
}

export default async function ArticlePreviewPage({ params }: PageProps) {
  const { token } = await params;
  const payload = await fetchArticlePreview(token);
  if (!payload) notFound();

  const { article, related } = payload;

  return (
    <BlogArticleView
      article={article}
      related={related}
      preview
      previewStatus={article.status}
    />
  );
}
