import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { DIET_LABEL, FOOD_CATEGORY_LABEL, fetchFood, type Food, type FoodServing } from "@/api/foods";
import { HeroStat, HeroStats, ResultHero } from "@/calculators/ui";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { MacroBar } from "@/components/MacroBar";
import { RingChart } from "@/components/RingChart";
import { Screen } from "@/components/Screen";
import { ErrorState, LoadingState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { openLink } from "@/lib/links";
import { forGrams, formatG, macroSplit, proteinPer100Kcal, shortName } from "@/lib/nutrition";
import { colors, fonts, radius, space } from "@/theme";

function servingOptions(food: Food): FoodServing[] {
  const list = food.servings.length ? [...food.servings] : [];
  if (!list.some((s) => s.grams === 100)) list.push({ label: "100 g", grams: 100 });
  return list;
}

export default function FoodScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const query = useQuery({
    queryKey: ["food", slug],
    queryFn: ({ signal }) => fetchFood(String(slug), signal),
    enabled: !!slug,
  });
  const [grams, setGrams] = useState<number | null>(null);

  const food = query.data?.food;
  const servings = useMemo(() => (food ? servingOptions(food) : []), [food]);
  const activeGrams = grams ?? food?.defaultServing?.grams ?? 100;
  const scaled = food ? forGrams(food, activeGrams) : null;

  const header = <Stack.Screen options={{ title: food ? shortName(food.name) : "Food" }} />;

  if (query.isPending) return <>{header}<LoadingState label="Loading food…" /></>;
  if (query.isError) return <>{header}<ErrorState error={query.error} onRetry={() => query.refetch()} /></>;

  const { food: f, compare, related } = query.data;
  const split = macroSplit(f);
  const activeLabel = servings.find((s) => s.grams === activeGrams)?.label ?? `${activeGrams} g`;

  const rows: [string, string][] = [
    ["Energy", `${f.kcal} kcal`],
    ["Protein", formatG(f.proteinG)],
    ["Carbohydrates", formatG(f.carbsG)],
    ["Fat", formatG(f.fatG)],
    ["Fibre", formatG(f.fiberG)],
    ...(f.calciumMg != null ? ([["Calcium", `${f.calciumMg} mg`]] as [string, string][]) : []),
    ...(f.ironMg != null ? ([["Iron", `${f.ironMg} mg`]] as [string, string][]) : []),
  ];

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      {header}
      <View style={styles.head}>
        <Text variant="label">
          {[FOOD_CATEGORY_LABEL[f.category] ?? f.category, DIET_LABEL[f.diet]].join(" · ")}
        </Text>
        <Text variant="display">{f.name}</Text>
        {f.hindiName ? <Text variant="small">{f.hindiName}</Text> : null}
      </View>

      <View style={styles.section}>
        <Text variant="label">Serving</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {servings.map((s) => (
            <Chip key={`${s.grams}-${s.label}`} label={s.label} active={s.grams === activeGrams} onPress={() => setGrams(s.grams)} />
          ))}
        </ScrollView>
        <ResultHero
          label={activeLabel}
          value={scaled!.kcal}
          unit="kcal"
          caption={`${activeGrams} g ${f.basisLabel}`}
          aside={
            <RingChart
              size={92}
              stroke={10}
              dark
              track="rgba(255,255,255,0.08)"
              centerValue={`${split.proteinPct}%`}
              centerLabel="protein"
              segments={[
                { value: split.proteinPct, color: colors.bg },
                { value: split.carbsPct, color: colors.carbs },
                { value: split.fatPct, color: colors.inkMuted },
              ]}
            />
          }
        >
          <HeroStats>
            <HeroStat label="Protein" value={`${scaled!.proteinG} g`} />
            <HeroStat label="Carbs" value={`${scaled!.carbsG} g`} />
            <HeroStat label="Fat" value={`${scaled!.fatG} g`} />
          </HeroStats>
        </ResultHero>
      </View>

      <Card style={styles.section}>
        <Text variant="heading">Where the calories come from</Text>
        <MacroBar {...split} />
        <Text variant="small">
          {proteinPer100Kcal(f)} g protein per 100 kcal · {scaled!.fiberG} g fibre per serving
        </Text>
      </Card>

      {f.intro ? <Text variant="body">{f.intro}</Text> : null}

      <View style={styles.section}>
        <Text variant="heading">Nutrition per 100 g ({f.basisLabel})</Text>
        <View style={styles.table}>
          {rows.map(([k, v], i) => (
            <View key={k} style={[styles.row, i % 2 === 1 && styles.rowAlt]}>
              <Text variant="body">{k}</Text>
              <Text variant="body" style={styles.rowValue}>
                {v}
              </Text>
            </View>
          ))}
        </View>
        <Text variant="small">
          Source: {f.source}
          {f.sourceRef ? ` (${f.sourceRef}${f.sourceName ? `, ${f.sourceName}` : ""})` : ""}.
          {f.sourceNote ? ` ${f.sourceNote}` : ""} Values vary by variety and preparation.
        </Text>
      </View>

      {f.tips.length ? (
        <View style={styles.section}>
          <Text variant="heading">Tips</Text>
          {f.tips.map((t) => (
            <View key={t} style={styles.tip}>
              <View style={styles.bullet} />
              <Text variant="body" style={styles.tipText}>
                {t}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {compare ? (
        <Card
          onPress={() => router.push({ pathname: "/compare", params: { a: f.slug, b: compare.slug } })}
          accessibilityLabel={`Compare with ${compare.name}`}
        >
          <Text variant="label">Compare</Text>
          <Text variant="heading">
            {shortName(f.name)} vs {shortName(compare.name)}
          </Text>
          <Text variant="small">
            Per 100 g: {f.proteinG} g vs {compare.proteinG} g protein · {f.kcal} vs {compare.kcal} kcal
          </Text>
        </Card>
      ) : (
        <Card
          onPress={() => router.push({ pathname: "/compare", params: { a: f.slug } })}
          accessibilityLabel={`Compare ${f.name} with another food`}
        >
          <Text variant="label">Compare</Text>
          <Text variant="heading">Compare {shortName(f.name)} with another food</Text>
        </Card>
      )}

      {related.length ? (
        <View style={styles.section}>
          <Text variant="heading">Related foods</Text>
          <View style={styles.chipsWrap}>
            {related.map((r) => (
              <Chip key={r.slug} label={shortName(r.name)} onPress={() => router.push(`/food/${r.slug}`)} />
            ))}
          </View>
        </View>
      ) : null}

      <Text variant="small" style={styles.link} onPress={() => openLink(`${SITE_URL}/foods/${f.slug}`)}>
        View on fitlives.in
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: space.xs },
  section: { gap: space.md },
  chips: { gap: space.sm },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  table: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: "hidden" },
  row: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: space.md, paddingVertical: space.sm },
  rowAlt: { backgroundColor: colors.surface },
  rowValue: { fontFamily: fonts.semibold },
  tip: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent, marginTop: 9 },
  tipText: { flex: 1 },
  link: { color: colors.ink, textDecorationLine: "underline", textAlign: "center" },
});
