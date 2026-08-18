"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Mode = "coffee" | "breakfast" | "club";

const modes: Array<{
  id: Mode;
  tab: string;
  kicker: string;
  title: string;
  copy: string;
  href: string;
  action: string;
  video?: string;
  image?: string;
  poster: string;
  position?: string;
}> = [
  {
    id: "coffee",
    tab: "Morning",
    kicker: "Coffee · Carlos Street",
    title: "The day starts in here.",
    copy: "Real craft, real conversation, and a room that wakes up with the city.",
    href: "/story",
    action: "Meet 5AM",
    video: "/media/real/film-coffee-craft.mp4",
    poster: "/media/real/film-coffee-craft.poster.jpg",
  },
  {
    id: "breakfast",
    tab: "Breakfast",
    kicker: "New · Friday–Tuesday · 7AM–11AM",
    title: "Breakfast has joined the club.",
    copy: "Four new plates, served at Carlos Street on Ariapita Avenue.",
    href: "/menu",
    action: "See breakfast",
    image: "/media/real/chicken-waffles-coffee.jpg",
    poster: "/media/real/chicken-waffles-coffee.jpg",
    position: "center 64%",
  },
  {
    id: "club",
    tab: "After 5",
    kicker: "The Club · archive",
    title: "Then the room changes key.",
    copy: "Jazz, games, pop-ups, and the people who turn a café into a culture space.",
    href: "/club",
    action: "Enter the Club",
    video: "/media/real/film-jazz-night.mp4",
    poster: "/media/real/film-jazz-night.poster.jpg",
    position: "center 48%",
  },
];

export function HeroStage() {
  const [mode, setMode] = useState<Mode>("coffee");
  const [reduceMotion, setReduceMotion] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = modes.find((item) => item.id === mode) ?? modes[0];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // No playing state and no toggle: with the transport button gone, nothing
  // reads whether it is playing, and a rejected play() should leave the poster
  // up rather than drive a control that no longer exists.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      return;
    }
    void video.play().catch(() => {});
  }, [mode, reduceMotion]);

  return (
    <div className={`v5-hero-stage v5-hero-stage--${mode}`} data-v5-hero>
      <div className="v5-hero-stage__media" key={active.id} aria-hidden="true">
        {active.video ? (
          <video
            key={active.id}
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={active.poster}
            style={{ objectPosition: active.position }}
          >
            <source src={active.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={active.image ?? active.poster}
            alt=""
            fill
            priority
            sizes="(max-width: 780px) 100vw, 72vw"
            style={{ objectPosition: active.position }}
          />
        )}
      </div>
      <div className="v5-hero-stage__shade" />

      {/* No play/pause control. The background film is decorative, silent and
          looping — the same class of thing as the clips elsewhere on the site,
          none of which offer controls. A transport button on ambient footage
          invites a decision nobody came here to make, and it was the only chrome
          floating over the hero. Motion-sensitive visitors are served by
          prefers-reduced-motion, which stops it without a button. */}
      <div className="v5-hero-stage__top">
        <span>{active.kicker}</span>
      </div>

      <div className="v5-hero-stage__copy" key={`copy-${active.id}`} aria-live="polite">
        <p className="v5-script">Five in the morning</p>
        <h1>{active.title}</h1>
        <p>{active.copy}</p>
        <Link href={active.href}>
          {active.action} <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>

      <div className="v5-hero-stage__tabs" aria-label="Choose a 5AM scene">
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === mode ? "is-active" : ""}
            aria-pressed={item.id === mode}
            onClick={() => setMode(item.id)}
          >
            <span>0{modes.indexOf(item) + 1}</span>
            {item.tab}
          </button>
        ))}
      </div>
    </div>
  );
}
