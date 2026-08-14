# Glomark — Marketing & Media Agency Website

A production-grade, bilingual (English/Arabic) marketing site for Glomark, a marketing & media production agency in Salalah, Oman. Built with Next.js 14 (App Router, static export), React Three Fiber, Framer Motion and Tailwind CSS.

## Getting started

Requires Node 20 (Node 18/22 also work; Node 24 has not been validated against Next 14). Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` — it redirects to `http://localhost:3000/en/`.

## Building for production

```bash
npm run build
```

This runs `next build` (static export, per `output: "export"` in `next.config.mjs`, scoped to production builds only — `next dev` has an unrelated false-positive with that flag on dynamic routes) followed by `next-sitemap` as a `postbuild` step, which writes `sitemap.xml` and `robots.txt` directly into `out/`. The fully static site is in `out/` — deploy that directory to any static host (Cloudflare Pages, S3 + CloudFront, Netlify, GitHub Pages, etc.) or serve it behind a CDN.

Set `NEXT_PUBLIC_SITE_URL` before building if the production domain differs from the `https://glomark.om` default (used for canonical URLs, sitemap, and structured data):

```bash
NEXT_PUBLIC_SITE_URL=https://example.com npm run build
```

## Project structure

- `app/[locale]/…` — all real pages, under `/en/` and `/ar/` (statically generated for both locales via `generateStaticParams`)
- `app/page.tsx` — root `/` is a lightweight crawler-safe redirect to `/en/` (static export has no server, so this uses a meta-refresh, not a real 3xx)
- `lib/content/en.ts`, `lib/content/ar.ts` — all copy, typed against a shared `Dictionary` interface in `lib/i18n.ts` so both locales stay structurally in sync
- `lib/site.ts` — contact details, social links, service slugs (single source of truth)
- `lib/seo.ts`, `lib/schema.ts` — metadata/hreflang builder and JSON-LD (Organization, Service, BreadcrumbList) builders
- `components/hero/` — the WebGL hero (lazy-loaded, capability-gated, see below)
- `components/home/ServicesReel.tsx` — the scroll-pinned services showcase on the homepage
- `components/WhatsAppButton.tsx` — the floating WhatsApp button mounted in `app/[locale]/layout.tsx`, shown on every page, links to `CONTACT.whatsappHref`
- `app/[locale]/blog/`, `app/[locale]/blog/[slug]/` — blog listing + post pages, statically generated for both locales; post content lives in `lib/content/{en,ar}.ts` → `blog.posts`
- `app/[locale]/work/`, `app/[locale]/work/[slug]/` — portfolio listing + individual client case-study pages; content lives in `lib/content/{en,ar}.ts` → `work.clients`, external links in `lib/site.ts` → `CLIENT_LINKS`
- `components/ClientLogo.tsx` — renders each client logo in a uniform, fixed-size box (`object-contain`) so square Instagram crops and wide wordmarks line up identically regardless of source dimensions
- `components/MediaGallery.tsx` — the "From the feed" grid on each case-study page; content and links come from `lib/site.ts` → `CLIENT_GALLERY`, images live at `public/media/clients/gallery/`
- `public/media/services/*.webp`, `public/media/blog/*.webp`, `public/media/clients/*.webp`, `public/media/clients/gallery/*.webp`, `public/og/glomark-og.jpg` — imagery (see below)

## 3D, motion & performance

- The hero (`components/hero/HeroCanvas.tsx`) code-splits the Three.js/R3F bundle via `next/dynamic({ ssr: false })`, so it never blocks the initial HTML/CSS paint.
- Before mounting the WebGL scene, `shouldRunWebGL()` checks `prefers-reduced-motion`, WebGL support, `navigator.deviceMemory`, `connection.saveData`/`effectiveType`, and coarse-pointer + narrow-viewport (a proxy for low-power mobile) — any of these fail and it falls back to a static, brand-true CSS gradient instead. No video/WebGL is ever shipped to a device that can't comfortably run it.
- The homepage's `ServicesReel` (a pinned, scroll-linked cross-fade through the 8 service visuals) is built entirely on Framer Motion `useScroll`/`useTransform` — CSS transform/opacity only, no WebGL — and also has a plain static fallback under `prefers-reduced-motion`.
- Service/portfolio card tilt (`components/TiltCard.tsx`) is a lightweight `perspective`/`rotateX/Y` transform, not WebGL, and is disabled under reduced motion and on touch.
- All raster imagery is pre-optimized to WebP/JPEG at the sizes actually used (services: ~10–40KB each; OG image: ~100KB) and served via `next/image`.

## Content status — what's real vs. placeholder

