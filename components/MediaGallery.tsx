"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import type { GalleryShot } from "@/lib/media-data";

type MediaGalleryProps = {
  shots: GalleryShot[];
  /**
   * mosaic — varied tile sizes, for a page that should feel like a magazine
   * grid   — even columns, for a dense archive view
   */
  layout?: "mosaic" | "grid";
  eagerCount?: number;
};

/**
 * A gallery that shows rather than tells.
 *
 * LAYOUT
 * The archive is overwhelmingly 3:4 portrait, so an equal-height grid either
 * crops everything square (throwing away the top and bottom of every frame) or
 * leaves ragged gaps. The mosaic lets a few frames span two columns, which gives
 * the eye somewhere to land and makes a page of portraits read as composition
 * rather than a contact sheet.
 *
 * On a phone the tiles are deliberately SMALL — three across — so a scroll shows
 * many photographs instead of two. Small tiles are for browsing; the expand
 * button is for looking. That split is the whole design: dense to scan, full
 * screen to see.
 *
 * THE VIEWER
 * A native <dialog> rather than a hand-rolled overlay. It gets focus trapping,
 * Escape-to-close, inert background content and the top layer from the browser
 * — all things a div would have to reimplement, usually incompletely.
 */
export function MediaGallery({ shots, layout = "mosaic", eagerCount = 4 }: MediaGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const show = useCallback((index: number) => {
    setOpen(index);
    dialogRef.current?.showModal();
  }, []);

  const hide = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Arrow keys move between photographs while the viewer is open — the
  // expectation anyone brings from every other gallery they have used.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKey = (event: KeyboardEvent) => {
      if (open === null) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setOpen((i) => (i === null ? null : (i + 1) % shots.length));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setOpen((i) => (i === null ? null : (i - 1 + shots.length) % shots.length));
      }
    };

    const onClose = () => setOpen(null);

    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [open, shots.length]);

  const current = open === null ? null : shots[open];

  return (
    <>
      <ul className={`v5-gallery v5-gallery--${layout}`}>
        {shots.map((shot, index) => (
          <li
            key={shot.image}
            className={`v5-gallery__cell${shot.span ? ` v5-gallery__cell--${shot.span}` : ""}`}
          >
            <figure>
              <button
                type="button"
                className="v5-gallery__frame"
                onClick={() => show(index)}
                aria-label={`Open photograph: ${shot.caption ?? shot.imageAlt}`}
              >
                <Image
                  src={shot.image}
                  alt={shot.imageAlt}
                  fill
                  // Tiles are a third of a phone screen, so asking for 100vw
                  // would ship a file nine times larger than the pixels used.
                  sizes={
                    shot.span === "wide" || shot.span === "feature"
                      ? "(max-width: 700px) 64vw, (max-width: 1100px) 60vw, 48vw"
                      : "(max-width: 700px) 32vw, (max-width: 1100px) 32vw, 24vw"
                  }
                  loading={index < eagerCount ? "eager" : "lazy"}
                />
                <span className="v5-gallery__expand" aria-hidden="true">
                  <Expand size={14} />
                </span>
              </button>
              {shot.caption ? <figcaption>{shot.caption}</figcaption> : null}
            </figure>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} className="v5-viewer" aria-label="Photograph viewer">
        {current ? (
          <div className="v5-viewer__inner">
            <button type="button" className="v5-viewer__close" onClick={hide} aria-label="Close">
              <X size={20} />
            </button>

            <div className="v5-viewer__frame">
              {/* Unoptimised sizing is deliberate here: the viewer wants the
                  largest rendition, and `sizes="100vw"` on a portrait image in a
                  contain-fit box is the honest description of that. */}
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="100vw"
                priority
              />
            </div>

            <p className="v5-viewer__caption">
              <span>{current.caption ?? current.imageAlt}</span>
              <small>
                {(open ?? 0) + 1} / {shots.length}
              </small>
            </p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
