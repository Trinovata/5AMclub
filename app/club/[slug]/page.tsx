import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { ImageZoom } from "@/components/ImageZoom";
import { MotionLayer } from "@/components/MotionLayer";
import { SiteHeader } from "@/components/SiteHeader";
import { archiveMoments, instagramHydrationStyle, instagramUrl } from "@/lib/brand-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return archiveMoments.map((moment) => ({ slug: moment.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const moment = archiveMoments.find((entry) => entry.id === slug);
  return { title: moment?.title ?? "Club archive", description: moment?.description };
}

export default async function ClubArchivePage({ params }: Props) {
  const { slug } = await params;
  const index = archiveMoments.findIndex((entry) => entry.id === slug);
  if (index < 0) notFound();
  const moment = archiveMoments[index];
  const next = archiveMoments[(index + 1) % archiveMoments.length];

  return (
    <main className="v5-site v5-inner-page v5-club-record-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer />
      <SiteHeader />
      <section className="v5-club-record" id="main-content">
        <div className="v5-club-record__copy" data-v5-hero>
          <Link className="v5-back-link" href="/club"><ArrowLeft aria-hidden="true" size={17} /> Back to the Club</Link>
          <span>{moment.kind}</span>
          <h1>{moment.title}</h1>
          <p>{moment.description}</p>
          <dl>
            <div><dt>Record type</dt><dd>Public archive</dd></div>
            <div><dt>Published</dt><dd>{moment.published}</dd></div>
            <div><dt>Future event?</dt><dd>No—archive only</dd></div>
          </dl>
          <a href={instagramUrl} target="_blank" rel="noreferrer" suppressHydrationWarning style={instagramHydrationStyle}>
            Follow the live source <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
        <div className="v5-club-record__media" data-v5-hero>
          <ImageZoom src={moment.image} alt={moment.imageAlt} priority sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
      </section>
      <section className="v5-record-next">
        <span>Next in the archive</span>
        <Link href={`/club/${next.id}`}>
          <span><Image src={next.image} alt={next.imageAlt} fill sizes="(max-width: 760px) 100vw, 34vw" /></span>
          <div><small>{next.kind}</small><strong>{next.title}</strong><ArrowRight aria-hidden="true" /></div>
        </Link>
      </section>
      <BrandFooter />
    </main>
  );
}
