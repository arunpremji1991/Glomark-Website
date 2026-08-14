/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://glomark.om";
const LOCALES = ["en", "ar"];

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  trailingSlash: true,
  // Static export copies /public into /out during `next build`; write
  // directly into /out so the sitemap + robots.txt ship with the export
  // instead of landing in /public after that copy already happened.
  outDir: "out",
  exclude: ["/404", "/500"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI answer-engine crawlers alongside search bots.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
  transform: async (config, path) => {
    // Strip the leading /en or /ar so we can build hreflang siblings.
    const match = path.match(/^\/(en|ar)(\/.*)?$/);
    const rest = match ? match[2] || "/" : path;

    // next-sitemap's alternateRefs normalizer resolves a relative `href`
    // against the *current entry's own loc* (not siteUrl) unless you set
    // `hrefIsAbsolute: true` — without it, "/en/foo/" resolved against
    // ".../ar/foo/" becomes ".../en/foo/ar/foo/". Passing a full absolute
    // URL + hrefIsAbsolute avoids that entirely.
    // `hrefIsAbsolute` skips next-sitemap's own trailing-slash pass too, so
    // append it here to match every other URL in the sitemap.
    const withSlash = (p) => (p.endsWith("/") ? p : `${p}/`);
    const alternateRefs = match
      ? [
          ...LOCALES.map((locale) => ({
            href: withSlash(`${SITE_URL}/${locale}${rest === "/" ? "" : rest}`),
            hreflang: locale,
            hrefIsAbsolute: true,
          })),
          {
            href: withSlash(`${SITE_URL}/en${rest === "/" ? "" : rest}`),
            hreflang: "x-default",
            hrefIsAbsolute: true,
          },
        ]
      : [];

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === "/en" || path === "/ar" ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },
};
