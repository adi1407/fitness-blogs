import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { TOOLS } from "@/lib/tools";
import { colors, radius, space } from "@/theme";

export default function CalculatorsScreen() {
  return (
    <Screen>
      <Text variant="small">
        Quick, evidence-based estimates. Results are educational — not a diagnosis or prescription.
      </Text>
      {TOOLS.map((t) => (
        <Card
          key={t.id}
          onPress={() => router.push(`/calculator/${t.id}`)}
          accessibilityLabel={t.title}
          style={styles.card}
        >
          <View style={styles.icon}>
            <Ionicons name={t.icon} size={24} color={colors.accent} />
          </View>
          <View style={styles.text}>
            <Text variant="heading">{t.title}</Text>
            <Text variant="small">{t.blurb}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.subtle} />
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: space.md },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { flex: 1, gap: 2 },
});
