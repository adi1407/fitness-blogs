import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";

import { colors, fonts, space } from "@/theme";
import { Text } from "./Text";

type Props = { title: string; eyebrow?: string; actionLabel?: string; onAction?: () => void };

export function SectionHeader({ title, eyebrow, actionLabel = "See all", onAction }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        {eyebrow ? (
          <Text variant="label" style={styles.eyebrow}>
            {eyebrow}
          </Text>
        ) : null}
        <Text variant="title">{title}</Text>
      </View>
      {onAction ? (
        <Pressable onPress={onAction} hitSlop={10} accessibilityRole="link" style={styles.action}>
          <Text variant="small" style={styles.actionText}>
            {actionLabel}
          </Text>
          <Ionicons name="arrow-forward" size={14} color={colors.ink} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: space.md },
  text: { flex: 1, gap: 2 },
  eyebrow: { color: colors.accent },
  action: { flexDirection: "row", alignItems: "center", gap: 4, paddingVertical: 4 },
  actionText: { color: colors.ink, fontFamily: fonts.semibold },
});
