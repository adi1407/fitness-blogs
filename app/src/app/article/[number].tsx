import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, Share, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { articleImage, fetchArticle, recordArticleView, type Article, type ArticleSummary } from "@/api/articles";
import { Accordion } from "@/components/Accordion";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleToc } from "@/components/ArticleToc";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { HtmlBody, type HeadingOffset } from "@/components/HtmlBody";
import { ChromeButton, ReaderChrome } from "@/components/ReaderChrome";
import { Skeleton } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { SubscribeCard } from "@/components/SubscribeCard";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { ToolCtaCard } from "@/components/ToolCtaCard";
import { SITE_URL } from "@/config";
import { extractToc } from "@/lib/articleHtml";
import { openLink } from "@/lib/links";
import { isPillarSlug } from "@/lib/pillars";
import { toolForArticle } from "@/lib/tools";
import { useEngagement } from "@/lib/useEngagement";
import { colors, fonts, radius, space } from "@/theme";

/** Chrome row height below the safe area; content starts under it. */
const CHROME = 56;
const DAY_MS = 86_400_000;

function longDate(iso: string | null | undefined) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Category, subcategory, two topics and three tags — deduped, like the website header chips. */
function tagChips(article: Article) {
  const seen = new Set<string>();
  return [
    article.categoryLabel,
    article.subcategoryLabel,
    ...(article.topics ?? []).slice(0, 2),
    ...(article.tags ?? []).slice(0, 3),
  ].filter((label): label is string => {
    const key = label?.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function crumbsFor(article: Article | undefined): Crumb[] {
  const cat = article?.categorySlug;
  const sub = article?.subcategorySlug;
  const hub = isPillarSlug(cat);
  return [
    { label: "Learn", href: "/learn" },
    ...(article?.categoryLabel ? [{ label: article.categoryLabel, href: hub ? (`/hub/${cat}` as const) : undefined }] : []),
    ...(article?.subcategoryLabel
      ? [{ label: article.subcategoryLabel, href: hub && sub ? (`/hub/${cat}/${sub}` as const) : undefined }]
      : []),
    { label: article?.title ?? "Article" },
  ];
}

function Cover({ article }: { article: Article }) {
  const img = articleImage(article);
  const [ratio, setRatio] = useState(16 / 9);
  if (!img) return null;
  return (
    <View style={styles.figure}>
      <Image
        source={img}
        style={[styles.coverImage, { aspectRatio: ratio }]}
        contentFit="contain"
        transition={220}
        accessibilityLabel={article.featuredImageAlt || article.title}
        onLoad={(e) => {
          const { width, height } = e.source;
          if (width > 0 && height > 0) setRatio(Math.min(2.2, Math.max(0.8, width / height)));
        }}
      />
      {article.featuredImageCaption ? (
        <Text variant="small" style={styles.caption}>
          {article.featuredImageCaption}
        </Text>
      ) : null}
    </View>
  );
}

function Byline({ article }: { article: Article }) {
  const author = article.authorName?.trim() || null;
  const reviewer = article.reviewerName?.trim() || null;
  const published = longDate(article.publishedAt);
  const updated =
    article.updatedAt &&
    article.publishedAt &&
    new Date(article.updatedAt).getTime() > new Date(article.publishedAt).getTime() + DAY_MS
      ? longDate(article.updatedAt)
      : null;
  const facts = [
    published ? `Published ${published}` : null,
    updated ? `Updated ${updated}` : null,
    article.readingTime ? `${article.readingTime} min read` : null,
    article.views ? `${article.views.toLocaleString("en-IN")} views` : null,
  ].filter(Boolean);
  const person = (role: string, name: string, slug: string | null | undefined) => (
    <Text variant="small">
      <Text style={styles.bylineRole}>{role} </Text>
      <Text
        style={styles.bylineName}
        onPress={() => openLink(`${SITE_URL}/authors${slug ? `/${slug}` : ""}`)}
        accessibilityRole="link"
        suppressHighlighting
      >
        {name}
      </Text>
    </Text>
  );

  return (
    <View style={styles.byline}>
      {author ? person("Written by", author, article.authorSlug) : null}
      {reviewer ? person("Reviewed by", reviewer, article.reviewerSlug) : null}
      {facts.length ? <Text style={styles.facts}>{facts.join("  ·  ")}</Text> : null}
    </View>
  );
}

function Sources({ sources }: { sources: Article["sources"] }) {
  if (!sources.length) return null;
  return (
    <View style={styles.block}>
      <Text variant="title" style={styles.blockTitle} accessibilityRole="header">
        Sources
      </Text>
      <View style={styles.sourceList}>
        {sources.map((s, i) => (
          <View key={`${s.title}-${i}`} style={styles.sourceRow}>
            <Text variant="small" style={styles.sourceNum}>
              {i + 1}.
            </Text>
            <Text variant="small" style={styles.sourceText}>
              {s.url ? (
                <Text
                  style={styles.sourceLink}
                  onPress={() => openLink(s.url!)}
                  accessibilityRole="link"
                  suppressHighlighting
                >
                  {s.title}
                </Text>
              ) : (
                <Text style={styles.sourceTitle}>{s.title}</Text>
              )}
              {s.note ? ` — ${s.note}` : null}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ClusterRail({ articles }: { articles: ArticleSummary[] }) {
  if (!articles.length) return null;
  return (
    <View style={styles.rail}>
      <Text style={styles.railKicker}>More in this cluster</Text>
      <View style={styles.railList}>
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} compact />
        ))}
      </View>
    </View>
  );
}

function KeepReading({ article, related }: { article: Article; related: ArticleSummary[] }) {
  const cat = article.categorySlug;
  const sub = article.subcategorySlug;
  const hub = isPillarSlug(cat) && sub ? (`/hub/${cat}/${sub}` as const) : null;
  const subLabel = article.subcategoryLabel ?? "this topic";
  return (
    <View style={styles.keep}>
      <View style={styles.keepHead}>
        <Text variant="title" accessibilityRole="header">
          Keep reading
        </Text>
        {hub ? (
          <Text style={styles.keepLink} onPress={() => router.push(hub)} accessibilityRole="link" suppressHighlighting>
            More in {subLabel} →
          </Text>
        ) : null}
      </View>
      {related.length ? (
        <View style={styles.keepList}>
          {related.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </View>
      ) : (
        <Text variant="small">More guides in {subLabel} as we publish.</Text>
      )}
    </View>
  );
}

function LoadingPanel() {
  return (
    <View style={styles.panel}>
      <Skeleton height={190} rounded={0} />
      <View style={styles.panelBody}>
        <Skeleton width="45%" height={14} />
        <Skeleton height={28} />
        <Skeleton width="75%" height={28} />
        <Skeleton height={56} />
        <Skeleton height={110} rounded={radius.lg} />
      </View>
    </View>
  );
}

export default function ArticleScreen() {
  const { height: viewport } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ number: string }>();
  const articleNumber = Number(params.number);
  const valid = Number.isInteger(articleNumber) && articleNumber >= 100_000_000 && articleNumber <= 999_999_999;

  const query = useQuery({
    queryKey: ["article", articleNumber],
    queryFn: ({ signal }) => fetchArticle(articleNumber, signal),
    enabled: valid,
  });

  const loadedId = query.data?.article.id;
  useEffect(() => {
    if (loadedId) recordArticleView(loadedId);
  }, [loadedId]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const viewportHeight = useSharedValue(viewport);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const [panelY, setPanelY] = useState(0);
  const [bodyY, setBodyY] = useState(0);
  const [heads, setHeads] = useState<HeadingOffset[]>([]);

  const article = query.data?.article;
  const related = query.data?.related ?? [];
  const toc = useMemo(() => extractToc(article?.body), [article?.body]);
  const chips = useMemo(() => (article ? tagChips(article) : []), [article]);
  const tool = article ? toolForArticle(article.categorySlug, article.subcategorySlug) : null;
  const shareUrl = article?.path ? `${SITE_URL}${article.path}` : null;
  const topInset = insets.top + CHROME;

  const jumpTo = (index: number) => {
    const head = heads.find((h) => h.i === index);
    if (!head) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, panelY + bodyY + head.top - topInset - space.md), animated: true });
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
        solidAt={CHROME}
        title={article?.title ?? ""}
        contentHeight={contentHeight}
        viewportHeight={viewportHeight}
        actions={actions}
      />

      {query.isError ? (
        <View style={[styles.errorWrap, { paddingTop: topInset + space.xxl }]}>
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
          contentContainerStyle={[
            styles.content,
            { paddingTop: topInset + space.sm, paddingBottom: insets.bottom + space.xxl },
          ]}
        >
          <Breadcrumbs items={crumbsFor(article)} />

          {!article ? (
            <LoadingPanel />
          ) : (
            <>
              <View style={styles.panel} onLayout={(e) => setPanelY(e.nativeEvent.layout.y)}>
                <Cover article={article} />

                <View style={styles.panelBody}>
                  {chips.length ? (
                    <View style={styles.chips}>
                      {chips.map((c) => (
                        <View key={c} style={styles.chip}>
                          <Text style={styles.chipText} numberOfLines={1}>
                            {c}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ) : null}

                  <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
                    {article.title}
                  </Text>
                  {article.excerpt ? (
                    <Text variant="body" style={styles.excerpt}>
                      {article.excerpt}
                    </Text>
                  ) : null}

                  <Byline article={article} />

                  {article.quickAnswer ? (
                    <View style={styles.callout}>
                      <Text style={styles.calloutLabel} accessibilityRole="header">
                        Quick Answer
                      </Text>
                      <Text variant="body" style={styles.calloutText}>
                        {article.quickAnswer}
                      </Text>
                    </View>
                  ) : null}

                  <ToolCtaCard tool={tool} />
                  <ArticleToc items={toc} onJump={jumpTo} />
                </View>

                <View style={styles.body} onLayout={(e) => setBodyY(e.nativeEvent.layout.y)}>
                  {article.body ? (
                    <HtmlBody html={article.body} onHeadings={setHeads} />
                  ) : (
                    <Text variant="small" style={styles.noBody}>
                      No body content yet.
                    </Text>
                  )}
                </View>

                <View style={styles.panelFoot}>
                  <ClusterRail articles={related.slice(0, 5)} />

                  {article.faq.length ? (
                    <View style={styles.block}>
                      <Text variant="title" style={styles.blockTitle} accessibilityRole="header">
                        Frequently asked questions
                      </Text>
                      <View style={styles.faqList}>
                        {article.faq.map((f) => (
                          <Accordion key={f.question} title={f.question}>
                            <Text variant="body" style={styles.answer}>
                              {f.answer}
                            </Text>
                          </Accordion>
                        ))}
                      </View>
                    </View>
                  ) : null}

                  <Sources sources={article.sources} />

                  <SubscribeCard source="app_article_end" />

                  <Text variant="small" style={styles.contact}>
                    Questions about this article?{" "}
                    <Text
                      style={styles.contactLink}
                      onPress={() => openLink(`${SITE_URL}/contact`)}
                      accessibilityRole="link"
                      suppressHighlighting
                    >
                      Contact the editorial team
                    </Text>
                    .
                  </Text>

                  <Text variant="small" style={styles.disclaimer}>
                    Educational information only — not medical advice. Consult a qualified professional for personal
                    health decisions.
                  </Text>

                  {shareUrl ? (
                    <Pressable onPress={() => openLink(shareUrl)} accessibilityRole="link" style={styles.webLink}>
                      <Ionicons name="globe-outline" size={14} color={colors.muted} />
                      <Text variant="small">Read on fitlives.in</Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>

              <KeepReading article={article} related={related.slice(5, 10)} />
            </>
          )}
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  errorWrap: { flex: 1 },
  content: { paddingHorizontal: space.lg, gap: space.lg },
  panel: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    backgroundColor: colors.bg,
    overflow: "hidden",
  },
  figure: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  coverImage: { width: "100%", maxHeight: 460 },
  caption: { textAlign: "center", paddingHorizontal: space.lg, paddingVertical: space.sm, fontSize: 12 },
  panelBody: { padding: 20, gap: space.lg },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: { backgroundColor: colors.surface, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 3 },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.muted,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: colors.ink,
    marginTop: -space.xs,
  },
  excerpt: { color: colors.muted, fontSize: 16, lineHeight: 25, marginTop: -space.sm },
  byline: {
    gap: 4,
    paddingVertical: space.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  bylineRole: { fontFamily: fonts.medium, color: colors.ink },
  bylineName: {
    color: colors.ink,
    textDecorationLine: "underline",
    textDecorationColor: colors.accent,
  },
  facts: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: colors.muted },
  callout: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.canvas,
    padding: space.lg,
    gap: space.sm,
  },
  calloutLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.ink,
  },
  calloutText: { fontSize: 16, lineHeight: 25 },
  body: { paddingTop: space.sm },
  noBody: { paddingHorizontal: 20 },
  panelFoot: { paddingHorizontal: 20, paddingBottom: 20, gap: space.xl },
  rail: {
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderRadius: radius.xl,
    backgroundColor: colors.accentSoft,
    padding: space.lg,
    gap: space.md,
    marginTop: space.lg,
  },
  railKicker: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.accent,
  },
  railList: { gap: space.sm },
  block: { gap: space.md, paddingTop: space.xl, borderTopWidth: 1, borderTopColor: colors.border },
  blockTitle: { fontSize: 20, lineHeight: 26 },
  faqList: { gap: space.sm },
  answer: { color: colors.muted, lineHeight: 24 },
  sourceList: { gap: space.sm },
  sourceRow: { flexDirection: "row", gap: space.sm },
  sourceNum: { minWidth: 18 },
  sourceText: { flex: 1, lineHeight: 20 },
  sourceTitle: { fontFamily: fonts.medium, color: colors.ink },
  sourceLink: {
    color: colors.ink,
    textDecorationLine: "underline",
    textDecorationColor: colors.accent,
  },
  contact: { marginTop: -space.sm },
  contactLink: { color: colors.ink, textDecorationLine: "underline" },
  disclaimer: {
    borderWidth: 1,
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    lineHeight: 20,
  },
  webLink: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: space.sm },
  keep: { gap: space.lg, paddingTop: space.xl, borderTopWidth: 1, borderTopColor: colors.border, marginTop: space.lg },
  keepHead: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: space.sm },
  keepLink: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.ink },
  keepList: { gap: space.md },
});
