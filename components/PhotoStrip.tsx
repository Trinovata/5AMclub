import Image from "next/image";
import Link from "next/link";
import { roomShots } from "@/lib/brand-data";
import { stripShots } from "@/lib/media-data";

/**
 * The hand-verified frames lead, then the curated archive continues the rail.
 * Order matters: the opening three are the ones checked frame by frame, so the
 * first thing a thumb sees is the strongest material rather than whatever the
 * category interleave happened to put first.
 */
const shots: { image: string; imageAlt: string; caption?: string; feature: boolean }[] = [
  // The hand-checked set carries an explicit `feature` flag; the generated set
  // carries a mosaic `span`. Both mean "give this one more room", so they are
  // flattened to one shape here rather than leaking two vocabularies into JSX.
  ...roomShots.map((s) => ({
    image: s.image,
    imageAlt: s.imageAlt,
    caption: s.caption,
    feature: Boolean(s.feature),
  })),
  ...stripShots.map((s) => ({
    image: s.image,
    imageAlt: s.imageAlt,
    caption: s.caption,
    feature: s.span === "feature",
  })),
];

/**
 * "In the room" — a swipeable photo strip.
 *
 * WHY A STRIP AND NOT A GRID
 * Every frame in the archive is 3:4 portrait. A stacked grid of portraits on a
 * 390px phone costs roughly 500px of scroll PER photo — fifteen of them would
 * add seven thousand pixels to a homepage that is already long. A horizontal
 * scroll-snap rail shows the same fifteen photos in one screen-height, and swipe
 * is the gesture a phone user already has in hand.
 *
 * It degrades honestly: with no JavaScript at all it is still a scrollable list
 * of images, because the behaviour is CSS scroll-snap rather than a carousel
 * library. Nothing here needs to hydrate, so it stays a server component.
 *
 * Accessibility: the rail is a labelled group and keyboard-scrollable via
 * tabindex, so it is reachable without a pointer. Captions are real text under
 * each frame rather than overlaid, which keeps contrast independent of the
 * photograph behind them.
 */
export function PhotoStrip() {
  return (
    <section className="v5-strip v5-section" aria-labelledby="strip-title">
      <div className="v5-strip__head">
        <div className="v5-section-label" data-v5-reveal>
          <span>03</span> In the room
        </div>
        <div className="v5-strip__heading" data-v5-reveal>
          <p className="v5-script">Photographs, not renders</p>
          <h2 id="strip-title">The room, mid&#8209;service.</h2>
          <p className="v5-strip__lede">
            {shots.length} frames from the public archive — the cart, the queue, the pour, and
            the people who turned up for it. Swipe through, or{" "}
            <Link className="v5-text-link" href="/gallery">
              open the full archive
            </Link>
            .
          </p>
        </div>
      </div>

      <ul
        className="v5-strip__rail"
        tabIndex={0}
        role="group"
        aria-label="Photographs of 5AM Club Coffee — scroll sideways to see more"
      >
        {shots.map((shot, index) => (
          <li
            key={shot.image}
            className={`v5-strip__item${shot.feature ? " v5-strip__item--feature" : ""}`}
          >
            <figure>
              <span className="v5-strip__frame">
                <Image
                  src={shot.image}
                  alt={shot.imageAlt}
                  fill
                  // The rail shows ~1.2 cards on a phone and ~4 on a desktop, so
                  // asking for 100vw on mobile would ship a needlessly large file.
                  sizes="(max-width: 700px) 78vw, (max-width: 1100px) 40vw, 26vw"
                  // The first two are above the fold on a phone; the rest wait.
                  loading={index < 2 ? "eager" : "lazy"}
                  priority={index === 0}
                />
              </span>
              <figcaption>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {shot.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p className="v5-strip__foot">
        Every photograph on this site is 5AM&rsquo;s own, from the public @5amclubcoffee
        archive &mdash; 262 of them, plus 26 short clips. Nothing is stock.
      </p>
    </section>
  );
}
