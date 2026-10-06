import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { fetchFoods, type FoodSummary } from "@/api/foods";
import { DietMark, FoodRow } from "@/components/FoodRow";
import { PressableScale } from "@/components/PressableScale";
import { RingChart } from "@/components/RingChart";
import { Screen } from "@/components/Screen";
import { SearchInput } from "@/components/SearchInput";
import { ErrorState, LoadingState } from "@/components/States";
import { Text } from "@/components/Text";
import { haptic } from "@/lib/haptics";
import { forGrams, macroSplit, proteinPer100Kcal, shortName } from "@/lib/nutrition";
import { colors, fonts, layout, radius, shadow, space } from "@/theme";

type Side = "a" | "b";

const METRICS: { label: string; unit: string; get: (f: FoodSummary) => number; better: "high" | "low" }[] = [
  { label: "Calories", unit: "kcal", get: (f) => f.kcal, better: "low" },
  { label: "Protein", unit: "g", get: (f) => f.proteinG, better: "high" },
  { label: "Carbs", unit: "g", get: (f) => f.carbsG, better: "low" },
  { label: "Fat", unit: "g", get: (f) => f.fatG, better: "low" },
  { label: "Fibre", unit: "g", get: (f) => f.fiberG, better: "high" },
  { label: "Protein / 100 kcal", unit: "g", get: (f) => proteinPer100Kcal(f), better: "high" },
];

function FoodSlot({ food, onPress }: { food?: FoodSummary; onPress: () => void }) {
  const split = food ? macroSplit(food) : null;
  return (
    <PressableScale onPress={onPress} accessibilityLabel={food ? `Change ${food.name}` : "Pick a food"} style={styles.slot}>
      {food && split ? (
        <>
          <RingChart
            size={88}
            stroke={10}
            centerValue={String(food.kcal)}
            segments={[
              { value: split.proteinPct, color: colors.protein },
              { value: split.carbsPct, color: colors.carbs },
              { value: split.fatPct, color: colors.fat },
            ]}
          />
          <View style={styles.slotName}>
            <DietMark diet={food.diet} />
            <Text variant="heading" numberOfLines={2} style={styles.slotTitle}>
              {shortName(food.name)}
            </Text>
          </View>
          <Text variant="small">Tap to change</Text>
        </>
      ) : (
        <>
          <View style={styles.slotEmpty}>
            <Ionicons name="add" size={28} color={colors.ink} />
          </View>
          <Text variant="heading">Pick a food</Text>
        </>
      )}
    </PressableScale>
  );
}

