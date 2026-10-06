import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { fetchArticlesByCategory } from "@/api/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { colors, layout, space } from "@/theme";

export default function SubcategoryScreen() {
  const { category, subcategory } = useLocalSearchParams<{ category: string; subcategory: string }>();
  const query = useQuery({
    queryKey: ["articles", "category", category],
    queryFn: ({ signal }) => fetchArticlesByCategory(String(category), signal),
    enabled: !!category,
  });

  const items = (query.data ?? []).filter((a) => a.subcategorySlug === subcategory);
  const label = items[0]?.subcategoryLabel ?? String(subcategory ?? "").replace(/-/g, " ");
  const categoryLabel = items[0]?.categoryLabel ?? "";

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: label }} />
      {query.isPending ? (
        <SkeletonList count={3} />
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(a) => String(a.id)}
          renderItem={({ item }) => <ArticleCard article={item} />}
          ItemSeparatorComponent={() => <View style={{ height: space.lg }} />}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={query.isRefetching} onRefresh={() => query.refetch()} tintColor={colors.accent} />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              {categoryLabel ? (
                <Text variant="label" style={styles.eyebrow}>
                  {categoryLabel}
                </Text>
              ) : null}
              <Text variant="display" style={styles.title}>
                {label}
              </Text>
              <Text variant="small">
                {items.length} {items.length === 1 ? "article" : "articles"}
              </Text>
            </View>
          }
          ListEmptyComponent={<EmptyState title="Nothing here yet" hint="Check back soon." />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, paddingBottom: layout.bottomClearance },
  header: { gap: space.xs, marginBottom: space.xl },
  eyebrow: { color: colors.accent },
  title: { textTransform: "capitalize" },
});
