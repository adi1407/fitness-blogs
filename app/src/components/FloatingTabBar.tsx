import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import type { ComponentProps } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { haptic } from "@/lib/haptics";
import { colors, fonts, radius, shadow, space } from "@/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

const ICONS: Record<string, [IconName, IconName]> = {
  index: ["home", "home-outline"],
  learn: ["book", "book-outline"],
  tools: ["calculator", "calculator-outline"],
  library: ["library", "library-outline"],
  account: ["person-circle", "person-circle-outline"],
};

function TabItem({
  label,
  focused,
  icon,
  onPress,
  onLongPress,
}: {
  label: string;
  focused: boolean;
  icon: [IconName, IconName];
  onPress: () => void;
  onLongPress: () => void;
}) {
  const pill = useAnimatedStyle(() => ({
    opacity: withSpring(focused ? 1 : 0, { damping: 20 }),
    transform: [{ scale: withSpring(focused ? 1 : 0.6, { damping: 16 }) }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
      style={styles.item}
      hitSlop={4}
    >
      <Animated.View style={[styles.pill, pill]} />
      <Ionicons name={focused ? icon[0] : icon[1]} size={22} color={focused ? colors.accent : colors.inkMuted} />
      <Animated.Text
        numberOfLines={1}
        maxFontSizeMultiplier={1.2}
        style={[styles.label, { color: focused ? colors.bg : colors.inkMuted }]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { bottom: Math.max(insets.bottom, space.md) }]} pointerEvents="box-none">
      <View style={styles.bar}>
        {Platform.OS === "ios" ? (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        ) : null}
        <View style={styles.inner} accessibilityRole="tablist">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = typeof options.title === "string" ? options.title : route.name;
            const focused = state.index === index;
            return (
              <TabItem
                key={route.key}
                label={label}
                focused={focused}
                icon={ICONS[route.name] ?? ["ellipse", "ellipse-outline"]}
                onPress={() => {
                  const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
                  if (!focused && !event.defaultPrevented) {
                    haptic.tap();
                    navigation.navigate(route.name, route.params);
                  }
                }}
                onLongPress={() => navigation.emit({ type: "tabLongPress", target: route.key })}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", left: space.lg, right: space.lg },
  bar: {
    borderRadius: radius.xl,
    overflow: "hidden",
    backgroundColor: Platform.OS === "ios" ? "rgba(10,10,10,0.82)" : colors.ink,
    ...shadow.lg,
  },
  inner: { flexDirection: "row", paddingVertical: space.sm, paddingHorizontal: space.xs },
  item: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 6, gap: 2, minHeight: 52 },
  pill: {
    position: "absolute",
    top: 2,
    bottom: 2,
    left: 4,
    right: 4,
    borderRadius: radius.lg,
    backgroundColor: colors.inkSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,152,0,0.35)",
  },
  label: { fontFamily: fonts.medium, fontSize: 10.5, letterSpacing: 0.2 },
});
