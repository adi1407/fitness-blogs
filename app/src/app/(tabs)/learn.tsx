import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";

import { fetchArticles } from "@/api/articles";
import { fetchTaxonomy } from "@/api/library";
import { ArticleCard } from "@/components/ArticleCard";
import { Chip } from "@/components/Chip";
import { HorizontalRail } from "@/components/HorizontalRail";
import { ImageTile } from "@/components/ImageTile";
import { SearchInput } from "@/components/SearchInput";
import { SectionHeader } from "@/components/SectionHeader";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { PILLARS } from "@/lib/pillars";
import { colors, layout, space } from "@/theme";

const ALL = "all";

export default function LearnScreen() {
  const { width } = useWindowDimensions();
  const query = useQuery({ queryKey: ["articles"], queryFn: ({ signal }) => fetchArticles(signal) });
  const taxonomy = useQuery({ queryKey: ["taxonomy"], queryFn: ({ signal }) => fetchTaxonomy(signal), staleTime: 60 * 60 * 1000 });
  const [category, setCategory] = useState(ALL);
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    if (taxonomy.data?.categories.length) return taxonomy.data.categories.map((c) => [c.slug, c.label] as const);
    const seen = new Map<string, string>();
    for (const a of query.data ?? []) if (a.categorySlug && a.categoryLabel) seen.set(a.categorySlug, a.categoryLabel);
    return [...seen.entries()];
  }, [taxonomy.data, query.data]);

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

  if (query.isPending) return <SkeletonList count={3} />;
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
      initialNumToRender={5}
      windowSize={7}
      refreshControl={
        <RefreshControl
          refreshing={query.isRefetching}
          onRefresh={() => {
            query.refetch();
            taxonomy.refetch();
          }}
          tintColor={colors.accent}
          colors={[colors.accent]}
        />
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <SectionHeader eyebrow="Pillar guides" title="Start with a goal" />
          <HorizontalRail
            data={PILLARS}
            itemWidth={Math.min(width * 0.72, 300)}
            keyExtractor={(p) => p.slug}
            renderItem={(p) => (
              <ImageTile
                image={p.image}
                eyebrow="Guide"
                title={p.title}
                subtitle={p.tagline}
                height={170}
                onPress={() => router.push(`/hub/${p.slug}`)}
              />
            )}
          />
          <SectionHeader eyebrow="Library" title="All articles" />
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
  content: { padding: space.lg, paddingBottom: layout.bottomClearance },
  header: { gap: space.md, marginBottom: space.lg },
  chips: { gap: space.sm },
});
