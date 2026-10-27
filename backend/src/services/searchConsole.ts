import { createSign } from "node:crypto";
import type { PoolClient } from "pg";
import { env } from "../config/env";
import { pool } from "../db/pool";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://searchconsole.googleapis.com/webmasters/v3";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const LOCK_KEY = 874_201_118;
const ROW_LIMIT = 25_000;
const MAX_PAGES_PER_DATASET = 40;
/** Search Console keeps about 16 months. */
const BACKFILL_DAYS = 480;
/** "Final" data can still shift for a few days, so every run re-reads the recent window. */
const RESYNC_DAYS = 10;
const SYNC_EVERY_MS = 12 * 60 * 60 * 1000;
const CHECK_EVERY_MS = 60 * 60 * 1000;
const INSERT_CHUNK = 5_000;

export type ServiceAccount = { clientEmail: string; privateKey: string };
type Dimension = "date" | "query" | "page";
type ApiRow = { keys: string[]; clicks: number; impressions: number; position: number };

/**
 * One table per dimension set. Totals come from the date-only rows: Google drops
 * rare (anonymized) queries from query rows and counts impressions per URL in page
 * rows, so neither sums to the site total.
 */
const DATASETS: { table: string; dimensions: Dimension[] }[] = [
  { table: "gsc_site_daily", dimensions: ["date"] },
  { table: "gsc_query_daily", dimensions: ["date", "query"] },
  { table: "gsc_page_daily", dimensions: ["date", "page"] },
  { table: "gsc_page_query_daily", dimensions: ["date", "page", "query"] },
];

let account: ServiceAccount | null | undefined;

export function gscServiceAccount(): ServiceAccount | null {
  if (account !== undefined) return account;
  account = null;
  const raw = env.gsc.serviceAccountJson;
  if (!raw) return account;
  try {
    const text = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const parsed = JSON.parse(text) as { client_email?: unknown; private_key?: unknown };
    if (typeof parsed.client_email === "string" && typeof parsed.private_key === "string") {
      account = {
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key.replace(/\\n/g, "\n"),
      };
    } else {
      console.error("[gsc] GSC_SERVICE_ACCOUNT_JSON has no client_email/private_key");
    }
  } catch {
    console.error("[gsc] GSC_SERVICE_ACCOUNT_JSON is not valid JSON (raw or base64)");
  }
  return account;
}

let token: { value: string; expiresAt: number } | null = null;

async function accessToken(sa: ServiceAccount): Promise<string> {
  if (token && token.expiresAt > Date.now() + 60_000) return token.value;
  const now = Math.floor(Date.now() / 1000);
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: sa.clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })}`;
  let signature: string;
  try {
    signature = createSign("RSA-SHA256").update(unsigned).sign(sa.privateKey).toString("base64url");
  } catch {
    throw new Error(
      "The service account key could not be read. Paste the whole downloaded JSON key file into GSC_SERVICE_ACCOUNT_JSON.",
    );
  }
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };
  if (!res.ok || !data.access_token) {
    throw new Error(`Google sign-in failed: ${data.error_description || data.error || res.status}`);
  }
  token = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return token.value;
}

/** `path` is relative to the Webmasters v3 API unless it is an absolute https URL. */
export async function googleApi<T>(sa: ServiceAccount, path: string, body?: object): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(path.startsWith("https://") ? path : `${API_BASE}${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${await accessToken(sa)}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(60_000),
    });
    if (res.ok) return (await res.json()) as T;
    const retryable = res.status === 429 || res.status >= 500;
    if (retryable && attempt < 3) {
      await new Promise((r) => setTimeout(r, 2_000 * 2 ** attempt));
      continue;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    throw new Error(`Search Console API ${res.status}: ${data.error?.message ?? res.statusText}`);
  }
}

/** The live site, even in local development (dev talks to production Google data). */
export function publicSiteOrigin(): string {
  const site = env.publicSiteUrl;
  return /localhost|127\.0\.0\.1/.test(site) ? "https://fitlives.in" : site.replace(/\/$/, "");
}

