import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, type ReactNode } from "react";
import { LayoutAnimation, Platform, Pressable, StyleSheet, UIManager, View } from "react-native";

import { haptic } from "@/lib/haptics";
import { colors, radius, space } from "@/theme";
import { Text } from "./Text";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = { title: string; children: ReactNode; initiallyOpen?: boolean };

export function Accordion({ title, children, initiallyOpen = false }: Props) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <View style={[styles.item, open && styles.open]}>
      <Pressable
        onPress={() => {
          haptic.tap();
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((o) => !o);
        }}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={styles.head}
      >
        <Text variant="heading" style={styles.title}>
          {title}
        </Text>
        <Ionicons name={open ? "remove" : "add"} size={20} color={open ? colors.accent : colors.ink} />
      </Pressable>
      {open ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.bg },
  open: { borderColor: colors.ink },
  head: { flexDirection: "row", alignItems: "center", gap: space.md, padding: space.lg },
  title: { flex: 1, fontSize: 16 },
  body: { paddingHorizontal: space.lg, paddingBottom: space.lg },
});
