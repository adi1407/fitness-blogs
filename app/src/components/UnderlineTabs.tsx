import { Pressable, ScrollView, StyleSheet } from "react-native";

import { haptic } from "@/lib/haptics";
import { colors, fonts, space } from "@/theme";
import { Text } from "./Text";

type Tab<T extends string> = { id: T; label: string };

/** Website topic strip: hairline base, orange underline on the active tab (not heavy pills). */
export function UnderlineTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly Tab<T>[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.rail}
      contentContainerStyle={styles.content}
      accessibilityRole="tablist"
    >
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <Pressable
            key={t.id}
            onPress={() => {
              if (active) return;
              haptic.tap();
              onChange(t.id);
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={[styles.tab, active && styles.tabActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rail: { marginHorizontal: -space.lg, flexGrow: 0 },
  content: {
    paddingHorizontal: space.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexGrow: 1,
  },
  tab: {
    paddingHorizontal: 11,
    paddingVertical: space.md,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginBottom: -1,
  },
  tabActive: { borderBottomColor: colors.accent },
  label: { fontFamily: fonts.semibold, fontSize: 14, color: colors.muted },
  labelActive: { color: colors.ink },
});
