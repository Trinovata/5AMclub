"use client";

import { useEffect, useState } from "react";

/**
 * The pour.
 *
 * A black field with the wordmark knocked OUT of it — inverted alpha — and
 * coffee rising inside the letterforms until they are full. Then the whole
 * field lifts.
 *
 * WHY AN SVG MASK RATHER THAN TEXT WITH A GRADIENT
 * The knockout has to be a real hole: the liquid is a separate shape animating
 * behind the mask, and a gradient clipped to text cannot rise independently of
 * the text it fills. `mask` gives a genuine cut-out, so the coffee is a moving
 * object seen through the letters rather than a fill pretending to move.
 *
 * WHY IT ONLY RUNS ONCE
 * A loading screen on every navigation is an obstacle, not a brand moment. It
 * plays on the first visit of a session and is skipped thereafter, tracked in
 * sessionStorage so a new session gets it again.
 *
 * It also never blocks: the page underneath is fully rendered and interactive:
 * this sits on top for a fixed beat and leaves, rather than gating content on a
 * timer. If JavaScript never runs, it never renders at all and nothing is lost.
 */
const SESSION_KEY = "5am-pour-seen";

export function LoadingScreen() {
  const [state, setState] = useState<"hidden" | "playing" | "leaving">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    // Someone who asked for less motion gets no pour at all — the animation is
    // the entire point of this component, so there is nothing to degrade to.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.style.overflow = "hidden";

    // Deferred to the next frame rather than set synchronously here. Setting
    // state inside an effect body forces a second render pass before the
    // browser paints — the cascading render the lint rule exists to catch — and
    // the first paint is exactly when this should appear anyway.
    const start = requestAnimationFrame(() => setState("playing"));
    const leave = setTimeout(() => setState("leaving"), 1900);
    const done = setTimeout(() => {
      setState("hidden");
      document.documentElement.style.overflow = "";
    }, 2650);

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
      <svg className="v5-pour__art" viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet">
        <defs>
          <mask id="v5-pour-mask">
            {/* White shows the field, black punches the hole. */}
            <rect width="360" height="220" fill="#fff" />
            <text
              x="180"
              y="132"
              textAnchor="middle"
              fontFamily="Bodoni Moda Variable, Didot, Times New Roman, serif"
              fontSize="96"
              fontWeight="700"
              letterSpacing="2"
              fill="#000"
            >
              5AM
            </text>
            <text
              x="180"
              y="168"
              textAnchor="middle"
              fontFamily="Archivo Variable, Helvetica Neue, Arial, sans-serif"
              fontSize="19"
              letterSpacing="13"
              fill="#000"
            >
              CLUB
            </text>
          </mask>
        </defs>

        {/* The coffee, rising. Sits behind the masked field so it is only ever
            visible through the letterforms. */}
        <g className="v5-pour__liquid">
          <rect x="0" y="0" width="360" height="220" fill="#8a4a22" />
          <path
            className="v5-pour__crema"
            d="M0 0 Q 45 10 90 0 T 180 0 T 270 0 T 360 0 L 360 -18 L 0 -18 Z"
            fill="#c98f5e"
          />
        </g>

        {/* The field itself, with the wordmark cut out of it. */}
        <rect width="360" height="220" fill="#0b0705" mask="url(#v5-pour-mask)" />
      </svg>

      <span className="v5-pour__stream" />
    </div>
  );
}
