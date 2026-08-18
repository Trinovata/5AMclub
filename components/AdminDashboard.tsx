"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Coffee,
  Command,
  FileText,
  ImageIcon,
  LayoutDashboard,
  MapPinned,
  Menu as MenuIcon,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { archiveGroups, clips, galleries, stripShots } from "@/lib/media-data";
import { team } from "@/lib/team-data";
import { archiveMoments, locations as brandLocations, menuItems as brandMenuItems } from "@/lib/brand-data";

/**
 * The dashboard reads from the SAME data files the public pages render from, so
 * a number here cannot disagree with what the site is actually showing. These
 * used to be hardcoded — "769 assets indexed" while the site carried 42 — which
 * is the failure mode an operations view exists to prevent.
 */
const publicMedia = {
  photographs:
    stripShots.length +
    Object.values(galleries).reduce((n, g) => n + g.length, 0) +
    archiveGroups.reduce((n, g) => n + g.shots.length, 0),
  clips: clips.length,
  strip: stripShots.length,
  archive: archiveGroups.reduce((n, g) => n + g.shots.length, 0),
};

type View = "overview" | "menu" | "locations" | "events" | "media" | "team";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  note: string;
  available: boolean;
};

const navItems: Array<{
  id: View;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "menu", label: "Menu", icon: Coffee },
  { id: "locations", label: "Locations", icon: MapPinned },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "team", label: "Team", icon: Users },
  { id: "media", label: "Media", icon: ImageIcon },
];

const initialMenu: MenuItem[] = [
  { id: 1, name: "Egg Boss Sandwich", category: "Breakfast", note: "Official post · 12 Aug", available: true },
  { id: 2, name: "Teriyaki Tofu Spinach Wrap", category: "Breakfast", note: "Official post · 12 Aug", available: true },
  { id: 3, name: "Pancake & Eggs Your Way", category: "Breakfast", note: "Official post · 12 Aug", available: true },
  { id: 4, name: "Chicken & Waffles", category: "Breakfast", note: "Official post · 12 Aug", available: true },
  { id: 5, name: "Banana Pudding Latte", category: "Summer", note: "Official post · 25 Jun", available: true },
  { id: 6, name: "Mango Sticky Rice Matcha", category: "Summer", note: "Official post · 25 Jun", available: true },
  { id: 7, name: "Island Matcha", category: "Summer", note: "Official post · 25 Jun", available: true },
  { id: 8, name: "Pineapple Passionfruit Quencher", category: "Summer", note: "Official post · 25 Jun", available: true },
];

const archiveBars = [28, 66, 26, 49, 26, 58, 93, 48, 100, 88, 50, 22];

