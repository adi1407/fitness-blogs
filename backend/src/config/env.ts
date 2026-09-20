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
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("[backend] invalid environment", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  databaseUrl: parsed.data.DATABASE_URL,
  corsOrigins: parsed.data.CORS_ORIGINS.split(",").map((o) => o.trim()),
  jwtSecret: parsed.data.JWT_SECRET,
  jwtExpiresIn: parsed.data.JWT_EXPIRES_IN,
  publicAssetBaseUrl: parsed.data.PUBLIC_ASSET_BASE_URL,
};
