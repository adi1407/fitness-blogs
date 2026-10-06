import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import type { ComponentProps, ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { haptic } from "@/lib/haptics";
import { colors, fonts, shadow, space } from "@/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

export function ChromeButton({
  icon,
  label,
  onPress,
  active = false,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable
      onPress={() => {
        haptic.tap();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed && { transform: [{ scale: 0.92 }] }]}
    >
      <Ionicons name={icon} size={20} color={active ? colors.accent : colors.ink} />
    </Pressable>
  );
}

type Props = {
  scrollY: SharedValue<number>;
  /** Scroll offset where the solid header has fully faded in. */
  solidAt: number;
  title: string;
  contentHeight: SharedValue<number>;
  viewportHeight: SharedValue<number>;
  actions?: ReactNode;
};

/** Floating back/actions over a hero image; fades to a solid titled bar with a reading-progress line. */
export function ReaderChrome({ scrollY, solidAt, title, contentHeight, viewportHeight, actions }: Props) {
  const insets = useSafeAreaInsets();

  const bg = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [solidAt - 80, solidAt], [0, 1], "clamp"),
  }));
  const progress = useAnimatedStyle(() => {
    const max = Math.max(1, contentHeight.value - viewportHeight.value);
    return { width: `${Math.min(100, Math.max(0, (scrollY.value / max) * 100))}%` };
  });

  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]} pointerEvents="box-none">
      <Animated.View style={[StyleSheet.absoluteFill, styles.solid, bg]} pointerEvents="none">
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progress, progress]} />
        </View>
      </Animated.View>
      <View style={styles.row} pointerEvents="box-none">
        <ChromeButton icon="chevron-back" label="Back" onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))} />
        <Animated.Text numberOfLines={1} style={[styles.title, bg]}>
          {title}
        </Animated.Text>
        <View style={styles.actions}>{actions}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 },
  solid: {
    backgroundColor: "rgba(255,255,255,0.97)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  progressTrack: { position: "absolute", left: 0, right: 0, bottom: 0, height: 3 },
  progress: { height: 3, backgroundColor: colors.accent },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
  },
  title: { flex: 1, fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  actions: { flexDirection: "row", gap: space.sm },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    ...shadow.sm,
  },
});
