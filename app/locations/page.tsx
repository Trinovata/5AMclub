import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { LocationExplorer } from "@/components/LocationExplorer";
import { MotionLayer } from "@/components/MotionLayer";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Locations",
  description: "Published hours and directions for 5AM Club Coffee in Ariapita and Cunupia.",
};

export default function LocationsPage() {
  return (
    <main className="v5-site v5-inner-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer />
      <SiteHeader />
      <section className="v5-locations-hero" id="main-content">
        <div className="v5-locations-hero__copy" data-v5-hero>
          <div className="v5-page-index"><span>02</span> Find 5AM</div>
          <p className="v5-script">Two chapters, one name</p>
          <h1>Which room are you walking into?</h1>
          <p>Pick a branch for current Trinidad-time status, the latest published hours, and directions.</p>
        </div>
        <a className="v5-locations-hero__image" href="#location-explorer" data-v5-hero aria-label="Choose a 5AM location">
          <Image src="/media/real/carlos-interior-logo.jpg" alt="5AM Club Coffee logo inside the Carlos Street café" fill priority sizes="(max-width: 760px) 100vw, 56vw" />
          <span className="v5-media-destination">Choose a branch <ArrowUpRight aria-hidden="true" size={16} /></span>
        </a>
      </section>
      <LocationExplorer />
      <BrandFooter />
    </main>
  );
}
