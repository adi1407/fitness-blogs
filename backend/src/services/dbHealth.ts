import { NO_SLOW_LOG, pool, recentSlowQueries } from "../db/pool";

async function topQueries() {
  try {
    const res = await pool.query<{ query: string; calls: string; total_ms: string; mean_ms: string; rows: string }>(
      `${NO_SLOW_LOG} SELECT regexp_replace(query, '\\s+', ' ', 'g') AS query, calls, round(total_exec_time::numeric, 1) AS total_ms,
              round(mean_exec_time::numeric, 2) AS mean_ms, rows
       FROM pg_stat_statements
       WHERE dbid = (SELECT oid FROM pg_database WHERE datname = current_database())
         AND query NOT ILIKE '%pg_stat_statements%'
       ORDER BY total_exec_time DESC
       LIMIT 15`,
    );
    return {
      available: true,
      reason: null as string | null,
      queries: res.rows.map((r) => ({
        query: r.query.slice(0, 400),
        calls: Number(r.calls),
        totalMs: Number(r.total_ms),
        meanMs: Number(r.mean_ms),
        rows: Number(r.rows),
      })),
    };
  } catch (err) {
    return {
      available: false,
      reason: err instanceof Error ? err.message : String(err),
      queries: [] as { query: string; calls: number; totalMs: number; meanMs: number; rows: number }[],
    };
  }
}

/** Snapshot for the CMS database page: size, cache, connections, tables, unused indexes, top and slow queries. */
export async function dbHealth() {
  const [overview, tables, unused, queries] = await Promise.all([
    pool.query<{ size: string; cache_hit: string | null; connections: string; version: string }>(
      `${NO_SLOW_LOG} SELECT pg_size_pretty(pg_database_size(current_database())) AS size,
              (SELECT round(100.0 * sum(blks_hit) / nullif(sum(blks_hit) + sum(blks_read), 0), 2)
                 FROM pg_stat_database WHERE datname = current_database()) AS cache_hit,
              (SELECT count(*) FROM pg_stat_activity WHERE datname = current_database()) AS connections,
              current_setting('server_version') AS version`,
    ),
    pool.query<{ name: string; rows: string; bytes: string; size: string; seq_scan: string; idx_scan: string | null }>(
      `${NO_SLOW_LOG} SELECT relname AS name, n_live_tup AS rows, pg_total_relation_size(relid) AS bytes,
              pg_size_pretty(pg_total_relation_size(relid)) AS size, seq_scan, idx_scan
       FROM pg_stat_user_tables
       ORDER BY pg_total_relation_size(relid) DESC
       LIMIT 25`,
    ),
    pool.query<{ table: string; index: string; size: string }>(
      `${NO_SLOW_LOG} SELECT s.relname AS table, s.indexrelname AS index, pg_size_pretty(pg_relation_size(s.indexrelid)) AS size
       FROM pg_stat_user_indexes s
       JOIN pg_index x ON x.indexrelid = s.indexrelid
       WHERE s.idx_scan = 0 AND NOT x.indisunique AND NOT x.indisprimary
       ORDER BY pg_relation_size(s.indexrelid) DESC, s.relname
       LIMIT 30`,
    ),
    topQueries(),
  ]);
  const o = overview.rows[0];
  return {
    size: o.size,
    cacheHitPct: o.cache_hit == null ? null : Number(o.cache_hit),
    connections: Number(o.connections),
    version: o.version,
    tables: tables.rows.map((t) => ({
      name: t.name,
      rows: Number(t.rows),
      size: t.size,
      seqScans: Number(t.seq_scan),
      idxScans: t.idx_scan == null ? null : Number(t.idx_scan),
    })),
    unusedIndexes: unused.rows,
    queryStats: queries,
    slowQueries: recentSlowQueries(),
  };
}
