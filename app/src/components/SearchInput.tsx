import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, TextInput, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, fonts, radius, space } from "@/theme";

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SearchInput({ value, onChangeText, placeholder, autoFocus, onSubmitEditing, style }: Props) {
  return (
    <View style={[styles.wrap, style]}>
      <Ionicons name="search" size={18} color={colors.subtle} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subtle}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        clearButtonMode="never"
        accessibilityLabel={placeholder}
      />
      {value ? (
        <Pressable onPress={() => onChangeText("")} hitSlop={10} accessibilityLabel="Clear search">
          <Ionicons name="close-circle" size={18} color={colors.subtle} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    minHeight: 44,
  },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.ink, paddingVertical: space.sm },
});
