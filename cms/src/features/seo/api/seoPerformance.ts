import { apiFetch } from "@/lib/api/client";

export type SeoMetrics = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number | null;
};

export type SeoSyncStatus = {
  configured: boolean;
  serviceAccountEmail: string | null;
  siteUrl: string | null;
  lastSuccessAt: string | null;
  dataThrough: string | null;
  lastRun: {
    status: "running" | "success" | "error";
    trigger: string;
    rows: number;
    error: string | null;
    startedAt: string;
    finishedAt: string | null;
  } | null;
  brandTerms: string[];
};

export type SeoSegment = "nonbrand" | "brand" | "all";
export type SeoRangeDays = 7 | 28 | 90 | 365;

type SplitPeriod = {
  brand: SeoMetrics;
  nonBrand: SeoMetrics;
  hidden: { clicks: number; impressions: number };
};

export type SeoDailyPoint = {
  date: string;
  clicks: number;
  impressions: number;
  nonBrandClicks: number;
  nonBrandImpressions: number;
};

export type SeoQueryRow = SeoMetrics & {
  query: string;
  topPage: { url: string; path: string } | null;
  pageCount: number;
};

export type SeoPageRow = SeoMetrics & {
  url: string;
  path: string;
  article: { id: string; title: string } | null;
};

export type SeoOverview =
  | { status: SeoSyncStatus; range: null }
  | {
      status: SeoSyncStatus;
      range: { start: string; end: string; days: number; previousStart: string; previousEnd: string };
      totals: { current: SeoMetrics; previous: SeoMetrics };
      split: { current: SplitPeriod; previous: SplitPeriod };
      daily: SeoDailyPoint[];
      segment: SeoSegment;
      queries: SeoQueryRow[];
      pages: SeoPageRow[];
    };

export function fetchSeoOverview(days: SeoRangeDays, segment: SeoSegment): Promise<SeoOverview> {
  return apiFetch<SeoOverview>(`/admin/seo/overview?days=${days}&segment=${segment}`);
}

export function startSeoSync(): Promise<{ started: boolean }> {
  return apiFetch<{ started: boolean }>("/admin/seo/sync", { method: "POST" });
}
