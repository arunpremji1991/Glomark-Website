import { CONTACT, SITE_URL, SOCIAL } from "./site";
import type { Dictionary, Locale } from "./i18n";
import type { ServiceContent, BlogPost } from "./i18n";

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    // Array form: this is the same entity as a search-friendly Organization
    // and a physically-located, appointment-based ProfessionalService — both
    // are valid schema.org types for one business, and Google's structured
    // data guidelines accept multiple @type values on a single node.
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "Glomark",
    alternateName: "جلومارك",
    url: `${SITE_URL}/${locale}/`,
    logo: `${SITE_URL}/brand/glomark-full.svg`,
    image: `${SITE_URL}/og/glomark-og.jpg`,
    description:
      locale === "ar"
        ? "جلومارك وكالة تسويق وإنتاج إعلامي في صلالة، عُمان."
        : "Glomark is a marketing and media production agency in Salalah, Oman.",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      postalCode: CONTACT.postalCode,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    areaServed: ["Oman", "Dhofar", "Gulf Cooperation Council"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: CONTACT.hours.days,
      opens: CONTACT.hours.opens,
      closes: CONTACT.hours.closes,
    },
    sameAs: SOCIAL.map((s) => s.href),
  };
}

export function serviceSchema(
  service: ServiceContent,
  locale: Locale,
  dict: Dictionary,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${locale}/services/${service.slug}/#service`,
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: "Glomark",
      "@id": `${SITE_URL}/#organization`,
      url: `${SITE_URL}/${locale}/`,
      telephone: CONTACT.phone,
      email: CONTACT.email,
    },
    areaServed: ["Oman", "Dhofar", "Gulf Cooperation Council"],
    url: `${SITE_URL}/${locale}/services/${service.slug}/`,
    inLanguage: locale,
  };
}

export function articleSchema(post: BlogPost, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/${locale}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    image: [`${SITE_URL}/media/blog/${post.slug}.webp`],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: "Glomark",
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@type": "Organization",
      name: "Glomark",
      "@id": `${SITE_URL}/#organization`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/glomark-full.svg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${post.slug}/`,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path === "/" ? "/" : item.path + "/"}`,
    })),
  };
}
