import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps, ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { haptic } from "@/lib/haptics";
import { colors, radius, space } from "@/theme";
import { Text } from "./Text";

type IconName = ComponentProps<typeof Ionicons>["name"];

/** Settings-style row: icon, label, optional detail, chevron or external mark. */
export function LinkRow({
  icon,
  label,
  detail,
  onPress,
  external = false,
  right,
  destructive = false,
}: {
  icon: IconName;
  label: string;
  detail?: string;
  onPress?: () => void;
  external?: boolean;
  right?: ReactNode;
  destructive?: boolean;
}) {
  return (
    <Pressable
      onPress={
        onPress
          ? () => {
              haptic.tap();
              onPress();
            }
          : undefined
      }
      disabled={!onPress}
      accessibilityRole={onPress ? (external ? "link" : "button") : "text"}
      accessibilityLabel={detail ? `${label}, ${detail}` : label}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <Ionicons name={icon} size={18} color={destructive ? colors.danger : colors.ink} />
      </View>
      <Text variant="body" style={[styles.label, destructive && styles.destructive]}>
        {label}
      </Text>
      {detail ? <Text variant="small">{detail}</Text> : null}
      {right ?? (onPress ? <Ionicons name={external ? "open-outline" : "chevron-forward"} size={16} color={colors.subtle} /> : null)}
    </Pressable>
  );
}

/** Rounded group container for LinkRows with hairline separators. */
export function LinkGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <View style={styles.groupWrap}>
      {title ? <Text variant="label">{title}</Text> : null}
      <View style={styles.group}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    minHeight: 52,
    paddingHorizontal: space.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
  },
  pressed: { backgroundColor: colors.surface },
  icon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { flex: 1 },
  destructive: { color: colors.danger },
  groupWrap: { gap: space.sm },
  group: {
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
});
