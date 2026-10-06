import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState, type ComponentProps } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, View } from "react-native";

import { deleteCalcResult, fetchBookmarks, fetchCalcResults, fetchUpvotes, type CalcResult, type LibraryArticle } from "@/api/member";
import { Card } from "@/components/Card";
import { GradientHero } from "@/components/GradientHero";
import { PressableScale } from "@/components/PressableScale";
import { Screen } from "@/components/Screen";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { SITE_URL } from "@/config";
import { useAuth } from "@/lib/auth";
import { haptic } from "@/lib/haptics";
import { openLink } from "@/lib/links";
import { pullProfile, pushProfile } from "@/lib/profileSync";
import { TOOLS } from "@/lib/tools";
import { colors, fonts, radius, shadow, space } from "@/theme";

type Tab = "bookmarks" | "upvotes" | "results";
type IconName = ComponentProps<typeof Ionicons>["name"];

const BENEFITS: { icon: IconName; text: string }[] = [
  { icon: "bookmark-outline", text: "Bookmark articles and read them on any device" },
  { icon: "arrow-up-circle-outline", text: "Upvote the guides that helped you" },
  { icon: "calculator-outline", text: "Save calculator results and sync your body profile" },
];

function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function openArticle(a: LibraryArticle) {
  if (a.articleNumber) router.push(`/article/${a.articleNumber}`);
  else if (a.path) openLink(`${SITE_URL}${a.path}`);
}

function SignedOut() {
  const { signIn } = useAuth();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  const onSignIn = async () => {
    setBusy(true);
    const res = await signIn();
    setBusy(false);
    if (res.ok) {
      haptic.success();
      toast("Welcome to fitlives", "success");
    } else if (res.reason === "error") {
      toast(res.message ?? "Sign-in didn't complete. Please try again.", "error");
    }
  };

  return (
    <>
      <GradientHero eyebrow="Your fitlives" title="Save what matters." subtitle="One account across the app and fitlives.in.">
        <PressableScale onPress={onSignIn} accessibilityLabel="Continue with Google" style={styles.google} disabled={busy}>
          {busy ? <ActivityIndicator color={colors.ink} /> : <Ionicons name="logo-google" size={18} color={colors.ink} />}
          <Text variant="heading" style={styles.googleText}>
            {busy ? "Opening Google…" : "Continue with Google"}
          </Text>
        </PressableScale>
      </GradientHero>
      <View style={styles.benefits}>
        {BENEFITS.map((b) => (
          <View key={b.text} style={styles.benefit}>
            <View style={styles.benefitIcon}>
              <Ionicons name={b.icon} size={20} color={colors.accent} />
            </View>
            <Text variant="body" style={styles.flex}>
              {b.text}
            </Text>
          </View>
        ))}
      </View>
      <Text variant="small" style={styles.center}>
        We only use your Google name, email and photo to create your account.{" "}
        <Text variant="small" style={styles.link} onPress={() => openLink(`${SITE_URL}/privacy`)}>
          Privacy policy
        </Text>
      </Text>
    </>
  );
}

function ArticleList({ items, emptyTitle, emptyHint }: { items: LibraryArticle[]; emptyTitle: string; emptyHint: string }) {
  if (!items.length) return <EmptyState title={emptyTitle} hint={emptyHint} />;
  return (
    <View style={styles.list}>
      {items.map((a) => (
        <Card key={a.id} onPress={() => openArticle(a)} accessibilityLabel={a.title} style={styles.row}>
          <View style={styles.flex}>
            <Text variant="heading" numberOfLines={2}>
              {a.title}
            </Text>
            {a.excerpt ? (
              <Text variant="small" numberOfLines={2}>
                {a.excerpt}
              </Text>
            ) : null}
            <Text variant="label" style={styles.date}>
              {formatDate(a.bookmarkedAt ?? a.upvotedAt)}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.subtle} />
        </Card>
      ))}
    </View>
  );
}

