import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { fetchArticles } from "@/api/articles";
import { fetchFoods } from "@/api/foods";
import { ArticleCard } from "@/components/ArticleCard";
import { Card } from "@/components/Card";
import { FeaturedArticleCard } from "@/components/FeaturedArticleCard";
import { GradientHero } from "@/components/GradientHero";
import { HorizontalRail } from "@/components/HorizontalRail";
import { ImageTile } from "@/components/ImageTile";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { Skeleton } from "@/components/Skeleton";
import { ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { ToolTile } from "@/components/ToolTile";
import { isHighProtein, shortName } from "@/lib/nutrition";
import { PILLARS } from "@/lib/pillars";
import { TOOLS } from "@/lib/tools";
import { colors, radius, space } from "@/theme";

const TRUST = [
  { icon: "shield-checkmark-outline", label: "Expert reviewed" },
  { icon: "library-outline", label: "Cited sources" },
  { icon: "flag-outline", label: "Built for India" },
] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <Animated.View entering={FadeInDown.duration(420).delay(delay)}>{children}</Animated.View>;
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const articles = useQuery({ queryKey: ["articles"], queryFn: ({ signal }) => fetchArticles(signal) });
  const foods = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });
  const all = [articles, foods];
  const refreshing = all.some((q) => q.isRefetching);
  const onRefresh = () => all.forEach((q) => q.refetch());

  const featured = articles.data?.slice(0, 5) ?? [];
  const latest = articles.data?.slice(5, 9) ?? [];
  const proteinPicks = useMemo(
    () =>
      (foods.data ?? [])
        .filter(isHighProtein)
        .sort((a, b) => b.proteinG - a.proteinG)
        .slice(0, 8),
    [foods.data],
  );
  const cardWidth = Math.min(width - space.lg * 2 - 24, 360);

  return (
    <Screen refreshing={refreshing} onRefresh={onRefresh}>
      <Reveal>
        <GradientHero
          eyebrow="Evidence-based fitness"
          title="Fitness that fits Indian life."
          subtitle="Clear answers, Indian food data and calculators — reviewed by experts."
        >
          <Pressable
            onPress={() => router.push("/search")}
            style={styles.heroSearch}
            accessibilityRole="search"
            accessibilityLabel="Search fitlives"
          >
            <Ionicons name="search" size={18} color={colors.inkMuted} />
            <Text variant="small" style={styles.heroSearchText}>
              Search protein, dal, fat loss…
            </Text>
          </Pressable>
        </GradientHero>
      </Reveal>

      <Reveal delay={60}>
        <View style={styles.section}>
          <SectionHeader eyebrow="Start here" title="Featured" onAction={() => router.push("/learn")} />
          {articles.isPending ? (
            <Skeleton height={300} rounded={radius.xl} />
          ) : articles.isError ? (
            <ErrorState error={articles.error} onRetry={() => articles.refetch()} />
          ) : (
            <HorizontalRail
              data={featured}
              itemWidth={cardWidth}
              keyExtractor={(a) => String(a.id)}
              renderItem={(a) => <FeaturedArticleCard article={a} />}
            />
          )}
        </View>
      </Reveal>

      <Reveal delay={120}>
        <View style={styles.section}>
          <SectionHeader eyebrow="Free tools" title="Calculators" onAction={() => router.push("/tools")} />
          <HorizontalRail
            data={TOOLS}
            itemWidth={160}
            keyExtractor={(t) => t.id}
            renderItem={(t) => <ToolTile tool={t} />}
          />
        </View>
      </Reveal>

      <View style={styles.section}>
        <SectionHeader eyebrow="Explore" title="Pick your goal" />
        {PILLARS.map((p) => (
          <ImageTile
            key={p.slug}
            image={p.image}
            eyebrow="Pillar guide"
            title={p.title}
            subtitle={p.tagline}
            height={150}
            onPress={() => router.push(`/hub/${p.slug}`)}
          />
        ))}
      </View>

      {proteinPicks.length ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Indian food database" title="Protein-rich picks" onAction={() => router.push("/foods")} />
          <HorizontalRail
            data={proteinPicks}
            itemWidth={150}
            keyExtractor={(f) => f.slug}
            renderItem={(f) => (
              <Card onPress={() => router.push(`/food/${f.slug}`)} accessibilityLabel={f.name} style={styles.foodTile}>
                <Text variant="display" style={styles.foodProtein}>
                  {Math.round(f.proteinG)}
                  <Text variant="small"> g</Text>
                </Text>
                <Text variant="label">protein / 100 g</Text>
                <Text variant="heading" numberOfLines={2} style={styles.foodName}>
                  {shortName(f.name)}
                </Text>
                <Text variant="small">{f.kcal} kcal</Text>
              </Card>
            )}
          />
        </View>
      ) : null}

      {latest.length ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Fresh" title="Latest articles" onAction={() => router.push("/learn")} />
          {latest.map((a) => (
            <ArticleCard key={a.id} article={a} compact />
          ))}
        </View>
      ) : null}

      <View style={styles.trust}>
        {TRUST.map((t) => (
          <View key={t.label} style={styles.trustItem}>
            <Ionicons name={t.icon} size={20} color={colors.accent} />
            <Text variant="small" style={styles.trustText}>
              {t.label}
            </Text>
          </View>
        ))}
      </View>

      <Text variant="small" style={styles.disclaimer}>
        Educational information only — not medical advice. Consult a qualified professional for personal health
        decisions.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: space.md },
  heroSearch: {
    marginTop: space.md,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: radius.pill,
    paddingHorizontal: space.lg,
    minHeight: 46,
  },
  heroSearchText: { color: colors.inkMuted },
  foodTile: { gap: 2, minHeight: 170 },
  foodProtein: { color: colors.ink },
  foodName: { marginTop: space.sm },
  trust: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: space.lg,
  },
  trustItem: { alignItems: "center", gap: 4, flex: 1 },
  trustText: { color: colors.ink, textAlign: "center", fontSize: 12 },
  disclaimer: { textAlign: "center", color: colors.subtle },
});
