import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { FOOD_CATEGORY_LABEL, fetchFoods, type FoodDiet, type FoodSummary } from "@/api/foods";
import { Chip } from "@/components/Chip";
import { FoodRow } from "@/components/FoodRow";
import { PressableScale } from "@/components/PressableScale";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState, ErrorState } from "@/components/States";
import { SkeletonList } from "@/components/Skeleton";
import { Text } from "@/components/Text";
import { isHighProtein, proteinPer100Kcal } from "@/lib/nutrition";
import { colors, layout, radius, space } from "@/theme";

const ALL = "all";
const HIGH_PROTEIN = "high-protein";

const DIETS: { id: FoodDiet | typeof ALL; label: string }[] = [
  { id: ALL, label: "Any diet" },
  { id: "veg", label: "Veg" },
  { id: "egg", label: "Egg" },
  { id: "non-veg", label: "Non-veg" },
];

type SortId = "name" | "protein" | "density" | "kcal-low";
const SORTS: { id: SortId; label: string; compare: (a: FoodSummary, b: FoodSummary) => number }[] = [
  { id: "name", label: "A–Z", compare: (a, b) => a.name.localeCompare(b.name) },
  { id: "protein", label: "Most protein", compare: (a, b) => b.proteinG - a.proteinG },
  { id: "density", label: "Protein per kcal", compare: (a, b) => proteinPer100Kcal(b) - proteinPer100Kcal(a) },
  { id: "kcal-low", label: "Fewest kcal", compare: (a, b) => a.kcal - b.kcal },
];

export default function FoodsScreen() {
  const query = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });
  const [filter, setFilter] = useState(ALL);
  const [diet, setDiet] = useState<FoodDiet | typeof ALL>(ALL);
  const [sort, setSort] = useState<SortId>("name");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const present = new Set((query.data ?? []).map((f) => f.category));
    return Object.keys(FOOD_CATEGORY_LABEL).filter((c) => present.has(c));
  }, [query.data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cmp = SORTS.find((s) => s.id === sort)!.compare;
    return (query.data ?? [])
      .filter((f) => {
        if (diet !== ALL && f.diet !== diet) return false;
        if (filter === HIGH_PROTEIN && !isHighProtein(f)) return false;
        if (filter !== ALL && filter !== HIGH_PROTEIN && f.category !== filter) return false;
        return !q || f.name.toLowerCase().includes(q) || f.hindiName.toLowerCase().includes(q);
      })
      .sort(cmp);
  }, [query.data, filter, diet, sort, search]);

  if (query.isError) return <ErrorState error={query.error} onRetry={() => query.refetch()} />;

  const header = (
    <View style={styles.header}>
      <SearchInput value={search} onChangeText={setSearch} placeholder="Search foods (e.g. paneer, dal)" />
      <PressableScale onPress={() => router.push("/compare")} accessibilityLabel="Compare two foods" style={styles.compare}>
        <Ionicons name="git-compare-outline" size={20} color={colors.accent} />
        <View style={styles.compareText}>
          <Text variant="heading" style={styles.compareTitle}>
            Compare foods
          </Text>
          <Text variant="small" style={styles.compareSub}>
            Side-by-side protein, calories and macros
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.inkMuted} />
      </PressableScale>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {DIETS.map((d) => (
          <Chip key={d.id} label={d.label} active={diet === d.id} onPress={() => setDiet(d.id)} />
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Chip label="All foods" active={filter === ALL} onPress={() => setFilter(ALL)} />
        <Chip label="High protein" active={filter === HIGH_PROTEIN} onPress={() => setFilter(HIGH_PROTEIN)} />
        {categories.map((c) => (
          <Chip key={c} label={FOOD_CATEGORY_LABEL[c]} active={filter === c} onPress={() => setFilter(c)} />
        ))}
      </ScrollView>
      <View style={styles.sortRow}>
        <Text variant="small">
          {filtered.length} {filtered.length === 1 ? "food" : "foods"} · per 100 g
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sorts}>
          {SORTS.map((s) => (
            <Text
              key={s.id}
              variant="label"
              onPress={() => setSort(s.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: sort === s.id }}
              style={[styles.sort, sort === s.id && styles.sortActive]}
            >
              {s.label}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={styles.content}
      data={query.isPending ? [] : filtered}
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
      ListHeaderComponent={header}
      ListEmptyComponent={
        query.isPending ? <SkeletonList count={6} /> : <EmptyState title="No matching foods" hint="Try another name, diet or category." />
      }
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, paddingBottom: layout.bottomClearance },
  header: { gap: space.md, marginBottom: space.lg },
  chips: { gap: space.sm },
  compare: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    backgroundColor: colors.ink,
    borderRadius: radius.lg,
    padding: space.lg,
  },
  compareText: { flex: 1, gap: 2 },
  compareTitle: { color: colors.bg },
  compareSub: { color: colors.inkMuted },
  sortRow: { gap: space.sm },
  sorts: { gap: space.xs },
  sort: {
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    overflow: "hidden",
    color: colors.muted,
  },
  sortActive: { backgroundColor: colors.accentSoft, color: colors.ink },
});
