import Image from "next/image";
import { team } from "@/lib/team-data";

/**
 * Meet the team — built from the shop's own staff awards.
 *
 * The card leads with the face and the award, and the name sits under it. That
 * order is deliberate: "Most Calm Under Pressure" tells you more about working
 * here than a job title would, and it is the part that is actually sourced.
 *
 * No hover-to-reveal. Everything a card has to say is visible at rest, because
 * on a phone there is no hover and a card whose content only appears on a
 * pointer is a card that is empty for half the audience.
 */
export function TeamSection() {
  return (
    <section className="v5-team v5-section" aria-labelledby="team-title">
      <div className="v5-team__head">
        <div className="v5-section-label" data-v5-reveal>
          <span>&#9679;</span> The people
        </div>
        <p className="v5-script" data-v5-reveal>
          Awarded by their own shop
        </p>
        <h2 id="team-title" data-v5-reveal>
          Meet the team.
        </h2>
        <p className="v5-team__lede" data-v5-reveal>
          5AM runs its own staff awards. Every name and title here is read off a
          certificate the shop printed and posted — including one for being the calmest
          person in the room when it gets busy.
        </p>
      </div>

      <ul className="v5-team__grid">
        {team.map((member, index) => (
          <li className="v5-team__card" key={member.name}>
            <figure>
              <span className="v5-team__frame">
                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  fill
                  sizes="(max-width: 700px) 46vw, (max-width: 1100px) 30vw, 22vw"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </span>
              <figcaption>
                <span className="v5-team__award">{member.award}</span>
                <strong className="v5-team__name">{member.name}</strong>
                {member.note ? <span className="v5-team__note">{member.note}</span> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p className="v5-team__foot">
        Names and awards are read from certificates in 5AM&rsquo;s own public posts &mdash;
        nothing here is invented. Worth a word with each person before this goes live.
      </p>
    </section>
  );
}
