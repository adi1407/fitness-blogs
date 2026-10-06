import { z } from "zod";

/**
 * Recover a usable http(s) URL when env was pasted with a Windows path prefix, e.g.
 * `C:\Users\...\https:\host\api\v1\...` → `https://host/api/v1/...`
 */
function recoverHttpUrl(raw: string, fallback: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return fallback.replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed.replace(/\/$/, "");

  const normalized = trimmed
    .replace(/\\/g, "/")
    .replace(/https:\//i, "https://")
    .replace(/http:\//i, "http://");
  const match = normalized.match(/https?:\/\/[^\s"']+/i);
  if (match) {
    console.warn(
      `[backend] recovered mangled URL from env:\n  raw=${JSON.stringify(raw)}\n  → ${match[0]}`,
    );
    return match[0].replace(/\/$/, "");
  }
  return fallback.replace(/\/$/, "");
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  CORS_ORIGINS: z
    .string()
    .default(
      "http://localhost:3000,http://localhost:5173,https://fitness-blogs-liard.vercel.app",
    ),
  JWT_SECRET: z.string().min(8).default("dev-fitknowledge-jwt-change-me"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  /** Absolute origin for uploaded assets (e.g. https://api.example.com). Empty = request host. */
  PUBLIC_ASSET_BASE_URL: z.string().default(""),
  /** Public site origin for OAuth redirects (e.g. http://localhost:3000). */
  PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),
  /** Google OAuth for public members. Leave empty to disable until configured. */
  GOOGLE_CLIENT_ID: z.string().default(""),
  GOOGLE_CLIENT_SECRET: z.string().default(""),
  /** Must match Authorized redirect URI in Google Cloud Console. */
  GOOGLE_REDIRECT_URI: z
    .string()
    .default("http://localhost:4000/api/v1/public/auth/google/callback"),
  /** Comma-separated deep links the mobile app may receive the member token on. */
  MOBILE_AUTH_REDIRECTS: z.string().default("fitlives://auth"),
  /** Also allow Expo Go dev links (exp://…/--/auth). Keep false in production. */
  ALLOW_EXPO_GO_AUTH: z
    .string()
    .default("false")
    .transform((v) => v.trim().toLowerCase() === "true"),
  /** Cloudinary image storage. Either the three parts or `cloudinary://KEY:SECRET@CLOUD`. */
  CLOUDINARY_CLOUD_NAME: z.string().default(""),
  CLOUDINARY_API_KEY: z.string().default(""),
  CLOUDINARY_API_SECRET: z.string().default(""),
  CLOUDINARY_URL: z.string().default(""),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("[backend] invalid environment", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

function resolveCloudinary(data: z.infer<typeof envSchema>) {
  let cloudName = data.CLOUDINARY_CLOUD_NAME.trim();
  let apiKey = data.CLOUDINARY_API_KEY.trim();
  let apiSecret = data.CLOUDINARY_API_SECRET.trim();
  const url = data.CLOUDINARY_URL.trim();
  if (url) {
    try {
      const u = new URL(url);
      if (u.protocol === "cloudinary:") {
        cloudName ||= u.hostname;
        apiKey ||= decodeURIComponent(u.username);
        apiSecret ||= decodeURIComponent(u.password);
      }
    } catch {
      console.warn("[backend] CLOUDINARY_URL is not a valid cloudinary:// URL");
    }
  }
  return { cloudName, apiKey, apiSecret };
}

const defaultRedirect =
  "http://localhost:4000/api/v1/public/auth/google/callback";
const defaultSite = "http://localhost:3000";

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  databaseUrl: parsed.data.DATABASE_URL,
  corsOrigins: parsed.data.CORS_ORIGINS.split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  jwtSecret: parsed.data.JWT_SECRET,
  jwtExpiresIn: parsed.data.JWT_EXPIRES_IN,
  publicAssetBaseUrl: parsed.data.PUBLIC_ASSET_BASE_URL,
  publicSiteUrl: recoverHttpUrl(parsed.data.PUBLIC_SITE_URL, defaultSite),
  googleClientId: parsed.data.GOOGLE_CLIENT_ID.trim(),
  googleClientSecret: parsed.data.GOOGLE_CLIENT_SECRET.trim(),
  googleRedirectUri: recoverHttpUrl(
    parsed.data.GOOGLE_REDIRECT_URI,
    defaultRedirect,
  ),
  mobileAuthRedirects: parsed.data.MOBILE_AUTH_REDIRECTS.split(",")
    .map((r) => r.trim())
    .filter(Boolean),
  allowExpoGoAuth: parsed.data.ALLOW_EXPO_GO_AUTH,
  cloudinary: resolveCloudinary(parsed.data),
};
