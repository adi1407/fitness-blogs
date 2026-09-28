import "dotenv/config";
import { createApp } from "./app";
import { env } from "./config/env";
import { ensureCmsSchema } from "./db/ensureCmsSchema";
import { migrateImagesToCloudinary } from "./services/migrateImagesToCloudinary";

async function main() {
  await ensureCmsSchema();
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`[backend] listening on :${env.port} (${env.nodeEnv})`);
    migrateImagesToCloudinary().catch((err) => {
      console.error("[cloudinary-migrate] failed", err);
    });
  });
}

main().catch((err) => {
  console.error("[backend] failed to start", err);
  process.exit(1);
});
