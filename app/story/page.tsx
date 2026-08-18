import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { MediaGallery } from "@/components/MediaGallery";
import { ImageZoom } from "@/components/ImageZoom";
import { MotionLayer } from "@/components/MotionLayer";
import { SiteHeader } from "@/components/SiteHeader";
import { galleries } from "@/lib/media-data";
import { guardianUrl, instagramHydrationStyle, instagramUrl } from "@/lib/brand-data";

export const metadata: Metadata = {
  title: "Story",
  description: "The sourced story of Kyle Mark and 5AM Club Coffee.",
};

export default function StoryPage() {
  return (
    <main className="v5-site v5-inner-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer />
      <SiteHeader />
      <section className="v5-story-hero" id="main-content">
        <div className="v5-story-hero__copy" data-v5-hero>
          <div className="v5-page-index"><span>04</span> The story</div>
          <p className="v5-script">Built in public</p>
          <h1>An audience became a coffee shop. Then the coffee shop became a club.</h1>
          <p>
            Public reporting identifies Kyle “Kyleboss” Mark as the creator behind the original Cunupia café and frames 5AM as an extension of a brand he had already built online.
          </p>
          <a href={guardianUrl} target="_blank" rel="noreferrer" suppressHydrationWarning>Read the Guardian profile <ArrowUpRight aria-hidden="true" size={18} /></a>
        </div>
        <div className="v5-story-hero__image" data-v5-hero>
          <ImageZoom src="/media/real/kyle-founder.jpg" alt="Kyle Mark smiling inside 5AM Club Coffee" priority sizes="(max-width: 760px) 100vw, 44vw" />
        </div>
        <blockquote data-v5-hero>
          <p>“Something about a coffee shop, the atmosphere, the ambience, and so many things can happen at a coffee shop.”</p>
          <footer>Kyle Mark · Trinidad Guardian</footer>
        </blockquote>
      </section>

      <section className="v5-story-body" id="story-timeline">
        <div className="v5-story-body__intro" data-v5-reveal>
          <p className="v5-script">The through-line</p>
          <h2>5AM works because the physical space behaves like the social brand.</h2>
          <p>It is personable, funny, crowded, a little improvised, and always moving. The website should preserve that energy while making the practical details easier to find.</p>
        </div>
        <ol className="v5-timeline">
          <li data-v5-reveal><span>01</span><div><small>Before the café</small><h3>Creator first</h3><p>Kyle’s social audience created attention and a recognizable voice before the hospitality brand had a physical home.</p></div></li>
          <li data-v5-reveal><span>02</span><div><small>The original chapter</small><h3>Cunupia</h3><p>The first shop expanded the creator brand into a real room. Kyle cited European coffee-house culture—Italy in particular—as an influence.</p></div></li>
          <li data-v5-reveal><span>03</span><div><small>The city chapter</small><h3>Carlos Street</h3><p>The Ariapita location made more room for people, events, late evenings, and the growing operational life of the brand.</p></div></li>
          <li data-v5-reveal><span>04</span><div><small>The current chapter</small><h3>Breakfast and beyond</h3><p>The August 2026 breakfast launch shows the operation continuing to change. The digital product has to be just as alive.</p></div></li>
        </ol>
      </section>

      <section className="v5-story-gallery" id="team" aria-label="5AM founder and team">
        <figure data-v5-reveal><div><ImageZoom src="/media/real/kyle-team.jpg" alt="Kyle Mark with the 5AM team at a pop-up" sizes="(max-width: 760px) 100vw, 58vw" /></div><figcaption>Founder + team · July 2026 archive</figcaption></figure>
        <figure data-v5-reveal id="community"><div><ImageZoom src="/media/real/kyle-community.jpg" alt="Kyle Mark with members of the 5AM community" sizes="(max-width: 760px) 100vw, 42vw" /></div><figcaption>Community · July 2026 archive</figcaption></figure>
      </section>

      <section className="v5-story-sources" data-v5-reveal>
        <span>Sources, not mythology</span>
        <div>
          <a href={guardianUrl} target="_blank" rel="noreferrer" suppressHydrationWarning>Trinidad Guardian founder profile <ArrowUpRight aria-hidden="true" size={17} /></a>
          <a href={instagramUrl} target="_blank" rel="noreferrer" suppressHydrationWarning style={instagramHydrationStyle}>Official 5AM Instagram archive <ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>
      </section>

      <section className="v5-pagegallery v5-section" aria-labelledby="story-gallery-title">
        <div className="v5-pagegallery__head">
          <div className="v5-section-label"><span>&#9679;</span> The people</div>
          <h2 id="story-gallery-title">Who is actually in the room.</h2>
          <p>Staff mid-shift, customers mid-sentence, and the small details that make a place feel like somewhere.</p>
        </div>
        <MediaGallery shots={galleries.story} layout="mosaic" eagerCount={2} />
      </section>

      <BrandFooter />
    </main>
  );
}
