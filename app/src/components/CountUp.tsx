import { useEffect, useRef, useState } from "react";
import type { TextProps } from "react-native";

import { motion } from "@/theme";
import { Text } from "./Text";

type Props = Omit<TextProps, "children"> & {
  value: number;
  decimals?: number;
  suffix?: string;
  variant?: "display" | "title" | "heading" | "body";
  locale?: boolean;
};

/** Animates from the previous value to the new one with ease-out. */
export function CountUp({ value, decimals = 0, suffix = "", variant = "display", locale = true, ...rest }: Props) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const start = from.current;
    const delta = value - start;
    if (!Number.isFinite(value) || delta === 0) {
      setShown(value);
      return;
    }
    const t0 = Date.now();
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - t0) / motion.countUp);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(start + delta * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      from.current = value;
    };
  }, [value]);

  const factor = Math.pow(10, decimals);
  const rounded = Math.round(shown * factor) / factor;
  const text = locale
    ? rounded.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : rounded.toFixed(decimals);

  return (
    <Text variant={variant} accessibilityLabel={`${value.toFixed(decimals)}${suffix}`} {...rest}>
      {text}
      {suffix}
    </Text>
  );
}