function siteHost(): string {
  return new URL(publicSiteOrigin()).hostname.replace(/^www\./, "");
}

export async function resolveSiteUrl(sa: ServiceAccount): Promise<string> {
  if (env.gsc.siteUrl) return env.gsc.siteUrl;
  const data = await googleApi<{ siteEntry?: { siteUrl: string; permissionLevel: string }[] }>(sa, "/sites");
  const owned = new Set(
    (data.siteEntry ?? [])
      .filter((s) => s.permissionLevel !== "siteUnverifiedUser")
      .map((s) => s.siteUrl),
  );
  const host = siteHost();
  const match = [`sc-domain:${host}`, `https://${host}/`, `https://www.${host}/`].find((u) => owned.has(u));
  if (!match) {
    throw new Error(
      `${sa.clientEmail} cannot read a ${host} property. Add it in Search Console → Settings → Users and permissions.`,
    );
  }
  return match;
}

async function fetchDataset(
  sa: ServiceAccount,
  siteUrl: string,
  dimensions: Dimension[],
  startDate: string,
  endDate: string,
): Promise<ApiRow[]> {
  const rows: ApiRow[] = [];
  for (let page = 0; page < MAX_PAGES_PER_DATASET; page++) {
    const data = await googleApi<{ rows?: ApiRow[] }>(
      sa,
      `/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      { startDate, endDate, dimensions, type: "web", rowLimit: ROW_LIMIT, startRow: page * ROW_LIMIT },
    );
    const batch = data.rows ?? [];
    for (const row of batch) rows.push(row);
    if (batch.length < ROW_LIMIT) return rows;
  }
  console.warn(`[gsc] ${dimensions.join("+")} capped at ${rows.length} rows`);
  return rows;
}

async function replaceWindow(
  client: PoolClient,
  table: string,
  dimensions: Dimension[],
  rows: ApiRow[],
  startDate: string,
  endDate: string,
): Promise<void> {
  await client.query(`DELETE FROM ${table} WHERE date BETWEEN $1 AND $2`, [startDate, endDate]);
  const records = rows.map((r) => {
    const rec: Record<string, string | number> = {
      clicks: Math.round(r.clicks),
      impressions: Math.round(r.impressions),
      position: r.position,
    };
    dimensions.forEach((d, i) => {
      rec[d] = r.keys[i];
    });
    return rec;
  });
  const columns = [...dimensions, "clicks", "impressions", "position"];
  const types: Record<string, string> = {
    date: "date",
    query: "text",
    page: "text",
    clicks: "int",
    impressions: "int",
    position: "real",
  };
  const recordset = columns.map((c) => `${c} ${types[c]}`).join(", ");
  for (let i = 0; i < records.length; i += INSERT_CHUNK) {
    await client.query(
      `INSERT INTO ${table} (${columns.join(", ")})
       SELECT ${columns.join(", ")} FROM jsonb_to_recordset($1::jsonb) AS x(${recordset})`,
      [JSON.stringify(records.slice(i, i + INSERT_CHUNK))],
    );
  }
}

function isoDay(offsetDays: number, from = new Date()): string {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export type GscSyncResult =
  | { status: "skipped"; reason: string }
  | { status: "success"; rows: number; startDate: string; endDate: string }
  | { status: "error"; error: string };

/**
 * Pull Search Console data into Postgres. The first run backfills ~16 months; later
 * runs replace the last RESYNC_DAYS (or since the last success, if longer) in one
 * transaction, so readers never see a half-written window.
 */
export async function syncSearchConsole(trigger: "schedule" | "manual"): Promise<GscSyncResult> {
  const sa = gscServiceAccount();
  if (!sa) return { status: "skipped", reason: "not configured" };

  const client = await pool.connect();
  try {
    const lock = await client.query<{ ok: boolean }>(`SELECT pg_try_advisory_lock($1) AS ok`, [LOCK_KEY]);
    if (!lock.rows[0]?.ok) return { status: "skipped", reason: "a sync is already running" };

    let runId: string | null = null;
    let inTransaction = false;
    try {
      await client.query(
        `UPDATE gsc_sync_runs SET status = 'error', error = 'Interrupted (server restarted)', finished_at = NOW()
         WHERE status = 'running'`,
      );
      const run = await client.query<{ id: string }>(
        `INSERT INTO gsc_sync_runs (trigger) VALUES ($1) RETURNING id`,
        [trigger],
      );
      runId = run.rows[0].id;

      const last = await client.query<{ range_end: string | null }>(
        `SELECT to_char(MAX(range_end), 'YYYY-MM-DD') AS range_end FROM gsc_sync_runs WHERE status = 'success'`,
      );
      const endDate = isoDay(-1);
      const earliest = isoDay(-BACKFILL_DAYS);
      const lastEnd = last.rows[0]?.range_end;
      const resumeFrom = lastEnd ? isoDay(-3, new Date(`${lastEnd}T00:00:00Z`)) : earliest;
      // ISO dates sort as strings: start at whichever is earlier, but never before the backfill limit.
      const wanted = [resumeFrom, isoDay(-RESYNC_DAYS)].sort()[0];
      const startDate = wanted < earliest ? earliest : wanted;

      const siteUrl = await resolveSiteUrl(sa);
      const results = await Promise.all(
        DATASETS.map((d) => fetchDataset(sa, siteUrl, d.dimensions, startDate, endDate)),
      );

      await client.query("BEGIN");
      inTransaction = true;
      for (const [i, d] of DATASETS.entries()) {
        await replaceWindow(client, d.table, d.dimensions, results[i], startDate, endDate);
      }
      await client.query("COMMIT");
      inTransaction = false;

      const rows = results.reduce((n, r) => n + r.length, 0);
      await client.query(
        `UPDATE gsc_sync_runs
            SET status = 'success', site_url = $2, range_start = $3, range_end = $4,
                row_count = $5, finished_at = NOW()
          WHERE id = $1`,
        [runId, siteUrl, startDate, endDate, rows],
      );
      console.log(`[gsc] synced ${rows} rows for ${siteUrl} (${startDate} → ${endDate})`);
      return { status: "success", rows, startDate, endDate };
    } catch (err) {
      if (inTransaction) await client.query("ROLLBACK").catch(() => undefined);
      const message = (err instanceof Error ? err.message : String(err)).slice(0, 500);
      console.error("[gsc] sync failed:", message);
      if (runId) {
        await client
          .query(`UPDATE gsc_sync_runs SET status = 'error', error = $2, finished_at = NOW() WHERE id = $1`, [
            runId,
            message,
          ])
          .catch(() => undefined);
      }
      return { status: "error", error: message };
    } finally {
      await client.query(`SELECT pg_advisory_unlock($1)`, [LOCK_KEY]).catch(() => undefined);
    }
  } finally {
    client.release();
  }
}

/** Sync on boot and then every SYNC_EVERY_MS (checked hourly; the API is kept awake). */
export function startSearchConsoleSchedule(): void {
  if (!gscServiceAccount()) {
    console.log("[gsc] sync off: GSC_SERVICE_ACCOUNT_JSON not set");
    return;
  }
  const tick = async () => {
    try {
      const last = await pool.query<{ started_at: Date }>(
        `SELECT started_at FROM gsc_sync_runs WHERE status = 'success' ORDER BY started_at DESC LIMIT 1`,
      );
      const lastAt = last.rows[0]?.started_at;
      if (lastAt && Date.now() - new Date(lastAt).getTime() < SYNC_EVERY_MS) return;
      await syncSearchConsole("schedule");
    } catch (err) {
      console.error("[gsc] scheduled sync failed", err);
    }
  };
  setTimeout(() => void tick(), 60_000).unref();
  setInterval(() => void tick(), CHECK_EVERY_MS).unref();
}
