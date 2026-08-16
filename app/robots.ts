import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Native Next.js metadata route — see app/sitemap.ts for why this replaces
// next-sitemap's robots.txt generation (it wrote to a hardcoded `out/` dir
// that Hostinger's live-server build never creates, so it never shipped).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI answer-engine crawlers alongside search bots.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
