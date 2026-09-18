"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colorSchema } from "@/styles/color-schema";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";

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

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isCategoryActive(pathname: string, href: string) {
  if (href === "/blog") {
    return pathname === "/blog";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const brand = colorSchema.brand[400];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1000]">
      {/* Bar 1 — logo + primary nav */}
      <div className="pointer-events-auto border-b border-brand-100/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
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
              <img src="/logo.svg" alt="" className="size-6 object-contain sm:size-7" />
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
                    background: active ? colorSchema.orange[400] : "transparent",
                    color: active ? "#fff" : colorSchema.semantic.foreground,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="ml-auto inline-flex size-10 items-center justify-center rounded-full md:hidden"
            style={{ background: brand }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-4 rounded bg-white transition ${mobileOpen ? "translate-y-[4px] rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-4 rounded bg-white transition ${mobileOpen ? "-translate-y-[4px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Bar 2 — category strip */}
      <div className="pointer-events-auto border-b border-brand-100 bg-brand-50/90 backdrop-blur-md">
        <nav
          className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 scrollbar-none sm:px-6 lg:px-8"
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
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile drawer — primary links only */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-0 z-[999] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/30"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 top-[6.75rem] max-h-[calc(100svh-6.75rem)] overflow-y-auto border-b border-brand-100 bg-white shadow-lg">
            <ul className="space-y-1 p-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                      isActivePath(pathname, item.href)
                        ? "bg-brand-50 text-primary"
                        : "text-foreground hover:bg-brand-50"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
