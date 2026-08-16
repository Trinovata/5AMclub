import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { MenuExplorer } from "@/components/MenuExplorer";
import { MotionLayer } from "@/components/MotionLayer";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Menu",
  description: "A source-backed concept menu from recent official 5AM Club Coffee media.",
};

export default function MenuPage() {
  return (
    <main className="v5-site v5-inner-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer />
      <SiteHeader />
      <section className="v5-menu-hero" id="main-content">
        <div className="v5-menu-hero__copy" data-v5-hero>
          <div className="v5-page-index"><span>01</span> The menu</div>
          <p className="v5-script">Real food. Real posts.</p>
          <h1>Here’s what we can actually show you.</h1>
          <p>
            The newest breakfast launch and the June summer drop, transcribed from official supplied media. Prices and live stock stay in-store until they can be verified.
          </p>
          <div className="v5-menu-hero__facts">
            <span><strong>4</strong> breakfast plates</span>
            <span><strong>4</strong> summer drinks</span>
            <span><strong>0</strong> invented prices</span>
          </div>
        </div>
        <a className="v5-menu-hero__image" href="#menu-explorer-title" data-v5-hero aria-label="Jump to the menu explorer">
          <Image src="/media/real/breakfast-menu.jpg" alt="Official 5AM daily breakfast menu artwork" fill priority sizes="(max-width: 760px) 100vw, 42vw" />
          <span className="v5-media-destination">Browse the menu <ArrowUpRight aria-hidden="true" size={16} /></span>
        </a>
        <div className="v5-menu-hero__film" data-v5-hero>
          <video controls muted playsInline preload="metadata" poster="/media/real/film-summer-menu.poster.jpg">
            <source src="/media/real/film-summer-menu.mp4" type="video/mp4" />
          </video>
          <span>Summer menu · official archive</span>
        </div>
      </section>
      <MenuExplorer />
      <section className="v5-menu-source">
        <strong>A deliberate constraint</strong>
        <p>This concept only publishes names, descriptions, service windows, and images visible in the supplied public archive. A production launch should connect the menu to staff-owned live records.</p>
      </section>
      <BrandFooter />
    </main>
  );
}
