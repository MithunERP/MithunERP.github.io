import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

// Infinite horizontal scroll — renders its children twice (second copy
// hidden from assistive tech) and animates translateX(-50%), which lines
// up exactly on one copy's width for a seamless loop. Pauses entirely
// under prefers-reduced-motion (see .marquee-track in globals.css).
export default function Marquee({ children, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`.trim()}>
      <div className="marquee-track">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
