import type { ReactNode } from "react";

/** Flat white canvas for keep home + article reader. */
export function KeepAtmosphere({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative bg-white ${className}`}>
      <div className="relative">{children}</div>
    </div>
  );
}
