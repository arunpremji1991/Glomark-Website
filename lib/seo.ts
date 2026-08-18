import type { Metadata } from "next";
import { SITE_URL } from "./site";
import { locales, type Locale } from "./i18n";

/**
 * Build page metadata with correct canonical + hreflang alternates.
 * `path` is locale-relative, e.g. "/services" or "/services/branding".
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  ogImage = "/og/glomark-og.jpg",
  type = "website",
  publishedTime,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  // "article" + publishedTime are only used by blog posts (see
  // app/[locale]/blog/[slug]/page.tsx); every other caller omits both and
  // keeps today's "website" behaviour unchanged.
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const clean = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${clean}/`;
  }
  languages["x-default"] = `${SITE_URL}/en${clean}/`;

  const canonical = `${SITE_URL}/${locale}${clean}/`;
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph:
      type === "article"
        ? {
            title,
            description,
            url: canonical,
            siteName: "Glomark",
            locale: locale === "ar" ? "ar_OM" : "en_OM",
            alternateLocale: locale === "ar" ? "en_OM" : "ar_OM",
            type: "article",
            publishedTime,
            images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
          }
        : {
            title,
            description,
            url: canonical,
            siteName: "Glomark",
            locale: locale === "ar" ? "ar_OM" : "en_OM",
            alternateLocale: locale === "ar" ? "en_OM" : "ar_OM",
            type: "website",
            images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
