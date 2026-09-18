"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colorSchema } from "@/styles/color-schema";
import { BLOG_TAXONOMY, type BlogCategoryDef } from "@/lib/blogTaxonomy";
import {
  fetchPublicTaxonomy,
  toBlogCategoryDefs,
} from "@/lib/api/blog";

const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/blog", mega: true },
  { label: "Tools", href: "/tools" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const megaId = useId();
  const [taxonomy, setTaxonomy] = useState<BlogCategoryDef[]>(BLOG_TAXONOMY);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(
    null,
  );
  const megaRef = useRef<HTMLDivElement | null>(null);
  const categoriesBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPublicTaxonomy().then((data) => {
      if (cancelled) return;
      const mapped = toBlogCategoryDefs(data);
      if (mapped.length) setTaxonomy(mapped);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileCatsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        megaRef.current?.contains(target) ||
        categoriesBtnRef.current?.contains(target)
      ) {
        return;
      }
      setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [megaOpen]);

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
  const pillBg = colorSchema.background;
  const pillText = colorSchema.semantic.foreground;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1000]">
      <div className="pointer-events-auto border-b border-brand-100/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo — left */}
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center gap-2 rounded-full pr-1"
            aria-label="FitKnowledge home"
          >
            <span
              className="inline-flex size-10 items-center justify-center overflow-hidden rounded-full"
              style={{ background: brand }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt=""
                className="size-7 object-contain"
              />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
              FitKnowledge
            </span>
          </Link>

          {/* Center nav — desktop */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 md:block"
            aria-label="Primary"
          >
            <ul
              className="flex items-center gap-1 rounded-full p-1"
              style={{ background: brand }}
              role="menubar"
            >
              {PRIMARY_NAV.map((item) => {
                if ("mega" in item && item.mega) {
                  const active =
                    pathname.startsWith("/blog") || megaOpen;
                  return (
                    <li key={item.label} className="relative" role="none">
                      <button
                        ref={categoriesBtnRef}
                        type="button"
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={megaOpen}
                        aria-controls={megaId}
                        onClick={() => setMegaOpen((v) => !v)}
                        onMouseEnter={() => setMegaOpen(true)}
                        className="relative inline-flex h-9 items-center rounded-full px-4 text-[15px] font-semibold tracking-[0.2px] transition"
                        style={{
                          background: active ? colorSchema.orange[400] : pillBg,
                          color: active ? "#fff" : pillText,
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                }

                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href} role="none">
                    <Link
                      role="menuitem"
                      href={item.href}
                      className="relative inline-flex h-9 items-center rounded-full px-4 text-[15px] font-semibold tracking-[0.2px] transition hover:opacity-95"
                      style={{
                        background: active ? colorSchema.orange[400] : pillBg,
                        color: active ? "#fff" : pillText,
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile menu button */}
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

          {/* Desktop spacer so logo/right balance */}
          <div className="ml-auto hidden w-[140px] md:block" aria-hidden="true" />
        </div>

        {/* Categories mega menu */}
        {megaOpen && (
          <div
            id={megaId}
            ref={megaRef}
            className="pointer-events-auto absolute inset-x-0 top-16 z-[1001] hidden border-b border-brand-100 bg-white shadow-[0_16px_40px_rgba(11,37,51,0.08)] md:block"
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
              {taxonomy.map((cat) => (
                <div key={cat.slug}>
                  <Link
                    href={`/blog/${cat.slug}`}
                    className="text-base font-semibold text-foreground hover:text-primary"
                    onClick={() => setMegaOpen(false)}
                  >
                    {cat.label}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {cat.description}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={`/blog/${cat.slug}/${sub.slug}`}
                          className="text-sm text-muted-foreground transition hover:text-primary"
                          onClick={() => setMegaOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-brand-50 bg-brand-50/40">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <p className="text-xs text-muted-foreground">
                  Educational guides — not medical advice.
                </p>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-primary hover:underline"
                  onClick={() => setMegaOpen(false)}
                >
                  Browse all articles →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-0 z-[999] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/30"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 top-16 max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-brand-100 bg-white shadow-lg">
            <ul className="space-y-1 p-3">
              {PRIMARY_NAV.map((item) => {
                if ("mega" in item && item.mega) {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-foreground hover:bg-brand-50"
                        aria-expanded={mobileCatsOpen}
                        onClick={() => setMobileCatsOpen((v) => !v)}
                      >
                        Categories
                        <span
                          className={`text-muted-foreground transition ${mobileCatsOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          ▾
                        </span>
                      </button>
                      {mobileCatsOpen && (
                        <ul className="mb-2 ml-2 space-y-1 border-l border-brand-100 pl-3">
                          <li>
                            <Link
                              href="/blog"
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-primary"
                              onClick={() => setMobileOpen(false)}
                            >
                              All articles
                            </Link>
                          </li>
                          {taxonomy.map((cat) => {
                            const open = expandedMobileCat === cat.slug;
                            return (
                              <li key={cat.slug}>
                                <button
                                  type="button"
                                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-foreground hover:bg-brand-50"
                                  aria-expanded={open}
                                  onClick={() =>
                                    setExpandedMobileCat(open ? null : cat.slug)
                                  }
                                >
                                  {cat.label}
                                  <span
                                    className={`text-muted-foreground transition ${open ? "rotate-180" : ""}`}
                                    aria-hidden="true"
                                  >
                                    ▾
                                  </span>
                                </button>
                                {open && (
                                  <ul className="mb-1 ml-2 space-y-0.5 border-l border-brand-50 pl-2">
                                    <li>
                                      <Link
                                        href={`/blog/${cat.slug}`}
                                        className="block rounded-md px-3 py-1.5 text-sm text-primary"
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        Overview
                                      </Link>
                                    </li>
                                    {cat.subcategories.map((sub) => (
                                      <li key={sub.slug}>
                                        <Link
                                          href={`/blog/${cat.slug}/${sub.slug}`}
                                          className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-primary"
                                          onClick={() => setMobileOpen(false)}
                                        >
                                          {sub.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
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
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
