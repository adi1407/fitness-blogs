import "dotenv/config";
// Must load before any router is created: it wraps route handlers as they're
// registered so a rejected async handler reaches errorHandler instead of
// becoming an unhandled rejection that kills the process (Express 4).
import "express-async-errors";
import { createApp } from "./app";
import { env } from "./config/env";
import { ensureCmsSchema } from "./db/ensureCmsSchema";
import { migrateImagesToCloudinary } from "./services/migrateImagesToCloudinary";
import { startSearchConsoleSchedule } from "./services/searchConsole";

process.on("unhandledRejection", (reason) => {
  console.error("[backend] unhandled rejection", reason);
});

async function main() {
  await ensureCmsSchema();
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`[backend] listening on :${env.port} (${env.nodeEnv})`);
    migrateImagesToCloudinary().catch((err) => {
      console.error("[cloudinary-migrate] failed", err);
    });
    startSearchConsoleSchedule();
  });
}

main().catch((err) => {
  console.error("[backend] failed to start", err);
  process.exit(1);
});
