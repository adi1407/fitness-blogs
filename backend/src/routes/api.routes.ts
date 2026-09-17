import { Router } from "express";

/**
 * Shared API for:
 * - frontend (Next.js public site)
 * - cms (React 19 dashboard)
 *
 * Feature routes will be mounted here as the product grows.
 */
export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    name: "fitness-api",
    version: "v1",
    clients: ["frontend", "cms"],
    message: "API scaffold ready",
  });
});
