const API_BASE = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api/v1"
).replace(/\/$/, "");

/** A dead API must fail fast: a hung request stalls page renders and whole builds. */
const API_TIMEOUT_MS = 15_000;

export function getApiBase(): string {
  return API_BASE;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    path: string,
  ) {
    super(`API ${status}: ${path}`);
    this.name = "ApiError";
  }
}

/** True only when the API answered "not found" — not when it was unreachable. */
export function isApiNotFound(err: unknown): boolean {
  return err instanceof ApiError && err.status === 404;
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
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
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
    throw new ApiError(response.status, path);
  }

  return response.json() as Promise<T>;
}
