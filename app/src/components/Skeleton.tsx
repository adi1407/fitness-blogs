import { useEffect } from "react";
import { StyleSheet, View, type DimensionValue, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { colors, radius, space } from "@/theme";

type Props = { width?: DimensionValue; height?: number; rounded?: number; style?: StyleProp<ViewStyle> };

export function Skeleton({ width = "100%", height = 16, rounded = radius.sm, style }: Props) {
  const opacity = useSharedValue(0.55);
  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, [opacity]);
  const animated = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[{ width, height, borderRadius: rounded, backgroundColor: colors.border }, animated, style]}
    />
  );
}

/** Placeholder for a list of cards while data loads. */
export function SkeletonList({ count = 4, image = true }: { count?: number; image?: boolean }) {
  return (
    <View style={styles.list} accessibilityLabel="Loading" accessibilityRole="progressbar">
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.card}>
          {image ? <Skeleton height={160} rounded={radius.lg} /> : null}
          <Skeleton width="40%" height={10} />
          <Skeleton width="90%" height={18} />
          <Skeleton width="70%" height={18} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: space.lg, gap: space.xl },
  card: { gap: space.sm },
});
