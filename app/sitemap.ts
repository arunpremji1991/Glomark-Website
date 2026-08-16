import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL, SERVICE_SLUGS, BLOG_SLUGS, CLIENT_SLUGS } from "@/lib/site";

// Next.js's built-in App Router metadata route: this file alone produces a
// working /sitemap.xml, statically generated at build time whether the app
// builds as a static export (`out/`) or runs as a live server (`.next/`) —
// unlike next-sitemap, which wrote its output to a hardcoded `out/` dir that
// only exists in static-export builds. Hostinger's native Next.js hosting
// builds and serves this app as a live server, so `out/` never gets created
// there, and the old next-sitemap-generated sitemap.xml/robots.txt never
// shipped. See app/robots.ts for the equivalent robots.txt fix.

// Locale-relative paths (no leading /en or /ar) for every page on the site.
const STATIC_PATHS = ["", "/services", "/work", "/blog", "/about", "/contact"];

function localePath(locale: string, path: string) {
  const clean = path === "" ? "" : path;
  return `/${locale}${clean}`;
}

function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

function entriesFor(
  path: string,
  {
    priority = 0.7,
    changeFrequency = "monthly",
  }: {
    priority?: number;
    changeFrequency?: "weekly" | "monthly";
  } = {},
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = withSlash(`${SITE_URL}${localePath(locale, path)}`);
  }
  languages["x-default"] = withSlash(`${SITE_URL}${localePath("en", path)}`);

  return locales.map((locale) => ({
    url: withSlash(`${SITE_URL}${localePath(locale, path)}`),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push(
      ...entriesFor(path, {
        priority: path === "" ? 1 : 0.8,
        changeFrequency: path === "" || path === "/services" ? "weekly" : "monthly",
      }),
    );
  }

  for (const slug of SERVICE_SLUGS) {
    entries.push(...entriesFor(`/services/${slug}`, { priority: 0.8 }));
  }
  for (const slug of CLIENT_SLUGS) {
    entries.push(...entriesFor(`/work/${slug}`, { priority: 0.6 }));
  }
  for (const slug of BLOG_SLUGS) {
    entries.push(...entriesFor(`/blog/${slug}`, { priority: 0.6 }));
  }

  return entries;
}
