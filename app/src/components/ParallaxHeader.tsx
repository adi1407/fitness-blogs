import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";

import { colors, gradients, space } from "@/theme";

type Props = {
  image: string | null;
  height: number;
  scrollY: SharedValue<number>;
  children?: ReactNode;
};

/** Image that zooms on overscroll and drifts slower than content (parallax). */
export function ParallaxHeader({ image, height, scrollY, children }: Props) {
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(scrollY.value, [-height, 0, height], [-height / 2, 0, height * 0.5]) },
      { scale: interpolate(scrollY.value, [-height, 0, height], [2, 1, 1]) },
    ],
  }));

  return (
    <View style={[styles.wrap, { height }]}>
      <Animated.View style={[StyleSheet.absoluteFill, imageStyle]}>
        {image ? (
          <Image source={image} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
        ) : (
          <LinearGradient colors={gradients.inkGlow} style={StyleSheet.absoluteFill} />
        )}
        <LinearGradient colors={gradients.fadeBottom} start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill} />
      </Animated.View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: "hidden", backgroundColor: colors.ink },
  content: { flex: 1, justifyContent: "flex-end", padding: space.xl, gap: space.sm },
});
