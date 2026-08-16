"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionLayer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.from("[data-v5-hero]", {
        y: 18,
        opacity: 0,
        duration: 0.72,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.utils.toArray<HTMLElement>("[data-v5-reveal]").forEach((element) => {
        const direction = element.dataset.v5Reveal;
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
          },
          x: direction === "left" ? -34 : direction === "right" ? 34 : 0,
          y: direction === "media" ? 16 : 28,
          scale: direction === "media" ? 0.975 : 1,
          opacity: 0,
          duration: 0.64,
          ease: "power3.out",
          clearProps: "all",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-v5-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: 5,
          scale: 1.035,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
