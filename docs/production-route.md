# Production route

The prototype proves the brand direction and public information architecture. Production should deepen it in controlled stages instead of mixing content, commerce, and POS uncertainty into one launch.

## Stage 0 — outreach package

Status: implemented in this prototype.

- source-backed public routes;
- real logo and public archive media;
- responsive editorial system;
- searchable/filterable menu;
- current-time location status from published schedules;
- indexed culture archive;
- durable product, branch, and culture-record routes;
- route transitions, interactive system map, image inspection, and custom 404 recovery;
- interactive admin concept;
- explicit provenance and prototype boundaries.

Outreach deliverable: private URL, short walkthrough, audit summary, and a focused request for brand masters, current menu/prices, permissions, branch contacts, and POS name.

## Stage 1 — truth layer

Build first after approval.

1. Add Payload + PostgreSQL.
2. Create `locations`, `hours`, `hourExceptions`, `menuItems`, `availability`, `events`, `stories`, and `mediaAssets` collections.
3. Import the eight source-backed menu records and both branches.
4. Replace the raster logo with official vector masters and license the chosen fonts.
5. Add draft/publish, revisions, branch-scoped roles, source metadata, rights metadata, and preview.
6. Make website HTML, open status, sitemap, metadata, and structured data read from the same records.

Launch gate: a branch manager can change hours, mark an item unavailable, replace an image, and publish an event without touching code.

## Stage 2 — owned audience

Can ship without ordering.

1. Event detail and RSVP flows.
2. Club story/article pages with video transcripts.
3. Email/SMS consent capture.
4. Campaign and source attribution.
5. PostHog/GA4 event taxonomy with consent handling.
6. Editorial dashboard for conversion and archive coverage.

Launch gate: 5AM can turn a social post into an owned page and measure visit/direction/RSVP intent.

## Stage 3 — transaction discovery

Do not code checkout before this stage resolves the operating system behind the counter.

1. Identify POS, catalog, modifiers, stock behavior, order statuses, refund path, and branch identifiers.
2. Evaluate Powertranz/WiPay merchant requirements and hosted-payment fallback.
3. Implement `POSAdapter` and `PaymentProvider` contracts.
4. Test idempotent orders, webhook replay, reconciliation, sold-out behavior, store closure, and payment failure.
5. Release pickup ordering behind a feature flag to one branch.

Launch gate: no duplicate charges/orders, staff can operate the queue, and reconciliation is documented.

## Stage 4 — membership and retention

Only after purchase identity can be reconciled reliably.

1. Customer authentication and consent model.
2. Immutable reward ledger.
3. QR/member code with textual fallback.
4. Purchase linkage through POS identifiers.
5. Offers, referrals, favorites, and event/member segments.
6. Support tooling and manual-adjustment audit trail.

Launch gate: every point accrual/redemption can be explained from ledger events.

## Stage 5 — media operations

1. Cloudinary-first DAM and derivative presets.
2. Direct browser uploads with validation.
3. Focal points and responsive crops.
4. Rights, creator, source, consent, allowed-channel, and expiry records.
5. Optional Mux path for a large editorial/event video library.
6. Archive import tooling tied to post/source identifiers.

Launch gate: every published asset has a known owner, source, approved use, and mobile derivative.

## Cross-stage gates

- WCAG keyboard, focus, contrast, and reduced-motion review.
- Representative iOS/Android, 910px, and desktop visual acceptance.
- LCP/INP/CLS budgets enforced in CI and field monitoring.
- Current visible data must match JSON-LD and metadata.
- Admin mutations audited by user, branch, timestamp, and before/after state.
- Production media rights confirmed; public availability alone is not treated as a license.
