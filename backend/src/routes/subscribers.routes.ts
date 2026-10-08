import { Router } from "express";
import { z } from "zod";
import { authorize } from "../middleware/auth";
import { clientIp, rateLimit } from "../middleware/rateLimit";
import {
  listSubscribers,
  subscriberSummary,
  subscribersCsv,
  unsubscribeByToken,
  upsertSubscriber,
  type SubscriberStatus,
} from "../services/subscribers";

const TEN_MINUTES = 10 * 60 * 1000;

const subscribeSchema = z.object({
  email: z.string().trim().email().max(254),
  source: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_-]{1,40}$/)
    .default("site"),
  /** Honeypot — real visitors never see or fill this field. */
  website: z.string().max(200).optional(),
});

const unsubscribeSchema = z.object({
  token: z.string().trim().min(16).max(64),
});

/** Mounted at /public — no auth. */
export const publicSubscribeRouter = Router();

publicSubscribeRouter.post(
  "/subscribe",
  rateLimit({ windowMs: TEN_MINUTES, max: 5, key: (req) => `sub:${clientIp(req)}` }),
  // Ceiling per connecting host so a rotated forwarded-IP header can't bypass the limit.
  rateLimit({ windowMs: TEN_MINUTES, max: 60, key: (req) => `sub-host:${req.ip}` }),
  async (req, res) => {
    const parsed = subscribeSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Please enter a valid email address." });
      return;
    }
    if (parsed.data.website) {
      res.json({ ok: true });
      return;
    }
    try {
      await upsertSubscriber(parsed.data.email, parsed.data.source);
      res.json({ ok: true });
    } catch (err) {
      console.error("[subscribe] failed", err);
      res.status(500).json({ message: "Could not subscribe right now. Please try again." });
    }
  },
);

publicSubscribeRouter.post(
  "/unsubscribe",
  rateLimit({ windowMs: TEN_MINUTES, max: 20, key: (req) => `unsub:${clientIp(req)}` }),
  async (req, res) => {
    const parsed = unsubscribeSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid unsubscribe link." });
      return;
    }
    try {
      const found = await unsubscribeByToken(parsed.data.token);
      if (!found) {
        res.status(404).json({ message: "This unsubscribe link is not valid." });
        return;
      }
      res.json({ ok: true });
    } catch (err) {
      console.error("[unsubscribe] failed", err);
      res.status(500).json({ message: "Could not unsubscribe right now. Please try again." });
    }
  },
);

function parseStatus(raw: unknown): SubscriberStatus {
  return raw === "unsubscribed" || raw === "all" ? raw : "active";
}

/** Mounted at /admin/subscribers — adminRouter already authenticates staff. */
export const adminSubscribersRouter = Router();

adminSubscribersRouter.get("/", authorize("admin", "editor"), async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
  const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 200) : "";
  try {
    const [list, summary] = await Promise.all([
      listSubscribers({
        status: parseStatus(req.query.status),
        search,
        limit,
        offset: (page - 1) * limit,
      }),
      subscriberSummary(),
    ]);
    res.json({ ...list, page, limit, summary });
  } catch (err) {
    console.error("[admin/subscribers] list failed", err);
    res.status(500).json({ message: "Could not load subscribers" });
  }
});

adminSubscribersRouter.get("/export.csv", authorize("admin"), async (req, res) => {
  try {
    const csv = await subscribersCsv(parseStatus(req.query.status));
    const day = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="fitlives-subscribers-${day}.csv"`);
    res.setHeader("Cache-Control", "no-store");
    res.send(csv);
  } catch (err) {
    console.error("[admin/subscribers] export failed", err);
    res.status(500).json({ message: "Could not export subscribers" });
  }
});
