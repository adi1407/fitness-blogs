import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";

import { colors, fonts, radius, space } from "@/theme";
import { Text } from "./Text";

type Props = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, eyebrow, subtitle, actionLabel = "See all", onAction }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        {eyebrow ? (
          <Text variant="label" style={styles.eyebrow}>
            {eyebrow}
          </Text>
        ) : null}
        <Text variant="title" accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? (
          <Text variant="small" style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {onAction ? (
        <Pressable
          onPress={onAction}
          hitSlop={10}
          accessibilityRole="link"
          accessibilityLabel={`${actionLabel}: ${title}`}
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
        >
          <Text variant="small" style={styles.actionText}>
            {actionLabel}
          </Text>
          <Ionicons name="arrow-forward" size={13} color={colors.ink} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: space.md },
  text: { flex: 1, gap: 3 },
  eyebrow: { color: colors.subtle },
  subtitle: { marginTop: 1 },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 2,
  },
  actionPressed: { borderColor: colors.accent },
  actionText: { color: colors.ink, fontFamily: fonts.semibold, fontSize: 12 },
});
