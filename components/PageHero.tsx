import Image from "next/image";
import { AutoVideo } from "@/components/AutoVideo";

type PageHeroProps = {
  /** Small all-caps line above the title. */
  eyebrow: string;
  /** Handwritten script line — the brand's own voice. */
  script?: string;
  title: string;
  lede?: string;
  /** Background still. Used as the poster when a clip is supplied. */
  image: string;
  imageAlt: string;
  /** Optional silent clip that plays immediately behind the type. */
  clip?: { src: string; poster: string; label: string };
  /** Darkening behind the text. Raise it when the media is bright or busy. */
  weight?: "light" | "heavy";
};

/**
 * The opening frame of a content page.
 *
 * Every page below the homepage used to start with a heading on cream — correct,
 * and completely forgettable. This gives each one a full-bleed image or a
 * playing clip with the title set over it, so the first thing on screen is the
 * room rather than a label for the room.
 *
 * CONTRAST OVER PHOTOGRAPHY
 * Text on an image cannot rely on the image. A fixed scrim sits between the
 * media and the type — a gradient, heavier at the bottom where the words are —
 * so the contrast ratio is a property of the scrim, not of whatever the
 * photograph happens to be showing. `heavy` exists for bright frames.
 *
 * The clip, when present, is `eager`: it plays on load rather than waiting for
 * an observer, because it is by definition above the fold.
 */
export function PageHero({
  eyebrow,
  script,
  title,
  lede,
  image,
  imageAlt,
  clip,
  weight = "light",
}: PageHeroProps) {
  return (
    <header className={`v5-pagehero v5-pagehero--${weight}`} id="main-content">
      <div className="v5-pagehero__media" aria-hidden={clip ? undefined : true}>
        {clip ? (
          <AutoVideo src={clip.src} poster={clip.poster} label={clip.label} eager cover />
        ) : (
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
        )}
      </div>

      <div className="v5-pagehero__scrim" aria-hidden="true" />

      <div className="v5-pagehero__copy">
        <p className="v5-pagehero__eyebrow">
          {eyebrow}
        </p>
        {script ? (
          <p className="v5-script v5-pagehero__script">
            {script}
          </p>
        ) : null}
        <h1>{title}</h1>
        {lede ? (
          <p className="v5-pagehero__lede">
            {lede}
          </p>
        ) : null}
      </div>

      <span className="v5-pagehero__cue" aria-hidden="true">
        <span />
      </span>
    </header>
  );
}
