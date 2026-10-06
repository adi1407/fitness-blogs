import { API_URL } from "@/config";

/** Render's free tier cold-starts in ~15 s, so allow generous headroom. */
const TIMEOUT_MS = 20_000;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) {
      let message = `Request failed (${res.status})`;
      try {
        const body = (await res.json()) as { message?: string };
        if (body?.message) message = body.message;
      } catch {
        // non-JSON error body
      }
      throw new ApiError(message, res.status);
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (controller.signal.aborted && !signal?.aborted) {
      throw new ApiError("The server took too long to respond. Please try again.", null);
    }
    throw new ApiError("Couldn't reach fitlives. Check your connection.", null);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

/** Retry once on network/5xx errors; never on 4xx. */
export function shouldRetry(failureCount: number, error: unknown) {
  if (failureCount >= 1) return false;
  if (error instanceof ApiError && error.status != null && error.status < 500) return false;
  return true;
}
