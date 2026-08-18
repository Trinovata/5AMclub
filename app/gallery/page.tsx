import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandFooter } from "@/components/BrandFooter";
import { MediaGallery } from "@/components/MediaGallery";
import { AutoVideo } from "@/components/AutoVideo";
import { archiveGroups, clips } from "@/lib/media-data";

export const metadata: Metadata = {
  title: "Gallery — 5AM Club Coffee",
  description:
    "Photographs from the 5AM Club Coffee archive: the room, the cart, the drinks, the plates and the people.",
};

/**
 * The archive, shown rather than described.
 *
 * Navigation is plain anchors, not a JavaScript filter. With this many frames a
 * filter would mean either shipping every image and hiding most of them, or
 * re-rendering the grid on every tap. Anchors let the browser do what it is
 * already good at, they survive a page reload, they are linkable, and they work
 * before hydration.
 *
 * Clips are interleaved between groups rather than gathered in one block, so
 * motion arrives as a change of pace instead of a wall of video.
 */
export default function GalleryPage() {
  const total = archiveGroups.reduce((sum, group) => sum + group.shots.length, 0);

  return (
    <main className="v5-site" id="top">
      <SiteHeader />

      <header className="v5-galleryhead" id="main-content">
        <p className="v5-script">Everything, in one place</p>
        <h1>The archive.</h1>
        <p>
          {total} photographs and {clips.length} short clips from the public 5AM Club Coffee
          archive — the room, the cart, the drinks, the plates and the people who turned up.
          Nothing here is staged for a website.
        </p>
      </header>

      <nav className="v5-gallerynav" aria-label="Jump to a section of the archive">
        {archiveGroups.map((group) => (
          <a key={group.id} href={`#${group.id}`}>
            {group.title}
          </a>
        ))}
      </nav>

      {archiveGroups.map((group, index) => (
        <section className="v5-gallerysection" id={group.id} key={group.id}>
          <div className="v5-gallerysection__head">
            <h2>{group.title}</h2>
            <span>
              {group.shots.length} frame{group.shots.length === 1 ? "" : "s"}
            </span>
          </div>

          <MediaGallery shots={group.shots} layout="mosaic" eagerCount={index === 0 ? 6 : 0} />

          {clips[index] ? (
            <div className="v5-gallery__clipband">
              <AutoVideo
                src={clips[index].src}
                poster={clips[index].poster}
                label={clips[index].label}
                caption={clips[index].caption}
              />
              {clips[index + archiveGroups.length] ? (
                <AutoVideo
                  src={clips[index + archiveGroups.length].src}
                  poster={clips[index + archiveGroups.length].poster}
                  label={clips[index + archiveGroups.length].label}
                  caption={clips[index + archiveGroups.length].caption}
                />
              ) : null}
            </div>
          ) : null}
        </section>
      ))}

      <BrandFooter />
    </main>
  );
}
