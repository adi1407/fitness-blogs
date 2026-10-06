import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { FOOD_CATEGORY_LABEL, fetchFoods } from "@/api/foods";
import { Chip } from "@/components/Chip";
import { FoodRow } from "@/components/FoodRow";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { Text } from "@/components/Text";
import { isHighProtein } from "@/lib/nutrition";
import { colors, space } from "@/theme";

const ALL = "all";
const HIGH_PROTEIN = "high-protein";

export default function FoodsScreen() {
  const query = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });
  const [filter, setFilter] = useState(ALL);
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const present = new Set((query.data ?? []).map((f) => f.category));
    return Object.keys(FOOD_CATEGORY_LABEL).filter((c) => present.has(c));
  }, [query.data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (query.data ?? []).filter((f) => {
      if (filter === HIGH_PROTEIN && !isHighProtein(f)) return false;
      if (filter !== ALL && filter !== HIGH_PROTEIN && f.category !== filter) return false;
      return !q || f.name.toLowerCase().includes(q) || f.hindiName.toLowerCase().includes(q);
    });
  }, [query.data, filter, search]);

  if (query.isPending) return <LoadingState label="Loading foods…" />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => query.refetch()} />;

  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={styles.content}
      data={filtered}
      keyExtractor={(f) => f.slug}
      renderItem={({ item }) => <FoodRow food={item} />}
      ItemSeparatorComponent={() => <View style={{ height: space.sm }} />}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      initialNumToRender={12}
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
          <SearchInput value={search} onChangeText={setSearch} placeholder="Search foods (e.g. paneer, dal)" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            <Chip label="All" active={filter === ALL} onPress={() => setFilter(ALL)} />
            <Chip label="High protein" active={filter === HIGH_PROTEIN} onPress={() => setFilter(HIGH_PROTEIN)} />
            {categories.map((c) => (
              <Chip key={c} label={FOOD_CATEGORY_LABEL[c]} active={filter === c} onPress={() => setFilter(c)} />
            ))}
          </ScrollView>
          <Text variant="small">
            {filtered.length} {filtered.length === 1 ? "food" : "foods"} · values per 100 g
          </Text>
        </View>
      }
      ListEmptyComponent={<EmptyState title="No matching foods" hint="Try another name or category." />}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, paddingBottom: space.xxl * 2 },
  header: { gap: space.md, marginBottom: space.lg },
  chips: { gap: space.sm },
});
