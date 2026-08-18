import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { MediaGallery } from "@/components/MediaGallery";
import { LocationExplorer } from "@/components/LocationExplorer";
import { MotionLayer } from "@/components/MotionLayer";
import { PageHero } from "@/components/PageHero";
import { SiteHeader } from "@/components/SiteHeader";
import { galleries } from "@/lib/media-data";

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

      <PageHero
        eyebrow="Find us"
        script="Two rooms, one club"
        title="Carlos Street. Cunupia."
        lede="Two shops with different rhythms, and a cart that travels. Hours and directions for both."
        image="/media/real/cart-front-staff-queue.jpg"
        imageAlt="The 5AM Club cart with its logo panel lit, staff pouring behind it while customers wait."
        weight="light"
      />
      <section className="v5-locations-hero">
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

      <section className="v5-pagegallery v5-section" aria-labelledby="locations-gallery-title">
        <div className="v5-pagegallery__head">
          <div className="v5-section-label"><span>&#9679;</span> Both rooms</div>
          <h2 id="locations-gallery-title">The spaces, and the cart.</h2>
          <p>Carlos Street, Cunupia, and the cart when it travels. Interiors, corners, and the light at different hours.</p>
        </div>
        <MediaGallery shots={galleries.locations} layout="mosaic" eagerCount={2} />
      </section>

      <BrandFooter />
    </main>
  );
}
