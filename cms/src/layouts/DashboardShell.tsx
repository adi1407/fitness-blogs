import type { ReactNode } from "react";

type DashboardShellProps = {
  children?: ReactNode;
};

/** CMS shell — expand with auth, nav, and feature routes later. */
export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="shell">
      <header className="shell__header">
        <strong>Fitness CMS</strong>
        <span>React 19 dashboard scaffold</span>
      </header>
      <main className="shell__main">
        {children ?? (
          <p>Dashboard ready. Features live under src/features.</p>
        )}
      </main>
    </div>
  );
}
