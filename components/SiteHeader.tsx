"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { instagramHydrationStyle, instagramUrl } from "@/lib/brand-data";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Find us" },
  { href: "/club", label: "The Club" },
  { href: "/story", label: "Story" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header className="v5-header">
        <Link className="v5-header__brand" href="/" aria-label="5AM Club Coffee concept home">
          <Image
            src="/brand/5am-logo-white-on-black.png"
            alt=""
            width={62}
            height={62}
            priority
          />
          <span>
            <strong>5AM</strong>
            <small>Club Coffee</small>
          </span>
        </Link>

        <nav className="v5-header__nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="v5-header__actions">
          <span className="v5-concept-chip">Unofficial concept</span>
          <a
            className="v5-header__instagram"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            suppressHydrationWarning
            style={instagramHydrationStyle}
          >
            Instagram <ArrowUpRight aria-hidden="true" size={16} />
          </a>
          <button
            ref={menuButtonRef}
            className="v5-header__menu"
            type="button"
            aria-expanded={isOpen}
            aria-controls="v5-mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        className={`v5-mobile-menu ${isOpen ? "v5-mobile-menu--open" : ""}`}
        id="v5-mobile-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          <Link href="/" onClick={() => setIsOpen(false)}>Home <span>00</span></Link>
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label} <span>0{index + 1}</span>
            </Link>
          ))}
        </nav>
        <div>
          <a href={instagramUrl} target="_blank" rel="noreferrer" suppressHydrationWarning style={instagramHydrationStyle}>
            @5amclubcoffee <ArrowUpRight aria-hidden="true" size={18} />
          </a>
          <Link href="/admin" onClick={() => setIsOpen(false)}>Open operations demo</Link>
        </div>
      </div>
    </>
  );
}
