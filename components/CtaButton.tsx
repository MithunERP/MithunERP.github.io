import Link from "next/link";
import type { ReactNode } from "react";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const BASE =
  "inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-200";

const VARIANTS = {
  primary:
    "bg-accent text-white hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_12px_30px_-12px_var(--accent-glow)]",
  secondary:
    "border border-panel-border text-foreground hover:-translate-y-0.5 hover:border-accent hover:text-accent",
};

// Every internal nav CTA on the site routes through this — a hover lift +
// accent glow instead of just a flat color swap, so the primary calls to
// action actually register with the eye instead of blending into the page.
export default function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  return (
    <Link href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`.trim()}>
      {children}
    </Link>
  );
}
