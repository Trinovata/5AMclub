import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { ClubGallery } from "@/components/ClubGallery";
import { MotionLayer } from "@/components/MotionLayer";
import { SiteHeader } from "@/components/SiteHeader";
import { instagramHydrationStyle, instagramUrl } from "@/lib/brand-data";

export const metadata: Metadata = {
  title: "The Club",
  description: "Music, games, pop-ups, and community from the 5AM Club Coffee archive.",
};

export default function ClubPage() {
  return (
    <main className="v5-site v5-inner-page v5-club-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer />
      <SiteHeader />
      <section className="v5-club-hero" id="main-content">
        <div className="v5-club-hero__film" data-v5-hero>
          <video controls muted playsInline preload="metadata" poster="/media/real/film-jazz-night.poster.jpg">
            <source src="/media/real/film-jazz-night.mp4" type="video/mp4" />
          </video>
          <span>Real 5AM archive · visual edit</span>
        </div>
        <div className="v5-club-hero__copy" data-v5-hero>
          <div className="v5-page-index v5-page-index--light"><span>03</span> The Club</div>
          <p className="v5-script">The coffee shop after coffee</p>
          <h1>Some nights, the room becomes the headline.</h1>
          <p>Live music, games, market pop-ups, staff, and regulars—the culture layer already exists. This gives it somewhere permanent to live.</p>
        </div>
        <Link className="v5-club-hero__side" href="/club/jazz" data-v5-hero aria-label="Open the jazz archive record">
          <Image src="/media/real/jazz-vocalists.jpg" alt="Vocalists performing at 5AM Club Coffee" fill priority sizes="(max-width: 760px) 50vw, 24vw" />
          <span className="v5-media-destination">Open record <ArrowUpRight aria-hidden="true" size={16} /></span>
        </Link>
      </section>
      <section className="v5-archive-section" aria-labelledby="archive-title">
        <div className="v5-archive-section__head" data-v5-reveal>
          <div>
            <p className="v5-script">From the supplied feed</p>
            <h2 id="archive-title">Proof that things happen here.</h2>
          </div>
          <p>These are archive posts, labeled by publish date. No future event has been invented for the prototype.</p>
        </div>
        <ClubGallery />
      </section>
      <section className="v5-club-follow" data-v5-reveal>
        <div><span>Next up?</span><h2>The official feed knows first.</h2></div>
        <a href={instagramUrl} target="_blank" rel="noreferrer" suppressHydrationWarning style={instagramHydrationStyle}>Follow @5amclubcoffee <ArrowUpRight aria-hidden="true" /></a>
      </section>
      <BrandFooter />
    </main>
  );
}
