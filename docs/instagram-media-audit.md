# Instagram media audit

Audit date: 15 August 2026  
Supplied source: `C:\Users\Gregg\Downloads\Instagram`

## Inventory

| Measure | Result |
|---|---:|
| Total assets | 818 |
| Images | 473 |
| Videos | 345 |
| Post groups | 456 |
| Official `5amclubcoffee` assets | 769 |
| Other creator/collaborator assets | 49 |
| Date range | 18 Feb 2024–14 Aug 2026 |
| Duplicate groups | 1 |
| Caption/JSON sidecars | 0 |

The audit script hashes every source, records account/post/timestamp metadata encoded in filenames, probes video dimensions/duration, extracts three-frame storyboards, and builds image/video contact sheets. Output is written to the ignored `.media-audit/` directory.

## What the archive actually says about the brand

The strongest pattern is not dawn minimalism. It is a warm, playful, creator-led Trinidadian culture brand with visible staff, crowded rooms, music, games, pop-ups, seasonal drops, and an active founder/community relationship.

The visual system visible in official posts combines:

- a bold custom 5AM logo;
- high-contrast editorial serif headlines;
- expressive calligraphic accents;
- direct, clean utility type;
- coffee brown, cream, orange-red, butter yellow, matcha green, and occasional pink.

The site maps that direction to Bodoni Moda, Archivo, and Allura. These are compatible implementation fonts, not a claim that they are the private official font files.

## Verified current content used by the prototype

### Breakfast launch

Official archive post: 12 August 2026. Follow-up product photography: 14 August 2026.

- Friday–Tuesday, 7AM–11AM
- Carlos Street / Ariapita Avenue only
- Egg Boss Sandwich
- Teriyaki Tofu Spinach Wrap
- Pancake & Eggs Your Way
- Chicken & Waffles

Ingredient descriptions in the menu UI are transcribed from the supplied official menu artwork.

### Summer menu

Official archive post: 25 June 2026.

- Banana Pudding Latte
- Mango Sticky Rice Matcha
- Island Matcha
- Pineapple Passionfruit Quencher

Availability is deliberately marked for in-store confirmation because the archive is not a live stock system.

### Published hours

Official archive post: 18 May 2026.

| Branch | Published hours |
|---|---|
| Carlos Street, Ariapita | Mon–Thu 5:30AM–8PM; Fri 5:30AM–9PM; Sat–Sun 7AM–9PM |
| Monroe Road, Cunupia | Mon–Fri 6AM–7:30PM; Sat–Sun 7AM–7PM |

The locations UI calculates open/closed state in `America/Port_of_Spain`, but explicitly labels the schedule by source date so stale data is not disguised as a live integration.

## Curated visual selections

| Web asset | Official publish date | Use |
|---|---|---|
| `chicken-waffles-coffee.jpg` | 14 Aug 2026 | Breakfast hero/card |
| `tofu-wrap-closeup.jpg` | 14 Aug 2026 | Menu product |
| `breakfast-launch.jpg` | 12 Aug 2026 | Homepage launch tile |
| `breakfast-menu.jpg` | 12 Aug 2026 | Menu evidence hero |
| `kyle-team.jpg` | 13 Jul 2026 | Founder/team story |
| `kyle-community.jpg` | 13 Jul 2026 | Homepage/community story |
| `summer-lineup.jpg` | 25 Jun 2026 | Summer menu/admin |
| `carlos-storefront.jpg` | 12 Jun 2026 | Locations |
| `carlos-packed-room.jpg` | 12 Jun 2026 | Community/after-hours |
| `published-hours.jpg` | 18 May 2026 | Transcription evidence |
| `jazz-vocalists.jpg` | 15 May 2026 | Club archive |
| `get-down-poster.jpg` | 1 May 2026 | Club archive/admin |
| `cunupia-interior.jpg` | 30 Apr 2024 | Original location |

Web videos are source-only transcodes with audio removed, H.264 delivery, `faststart`, and poster frames. No generated visual appears in the rebuilt public routes.

## Evidence gaps

- No caption export, so exact captions, tags, collaborator credits, and some event dates are unavailable.
- No price source suitable for publication.
- No live menu/stock source.
- No phone/contact records confirmed from supplied media.
- No media release or licensed master package; supplied public media is suitable for a private pre-outreach prototype, not automatic production publication.
- The extracted official logo is raster. Request vector SVG/AI/PDF brand masters before production.

## Sourced external context

The [Trinidad Guardian founder profile](https://www.guardian.co.tt/business/young-content-creators-turn-entrepreneurs-6.2.2082723.ccea75cf2d) identifies Kyle “Kyleboss” Mark, describes the original Cunupia café as a brand extension, records the European/Italian coffee-house influence, and notes expansion intent.

The [official Instagram profile](https://www.instagram.com/5amclubcoffee/) remains the public source surface. A production website should become the durable source of truth instead of scraping that feed.
