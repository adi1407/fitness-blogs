import type { NextFunction, Request, Response } from "express";

type Bucket = { count: number; resetAt: number };

type RateLimitOptions = {
  windowMs: number;
  max: number;
  key: (req: Request) => string;
  message?: string;
};

/**
 * Fixed-window, in-memory limiter. Per instance only — good enough for a single
 * Render web service; swap for Redis if the API is ever scaled horizontally.
 */
export function rateLimit({ windowMs, max, key, message }: RateLimitOptions) {
  const buckets = new Map<string, Bucket>();
  let nextSweep = Date.now() + windowMs;

  return (req: Request, res: Response, next: NextFunction): void => {
    const now = Date.now();
    if (now >= nextSweep) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      nextSweep = now + windowMs;
    }

    const id = key(req);
    const bucket = buckets.get(id);
    if (!bucket || bucket.resetAt <= now) {
      buckets.set(id, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    bucket.count += 1;
    if (bucket.count > max) {
      res.setHeader("Retry-After", Math.ceil((bucket.resetAt - now) / 1000));
      res.status(429).json({ message: message ?? "Too many requests. Try again later." });
      return;
    }
    next();
  };
}

/** Site proxy forwards the visitor IP; direct callers fall back to the socket IP. */
export function clientIp(req: Request): string {
  const forwarded = req.get("x-fitlives-client-ip")?.trim();
  return (forwarded || req.ip || "unknown").slice(0, 64);
}
