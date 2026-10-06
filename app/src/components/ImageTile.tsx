import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, gradients, radius, shadow, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

type Props = {
  image: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  onPress: () => void;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

/** Photo tile with overlaid text — pillars, muscle groups, recipes. */
export function ImageTile({ image, title, eyebrow, subtitle, onPress, height = 180, style }: Props) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={title} style={[styles.tile, { height }, style]}>
      <Image source={image} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
      <LinearGradient colors={gradients.fadeBottom} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0.2 }} end={{ x: 0, y: 1 }} />
      <View style={styles.body}>
        {eyebrow ? (
          <Text variant="label" style={styles.eyebrow}>
            {eyebrow}
          </Text>
        ) : null}
        <Text variant="heading" style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="small" style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  tile: { borderRadius: radius.lg, overflow: "hidden", backgroundColor: colors.ink, ...shadow.sm },
  body: { flex: 1, justifyContent: "flex-end", padding: space.lg, gap: 2 },
  eyebrow: { color: colors.accent },
  title: { color: colors.bg },
  subtitle: { color: "#D4D4D4" },
});
