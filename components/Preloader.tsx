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

    function finish() {
      setPercent(100);
      setFading(true);
      setTimeout(() => setVisible(false), FADE_MS);
    }

    function tick(now: number) {
      const elapsed = now - start;
      setPercent(Math.min((elapsed / FILL_MS) * 100, 100));

      if (elapsed >= FILL_MS) {
        finish();
        return;
      }

      frame = requestAnimationFrame(tick);
    }

    let frame = requestAnimationFrame(tick);

    // Safety net: requestAnimationFrame can stall for a long time in a
    // backgrounded/throttled tab (e.g. the user switches away right after
    // refreshing) — browsers pause or heavily throttle rAF for hidden tabs,
    // which used to leave this loader visibly stuck on-screen until the tab
    // was refocused. A plain setTimeout isn't throttled the same way, so it
    // guarantees the loader unmounts within a bounded time regardless of
    // what the rAF loop is doing. Harmless if it fires after the rAF path
    // already finished — setting already-set state is a no-op.
    const safetyTimer = setTimeout(finish, FILL_MS + 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(safetyTimer);
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
