import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { ogImageUrl } from "@/lib/og/url";

export type CalculatorMeta = {
  title: string;
  description: string;
  h1: string;
  intro: string;
};

/** Root-level calculator URL, canonical, Open Graph + Twitter share card. */
export function calculatorMetadata(slug: string, meta: CalculatorMeta): Metadata {
  const path = `/${slug}`;
  const image = ogImageUrl({ title: meta.h1, eyebrow: "Free calculator" });
  const shareTitle = `${meta.title} | ${BRAND_NAME}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description: meta.description,
      url: path,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: meta.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: meta.description,
      images: [image],
    },
  };
}
