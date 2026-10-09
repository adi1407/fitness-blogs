import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function EmbedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{":root{--site-header-height:0px}"}</style>
      {children}
    </>
  );
}
