import { apiFetch } from "@/lib/api/client";

export type ClusterArticle = {
  id: string;
  title: string;
  status: string;
  path: string | null;
  linksIn: number;
  linksInSameTopic: number;
  linksOutSameTopic: number;
  /** Content links counted by the latest live-site crawl; null before a crawl. */
  liveContentLinks: number | null;
};

export type ClusterSubcategory = {
  slug: string;
  label: string;
  published: number;
  inProgress: number;
  noLinksIn: number;
  unlinkedPairCount: number;
  unlinkedPairs: { a: { id: string; title: string }; b: { id: string; title: string } }[];
  articles: ClusterArticle[];
};

export type ClusterCategory = {
  slug: string;
  label: string;
  published: number;
  gaps: number;
  subcategories: ClusterSubcategory[];
};

export function fetchClusterMap(): Promise<ClusterCategory[]> {
  return apiFetch<{ categories: ClusterCategory[] }>("/articles/cluster-map").then((d) => d.categories);
}
