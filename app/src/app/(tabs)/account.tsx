import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState, type ComponentProps } from "react";
import { ActivityIndicator, Alert, Linking, Pressable, StyleSheet, View } from "react-native";

import { deleteCalcResult, fetchBookmarks, fetchCalcResults, fetchUpvotes, type CalcResult, type LibraryArticle } from "@/api/member";
import { LinkGroup, LinkRow } from "@/components/LinkRow";
import { PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
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
import { CONTACT_EMAIL } from "@/lib/trust";
import { colors, fonts, radius, shadow, space } from "@/theme";

type Tab = "bookmarks" | "upvotes" | "results";
type IconName = ComponentProps<typeof Ionicons>["name"];

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  { icon: "bookmark-outline", title: "Save guides", text: "Bookmark articles and read them on any device." },
  { icon: "arrow-up-circle-outline", title: "Upvote what helped", text: "Tell us which guides were worth your time." },
  { icon: "calculator-outline", title: "Keep your numbers", text: "Save calculator results and sync your body profile." },
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
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Account" }]}
        title="Save what matters"
        lede="One free account across the app and fitlives.in — your saved guides, upvotes and calculator results in one place."
      >
        <PressableScale onPress={onSignIn} accessibilityLabel="Continue with Google" style={styles.google} disabled={busy}>
          {busy ? <ActivityIndicator color={colors.bg} /> : <Ionicons name="logo-google" size={18} color={colors.bg} />}
          <Text style={styles.googleText}>{busy ? "Opening Google…" : "Continue with Google"}</Text>
        </PressableScale>
      </PageIntro>

      <View style={styles.list}>
        {BENEFITS.map((b) => (
          <View key={b.title} style={styles.benefit}>
            <View style={styles.iconTile}>
              <Ionicons name={b.icon} size={20} color={colors.ink} />
            </View>
            <View style={styles.flex}>
              <Text variant="heading">{b.title}</Text>
              <Text variant="small">{b.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text variant="small" style={styles.privacyLine}>
        We only use your Google name, email and photo to create your account.{" "}
        <Text variant="small" style={styles.link} onPress={() => openLink(`${SITE_URL}/privacy`)} suppressHighlighting>
          Privacy policy
        </Text>
      </Text>
    </>
  );
}

function ArticleList({ items, emptyTitle, emptyHint }: { items: LibraryArticle[]; emptyTitle: string; emptyHint: string }) {
  if (!items.length) {
    return (
      <View style={styles.empty}>
        <EmptyState title={emptyTitle} hint={emptyHint} />
        <PillButton label="Browse the latest" variant="ghost" onPress={() => router.navigate("/learn")} style={styles.pill} />
      </View>
    );
  }
  return (
    <View style={styles.list}>
      {items.map((a) => (
        <PressableScale
          key={a.id}
          onPress={() => openArticle(a)}
          accessibilityRole="link"
          accessibilityLabel={a.title}
          scaleTo={0.985}
          style={styles.row}
        >
          <View style={styles.flex}>
            <Text variant="heading" numberOfLines={2}>
              {a.title}
            </Text>
            {a.excerpt ? (
              <Text variant="small" numberOfLines={2}>
                {a.excerpt}
              </Text>
            ) : null}
            {formatDate(a.bookmarkedAt ?? a.upvotedAt) ? (
              <Text variant="small" style={styles.date}>
                {formatDate(a.bookmarkedAt ?? a.upvotedAt)}
              </Text>
            ) : null}
          </View>
          <Ionicons name="arrow-forward" size={16} color={colors.ink} />
        </PressableScale>
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
    return (
      <View style={styles.empty}>
        <EmptyState title="No saved results yet" hint="Run any calculator and tap “Save this result”." />
        <PillButton label="Open calculators" variant="ghost" onPress={() => router.navigate("/tools")} style={styles.pill} />
      </View>
    );
  }
  return (
    <View style={styles.list}>
      {items.map((r) => {
        const tool = TOOLS.find((t) => t.webPath === `/${r.tool}`);
        return (
          <PressableScale
            key={r.id}
            onPress={tool ? () => router.push(`/calculator/${tool.id}`) : undefined}
            disabled={!tool}
            accessibilityRole={tool ? "link" : "none"}
            accessibilityLabel={tool?.title ?? r.tool}
            scaleTo={0.985}
            style={styles.row}
          >
            <View style={styles.iconTile}>
              <Ionicons name={tool?.icon ?? "calculator-outline"} size={18} color={colors.ink} />
            </View>
            <View style={styles.flex}>
              <Text variant="small" style={styles.resultTool}>
                {tool?.title ?? r.tool}
              </Text>
              <Text variant="title" style={styles.resultValue}>
                {String(r.result.value ?? "–")}
                {r.result.unit ? <Text variant="small"> {r.result.unit}</Text> : null}
              </Text>
              <Text variant="small">{[r.result.label, formatDate(r.createdAt)].filter(Boolean).join(" · ")}</Text>
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
          </PressableScale>
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
        <View style={styles.profileTop}>
          {member?.picture ? (
            <Image source={member.picture} style={styles.avatar} contentFit="cover" transition={200} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Ionicons name="person-outline" size={28} color={colors.muted} />
            </View>
          )}
          <View style={styles.flex}>
            <Text style={styles.profileName} numberOfLines={1} accessibilityRole="header">
              {name}
            </Text>
            {member?.email ? (
              <Text variant="small" numberOfLines={1}>
                {member.email}
              </Text>
            ) : null}
            <Text variant="small" style={styles.date}>
              Signed in with Google
            </Text>
          </View>
        </View>
        <PillButton label="Sign out" variant="ghost" icon="log-out-outline" onPress={confirmSignOut} style={styles.pill} />
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
            <Text style={[styles.tabText, tab === t.id && styles.tabTextActive]}>{t.label}</Text>
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
        <ArticleList items={bookmarks.data ?? []} emptyTitle="No saved guides yet" emptyHint="Save a guide from any article." />
      ) : tab === "upvotes" ? (
        <ArticleList items={upvotes.data ?? []} emptyTitle="No upvotes yet" emptyHint="Upvote what helped." />
      ) : (
        <ResultList items={results.data ?? []} />
      )}

      <View style={styles.panel}>
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

      <View style={[styles.panel, styles.panelMuted]}>
        <Text variant="heading">Privacy and cookies</Text>
        <Text variant="small" style={styles.privacyText}>
          Name and photo come from Google. To delete your fitlives member data,{" "}
          <Text
            variant="small"
            style={styles.link}
            onPress={() =>
              Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Delete my fitlives account")}`).catch(() => {})
            }
            suppressHighlighting
          >
            email a deletion request
          </Text>{" "}
          from this address.
        </Text>
      </View>
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
      <LinkGroup title="More">
        <LinkRow icon="information-circle-outline" label="About fitlives" onPress={() => router.push("/about")} />
        <LinkRow icon="settings-outline" label="Settings" onPress={() => router.push("/settings")} />
        <LinkRow icon="lock-closed-outline" label="Privacy policy" external onPress={() => openLink(`${SITE_URL}/privacy`)} />
      </LinkGroup>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, gap: 2 },
  link: { fontFamily: fonts.semibold, color: colors.ink, textDecorationLine: "underline" },
  pill: { minHeight: 40, paddingHorizontal: space.lg, alignSelf: "flex-start" },
  google: {
    marginTop: space.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
    minHeight: 50,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    ...shadow.md,
  },
  googleText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.bg },
  list: { gap: space.sm },
  benefit: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  privacyLine: { lineHeight: 19 },
  profile: {
    gap: space.lg,
    padding: space.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  profileTop: { flexDirection: "row", alignItems: "center", gap: space.lg },
  avatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: colors.border },
  avatarFallback: { backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  profileName: { fontFamily: fonts.semibold, fontSize: 22, lineHeight: 28, letterSpacing: -0.5, color: colors.ink },
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
  tabText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.muted },
  tabTextActive: { color: colors.bg },
  tabCountActive: { color: colors.accent },
  empty: { alignItems: "center", gap: space.sm },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  date: { color: colors.subtle, marginTop: 2 },
  resultTool: { fontFamily: fonts.medium, color: colors.muted },
  resultValue: { fontSize: 20, lineHeight: 26 },
  panel: {
    gap: space.sm,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  panelMuted: { backgroundColor: colors.surface },
  privacyText: { lineHeight: 19 },
  syncRow: { flexDirection: "row", gap: space.sm, marginTop: space.xs },
  syncBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  syncText: { color: colors.ink, fontFamily: fonts.medium },
});
