import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  Bell,
  ClipboardList,
  FilePenLine,
  FileText,
  LayoutDashboard,
  Link2,
  ListTodo,
  LogOut,
  Menu,
  PenLine,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api/client";
import type { StaffRole } from "@/types/auth";

type NavItem = {
  to: string;
  label: string;
  description?: string;
  icon: ComponentType<{ className?: string }>;
  match?: (pathname: string, search: string) => boolean;
  badgeKey?: "notifications";
};

type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

const sidebarVariants = {
  open: { width: "15rem" },
  closed: { width: "3.05rem" },
};

const labelVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 32 },
  },
  closed: {
    x: -8,
    opacity: 0,
    transition: { duration: 0.12 },
  },
};

const transitionProps = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.2,
};

function navGroupsForRole(role: StaffRole): NavGroup[] {
  if (role === "writer") {
    return [
      {
        id: "desk",
        label: "Your desk",
        items: [
          {
            to: "/",
            label: "Dashboard",
            description: "Resume drafts and goals",
            icon: LayoutDashboard,
            match: (p) => p === "/",
          },
          {
            to: "/articles",
            label: "My articles",
            description: "Drafts and live pieces",
            icon: FileText,
            match: (p) =>
              p === "/articles" ||
              (/^\/articles\/[^/]+$/.test(p) && p !== "/articles/new"),
          },
          {
            to: "/articles/new",
            label: "Write article",
            description: "Start a new guide",
            icon: PenLine,
            match: (p) => p === "/articles/new",
          },
        ],
      },
      {
        id: "work",
        label: "Assignments",
        items: [
          {
            to: "/assignments",
            label: "Assignments",
            description: "Briefs assigned to you",
            icon: ListTodo,
            match: (p) => p.startsWith("/assignments"),
          },
          {
            to: "/notifications",
            label: "Notifications",
            description: "Editor feedback and publishes",
            icon: Bell,
            match: (p) => p.startsWith("/notifications"),
            badgeKey: "notifications",
          },
        ],
      },
    ];
  }

  if (role === "editor") {
    return [
      {
        id: "desk",
        label: "Editor desk",
        items: [
          {
            to: "/",
            label: "Dashboard",
            description: "Queue health and coaching",
            icon: LayoutDashboard,
            match: (p) => p === "/",
          },
          {
            to: "/articles?status=submitted",
            label: "Review queue",
            description: "Waiting for you",
            icon: ClipboardList,
            match: (p, s) =>
              p.startsWith("/articles") && s.includes("status=submitted"),
          },
          {
            to: "/articles",
            label: "All articles",
            description: "Full catalog",
            icon: FileText,
            match: (p, s) =>
              p.startsWith("/articles") && !s.includes("status=submitted"),
          },
        ],
      },
      {
        id: "team",
        label: "Team & planning",
        items: [
          {
            to: "/writers",
            label: "Writers",
            description: "Staff directory",
            icon: Users,
            match: (p) => p.startsWith("/writers"),
          },
          {
            to: "/assignments",
            label: "Assignments",
            description: "Briefs and due dates",
            icon: ListTodo,
            match: (p) => p.startsWith("/assignments"),
          },
          {
            to: "/redirects",
            label: "Redirects",
            description: "URL moves",
            icon: Link2,
            match: (p) => p.startsWith("/redirects"),
          },
          {
            to: "/notifications",
            label: "Notifications",
            description: "Inbox",
            icon: Bell,
            match: (p) => p.startsWith("/notifications"),
            badgeKey: "notifications",
          },
        ],
      },
    ];
  }

  return [
    {
      id: "desk",
      label: "Ops desk",
      items: [
        {
          to: "/",
          label: "Dashboard",
          description: "Health and KPIs",
          icon: LayoutDashboard,
          match: (p) => p === "/",
        },
        {
          to: "/articles",
          label: "All articles",
          description: "Full catalog",
          icon: FileText,
          match: (p) => p.startsWith("/articles"),
        },
        {
          to: "/assignments",
          label: "Assignments",
          description: "Editorial briefs",
          icon: ListTodo,
          match: (p) => p.startsWith("/assignments"),
        },
      ],
    },
    {
      id: "site",
      label: "Site & SEO",
      items: [
        {
          to: "/redirects",
          label: "Redirects",
          description: "301 map",
          icon: Link2,
          match: (p) => p.startsWith("/redirects"),
        },
        {
          to: "/admin/analytics",
          label: "Analytics",
          description: "OpenPanel setup",
          icon: BarChart3,
          match: (p) => p === "/admin/analytics",
        },
        {
          to: "/admin/activity",
          label: "Activity log",
          description: "Audit trail",
          icon: FilePenLine,
          match: (p) => p.startsWith("/admin/activity"),
        },
      ],
    },
    {
      id: "people",
      label: "People",
      items: [
        {
          to: "/users",
          label: "Users",
          description: "Roles and access",
          icon: Users,
          match: (p) => p.startsWith("/users"),
        },
        {
          to: "/notifications",
          label: "Notifications",
          description: "Inbox",
          icon: Bell,
          match: (p) => p.startsWith("/notifications"),
          badgeKey: "notifications",
        },
      ],
    },
  ];
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function roleLabel(role: StaffRole) {
  if (role === "admin") return "Admin";
  if (role === "editor") return "Editor";
  return "Writer";
}

function flattenGroups(groups: NavGroup[]): NavItem[] {
  return groups.flatMap((g) => g.items);
}

function NavBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-sky-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function DesktopRail({
  groups,
  unread,
  pathname,
  search,
  userName,
  userEmail,
  userRole,
  onLogout,
}: {
  groups: NavGroup[];
  unread: number;
  pathname: string;
  search: string;
  userName: string;
  userEmail: string;
  userRole: StaffRole;
  onLogout: () => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const items = flattenGroups(groups);

  function isActive(item: NavItem) {
    if (item.match) return item.match(pathname, search);
    return pathname === item.to;
  }

  return (
    <motion.aside
      className="fixed left-0 top-0 z-40 hidden h-dvh shrink-0 border-r border-slate-200 bg-white md:block"
      initial={false}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-14 shrink-0 items-center border-b border-slate-100 px-2">
          <Link
            to="/"
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-slate-50"
          >
            <Avatar className="size-7 rounded-md">
              <AvatarFallback className="rounded-md bg-slate-900 text-[10px] font-semibold text-white">
                FK
              </AvatarFallback>
            </Avatar>
            <motion.span
              variants={labelVariants}
              className="overflow-hidden whitespace-nowrap text-sm font-semibold text-slate-900"
            >
              {!isCollapsed ? "FitKnowledge CMS" : null}
            </motion.span>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-2 py-3">
          <nav className="flex flex-col gap-1" aria-label="Main">
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              const badge =
                item.badgeKey === "notifications" ? unread : 0;
              return (
                <Link
                  key={`${item.to}-${item.label}`}
                  to={item.to}
                  title={item.label}
                  className={cn(
                    "group relative flex h-9 items-center gap-2 rounded-lg px-2 transition",
                    active
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  {active ? (
                    <span className="absolute left-0 top-1.5 h-6 w-0.5 rounded-r bg-sky-500" />
                  ) : null}
                  <Icon className="size-4 shrink-0" />
                  <motion.span
                    variants={labelVariants}
                    className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden"
                  >
                    {!isCollapsed ? (
                      <>
                        <span className="truncate text-sm font-medium">
                          {item.label}
                        </span>
                        <NavBadge count={badge} />
                      </>
                    ) : null}
                  </motion.span>
                  {isCollapsed && badge > 0 ? (
                    <span className="absolute right-1 top-1 size-1.5 rounded-full bg-sky-500" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="border-t border-slate-100 p-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-full items-center gap-2 rounded-lg px-2 text-left transition hover:bg-slate-50"
              >
                <Avatar className="size-7">
                  <AvatarFallback className="bg-slate-100 text-[10px] font-semibold text-slate-700">
                    {initials(userName)}
                  </AvatarFallback>
                </Avatar>
                <motion.span
                  variants={labelVariants}
                  className="min-w-0 flex-1 overflow-hidden"
                >
                  {!isCollapsed ? (
                    <span className="block">
                      <span className="block truncate text-sm font-medium text-slate-900">
                        {userName}
                      </span>
                      <span className="block truncate text-[11px] uppercase tracking-wide text-slate-400">
                        {roleLabel(userRole)}
                      </span>
                    </span>
                  ) : null}
                </motion.span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-slate-900">{userName}</p>
                <p className="text-xs text-slate-500">{userEmail}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-700"
                onSelect={() => onLogout()}
              >
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.aside>
  );
}

function MobileNav({
  groups,
  unread,
  pathname,
  search,
  userName,
  userEmail,
  userRole,
  onLogout,
}: {
  groups: NavGroup[];
  unread: number;
  pathname: string;
  search: string;
  userName: string;
  userEmail: string;
  userRole: StaffRole;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function isActive(item: NavItem) {
    if (item.match) return item.match(pathname, search);
    return pathname === item.to;
  }

  const currentLabel =
    flattenGroups(groups).find((item) => isActive(item))?.label ?? "CMS";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md md:hidden">
        <div className="flex h-14 items-center gap-3 px-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="size-10 shrink-0 rounded-xl px-0"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              FitKnowledge
            </p>
            <p className="truncate text-xs text-slate-500">{currentLabel}</p>
          </div>

          <Link
            to="/notifications"
            className="relative inline-flex size-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            {unread > 0 ? (
              <span className="absolute right-1.5 top-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-sky-500 px-1 text-[9px] font-bold text-white">
                {unread > 9 ? "9+" : unread}
              </span>
            ) : null}
          </Link>

          <Avatar className="size-8">
            <AvatarFallback className="bg-slate-100 text-[10px] font-semibold text-slate-700">
              {initials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-white shadow-2xl shadow-slate-900/20 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900 px-4 pb-5 pt-4 text-white">
                <div className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-sky-400/20 blur-2xl" />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-9 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-white/15 text-[11px] font-bold text-white">
                          FK
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold tracking-tight">
                          FitKnowledge
                        </p>
                        <p className="text-xs text-white/65">CMS workspace</p>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90 ring-1 ring-white/15">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      Signed in as {roleLabel(userRole)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex size-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/15"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-5" aria-label="Mobile main">
                  {groups.map((group) => (
                    <div key={group.id}>
                      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {group.label}
                      </p>
                      <ul className="space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item);
                          const badge =
                            item.badgeKey === "notifications" ? unread : 0;
                          return (
                            <li key={`${item.to}-${item.label}`}>
                              <Link
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className={cn(
                                  "flex items-center gap-3 rounded-2xl px-3 py-3 transition",
                                  active
                                    ? "bg-sky-50 text-sky-800 ring-1 ring-sky-100"
                                    : "text-slate-700 hover:bg-slate-50",
                                )}
                              >
                                <span
                                  className={cn(
                                    "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                                    active
                                      ? "bg-sky-500 text-white"
                                      : "bg-slate-100 text-slate-600",
                                  )}
                                >
                                  <Icon className="size-4" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="flex items-center gap-2">
                                    <span className="truncate text-sm font-semibold">
                                      {item.label}
                                    </span>
                                    <NavBadge count={badge} />
                                  </span>
                                  {item.description ? (
                                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                                      {item.description}
                                    </span>
                                  ) : null}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </ScrollArea>

              <div className="border-t border-slate-100 p-3">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-white text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                        {initials(userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {userName}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onLogout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-red-600 ring-1 ring-slate-200 transition hover:bg-red-50"
                  >
                    <LogOut className="size-4" />
                    Log out
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function SessionNavBar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [unread, setUnread] = useState(0);

  const groups = useMemo(
    () => (user ? navGroupsForRole(user.role) : []),
    [user],
  );

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    void (async () => {
      try {
        const data = await apiFetch<{ unreadCount: number }>(
          "/notifications?limit=1",
        );
        if (!cancelled) setUnread(data.unreadCount ?? 0);
      } catch {
        if (!cancelled) setUnread(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, location.pathname]);

  if (!user) return null;

  return (
    <>
      <DesktopRail
        groups={groups}
        unread={unread}
        pathname={location.pathname}
        search={location.search}
        userName={user.name}
        userEmail={user.email}
        userRole={user.role}
        onLogout={() => void logout()}
      />
      <MobileNav
        groups={groups}
        unread={unread}
        pathname={location.pathname}
        search={location.search}
        userName={user.name}
        userEmail={user.email}
        userRole={user.role}
        onLogout={() => void logout()}
      />
    </>
  );
}
