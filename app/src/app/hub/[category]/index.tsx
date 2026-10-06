import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { articleImage, fetchArticlesByCategory } from "@/api/articles";
import { fetchTaxonomy } from "@/api/library";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PillButton } from "@/components/PillButton";
import { PressableScale } from "@/components/PressableScale";
import { Screen } from "@/components/Screen";
import { Skeleton } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { StoryLead, StoryRow } from "@/components/Story";
import { Text } from "@/components/Text";
import { ToolCard } from "@/components/ToolTile";
import { SITE_URL } from "@/config";
import { openLink } from "@/lib/links";
import { PILLAR_BY_SLUG, isPillarSlug } from "@/lib/pillars";
import { TOOLS } from "@/lib/tools";
import { colors, fonts, radius, shadow, space } from "@/theme";

function Heading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.heading}>
      <Text variant="title" accessibilityRole="header">
        {title}
      </Text>
      {subtitle ? <Text variant="small">{subtitle}</Text> : null}
    </View>
  );
}

export default function HubScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const pillar = isPillarSlug(category) ? PILLAR_BY_SLUG[category] : null;

  const articles = useQuery({
    queryKey: ["articles", "category", category],
    queryFn: ({ signal }) => fetchArticlesByCategory(String(category), signal),
    enabled: !!category,
  });
  const taxonomy = useQuery({ queryKey: ["taxonomy"], queryFn: ({ signal }) => fetchTaxonomy(signal), staleTime: 60 * 60 * 1000 });

  const cat = taxonomy.data?.categories.find((c) => c.slug === category);
  const title = pillar?.title ?? cat?.label ?? "Guide";

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles.data ?? []) {
      if (a.subcategorySlug) counts.set(a.subcategorySlug, (counts.get(a.subcategorySlug) ?? 0) + 1);
    }
    return (cat?.subcategories ?? []).filter((s) => counts.has(s.slug)).map((s) => ({ ...s, count: counts.get(s.slug) ?? 0 }));
  }, [articles.data, cat]);

  const tools = TOOLS.filter((t) => pillar?.tools.includes(t.id));
  const list = articles.data ?? [];
  const lead = list.find((a) => articleImage(a)) ?? list[0];
  const rest = list.filter((a) => a !== lead);

  return (
    <Screen refreshing={articles.isRefetching} onRefresh={() => articles.refetch()}>
      <Stack.Screen options={{ title: "" }} />

      <Animated.View entering={FadeInDown.duration(380)} style={styles.intro}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn", href: "/learn" }, { label: title }]} />
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
          {pillar?.headline ?? title}
        </Text>
        <Text variant="body" style={styles.lede}>
          {pillar?.intro ?? cat?.description ?? ""}
        </Text>
      </Animated.View>

      {pillar ? (
        <Animated.View entering={FadeInDown.delay(60).duration(380)} style={styles.photo}>
          <Image source={pillar.image} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
          <View style={styles.photoBadge}>
            <Text style={styles.photoBadgeText}>{pillar.tagline}</Text>
          </View>
        </Animated.View>
      ) : null}

      {pillar ? (
        <View style={styles.quick}>
          <Text variant="heading">Quick start</Text>
          <Text variant="small" style={styles.quickText}>
            {pillar.quickStart.text}
          </Text>
          <View style={styles.quickActions}>
            {pillar.quickStart.actions.map((a, i) => (
              <PillButton
                key={a.label}
                label={a.label}
                variant={i === 0 ? "primary" : "ghost"}
                icon={i === 0 ? "arrow-forward" : undefined}
                onPress={() => router.push(a.href)}
              />
            ))}
          </View>
        </View>
      ) : null}

      {topics.length ? (
        <View style={styles.section}>
          <Heading title="Core topics" subtitle={`Browse ${title.toLowerCase()} guides by topic.`} />
          <View style={styles.topics}>
            {topics.map((s) => (
              <PressableScale
                key={s.slug}
                onPress={() => router.push(`/hub/${category}/${s.slug}`)}
                accessibilityLabel={`${s.label}, ${s.count} guides`}
                scaleTo={0.97}
                style={styles.topic}
              >
                <Text variant="heading" numberOfLines={2} style={styles.topicTitle}>
                  {s.label}
                </Text>
                <View style={styles.topicFoot}>
                  <Text variant="small">
                    {s.count} {s.count === 1 ? "guide" : "guides"}
                  </Text>
                  <Ionicons name="arrow-forward" size={14} color={colors.muted} />
                </View>
              </PressableScale>
            ))}
          </View>
        </View>
      ) : null}

      {tools.length ? (
        <View style={styles.section}>
          <Heading title="Do the maths" subtitle="Calculators that pair with these guides." />
          <View style={styles.cards}>
            {tools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.section}>
        <Heading title={`Latest in ${title}`} />
        {articles.isPending ? (
          <View style={styles.cards}>
            <Skeleton height={200} rounded={radius.md} />
            <Skeleton height={24} width="80%" />
          </View>
        ) : articles.isError ? (
          <ErrorState error={articles.error} onRetry={() => articles.refetch()} />
        ) : !lead ? (
          <EmptyState title="Articles are on the way" hint="Our writers are working on this guide." />
        ) : (
          <View>
            <StoryLead article={lead} label="Start here" context="category" />
            {rest.map((a) => (
              <StoryRow key={a.id} article={a} context="category" />
            ))}
          </View>
        )}
      </View>

      <Text variant="small" style={styles.disclaimer}>
        Educational information only — not medical advice. Read our{" "}
        <Text style={styles.disclaimerLink} onPress={() => openLink(`${SITE_URL}/medical-disclaimer`)} accessibilityRole="link">
          medical disclaimer
        </Text>
        .
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: space.md, paddingTop: space.sm },
  title: { fontFamily: fonts.semibold, fontSize: 34, lineHeight: 39, letterSpacing: -1.1, color: colors.ink },
  lede: { color: colors.muted, fontSize: 16, lineHeight: 25 },
  photo: {
    width: "100%",
    aspectRatio: 16 / 10,
    borderRadius: radius.xl,
    overflow: "hidden",
    backgroundColor: colors.surface,
    justifyContent: "flex-end",
    padding: space.md,
    ...shadow.md,
  },
  photoBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: 6,
  },
  photoBadgeText: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink },
  quick: {
    gap: space.sm,
    padding: space.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    backgroundColor: "#FFF8EE",
  },
  quickText: { lineHeight: 20 },
  quickActions: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm },
  section: { gap: space.lg },
  heading: { gap: 3 },
  topics: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  topic: {
    flexBasis: "47%",
    flexGrow: 1,
    minHeight: 100,
    justifyContent: "space-between",
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  topicTitle: { fontSize: 15, lineHeight: 20 },
  topicFoot: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: space.md },
  cards: { gap: space.md },
  disclaimer: { textAlign: "center", lineHeight: 19 },
  disclaimerLink: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink, textDecorationLine: "underline" },
});
