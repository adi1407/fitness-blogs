import { Pressable, StyleSheet } from "react-native";

import { haptic } from "@/lib/haptics";
import { colors, fonts, radius, shadow, space } from "@/theme";
import { Text } from "./Text";

type Props = { label: string; active?: boolean; onPress?: () => void };

export function Chip({ label, active = false, onPress }: Props) {
  return (
    <Pressable
      onPress={
        onPress
          ? () => {
              if (!active) haptic.tap();
              onPress();
            }
          : undefined
      }
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
    paddingHorizontal: space.md + 2,
    paddingVertical: space.sm,
    minHeight: 36,
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  active: { backgroundColor: colors.ink, borderColor: colors.ink, ...shadow.sm },
  pressed: { borderColor: colors.accent },
  text: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 12.5 },
  activeText: { color: colors.bg },
});
