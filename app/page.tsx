import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, MoveRight } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { BrandSystemMap } from "@/components/BrandSystemMap";
import { HeroStage } from "@/components/HeroStage";
import { MotionLayer } from "@/components/MotionLayer";
import { PhotoStrip } from "@/components/PhotoStrip";
import { SiteHeader } from "@/components/SiteHeader";
import { guardianUrl, locations, menuItems } from "@/lib/brand-data";

export default function Home() {
  const featuredMenu = [menuItems[3], menuItems[1], menuItems[5], menuItems[0]];

  return (
    <main className="v5-site" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer />
      <SiteHeader />

      <section className="v5-home-hero" id="main-content" aria-label="5AM Club Coffee introduction">
        <HeroStage />

        <Link className="v5-hero-breakfast" href="/menu" data-v5-hero>
          <span className="v5-hero-breakfast__image">
            <Image
              src="/media/real/breakfast-launch.jpg"
              alt="5AM Club Coffee daily breakfast launch artwork"
              fill
              priority
              sizes="(max-width: 780px) 56vw, 28vw"
            />
          </span>
          <span className="v5-hero-breakfast__copy">
            <small>Just launched</small>
            <strong>Daily breakfast</strong>
            <span>Fri–Tue · 7–11 · Carlos St.</span>
            <ArrowUpRight aria-hidden="true" size={20} />
          </span>
        </Link>

        <Link className="v5-hero-brand" href="/story" data-v5-hero aria-label="Read the 5AM story">
          <Image
            src="/brand/5am-logo-white-on-black.png"
            alt="5AM Club Coffee"
            width={138}
            height={138}
            priority
          />
          <div>
            <span>Two shops</span>
            <span>One club</span>
          </div>
          <p className="v5-script">Come for coffee. Stay for something else.</p>
        </Link>
      </section>

      <div className="v5-newsrail" aria-label="Latest 5AM updates">
        <span>Now at 5AM</span>
        <div>
          <p>Daily breakfast at Carlos Street <i>✦</i></p>
          <p>Two locations across Trinidad <i>✦</i></p>
          <p>Summer drinks in the archive <i>✦</i></p>
          <p>Music, games, pop-ups, people <i>✦</i></p>
        </div>
        <Link href="/menu">See what’s new <ArrowRight aria-hidden="true" size={17} /></Link>
      </div>

      <section className="v5-proof v5-section" aria-labelledby="proof-title">
        <div className="v5-section-label" data-v5-reveal><span>01</span> The actual energy</div>
        <div className="v5-proof__heading" data-v5-reveal>
          <p className="v5-script">Not just a coffee shop</p>
          <h2 id="proof-title">The archive is full of people, not product shots.</h2>
          <p>
            Staff, regulars, musicians, games, pop-ups, food, and a founder who built an audience
            before he built the room. That is the brand—not a lonely cup against a beige wall.
          </p>
        </div>
        <div className="v5-proof-grid">
          <figure className="v5-proof-card v5-proof-card--community" data-v5-reveal>
            <div><Image src="/media/real/kyle-community.jpg" alt="Kyle Mark surrounded by the 5AM community" fill sizes="(max-width: 760px) 100vw, 52vw" /></div>
            <figcaption><span>Community</span><strong>The room is the product.</strong></figcaption>
            <Link className="v5-media-hit" href="/story#community" aria-label="Read the community chapter"><span>Open story <ArrowUpRight aria-hidden="true" size={16} /></span></Link>
          </figure>
          <figure className="v5-proof-card v5-proof-card--team" data-v5-reveal>
            <div><Image src="/media/real/barista-team.jpg" alt="Four members of the 5AM team" fill sizes="(max-width: 760px) 48vw, 24vw" /></div>
            <figcaption><span>Team</span><strong>Faces behind the counter.</strong></figcaption>
            <Link className="v5-media-hit" href="/story#team" aria-label="Meet the 5AM team"><span>Meet the team <ArrowUpRight aria-hidden="true" size={16} /></span></Link>
          </figure>
          <figure className="v5-proof-card v5-proof-card--room" data-v5-reveal>
            <div><Image src="/media/real/carlos-packed-room.jpg" alt="A packed evening inside 5AM Club Coffee on Carlos Street" fill sizes="(max-width: 760px) 48vw, 24vw" /></div>
            <figcaption><span>After hours</span><strong>Sometimes the room changes key.</strong></figcaption>
            <Link className="v5-media-hit" href="/club" aria-label="Open the Club archive"><span>Enter the Club <ArrowUpRight aria-hidden="true" size={16} /></span></Link>
          </figure>
          <blockquote className="v5-founder-quote" data-v5-reveal>
            <p>“Something about a coffee shop, the atmosphere, the ambience, and so many things can happen at a coffee shop.”</p>
            <footer>
              <span>Kyle “Kyleboss” Mark</span>
              <a href={guardianUrl} target="_blank" rel="noreferrer" suppressHydrationWarning>Trinidad Guardian <ArrowUpRight aria-hidden="true" size={15} /></a>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="v5-home-menu v5-section" aria-labelledby="home-menu-title">
        <div className="v5-home-menu__head">
          <div className="v5-section-label v5-section-label--dark" data-v5-reveal><span>02</span> On the table</div>
          <div data-v5-reveal>
            <p className="v5-script">New for breakfast</p>
            <h2 id="home-menu-title">A menu with receipts.</h2>
          </div>
          <div data-v5-reveal>
            <p>Every item here comes from supplied official media. No fake prices. No invented signature drink.</p>
            <Link className="v5-text-link" href="/menu">Explore the verified menu <MoveRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="v5-home-menu__grid">
          {featuredMenu.map((item, index) => (
            <Link href={`/menu/${item.id}`} className={`v5-food-card v5-accent--${item.accent}`} key={item.id} data-v5-reveal>
              <span className="v5-food-card__image"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 72vw, 25vw" /></span>
              <span className="v5-food-card__meta"><small>0{index + 1} · {item.category}</small><strong>{item.name}</strong><ArrowUpRight aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <PhotoStrip />

      <section className="v5-home-locations v5-section" aria-labelledby="home-locations-title">
        <div className="v5-section-label" data-v5-reveal><span>04</span> Pick your chapter</div>
        <div className="v5-home-locations__title" data-v5-reveal>
          <p className="v5-script">Cunupia to Carlos Street</p>
          <h2 id="home-locations-title">Same name. Different rhythm.</h2>
          <Link className="v5-button v5-button--ink" href="/locations">Hours & directions <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
        <div className="v5-location-duo">
          {locations.map((location, index) => (
            <Link href={`/locations/${location.id}`} key={location.id} data-v5-reveal>
              <span className="v5-location-duo__image"><Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" data-v5-parallax /></span>
              <span className="v5-location-duo__shade" />
              <span className="v5-location-duo__copy"><small>0{index + 1} · {location.shortName}</small><strong>{location.name}</strong><span>{location.address}</span></span>
              <span className="v5-location-duo__icon"><MapPin aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="v5-club-tease v5-section" aria-labelledby="club-tease-title">
        <div className="v5-club-tease__copy" data-v5-reveal>
          <div className="v5-section-label v5-section-label--light"><span>05</span> The Club</div>
          <p className="v5-script">Coffee is only the opening act</p>
          <h2 id="club-tease-title">This place sounds different after five.</h2>
          <p>Live music. Game nights. Pop-ups. A record of what happened, and a reason to catch what happens next.</p>
          <Link className="v5-button v5-button--cream" href="/club">Open the archive <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
        <div className="v5-club-tease__film" data-v5-reveal>
          <video controls muted playsInline preload="metadata" poster="/media/real/film-jazz-night.poster.jpg">
            <source src="/media/real/film-jazz-night.mp4" type="video/mp4" />
          </video>
          <span>Real 5AM archive · visual edit</span>
        </div>
        <Link className="v5-club-tease__poster" href="/club/get-down" data-v5-reveal aria-label="Open the Get Down archive record">
          <Image src="/media/real/get-down-poster.jpg" alt="Get Down music series poster" fill sizes="(max-width: 760px) 48vw, 24vw" />
          <span className="v5-media-destination">Open record <ArrowUpRight aria-hidden="true" size={16} /></span>
        </Link>
      </section>

      <section className="v5-story-tease v5-section" aria-labelledby="story-tease-title">
        <Link className="v5-story-tease__image" href="/story" data-v5-reveal aria-label="Read Kyle's story">
          <Image src="/media/real/kyle-founder.jpg" alt="Kyle Mark inside 5AM Club Coffee" fill sizes="(max-width: 760px) 100vw, 42vw" />
          <span className="v5-story-tease__caption">Founder · creator · builder</span>
          <span className="v5-media-destination">Read the story <ArrowUpRight aria-hidden="true" size={16} /></span>
        </Link>
        <div className="v5-story-tease__copy" data-v5-reveal>
          <div className="v5-section-label"><span>06</span> Kyle’s story</div>
          <p className="v5-script">An audience became a place</p>
          <h2 id="story-tease-title">The café was never the first chapter.</h2>
          <p>
            Kyle “Kyleboss” Mark built a creator audience, then turned that momentum into a physical
            brand inspired by the coffee-house culture he experienced in Europe—Italy in particular.
          </p>
          <Link className="v5-text-link" href="/story">Read the sourced story <MoveRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="v5-system-section v5-section" aria-labelledby="system-map-title">
        <div className="v5-system-section__head" data-v5-reveal>
          <div className="v5-section-label"><span>07</span> The whole system</div>
          <div><p className="v5-script">From attention to return visit</p><h2 id="system-map-title">Every chapter should lead somewhere.</h2></div>
          <p>Hover, focus, or tap a node to see how the public brand and the operating layer connect. Every node is also a real route.</p>
        </div>
        <BrandSystemMap />
      </section>

      <BrandFooter />
    </main>
  );
}
