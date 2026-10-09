import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import type { Food } from "@/api/foods";
import { forGrams, formatG, macroSplit } from "@/lib/nutrition";
import { colors, fonts, radius, space } from "@/theme";
import { Chip } from "./Chip";
import { MacroBar } from "./MacroBar";
import { Text } from "./Text";

const CUSTOM = -1;

/** Website "Nutrition per serving": pick a household serving or type grams. */
export function ServingCalculator({ food }: { food: Food }) {
  const servings = food.servings.length ? food.servings : [{ label: "100 g", grams: 100 }];
  const [index, setIndex] = useState(0);
  const [custom, setCustom] = useState("150");

  const customGrams = Number(custom);
  const validCustom = Number.isFinite(customGrams) && customGrams > 0 && customGrams <= 2000;
  const grams = index === CUSTOM ? (validCustom ? customGrams : 0) : (servings[index]?.grams ?? 100);
  const label = index === CUSTOM ? `${validCustom ? customGrams : "–"} g` : (servings[index]?.label ?? "100 g");
  const n = forGrams(food, grams);

  const rows: [string, string][] = [
    ["Calories", `${n.kcal} kcal`],
    ["Protein", formatG(n.proteinG)],
    ["Carbohydrates", formatG(n.carbsG)],
    ["Fat", formatG(n.fatG)],
    ["Fibre", formatG(n.fiberG)],
  ];

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Text variant="title" style={styles.title} accessibilityRole="header">
          Nutrition per serving
        </Text>
        <Text variant="small">Choose a serving size. Values are for {food.basisLabel}.</Text>
      </View>

      <View style={styles.chips} accessibilityLabel="Serving size">
        {servings.map((s, i) => (
          <Chip key={`${s.label}-${i}`} label={s.label} active={index === i} onPress={() => setIndex(i)} />
        ))}
        <Chip label="Custom grams" active={index === CUSTOM} onPress={() => setIndex(CUSTOM)} />
      </View>

      {index === CUSTOM ? (
        <View style={styles.customRow}>
          <Text variant="small" style={styles.customLabel}>
            Amount
          </Text>
          <TextInput
            value={custom}
            onChangeText={(v) => setCustom(v.replace(/[^0-9.]/g, ""))}
            keyboardType="decimal-pad"
            maxLength={6}
            style={[styles.input, !validCustom && styles.inputError]}
            accessibilityLabel="Amount in grams"
            selectTextOnFocus
          />
          <Text variant="small">grams</Text>
          {!validCustom ? <Text style={styles.error}>Enter 1–2000 g</Text> : null}
        </View>
      ) : null}

      <View style={styles.result} accessibilityLiveRegion="polite">
        <Text variant="small" numberOfLines={2}>
          {label}
        </Text>
        <View style={styles.kcalRow}>
          <Text style={styles.kcal}>{n.kcal}</Text>
          <Text style={styles.kcalUnit}>kcal</Text>
        </View>
        <Text variant="small" style={styles.macros}>
          {formatG(n.proteinG)} protein · {formatG(n.carbsG)} carbs · {formatG(n.fatG)} fat
        </Text>
      </View>

      <View>
        {rows.map(([k, v], i) => (
          <View key={k} style={[styles.row, i > 0 && styles.rowBorder]}>
            <Text variant="body" style={styles.rowKey}>
              {k}
            </Text>
            <Text variant="body" style={styles.rowValue}>
              {v}
            </Text>
          </View>
        ))}
      </View>

      <MacroBar {...macroSplit(food)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: space.lg,
    padding: space.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  head: { gap: 4 },
  title: { fontSize: 20, lineHeight: 26 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  customRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: space.sm },
  customLabel: { fontFamily: fonts.medium, color: colors.ink },
  input: {
    width: 96,
    minHeight: 42,
    paddingHorizontal: space.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.ink,
  },
  inputError: { borderColor: colors.danger },
  error: { fontFamily: fonts.regular, fontSize: 12, color: colors.danger },
  result: { gap: 2, padding: space.lg, borderRadius: radius.lg, backgroundColor: colors.accentSoft },
  kcalRow: { flexDirection: "row", alignItems: "baseline", gap: space.sm },
  kcal: { fontFamily: fonts.semibold, fontSize: 36, lineHeight: 42, letterSpacing: -1, color: colors.ink },
  kcalUnit: { fontFamily: fonts.medium, fontSize: 15, color: colors.muted },
  macros: { color: colors.ink },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: space.sm },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  rowKey: { fontFamily: fonts.medium },
  rowValue: { color: colors.muted, fontVariant: ["tabular-nums"] },
});
