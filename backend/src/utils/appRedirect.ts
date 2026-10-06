import { env } from "../config/env";

const stripTrailingSlash = (s: string) => s.replace(/\/+$/, "");

/**
 * Returns the normalised redirect if it is on the mobile allowlist, otherwise null.
 * Exact match (ignoring a trailing slash, query and hash) against MOBILE_AUTH_REDIRECTS;
 * Expo Go links (`exp://host:port/--/auth`) only when ALLOW_EXPO_GO_AUTH=true.
 */
export function allowedAppRedirect(raw: unknown): string | null {
  if (typeof raw !== "string" || !raw || raw.length > 500) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.username || url.password) return null;

  const base = stripTrailingSlash(`${url.protocol}//${url.host}${url.pathname}`);
  const allowed = env.mobileAuthRedirects.map(stripTrailingSlash);
  if (allowed.includes(base)) return base;

  if (
    env.allowExpoGoAuth &&
    (url.protocol === "exp:" || url.protocol === "exps:") &&
    stripTrailingSlash(url.pathname).endsWith("/--/auth")
  ) {
    return base;
  }
  return null;
}

/** Append query params to an app deep link. */
export function appRedirectWith(base: string, params: Record<string, string>) {
  const qs = new URLSearchParams(params).toString();
  return `${base}${base.includes("?") ? "&" : "?"}${qs}`;
}
