import { Link, Outlet, useLocation } from "react-router-dom";
import { SessionNavBar } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

export function CmsShell() {
  const { mustChangePassword } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <SessionNavBar />
      <main className="min-h-dvh md:pl-[3.05rem]">
        {mustChangePassword && pathname !== "/account/password" ? (
          <div className="border-b border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800 sm:px-6">
            <strong>Security:</strong> this account uses a default password that is
            published in the project&apos;s public code.{" "}
            <Link to="/account/password" className="font-semibold underline">
              Change it now
            </Link>
          </div>
        ) : null}
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
