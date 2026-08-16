# 5AM Club Coffee — pre-outreach concept

A source-backed, multi-route prospect prototype for 5AM Club Coffee. The public experience uses real media from the supplied public Instagram archive and an official-logo extraction from that archive; the operational dashboard remains a clearly labeled prototype.

## Routes

- `/` — media-led homepage with switchable morning, breakfast, and Club scenes
- `/menu` — searchable/filterable source-backed menu with quick-view drawers
- `/menu/[slug]` — shareable source record for each verified plate or drink
- `/locations` — branch switcher, Trinidad-time open status, published hours, and directions
- `/locations/[slug]` — branch record with exact schedule, map route, and zoomable gallery
- `/club` — indexed music/game/pop-up archive with keyboard-operable lightbox
- `/club/[slug]` — dated archive record with its live source and next-record path
- `/story` — sourced Kyle Mark / 5AM narrative
- `/admin` — interactive operations concept using imported public content plus labeled demo state
- unmatched routes — custom `04:59` recovery page

## Content basis

- 818 supplied media assets audited: 473 images and 345 videos
- 769 assets attributable to the official `@5amclubcoffee` account
- 456 post groups spanning February 2024 to August 2026
- August 2026 breakfast launch, June 2026 summer menu, May 2026 published hours
- Founder context from the Trinidad Guardian

The export contains no caption or JSON sidecars. Product copy is therefore limited to readable on-image text, burned-in video text, and the cited Guardian profile. No price, future event, live inventory, phone number, or ordering capability is invented.

See [docs/instagram-media-audit.md](docs/instagram-media-audit.md), [docs/refinement-rationale.md](docs/refinement-rationale.md), and [docs/production-route.md](docs/production-route.md).

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. The admin concept is at `http://localhost:3000/admin`.

## Verify

```powershell
npm run verify
```

## Media audit

The local audit can be regenerated from the supplied download folder:

```powershell
python scripts/audit_instagram.py "C:\Users\Gregg\Downloads\Instagram" ".media-audit"
```

`.media-audit/` is intentionally ignored because it contains hundreds of derived thumbnails and storyboards. Curated web-ready source selections live in `public/media/real/`.

## Production boundary

This is not a live 5AM service. Before public launch, staff must confirm the current menu and hours, provide media permissions, select a POS/payment route, and assume ownership of the CMS records. Ordering, rewards, analytics, and customer data are not connected.
"# 5AMclub" 
