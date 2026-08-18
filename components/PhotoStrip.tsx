import Image from "next/image";
import { roomShots } from "@/lib/brand-data";

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
            Fifteen frames from the public archive — the cart, the queue, the pour, and the
            people who turned up for it. Swipe through.
          </p>
        </div>
      </div>

      <ul
        className="v5-strip__rail"
        tabIndex={0}
        role="group"
        aria-label="Photographs of 5AM Club Coffee — scroll sideways to see more"
      >
        {roomShots.map((shot, index) => (
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
        All photographs are from the public @5amclubcoffee archive and are shown here for a
        concept presentation. Media permissions to be confirmed before launch.
      </p>
    </section>
  );
}
