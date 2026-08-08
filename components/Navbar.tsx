"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import type { NavLink } from "@/lib/settings";

// nav_links comes from the CMS (site_settings.header, see Phase 2.1) —
// fetched once in app/layout.tsx (a Server Component) and passed down,
// since this component itself needs "use client" for scroll/menu state.
export default function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  // Lazy initializer (not an effect) so the very first client render
  // already reflects real scroll position, not just a false default.
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 48,
  );

  // Transparent at the top of the page, gains a blurred background once
  // scrolled — same threshold as the reference pattern this was adapted
  // from (48px).
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 48);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-panel-border bg-background/90 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="MithunERP — home" className="group flex items-center">
          <Image
            src="/brand/me.svg"
            alt="MithunERP"
            width={44}
            height={44}
            priority
            className="h-11 w-11 transition-[filter] duration-300 group-hover:drop-shadow-[0_0_10px_var(--accent-glow)]"
          />
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
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded border border-panel-border"
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
    </header>
  );
}
