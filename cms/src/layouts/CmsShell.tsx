import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SessionNavBar } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

const TITLE_BY_PATH: { match: RegExp; title: string }[] = [
  { match: /^\/$/, title: "Dashboard" },
  { match: /^\/articles\/new/, title: "New article" },
  { match: /^\/articles\/[^/]+/, title: "Edit article" },
  { match: /^\/articles/, title: "Articles" },
  { match: /^\/assignments/, title: "Assignments" },
  { match: /^\/notifications/, title: "Notifications" },
  { match: /^\/account\/password/, title: "Change password" },
  { match: /^\/writers/, title: "Writers" },
  { match: /^\/redirects/, title: "Redirects" },
  { match: /^\/subscribers/, title: "Subscribers" },
  { match: /^\/search-insights/, title: "Search insights" },
  { match: /^\/seo\/indexing/, title: "SEO indexing" },
  { match: /^\/seo\/clusters/, title: "Topic clusters" },
  { match: /^\/seo/, title: "SEO performance" },
  { match: /^\/quality/, title: "Quality gaps" },
  { match: /^\/exercises\/new/, title: "New exercise" },
  { match: /^\/exercises\/[^/]+/, title: "Edit exercise" },
  { match: /^\/exercises/, title: "Exercises" },
  { match: /^\/recipes\/new/, title: "New recipe" },
  { match: /^\/recipes\/[^/]+/, title: "Edit recipe" },
  { match: /^\/recipes/, title: "Recipes" },
  { match: /^\/foods\/new/, title: "New food" },
  { match: /^\/foods\/[^/]+/, title: "Edit food" },
  { match: /^\/foods/, title: "Foods" },
  { match: /^\/product-picks\/new/, title: "New product pick" },
  { match: /^\/product-picks\/[^/]+/, title: "Edit product pick" },
  { match: /^\/product-picks/, title: "Product picks" },
  { match: /^\/programs\/new/, title: "New program" },
  { match: /^\/programs\/[^/]+/, title: "Edit program" },
  { match: /^\/programs/, title: "Programs" },
  { match: /^\/reviews\/new/, title: "New review" },
  { match: /^\/reviews\/[^/]+/, title: "Edit review" },
  { match: /^\/reviews/, title: "Reviews" },
  { match: /^\/users/, title: "Users" },
  { match: /^\/activity/, title: "Activity log" },
  { match: /^\/database/, title: "Database health" },
  { match: /^\/analytics/, title: "Analytics" },
];

function titleForPath(pathname: string): string {
  const hit = TITLE_BY_PATH.find((row) => row.match.test(pathname));
  return hit ? `${hit.title} · fitlives CMS` : "fitlives CMS";
}

export function CmsShell() {
  const { mustChangePassword } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titleForPath(pathname);
  }, [pathname]);

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
