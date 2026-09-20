import { apiFetch, type Article } from "@/lib/api/client";
import { editorQuality } from "@/features/dashboard/utils/seoCompleteness";

export type EditorAction = "publish" | "request-changes" | "reject";

export async function runEditorTransition(
  articleId: string,
  action: EditorAction,
  reason?: string,
): Promise<Article> {
  const needsReason = action === "reject" || action === "request-changes";
  if (needsReason && !reason?.trim()) {
    throw new Error("Add an editor note before requesting changes or rejecting");
  }

  const data = await apiFetch<{ article: Article }>(
    `/articles/${articleId}/${action}`,
    {
      method: "PATCH",
      body: needsReason
        ? JSON.stringify({ reason: reason!.trim() })
        : undefined,
    },
  );
  return data.article;
}

/** Confirm before publish when quality gates warn. */
export function confirmPublishIfNeeded(article: Article): boolean {
  const q = editorQuality(article);
  if (q.ready) return true;
  const lines = [
    q.criticalFail
      ? "Critical fields are incomplete (title, slug, taxonomy, body, or cover)."
      : `SEO/quality is ${q.percent}% (below 85%).`,
    q.missing.length
      ? `Missing: ${q.missing.slice(0, 6).join(", ")}`
      : "",
    "Publish anyway?",
  ].filter(Boolean);
  return window.confirm(lines.join("\n\n"));
}

export type BulkResult = {
  ok: string[];
  failed: { id: string; title: string; error: string }[];
};

export async function runBulkEditorTransitions(
  articles: Article[],
  action: EditorAction,
  reason?: string,
  opts?: { skipPublishConfirm?: boolean },
): Promise<BulkResult> {
  const ok: string[] = [];
  const failed: BulkResult["failed"] = [];

  if (action === "publish" && !opts?.skipPublishConfirm) {
    const weak = articles.filter((a) => !editorQuality(a).ready);
    if (weak.length > 0) {
      const okGo = window.confirm(
        `${weak.length} of ${articles.length} selected piece(s) are below quality gates. Publish all selected anyway?`,
      );
      if (!okGo) {
        return {
          ok: [],
          failed: articles.map((a) => ({
            id: a.id,
            title: a.title || "Untitled",
            error: "Cancelled",
          })),
        };
      }
    }
  }

  for (const article of articles) {
    try {
      await runEditorTransition(article.id, action, reason);
      ok.push(article.id);
    } catch (err) {
      failed.push({
        id: article.id,
        title: article.title || "Untitled",
        error: err instanceof Error ? err.message : "Failed",
      });
    }
  }

  return { ok, failed };
}

const CLAIM_PREFIX = "cms_editor_claim_";

export function loadClaimedIds(userId: string): Set<string> {
  try {
    const raw = localStorage.getItem(`${CLAIM_PREFIX}${userId}`);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function saveClaimedIds(userId: string, ids: Set<string>) {
  try {
    localStorage.setItem(
      `${CLAIM_PREFIX}${userId}`,
      JSON.stringify([...ids]),
    );
  } catch {
    /* ignore */
  }
}
