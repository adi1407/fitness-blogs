import { Image } from "expo-image";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { colors, radius, shadow } from "@/theme";

type Props = { images: readonly string[]; cardWidth?: number; gap?: number; secondsPerCard?: number };

/**
 * Endlessly drifting strip of tilted photos (website hero). The set renders twice
 * and slides by exactly one set width so the loop is seamless.
 */
export function PhotoMarquee({ images, cardWidth = 118, gap = 12, secondsPerCard = 5 }: Props) {
  const reduceMotion = useReducedMotion();
  const setWidth = images.length * (cardWidth + gap);
  const x = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion || !images.length) return;
    x.value = 0;
    x.value = withRepeat(
      withTiming(-setWidth, { duration: images.length * secondsPerCard * 1000, easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(x);
  }, [reduceMotion, setWidth, images.length, secondsPerCard, x]);

  const strip = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const height = Math.round(cardWidth * (4 / 3));

  return (
    <View style={[styles.viewport, { height: height + 36 }]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Animated.View style={[styles.strip, strip]}>
        {[0, 1].flatMap((copy) =>
          images.map((src, i) => (
            <View
              key={`${copy}-${src}`}
              style={[
                styles.card,
                { width: cardWidth, height, marginRight: gap, transform: [{ rotate: i % 2 === 0 ? "-2deg" : "4deg" }] },
              ]}
            >
              <Image source={src} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
            </View>
          )),
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: { overflow: "hidden", justifyContent: "center" },
  strip: { flexDirection: "row", paddingLeft: 12 },
  card: {
    borderRadius: radius.xl,
    overflow: "hidden",
    backgroundColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.06)",
    ...shadow.md,
  },
});
