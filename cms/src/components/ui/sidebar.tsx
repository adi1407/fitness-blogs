import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  ClipboardList,
  FilePenLine,
  FileText,
  LayoutDashboard,
  LogOut,
  PenLine,
  Users,
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
import type { StaffRole } from "@/types/auth";

const sidebarVariants = {
  open: { width: "15rem" },
  closed: { width: "3.05rem" },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { x: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: { x: { stiffness: 100 } },
  },
};

const transitionProps = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  match?: (pathname: string, search: string) => boolean;
};

function navForRole(role: StaffRole): NavItem[] {
  if (role === "writer") {
    return [
      {
        to: "/",
        label: "Dashboard",
        icon: LayoutDashboard,
        match: (p) => p === "/",
      },
      {
        to: "/articles",
        label: "My articles",
        icon: FileText,
        match: (p) =>
          p === "/articles" ||
          (/^\/articles\/[^/]+$/.test(p) && p !== "/articles/new"),
      },
      {
        to: "/articles/new",
        label: "Write article",
        icon: PenLine,
        match: (p) => p === "/articles/new",
      },
    ];
  }
  if (role === "editor") {
    return [
      {
        to: "/",
        label: "Dashboard",
        icon: LayoutDashboard,
        match: (p) => p === "/",
      },
      {
        to: "/articles?status=submitted",
        label: "Review queue",
        icon: ClipboardList,
        match: (p, s) =>
          p.startsWith("/articles") && s.includes("status=submitted"),
      },
      {
        to: "/articles",
        label: "All articles",
        icon: FileText,
        match: (p, s) =>
          p.startsWith("/articles") && !s.includes("status=submitted"),
      },
      {
        to: "/writers",
        label: "Writers",
        icon: Users,
        match: (p) => p.startsWith("/writers"),
      },
    ];
  }
  return [
    {
      to: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      match: (p) => p === "/",
    },
    {
      to: "/articles",
      label: "All articles",
      icon: FileText,
      match: (p) => p.startsWith("/articles"),
    },
    {
      to: "/users",
      label: "Users",
      icon: Users,
      match: (p) => p.startsWith("/users"),
    },
    {
      to: "/admin/activity",
      label: "Activity log",
      icon: FilePenLine,
      match: (p) => p.startsWith("/admin"),
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

export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();
  const pathname = location.pathname;
  const search = location.search;

  const items = useMemo(() => (user ? navForRole(user.role) : []), [user]);

  function isActive(item: NavItem) {
    if (item.match) return item.match(pathname, search);
    return pathname === item.to;
  }

  return (
    <motion.div
      className={cn("sidebar fixed left-0 z-40 h-full shrink-0 border-r")}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className="relative z-40 flex h-full shrink-0 flex-col bg-white text-slate-500 transition-all"
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            <div className="flex h-[54px] w-full shrink-0 border-b p-2">
              <div className="mt-[1.5px] flex w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex w-fit items-center gap-2 px-2"
                  asChild
                >
                  <Link to="/">
                    <Avatar className="size-4 rounded">
                      <AvatarFallback className="rounded text-[9px]">
                        FK
                      </AvatarFallback>
                    </Avatar>
                    <motion.li
                      variants={variants}
                      className="flex w-fit items-center gap-2"
                    >
                      {!isCollapsed && (
                        <p className="text-sm font-medium text-slate-900">
                          FitKnowledge
                        </p>
                      )}
                    </motion.li>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-16 grow p-2">
                  <div className="flex w-full flex-col gap-1">
                    {items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item);
                      return (
                        <Link
                          key={item.to + item.label}
                          to={item.to}
                          className={cn(
                            "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-sky-700",
                            active && "bg-slate-100 text-sky-600",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <motion.li variants={variants}>
                            {!isCollapsed && (
                              <p className="ml-2 text-sm font-medium">
                                {item.label}
                              </p>
                            )}
                          </motion.li>
                        </Link>
                      );
                    })}
                    <Separator className="my-2 w-full" />
                  </div>
                </ScrollArea>
              </div>

              <div className="flex flex-col p-2">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="w-full">
                    <div className="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-sky-700">
                      <Avatar className="size-4">
                        <AvatarFallback className="text-[9px]">
                          {user ? initials(user.name) : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <motion.li
                        variants={variants}
                        className="flex w-full items-center gap-2"
                      >
                        {!isCollapsed && (
                          <>
                            <p className="text-sm font-medium text-slate-800">
                              {user?.name}
                            </p>
                            <span className="ml-auto text-[10px] uppercase tracking-wide text-slate-400">
                              {user?.role}
                            </span>
                          </>
                        )}
                      </motion.li>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="top" className="w-56">
                    <div className="px-2 py-1.5 text-xs text-slate-500">
                      {user?.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onSelect={() => void logout()}
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
