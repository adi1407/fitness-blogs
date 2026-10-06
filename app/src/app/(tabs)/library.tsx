import Ionicons from "@expo/vector-icons/Ionicons";
import { router, type Href } from "expo-router";
import type { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { GradientHero } from "@/components/GradientHero";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { colors, radius, space } from "@/theme";

type Entry = {
  title: string;
  blurb: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  href: Href;
};

const LIBRARY: Entry[] = [
  {
    title: "Indian food database",
    blurb: "Calories, protein and macros for everyday Indian foods, per serving.",
    icon: "nutrition-outline",
    href: "/foods",
  },
  {
    title: "Exercise library",
    blurb: "50 lifts across 7 muscle groups with form cues and common mistakes.",
    icon: "barbell-outline",
    href: "/exercises",
  },
  {
    title: "High-protein recipes",
    blurb: "Simple Indian meals with macros per serving and a servings scaler.",
    icon: "restaurant-outline",
    href: "/recipes",
  },
];

export default function LibraryScreen() {
  return (
    <Screen>
      <GradientHero
        eyebrow="Databases"
        title="Look it up."
        subtitle="Reference data you can trust, sourced from IFCT and peer-reviewed research."
      />
      {LIBRARY.map((e) => (
        <Card key={e.title} onPress={() => router.push(e.href)} accessibilityLabel={e.title} style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name={e.icon} size={24} color={colors.accent} />
          </View>
          <View style={styles.text}>
            <Text variant="heading">{e.title}</Text>
            <Text variant="small">{e.blurb}</Text>
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
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { flex: 1, gap: 2 },
});
