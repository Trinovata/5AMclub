import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <main className="v5-site v5-not-found">
      <SiteHeader />
      <section>
        <div className="v5-not-found__media">
          <Image src="/media/real/film-storefront.poster.jpg" alt="5AM Club Coffee storefront" fill priority sizes="100vw" />
        </div>
        <div className="v5-not-found__shade" />
        <div className="v5-not-found__copy">
          <span>Wrong turn · right time</span>
          <strong aria-label="Error 404">04:59</strong>
          <p className="v5-script">Almost 5AM. Not quite the page.</p>
          <h1>This route didn’t make the menu.</h1>
          <div>
            <Link href="/"><Home aria-hidden="true" size={18} /> Back home</Link>
            <Link href="/menu">Open the menu <ArrowRight aria-hidden="true" size={18} /></Link>
            <Link href="/locations"><MapPin aria-hidden="true" size={18} /> Find a shop</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
