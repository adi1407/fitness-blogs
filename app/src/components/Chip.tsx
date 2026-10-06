import { Pressable, StyleSheet } from "react-native";

import { colors, radius, space } from "@/theme";
import { Text } from "./Text";

type Props = { label: string; active?: boolean; onPress?: () => void };

export function Chip({ label, active = false, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      hitSlop={4}
      style={({ pressed }) => [
        styles.chip,
        active && styles.active,
        pressed && !active && styles.pressed,
      ]}
    >
      <Text variant="small" style={[styles.text, active && styles.activeText]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  active: { backgroundColor: colors.ink, borderColor: colors.ink },
  pressed: { borderColor: colors.accent },
  text: { color: colors.ink },
  activeText: { color: colors.bg },
});
