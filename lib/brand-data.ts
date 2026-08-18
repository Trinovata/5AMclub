export type MenuCategory = "Breakfast" | "Summer menu";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  image: string;
  imageAlt: string;
  serviceNote: string;
  published: string;
  accent: "orange" | "gold" | "matcha" | "pink";
};

export const menuItems: MenuItem[] = [
  {
    id: "egg-boss",
    name: "Egg Boss Sandwich",
    category: "Breakfast",
    description:
      "Buttered sourdough with two soft scrambled eggs, pepper jack cheese, sweet garlic aioli, and turkey bacon.",
    image: "/media/real/egg-boss-toastie.jpg",
    imageAlt: "Egg Boss breakfast sandwich on toasted sourdough",
    serviceNote: "Friday–Tuesday · 7AM–11AM · Carlos Street only",
    published: "12 Aug 2026",
    accent: "orange",
  },
  {
    id: "teriyaki-tofu-wrap",
    name: "Teriyaki Tofu Spinach Wrap",
    category: "Breakfast",
    description:
      "Spinach wrap with lettuce, tomato, guacamole, teriyaki tofu, and balsamic reduction.",
    image: "/media/real/tofu-wrap-closeup.jpg",
    imageAlt: "Teriyaki tofu spinach wrap cut open to show its filling",
    serviceNote: "Friday–Tuesday · 7AM–11AM · Carlos Street only",
    published: "14 Aug 2026",
    accent: "matcha",
  },
  {
    id: "pancakes-eggs",
    name: "Pancake & Eggs Your Way",
    category: "Breakfast",
    description: "Fluffy pancakes served with eggs your way.",
    image: "/media/real/pancakes-and-eggs.jpg",
    imageAlt: "Stack of pancakes with eggs and breakfast sides",
    serviceNote: "Friday–Tuesday · 7AM–11AM · Carlos Street only",
    published: "12 Aug 2026",
    accent: "gold",
  },
  {
    id: "chicken-waffles",
    name: "Chicken & Waffles",
    category: "Breakfast",
    description: "Waffles with mildly spiced chicken tenders and hot honey.",
    image: "/media/real/chicken-waffles-coffee.jpg",
    imageAlt: "Chicken and waffles beside a 5AM Club Coffee cup",
    serviceNote: "Friday–Tuesday · 7AM–11AM · Carlos Street only",
    published: "14 Aug 2026",
    accent: "gold",
  },
  {
    id: "banana-pudding-latte",
    name: "Banana Pudding Latte",
    category: "Summer menu",
    description: "A featured latte from the June 2026 summer menu.",
    image: "/media/real/banana-pudding-latte.jpg",
    imageAlt: "Banana Pudding Latte from the 5AM summer menu",
    serviceNote: "Summer menu · availability to be confirmed in store",
    published: "25 Jun 2026",
    accent: "gold",
  },
  {
    id: "mango-sticky-rice-matcha",
    name: "Mango Sticky Rice Matcha",
    category: "Summer menu",
    description: "A layered mango matcha drink with sago pearls.",
    image: "/media/real/mango-sticky-rice-matcha.jpg",
    imageAlt: "Layered Mango Sticky Rice Matcha with sago pearls",
    serviceNote: "Summer menu · availability to be confirmed in store",
    published: "25 Jun 2026",
    accent: "matcha",
  },
  {
    id: "island-matcha",
    name: "Island Matcha",
    category: "Summer menu",
    description: "A coconut, matcha-based summer special.",
    image: "/media/real/island-matcha.jpg",
    imageAlt: "Green Island Matcha summer drink",
    serviceNote: "Summer menu · availability to be confirmed in store",
    published: "25 Jun 2026",
    accent: "matcha",
  },
  {
    id: "pineapple-passionfruit",
    name: "Pineapple Passionfruit Quencher",
    category: "Summer menu",
    description: "A pineapple and passionfruit quencher from the summer drop.",
    image: "/media/real/pineapple-passionfruit-quencher.jpg",
    imageAlt: "Pineapple Passionfruit Quencher over ice",
    serviceNote: "Summer menu · availability to be confirmed in store",
    published: "25 Jun 2026",
    accent: "pink",
  },
];

