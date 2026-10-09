import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { useDeferredValue, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from "react-native";

import { DIET_LABEL, FOOD_CATEGORY_LABEL, fetchFoods, type FoodDiet } from "@/api/foods";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Chip } from "@/components/Chip";
import { FoodCard } from "@/components/FoodCard";
import { PillButton } from "@/components/PillButton";
import { SearchInput } from "@/components/SearchInput";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { openLink } from "@/lib/links";
import { isHighProtein, isLowCalorie, proteinPer100Kcal } from "@/lib/nutrition";
import { colors, fonts, layout, radius, space } from "@/theme";

type SortId = "protein-density" | "kcal-asc" | "name";

const SORTS: { id: SortId; label: string }[] = [
  { id: "protein-density", label: "Protein / kcal" },
  { id: "kcal-asc", label: "Lowest kcal" },
  { id: "name", label: "A–Z" },
];

const DIETS: FoodDiet[] = ["veg", "egg", "non-veg"];
const IFCT_URL = "https://www.nin.res.in/ebooks/IFCT2017.pdf";

export default function FoodsScreen() {
  const query = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });
  const [search, setSearch] = useState("");
  const [diet, setDiet] = useState<FoodDiet | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [highProtein, setHighProtein] = useState(false);
  const [lowCalorie, setLowCalorie] = useState(false);
  const [sort, setSort] = useState<SortId>("protein-density");
  const deferredSearch = useDeferredValue(search);

  const categories = useMemo(() => {
    const present = new Set((query.data ?? []).map((f) => f.category));
    return Object.keys(FOOD_CATEGORY_LABEL).filter((c) => present.has(c));
  }, [query.data]);

  const visible = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    return (query.data ?? [])
      .filter((f) => {
        if (diet && f.diet !== diet) return false;
        if (category && f.category !== category) return false;
        if (highProtein && !isHighProtein(f)) return false;
        if (lowCalorie && !isLowCalorie(f)) return false;
        return !q || `${f.name} ${f.hindiName} ${f.slug.replace(/-/g, " ")}`.toLowerCase().includes(q);
      })
      .sort((a, b) => {
        if (sort === "kcal-asc") return a.kcal - b.kcal;
        if (sort === "name") return a.name.localeCompare(b.name);
        return proteinPer100Kcal(b) - proteinPer100Kcal(a);
      });
  }, [query.data, deferredSearch, diet, category, highProtein, lowCalorie, sort]);

  const filtersActive = Boolean(search || diet || category || highProtein || lowCalorie);

  const reset = () => {
    setSearch("");
    setDiet(null);
    setCategory(null);
    setHighProtein(false);
    setLowCalorie(false);
  };

  if (query.isError) return <ErrorState error={query.error} onRetry={() => query.refetch()} />;

  const header = (
    <View style={styles.header}>
      <View style={styles.intro}>
        <Breadcrumbs items={[{ label: "Library", href: "/library" }, { label: "Indian foods" }]} />
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
          Indian food calories & protein
        </Text>
        <Text variant="body" style={styles.lede}>
          Calories, protein, carbs and fat for the foods you actually eat — per katori, roti or piece as well as per
          100 g. Tap any food for the full breakdown and a serving calculator.
        </Text>
      </View>

      <View style={styles.panel}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search paneer, dal, roti, banana…"
          style={styles.search}
        />
        <View style={styles.chips} accessibilityLabel="Diet and nutrition filters">
          {DIETS.map((d) => (
            <Chip key={d} label={DIET_LABEL[d]} active={diet === d} onPress={() => setDiet(diet === d ? null : d)} />
          ))}
          <Chip label="High protein" active={highProtein} onPress={() => setHighProtein((v) => !v)} />
          <Chip label="Low calorie" active={lowCalorie} onPress={() => setLowCalorie((v) => !v)} />
        </View>
        <View style={styles.chips} accessibilityLabel="Category">
          <Chip label="All" active={category === null} onPress={() => setCategory(null)} />
          {categories.map((c) => (
            <Chip
              key={c}
              label={FOOD_CATEGORY_LABEL[c]}
              active={category === c}
              onPress={() => setCategory(category === c ? null : c)}
            />
          ))}
        </View>
      </View>

      <View style={styles.meta}>
        <Text variant="small" accessibilityLiveRegion="polite">
          {query.isPending ? "Loading foods…" : `${visible.length} ${visible.length === 1 ? "food" : "foods"}`}
          {filtersActive ? (
            <>
              {" · "}
              <Text style={styles.clear} onPress={reset} accessibilityRole="button" suppressHighlighting>
                Clear filters
              </Text>
            </>
          ) : null}
        </Text>
        <Pressable
          onPress={() => router.push("/compare")}
          accessibilityRole="link"
          hitSlop={8}
          style={styles.compare}
        >
          <Ionicons name="git-compare-outline" size={14} color={colors.ink} />
          <Text style={styles.compareText}>Compare</Text>
        </Pressable>
      </View>

      <View style={styles.sorts} accessibilityRole="radiogroup" accessibilityLabel="Sort foods">
        {SORTS.map((s) => {
          const active = sort === s.id;
          return (
            <Pressable
              key={s.id}
              onPress={() => setSort(s.id)}
              accessibilityRole="radio"
              accessibilityState={{ checked: active }}
              style={[styles.sort, active && styles.sortActive]}
            >
              <Text style={[styles.sortText, active && styles.sortTextActive]} numberOfLines={1}>
                {s.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  const footer = query.isPending ? null : (
    <View style={styles.footer}>
      <View style={styles.planCard}>
        <Text variant="heading">Turn these numbers into a plan</Text>
        <Text variant="small" style={styles.planText}>
          Work out your daily protein and calorie targets first, then build meals around 2–3 high-protein foods from
          the list.
        </Text>
        <View style={styles.planButtons}>
          <PillButton label="Protein calculator" onPress={() => router.push("/calculator/protein")} style={styles.planButton} />
          <PillButton
            label="Calorie calculator"
            variant="ghost"
            onPress={() => router.push("/calculator/calorie")}
            style={styles.planButton}
          />
          <PillButton
            label="Protein guide"
            variant="ghost"
            onPress={() => router.push("/hub/nutrition/protein")}
            style={styles.planButton}
          />
        </View>
      </View>

      <View style={styles.source}>
        <Text variant="title" accessibilityRole="header">
          Where these numbers come from
        </Text>
        <Text variant="body" style={styles.sourceText}>
          Values come from the{" "}
          <Text style={styles.link} onPress={() => openLink(IFCT_URL)} accessibilityRole="link" suppressHighlighting>
            Indian Food Composition Tables 2017
          </Text>{" "}
          published by the ICMR–National Institute of Nutrition. Each food page lists its IFCT food code so you can
          check it yourself. Dals and grains are given for the dry (raw) weight, because that is what the tables
          measure — serving sizes show the cooked portion it makes.
        </Text>
      </View>

      <Text variant="small" style={styles.disclaimer}>
        Educational information only. Nutrient values vary by variety, recipe and cooking method.{" "}
        <Text
          style={styles.link}
          onPress={() => openLink(`${SITE_URL}/medical-disclaimer`)}
          accessibilityRole="link"
          suppressHighlighting
        >
          Medical disclaimer
        </Text>
      </Text>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <FlatList
        style={styles.root}
        contentContainerStyle={styles.content}
        data={query.isPending ? [] : visible}
        keyExtractor={(f) => f.slug}
        renderItem={({ item }) => <FoodCard food={item} />}
        ItemSeparatorComponent={Separator}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        initialNumToRender={8}
        windowSize={9}
        refreshControl={
          <RefreshControl
            refreshing={query.isRefetching}
            onRefresh={() => query.refetch()}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        ListEmptyComponent={
          query.isPending ? (
            <SkeletonList count={5} image={false} />
          ) : (
            <EmptyState title="No foods match those filters" hint="Try another name, diet or category." />
          )
        }
      />
    </>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, paddingBottom: layout.bottomClearance },
  header: { gap: space.lg, marginBottom: space.lg },
  intro: { gap: space.md, paddingTop: space.sm },
  title: { fontFamily: fonts.semibold, fontSize: 32, lineHeight: 37, letterSpacing: -1, color: colors.ink },
  lede: { color: colors.muted, fontSize: 16, lineHeight: 25 },
  panel: {
    gap: space.md,
    padding: space.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  search: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.md },
  clear: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink, textDecorationLine: "underline" },
  compare: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compareText: { fontFamily: fonts.semibold, fontSize: 12.5, color: colors.ink },
  sorts: {
    flexDirection: "row",
    padding: 3,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginTop: -space.sm,
  },
  sort: { flex: 1, alignItems: "center", justifyContent: "center", minHeight: 34, paddingHorizontal: 4, borderRadius: radius.sm },
  sortActive: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border },
  sortText: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.muted, textAlign: "center" },
  sortTextActive: { color: colors.ink, fontFamily: fonts.semibold },
  separator: { height: space.md },
  footer: { gap: space.xl, marginTop: space.xxl },
  planCard: {
    gap: space.sm,
    padding: space.xl,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  planText: { lineHeight: 19 },
  planButtons: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm },
  planButton: { minHeight: 40, paddingHorizontal: space.lg },
  source: { gap: space.sm },
  sourceText: { color: colors.muted, lineHeight: 24 },
  link: { fontFamily: fonts.semibold, color: colors.ink, textDecorationLine: "underline" },
  disclaimer: { lineHeight: 19 },
});
