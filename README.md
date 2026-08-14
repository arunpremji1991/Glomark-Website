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
- `public/media/services/*.webp`, `public/media/blog/*.webp`, `public/og/glomark-og.jpg` — Higgsfield-generated imagery (see below)

## 3D, motion & performance

- The hero (`components/hero/HeroCanvas.tsx`) code-splits the Three.js/R3F bundle via `next/dynamic({ ssr: false })`, so it never blocks the initial HTML/CSS paint.
- Before mounting the WebGL scene, `shouldRunWebGL()` checks `prefers-reduced-motion`, WebGL support, `navigator.deviceMemory`, `connection.saveData`/`effectiveType`, and coarse-pointer + narrow-viewport (a proxy for low-power mobile) — any of these fail and it falls back to a static, brand-true CSS gradient instead. No video/WebGL is ever shipped to a device that can't comfortably run it.
- The homepage's `ServicesReel` (a pinned, scroll-linked cross-fade through the 8 service visuals) is built entirely on Framer Motion `useScroll`/`useTransform` — CSS transform/opacity only, no WebGL — and also has a plain static fallback under `prefers-reduced-motion`.
- Service/portfolio card tilt (`components/TiltCard.tsx`) is a lightweight `perspective`/`rotateX/Y` transform, not WebGL, and is disabled under reduced motion and on touch.
- All raster imagery is pre-optimized to WebP/JPEG at the sizes actually used (services: ~10–40KB each; OG image: ~100KB) and served via `next/image`.

## Content status — what's real vs. placeholder

**Production-ready, real content:**
- All copy for all 8 services, home, about, contact, and nav/footer, in both English and Arabic (not machine-translated filler — written per-locale)
- 4 real, ready-to-publish blog articles (`lib/content/{en,ar}.ts` → `blog.posts`) with cover art, JSON-LD `BlogPosting` schema, and their own SEO metadata. Add new posts by appending to `BLOG_SLUGS` in `lib/site.ts` and to the `posts` array in both locale files — keep `en`/`ar` structurally in sync (same slugs, same order)
- Contact details (phone, email, address, WhatsApp) and the contact form (see below)
- Real social profiles (`lib/site.ts` → `SOCIAL`): Instagram and LinkedIn
- SEO metadata, JSON-LD, sitemap, robots.txt, `llms.txt`
- The 8 service visuals, 4 blog cover images, and the OG share image, generated via Higgsfield (`nano_banana_pro`) in the brand palette — realistic editorial photography, **not stock photography**

**Explicitly placeholder — swap before launch:**
- `/work` (portfolio/case studies): the 6 items shown are illustrative examples of the *kind* of work Glomark produces, clearly labeled as placeholder in-page ("These are representative examples..."). Real client case studies (with real client names, real images/video, real results) should replace these before launch.
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
