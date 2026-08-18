import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/archivo";
import "@fontsource-variable/bodoni-moda";
import "@fontsource/allura";
import { LoadingScreen } from "@/components/LoadingScreen";
import { RouteTransition } from "@/components/RouteTransition";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  title: {
    default: "5AM Club Coffee — Unofficial concept",
    template: "%s · 5AM Club Coffee",
  },
  description:
    "An unofficial pre-outreach concept for a creator-led Caribbean coffee and culture brand.",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5ead8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <RouteTransition />
        {/* Sits above the page for one beat on the first visit of a session.
            The content below is already rendered and interactive — this never
            gates it. */}
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
