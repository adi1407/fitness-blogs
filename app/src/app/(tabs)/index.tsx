import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { fetchArticles } from "@/api/articles";
import { fetchFoods } from "@/api/foods";
import { ArticleCard } from "@/components/ArticleCard";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { ErrorState, LoadingState } from "@/components/States";
import { Text } from "@/components/Text";
import { isHighProtein, shortName } from "@/lib/nutrition";
import { TOOLS } from "@/lib/tools";
import { colors, radius, space } from "@/theme";

export default function HomeScreen() {
  const articles = useQuery({ queryKey: ["articles"], queryFn: ({ signal }) => fetchArticles(signal) });
  const foods = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });

  const refreshing = articles.isRefetching || foods.isRefetching;
  const onRefresh = () => {
    articles.refetch();
    foods.refetch();
  };

  const latest = articles.data?.slice(0, 5) ?? [];
  const proteinPicks = (foods.data ?? [])
    .filter(isHighProtein)
    .sort((a, b) => b.proteinG - a.proteinG)
    .slice(0, 4);

  return (
    <Screen refreshing={refreshing} onRefresh={onRefresh}>
      <View style={styles.hero}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          contentFit="contain"
          accessibilityIgnoresInvertColors
        />
        <View style={styles.heroText}>
          <Text variant="title">Evidence-based fitness, made simple.</Text>
          <Text variant="small">Articles, Indian food nutrition and calculators — all in one place.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="label">Calculators</Text>
        <View style={styles.toolRow}>
          {TOOLS.map((t) => (
            <Card
              key={t.id}
              onPress={() => router.push(`/calculator/${t.id}`)}
              accessibilityLabel={t.title}
              style={styles.tool}
            >
              <Ionicons name={t.icon} size={22} color={colors.accent} />
              <Text variant="small" style={styles.toolText} numberOfLines={2}>
                {t.title.replace(" calculator", "")}
              </Text>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text variant="label">Latest articles</Text>
          <Text variant="small" style={styles.link} onPress={() => router.push("/learn")}>
            See all
          </Text>
        </View>
        {articles.isPending ? (
          <LoadingState label="Loading articles…" />
        ) : articles.isError ? (
          <ErrorState error={articles.error} onRetry={() => articles.refetch()} />
        ) : (
          latest.map((a, i) => <ArticleCard key={a.id} article={a} compact={i > 0} />)
        )}
      </View>

      {proteinPicks.length ? (
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text variant="label">High-protein Indian foods</Text>
            <Text variant="small" style={styles.link} onPress={() => router.push("/foods")}>
              Food database
            </Text>
          </View>
          <View style={styles.foodGrid}>
            {proteinPicks.map((f) => (
              <Card
                key={f.slug}
                onPress={() => router.push(`/food/${f.slug}`)}
                accessibilityLabel={f.name}
                style={styles.foodTile}
              >
                <Text variant="heading" numberOfLines={1}>
                  {shortName(f.name)}
                </Text>
                <Text variant="small">
                  {f.proteinG} g protein · {f.kcal} kcal
                </Text>
              </Card>
            ))}
          </View>
        </View>
      ) : null}

      <Text variant="small" style={styles.disclaimer}>
        Educational information only — not medical advice. Consult a qualified professional for personal health
        decisions.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: space.lg,
  },
  logo: { width: 64, height: 64, borderRadius: radius.md },
  heroText: { flex: 1, gap: space.xs },
  section: { gap: space.md },
  sectionHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  link: { color: colors.ink, textDecorationLine: "underline" },
  toolRow: { flexDirection: "row", gap: space.md },
  tool: { flex: 1, alignItems: "center", gap: space.sm, paddingVertical: space.lg },
  toolText: { color: colors.ink, textAlign: "center" },
  foodGrid: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  foodTile: { flexBasis: "47%", flexGrow: 1, gap: 2 },
  disclaimer: { textAlign: "center", color: colors.subtle },
});