export function AdminDashboard() {
  const [view, setView] = useState<View>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [menu, setMenu] = useState(initialMenu);
  const [toast, setToast] = useState("");

  const availableCount = useMemo(
    () => menu.filter((item) => item.available).length,
    [menu],
  );

  function chooseView(nextView: View) {
    setView(nextView);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleAvailability(id: number) {
    setMenu((current) =>
      current.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item,
      ),
    );
    notify("Demo availability updated");
  }

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  const title = navItems.find((item) => item.id === view)?.label ?? "Overview";

  return (
    <div className="admin-shell">
      <a className="skip-link" href="#admin-main">
        Skip to dashboard content
      </a>

      <aside className={`admin-sidebar ${mobileNavOpen ? "admin-sidebar--open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand__mark">
            <Image src="/brand/5am-logo-white-on-black.png" alt="" width={38} height={38} />
          </div>
          <div>
            <strong>5AM</strong>
            <span>Operations concept</span>
          </div>
          <button
            className="admin-sidebar__close"
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <nav className="admin-nav" aria-label="Admin sections">
          <span className="admin-nav__label">Workspace</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={active ? "admin-nav__item admin-nav__item--active" : "admin-nav__item"}
                aria-current={active ? "page" : undefined}
                onClick={() => chooseView(item.id)}
              >
                <Icon aria-hidden="true" size={19} />
                <span>{item.label}</span>
                {item.id === "menu" && <small>{availableCount}/{menu.length}</small>}
              </button>
            );
          })}

          <span className="admin-nav__label admin-nav__label--spaced">System</span>
          <button type="button" className="admin-nav__item" disabled>
            <Users aria-hidden="true" size={19} />
            <span>Customers</span>
            <em>Later</em>
          </button>
          <button type="button" className="admin-nav__item" disabled>
            <FileText aria-hidden="true" size={19} />
            <span>Content</span>
            <em>Later</em>
          </button>
          <button type="button" className="admin-nav__item" disabled>
            <Settings aria-hidden="true" size={19} />
            <span>Settings</span>
            <em>Later</em>
          </button>
        </nav>

        <div className="admin-sidebar__foot">
          <div className="sample-card">
            <Sparkles aria-hidden="true" size={18} />
            <div>
              <strong>Prototype mode</strong>
              <span>Public archive + demo states.</span>
            </div>
          </div>
          <Link href="/">
            <ArrowLeft aria-hidden="true" size={17} /> Back to public site
          </Link>
        </div>
      </aside>

      {mobileNavOpen && (
        <button
          className="admin-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <div className="admin-workspace">
        <header className="admin-topbar">
          <button
            className="admin-mobile-menu"
            type="button"
            aria-label="Open navigation"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          >
            <MenuIcon aria-hidden="true" size={21} />
          </button>
          <div className="admin-breadcrumb">
            <span>5AM</span>
            <span>/</span>
            <strong>{title}</strong>
          </div>
          <button className="command-search" type="button" onClick={() => notify("Command search is staged for the production build") }>
            <Search aria-hidden="true" size={17} />
            <span>Search or jump to…</span>
            <kbd><Command aria-hidden="true" size={12} /> K</kbd>
          </button>
          <div className="admin-topbar__actions">
            <button className="icon-button" type="button" aria-label="Help" onClick={() => notify("This prototype keeps help content intentionally compact") }>
              <CircleHelp aria-hidden="true" size={20} />
            </button>
            <button className="profile-button" type="button" aria-label="Open profile menu" onClick={() => notify("Role and account controls arrive with authentication") }>
              <span>GM</span>
              <ChevronDown aria-hidden="true" size={15} />
            </button>
          </div>
        </header>

        <main className="admin-main" id="admin-main">
          {view === "overview" && <Overview onNavigate={chooseView} onToast={notify} />}
          {view === "menu" && (
            <MenuView menu={menu} onToggle={toggleAvailability} onToast={notify} />
          )}
          {view === "locations" && <LocationsView onToast={notify} />}
          {view === "events" && <EventsView onToast={notify} />}
          {view === "team" && <TeamView onToast={notify} />}
          {view === "media" && <MediaView onToast={notify} />}
        </main>
      </div>

      <div className={`admin-toast ${toast ? "admin-toast--visible" : ""}`} aria-live="polite">
        <Check aria-hidden="true" size={17} />
        {toast}
      </div>
    </div>
  );
}

function PageIntro({
  eyebrow,
  title,
  copy,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="admin-page-intro">
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      <button className="admin-primary-button" type="button" onClick={onAction}>
        <Plus aria-hidden="true" size={18} /> {action}
      </button>
    </div>
  );
}

function Overview({ onNavigate, onToast }: { onNavigate: (view: View) => void; onToast: (message: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="Saturday · Prototype environment"
        title="Good morning."
        copy="A calm operating layer for everything the public experience promises."
        action="Quick action"
        onAction={() => onToast("Choose a task from the one-click operations panel")}
      />

      <div className="data-notice" role="note">
        <Sparkles aria-hidden="true" size={17} />
        <span><strong>Archive-backed prototype:</strong> content is real; availability, analytics, POS, and customer states remain demonstrations.</span>
      </div>

      <section className="metric-grid" aria-label="Demo business signals">
        <article className="metric-card metric-card--dark">
          <div><span>Photographs live</span><ImageIcon aria-hidden="true" size={19} /></div>
          <strong>{publicMedia.photographs}</strong>
          <p>on the public pages, curated from 447 archive frames</p>
        </article>
        <article className="metric-card">
          <div><span>Silent clips</span><MoreHorizontal aria-hidden="true" size={19} /></div>
          <strong>{publicMedia.clips}</strong>
          <p>autoplaying, muted, no audio track</p>
        </article>
        <article className="metric-card">
          <div><span>Menu records</span><Coffee aria-hidden="true" size={19} /></div>
          <strong>{brandMenuItems.length}</strong>
          <p>source-backed records imported</p>
        </article>
        <article className="metric-card">
          <div><span>Branches</span><MapPinned aria-hidden="true" size={19} /></div>
          <strong>{brandLocations.length}</strong>
          <p>hours transcribed from official media</p>
        </article>
        <article className="metric-card">
          <div><span>Team named</span><Users aria-hidden="true" size={19} /></div>
          <strong>{team.length}</strong>
          <p>from staff award certificates</p>
        </article>
        <article className="metric-card metric-card--accent">
          <div><span>Archive moments</span><CalendarDays aria-hidden="true" size={19} /></div>
          <strong>{archiveMoments.length}</strong>
          <p>music, games, and pop-ups staged</p>
        </article>
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-panel rhythm-panel" aria-labelledby="rhythm-title">
          <div className="panel-heading">
            <div>
              <span>Imported archive</span>
              <h2 id="rhythm-title">Official media by month</h2>
            </div>
            <button type="button" onClick={() => onToast("Showing Sep 2025 through Aug 2026 from the supplied archive")}>12 months <ChevronDown aria-hidden="true" size={15} /></button>
          </div>
          <div className="rhythm-chart" aria-label="Official media volume peaked in May 2026 in the supplied archive">
            {archiveBars.map((height, index) => (
              <div className="rhythm-chart__bar" key={index}>
                <span style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
          <div className="rhythm-labels" aria-hidden="true">
            <span>Sep ’25</span><span>Dec</span><span>Mar ’26</span><span>Jun</span><span>Aug</span>
          </div>
          <p className="sr-only">
            Imported asset counts by month: 24, 57, 22, 42, 22, 50, 80, 41, 86, 76, 43, and 19.
          </p>
        </section>

        <section className="admin-panel quick-panel" aria-labelledby="quick-title">
          <div className="panel-heading">
            <div>
              <span>One-click operations</span>
              <h2 id="quick-title">Do the next thing</h2>
            </div>
          </div>
          <button type="button" onClick={() => onNavigate("menu")}>
            <span className="quick-icon quick-icon--coffee"><Coffee aria-hidden="true" size={20} /></span>
            <div><strong>Update availability</strong><small>Menu · both branches</small></div>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
          <button type="button" onClick={() => onNavigate("events")}>
            <span className="quick-icon quick-icon--event"><CalendarDays aria-hidden="true" size={20} /></span>
            <div><strong>Stage an event</strong><small>Draft before publishing</small></div>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
          <button type="button" onClick={() => onNavigate("media")}>
            <span className="quick-icon quick-icon--media"><ImageIcon aria-hidden="true" size={20} /></span>
            <div><strong>Review imported media</strong><small>Source + publish date visible</small></div>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </section>

        <section className="admin-panel branches-panel" aria-labelledby="branches-title">
          <div className="panel-heading">
            <div>
              <span>Location configuration</span>
              <h2 id="branches-title">Two chapters, one view</h2>
            </div>
            <button type="button" onClick={() => onNavigate("locations")}>Manage</button>
          </div>
          <div className="branch-row">
            <span className="branch-monogram">CU</span>
            <div><strong>Cunupia</strong><small>Published schedule imported</small></div>
            <span className="status status--approved">Imported</span>
          </div>
          <div className="branch-row">
            <span className="branch-monogram branch-monogram--orange">CS</span>
            <div><strong>Carlos Street</strong><small>Published schedule imported</small></div>
            <span className="status status--approved">Imported</span>
          </div>
        </section>
      </div>
    </>
  );
}

function MenuView({ menu, onToggle, onToast }: { menu: MenuItem[]; onToggle: (id: number) => void; onToast: (message: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="Menu operations"
        title="What is available?"
        copy="Branch-level availability stays separate from the core product record."
        action="Add product"
        onAction={() => onToast("Product creation opens after the verified menu schema is approved")}
      />
      <div className="data-notice" role="note">
        <Sparkles aria-hidden="true" size={17} />
        <span>Product names come from official media. Availability is still a demo because no POS or live stock is connected.</span>
      </div>
      <section className="admin-panel menu-table-panel" aria-labelledby="menu-table-title">
        <div className="table-toolbar">
          <div>
            <span>Imported catalog</span>
            <h2 id="menu-table-title">Menu items</h2>
          </div>
          <div className="table-toolbar__actions">
            <button type="button" onClick={() => onToast("Search is represented here as a production interaction") }><Search aria-hidden="true" size={17} /> Search</button>
            <button type="button" onClick={() => onToast("All sample categories are already visible")}>All categories <ChevronDown aria-hidden="true" size={15} /></button>
          </div>
        </div>
        <div className="menu-table" role="table" aria-label="Concept menu availability">
          <div className="menu-table__head" role="row">
            <span role="columnheader">Item</span>
            <span role="columnheader">Category</span>
            <span role="columnheader">Source</span>
            <span role="columnheader">Availability</span>
          </div>
          {menu.map((item) => (
            <div className="menu-table__row" role="row" key={item.id}>
              <div className="menu-table__product" role="cell">
                <span><Coffee aria-hidden="true" size={18} /></span>
                <strong>{item.name}</strong>
              </div>
              <span role="cell">{item.category}</span>
              <span role="cell">{item.note}</span>
              <div role="cell" className="availability-cell">
                <span>{item.available ? "Available" : "Sold out"}</span>
                <button
                  className={`switch ${item.available ? "switch--on" : ""}`}
                  type="button"
                  role="switch"
                  aria-checked={item.available}
                  aria-label={`Mark ${item.name} ${item.available ? "sold out" : "available"}`}
                  onClick={() => onToggle(item.id)}
                >
                  <span />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function LocationsView({ onToast }: { onToast: (message: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="Location operations"
        title="Keep every visit truthful."
        copy="Normal hours, exceptions, pickup status, notices, and branch media stay distinct."
        action="Add exception"
        onAction={() => onToast("A date-specific exception would override the imported normal schedule")}
      />
      <div className="location-admin-grid">
        {[
          { code: "CU", name: "Cunupia", label: "Original location", hours: "Mon–Fri 6–7:30 · Weekends 7–7" },
          { code: "CS", name: "Carlos Street", label: "Ariapita", hours: "Mon–Thu 5:30–8 · Fri 5:30–9 · Weekends 7–9" },
        ].map((location, index) => (
          <article className="admin-panel location-admin-card" key={location.name}>
            <div className="location-admin-card__header">
              <span className={index === 0 ? "branch-monogram" : "branch-monogram branch-monogram--orange"}>{location.code}</span>
              <button type="button" aria-label={`More actions for ${location.name}`} onClick={() => onToast(`${location.name} actions are staged for discovery`)}><MoreHorizontal aria-hidden="true" size={20} /></button>
            </div>
            <span>{location.label}</span>
            <h2>{location.name}</h2>
            <div className="connection-state">
              <span />
              <div><strong>Published hours imported</strong><small>{location.hours}</small></div>
            </div>
            <dl>
              <div><dt>POS mapping</dt><dd>Not connected</dd></div>
              <div><dt>Source record</dt><dd>Official post · 18 May</dd></div>
              <div><dt>Branch media</dt><dd>Official archive</dd></div>
            </dl>
            <button className="admin-secondary-button" type="button" onClick={() => onToast(`${location.name} schedule is ready for staff confirmation`)}>Review branch <ArrowRight aria-hidden="true" size={17} /></button>
          </article>
        ))}
      </div>
    </>
  );
}

function EventsView({ onToast }: { onToast: (message: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="Event operations"
        title="Turn a post into a destination."
        copy="Draft, schedule, publish, collect interest, and preserve the recap in one workflow."
        action="Create event"
        onAction={() => onToast("Future events stay drafts until a real date and program are approved")}
      />
      <section className="admin-panel events-empty" aria-labelledby="events-empty-title">
        <Link className="events-empty__art" href="/club/get-down" aria-label="Open the Get Down public archive record">
          <Image src="/media/real/get-down-poster.jpg" alt="Get Down music series poster" fill sizes="320px" />
        </Link>
        <div>
          <span className="status status--approved">Archive record found</span>
          <h2 id="events-empty-title">Import what happened. Draft what happens next.</h2>
          <p>The Get Down poster and other community moments can become an archive now. Future listings still require a verified date, branch, program, and RSVP route.</p>
          <button className="admin-primary-button" type="button" onClick={() => onToast("Get Down staged as an archive record—not a future event")}><Plus aria-hidden="true" size={18} /> Import archive record</button>
        </div>
      </section>
    </>
  );
}

/**
 * Team — the same roster the /story page renders.
 *
 * The consent column is the point of having this view at all: every name on the
 * public page came off a certificate in a public post, which is not the same as
 * someone agreeing to appear on the business's website. This is where that gets
 * tracked before launch, one person at a time.
 */
function TeamView({ onToast }: { onToast: (message: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="Team"
        title="Eleven names, all sourced."
        copy="Every name and award below is read off a staff certificate in one of the shop's own public posts — nothing here is invented. Each still needs the person's sign-off before the site goes live."
        action="Export roster"
        onAction={() => onToast("Roster export connects after the CMS is chosen")}
      />
      <div className="media-admin-grid">
        {team.map((member) => (
          <article className="admin-panel media-tile" key={member.name}>
            <button
              className="media-tile__image"
              type="button"
              onClick={() => onToast(`${member.name} — consent not yet recorded`)}
              aria-label={`Review ${member.name}`}
            >
              <Image src={member.image} alt="" fill sizes="(max-width: 800px) 50vw, 22vw" />
              {/* status--review, not a new class: the three status styles here
                  are an existing set, and "awaiting a decision" is exactly what
                  review already means. */}
              <span className="status status--review">
                <CircleHelp aria-hidden="true" size={13} /> Consent pending
              </span>
            </button>
            <div className="media-tile__meta">
              <strong>{member.name}</strong>
              <span>{member.award}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function MediaView({ onToast }: { onToast: (message: string) => void }) {
  // Drawn from the same arrays the public gallery renders, so the library shows
  // what is actually on the site. It used to be four hardcoded filenames, which
  // meant the "media library" and the website could drift apart indefinitely.
  const assets = useMemo(() => {
    const fromGroups = archiveGroups.flatMap((group) =>
      group.shots.slice(0, 6).map((shot) => ({
        src: shot.image,
        title: shot.caption ?? group.title,
        published: group.title,
        ratio: shot.span === "feature" || shot.span === "wide" ? "media-tile--wide" : "",
      })),
    );
    return fromGroups.slice(0, 24);
  }, []);
  return (
    <>
      <PageIntro
        eyebrow="Media library"
        title="Know what can ship."
        copy={`${publicMedia.photographs} photographs and ${publicMedia.clips} silent clips are live across the site — ${publicMedia.strip} in the home rail, ${publicMedia.archive} in the archive, the rest on the menu, locations, club and story pages. Everything below is on a public page right now.`}
        action="Upload asset"
        onAction={() => onToast("Production uploads connect through Cloudinary after approval")}
      />
      <div className="media-admin-grid">
        {assets.map((asset) => (
          <article className={`admin-panel media-tile ${asset.ratio}`} key={asset.title}>
            <button className="media-tile__image" type="button" onClick={() => onToast(`${asset.title} source record selected`)} aria-label={`Inspect ${asset.title}`}>
              <Image src={asset.src} alt="" fill sizes="(max-width: 800px) 100vw, 40vw" />
              <span className="status status--approved"><Check aria-hidden="true" size={13} /> Source matched</span>
            </button>
            <div className="media-tile__meta">
              <div><strong>{asset.title}</strong><span>Official public archive</span></div>
              <button type="button" aria-label={`More actions for ${asset.title}`} onClick={() => onToast(`${asset.title} is linked to its source record`)}><MoreHorizontal aria-hidden="true" size={19} /></button>
            </div>
            <dl>
              <div><dt>Source</dt><dd>@5amclubcoffee</dd></div>
              <div><dt>Published</dt><dd>{asset.published}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}