function ResultList({ items }: { items: CalcResult[] }) {
  const { token, handleUnauthorized } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();
  const remove = useMutation({
    mutationFn: (id: string) => deleteCalcResult(id, token!),
    onMutate: async (id) => {
      const key = ["me", "calc-results", token];
      await queryClient.cancelQueries({ queryKey: key });
      const prev = queryClient.getQueryData<CalcResult[]>(key);
      queryClient.setQueryData<CalcResult[]>(key, (list) => list?.filter((r) => r.id !== id));
      return { prev, key };
    },
    onError: (err, _id, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(ctx.key, ctx.prev);
      handleUnauthorized(err);
      toast("Couldn't delete that result.", "error");
    },
  });

  if (!items.length) {
    return <EmptyState title="No saved results yet" hint="Run any calculator and tap “Save this result”." />;
  }
  return (
    <View style={styles.list}>
      {items.map((r) => {
        const tool = TOOLS.find((t) => t.webPath === `/${r.tool}`);
        return (
          <Card
            key={r.id}
            onPress={tool ? () => router.push(`/calculator/${tool.id}`) : undefined}
            accessibilityLabel={tool?.title ?? r.tool}
            style={styles.row}
          >
            <View style={styles.resultIcon}>
              <Ionicons name={tool?.icon ?? "calculator-outline"} size={18} color={colors.accent} />
            </View>
            <View style={styles.flex}>
              <Text variant="label">{tool?.title ?? r.tool}</Text>
              <Text variant="title">
                {String(r.result.value ?? "–")}
                {r.result.unit ? <Text variant="small"> {r.result.unit}</Text> : null}
              </Text>
              <Text variant="small">
                {[r.result.label, formatDate(r.createdAt)].filter(Boolean).join(" · ")}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                haptic.warning();
                remove.mutate(r.id);
              }}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Delete saved result"
            >
              <Ionicons name="trash-outline" size={20} color={colors.subtle} />
            </Pressable>
          </Card>
        );
      })}
    </View>
  );
}

function SignedIn() {
  const { member, token, signOut, handleUnauthorized } = useAuth();
  const toast = useToast();
  const [tab, setTab] = useState<Tab>("bookmarks");
  const [syncing, setSyncing] = useState<"pull" | "push" | null>(null);

  const bookmarks = useQuery({ queryKey: ["me", "bookmarks", token], queryFn: ({ signal }) => fetchBookmarks(token!, signal), enabled: !!token });
  const upvotes = useQuery({ queryKey: ["me", "upvotes", token], queryFn: ({ signal }) => fetchUpvotes(token!, signal), enabled: !!token });
  const results = useQuery({ queryKey: ["me", "calc-results", token], queryFn: ({ signal }) => fetchCalcResults(token!, signal), enabled: !!token });
  const active = tab === "bookmarks" ? bookmarks : tab === "upvotes" ? upvotes : results;
  useEffect(() => {
    if (active.error) handleUnauthorized(active.error);
  }, [active.error, handleUnauthorized]);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "bookmarks", label: "Saved", count: bookmarks.data?.length },
    { id: "upvotes", label: "Upvoted", count: upvotes.data?.length },
    { id: "results", label: "Results", count: results.data?.length },
  ];

  const sync = async (dir: "pull" | "push") => {
    if (!token) return;
    setSyncing(dir);
    try {
      const ok = dir === "pull" ? await pullProfile(token) : await pushProfile(token);
      toast(
        ok
          ? dir === "pull"
            ? "Body profile copied to this device"
            : "Body profile saved to your account"
          : dir === "pull"
            ? "No profile saved on your account yet"
            : "Fill in a calculator first",
        ok ? "success" : "info",
      );
    } catch (err) {
      handleUnauthorized(err);
      toast("Couldn't sync your profile.", "error");
    } finally {
      setSyncing(null);
    }
  };

  const confirmSignOut = () =>
    Alert.alert("Sign out?", "Your bookmarks and results stay saved on your account.", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: () => signOut() },
    ]);

  const name = member?.name || member?.email?.split("@")[0] || "Member";

  return (
    <>
      <View style={styles.profile}>
        {member?.picture ? (
          <Image source={member.picture} style={styles.avatar} contentFit="cover" transition={200} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text variant="title" style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.flex}>
          <Text variant="label" style={styles.eyebrow}>
            Signed in
          </Text>
          <Text variant="title" numberOfLines={1} style={styles.profileName}>
            {name}
          </Text>
          {member?.email ? (
            <Text variant="small" numberOfLines={1} style={styles.profileEmail}>
              {member.email}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.tabs} accessibilityRole="tablist">
        {tabs.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => {
              haptic.tap();
              setTab(t.id);
            }}
            style={[styles.tab, tab === t.id && styles.tabActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === t.id }}
          >
            <Text variant="heading" style={tab === t.id ? styles.tabTextActive : styles.tabText}>
              {t.label}
            </Text>
            {t.count != null ? (
              <Text variant="small" style={tab === t.id ? styles.tabCountActive : undefined}>
                {t.count}
              </Text>
            ) : null}
          </Pressable>
        ))}
      </View>

      {active.isPending ? (
        <SkeletonList count={3} image={false} />
      ) : active.isError ? (
        <ErrorState error={active.error} onRetry={() => active.refetch()} />
      ) : tab === "bookmarks" ? (
        <ArticleList items={bookmarks.data ?? []} emptyTitle="No bookmarks yet" emptyHint="Tap the bookmark icon on any article." />
      ) : tab === "upvotes" ? (
        <ArticleList items={upvotes.data ?? []} emptyTitle="No upvotes yet" emptyHint="Upvote articles that helped you." />
      ) : (
        <ResultList items={results.data ?? []} />
      )}

      <View style={styles.syncCard}>
        <Text variant="heading">Body profile</Text>
        <Text variant="small">Sex, age, height, weight and activity used by every calculator.</Text>
        <View style={styles.syncRow}>
          <PressableScale onPress={() => sync("pull")} style={styles.syncBtn} accessibilityLabel="Copy profile from account" disabled={!!syncing}>
            {syncing === "pull" ? <ActivityIndicator color={colors.ink} /> : <Ionicons name="cloud-download-outline" size={18} color={colors.ink} />}
            <Text variant="small" style={styles.syncText}>
              Use account profile
            </Text>
          </PressableScale>
          <PressableScale onPress={() => sync("push")} style={styles.syncBtn} accessibilityLabel="Save this device's profile" disabled={!!syncing}>
            {syncing === "push" ? <ActivityIndicator color={colors.ink} /> : <Ionicons name="cloud-upload-outline" size={18} color={colors.ink} />}
            <Text variant="small" style={styles.syncText}>
              Save this device&apos;s
            </Text>
          </PressableScale>
        </View>
      </View>

      <Text variant="body" style={styles.signOut} onPress={confirmSignOut} accessibilityRole="button">
        Sign out
      </Text>
    </>
  );
}

