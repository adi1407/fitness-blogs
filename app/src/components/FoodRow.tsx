import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { DIET_LABEL, type FoodSummary } from "@/api/foods";
import { isHighProtein, isLowCalorie } from "@/lib/nutrition";
import { colors, radius, space } from "@/theme";
import { Card } from "./Card";
import { Text } from "./Text";

const DIET_COLOR = { veg: "#2E7D32", egg: colors.accent, "non-veg": colors.danger } as const;

export function FoodRow({ food }: { food: FoodSummary }) {
  const tags = [isHighProtein(food) ? "High protein" : null, isLowCalorie(food) ? "Low calorie" : null].filter(
    Boolean,
  ) as string[];

  return (
    <Card onPress={() => router.push(`/food/${food.slug}`)} accessibilityLabel={food.name} style={styles.card}>
      <View style={styles.left}>
        <View style={styles.titleRow}>
          <View
            style={[styles.diet, { borderColor: DIET_COLOR[food.diet] }]}
            accessibilityLabel={DIET_LABEL[food.diet]}
          >
            <View style={[styles.dietDot, { backgroundColor: DIET_COLOR[food.diet] }]} />
          </View>
          <Text variant="heading" numberOfLines={1} style={styles.name}>
            {food.name}
          </Text>
        </View>
        <Text variant="small" numberOfLines={1}>
          {[food.hindiName, `per 100 g ${food.basisLabel}`].filter(Boolean).join(" · ")}
        </Text>
        {tags.length ? (
          <View style={styles.tags}>
            {tags.map((t) => (
              <Text key={t} variant="label" style={styles.tag}>
                {t}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
      <View style={styles.right}>
        <Text variant="heading">{food.kcal}</Text>
        <Text variant="small">kcal</Text>
        <Text variant="small" style={styles.protein}>
          {food.proteinG} g P
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: space.md },
  left: { flex: 1, gap: 2 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: space.sm },
  name: { flexShrink: 1 },
  diet: { width: 14, height: 14, borderWidth: 1.5, borderRadius: 2, alignItems: "center", justifyContent: "center" },
  dietDot: { width: 6, height: 6, borderRadius: 3 },
  tags: { flexDirection: "row", gap: space.sm, marginTop: 4 },
  tag: {
    color: colors.ink,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  right: { alignItems: "flex-end", minWidth: 60 },
  protein: { color: colors.ink },
});
