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