export default function AccountScreen() {
  const { status } = useAuth();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["me"] });
    setRefreshing(false);
  };

  return (
    <Screen refreshing={status === "signedIn" ? refreshing : undefined} onRefresh={status === "signedIn" ? onRefresh : undefined}>
      {status === "loading" ? <SkeletonList count={2} image={false} /> : status === "signedIn" ? <SignedIn /> : <SignedOut />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, gap: 2 },
  center: { textAlign: "center" },
  link: { color: colors.ink, textDecorationLine: "underline" },
  google: {
    marginTop: space.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
    minHeight: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
  },
  googleText: { color: colors.ink },
  benefits: { gap: space.md },
  benefit: { flexDirection: "row", alignItems: "center", gap: space.md },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.lg,
    padding: space.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.ink,
    ...shadow.md,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: colors.accent },
  avatarFallback: { backgroundColor: colors.inkSoft, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.accent },
  eyebrow: { color: colors.accent },
  profileName: { color: colors.bg },
  profileEmail: { color: colors.inkMuted },
  tabs: { flexDirection: "row", backgroundColor: colors.surface, borderRadius: radius.pill, padding: 4 },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 40,
    borderRadius: radius.pill,
  },
  tabActive: { backgroundColor: colors.ink },
  tabText: { color: colors.muted, fontSize: 14 },
  tabTextActive: { color: colors.bg, fontSize: 14 },
  tabCountActive: { color: colors.accent },
  list: { gap: space.sm },
  row: { flexDirection: "row", alignItems: "center", gap: space.md },
  date: { color: colors.subtle, marginTop: 2 },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  syncCard: { gap: space.sm, backgroundColor: colors.surface, borderRadius: radius.lg, padding: space.lg },
  syncRow: { flexDirection: "row", gap: space.sm, marginTop: space.xs },
  syncBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 44,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  syncText: { color: colors.ink, fontFamily: fonts.medium },
  signOut: { color: colors.danger, textAlign: "center", fontFamily: fonts.medium, paddingVertical: space.sm },
});
