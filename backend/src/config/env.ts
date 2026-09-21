import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:3000,http://localhost:5173"),
  JWT_SECRET: z.string().min(8).default("dev-fitknowledge-jwt-change-me"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  /** Absolute origin for uploaded assets (e.g. https://api.example.com). Empty = request host. */
  PUBLIC_ASSET_BASE_URL: z.string().default(""),
  /** Public site origin for OAuth redirects (e.g. http://localhost:3000). */
  PUBLIC_SITE_URL: z
    .string()
    .default("http://localhost:3000")
    .refine(
      (v) => /^https?:\/\//i.test(v),
      "PUBLIC_SITE_URL must start with http:// or https://",
    ),
  /** Google OAuth for public members. Leave empty to disable until configured. */
  GOOGLE_CLIENT_ID: z.string().default(""),
  GOOGLE_CLIENT_SECRET: z.string().default(""),
  /** Must match Authorized redirect URI in Google Cloud Console. */
  GOOGLE_REDIRECT_URI: z
    .string()
    .default("http://localhost:4000/api/v1/public/auth/google/callback")
    .refine(
      (v) => !v || /^https?:\/\//i.test(v),
      "GOOGLE_REDIRECT_URI must be a full http(s) URL (no Windows paths)",
    ),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("[backend] invalid environment", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

function normalizeHttpUrl(value: string) {
  return value.trim().replace(/\/$/, "");
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  databaseUrl: parsed.data.DATABASE_URL,
  corsOrigins: parsed.data.CORS_ORIGINS.split(",").map((o) => o.trim()),
  jwtSecret: parsed.data.JWT_SECRET,
  jwtExpiresIn: parsed.data.JWT_EXPIRES_IN,
  publicAssetBaseUrl: parsed.data.PUBLIC_ASSET_BASE_URL,
  publicSiteUrl: normalizeHttpUrl(parsed.data.PUBLIC_SITE_URL),
  googleClientId: parsed.data.GOOGLE_CLIENT_ID.trim(),
  googleClientSecret: parsed.data.GOOGLE_CLIENT_SECRET.trim(),
  googleRedirectUri: parsed.data.GOOGLE_REDIRECT_URI.trim(),
};