**Production-ready, real content:**
- All copy for all 8 services, home, about, contact, and nav/footer, in both English and Arabic (not machine-translated filler — written per-locale)
- 7 real portfolio clients (`lib/content/{en,ar}.ts` → `work.clients`) — Reventure, First Exchange, Voice of the Season 2025 (Dhofar Center), Do. Events, Do. Chocolate & Flowers, Do. Café, and Ventura — each with a real scope-of-work and process write-up and its own case-study page at `/work/<slug>`. Client logos live at `public/media/clients/*.webp`, pulled from each client's own public Instagram profile or website (see note below) and given a light backing where the source mark assumes a white page. Add a new client by appending a slug to `CLIENT_SLUGS`/`CLIENT_LINKS` in `lib/site.ts`, dropping a `<slug>.webp` logo into `public/media/clients/`, and adding an entry to `work.clients` in both locale files
- Each client page also has a "From the feed" media gallery (`lib/site.ts` → `CLIENT_GALLERY`) — 2–6 real photos/reels per client, pulled from their own Instagram feed or website, each tile linking back to the original post. Voice of the Season has no gallery yet (no client-provided event photography at time of writing) rather than filler. Add photos for a client by dropping `<slug>-N.webp` files into `public/media/clients/gallery/` and adding matching `{ file, href, isVideo }` entries to that client's array — this data is locale-neutral (lives in `lib/site.ts`, not the content files)
- 4 real, ready-to-publish blog articles (`lib/content/{en,ar}.ts` → `blog.posts`) with cover art, JSON-LD `BlogPosting` schema, and their own SEO metadata. Add new posts by appending to `BLOG_SLUGS` in `lib/site.ts` and to the `posts` array in both locale files — keep `en`/`ar` structurally in sync (same slugs, same order)
- Contact details (phone, email, address, WhatsApp) and the contact form (see below)
- Real social profiles (`lib/site.ts` → `SOCIAL`): Instagram and LinkedIn
- SEO metadata, JSON-LD, sitemap, robots.txt, `llms.txt`
- The 8 service visuals, 4 blog cover images, and the OG share image, generated via Higgsfield (`nano_banana_pro`) in the brand palette — realistic editorial photography, **not stock photography**

**Worth a follow-up:**
- Client logos were captured from each client's own public Instagram profile picture (5 of 7) or their website's logo asset (First Exchange, Voice of the Season) — they're the clients' own public brand marks, not stock art, but the Instagram-sourced ones are only 150×150px. Swap in official vector/high-res logo files from each client directly when available, especially if the portfolio grid is ever displayed larger.
- Gallery photos/reel thumbnails are likewise pulled from each client's own public Instagram feed (capped at 640×640, whatever's visible to a logged-out visitor) or, for First Exchange, their website. Swap in original production files when available for better resolution, and revisit `CLIENT_GALLERY` periodically — Instagram's CDN URLs for the *post links* (not the downloaded images) are stable, but if a client deletes a post the linked-out post will 404.
- The Google Maps embed on `/contact` is geocoded to central Salalah (no exact street-level pin) — replace with the exact business location once available.
- Favicon/OG image: generated abstract art, not a photographed hero shot — fine as a placeholder, but consider a real campaign still for the OG image once available.

**Contact form:** submits via `mailto:` (opens the visitor's email client with a pre-filled subject/body) — no backend, per the brief ("mailto/no backend needed initially"). If a real backend/CRM integration is added later, swap `components/ContactForm.tsx`'s `onSubmit` handler.

## SEO & AI-crawlability

- Full static HTML on first load for every route (no client-only content) — App Router SSG via `generateStaticParams` on every page
- Single `<h1>` per page, semantic `<header>/<nav>/<main>/<article>/<footer>`
- Unique `<title>`/meta description per page and per service (`lib/content/{en,ar}.ts`)
- Open Graph + Twitter Card on every page (`lib/seo.ts`)
- JSON-LD: `Organization` (homepage), `Service` (each of the 16 service pages, 8 × 2 locales), `BlogPosting` (each of the 8 blog post pages, 4 × 2 locales), `BreadcrumbList` (all interior pages)
- `sitemap.xml` with per-URL `hreflang` alternates (en/ar/x-default) and `robots.txt` that explicitly allows `GPTBot`, `ClaudeBot`, `PerplexityBot`, and `Google-Extended` alongside standard crawlers
- `/llms.txt` at the site root, summarizing the agency, all 8 services, and contact info in plain text for AI answer engines
- Arabic pages: `lang="ar"` `dir="rtl"` (applied at the locale-layout wrapper — see the comment in `app/[locale]/layout.tsx` for why it's not on `<html>`), with the layout genuinely mirrored via Tailwind's `rtl:`/`[dir="rtl"]`-scoped utilities and logical CSS properties, not just flipped text

## Known trade-offs / notes for whoever picks this up next

- `next.config.mjs` only sets `output: "export"` when `NODE_ENV === "production"`. This works around a Next 14.2 dev-server false positive that rejects dynamic routes which *do* have `generateStaticParams`. `next build` still fully validates and enforces static-export correctness — this only affects `next dev`.
- `next-sitemap`'s `alternateRefs` normalizer resolves a relative `href` against the *current URL's own path* rather than the site root unless `hrefIsAbsolute: true` is set (undocumented behavior as of `next-sitemap@4.2.3`) — see the comment in `next-sitemap.config.js`.
