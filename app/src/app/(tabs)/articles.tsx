import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { fetchArticles } from "@/api/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { Chip } from "@/components/Chip";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { colors, space } from "@/theme";

const ALL = "all";

export default function ArticlesScreen() {
  const query = useQuery({ queryKey: ["articles"], queryFn: ({ signal }) => fetchArticles(signal) });
  const [category, setCategory] = useState(ALL);
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const a of query.data ?? []) {
      if (a.categorySlug && a.categoryLabel) seen.set(a.categorySlug, a.categoryLabel);
    }
    return [...seen.entries()];
  }, [query.data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (query.data ?? []).filter(
      (a) =>
        (category === ALL || a.categorySlug === category) &&
        (!q ||
          a.title.toLowerCase().includes(q) ||
          (a.excerpt ?? "").toLowerCase().includes(q) ||
          (a.subcategoryLabel ?? "").toLowerCase().includes(q)),
    );
  }, [query.data, category, search]);

  if (query.isPending) return <LoadingState label="Loading articles…" />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => query.refetch()} />;

  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={styles.content}
      data={filtered}
      keyExtractor={(a) => String(a.id)}
      renderItem={({ item }) => <ArticleCard article={item} />}
      ItemSeparatorComponent={() => <View style={{ height: space.lg }} />}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      initialNumToRender={6}
      windowSize={7}
      refreshControl={
        <RefreshControl
          refreshing={query.isRefetching}
          onRefresh={() => query.refetch()}
          tintColor={colors.accent}
          colors={[colors.accent]}
        />
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Search articles" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            <Chip label="All" active={category === ALL} onPress={() => setCategory(ALL)} />
            {categories.map(([slug, label]) => (
              <Chip key={slug} label={label} active={category === slug} onPress={() => setCategory(slug)} />
            ))}
          </ScrollView>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          title={query.data.length ? "No matching articles" : "No articles yet"}
          hint={query.data.length ? "Try a different search or category." : undefined}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, paddingBottom: space.xxl * 2 },
  header: { gap: space.md, marginBottom: space.lg },
  chips: { gap: space.sm },
});
