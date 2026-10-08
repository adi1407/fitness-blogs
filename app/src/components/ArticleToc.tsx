import { useState } from "react";
import { LayoutAnimation, Pressable, StyleSheet, View } from "react-native";

import type { TocItem } from "@/lib/articleHtml";
import { haptic } from "@/lib/haptics";
import { colors, fonts, radius, space } from "@/theme";
import { Text } from "./Text";

type Props = { items: TocItem[]; onJump: (index: number) => void };

/** Website "On this page" box: open by default, Hide/Show toggle, numbered section links. */
export function ArticleToc({ items, onJump }: Props) {
  const [open, setOpen] = useState(true);
  if (items.length < 2) return null;

  return (
    <View style={styles.box} accessibilityRole="summary">
      <Pressable
        onPress={() => {
          haptic.tap();
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((o) => !o);
        }}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`On this page, ${items.length} sections`}
        hitSlop={6}
        style={styles.head}
      >
        <Text style={styles.heading}>On this page</Text>
        <Text variant="small">{open ? "Hide" : "Show"}</Text>
      </Pressable>
      {open ? (
        <View style={styles.list}>
          {items.map((item, i) => (
            <Pressable
              key={item.index}
              onPress={() => onJump(item.index)}
              accessibilityRole="link"
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            >
              <Text style={styles.num}>{i + 1}.</Text>
              <Text style={styles.text}>{item.text}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    backgroundColor: colors.bg,
    padding: space.lg,
  },
  head: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  heading: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.ink,
  },
  list: { marginTop: space.md, gap: 2 },
  item: { flexDirection: "row", gap: space.sm, paddingVertical: 5 },
  pressed: { opacity: 0.55 },
  num: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.subtle, minWidth: 18 },
  text: { flex: 1, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.inkSoft },
});
