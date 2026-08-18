"use client";

import { useEffect, useState } from "react";

/**
 * The pour.
 *
 * A black field with the 5AM wordmark on it, and coffee rising INSIDE the
 * letterforms until they are full. Then the field dissolves.
 *
 * HOW THE FILL WORKS
 * The letters are real text with a gradient background clipped to the glyphs
 * (`background-clip: text`). The gradient is taller than the text and its
 * position animates upward, so the coffee line rises through the letterforms.
 *
 * This replaced an SVG-mask version that leaked twice. The mask approach needs
 * a moving shape behind a static cut-out, and the mask region kept resolving
 * against the *moving* element's bounding box rather than the artwork — so the
 * liquid painted outside the letters as a bar above and a slab below. Two fixes
 * (`maskUnits="userSpaceOnUse"`, explicit fills on `<use>`) both failed to hold
 * it. background-clip has no such coupling: the fill IS the text, only the
 * gradient's offset animates, and there is nothing that can escape.
 *
 * WHEN IT RUNS
 * On a full page load — an arrival, a refresh, a link from outside. NOT on
 * internal navigation, because this layout does not remount when the router
 * moves between pages; those get the curtain instead. That distinction is what
 * makes it a brand moment rather than an obstacle: you meet it when you arrive,
 * never between two clicks.
 *
 * It never blocks. The page underneath is fully rendered and interactive; this
 * sits on top for a fixed beat and leaves. If JavaScript never runs it never
 * renders at all, and nothing is lost.
 */
export function LoadingScreen() {
  const [state, setState] = useState<"hidden" | "playing" | "leaving">("hidden");

  useEffect(() => {
    // Someone who asked for less motion gets no pour at all — the animation is
    // the entire point of this component, so there is nothing to degrade to.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.style.overflow = "hidden";

    // Deferred to the next frame rather than set synchronously here. Setting
    // state inside an effect body forces a second render pass before the
    // browser paints — the cascading render the lint rule exists to catch — and
    // the first paint is exactly when this should appear anyway.
    const start = requestAnimationFrame(() => setState("playing"));
    // 2.4s of pour, then a ~1s dissolve. Long enough to read as deliberate,
    // short enough that a returning visitor is not waiting on it.
    const leave = setTimeout(() => setState("leaving"), 2400);
    // Must outlast the dissolve, or the element is removed mid-fade and the
    // screen vanishes in one frame — the jarring version of the same animation.
    const done = setTimeout(() => {
      setState("hidden");
      document.documentElement.style.overflow = "";
    }, 3550);

    return () => {
      cancelAnimationFrame(start);
      clearTimeout(leave);
      clearTimeout(done);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      className={`v5-pour${state === "leaving" ? " v5-pour--leaving" : ""}`}
      // Decorative and transient: a screen reader should announce the page, not
      // an animation that is already leaving.
      aria-hidden="true"
    >
      <div className="v5-pour__mark">
        <span className="v5-pour__word">5AM</span>
        <span className="v5-pour__sub">CLUB</span>
      </div>
      <span className="v5-pour__stream" />
    </div>
  );
}
