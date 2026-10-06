import type { ReactNode, Ref } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { colors, layout, space } from "@/theme";

type Props = {
  children: ReactNode;
  /** Wrap in a ScrollView (default). Disable for screens that own a FlatList. */
  scroll?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  ref?: Ref<ScrollView>;
};

export function Screen({ children, scroll = true, refreshing = false, onRefresh, ref }: Props) {
  if (!scroll) return <View style={styles.root}>{children}</View>;
  return (
    <ScrollView
      ref={ref}
      style={styles.root}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} colors={[colors.accent]} />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, gap: space.xl, paddingBottom: layout.bottomClearance },
});
