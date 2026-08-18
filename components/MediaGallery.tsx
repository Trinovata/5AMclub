import Image from "next/image";
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
 * The archive is overwhelmingly 3:4 portrait, so a naive equal-height grid either
 * crops everything to squares (throwing away the top and bottom of every frame)
 * or leaves ragged gaps. The mosaic instead lets a few frames span two columns
 * and two rows, which gives the eye somewhere to land and makes a page of
 * fifteen portraits read as composition instead of a contact sheet.
 *
 * On a phone it collapses to two columns; the spans still apply, so the rhythm
 * survives rather than flattening into a single file of identical tiles.
 *
 * PERFORMANCE
 * Only the first few images load eagerly. Everything else is lazy, and `sizes`
 * is declared per breakpoint so a phone is never sent a desktop-width file —
 * with 30+ images on a page that is the difference between a fast gallery and
 * an unusable one.
 */
export function MediaGallery({ shots, layout = "mosaic", eagerCount = 4 }: MediaGalleryProps) {
  return (
    <ul className={`v5-gallery v5-gallery--${layout}`}>
      {shots.map((shot, index) => (
        <li
          key={shot.image}
          className={`v5-gallery__cell${shot.span ? ` v5-gallery__cell--${shot.span}` : ""}`}
        >
          <figure>
            <span className="v5-gallery__frame">
              <Image
                src={shot.image}
                alt={shot.imageAlt}
                fill
                sizes={
                  shot.span === "wide" || shot.span === "feature"
                    ? "(max-width: 700px) 96vw, (max-width: 1100px) 60vw, 48vw"
                    : "(max-width: 700px) 48vw, (max-width: 1100px) 32vw, 24vw"
                }
                loading={index < eagerCount ? "eager" : "lazy"}
              />
            </span>
            {shot.caption ? <figcaption>{shot.caption}</figcaption> : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
