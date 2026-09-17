import { Router } from "express";
import { pool } from "../db/pool";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  let database: "up" | "down" = "down";

  try {
    await pool.query("SELECT 1");
    database = "up";
  } catch {
    database = "down";
  }

  res.status(database === "up" ? 200 : 503).json({
    ok: database === "up",
    service: "fitness-backend",
    database,
    timestamp: new Date().toISOString(),
  });
});
