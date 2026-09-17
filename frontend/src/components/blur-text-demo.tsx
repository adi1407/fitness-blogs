"use client";

import BlurText from "@/components/ui/blur-text";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export function BlurTextDemo() {
  return (
    <BlurText
      text="Isn't this so cool?!"
      delay={150}
      animateBy="words"
      direction="top"
      onAnimationComplete={handleAnimationComplete}
      className="text-2xl mb-8"
    />
  );
}