export type DayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type LocationRecord = {
  id: "carlos" | "cunupia";
  name: string;
  shortName: string;
  address: string;
  image: string;
  imageAlt: string;
  note: string;
  directions: string;
  hours: Array<{ label: string; value: string }>;
  schedule: Record<DayKey, [number, number]>;
  feature?: string;
};

export const locations: LocationRecord[] = [
  {
    id: "carlos",
    name: "Carlos Street",
    shortName: "Ariapita",
    address: "Carlos Street, Ariapita Avenue, Port of Spain",
    image: "/media/real/carlos-storefront.jpg",
    imageAlt: "5AM Club Coffee storefront on Carlos Street",
    note: "The city chapter: breakfast, coffee, conversation, and the Club after dark.",
    directions:
      "https://www.google.com/maps/search/?api=1&query=5AM+Club+Coffee+Carlos+Street+Ariapita+Avenue+Trinidad",
    hours: [
      { label: "Monday–Thursday", value: "5:30AM–8PM" },
      { label: "Friday", value: "5:30AM–9PM" },
      { label: "Saturday–Sunday", value: "7AM–9PM" },
    ],
    schedule: {
      sun: [420, 1260],
      mon: [330, 1200],
      tue: [330, 1200],
      wed: [330, 1200],
      thu: [330, 1200],
      fri: [330, 1260],
      sat: [420, 1260],
    },
    feature: "Daily breakfast runs Friday–Tuesday, 7AM–11AM.",
  },
  {
    id: "cunupia",
    name: "Monroe Road",
    shortName: "Cunupia",
    address: "Railway Station Road, Cunupia",
    image: "/media/real/cunupia-interior.jpg",
    imageAlt: "Interior of the original 5AM Club Coffee in Cunupia",
    note: "The original chapter—the first physical extension of Kyle's creator-led brand.",
    directions:
      "https://www.google.com/maps/search/?api=1&query=5AM+Club+Coffee+Railway+Station+Road+Cunupia+Trinidad",
    hours: [
      { label: "Monday–Friday", value: "6AM–7:30PM" },
      { label: "Saturday–Sunday", value: "7AM–7PM" },
    ],
    schedule: {
      sun: [420, 1140],
      mon: [360, 1170],
      tue: [360, 1170],
      wed: [360, 1170],
      thu: [360, 1170],
      fri: [360, 1170],
      sat: [420, 1140],
    },
  },
];

export const archiveMoments = [
  {
    id: "get-down",
    title: "Get Down",
    kind: "Music series",
    published: "1 May 2026",
    description: "An official 5AM music-series poster, preserved here as an archive record rather than promoted as a future event.",
    image: "/media/real/get-down-poster.jpg",
    imageAlt: "Get Down music series poster from 5AM Club Coffee",
  },
  {
    id: "jazz",
    title: "A room for live music",
    kind: "Jazz archive",
    published: "15 May 2026",
    description: "An official archive image of vocalists performing inside the café—the clearest evidence of the room becoming a live culture space.",
    image: "/media/real/jazz-vocalists.jpg",
    imageAlt: "Vocalists performing for a crowd inside 5AM Club Coffee",
  },
  {
    id: "game-night",
    title: "Game night",
    kind: "Community archive",
    published: "17 Jun 2026",
    description: "An official game-night post showing the social programming that sits alongside coffee and food.",
    image: "/media/real/game-night.jpg",
    imageAlt: "Game night table at 5AM Club Coffee",
  },
  {
    id: "pop-up",
    title: "5AM on the move",
    kind: "Pop-up archive",
    published: "28 Jun 2026",
    description: "The 5AM cart outside the café, showing how the brand can travel through markets and pop-up collaborations.",
    image: "/media/real/night-market-cart.jpg",
    imageAlt: "5AM Club Coffee cart at a night market pop-up",
  },
] as const;

export type RoomShot = {
  image: string;
  imageAlt: string;
  caption: string;
  /** Portrait frames crop badly in a wide banner; the strip keeps them 3:4. */
  feature?: boolean;
};

/**
 * "In the room" — the swipeable photo strip.
 *
 * Every frame is a real photograph from the public @5amclubcoffee archive,
 * selected by visual review rather than by recency or file size. Deliberately
 * excluded: the December staff shoot (licensed character art in frame), the
 * hiring graphics (they carry a contact address), and plates served on
 * third-party branded newsprint.
 *
 * Captions describe only what is visible. No price, hour, or claim is asserted
 * here — those live in the sourced menu and location records.
 */
