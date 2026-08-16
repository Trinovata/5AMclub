"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { locations, type DayKey } from "@/lib/brand-data";

type LocalTime = { day: DayKey; minutes: number; label: string };

const weekdayMap: Record<string, DayKey> = {
  Sun: "sun",
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
};

function getTrinidadTime(): LocalTime {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Port_of_Spain",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "0";
  const hour = Number(value("hour")) % 24;
  const minute = Number(value("minute"));
  return {
    day: weekdayMap[value("weekday")] ?? "mon",
    minutes: hour * 60 + minute,
    label: new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Port_of_Spain",
      hour: "numeric",
      minute: "2-digit",
    }).format(now),
  };
}

export function LocationExplorer() {
  const [activeId, setActiveId] = useState(locations[0].id);
  const [localTime, setLocalTime] = useState<LocalTime | null>(null);
  const active = locations.find((location) => location.id === activeId) ?? locations[0];

  useEffect(() => {
    const update = () => setLocalTime(getTrinidadTime());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const status = useMemo(() => {
    if (!localTime) return { open: false, text: "Checking Trinidad time" };
    const [opens, closes] = active.schedule[localTime.day];
    const open = localTime.minutes >= opens && localTime.minutes < closes;
    return {
      open,
      text: `${open ? "Open now" : "Closed now"} · ${localTime.label} in Trinidad`,
    };
  }, [active, localTime]);

  return (
    <section className="v5-location-explorer" id="location-explorer" aria-labelledby="location-explorer-title">
      <div className="v5-location-tabs" role="tablist" aria-label="5AM locations">
        {locations.map((location, index) => (
          <button
            key={location.id}
            type="button"
            role="tab"
            aria-selected={active.id === location.id}
            aria-controls="location-panel"
            className={active.id === location.id ? "is-active" : ""}
            onClick={() => setActiveId(location.id)}
          >
            <span>0{index + 1}</span>
            <strong>{location.shortName}</strong>
            <small>{location.name}</small>
          </button>
        ))}
      </div>

      <div className="v5-location-panel" id="location-panel" role="tabpanel">
        <Link className="v5-location-panel__image" href={`/locations/${active.id}`} aria-label={`Open ${active.shortName} location page`}>
          <Image
            key={active.id}
            src={active.image}
            alt={active.imageAlt}
            fill
            sizes="(max-width: 820px) 100vw, 54vw"
          />
          <span className={`v5-open-pill ${status.open ? "is-open" : ""}`}>
            <span aria-hidden="true" /> {status.text}
          </span>
          <span className="v5-media-destination">View branch page <ArrowUpRight aria-hidden="true" size={16} /></span>
        </Link>
        <div className="v5-location-panel__copy">
          <span className="v5-kicker"><MapPin aria-hidden="true" size={16} /> {active.shortName}</span>
          <h2 id="location-explorer-title">{active.name}</h2>
          <p>{active.note}</p>
          <address>{active.address}</address>
          {active.feature && <div className="v5-location-feature">New: {active.feature}</div>}
          <div className="v5-hours">
            <div className="v5-hours__heading"><Clock3 aria-hidden="true" size={17} /> Published hours</div>
            {active.hours.map((row) => (
              <div key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>
            ))}
          </div>
          <a className="v5-button v5-button--ink" href={active.directions} target="_blank" rel="noreferrer" suppressHydrationWarning>
            Get directions <ArrowUpRight aria-hidden="true" size={18} />
          </a>
          <small className="v5-location-source">Hours transcribed from the official 18 May 2026 post.</small>
        </div>
      </div>
    </section>
  );
}
