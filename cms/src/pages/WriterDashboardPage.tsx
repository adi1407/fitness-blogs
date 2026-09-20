import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type Article } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";
import { isWriter } from "@/constants/roles";
import { AnalyticsOverviewCards } from "@/features/dashboard/components/AnalyticsOverviewCards";
import { EditorDesk } from "@/features/dashboard/components/EditorDesk";
import { WriterResumeCard } from "@/features/dashboard/components/WriterResumeCard";
import { WriterWeeklyGoal } from "@/features/dashboard/components/WriterWeeklyGoal";
import { WriterFeedbackInbox } from "@/features/dashboard/components/WriterFeedbackInbox";
import { WriterReviewQueue } from "@/features/dashboard/components/WriterReviewQueue";
import { WriterSeoChecklist } from "@/features/dashboard/components/WriterSeoChecklist";
import { WriterPillarClusters } from "@/features/dashboard/components/WriterPillarClusters";
import { WriterTopViews } from "@/features/dashboard/components/WriterTopViews";
import {
  pickResumeArticle,
  publishedThisWeek,
} from "@/features/dashboard/utils/writerMetrics";

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

export default function WriterDashboardPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !isWriter(user.role)) {
      setLoading(false);
      return;
    }
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
  }, [user]);

  const stats = useMemo(() => {
    const total = articles.length;
    const published = articles.filter((a) => a.status === "published").length;
    const submitted = articles.filter((a) => a.status === "submitted").length;
    const needsChanges = articles.filter(
      (a) => a.status === "changes_requested",
    ).length;
    const rejected = articles.filter((a) => a.status === "rejected").length;
    const live = articles.filter((a) => a.status === "published");
    const totalViews = live.reduce((sum, a) => sum + (a.views ?? 0), 0);
    const avgViews =
      live.length === 0 ? 0 : Math.round(totalViews / live.length);
    return {
      total,
      published,
      submitted,
      needsChanges,
      rejected,
      totalViews,
      avgViews,
    };
  }, [articles]);

  const resume = useMemo(() => pickResumeArticle(articles), [articles]);
  const weekPublishes = useMemo(
    () => publishedThisWeek(articles).length,
    [articles],
  );
  const inReview = articles.filter((a) => a.status === "submitted");
  const needsChangesList = articles.filter(
    (a) => a.status === "changes_requested",
  );
  const rejectedList = articles.filter((a) => a.status === "rejected");

  if (user && !isWriter(user.role)) {
    return (
      <EditorDesk
        userId={user.id}
        userName={user.name}
        isAdmin={user.role === "admin"}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Writer desk</h1>
          <p className="mt-1 text-slate-600">
            Resume drafts, clear editor feedback, hit your weekly goal, and
            deepen pillar clusters — with views on live pieces.
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
        <div className="mt-8 space-y-8">
          <WriterResumeCard article={resume} />

          {user ? (
            <WriterWeeklyGoal
              userId={user.id}
              publishedThisWeek={weekPublishes}
            />
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatTile label="Total" value={stats.total} />
            <StatTile label="Live" value={stats.published} hint="Published" />
            <StatTile
              label="In review"
              value={stats.submitted}
              hint="Submitted"
            />
            <StatTile
              label="Needs changes"
              value={stats.needsChanges}
              hint="Sent back"
            />
            <StatTile
              label="Total views"
              value={stats.totalViews}
              hint="Across live pieces"
            />
            <StatTile
              label="Avg views"
              value={stats.avgViews}
              hint="Per live article"
            />
          </div>

          <AnalyticsOverviewCards
            role="writer"
            submitted={stats.submitted}
            published={stats.published}
            totalViews={stats.totalViews}
          />

          <WriterFeedbackInbox
            needsChanges={needsChangesList}
            rejected={rejectedList}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <WriterReviewQueue articles={inReview} />
            <WriterSeoChecklist articles={articles} />
          </div>

          <WriterPillarClusters articles={articles} />

          <WriterTopViews articles={articles} />
        </div>
      )}
    </div>
  );
}
