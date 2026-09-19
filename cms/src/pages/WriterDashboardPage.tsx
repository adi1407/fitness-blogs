import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type Article } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";
import { isWriter } from "@/constants/roles";
import { AnalyticsOverviewCards } from "@/features/dashboard/components/AnalyticsOverviewCards";

function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

function ArticleBucket({
  title,
  articles,
  showViews,
}: {
  title: string;
  articles: Article[];
  showViews?: boolean;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="font-semibold text-slate-900">{title}</h2>
      </div>
      <ul className="divide-y divide-slate-100">
        {articles.length === 0 ? (
          <li className="px-4 py-6 text-sm text-slate-500">None yet.</li>
        ) : (
          articles.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <Link
                  to={`/articles/${a.id}`}
                  className="font-medium text-sky-700 hover:underline"
                >
                  {a.title || "Untitled"}
                </Link>
                <p className="truncate text-xs text-slate-500">
                  {a.articleNumber ? `#${a.articleNumber}` : "—"}
                  {a.categoryLabel ? ` · ${a.categoryLabel}` : ""}
                  {a.subcategoryLabel ? ` / ${a.subcategoryLabel}` : ""}
                </p>
              </div>
              {showViews ? (
                <span className="shrink-0 text-xs font-semibold text-slate-500">
                  {a.views} views
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize">
                  {a.status}
                </span>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default function WriterDashboardPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const data = await apiFetch<{ articles: Article[] }>(
          "/articles?limit=100",
        );
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const total = articles.length;
    const published = articles.filter((a) => a.status === "published").length;
    const submitted = articles.filter((a) => a.status === "submitted").length;
    const needsChanges = articles.filter(
      (a) => a.status === "changes_requested",
    ).length;
    const rejected = articles.filter((a) => a.status === "rejected").length;
    return { total, published, submitted, needsChanges, rejected };
  }, [articles]);

  const drafts = articles.filter((a) => a.status === "draft");
  const inReview = articles.filter((a) => a.status === "submitted");
  const needsChanges = articles.filter(
    (a) => a.status === "changes_requested",
  );
  const live = articles.filter((a) => a.status === "published");

  if (user && !isWriter(user.role)) {
    const submitted = articles.filter((a) => a.status === "submitted").length;
    const published = articles.filter((a) => a.status === "published").length;
    const totalViews = articles
      .filter((a) => a.status === "published")
      .reduce((sum, a) => sum + (a.views ?? 0), 0);

    return (
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome, {user.name}. Use the sidebar to manage articles
          {user.role === "admin" ? ", analytics, and activity logs" : ""}.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            to="/articles"
            className="rounded-xl border border-slate-200 bg-white p-5 hover:border-sky-400"
          >
            <h2 className="font-semibold">Articles</h2>
            <p className="mt-1 text-sm text-slate-500">Browse and edit</p>
          </Link>
          <Link
            to="/articles/new"
            className="rounded-xl border border-slate-200 bg-white p-5 hover:border-sky-400"
          >
            <h2 className="font-semibold">New article</h2>
            <p className="mt-1 text-sm text-slate-500">Write with taxonomy</p>
          </Link>
          {user.role === "admin" ? (
            <Link
              to="/admin/analytics"
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-sky-400"
            >
              <h2 className="font-semibold">Analytics</h2>
              <p className="mt-1 text-sm text-slate-500">
                OpenPanel + editorial KPIs
              </p>
            </Link>
          ) : (
            <Link
              to="/articles?status=submitted"
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-sky-400"
            >
              <h2 className="font-semibold">Review queue</h2>
              <p className="mt-1 text-sm text-slate-500">Submitted pieces</p>
            </Link>
          )}
        </div>
        {!loading ? (
          <AnalyticsOverviewCards
            role={user.role === "admin" ? "admin" : "editor"}
            submitted={submitted}
            published={published}
            totalViews={totalViews}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Writer desk</h1>
          <p className="mt-1 text-slate-600">
            Track drafts, reviews, and live articles — with view counts on
            published pieces.
          </p>
        </div>
        <Link
          to="/articles/new"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Write article
        </Link>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {loading ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatTile label="Total" value={stats.total} />
            <StatTile label="Live" value={stats.published} hint="Published" />
            <StatTile label="In review" value={stats.submitted} hint="Submitted" />
            <StatTile
              label="Needs changes"
              value={stats.needsChanges}
              hint="Sent back"
            />
            <StatTile label="Rejected" value={stats.rejected} />
          </div>
          <AnalyticsOverviewCards
            role="writer"
            submitted={stats.submitted}
            published={stats.published}
            totalViews={live.reduce((sum, a) => sum + (a.views ?? 0), 0)}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            <ArticleBucket title="Drafts" articles={drafts} />
            <ArticleBucket title="In review" articles={inReview} />
            <ArticleBucket title="Needs changes" articles={needsChanges} />
            <ArticleBucket title="Live" articles={live} showViews />
          </div>
        </>
      )}
    </div>
  );
}
