import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("[api]", err);

  const status = typeof err?.status === "number" ? err.status : 500;

  res.status(status).json({
    error: true,
    message: status === 500 ? "Internal server error" : err.message,
  });
};
