"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { archiveMoments } from "@/lib/brand-data";

export function ClubGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selected = selectedIndex === null ? null : archiveMoments[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        triggerRef.current?.focus();
      }
      if (event.key === "ArrowRight") setSelectedIndex((selectedIndex + 1) % archiveMoments.length);
      if (event.key === "ArrowLeft") setSelectedIndex((selectedIndex - 1 + archiveMoments.length) % archiveMoments.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex]);

  function closeLightbox() {
    setSelectedIndex(null);
    triggerRef.current?.focus();
  }

  return (
    <>
      <div className="v5-club-gallery">
        {archiveMoments.map((moment, index) => (
          <article key={moment.id}>
            <button className="v5-club-gallery__image" type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setSelectedIndex(index); }} aria-label={`Enlarge ${moment.title}`}>
              <Image src={moment.image} alt={moment.imageAlt} fill sizes="(max-width: 700px) 100vw, 25vw" />
              <span><Maximize2 aria-hidden="true" size={17} /> Open</span>
            </button>
            <Link className="v5-club-gallery__copy" href={`/club/${moment.id}`}>
              <small>{moment.kind}</small>
              <strong>{moment.title}</strong>
              <time>{moment.published}</time>
            </Link>
          </article>
        ))}
      </div>

      {selected && selectedIndex !== null && (
        <div className="v5-lightbox" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button ref={closeRef} className="v5-lightbox__close" type="button" onClick={closeLightbox}>
            <X aria-hidden="true" size={20} /> Close
          </button>
          <div className="v5-lightbox__image">
            <Image src={selected.image} alt={selected.imageAlt} fill sizes="90vw" />
          </div>
          <div className="v5-lightbox__footer">
            <div>
              <span>{selected.kind}</span>
              <strong>{selected.title}</strong>
              <time>Archive post · {selected.published}</time>
            </div>
            <div>
              <Link href={`/club/${selected.id}`}>Open full record <ArrowRight aria-hidden="true" size={16} /></Link>
              <button type="button" aria-label="Previous image" onClick={() => setSelectedIndex((selectedIndex - 1 + archiveMoments.length) % archiveMoments.length)}>
                <ArrowLeft aria-hidden="true" />
              </button>
              <span>{selectedIndex + 1} / {archiveMoments.length}</span>
              <button type="button" aria-label="Next image" onClick={() => setSelectedIndex((selectedIndex + 1) % archiveMoments.length)}>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
