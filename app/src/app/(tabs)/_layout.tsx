import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router/js-tabs";
import type { ComponentProps } from "react";
import type { ColorValue } from "react-native";

import { colors, fonts } from "@/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

function icon(active: IconName, inactive: IconName) {
  return function TabIcon({ focused, color, size }: { focused: boolean; color: ColorValue; size: number }) {
    return <Ionicons name={focused ? active : inactive} color={color} size={size} />;
  };
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.subtle,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarStyle: { borderTopColor: colors.border, backgroundColor: colors.bg },
        headerTitleStyle: { fontFamily: fonts.bold, fontSize: 20 },
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerTitle: "fitlives", tabBarIcon: icon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="articles"
        options={{ title: "Articles", tabBarIcon: icon("newspaper", "newspaper-outline") }}
      />
      <Tabs.Screen
        name="foods"
        options={{ title: "Foods", tabBarIcon: icon("nutrition", "nutrition-outline") }}
      />
      <Tabs.Screen
        name="calculators"
        options={{ title: "Calculators", tabBarIcon: icon("calculator", "calculator-outline") }}
      />
    </Tabs>
  );
}
