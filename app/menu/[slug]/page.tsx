import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, ReceiptText } from "lucide-react";
import { BrandFooter } from "@/components/BrandFooter";
import { ImageZoom } from "@/components/ImageZoom";
import { MotionLayer } from "@/components/MotionLayer";
import { SiteHeader } from "@/components/SiteHeader";
import { instagramHydrationStyle, instagramUrl, menuItems } from "@/lib/brand-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = menuItems.find((entry) => entry.id === slug);
  if (!item) return { title: "Menu item" };
  return { title: item.name, description: item.description };
}

export default async function MenuItemPage({ params }: Props) {
  const { slug } = await params;
  const item = menuItems.find((entry) => entry.id === slug);
  if (!item) notFound();
  const related = menuItems.filter((entry) => entry.category === item.category && entry.id !== item.id).slice(0, 3);

  return (
    <main className="v5-site v5-inner-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer />
      <SiteHeader />
      <section className={`v5-product-detail v5-product-detail--${item.accent}`} id="main-content">
        <div className="v5-product-detail__copy" data-v5-hero>
          <Link className="v5-back-link" href="/menu"><ArrowLeft aria-hidden="true" size={17} /> Back to the full menu</Link>
          <span>{item.category} · Official archive</span>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <dl>
            <div><dt><Clock3 aria-hidden="true" size={17} /> Service</dt><dd>{item.serviceNote}</dd></div>
            <div><dt><ReceiptText aria-hidden="true" size={17} /> Price</dt><dd>Confirm in store</dd></div>
          </dl>
          <a href={instagramUrl} target="_blank" rel="noreferrer" suppressHydrationWarning style={instagramHydrationStyle}>
            Check the official feed <ArrowUpRight aria-hidden="true" size={18} />
          </a>
          <small>Record transcribed from an official post published {item.published}.</small>
        </div>
        <div className="v5-product-detail__media" data-v5-hero>
          <ImageZoom src={item.image} alt={item.imageAlt} priority sizes="(max-width: 760px) 100vw, 54vw" />
        </div>
      </section>

      <section className="v5-related" aria-labelledby="related-menu-title">
        <div data-v5-reveal>
          <p className="v5-script">Keep looking</p>
          <h2 id="related-menu-title">More from {item.category.toLowerCase()}.</h2>
        </div>
        <div>
          {related.map((entry) => (
            <Link href={`/menu/${entry.id}`} key={entry.id} data-v5-reveal>
              <span><Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></span>
              <div><small>{entry.category}</small><strong>{entry.name}</strong><ArrowRight aria-hidden="true" /></div>
            </Link>
          ))}
        </div>
      </section>
      <BrandFooter />
    </main>
  );
}
