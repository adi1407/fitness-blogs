import Ionicons from "@expo/vector-icons/Ionicons";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, shadow, space } from "@/theme";
import { Text } from "./Text";

type ToastKind = "info" | "success" | "error";
type ToastState = { id: number; message: string; kind: ToastKind } | null;

const ToastContext = createContext<(message: string, kind?: ToastKind) => void>(() => {});

const ICON = { info: "information-circle", success: "checkmark-circle", error: "alert-circle" } as const;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();

  const show = useCallback((message: string, kind: ToastKind = "info") => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ id: Date.now(), message, kind });
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast ? (
        <Animated.View
          key={toast.id}
          entering={FadeInDown.springify().damping(18)}
          exiting={FadeOutDown}
          style={[styles.toast, { bottom: insets.bottom + 96 }]}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
        >
          <Ionicons
            name={ICON[toast.kind]}
            size={18}
            color={toast.kind === "error" ? "#FF6B5B" : colors.accent}
          />
          <Text variant="small" style={styles.text}>
            {toast.message}
          </Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: space.lg,
    right: space.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    backgroundColor: colors.ink,
    borderRadius: radius.lg,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    ...shadow.lg,
  },
  text: { color: colors.bg, flex: 1 },
});
