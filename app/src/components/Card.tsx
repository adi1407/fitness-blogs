import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, shadow, space } from "@/theme";
import { PressableScale } from "./PressableScale";

type Props = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  elevated?: boolean;
};

export function Card({ children, onPress, style, accessibilityLabel, elevated = true }: Props) {
  const base = [styles.card, elevated && shadow.sm, style];
  if (!onPress) return <View style={base}>{children}</View>;
  return (
    <PressableScale onPress={onPress} accessibilityLabel={accessibilityLabel} style={base}>
      {children}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: space.lg,
  },
});
