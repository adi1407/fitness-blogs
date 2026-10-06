import type { ReactElement } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { space } from "@/theme";

type Props<T> = {
  data: readonly T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number) => ReactElement;
  /** Card width; enables snap-to-card scrolling. */
  itemWidth: number;
  gap?: number;
};

export function HorizontalRail<T>({ data, keyExtractor, renderItem, itemWidth, gap = space.md }: Props<T>) {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => <View style={{ width: itemWidth }}>{renderItem(item, index)}</View>}
      ItemSeparatorComponent={() => <View style={{ width: gap }} />}
      showsHorizontalScrollIndicator={false}
      snapToInterval={itemWidth + gap}
      decelerationRate="fast"
      contentContainerStyle={styles.content}
      style={styles.rail}
    />
  );
}

const styles = StyleSheet.create({
  rail: { marginHorizontal: -space.lg },
  content: { paddingHorizontal: space.lg, paddingVertical: space.sm },
});
