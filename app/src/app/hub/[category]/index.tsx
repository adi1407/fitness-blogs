import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { fetchArticlesByCategory } from "@/api/articles";
import { fetchTaxonomy } from "@/api/library";
import { ArticleCard } from "@/components/ArticleCard";
import { Chip } from "@/components/Chip";
import { FeaturedArticleCard } from "@/components/FeaturedArticleCard";
import { ParallaxHeader } from "@/components/ParallaxHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { ToolTile } from "@/components/ToolTile";
import { PILLAR_BY_SLUG, isPillarSlug } from "@/lib/pillars";
import { TOOLS } from "@/lib/tools";
import { colors, layout, space } from "@/theme";

const HERO = 340;

export default function HubScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const pillar = isPillarSlug(category) ? PILLAR_BY_SLUG[category] : null;
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const articles = useQuery({
    queryKey: ["articles", "category", category],
    queryFn: ({ signal }) => fetchArticlesByCategory(String(category), signal),
    enabled: !!category,
  });
  const taxonomy = useQuery({ queryKey: ["taxonomy"], queryFn: ({ signal }) => fetchTaxonomy(signal), staleTime: 60 * 60 * 1000 });

  const cat = taxonomy.data?.categories.find((c) => c.slug === category);
  const title = pillar?.title ?? cat?.label ?? "Guide";

  const subcategories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles.data ?? []) {
      if (a.subcategorySlug) counts.set(a.subcategorySlug, (counts.get(a.subcategorySlug) ?? 0) + 1);
    }
    const fromTaxonomy = cat?.subcategories ?? [];
    return fromTaxonomy
      .filter((s) => counts.has(s.slug))
      .map((s) => ({ ...s, count: counts.get(s.slug) ?? 0 }));
  }, [articles.data, cat]);

  const tools = TOOLS.filter((t) => pillar?.tools.includes(t.id));
  const [lead, ...rest] = articles.data ?? [];

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: "", headerTransparent: true, headerTintColor: colors.bg }} />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: layout.bottomClearance }}
        refreshControl={
          <RefreshControl refreshing={articles.isRefetching} onRefresh={() => articles.refetch()} tintColor={colors.accent} />
        }
      >
        <ParallaxHeader image={pillar?.image ?? null} height={HERO} scrollY={scrollY}>
          <Text variant="label" style={styles.eyebrow}>
            Pillar guide
          </Text>
          <Text variant="display" style={styles.heroTitle}>
            {title}
          </Text>
          {pillar ? (
            <Text variant="body" style={styles.heroSub}>
              {pillar.tagline}
            </Text>
          ) : null}
        </ParallaxHeader>

        <View style={styles.body}>
          <Text variant="body" style={styles.intro}>
            {pillar?.intro ?? cat?.description ?? ""}
          </Text>

          {subcategories.length ? (
            <View style={styles.section}>
              <SectionHeader eyebrow="Topics" title="Browse by topic" />
              <View style={styles.chips}>
                {subcategories.map((s) => (
                  <Chip
                    key={s.slug}
                    label={`${s.label} · ${s.count}`}
                    onPress={() => router.push(`/hub/${category}/${s.slug}`)}
                  />
                ))}
              </View>
            </View>
          ) : null}

          {tools.length ? (
            <View style={styles.section}>
              <SectionHeader eyebrow="Tools" title="Do the maths" />
              <View style={styles.tools}>
                {tools.map((t) => (
                  <View key={t.id} style={styles.toolCell}>
                    <ToolTile tool={t} height={140} />
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <View style={styles.section}>
            <SectionHeader eyebrow="Read" title={`Latest in ${title}`} />
            {articles.isPending ? (
              <SkeletonList count={2} />
            ) : articles.isError ? (
              <ErrorState error={articles.error} onRetry={() => articles.refetch()} />
            ) : !lead ? (
              <EmptyState title="Articles are on the way" hint="Our writers are working on this guide." />
            ) : (
              <>
                <FeaturedArticleCard article={lead} />
                {rest.map((a) => (
                  <ArticleCard key={a.id} article={a} compact />
                ))}
              </>
            )}
          </View>

          <Text variant="small" style={styles.disclaimer}>
            Educational information only — not medical advice.
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  eyebrow: { color: colors.accent },
  heroTitle: { color: colors.bg, fontSize: 34, lineHeight: 40 },
  heroSub: { color: "#D4D4D4" },
  body: { padding: space.lg, gap: space.xl },
  intro: { fontSize: 16, lineHeight: 25, color: colors.muted },
  section: { gap: space.md },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  tools: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  toolCell: { flexBasis: "47%", flexGrow: 1 },
  disclaimer: { textAlign: "center", color: colors.subtle },
});
