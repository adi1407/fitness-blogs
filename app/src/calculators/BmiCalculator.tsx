import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

import { Text } from "@/components/Text";
import { BMI_CATEGORY_LABEL, calcBmi } from "@/lib/calc";
import { colors, radius, space } from "@/theme";
import { BodyProfileFields, FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

/** Asian-Indian bands on a 15–35 scale. */
const BANDS = [
  { from: 15, to: 18.5, color: "#BDBDBD", label: "Under" },
  { from: 18.5, to: 23, color: "#2E7D32", label: "Healthy" },
  { from: 23, to: 25, color: colors.accent, label: "Over" },
  { from: 25, to: 35, color: "#B42318", label: "Obese" },
];
const MIN = 15;
const MAX = 35;

function BmiScale({ bmi }: { bmi: number }) {
  const [width, setWidth] = useState(0);
  const pos = Math.min(1, Math.max(0, (bmi - MIN) / (MAX - MIN)));
  const marker = useAnimatedStyle(() => ({ transform: [{ translateX: withSpring(pos * width, { damping: 16 }) }] }));
  return (
    <View
      style={styles.scaleWrap}
      accessibilityLabel={`BMI ${bmi} on the scale`}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.scale}>
        {BANDS.map((b) => (
          <View key={b.label} style={{ flex: b.to - b.from, backgroundColor: b.color }} />
        ))}
      </View>
      <Animated.View style={[styles.marker, marker]} />
      <View style={styles.scaleLabels}>
        {BANDS.map((b) => (
          <Text key={b.label} variant="small" style={[styles.scaleLabel, { flex: b.to - b.from }]}>
            {b.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export function BmiCalculator() {
  const profile = useBodyProfile();
  const v = profile.values;
  const result = v ? calcBmi(v.kg, v.cm) : null;
  const m = (v?.cm ?? 0) / 100;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <BodyProfileFields {...profile} fields={["cm", "kg"]} />
      </FormCard>

      {result ? (
        <>
          <ResultHero label="Your BMI" value={result.bmi} decimals={1} caption={`Asian-Indian: ${BMI_CATEGORY_LABEL[result.asianCategoryId]}`}>
            <HeroStats>
              <HeroStat label="WHO" value={result.categoryLabel.replace(" (screening)", "")} />
              <HeroStat label="Healthy range" value={m ? `${Math.round(18.5 * m * m)}–${Math.round(22.9 * m * m)} kg` : "—"} />
            </HeroStats>
          </ResultHero>
          <BmiScale bmi={result.bmi} />
        </>
      ) : null}

      <Notice>
        Indian guidelines use lower cut-offs (23 overweight, 25 obesity) because health risks start at a lower BMI for
        South Asians. BMI doesn&apos;t measure body fat — waist size tells you more.
      </Notice>
    </View>
  );
}

const styles = StyleSheet.create({
  scaleWrap: { gap: space.sm, paddingTop: space.md },
  scale: { flexDirection: "row", height: 12, borderRadius: radius.pill, overflow: "hidden" },
  marker: {
    position: "absolute",
    left: 0,
    top: space.md - 6,
    width: 4,
    height: 24,
    marginLeft: -2,
    borderRadius: 2,
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderColor: colors.bg,
  },
  scaleLabels: { flexDirection: "row" },
  scaleLabel: { textAlign: "center", fontSize: 11 },
});
