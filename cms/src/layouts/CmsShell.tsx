import { Outlet } from "react-router-dom";
import { SessionNavBar } from "@/components/ui/sidebar";

export function CmsShell() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SessionNavBar />
      <main className="min-h-screen pl-[3.05rem]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
