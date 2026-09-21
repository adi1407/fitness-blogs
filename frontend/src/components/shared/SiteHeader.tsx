"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  Calculator,
  ChevronDown,
  Dumbbell,
  Home,
  LogOut,
  Salad,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { colorSchema } from "@/styles/color-schema";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { useMemberAuth } from "@/features/auth/MemberAuthContext";

const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
] as const;

const CATEGORY_STRIP = [
  { label: "Latest", href: "/blog" },
  ...BLOG_TAXONOMY.map((c) => ({
    label: c.label,
    href: `/blog/${c.slug}`,
  })),
] as const;

const MOBILE_QUICK = [
  { label: "Home", href: "/", icon: Home, blurb: "Magazine feed" },
  { label: "Latest", href: "/blog", icon: BookOpen, blurb: "All guides" },
  { label: "Tools", href: "/tools", icon: Calculator, blurb: "Calculators" },
  {
    label: "Exercises",
    href: "/exercises",
    icon: Dumbbell,
    blurb: "By muscle group",
  },
  {
    label: "Indian foods",
    href: "/foods/indian",
    icon: Salad,
    blurb: "High-protein staples",
  },
] as const;

const MOBILE_TRUST = [
  { label: "About", href: "/about" },
  { label: "Authors", href: "/authors" },
  { label: "Editorial policy", href: "/editorial-policy" },
  { label: "Contact", href: "/contact" },
] as const;

