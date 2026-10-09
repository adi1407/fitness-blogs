import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { DIET_LABEL, type FoodSummary } from "@/api/foods";
import { forGrams, formatG, shortName } from "@/lib/nutrition";
import { colors, fonts, radius, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

const DIET_PILL = {
  veg: { bg: colors.surface, fg: colors.ink },
  egg: { bg: "rgba(255,152,0,0.15)", fg: colors.ink },
  "non-veg": { bg: colors.ink, fg: colors.bg },
} as const;

export function DietPill({ diet }: { diet: FoodSummary["diet"] }) {
  const tone = DIET_PILL[diet];
  return (
    <View style={[styles.pill, { backgroundColor: tone.bg }]}>
      <Text style={[styles.pillText, { color: tone.fg }]}>{DIET_LABEL[diet]}</Text>
    </View>
  );
}

/** Website food-index card: name, Hindi name, diet pill and kcal / protein / carbs per typical serving. */
export function FoodCard({ food, onPress }: { food: FoodSummary; onPress?: () => void }) {
  const serving = food.defaultServing;
  const n = serving ? forGrams(food, serving.grams) : null;
  const stats: [string, string][] = [
    ["kcal", String(n ? n.kcal : food.kcal)],
    ["Protein", formatG(n ? n.proteinG : food.proteinG)],
    ["Carbs", formatG(n ? n.carbsG : food.carbsG)],
  ];
  const basis = serving ? `Per ${serving.label}` : `Per 100 g (${food.basisLabel})`;

  return (
    <PressableScale
      onPress={onPress ?? (() => router.push(`/food/${food.slug}`))}
      accessibilityRole="link"
      accessibilityLabel={`${shortName(food.name)}, ${DIET_LABEL[food.diet]}. ${basis}: ${stats.map(([k, v]) => `${v} ${k}`).join(", ")}`}
      scaleTo={0.98}
      style={styles.card}
    >
      <View style={styles.head}>
        <View style={styles.names}>
          <Text variant="heading" numberOfLines={2}>
            {shortName(food.name)}
          </Text>
          {food.hindiName ? (
            <Text variant="small" numberOfLines={1}>
              {food.hindiName}
            </Text>
          ) : null}
        </View>
        <DietPill diet={food.diet} />
      </View>
      <View style={styles.stats}>
        {stats.map(([k, v]) => (
          <View key={k} style={styles.stat}>
            <Text style={styles.statLabel}>{k}</Text>
            <Text style={styles.statValue}>{v}</Text>
          </View>
        ))}
      </View>
      <Text variant="small" style={styles.basis} numberOfLines={1}>
        {basis}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.bg,
    padding: space.lg,
    gap: space.md,
  },
  head: { flexDirection: "row", alignItems: "flex-start", gap: space.md },
  names: { flex: 1, gap: 2 },
  pill: { borderRadius: radius.pill, paddingHorizontal: space.sm, paddingVertical: 2 },
  pillText: { fontFamily: fonts.medium, fontSize: 11.5 },
  stats: { flexDirection: "row", gap: space.sm },
  stat: { flex: 1, alignItems: "center", backgroundColor: colors.surface, borderRadius: radius.sm, paddingVertical: 6 },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: 10.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.muted,
  },
  statValue: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 20, color: colors.ink, fontVariant: ["tabular-nums"] },
  basis: { fontSize: 12, marginTop: -space.xs },
});
