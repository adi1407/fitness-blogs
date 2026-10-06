import { StyleSheet } from "react-native";

import { Card } from "@/components/Card";
import { GradientHero } from "@/components/GradientHero";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { openLink } from "@/lib/links";
import { colors, space } from "@/theme";

export default function AccountScreen() {
  return (
    <Screen>
      <GradientHero
        eyebrow="Your fitlives"
        title="Save what matters."
        subtitle="Bookmarks, upvotes and saved calculator results — synced with fitlives.in."
      />
      <Card style={styles.card}>
        <Text variant="heading">fitlives on the web</Text>
        <Text variant="small">Everything in this app also lives on fitlives.in.</Text>
        <Text variant="body" style={styles.link} onPress={() => openLink(SITE_URL)}>
          Open fitlives.in
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: space.sm },
  link: { color: colors.ink, textDecorationLine: "underline" },
});
