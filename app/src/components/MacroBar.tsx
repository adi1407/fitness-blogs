import { StyleSheet, View } from "react-native";

import { colors, radius, space } from "@/theme";
import { Text } from "./Text";

type Props = { proteinPct: number; carbsPct: number; fatPct: number };

const SEGMENTS = [
  { key: "proteinPct", label: "Protein", color: colors.protein },
  { key: "carbsPct", label: "Carbs", color: colors.carbs },
  { key: "fatPct", label: "Fat", color: colors.fat },
] as const;

export function MacroBar(props: Props) {
  const total = props.proteinPct + props.carbsPct + props.fatPct;
  return (
    <View style={styles.wrap}>
      <View
        style={styles.bar}
        accessibilityLabel={`Calories from protein ${props.proteinPct}%, carbs ${props.carbsPct}%, fat ${props.fatPct}%`}
      >
        {total > 0
          ? SEGMENTS.map((s) =>
              props[s.key] > 0 ? (
                <View key={s.key} style={{ flex: props[s.key], backgroundColor: s.color }} />
              ) : null,
            )
          : null}
      </View>
      <View style={styles.legend}>
        {SEGMENTS.map((s) => (
          <View key={s.key} style={styles.legendItem}>
            <View style={[styles.swatch, { backgroundColor: s.color }]} />
            <Text variant="small">
              {s.label} {props[s.key]}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.sm },
  bar: {
    flexDirection: "row",
    height: 10,
    borderRadius: radius.pill,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  legend: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  swatch: { width: 10, height: 10, borderRadius: 2 },
});