export default function CompareScreen() {
  const params = useLocalSearchParams<{ a?: string; b?: string }>();
  const query = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });
  const [slugs, setSlugs] = useState<Record<Side, string | undefined>>({ a: params.a, b: params.b });
  const [picking, setPicking] = useState<Side | null>(null);
  const [search, setSearch] = useState("");

  const bySlug = useMemo(() => new Map((query.data ?? []).map((f) => [f.slug, f])), [query.data]);
  const a = slugs.a ? bySlug.get(slugs.a) : undefined;
  const b = slugs.b ? bySlug.get(slugs.b) : undefined;

  const options = useMemo(() => {
    const q = search.trim().toLowerCase();
    const other = picking === "a" ? slugs.b : slugs.a;
    return (query.data ?? []).filter(
      (f) => f.slug !== other && (!q || f.name.toLowerCase().includes(q) || f.hindiName.toLowerCase().includes(q)),
    );
  }, [query.data, search, picking, slugs]);

  if (query.isPending) return <LoadingState label="Loading foods…" />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => query.refetch()} />;

  if (picking) {
    return (
      <View style={styles.root}>
        <Stack.Screen options={{ title: "Pick a food" }} />
        <FlatList
          contentContainerStyle={styles.pickList}
          data={options}
          keyExtractor={(f) => f.slug}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListHeaderComponent={
            <View style={styles.pickHead}>
              <SearchInput value={search} onChangeText={setSearch} placeholder="Search foods" autoFocus style={styles.flex} />
              <Text variant="small" onPress={() => setPicking(null)} style={styles.cancel}>
                Cancel
              </Text>
            </View>
          }
          ItemSeparatorComponent={() => <View style={{ height: space.sm }} />}
          renderItem={({ item }) => (
            <FoodRow
              food={item}
              onPress={() => {
                haptic.tap();
                setSlugs((s) => ({ ...s, [picking]: item.slug }));
                setPicking(null);
                setSearch("");
              }}
            />
          )}
        />
      </View>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: "Compare foods" }} />
      <View style={styles.slots}>
        <FoodSlot food={a} onPress={() => setPicking("a")} />
        <View style={styles.vs}>
          <Text variant="label" style={styles.vsText}>
            vs
          </Text>
        </View>
        <FoodSlot food={b} onPress={() => setPicking("b")} />
      </View>

      {a && b ? (
        <View style={styles.table}>
          <View style={[styles.tr, styles.th]}>
            <Text variant="label" style={[styles.cell, styles.thText]}>
              Per 100 g
            </Text>
            <Text variant="label" style={[styles.val, styles.thText]} numberOfLines={1}>
              {shortName(a.name)}
            </Text>
            <Text variant="label" style={[styles.val, styles.thText]} numberOfLines={1}>
              {shortName(b.name)}
            </Text>
          </View>
          {METRICS.map((m, i) => {
            const va = m.get(a);
            const vb = m.get(b);
            const aWins = va !== vb && (m.better === "high" ? va > vb : va < vb);
            const bWins = va !== vb && !aWins;
            return (
              <View key={m.label} style={[styles.tr, i % 2 === 1 && styles.alt]}>
                <Text variant="body" style={styles.cell}>
                  {m.label}
                </Text>
                <Text variant="body" style={[styles.val, aWins && styles.win]}>
                  {va} {m.unit}
                </Text>
                <Text variant="body" style={[styles.val, bWins && styles.win]}>
                  {vb} {m.unit}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Text variant="small">Pick two foods to see protein, calories and macros side by side.</Text>
      )}

      {a && b && a.defaultServing && b.defaultServing ? (
        <View style={styles.serving}>
          <Text variant="heading">Per typical serving</Text>
          {[a, b].map((f) => {
            const s = forGrams(f, f.defaultServing!.grams);
            return (
              <Text key={f.slug} variant="small" style={styles.servingRow}>
                <Text variant="small" style={styles.servingName}>
                  {shortName(f.name)}
                </Text>{" "}
                ({f.defaultServing!.label}): {s.kcal} kcal · {s.proteinG} g protein
              </Text>
            );
          })}
        </View>
      ) : null}

      <View style={styles.links}>
        {[a, b].map((f) =>
          f ? (
            <Text key={f.slug} variant="small" style={styles.link} onPress={() => router.push(`/food/${f.slug}`)}>
              Open {shortName(f.name)}
            </Text>
          ) : null,
        )}
      </View>
      <Text variant="small">Highlighted values are the better pick for typical fat-loss and muscle-gain goals.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  pickList: { padding: space.lg, paddingBottom: layout.bottomClearance },
  pickHead: { flexDirection: "row", alignItems: "center", gap: space.md, marginBottom: space.lg },
  cancel: { color: colors.ink, fontFamily: fonts.semibold },
  slots: { flexDirection: "row", alignItems: "stretch", gap: space.sm },
  slot: {
    flex: 1,
    alignItems: "center",
    gap: space.sm,
    padding: space.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    minHeight: 190,
    justifyContent: "center",
    ...shadow.sm,
  },
  slotName: { flexDirection: "row", alignItems: "center", gap: 6 },
  slotTitle: { flexShrink: 1, textAlign: "center" },
  slotEmpty: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  vs: { justifyContent: "center" },
  vsText: { color: colors.accent },
  table: { borderRadius: radius.lg, overflow: "hidden", borderWidth: 1, borderColor: colors.border },
  tr: { flexDirection: "row", alignItems: "center", paddingHorizontal: space.md, paddingVertical: space.sm + 2, gap: space.sm },
  th: { backgroundColor: colors.ink },
  thText: { color: colors.bg },
  alt: { backgroundColor: colors.surface },
  cell: { flex: 1.3 },
  val: { flex: 1, textAlign: "right" },
  win: { fontFamily: fonts.bold, color: colors.ink, textDecorationLine: "underline", textDecorationColor: colors.accent },
  serving: { gap: space.xs },
  servingRow: { color: colors.ink },
  servingName: { fontFamily: fonts.semibold, color: colors.ink },
  links: { flexDirection: "row", justifyContent: "center", gap: space.xl },
  link: { color: colors.ink, textDecorationLine: "underline" },
});
