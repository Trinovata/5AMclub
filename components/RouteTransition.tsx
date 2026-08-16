"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const routeNames: Record<string, string> = {
  "/": "Home",
  "/menu": "Menu",
  "/locations": "Find 5AM",
  "/club": "The Club",
  "/story": "The story",
  "/admin": "Operations",
};

function destinationName(pathname: string) {
  const exact = routeNames[pathname];
  if (exact) return exact;
  if (pathname.startsWith("/menu/")) return "On the menu";
  if (pathname.startsWith("/locations/")) return "Your location";
  if (pathname.startsWith("/club/")) return "From the archive";
  return "5AM Club Coffee";
}

export function RouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [label, setLabel] = useState("5AM Club Coffee");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove("v5-is-leaving");
    document.documentElement.classList.add("v5-is-entering");
    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove("v5-is-entering");
    }, 560);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target || anchor.hasAttribute("download") || anchor.dataset.noTransition === "true") return;

      const next = new URL(anchor.href, window.location.href);
      if (next.origin !== window.location.origin) return;
      if (next.pathname === window.location.pathname && next.search === window.location.search) return;

      event.preventDefault();
      setLabel(destinationName(next.pathname));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(`${next.pathname}${next.search}${next.hash}`);
        return;
      }

      document.documentElement.classList.add("v5-is-leaving");
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        router.push(`${next.pathname}${next.search}${next.hash}`);
      }, 260);
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [router]);

  return (
    <>
      <div className="v5-scroll-progress" aria-hidden="true" />
      <div className="v5-route-curtain" aria-hidden="true">
        <Image src="/brand/5am-logo-white-on-black.png" alt="" width={82} height={82} />
        <span>Going to</span>
        <strong>{label}</strong>
      </div>
    </>
  );
}
