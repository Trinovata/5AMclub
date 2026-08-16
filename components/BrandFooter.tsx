import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { instagramHydrationStyle, instagramUrl } from "@/lib/brand-data";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Locations" },
  { href: "/club", label: "The Club" },
  { href: "/story", label: "Our story" },
];

export function BrandFooter() {
  return (
    <footer className="v5-footer">
      <div className="v5-footer__main">
        <div className="v5-footer__brand">
          <Link href="/" aria-label="Back to the 5AM homepage">
            <Image
              src="/brand/5am-logo-white-on-black.png"
              alt="5AM Club Coffee"
              width={170}
              height={170}
            />
          </Link>
          <p>Coffee gets you through the door. The people give you a reason to stay.</p>
        </div>
        <nav className="v5-footer__nav" aria-label="Footer navigation">
          <span>Go somewhere</span>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label} <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          ))}
        </nav>
        <div className="v5-footer__social">
          <span>Keep up</span>
          <a href={instagramUrl} target="_blank" rel="noreferrer" suppressHydrationWarning style={instagramHydrationStyle}>
            @5amclubcoffee <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <Link href="/admin">
            Operations demo <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </div>
      <div className="v5-footer__legal">
        <span>Unofficial pre-outreach concept by Trinovata.</span>
        <span>Built from public 5AM media supplied 15 Aug 2026.</span>
        <span>No live ordering. Confirm menu and hours before production launch.</span>
      </div>
    </footer>
  );
}
