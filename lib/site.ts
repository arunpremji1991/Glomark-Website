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

// sameAs profiles for Organization schema. Placeholder handles — swap for the
// agency's real profiles before launch (see README).
export const SOCIAL = [
  { name: "Instagram", href: "https://instagram.com/glomark.om" },
  { name: "Facebook", href: "https://facebook.com/glomark.om" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/glomark-om" },
  { name: "YouTube", href: "https://www.youtube.com/@glomark.om" },
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
