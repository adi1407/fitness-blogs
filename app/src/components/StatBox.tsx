import { StyleSheet, View } from "react-native";

import { colors, radius, space } from "@/theme";
import { Text } from "./Text";

type Props = { label: string; value: string; unit?: string; highlight?: boolean };

export function StatBox({ label, value, unit, highlight = false }: Props) {
  return (
    <View style={[styles.box, highlight && styles.highlight]}>
      <Text variant="label" style={highlight && styles.highlightLabel}>
        {label}
      </Text>
      <Text variant="title" style={[styles.value, highlight && styles.highlightValue]}>
        {value}
        {unit ? <Text variant="small" style={highlight && styles.highlightLabel}>{` ${unit}`}</Text> : null}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    minWidth: 90,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: space.md,
    gap: space.xs,
  },
  value: { fontSize: 20 },
  highlight: { backgroundColor: colors.ink },
  highlightValue: { color: colors.bg },
  highlightLabel: { color: colors.accent },
});
