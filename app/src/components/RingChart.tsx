import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { colors, motion } from "@/theme";
import { Text } from "./Text";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type RingSegment = { value: number; color: string };

type Props = {
  segments: RingSegment[];
  size?: number;
  stroke?: number;
  centerValue?: string;
  centerLabel?: string;
  /** Track colour behind the segments. */
  track?: string;
  dark?: boolean;
  /** Full-circle value; defaults to the sum of segments (a split). */
  max?: number;
};

function Segment({
  r,
  c,
  stroke,
  color,
  fraction,
  offset,
  size,
}: {
  r: number;
  c: number;
  stroke: number;
  color: string;
  fraction: number;
  offset: number;
  size: number;
}) {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: motion.countUp, easing: Easing.out(Easing.cubic) });
  }, [fraction, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: c - c * fraction * progress.value,
  }));

  return (
    <AnimatedCircle
      cx={size / 2}
      cy={size / 2}
      r={r}
      stroke={color}
      strokeWidth={stroke}
      fill="none"
      strokeLinecap="butt"
      strokeDasharray={`${c} ${c}`}
      animatedProps={animatedProps}
      rotation={-90 + offset * 360}
      origin={`${size / 2}, ${size / 2}`}
    />
  );
}

/** Animated donut — macro splits, progress toward a target, BMI position. */
export function RingChart({
  segments,
  size = 160,
  stroke = 14,
  centerValue,
  centerLabel,
  track = colors.surface,
  dark = false,
  max,
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const sum = segments.reduce((s, x) => s + Math.max(0, x.value), 0);
  const denom = max ?? (sum || 1);

  let acc = 0;
  const arcs = segments.map((s) => {
    const fraction = Math.min(1 - acc, Math.max(0, s.value) / denom);
    const arc = { ...s, fraction, offset: acc };
    acc += fraction;
    return arc;
  });

  return (
    <View style={{ width: size, height: size }} accessibilityRole="image">
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        {arcs.map((a, i) => (
          <Segment key={i} r={r} c={c} stroke={stroke} color={a.color} fraction={a.fraction} offset={a.offset} size={size} />
        ))}
      </Svg>
      {centerValue ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.center}>
            <Text variant="title" style={dark ? styles.darkText : undefined}>
              {centerValue}
            </Text>
            {centerLabel ? (
              <Text variant="label" style={dark ? styles.darkLabel : undefined}>
                {centerLabel}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  darkText: { color: colors.bg },
  darkLabel: { color: colors.inkMuted },
});
