import type { ElementType, ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  as?: ElementType;
  className?: string;
}

// The eyebrow-label + large-title pattern repeated (previously hand-copied)
// across about/page.tsx, services/page.tsx, and similar pages. `as`
// defaults to h2 for in-page section headers; pass as="h1" for a page's
// main heading (keep one h1 per page).
export default function SectionHeading({
  label,
  title,
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-[0.3em] text-accent">{label}</p>
      <Heading className="mt-4 font-display text-3xl text-foreground md:text-5xl">
        {title}
      </Heading>
    </div>
  );
}
