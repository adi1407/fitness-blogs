import type { ReactNode } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { colors, fonts, radius, space } from "@/theme";
import { PhotoMarquee } from "./PhotoMarquee";
import { Text } from "./Text";

type Props = {
  tagline: string;
  title: string;
  description: string;
  images: readonly string[];
  /** CTAs / search rendered under the description. */
  children?: ReactNode;
};

const EASE_IN = (delay: number) => FadeInDown.duration(620).delay(delay).springify().damping(18);

/** Website home hero: pill tagline, word-by-word headline, CTAs, drifting photo strip. */
export function MarqueeHero({ tagline, title, description, images, children }: Props) {
  const compact = useWindowDimensions().width < 360;
  const words = title.split(" ");
  const afterTitle = 120 + words.length * 70;

  return (
    <View style={styles.root}>
      <View style={styles.copy}>
        <Animated.View entering={EASE_IN(0)} style={styles.tagline}>
          <Text style={styles.taglineText}>{tagline}</Text>
        </Animated.View>

        <View style={styles.titleRow} accessible accessibilityRole="header" accessibilityLabel={title}>
          {words.map((word, i) => (
            <Animated.View key={`${word}-${i}`} entering={EASE_IN(80 + i * 70)}>
              <Text maxFontSizeMultiplier={1.25} style={[styles.title, compact && styles.titleCompact]}>
                {word}
                {i < words.length - 1 ? " " : ""}
              </Text>
            </Animated.View>
          ))}
        </View>

        <Animated.View entering={EASE_IN(afterTitle)}>
          <Text variant="body" style={styles.description}>
            {description}
          </Text>
        </Animated.View>

        {children ? (
          <Animated.View entering={EASE_IN(afterTitle + 100)} style={styles.actions}>
            {children}
          </Animated.View>
        ) : null}
      </View>

      <PhotoMarquee images={images} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: colors.bg, paddingTop: space.lg, gap: space.sm },
  copy: { alignItems: "center", paddingHorizontal: space.lg },
  tagline: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: space.lg,
    paddingVertical: 6,
    marginBottom: space.lg,
  },
  taglineText: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted },
  titleRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  title: {
    fontFamily: fonts.bold,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -1.6,
    color: colors.ink,
    textAlign: "center",
  },
  titleCompact: { fontSize: 33, lineHeight: 37, letterSpacing: -1.2 },
  description: { marginTop: space.md, textAlign: "center", color: colors.muted, maxWidth: 360 },
  actions: { marginTop: space.xl, width: "100%", maxWidth: 420, gap: space.md },
});
