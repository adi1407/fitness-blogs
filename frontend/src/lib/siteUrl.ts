/** Canonical public site origin for SEO, OG, and share/copy links. */
export const PUBLIC_SITE_ORIGIN = "https://fitlives.in";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function isLocalOrDevHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "0.0.0.0" ||
    h.endsWith(".local") ||
    h.endsWith(".localhost")
  );
}

/**
 * Public origin for absolute links.
 * Never returns localhost — falls back to fitlives.in so share/copy
 * always uses the live domain even when developing locally.
 */
export function getPublicSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  if (!raw) return PUBLIC_SITE_ORIGIN;
  try {
    const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (isLocalOrDevHost(u.hostname)) return PUBLIC_SITE_ORIGIN;
    return stripTrailingSlash(`${u.protocol}//${u.host}`);
  } catch {
    return PUBLIC_SITE_ORIGIN;
  }
}

/**
 * Build or rewrite an absolute URL for sharing/copying.
 * Paths stay the same; localhost (and similar) hosts become fitlives.in.
 */
export function toPublicShareUrl(urlOrPath: string): string {
  const base = getPublicSiteUrl();
  const input = urlOrPath.trim();
  if (!input) return base;

  if (input.startsWith("/")) {
    return `${base}${input}`;
  }

  try {
    const u = new URL(input);
    if (isLocalOrDevHost(u.hostname)) {
      return `${base}${u.pathname}${u.search}${u.hash}`;
    }
    return u.toString();
  } catch {
    return `${base}/${input.replace(/^\//, "")}`;
  }
}
