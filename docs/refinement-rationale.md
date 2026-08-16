# Functional refinement rationale

This pass keeps the editorial, digital-magazine character while removing the main prototype weakness: media that looked important but behaved like decoration.

## Questions applied to every element

1. **Does it carry verified information?** If yes, it can become a durable record. If not, it stays supporting atmosphere.
2. **Where should a user expect it to lead?** The visible destination must match the subject of the image—not a generic homepage or social link.
3. **Does the interaction still make sense without hover?** Touch devices receive persistent action labels; hover only adds emphasis.
4. **Is motion communicating a change?** Route curtains, hero crossfades, drawers, zooms, and infographic state changes explain navigation or state. Decorative motion stays restrained.
5. **Can a keyboard user complete the same path?** Image actions use buttons, destination actions use links, focus is visible, overlays close with Escape, and hidden mobile navigation is inert.
6. **Would this claim survive outreach scrutiny?** Unverified prices, future events, ordering, live inventory, and customer data remain absent or explicitly labeled as prototype state.

## Destination architecture

| Surface | Primary action | Destination or state |
|---|---|---|
| Hero modes | Switch narrative state | Morning, breakfast, and After 5 media/copy |
| Homepage proof tiles | Open the corresponding chapter | Story, team/story, or Club archive |
| Homepage food cards | Open a durable item record | `/menu/[slug]` |
| Homepage branch cards | Open exact branch information | `/locations/[slug]` |
| Club poster and archive copy | Open a dated archive record | `/club/[slug]` |
| Menu card image/copy | Open item record | `/menu/[slug]` |
| Menu quick view | Compare without leaving the grid | Accessible side drawer |
| Location feature image | Open branch record | `/locations/[slug]` |
| Detail-page photograph | Inspect source visual | Image zoom dialog |
| System infographic node | Open its real product layer | Story, locations, menu, Club, or admin |
| Unknown URL | Recover intentionally | Branded 04:59 page with Home/Menu/Locations routes |

Links navigate; buttons change local state. That distinction makes the interface predictable and improves assistive-technology semantics.

## Motion hierarchy

- **Macro:** route curtain, hero media/copy crossfade, large editorial reveals.
- **Meso:** drawers, lightboxes, mobile navigation, infographic state changes.
- **Micro:** focus/hover underline, arrow shift, image scale, pressed state, persistent scroll progress.
- **Reduced motion:** route curtain, parallax, image drift, and reveal movement are removed or reduced to an immediate state.

Motion is intentionally excluded from directions, hours, prices, and admin controls where speed and certainty matter more than spectacle.

## Responsive rationale

- Desktop preserves asymmetry and multi-column editorial tension.
- Tablet keeps paired image/copy records, but moves navigation to the full-screen menu.
- Mobile becomes image-first for products and locations, with action labels always visible.
- The brand-system map changes from a spatial diagram to a linear route list under 440px; relationships remain understandable without tiny targets or crossing lines.
- Rich media never controls the only route to essential information.

## QA matrix

The implemented checks cover:

- all static and dynamic routes at 1440px, 910px, and 390px;
- horizontal overflow and Next.js runtime error overlays;
- menu filter/search data count, item links, and quick-view drawer;
- location record links, published schedules, direction URLs, zoomable galleries, and next-branch route;
- Club artifact lightbox navigation and full-record destinations;
- mobile menu paint order, link access, body scroll lock, inert closed state, and Escape close;
- image zoom open/close and focus return;
- custom 404 recovery links;
- lint, TypeScript, and production build through `npm run verify`.

## Deliberately unresolved before outreach

- official font files and vector logo masters;
- current prices and complete menu/catalog;
- media usage permission beyond this private prospect concept;
- future event schedule;
- POS, payment provider, ordering, inventory, loyalty, and customer-data ownership;
- production hosting and CMS ownership.

Those are discovery questions, not gaps to hide with invented prototype content.
