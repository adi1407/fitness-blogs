import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { GradientHero } from "@/components/GradientHero";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { ToolTile } from "@/components/ToolTile";
import { TOOLS, TOOL_GROUPS } from "@/lib/tools";
import { space } from "@/theme";

export default function CalculatorsScreen() {
  return (
    <Screen>
      <GradientHero
        eyebrow={`${TOOLS.length} calculators`}
        title="Know your numbers"
        subtitle="Calories, protein, body composition and training loads — the same methods as fitlives.in."
      />
      {TOOL_GROUPS.map((group, gi) => {
        const tools = TOOLS.filter((t) => t.group === group);
        return (
          <Animated.View key={group} entering={FadeInDown.delay(gi * 80).duration(360)} style={styles.group}>
            <SectionHeader title={group} />
            <View style={styles.grid}>
              {tools.map((t) => (
                <View key={t.id} style={styles.cell}>
                  <ToolTile tool={t} height={156} />
                </View>
              ))}
            </View>
          </Animated.View>
        );
      })}
      <Text variant="small">Results are educational estimates — not a diagnosis or prescription.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  group: { gap: space.md },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  cell: { width: "47.5%", flexGrow: 1 },
});
