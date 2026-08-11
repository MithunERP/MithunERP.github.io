import type { ElementType, ReactNode } from "react";
import type { EyebrowStyle, EyebrowWeight, HeadingDecoration } from "@/lib/settings";
import { eyebrowClassName, headingDecorationClassName } from "@/lib/decorations";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  as?: ElementType;
  className?: string;
  eyebrowStyle?: EyebrowStyle;
  eyebrowWeight?: EyebrowWeight;
  headingDecoration?: HeadingDecoration;
}

// Bold, wide-letter-spaced uppercase eyebrow — same treatment already used
// on /blog, /portfolio, /gallery, unified here (2026-08-09) so every page
// matches instead of this component using its own vertical-accent-bar
// variant. Note for future reference: the vertical-bar version this
// replaces was itself a deliberate departure from an uppercase/tracking-
// widest label specifically because that pattern was flagged as reading too
// close to a specific client's site (copyright concern, see project docs).
// This is the same *style* of label as that concern, reintroduced on the
// user's own explicit instruction once it was already live on three pages
// without objection — not a silent reversal of that earlier decision.
// `as` defaults to h2 for in-page section headers; pass as="h1" for a
// page's main heading. `eyebrowStyle`/`eyebrowWeight`/`headingDecoration`
// default to today's exact look (plain/bold/plain) — callers pass an
// explicit value when they've resolved a CMS override (see
// BlockRenderer.tsx), everyone else gets the site default implicitly since
// "plain"/"bold" IS the seeded site default (see docs/adr's decoration ADR).
export default function SectionHeading({
  label,
  title,
  as: Heading = "h2",
  className = "",
  eyebrowStyle = "plain",
  eyebrowWeight = "bold",
  headingDecoration = "plain",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className={`text-xs uppercase tracking-[0.3em] text-accent ${eyebrowClassName(eyebrowStyle, eyebrowWeight)}`}>
        {label}
      </p>
      <Heading
        className={`mt-4 font-display text-3xl text-foreground md:text-5xl ${headingDecorationClassName(headingDecoration)}`}
      >
        {title}
      </Heading>
    </div>
  );
}
