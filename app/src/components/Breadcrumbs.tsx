import { router, type Href } from "expo-router";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";

import { colors, fonts, space } from "@/theme";
import { Text } from "./Text";

export type Crumb = { label: string; href?: Href };

/** Website breadcrumb trail: muted links separated by slashes, current page in ink. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <View style={styles.row} accessibilityLabel={`Breadcrumb: ${items.map((i) => i.label).join(", ")}`}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {i > 0 ? <Text style={styles.crumb}>/</Text> : null}
            <Text
              style={[styles.crumb, last && styles.current]}
              numberOfLines={1}
              onPress={item.href && !last ? () => router.navigate(item.href!) : undefined}
              accessibilityRole={item.href && !last ? "link" : "text"}
              suppressHighlighting
            >
              {item.label}
            </Text>
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: space.sm },
  crumb: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  current: { color: colors.ink, flexShrink: 1 },
});
