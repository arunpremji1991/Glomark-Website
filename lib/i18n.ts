import type { ServiceSlug, BlogSlug, ClientSlug } from "./site";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build a locale-aware path, e.g. localeHref("ar", "/services") -> "/ar/services". */
export function localeHref(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `/${locale}${clean}` || `/${locale}`;
}

// ---- Dictionary shape (both locales must satisfy this) -------------------

export interface ServiceContent {
  slug: ServiceSlug;
  title: string;
  tagline: string; // one-line promise
  summary: string; // short card description
  description: string[]; // full paragraphs for the service page
  deliverables: string[]; // bullet list of what's included
  keyword: string; // primary SEO keyword the page targets
  metaTitle: string;
  metaDescription: string;
}

export interface ClientCase {
  slug: ClientSlug;
  name: string;
  tagline: string; // one-line description of the client
  services: string[]; // tags shown on the card + detail page
  summary: string; // short card blurb
  scope: string[]; // "Scope of work" paragraphs
  approach: string[]; // "How we worked" paragraphs
  linkLabel: string; // e.g. "View on Instagram" / "Visit website"
  metaTitle: string;
  metaDescription: string;
}

export interface BlogPost {
  slug: BlogSlug;
  title: string;
  excerpt: string; // short teaser for cards
  body: string[]; // full paragraphs for the post page
  category: string; // ties back to a service, e.g. "Branding"
  date: string; // ISO date, e.g. "2026-06-02"
  readTime: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Dictionary {
  locale: Locale;
  dir: "ltr" | "rtl";
  nav: {
    home: string;
    services: string;
    work: string;
    blog: string;
    about: string;
    contact: string;
    startProject: string;
    menu: string;
    close: string;
    switchTo: string; // aria label for language toggle
    switchLabel: string; // short visible label ("عربي" / "EN")
  };
  common: {
    getInTouch: string;
    viewAllServices: string;
    exploreService: string;
    backToServices: string;
    backToWork: string;
    backToBlog: string;
    readArticle: string;
    call: string;
    email: string;
    location: string;
    scroll: string;
    whatsapp: string; // aria label for the floating WhatsApp button
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    heroEyebrow: string;
    heroTitleLead: string; // "We turn ideas into"
    heroTitleAccent: string; // "impact"
    heroSub: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesSub: string;
    statementEyebrow: string;
    statement: string;
    statementBody: string;
    workEyebrow: string;
    workTitle: string;
    workSub: string;
    blogEyebrow: string;
    blogTitle: string;
    blogSub: string;
    ctaTitle: string;
    ctaBody: string;
  };
  servicesPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
  };
  services: ServiceContent[];
  work: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    scopeTitle: string;
    approachTitle: string;
    galleryTitle: string;
    viewPost: string;
    watchVideo: string;
    clients: ClientCase[];
  };
  blog: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    posts: BlogPost[];
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    story: string[];
    valuesTitle: string;
    values: { title: string; body: string }[];
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    formName: string;
    formEmail: string;
    formCompany: string;
    formService: string;
    formServiceDefault: string;
    formMessage: string;
    formSubmit: string;
    formNote: string;
    directTitle: string;
    hoursTitle: string;
    hours: string;
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    connectTitle: string;
    rights: string;
    madeIn: string;
  };
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const dict =
    locale === "ar"
      ? (await import("./content/ar")).default
      : (await import("./content/en")).default;
  return dict;
}
