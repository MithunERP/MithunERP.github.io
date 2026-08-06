"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = "a, button, [data-cursor-hover]";

// Custom cursor: a dot pinned to the pointer plus a ring that eases toward
// it. Only ever mounted on fine-pointer/hover-capable devices (checked via
// matchMedia) — touch devices get the normal cursor, no custom rendering at
// all. Hover detection is delegated to document-level mouseover/mouseout
// rather than the more common "query all links once on load" approach, so
// it still works for elements that render later (e.g. blog cards fetched
// client-side by PostsList).
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frame: number;

    function handleMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function animate() {
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      frame = requestAnimationFrame(animate);
    }

    function closestHoverTarget(node: EventTarget | null) {
      return node instanceof Element ? node.closest(HOVER_SELECTOR) : null;
    }

    function handleOver(e: MouseEvent) {
      if (closestHoverTarget(e.target)) setHovering(true);
    }

    function handleOut(e: MouseEvent) {
      const from = closestHoverTarget(e.target);
      const to = closestHoverTarget(e.relatedTarget);
      if (from && from !== to) setHovering(false);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    frame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "hovering" : ""}`} aria-hidden />
    </>
  );
}
