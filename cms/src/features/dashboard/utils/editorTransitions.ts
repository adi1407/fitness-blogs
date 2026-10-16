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

/** Hard block — no "publish anyway" bypass. */
export function assertPublishReady(article: Article): void {
  const q = editorQuality(article);
  if (q.ready) return;
  const detail = q.missing.length
    ? `Missing: ${q.missing.slice(0, 8).join(", ")}`
    : "Publish gates incomplete.";
  throw new Error(
    `Cannot publish until quality gates pass. ${detail}`,
  );
}

export type BulkResult = {
  ok: string[];
  failed: { id: string; title: string; error: string }[];
};

export async function runBulkEditorTransitions(
  articles: Article[],
  action: EditorAction,
  reason?: string,
): Promise<BulkResult> {
  const ok: string[] = [];
  const failed: BulkResult["failed"] = [];

  for (const article of articles) {
    try {
      if (action === "publish") {
        assertPublishReady(article);
      }
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
