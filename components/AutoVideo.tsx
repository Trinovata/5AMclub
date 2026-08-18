"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Subscribe to the reduced-motion preference.
 *
 * useSyncExternalStore rather than useEffect + setState: the preference lives
 * outside React, and reading it in an effect means rendering once with the wrong
 * value and then setting state synchronously to correct it — which is a
 * cascading render, and which the lint rule correctly rejects.
 *
 * The server snapshot is `false`. It cannot be known during SSR, and assuming
 * "motion is fine" matches the majority case; the client corrects it on the
 * first commit, before any clip has had a chance to play.
 */
function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getMotionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getMotionServerSnapshot = () => false;

type AutoVideoProps = {
  src: string;
  poster: string;
  /** Describes the clip for people who cannot see it. Required, not optional. */
  label: string;
  caption?: string;
  className?: string;
  /** Fills its container instead of sitting in a 3:4 frame. */
  cover?: boolean;
  /**
   * Above-the-fold. Adds the `autoPlay` attribute and preloads the file rather
   * than only its metadata, so the clip is already running when the page paints
   * instead of waiting for the observer to fire and then for bytes to arrive.
   * Use it only for clips that are visible on load — on everything else it
   * would download video nobody has scrolled to.
   */
  eager?: boolean;
};

/**
 * A silent, looping clip that plays when it scrolls into view.
 *
 * THE CONSTRAINTS THIS IS BUILT AROUND
 * - Browsers only autoplay video that is muted AND carries `playsInline`.
 *   Without playsInline, iOS Safari takes the video fullscreen instead of
 *   playing it in place, which is the classic "it works on my Mac" failure.
 *   The files are also encoded with no audio track at all, so a muted attribute
 *   stripped by some proxy still cannot produce sound.
 * - Playing every clip on a page at once costs battery and bandwidth for clips
 *   nobody is looking at. An IntersectionObserver plays only what is on screen
 *   and pauses the rest.
 * - `preload="metadata"` fetches dimensions, not the whole file. With several
 *   clips on a page, `auto` would pull tens of megabytes on a phone before the
 *   visitor has scrolled anywhere.
 * - `prefers-reduced-motion` is respected properly: the clip never plays, and
 *   the poster frame is shown instead. Motion sensitivity is not a preference
 *   about niceties.
 *
 * play() returns a promise that rejects if the browser declines — a rejection
 * is caught and left alone, which leaves the poster visible rather than
 * throwing an unhandled rejection into the console.
 */
export function AutoVideo({ src, poster, label, caption, className, cover, eager }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  // subscribeMotion is defined at module scope, so its identity is already
  // stable across renders — wrapping it in useCallback would add a hook without
  // adding stability.
  const reduced = useSyncExternalStore(subscribeMotion, getMotionSnapshot, getMotionServerSnapshot);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.pause();
      return;
    }

    // An eager clip is on screen at load, so start it immediately rather than
    // waiting for the observer's first callback. Belt and braces alongside the
    // autoPlay attribute: autoPlay alone is ignored by some browsers after a
    // client-side navigation, where the element mounts already in view and no
    // fresh page load ever happens.
    if (eager) void node.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Rejected play() is normal (data saver, background tab, a browser
            // that wants a gesture). The poster stays up; nothing to report.
            void node.play().catch(() => {});
          } else if (!eager) {
            // An eager clip is never paused for being off screen. It sits in the
            // hero, where a visitor scrolling down and back up should find it
            // still running rather than frozen on a poster — and where the first
            // observer callback (which reports "not intersecting" for anything
            // even slightly below the fold) would otherwise immediately undo the
            // play() above. That race is why the band read as "loaded but
            // paused" on first build.
            node.pause();
          }
        }
      },
      // A little margin so the clip is already running by the time it is fully
      // on screen, and 25% visibility so a sliver in a scroll rail does not
      // start it.
      { rootMargin: "80px", threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, eager]);

  return (
    <figure className={`v5-autovideo${cover ? " v5-autovideo--cover" : ""}${className ? ` ${className}` : ""}`}>
      <video
        ref={ref}
        className="v5-autovideo__el"
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={eager && !reduced}
        preload={eager ? "auto" : "metadata"}
        // Not focusable and not a control surface: it is decorative motion, and
        // the caption below carries the meaning.
        tabIndex={-1}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      {caption ? (
        <figcaption>
          <span className="v5-autovideo__dot" aria-hidden="true" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
