import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchEngagement, setBookmark, setUpvote, type Engagement } from "@/api/member";
import { haptic } from "./haptics";
import { useAuth } from "./auth";

/** Upvote count + this member's upvote/bookmark state for an article, with optimistic toggles. */
export function useEngagement(articleId: string | undefined) {
  const { token, handleUnauthorized } = useAuth();
  const queryClient = useQueryClient();
  const key = ["me", "engagement", articleId, token ?? "anon"] as const;

  const query = useQuery({
    queryKey: key,
    queryFn: ({ signal }) => fetchEngagement(articleId!, token, signal),
    enabled: !!articleId,
    staleTime: 30_000,
  });

  const optimistic = async (patch: (e: Engagement) => Engagement) => {
    await queryClient.cancelQueries({ queryKey: key });
    const prev = queryClient.getQueryData<Engagement>(key);
    if (prev) queryClient.setQueryData<Engagement>(key, patch(prev));
    return { prev };
  };

  const rollback = (err: unknown, _on: boolean, ctx: { prev?: Engagement } | undefined) => {
    if (ctx?.prev) queryClient.setQueryData(key, ctx.prev);
    handleUnauthorized(err);
  };

  const upvote = useMutation({
    mutationFn: (on: boolean) => setUpvote(articleId!, on, token!),
    onMutate: (on) => {
      haptic.light();
      return optimistic((e) => ({ ...e, upvoted: on, upvoteCount: Math.max(0, e.upvoteCount + (on ? 1 : -1)) }));
    },
    onError: rollback,
    onSuccess: (data) => {
      queryClient.setQueryData<Engagement>(key, (e) => (e ? { ...e, ...data } : e));
      queryClient.invalidateQueries({ queryKey: ["me", "upvotes"] });
    },
  });

  const bookmark = useMutation({
    mutationFn: (on: boolean) => setBookmark(articleId!, on, token!),
    onMutate: (on) => {
      haptic.success();
      return optimistic((e) => ({ ...e, bookmarked: on }));
    },
    onError: rollback,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me", "bookmarks"] }),
  });

  return { engagement: query.data, upvote, bookmark, signedIn: !!token };
}
