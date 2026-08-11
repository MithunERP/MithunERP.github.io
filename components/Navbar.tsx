"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import type { NavLink } from "@/lib/settings";

// nav_links comes from the CMS (site_settings.header, see Phase 2.1) —
// fetched once in app/layout.tsx (a Server Component) and passed down,
// since this component itself needs "use client" for scroll/menu state.
export default function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent at the top of the page, gains a frosted-glass background
  // once scrolled — same threshold as the reference pattern this was
  // adapted from (48px). Calls handleScroll() once immediately on mount,
  // not just a lazy useState initializer — on a hard refresh while already
  // scrolled down, the browser's scroll-position restoration can happen
  // after hydration, so a one-time initializer can read window.scrollY
  // before the browser has jumped there and get stuck reporting "not
  // scrolled" until the next manual scroll. Checking again right on mount
  // (plus the listener for anything after) catches that case.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 48);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 relative transition-all duration-300 ${
        scrolled
          ? "bg-background/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_20px_-14px_var(--accent-glow)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="MithunERP — home" className="group flex items-center">
          <span className="select-none font-display text-xl text-foreground transition-[filter] duration-300 group-hover:drop-shadow-[0_0_10px_var(--accent-glow)]">
            Mithun<span className="text-accent">ERP</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded border border-panel-border"
          >
            <span className="h-px w-5 bg-foreground" />
            <span className="h-px w-5 bg-foreground" />
            <span className="h-px w-5 bg-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-panel-border px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      {scrolled && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
          <div className="relative h-px w-40 md:w-56">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-70 blur-sm" />
          </div>
        </div>
      )}
    </header>
  );
}
