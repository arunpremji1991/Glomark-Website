// Locale-neutral site configuration. Localized strings live in lib/content/*.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://glomark.om"
).replace(/\/$/, "");

export const CONTACT = {
  phone: "+968 9101 8000",
  phoneHref: "tel:+96891018000",
  whatsappHref: "https://wa.me/96891018000",
  email: "hello@glomark.om",
  emailHref: "mailto:hello@glomark.om",
  addressLine: "An Nahdah St, Salalah, Oman",
  street: "An Nahdah Street",
  city: "Salalah",
  region: "Dhofar",
  country: "Oman",
  countryCode: "OM",
  // Approx. Salalah centre — used for the map embed and geo schema.
  geo: { lat: 17.0151, lng: 54.0924 },
  mapEmbed:
    "https://www.google.com/maps?q=An+Nahdah+Street,+Salalah,+Oman&output=embed",
} as const;

// sameAs profiles for Organization schema — the agency's real profiles.
export const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/glomark.om/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/glomark-om/" },
] as const;

// Canonical service order + stable slugs (locale-neutral).
export const SERVICE_SLUGS = [
  "media-production",
  "events-planning",
  "live-broadcasting",
  "digital-marketing",
  "branding",
  "website-development",
  "social-media-management",
  "application-development",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

// Canonical blog post order + stable slugs (locale-neutral).
export const BLOG_SLUGS = [
  "bilingual-branding-in-oman",
  "anatomy-of-a-live-broadcast",
  "eight-shots-every-brand-film-needs",
  "social-content-that-earns-attention",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

// Canonical portfolio client order + stable slugs (locale-neutral). Each
// client's logo lives at /media/clients/<slug>.webp (see README).
export const CLIENT_SLUGS = [
  "reventure",
  "firstexchange",
  "voice-of-the-season",
  "do-events",
  "do-chocolate",
  "do-cafe",
  "ventura",
  "almoftah",
] as const;

export type ClientSlug = (typeof CLIENT_SLUGS)[number];

// Which real client case studies to surface on each service page's "see it
// in action" section — only clients whose `services` tags (lib/content/*)
// actually include that discipline. Two services (live-broadcasting,
// application-development) have no matching client yet; omit rather than
// force an unrelated case study, same principle as CLIENT_GALLERY above.
export const SERVICE_TO_CLIENTS: Record<ServiceSlug, ClientSlug[]> = {
  "media-production": ["almoftah", "voice-of-the-season", "do-cafe"],
  "events-planning": ["voice-of-the-season", "do-events"],
  "live-broadcasting": [],
  "digital-marketing": ["reventure", "firstexchange"],
  branding: ["reventure", "do-chocolate", "ventura"],
  "website-development": ["reventure", "do-chocolate", "ventura"],
  "social-media-management": ["do-cafe", "ventura", "reventure"],
  "application-development": [],
};

// External profile/website for each client — locale-neutral.
export const CLIENT_LINKS: Record<ClientSlug, string> = {
  reventure: "https://www.instagram.com/reventure.om/",
  firstexchange: "https://firstexchangeoman.com/",
  "voice-of-the-season": "https://dhofarcenter.com/voice-of-the-season/",
  "do-events": "https://www.instagram.com/do.events_oman/",
  "do-chocolate": "https://www.instagram.com/do_chocolate/",
  "do-cafe": "https://www.instagram.com/docafe.om/",
  ventura: "https://www.instagram.com/ventura.sll/",
  almoftah: "https://www.almoftah.om/",
};

export interface GalleryItem {
  file: string; // filename under /media/clients/gallery/
  href: string; // link to the original post
  isVideo: boolean;
}

// Photo/video samples pulled from each client's own feed — real content
// Glomark produced or published for them, not stock art. Voice of the
// Season has no gallery yet (no client-provided event photography at time
// of writing); leave its array empty rather than filling with mockup art.
export const CLIENT_GALLERY: Record<ClientSlug, GalleryItem[]> = {
  reventure: [
    { file: "reventure-1.webp", href: "https://www.instagram.com/reventure.om/p/DP4g6ihCG38/", isVideo: false },
    { file: "reventure-2.webp", href: "https://www.instagram.com/reventure.om/p/DcBvsvwiFdz/", isVideo: false },
    { file: "reventure-3.webp", href: "https://www.instagram.com/reventure.om/p/Db-PVQPCF1A/", isVideo: false },
    { file: "reventure-4.webp", href: "https://www.instagram.com/reventure.om/reel/Db8j9gkoNGr/", isVideo: true },
    { file: "reventure-5.webp", href: "https://www.instagram.com/reventure.om/p/Db49Mm_iL7B/", isVideo: false },
    { file: "reventure-6.webp", href: "https://www.instagram.com/reventure.om/reel/Db2icYEIaaz/", isVideo: true },
  ],
  firstexchange: [
    { file: "firstexchange-1.webp", href: "https://firstexchangeoman.com/", isVideo: false },
    { file: "firstexchange-2.webp", href: "https://firstexchangeoman.com/", isVideo: false },
  ],
  "voice-of-the-season": [],
  "do-events": [
    { file: "do-events-1.webp", href: "https://www.instagram.com/do.events_oman/p/Db3KmPejC9K/", isVideo: false },
    { file: "do-events-2.webp", href: "https://www.instagram.com/do.events_oman/reel/Db3K-AQsSys/", isVideo: true },
    { file: "do-events-3.webp", href: "https://www.instagram.com/do.events_oman/p/Db3KCqijGSn/", isVideo: false },
    { file: "do-events-4.webp", href: "https://www.instagram.com/do.events_oman/p/DbqKgDGjKiR/", isVideo: false },
    { file: "do-events-5.webp", href: "https://www.instagram.com/do.events_oman/reel/DbiOAXfMEN_/", isVideo: true },
    { file: "do-events-6.webp", href: "https://www.instagram.com/do.events_oman/p/DbpudImDC4T/", isVideo: false },
  ],
  "do-chocolate": [
    { file: "do-chocolate-1.webp", href: "https://www.instagram.com/do_chocolate/p/DbsLUjiuiy4/", isVideo: false },
    { file: "do-chocolate-2.webp", href: "https://www.instagram.com/do_chocolate/p/DbsLNh_OqNS/", isVideo: false },
    { file: "do-chocolate-3.webp", href: "https://www.instagram.com/do_chocolate/p/DbsLBseOjF7/", isVideo: false },
    { file: "do-chocolate-4.webp", href: "https://www.instagram.com/do_chocolate/p/Da_FOeIO35H/", isVideo: false },
    { file: "do-chocolate-5.webp", href: "https://www.instagram.com/do_chocolate/p/Da--sOYOJf3/", isVideo: false },
    { file: "do-chocolate-6.webp", href: "https://www.instagram.com/do_chocolate/p/Da-_Au3uSwg/", isVideo: false },
  ],
  "do-cafe": [
    { file: "do-cafe-1.webp", href: "https://www.instagram.com/docafe.om/reel/DbsL3iKuXW3/", isVideo: true },
    { file: "do-cafe-2.webp", href: "https://www.instagram.com/docafe.om/reel/DbVGz-tOoOZ/", isVideo: true },
    { file: "do-cafe-3.webp", href: "https://www.instagram.com/docafe.om/reel/DbTl9Adu9dw/", isVideo: true },
    { file: "do-cafe-4.webp", href: "https://www.instagram.com/docafe.om/reel/DbTdTkhq-cX/", isVideo: true },
    { file: "do-cafe-5.webp", href: "https://www.instagram.com/docafe.om/p/DbDwJHKoLGN/", isVideo: false },
    { file: "do-cafe-6.webp", href: "https://www.instagram.com/docafe.om/p/DbDvrFBoQRC/", isVideo: false },
  ],
  ventura: [
    { file: "ventura-1.webp", href: "https://www.instagram.com/ventura.sll/p/Dbwb7TuMjGw/", isVideo: false },
    { file: "ventura-2.webp", href: "https://www.instagram.com/ventura.sll/reel/DbiLAKPo3tN/", isVideo: true },
    { file: "ventura-3.webp", href: "https://www.instagram.com/ventura.sll/p/Dbbdmv4CN2Q/", isVideo: false },
    { file: "ventura-4.webp", href: "https://www.instagram.com/ventura.sll/reel/DbLyxx_IdIg/", isVideo: true },
  ],
  almoftah: [
    { file: "almoftah-1.webp", href: "https://www.instagram.com/almoftah_realestate/p/Db5l5BuDYMs/", isVideo: false },
    { file: "almoftah-2.webp", href: "https://www.instagram.com/almoftah_realestate/p/DbpuhR9Co2g/", isVideo: false },
  ],
};
