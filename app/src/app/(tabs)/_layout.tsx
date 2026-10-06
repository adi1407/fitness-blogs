import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Tabs } from "expo-router/js-tabs";
import { Pressable } from "react-native";

import { FloatingTabBar } from "@/components/FloatingTabBar";
import { colors, fonts } from "@/theme";

function SearchButton() {
  return (
    <Pressable
      onPress={() => router.push("/search")}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel="Search fitlives"
      style={{ marginRight: 16 }}
    >
      <Ionicons name="search" size={22} color={colors.ink} />
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerTitleStyle: { fontFamily: fonts.bold, fontSize: 22 },
        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.bg },
        headerRight: () => <SearchButton />,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", headerTitle: "fitlives" }} />
      <Tabs.Screen name="learn" options={{ title: "Learn" }} />
      <Tabs.Screen name="tools" options={{ title: "Tools" }} />
      <Tabs.Screen name="library" options={{ title: "Library" }} />
      <Tabs.Screen name="account" options={{ title: "Account" }} />
    </Tabs>
  );
}
