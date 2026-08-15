"use client";

import { useEffect, useRef } from "react";

// A working scroll-position indicator, not a static decoration — the dot's
// offset in the track always matches window.scrollY / scrollable height.
// Desktop only (see globals.css's md:flex) and reads scroll position
// directly via rAF-throttled updates, same pattern as Cursor.tsx, rather
// than a React state update per scroll event.
export default function ScrollRail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number | null = null;

    function update() {
      frame = null;
      const dot = dotRef.current;
      const track = trackRef.current;
      if (!dot || !track) return;
      const trackHeight = track.clientHeight - dot.clientHeight;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
      dot.style.top = `${Math.max(0, Math.min(1, pct)) * trackHeight}px`;
    }

    function onScroll() {
      if (frame === null) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-7 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
    >
      <span className="text-[0.62rem] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl]">
        Scroll
      </span>
      <div ref={trackRef} className="relative h-28 w-px bg-panel-border">
        <div
          ref={dotRef}
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-glow shadow-[0_0_10px_var(--accent-glow)]"
        />
      </div>
    </div>
  );
}