const TOOL_SHORTCUTS = [
  { label: "Protein", href: "/tools/protein-calculator" },
  { label: "TDEE", href: "/tools/tdee-calculator" },
  { label: "Macros", href: "/tools/macro-calculator" },
  { label: "Calories", href: "/tools/calorie-calculator" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isCategoryActive(pathname: string, href: string) {
  if (href === "/blog") return pathname === "/blog";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { member, loading: authLoading, logout } = useMemberAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPillar, setOpenPillar] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setOpenPillar(null);
  }, [pathname]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeight = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${Math.ceil(h)}px`,
      );
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    ro.observe(el);
    window.addEventListener("resize", syncHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const match = BLOG_TAXONOMY.find(
      (c) =>
        pathname.startsWith(`/blog/${c.slug}`) ||
        pathname.startsWith(`/${c.slug}`),
    );
    if (match) setOpenPillar(match.slug);
  }, [pathname]);

  const brand = colorSchema.brand[400];
  const accent = colorSchema.orange[400];

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-[1000] pt-[env(safe-area-inset-top)]"
    >
      {/* Bar 1 — logo + primary nav */}
      <div className="pointer-events-auto border-b border-border/80 bg-white/95 backdrop-blur-md">
        <div className="fk-page flex h-14 items-center gap-4 sm:h-16">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center gap-2 pr-1"
            aria-label="FitKnowledge home"
          >
            <span
              className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full sm:size-10"
              style={{ background: brand }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt=""
                className="size-6 object-contain sm:size-7"
              />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
              FitKnowledge
            </span>
          </Link>

          <nav
            className="ml-auto hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {PRIMARY_NAV.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-9 items-center rounded-full px-4 text-[15px] font-semibold transition"
                  style={{
                    background: active
                      ? colorSchema.semantic.primary
                      : "transparent",
                    color: active
                      ? colorSchema.semantic.background
                      : colorSchema.semantic.foreground,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            {!authLoading && member ? (
              <div className="ml-2 flex items-center gap-2 pl-2">
                {member.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.picture}
                    alt=""
                    className="size-8 rounded-full object-cover ring-1 ring-border"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted">
                    <UserRound className="size-4" />
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => logout()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="size-3.5" />
                  Sign out
                </button>
              </div>
            ) : !authLoading ? (
              <Link
                href={`/login?next=${encodeURIComponent(pathname)}`}
                className="ml-2 inline-flex h-9 items-center rounded-full px-4 text-[15px] font-semibold text-white transition hover:opacity-90"
                style={{ background: brand }}
              >
                Sign in
              </Link>
            ) : null}
          </nav>

          <button
            type="button"
            className="relative ml-auto inline-flex size-11 items-center justify-center rounded-full md:hidden"
            style={{ background: brand }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-drawer"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`block h-0.5 w-full origin-center rounded-full bg-white transition duration-300 ${
                  mobileOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-white transition duration-200 ${
                  mobileOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full origin-center rounded-full bg-white transition duration-300 ${
                  mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Bar 2 — category strip */}
      <div className="pointer-events-auto border-b border-border bg-white/95 backdrop-blur-md">
        <nav
          className="fk-page flex gap-1 overflow-x-auto overscroll-x-contain py-2 scrollbar-none"
          aria-label="Categories"
        >
          {CATEGORY_STRIP.map((item) => {
            const active = isCategoryActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile slide-over */}
      <AnimatePresence>
        {mobileOpen ? (
          <div className="pointer-events-auto fixed inset-0 z-[1100] md:hidden">
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              id="site-mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="absolute inset-y-0 right-0 flex w-[min(22.5rem,92vw)] flex-col bg-white shadow-2xl shadow-black/25"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <div className="relative overflow-hidden border-b border-border bg-[#0A0A0A] px-4 pb-5 pt-4 text-white">
                <div
                  className="pointer-events-none absolute -left-10 top-0 size-40 rounded-full opacity-40 blur-3xl"
                  style={{ background: accent }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/logo.svg"
                          alt=""
                          className="size-6 object-contain"
                        />
                      </span>
                      <div>
                        <p
                          id={titleId}
                          className="text-base font-semibold tracking-tight"
                        >
                          FitKnowledge
                        </p>
                        <p className="text-xs text-white/60">
                          Guides · tools · databases
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-white/70">
                      Searchable fitness knowledge — not a thin blog.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/15"
                    aria-label="Close menu"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                <section>
                  <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Explore
                  </p>
                  <ul className="space-y-1">
                    {MOBILE_QUICK.map((item) => {
                      const Icon = item.icon;
                      const active = isActivePath(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition ${
                              active
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-muted"
                            }`}
                          >
                            <span
                              className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ${
                                active
                                  ? "bg-white/15"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <Icon className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold">
                                {item.label}
                              </span>
                              <span
                                className={`block text-xs ${
                                  active
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {item.blurb}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                <section className="mt-6">
                  <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Knowledge pillars
                  </p>
                  <ul className="space-y-1">
                    {BLOG_TAXONOMY.map((cat) => {
                      const open = openPillar === cat.slug;
                      const hubHref = `/blog/${cat.slug}`;
                      const active = isCategoryActive(pathname, hubHref);
                      return (
                        <li
                          key={cat.slug}
                          className="overflow-hidden rounded-2xl border border-border bg-white"
                        >
                          <div className="flex items-stretch">
                            <Link
                              href={hubHref}
                              onClick={() => setMobileOpen(false)}
                              className={`min-w-0 flex-1 px-3.5 py-3 text-left ${
                                active ? "bg-muted/80" : ""
                              }`}
                            >
                              <span className="block text-sm font-semibold text-foreground">
                                {cat.label}
                              </span>
                              <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">
                                {cat.description}
                              </span>
                            </Link>
                            <button
                              type="button"
                              aria-expanded={open}
                              aria-label={`${open ? "Hide" : "Show"} ${cat.label} topics`}
                              onClick={() =>
                                setOpenPillar((prev) =>
                                  prev === cat.slug ? null : cat.slug,
                                )
                              }
                              className="inline-flex w-12 items-center justify-center border-l border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
                            >
                              <ChevronDown
                                className={`size-4 transition duration-200 ${
                                  open ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>
                          <AnimatePresence initial={false}>
                            {open ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22 }}
                                className="overflow-hidden border-t border-border bg-muted/40"
                              >
                                <ul className="space-y-0.5 p-2">
                                  {cat.subcategories.slice(0, 6).map((sub) => {
                                    const href = `/blog/${cat.slug}/${sub.slug}`;
                                    const subActive = isActivePath(
                                      pathname,
                                      href,
                                    );
                                    return (
                                      <li key={sub.slug}>
                                        <Link
                                          href={href}
                                          onClick={() => setMobileOpen(false)}
                                          className={`block rounded-xl px-3 py-2.5 text-sm ${
                                            subActive
                                              ? "bg-primary font-semibold text-primary-foreground"
                                              : "text-foreground hover:bg-white"
                                          }`}
                                        >
                                          {sub.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                  <li>
                                    <Link
                                      href={hubHref}
                                      onClick={() => setMobileOpen(false)}
                                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold"
                                      style={{ color: accent }}
                                    >
                                      View all {cat.label.toLowerCase()} →
                                    </Link>
                                  </li>
                                </ul>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                <section className="mt-6">
                  <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Popular tools
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {TOOL_SHORTCUTS.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-2xl border border-border bg-white px-3 py-3 text-center text-sm font-semibold text-foreground transition hover:border-foreground/20 hover:bg-muted"
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/tools"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-white"
                    style={{ background: brand }}
                  >
                    <Sparkles className="size-4" />
                    All calculators
                  </Link>
                </section>

                <section className="mt-6 pb-2">
                  <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Trust
                  </p>
                  <ul className="overflow-hidden rounded-2xl border border-border bg-white">
                    {MOBILE_TRUST.map((item, i) => (
                      <li
                        key={item.href}
                        className={
                          i > 0 ? "border-t border-border" : undefined
                        }
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-4 py-3.5 text-sm font-medium ${
                            isActivePath(pathname, item.href)
                              ? "bg-muted font-semibold text-foreground"
                              : "text-foreground hover:bg-muted/60"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="border-t border-border bg-muted/50 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                {!authLoading && member ? (
                  <div className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-white px-3 py-3">
                    {member.picture ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.picture}
                        alt=""
                        className="size-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted">
                        <UserRound className="size-4" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {member.name || member.email}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      aria-label="Sign out"
                    >
                      <LogOut className="size-4" />
                    </button>
                  </div>
                ) : !authLoading ? (
                  <Link
                    href={`/login?next=${encodeURIComponent(pathname)}`}
                    onClick={() => setMobileOpen(false)}
                    className="mb-3 flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-sm font-semibold text-white"
                    style={{ background: brand }}
                  >
                    Sign in with Google
                  </Link>
                ) : null}
                <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                  Educational only — not medical advice. Consult a professional
                  for personal decisions.
                </p>
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
