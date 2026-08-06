import type { ElementType, ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  as?: ElementType;
  className?: string;
}

// Vertical accent bar + italic serif label beside the title, rather than a
// small uppercase/wide-tracking label centered above it — that pattern is
// extremely common across agency/SaaS sites and was flagged as reading too
// close to a specific client site's design, so this is a deliberately
// different typographic treatment, not just a restyle. `as` defaults to h2
// for in-page section headers; pass as="h1" for a page's main heading.
export default function SectionHeading({
  label,
  title,
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-6 w-[3px] shrink-0 bg-accent" />
        <p className="font-display text-sm italic text-accent">{label}</p>
      </div>
      <Heading className="mt-3 font-display text-3xl text-foreground md:text-5xl">
        {title}
      </Heading>
    </div>
  );
}
