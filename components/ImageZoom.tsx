"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ImageZoom({
  src,
  alt,
  sizes,
  priority = false,
  objectPosition,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button ref={triggerRef} className="v5-image-zoom" type="button" onClick={() => setOpen(true)} aria-label={`Enlarge: ${alt}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} style={{ objectPosition }} />
        <span><Maximize2 aria-hidden="true" size={17} /> View full image</span>
      </button>
      {open && (
        <div className="v5-image-modal" role="dialog" aria-modal="true" aria-label={alt} onMouseDown={close}>
          <button ref={closeRef} className="v5-image-modal__close" type="button" onClick={close}><X aria-hidden="true" size={20} /> Close</button>
          <div onMouseDown={(event) => event.stopPropagation()}>
            <Image src={src} alt={alt} fill sizes="96vw" />
          </div>
          <p>{alt}</p>
        </div>
      )}
    </>
  );
}
