import type { ActivityId, Sex } from "@/lib/calc";
import { apiRequest } from "./client";

export type Member = {
  id: string;
  email: string;
  name: string;
  picture: string;
  createdAt: string;
  lastLoginAt: string | null;
};

export type LibraryArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  articleNumber: number | null;
  publishedAt: string | null;
  featuredImage: string;
  categorySlug: string | null;
  subcategorySlug: string | null;
  path: string | null;
  bookmarkedAt?: string;
  upvotedAt?: string;
};

export type Engagement = { upvoteCount: number; upvoted: boolean; bookmarked: boolean };

export type CalcProfile = {
  sex?: Sex;
  age?: number;
  kg?: number;
  cm?: number;
  activity?: ActivityId;
  goal?: "loss" | "maintain" | "gain";
  bodyFatPct?: number;
};

export type CalcResult = {
  id: string;
  tool: string;
  inputs: Record<string, string | number | boolean>;
  result: { label?: string; value?: number | string; unit?: string; [k: string]: unknown };
  createdAt: string;
};

const P = "/public";

export const fetchGoogleAuthUrl = (appRedirect: string) =>
  apiRequest<{ url: string }>(`${P}/auth/google?next=%2Faccount&app_redirect=${encodeURIComponent(appRedirect)}`);

export const fetchMe = (token: string, signal?: AbortSignal) =>
  apiRequest<{ member: Member }>(`${P}/auth/me`, { token, signal }).then((d) => d.member);

export const fetchBookmarks = (token: string, signal?: AbortSignal) =>
  apiRequest<{ bookmarks: LibraryArticle[] }>(`${P}/me/bookmarks`, { token, signal }).then((d) => d.bookmarks);

export const fetchUpvotes = (token: string, signal?: AbortSignal) =>
  apiRequest<{ upvotes: LibraryArticle[] }>(`${P}/me/upvotes`, { token, signal }).then((d) => d.upvotes);

export const fetchEngagement = (articleId: string, token: string | null, signal?: AbortSignal) =>
  apiRequest<Engagement>(`${P}/articles/${encodeURIComponent(articleId)}/engagement`, { token, signal });

export const setUpvote = (articleId: string, on: boolean, token: string) =>
  apiRequest<{ upvoted: boolean; upvoteCount: number }>(`${P}/articles/${encodeURIComponent(articleId)}/engagement/upvote`, {
    method: on ? "POST" : "DELETE",
    token,
  });

export const setBookmark = (articleId: string, on: boolean, token: string) =>
  apiRequest<{ bookmarked: boolean }>(`${P}/articles/${encodeURIComponent(articleId)}/engagement/bookmark`, {
    method: on ? "POST" : "DELETE",
    token,
  });

export const fetchCalcProfile = (token: string, signal?: AbortSignal) =>
  apiRequest<{ profile: CalcProfile | null; updatedAt: string | null }>(`${P}/me/calc-profile`, { token, signal });

export const saveCalcProfile = (profile: CalcProfile, token: string) =>
  apiRequest<{ profile: CalcProfile; updatedAt: string }>(`${P}/me/calc-profile`, { method: "PUT", body: { profile }, token });

export const fetchCalcResults = (token: string, signal?: AbortSignal) =>
  apiRequest<{ results: CalcResult[] }>(`${P}/me/calc-results`, { token, signal }).then((d) => d.results);

export const saveCalcResult = (
  input: { tool: string; inputs: Record<string, string | number | boolean>; result: { label: string; value: number; unit?: string } },
  token: string,
) => apiRequest<{ result: CalcResult }>(`${P}/me/calc-results`, { method: "POST", body: input, token }).then((d) => d.result);

export const deleteCalcResult = (id: string, token: string) =>
  apiRequest<{ ok: true }>(`${P}/me/calc-results/${encodeURIComponent(id)}`, { method: "DELETE", token });
