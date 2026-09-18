const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";

const TOKEN_KEY = "cms_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let message = `API ${response.status}: ${path}`;
    try {
      const data = (await response.json()) as { message?: string };
      if (data.message) message = data.message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export type StaffRole = "admin" | "editor" | "writer";

export type CmsUser = {
  id: string;
  email: string;
  name: string;
  role: StaffRole;
};

export type Article = {
  id: string;
  articleNumber: number | null;
  title: string;
  slug: string | null;
  excerpt: string;
  body: string;
  categoryId: string | null;
  subcategoryId: string | null;
  categorySlug: string | null;
  categoryLabel: string | null;
  subcategorySlug: string | null;
  subcategoryLabel: string | null;
  path: string | null;
  status: "draft" | "submitted" | "published" | "rejected" | "changes_requested";
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  primaryKeyword: string;
  ogImage: string;
  featuredImage: string;
  quickAnswer: string;
  tags: string[];
  topics: string[];
  views: number;
  readingTime: number;
  authorId: string | null;
  rejectReason: string;
  editorNote?: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StaffUser = {
  id: string;
  email: string;
  name: string;
  role: StaffRole;
  isActive: boolean;
  createdAt: string;
};

export type TaxonomyCategory = {
  id: string;
  slug: string;
  label: string;
  description: string;
  subcategories: { id: string; slug: string; label: string }[];
};
