"use client";

import { useEffect, useState } from "react";

const FILL_MS = 550;
const FADE_MS = 350;

// Fake percentage-counter preloader, shown once on the real initial page
// load (mounted in the root layout, which Next.js doesn't remount on
// client-side navigation, so it never reappears on route changes).
//
// Deliberately NOT tied to the real `window.load` event: that event only
// fires once every resource (fonts, images) has finished, which on GitHub
// Pages' shared CDN can vary and stretch out — a purely decorative
// progress bar has no business blocking on real, unpredictable network
// timing. Instead it runs a short fixed-duration animation and then
// unmounts, so the wait is always the same and always brief.
export default function Preloader() {
  const [percent, setPercent] = useState(0);
  // Lazy initializer (not an effect) — if this mounts well after paint
  // (readyState already "complete", common once hydrated), skip the show
  // entirely rather than animating a loader after the page is long visible.
  const [visible, setVisible] = useState(
    () => !(typeof document !== "undefined" && document.readyState === "complete"),
  );
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      setPercent(Math.min((elapsed / FILL_MS) * 100, 100));

      if (elapsed >= FILL_MS) {
        setFading(true);
        setTimeout(() => setVisible(false), FADE_MS);
        return;
      }

      frame = requestAnimationFrame(tick);
    }

    let frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
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
