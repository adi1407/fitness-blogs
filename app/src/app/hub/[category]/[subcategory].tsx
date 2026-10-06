import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

import { articleImage, fetchArticlesByCategory } from "@/api/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Screen } from "@/components/Screen";
import { Skeleton } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { StoryLead, StoryRow } from "@/components/Story";
import { Text } from "@/components/Text";
import { PILLAR_BY_SLUG, isPillarSlug } from "@/lib/pillars";
import { colors, fonts, radius, space } from "@/theme";

export default function SubcategoryScreen() {
  const { category, subcategory } = useLocalSearchParams<{ category: string; subcategory: string }>();
  const query = useQuery({
    queryKey: ["articles", "category", category],
    queryFn: ({ signal }) => fetchArticlesByCategory(String(category), signal),
    enabled: !!category,
  });

  const items = (query.data ?? []).filter((a) => a.subcategorySlug === subcategory);
  const label = items[0]?.subcategoryLabel ?? String(subcategory ?? "").replace(/-/g, " ");
  const categoryLabel =
    items[0]?.categoryLabel ?? (isPillarSlug(category) ? PILLAR_BY_SLUG[category].title : String(category ?? ""));
  const lead = items.find((a) => articleImage(a)) ?? items[0];
  const rest = items.filter((a) => a !== lead);

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <Stack.Screen options={{ title: "" }} />
      <View style={styles.intro}>
        <Breadcrumbs
          items={[{ label: "Learn", href: "/learn" }, { label: categoryLabel, href: `/hub/${category}` }, { label }]}
        />
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
          {label}
        </Text>
        {!query.isPending ? (
          <Text variant="small">
            {items.length} {items.length === 1 ? "guide" : "guides"} in {categoryLabel}
          </Text>
        ) : null}
      </View>

      {query.isPending ? (
        <View style={styles.loading}>
          <Skeleton height={200} rounded={radius.md} />
          <Skeleton height={24} width="80%" />
        </View>
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : !lead ? (
        <EmptyState title="Nothing here yet" hint="Check back soon." />
      ) : (
        <View>
          <StoryLead article={lead} label="Start here" context="subcategory" />
          {rest.map((a) => (
            <StoryRow key={a.id} article={a} context="subcategory" />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: space.sm, paddingTop: space.sm },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 34,
    lineHeight: 39,
    letterSpacing: -1.1,
    color: colors.ink,
    textTransform: "capitalize",
  },
  loading: { gap: space.md },
});
