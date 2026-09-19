import type { ReactNode } from "react";

/** Soft sky/orange wash shared by home keep and article reader. */
export function KeepAtmosphere({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-linear-to-b from-[#F7FBFE] via-white to-[#FFF8F0] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 0%, #E1F5FE 0%, transparent 45%), radial-gradient(circle at 92% 18%, #FFE0B2 0%, transparent 40%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
