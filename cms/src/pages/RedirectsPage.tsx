import { useCallback, useEffect, useState, type FormEvent } from "react";
import { apiFetch, type NotFoundEntry, type UrlRedirect } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";

const SITE = "https://fitlives.in";

function formatWhen(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function HealthBadges({ r }: { r: UrlRedirect }) {
  const h = r.health;
  if (!r.isActive) return <span className="text-xs text-slate-400">Inactive</span>;
  if (!h) return null;
  const badges: { label: string; tone: string; title: string }[] = [];
  if (h.isLoop) badges.push({ label: "Loop", tone: "bg-red-100 text-red-800", title: "Redirects back to itself" });
  else if (h.isChain) {
    badges.push({
      label: "Chain",
      tone: "bg-amber-100 text-amber-800",
      title: `Visitors are sent on to ${h.finalTo}; flatten it to save a hop`,
    });
  }
  if (h.target === "broken") {
    badges.push({ label: "Target broken", tone: "bg-red-100 text-red-800", title: "The final page errored in the latest crawl" });
  } else if (h.target === "unknown") {
    badges.push({ label: "Not in sitemap", tone: "bg-slate-100 text-slate-600", title: "The final page wasn't in the latest crawl" });
  }
  if (!badges.length) return <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">OK</span>;
  return (
    <span className="flex flex-wrap gap-1">
      {badges.map((b) => (
        <span key={b.label} title={b.title} className={`rounded px-1.5 py-0.5 text-xs font-semibold ${b.tone}`}>
          {b.label}
        </span>
      ))}
    </span>
  );
}

function NotFoundRow({
  entry,
  isAdmin,
  onRedirect,
  onIgnore,
}: {
  entry: NotFoundEntry;
  isAdmin: boolean;
  onRedirect: (from: string, to: string) => Promise<void>;
  onIgnore: (path: string) => Promise<void>;
}) {
  const [target, setTarget] = useState(entry.suggestion ?? "");
  const [busy, setBusy] = useState(false);
  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };
  return (
    <tr className="align-top">
      <td className="max-w-[280px] px-4 py-3">
        <a
          href={`${SITE}${entry.path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block break-all font-mono text-xs text-slate-900 hover:text-sky-700 hover:underline"
        >
          {entry.path}
        </a>
        {entry.internalReferrer ? (
          <p className="mt-1 text-xs font-semibold text-red-700">
            Broken link on our page{" "}
            <a href={`${SITE}${entry.internalReferrer}`} target="_blank" rel="noopener noreferrer" className="underline">
              {entry.internalReferrer}
            </a>
          </p>
        ) : entry.lastReferrer ? (
          <p className="mt-1 break-all text-xs text-slate-500">from {entry.lastReferrer}</p>
        ) : null}
      </td>
      <td className="px-3 py-3 text-right tabular-nums">{entry.hits}</td>
      <td className="px-3 py-3 text-xs text-slate-500">{formatWhen(entry.lastSeenAt)}</td>
      <td className="px-4 py-3">
        {isAdmin ? (
          <form
            className="flex flex-wrap items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (target.trim()) void run(() => onRedirect(entry.path, target.trim()));
            }}
          >
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="/new/path"
              aria-label={`Redirect target for ${entry.path}`}
              className="min-w-[14rem] flex-1 rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs"
            />
            <button
              type="submit"
              disabled={busy || !target.trim()}
              className="rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
            >
              Redirect
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void run(() => onIgnore(entry.path))}
              className="text-xs font-semibold text-slate-500 hover:underline"
            >
              Ignore
            </button>
          </form>
        ) : (
          <span className="text-xs text-slate-500">{entry.suggestion ? `Suggested: ${entry.suggestion}` : "—"}</span>
        )}
        {entry.suggestion && isAdmin ? (
          <p className="mt-1 text-xs text-slate-500">Suggested from the closest live page</p>
        ) : null}
      </td>
    </tr>
  );
}

export default function RedirectsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [redirects, setRedirects] = useState<UrlRedirect[]>([]);
  const [notFound, setNotFound] = useState<NotFoundEntry[]>([]);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const [r, n] = await Promise.all([
      apiFetch<{ redirects: UrlRedirect[] }>("/redirects"),
      apiFetch<{ notFound: NotFoundEntry[] }>("/redirects/not-found"),
    ]);
    setRedirects(r.redirects);
    setNotFound(n.notFound);
  }, []);

  useEffect(() => {
    void load().catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [load]);

  async function act(fn: () => Promise<unknown>, ok: string) {
    setError("");
    setMessage("");
    try {
      await fn();
      setMessage(ok);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  }

  const createRedirect = (from: string, to: string) =>
    act(
      () => apiFetch("/redirects", { method: "POST", body: JSON.stringify({ fromPath: from, toPath: to }) }),
      `Redirect saved: ${from} → ${to}`,
    );

  async function create(e: FormEvent) {
    e.preventDefault();
    await createRedirect(fromPath, toPath);
    setFromPath("");
    setToPath("");
  }

  const chains = redirects.filter((r) => r.health?.isChain && !r.health.isLoop).length;
  const broken = redirects.filter((r) => r.health?.target === "broken" || r.health?.isLoop).length;

  return (
    <div>
      <h1 className="text-2xl font-bold">Redirects</h1>
      <p className="mt-1 max-w-2xl text-slate-600">
        301s from old paths to new ones, for every page on the site. Slug or category changes
        create these automatically; admins can add manual entries.
      </p>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}

      <section className="mt-6 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Broken URLs visitors hit ({notFound.length})</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Pages people landed on that don&apos;t exist, most-hit first. Redirect each to the closest
            live page, or ignore junk. Red rows are broken links on our own pages — fix the link too.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Missing URL</th>
                <th className="px-3 py-2.5 text-right">Hits</th>
                <th className="px-3 py-2.5">Last seen</th>
                <th className="px-4 py-2.5">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notFound.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    No unresolved 404s. They appear here as visitors hit missing pages.
                  </td>
                </tr>
              ) : (
                notFound.map((n) => (
                  <NotFoundRow
                    key={n.path}
                    entry={n}
                    isAdmin={isAdmin}
                    onRedirect={createRedirect}
                    onIgnore={(path) =>
                      act(
                        () => apiFetch("/redirects/not-found/ignore", { method: "POST", body: JSON.stringify({ path }) }),
                        `Ignored ${path}`,
                      )
                    }
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isAdmin ? (
        <form
          onSubmit={(e) => void create(e)}
          className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-[1fr_1fr_auto]"
        >
          <label className="text-sm font-medium">
            From
            <input
              required
              value={fromPath}
              onChange={(e) => setFromPath(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="/old/path"
            />
          </label>
          <label className="text-sm font-medium">
            To
            <input
              required
              value={toPath}
              onChange={(e) => setToPath(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="/new/path"
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Add
            </button>
          </div>
        </form>
      ) : null}

      <section className="mt-6 rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">All redirects ({redirects.length})</h2>
          <p className="text-xs text-slate-500">
            {chains} chain{chains === 1 ? "" : "s"} · {broken} broken
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2.5">From</th>
                <th className="px-4 py-2.5">To</th>
                <th className="px-3 py-2.5 text-right">Hits</th>
                <th className="px-3 py-2.5">Last hit</th>
                <th className="px-3 py-2.5">Health</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {redirects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No redirects yet.
                  </td>
                </tr>
              ) : (
                redirects.map((r) => (
                  <tr key={r.id} className={r.isActive ? "" : "opacity-60"}>
                    <td className="max-w-[240px] break-all px-4 py-3 font-mono text-xs">{r.fromPath}</td>
                    <td className="max-w-[240px] break-all px-4 py-3 font-mono text-xs">
                      {r.toPath}
                      {r.health?.isChain && r.health.finalTo ? (
                        <span className="block text-slate-500">→ {r.health.finalTo}</span>
                      ) : null}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">{r.hitCount}</td>
                    <td className="px-3 py-3 text-xs text-slate-500">{formatWhen(r.lastHitAt)}</td>
                    <td className="px-3 py-3">
                      <HealthBadges r={r} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      {isAdmin && r.isActive && r.health?.isChain && !r.health.isLoop ? (
                        <button
                          type="button"
                          onClick={() =>
                            void act(
                              () => apiFetch(`/redirects/${r.id}/flatten`, { method: "PATCH" }),
                              `Flattened ${r.fromPath}`,
                            )
                          }
                          className="mr-3 text-xs font-semibold text-sky-700 hover:underline"
                        >
                          Flatten
                        </button>
                      ) : null}
                      {isAdmin && r.isActive ? (
                        <button
                          type="button"
                          onClick={() =>
                            void act(
                              () => apiFetch(`/redirects/${r.id}/deactivate`, { method: "PATCH" }),
                              `Deactivated ${r.fromPath}`,
                            )
                          }
                          className="text-xs font-semibold text-slate-600 hover:underline"
                        >
                          Deactivate
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
