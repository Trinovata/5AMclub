"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const nodes = [
  {
    id: "story",
    number: "01",
    label: "Creator",
    href: "/story",
    image: "/media/real/kyle-community.jpg",
    copy: "Kyle’s audience and voice are where the physical brand begins.",
  },
  {
    id: "locations",
    number: "02",
    label: "Two shops",
    href: "/locations",
    image: "/media/real/carlos-storefront.jpg",
    copy: "Cunupia is the first chapter; Carlos Street gives the city a room.",
  },
  {
    id: "menu",
    number: "03",
    label: "The menu",
    href: "/menu",
    image: "/media/real/chicken-waffles-coffee.jpg",
    copy: "Seasonal drops and daily breakfast turn attention into a visit.",
  },
  {
    id: "club",
    number: "04",
    label: "The Club",
    href: "/club",
    image: "/media/real/jazz-vocalists.jpg",
    copy: "Music, games, and pop-ups make the café an active culture space.",
  },
  {
    id: "admin",
    number: "05",
    label: "Operations",
    href: "/admin",
    image: "/media/real/barista-team.jpg",
    copy: "A calm control layer keeps menu, hours, media, and events truthful.",
  },
] as const;

export function BrandSystemMap() {
  const [activeId, setActiveId] = useState<(typeof nodes)[number]["id"]>("story");
  const active = nodes.find((node) => node.id === activeId) ?? nodes[0];

  return (
    <nav className="v5-system-map" aria-label="How the 5AM brand system connects">
      <svg className="v5-system-map__lines" viewBox="0 0 1000 620" aria-hidden="true">
        <path d="M500 310 L166 98" />
        <path d="M500 310 L832 98" />
        <path d="M500 310 L92 500" />
        <path d="M500 310 L500 566" />
        <path d="M500 310 L910 500" />
      </svg>

      <Link className="v5-system-map__center" href={active.href} aria-label={`Open ${active.label}`}>
        <Image key={active.id} src={active.image} alt="" fill sizes="(max-width: 760px) 88vw, 38vw" />
        <span className="v5-system-map__shade" />
        <Image className="v5-system-map__logo" src="/brand/5am-logo-white-on-black.png" alt="" width={86} height={86} />
        <div aria-live="polite">
          <small>{active.number} · {active.label}</small>
          <strong>{active.copy}</strong>
          <span>Open this chapter <ArrowUpRight aria-hidden="true" size={16} /></span>
        </div>
      </Link>

      {nodes.map((node, index) => (
        <Link
          key={node.id}
          href={node.href}
          className={`v5-system-node v5-system-node--${index + 1} ${node.id === activeId ? "is-active" : ""}`}
          onMouseEnter={() => setActiveId(node.id)}
          onFocus={() => setActiveId(node.id)}
        >
          <span>{node.number}</span>
          <strong>{node.label}</strong>
          <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      ))}
    </nav>
  );
}
