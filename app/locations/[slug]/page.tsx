import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { ImageZoom } from "@/components/ImageZoom";
import { MotionLayer } from "@/components/MotionLayer";
import { SiteHeader } from "@/components/SiteHeader";
import { locations } from "@/lib/brand-data";

type Props = { params: Promise<{ slug: string }> };

const galleries = {
  carlos: [
    { src: "/media/real/carlos-interior-logo.jpg", alt: "Warm interior and 5AM mark at Carlos Street" },
    { src: "/media/real/carlos-packed-room.jpg", alt: "A packed room at Carlos Street after dark" },
  ],
  cunupia: [
    { src: "/media/real/cunupia-interior.jpg", alt: "Interior of the original 5AM café in Cunupia" },
    { src: "/media/real/published-hours.jpg", alt: "Official published hours for both 5AM locations" },
  ],
} as const;

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((entry) => entry.id === slug);
  return { title: location ? `${location.shortName} location` : "Location", description: location?.note };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = locations.find((entry) => entry.id === slug);
  if (!location) notFound();
  const other = locations.find((entry) => entry.id !== location.id) ?? locations[0];

  return (
    <main className="v5-site v5-inner-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer />
      <SiteHeader />
      <section className="v5-location-detail" id="main-content">
        <div className="v5-location-detail__media" data-v5-hero>
          <ImageZoom src={location.image} alt={location.imageAlt} priority sizes="(max-width: 760px) 100vw, 58vw" />
        </div>
        <div className="v5-location-detail__copy" data-v5-hero>
          <Link className="v5-back-link" href="/locations"><ArrowLeft aria-hidden="true" size={17} /> All locations</Link>
          <span><MapPin aria-hidden="true" size={16} /> {location.shortName}</span>
          <h1>{location.name}</h1>
          <p>{location.note}</p>
          <address>{location.address}</address>
          {location.feature && <div className="v5-location-detail__feature">{location.feature}</div>}
          <div className="v5-location-detail__hours">
            <strong><Clock3 aria-hidden="true" size={17} /> Published hours</strong>
            {location.hours.map((row) => <div key={row.label}><span>{row.label}</span><b>{row.value}</b></div>)}
          </div>
          <a className="v5-button v5-button--ink" href={location.directions} target="_blank" rel="noreferrer" suppressHydrationWarning>
            Open directions <ArrowUpRight aria-hidden="true" size={18} />
          </a>
          <small>Schedule source: official 18 May 2026 post. Confirm holiday exceptions before travelling.</small>
        </div>
      </section>

      <section className="v5-location-gallery" aria-labelledby="location-gallery-title">
        <div data-v5-reveal><p className="v5-script">Inside this chapter</p><h2 id="location-gallery-title">Look around.</h2></div>
        <div>
          {galleries[location.id].map((image) => (
            <div key={image.src} data-v5-reveal><ImageZoom src={image.src} alt={image.alt} sizes="(max-width: 760px) 100vw, 50vw" /></div>
          ))}
        </div>
        <Link href={`/locations/${other.id}`}>Next location: {other.shortName} <ArrowRight aria-hidden="true" size={18} /></Link>
      </section>
      <BrandFooter />
    </main>
  );
}
