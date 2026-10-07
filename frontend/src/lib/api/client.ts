const API_BASE = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api/v1"
).replace(/\/$/, "");

export function getApiBase(): string {
  return API_BASE;
}

export type ApiFetchInit = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

export async function apiFetch<T>(
  path: string,
  init?: ApiFetchInit,
): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    // Uncached by default so publishes show immediately; callers that opt into
    // `next.revalidate` (static hubs) get ISR instead.
    ...(init?.next ? {} : { cache: "no-store" as const }),
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}
