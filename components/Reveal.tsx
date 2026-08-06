"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: 1 | 2 | 3;
  className?: string;
}

// Fades + slides content in once it scrolls into view. Disconnects its
// observer after the first reveal — content stays visible on scroll-away,
// it doesn't re-hide and re-animate.
export default function Reveal({ children, delay, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <div ref={ref} className={`reveal ${visible ? "in" : ""} ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
