"use client";

import { useEffect, useState } from "react";

// Fake percentage-counter preloader, shown once on the real initial page
// load (mounted in the root layout, which Next.js doesn't remount on
// client-side navigation, so it never reappears on route changes).
// Two safeguards beyond the reference pattern this was adapted from: if
// `load` already fired before this mounted (readyState is already
// "complete" — common once hydrated), skip showing it at all rather than
// waiting on an event that already happened; and a hard timeout forces it
// away regardless, so a full-screen overlay can never get stuck.
export default function Preloader() {
  const [percent, setPercent] = useState(0);
  // Lazy initializer (not an effect) — if `load` already fired before this
  // mounted (readyState already "complete", common once hydrated), start
  // already-hidden instead of waiting on an event that already happened.
  const [visible, setVisible] = useState(
    () => !(typeof document !== "undefined" && document.readyState === "complete"),
  );
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(tickTimer);
      setPercent(100);
      setTimeout(() => {
        setFading(true);
        setTimeout(() => setVisible(false), 600);
      }, 250);
    }

    const tickTimer = setInterval(() => {
      setPercent((p) => Math.min(p + Math.random() * 12, 99));
    }, 80);
    const maxWaitTimer = setTimeout(finish, 4000);

    window.addEventListener("load", finish);
    return () => {
      clearInterval(tickTimer);
      clearTimeout(maxWaitTimer);
      window.removeEventListener("load", finish);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div id="preloader" style={{ opacity: fading ? 0 : 1 }} aria-hidden>
      <div className="preloader-bar">
        <div className="preloader-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="preloader-count">{Math.round(percent)}%</div>
    </div>
  );
}