export const roomShots: RoomShot[] = [
  {
    image: "/media/real/night-market-crowd-dancing.jpg",
    imageAlt: "A dancer at a night market balances a 5AM Club cup on her head, hands raised, under warm string lights",
    caption: "Night market, hands up",
    feature: true,
  },
  {
    image: "/media/real/cart-front-staff-queue.jpg",
    imageAlt: "The 5AM Club cart seen from the front, logo panel lit, three staff pouring behind it while customers wait",
    caption: "The cart, from the queue",
    feature: true,
  },
  {
    image: "/media/real/baristas-loft-interior.jpg",
    imageAlt: "Two baristas stand back to back and smiling inside the loft, spiral staircase and plants behind them",
    caption: "Upstairs, mid-shift",
    feature: true,
  },
  {
    image: "/media/real/customers-matcha-event.jpg",
    imageAlt: "Two customers smile to camera at an outdoor event, each holding a branded 5AM matcha",
    caption: "Two matchas, one afternoon",
  },
  {
    image: "/media/real/syrup-pour-chicken-waffles.jpg",
    imageAlt: "Syrup pours mid-air onto strawberry waffles and chicken tenders, café window and rattan chairs behind",
    caption: "The pour",
    feature: true,
  },
  {
    image: "/media/real/matcha-in-hand-golden-hour.jpg",
    imageAlt: "A customer films on her phone while holding a branded matcha in golden-hour light",
    caption: "Golden hour, filmed",
  },
  {
    image: "/media/real/staff-portrait-golden.jpg",
    imageAlt: "A 5AM staff member waves a gloved hand, a flower in her hair, lit by warm evening light",
    caption: "A wave from the counter",
  },
  {
    image: "/media/real/matcha-chalkboard-cart.jpg",
    imageAlt: "A lantern-lit cart counter with a chalkboard matcha menu, syrup pumps and glass carafes",
    caption: "Chalk and lantern light",
  },
  {
    image: "/media/real/iced-coffee-brownie-to-go.jpg",
    imageAlt: "A hand holds a branded 5AM iced coffee and a brownie in a kraft carrier on a sunlit street",
    caption: "Taken to go",
  },
  {
    image: "/media/real/latte-art-breakfast-table.jpg",
    imageAlt: "A rosetta latte in a terracotta cup with waffles and chicken softly out of focus behind",
    caption: "Rosetta, then breakfast",
  },
  {
    image: "/media/real/iced-latte-tropical-foliage.jpg",
    imageAlt: "An iced latte in a branded glass can beside a shortbread biscuit against tropical ferns",
    caption: "Glass, ferns, ice",
  },
  {
    image: "/media/real/buffalo-chicken-toastie.jpg",
    imageAlt: "A close view of a grilled buffalo chicken toastie with glossy sauce, held in a gloved hand",
    caption: "Buffalo, grilled",
  },
  {
    image: "/media/real/club-sandwich-closeup.jpg",
    imageAlt: "A close view of a club sandwich on ciabatta with turkey, lettuce, tomato and pickle",
    caption: "Ciabatta, stacked",
  },
  {
    image: "/media/real/cinnamon-roll-cream-cheese.jpg",
    imageAlt: "A cinnamon roll with cream cheese frosting on a dark green plate, pastries blurred in front",
    caption: "Cinnamon, iced",
  },
  {
    image: "/media/real/pancakes-eggs-window-light.jpg",
    imageAlt: "Pancakes with berry compote and two fried eggs beside a syrup cup in window light",
    caption: "Pancakes, window seat",
  },
];

export const instagramUrl = "https://www.instagram.com/5amclubcoffee/";
// The connected preview browser applies this accessibility annotation before React hydrates.
// Keeping it in the rendered markup avoids a dev-only hydration overlay; brand CSS controls the visual color.
export const instagramHydrationStyle = {
  color: "rgb(206, 167, 212)",
  textDecoration: "underline",
} as const;
export const guardianUrl =
  "https://www.guardian.co.tt/business/young-content-creators-turn-entrepreneurs-6.2.2082723.ccea75cf2d";
