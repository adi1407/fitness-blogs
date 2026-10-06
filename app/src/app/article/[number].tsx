import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Share, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { articleImage, fetchArticle, type Article } from "@/api/articles";
import { Accordion } from "@/components/Accordion";
import { FeaturedArticleCard } from "@/components/FeaturedArticleCard";
import { HorizontalRail } from "@/components/HorizontalRail";
import { HtmlBody, type HeadingOffset } from "@/components/HtmlBody";
import { ParallaxHeader } from "@/components/ParallaxHeader";
import { ChromeButton, ReaderChrome } from "@/components/ReaderChrome";
import { SectionHeader } from "@/components/SectionHeader";
import { Skeleton } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { SITE_URL } from "@/config";
import { extractToc } from "@/lib/articleHtml";
import { openLink } from "@/lib/links";
import { useEngagement } from "@/lib/useEngagement";
import { colors, fonts, layout, radius, space } from "@/theme";

const HERO = 360;

function formatDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function Byline({ article }: { article: Article }) {
  const date = formatDate(article.updatedAt ?? article.publishedAt);
  const initial = (article.authorName ?? "f").trim().charAt(0).toUpperCase();
  return (
    <View style={styles.byline}>
      <View style={styles.avatar}>
        <Text variant="heading" style={styles.avatarText}>
          {initial}
        </Text>
      </View>
      <View style={styles.bylineText}>
        <Text variant="small" style={styles.bylineStrong}>
          {article.authorName ? `Written by ${article.authorName}` : "fitlives editorial team"}
        </Text>
        <Text variant="small">
          {[
            article.reviewerName ? `Reviewed by ${article.reviewerName}` : null,
            date ? `Updated ${date}` : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </Text>
      </View>
    </View>
  );
}

export default function ArticleScreen() {
  const { width, height: viewport } = useWindowDimensions();
  const params = useLocalSearchParams<{ number: string }>();
  const articleNumber = Number(params.number);
  const valid = Number.isInteger(articleNumber) && articleNumber >= 100_000_000 && articleNumber <= 999_999_999;

  const query = useQuery({
    queryKey: ["article", articleNumber],
    queryFn: ({ signal }) => fetchArticle(articleNumber, signal),
    enabled: valid,
  });

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const viewportHeight = useSharedValue(viewport);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const [bodyY, setBodyY] = useState(0);
  const [heads, setHeads] = useState<HeadingOffset[]>([]);

  const article = query.data?.article;
  const related = query.data?.related ?? [];
  const toc = useMemo(() => extractToc(article?.body), [article?.body]);
  const shareUrl = article?.path ? `${SITE_URL}${article.path}` : null;

  const jumpTo = (index: number) => {
    const head = heads.find((h) => h.i === index);
    if (!head) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, bodyY + head.top - 96), animated: true });
  };

  const { engagement, upvote, bookmark, signedIn } = useEngagement(article?.id);
  const toast = useToast();
  const requireSignIn = (what: string) => {
    toast(`Sign in from the Account tab to ${what}.`);
  };

  const actions = article ? (
    <>
      <ChromeButton
        icon={engagement?.upvoted ? "arrow-up-circle" : "arrow-up-circle-outline"}
        label={`${engagement?.upvoted ? "Remove upvote" : "Upvote"}${engagement ? ` (${engagement.upvoteCount})` : ""}`}
        active={!!engagement?.upvoted}
        onPress={() => (signedIn ? upvote.mutate(!engagement?.upvoted) : requireSignIn("upvote articles"))}
      />
      <ChromeButton
        icon={engagement?.bookmarked ? "bookmark" : "bookmark-outline"}
        label={engagement?.bookmarked ? "Remove bookmark" : "Bookmark article"}
        active={!!engagement?.bookmarked}
        onPress={() => {
          if (!signedIn) return requireSignIn("save articles");
          const on = !engagement?.bookmarked;
          bookmark.mutate(on, { onSuccess: () => toast(on ? "Saved to your bookmarks" : "Removed from bookmarks", "success") });
        }}
      />
      {shareUrl ? (
        <ChromeButton
          icon="share-outline"
          label="Share article"
          onPress={() => Share.share({ message: `${article.title}\n${shareUrl}`, url: shareUrl })}
        />
      ) : null}
    </>
  ) : null;

  if (!valid) return <EmptyState title="Article not found" hint="This link looks broken." />;

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <ReaderChrome
        scrollY={scrollY}
        solidAt={HERO - 60}
        title={article?.title ?? ""}
        contentHeight={contentHeight}
        viewportHeight={viewportHeight}
        actions={actions}
      />

      {query.isError ? (
        <View style={styles.errorWrap}>
          <ErrorState error={query.error} onRetry={() => query.refetch()} />
        </View>
      ) : (
        <Animated.ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onContentSizeChange={(_, h) => {
            contentHeight.value = h;
          }}
          onLayout={(e) => {
            viewportHeight.value = e.nativeEvent.layout.height;
          }}
          contentContainerStyle={{ paddingBottom: layout.bottomClearance }}
        >
          <ParallaxHeader image={article ? articleImage(article) : null} height={HERO} scrollY={scrollY}>
            {article?.categoryLabel ? (
              <View style={styles.badge}>
                <Text variant="label" style={styles.badgeText}>
                  {[article.categoryLabel, article.subcategoryLabel].filter(Boolean).join(" · ")}
                </Text>
              </View>
            ) : null}
          </ParallaxHeader>

          <View style={styles.sheet}>
            {!article ? (
              <View style={styles.loading}>
                <Skeleton width="40%" height={12} />
                <Skeleton height={28} />
                <Skeleton width="80%" height={28} />
                <Skeleton height={120} rounded={radius.lg} />
              </View>
            ) : (
              <>
                <Text variant="display" style={styles.title}>
                  {article.title}
                </Text>
                {article.readingTime ? (
                  <View style={styles.metaRow}>
                    <Ionicons name="time-outline" size={14} color={colors.muted} />
                    <Text variant="small">{article.readingTime} min read</Text>
                  </View>
                ) : null}
                <Byline article={article} />

                {article.quickAnswer ? (
                  <View style={styles.quick}>
                    <View style={styles.quickHead}>
                      <Ionicons name="flash" size={14} color={colors.ink} />
                      <Text variant="label" style={styles.quickLabel}>
                        Quick answer
                      </Text>
                    </View>
                    <Text variant="body" style={styles.quickText}>
                      {article.quickAnswer}
                    </Text>
                  </View>
                ) : null}

                {toc.length > 1 ? (
                  <Accordion title={`In this article · ${toc.length} sections`}>
                    <View style={styles.toc}>
                      {toc.map((t, i) => (
                        <Pressable
                          key={t.index}
                          onPress={() => jumpTo(t.index)}
                          accessibilityRole="link"
                          style={({ pressed }) => [styles.tocItem, pressed && { opacity: 0.6 }]}
                        >
                          <Text variant="small" style={styles.tocNum}>
                            {String(i + 1).padStart(2, "0")}
                          </Text>
                          <Text variant="body" style={styles.tocText}>
                            {t.text}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </Accordion>
                ) : null}
              </>
            )}
          </View>

          {article ? (
            <View onLayout={(e) => setBodyY(e.nativeEvent.layout.y)}>
              <HtmlBody html={article.body ?? ""} onHeadings={setHeads} />
            </View>
          ) : null}

          {article ? (
            <View style={styles.after}>
              {article.faq.length ? (
                <View style={styles.section}>
                  <SectionHeader eyebrow="FAQ" title="Common questions" />
                  {article.faq.map((f) => (
                    <Accordion key={f.question} title={f.question}>
                      <Text variant="body" style={styles.answer}>
                        {f.answer}
                      </Text>
                    </Accordion>
                  ))}
                </View>
              ) : null}

              {article.sources.length ? (
                <View style={styles.section}>
                  <SectionHeader eyebrow="Evidence" title="Sources" />
                  {article.sources.map((s, i) => (
                    <Pressable
                      key={`${s.title}-${i}`}
                      disabled={!s.url}
                      onPress={() => s.url && openLink(s.url)}
                      accessibilityRole={s.url ? "link" : "text"}
                      style={styles.source}
                    >
                      <Text variant="small" style={styles.sourceNum}>
                        {i + 1}
                      </Text>
                      <View style={styles.sourceText}>
                        <Text variant="small" style={[styles.sourceTitle, !!s.url && styles.sourceLink]}>
                          {s.title}
                        </Text>
                        {s.note ? <Text variant="small">{s.note}</Text> : null}
                      </View>
                    </Pressable>
                  ))}
                </View>
              ) : null}

              <View style={styles.disclaimer}>
                <Ionicons name="medkit-outline" size={18} color={colors.ink} />
                <Text variant="small" style={styles.disclaimerText}>
                  Educational information only — not medical advice. Consult a qualified professional for personal
                  health decisions.
                </Text>
              </View>

              {shareUrl ? (
                <Text variant="small" style={styles.webLink} onPress={() => openLink(shareUrl)}>
                  Read on fitlives.in
                </Text>
              ) : null}

              {related.length ? (
                <View style={styles.section}>
                  <SectionHeader eyebrow="Keep reading" title="Related articles" />
                  <HorizontalRail
                    data={related.slice(0, 8)}
                    itemWidth={Math.min(width * 0.75, 300)}
                    keyExtractor={(a) => String(a.id)}
                    renderItem={(a) => <FeaturedArticleCard article={a} height={230} />}
                  />
                </View>
              ) : null}
            </View>
          ) : null}
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  errorWrap: { flex: 1, paddingTop: 120 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: 5,
    marginBottom: space.lg,
  },
  badgeText: { color: colors.ink },
  sheet: {
    marginTop: -28,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    backgroundColor: colors.bg,
    paddingHorizontal: space.xl,
    paddingTop: space.xl,
    gap: space.lg,
  },
  loading: { gap: space.md },
  title: { fontSize: 28, lineHeight: 36 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: -space.sm },
  byline: { flexDirection: "row", alignItems: "center", gap: space.md },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.accent },
  bylineText: { flex: 1, gap: 1 },
  bylineStrong: { color: colors.ink, fontFamily: fonts.semibold },
  quick: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    padding: space.lg,
    gap: space.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  quickHead: { flexDirection: "row", alignItems: "center", gap: 6 },
  quickLabel: { color: colors.ink },
  quickText: { lineHeight: 24 },
  toc: { gap: 2 },
  tocItem: { flexDirection: "row", gap: space.md, paddingVertical: space.sm, alignItems: "flex-start" },
  tocNum: { color: colors.accent, fontFamily: fonts.bold, width: 22, marginTop: 2 },
  tocText: { flex: 1, fontSize: 15 },
  after: { paddingHorizontal: space.xl, gap: space.xl, marginTop: space.lg },
  section: { gap: space.md },
  answer: { color: colors.muted, lineHeight: 24 },
  source: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  sourceNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surface,
    textAlign: "center",
    lineHeight: 22,
    color: colors.ink,
    overflow: "hidden",
  },
  sourceText: { flex: 1, gap: 2 },
  sourceTitle: { color: colors.ink },
  sourceLink: { textDecorationLine: "underline", textDecorationColor: colors.accent },
  disclaimer: {
    flexDirection: "row",
    gap: space.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: space.lg,
  },
  disclaimerText: { flex: 1 },
  webLink: { textAlign: "center", color: colors.ink, textDecorationLine: "underline" },
});
