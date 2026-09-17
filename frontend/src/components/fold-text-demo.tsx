"use client";

import FoldText from "@/components/ui/fold-text";

export function FoldTextDemo() {
  return (
    <FoldText
      text="Launch with clarity"
      splitBy="char"
      hinge="top"
      trigger="scroll"
      duration={0.65}
      stagger={0.045}
      ease="power3.out"
      perspective={700}
      creaseShading={0.55}
      fontSize="clamp(3rem, 10vw, 7rem)"
      fontWeight={800}
      color="#f7f2e8"
    />
  );
}
