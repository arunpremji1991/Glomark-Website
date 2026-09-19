import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { BLOG_SLUGS, SITE_URL } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { formatBlogDate, getCategories, getLatestPosts, getRelatedPosts, toCardData } from "@/lib/blog";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { BlogVisual } from "@/components/BlogVisual";
import { CtaBand } from "@/components/home/CtaBand";
import { ArticleBreadcrumbs } from "@/components/blog/ArticleBreadcrumbs";
import { ArticleShare } from "@/components/blog/ArticleShare";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { RelatedArticles } from "@/components/blog/RelatedArticles";

// A body entry that is ONLY "![alt](/path.webp)" renders as a full-width
// inline image instead of a paragraph; everything else (plain text, or text
// containing "[label](url)" links via renderRichText) is unaffected, so
// existing posts with no "![...](...)" entries render exactly as before.
const IMAGE_ENTRY = /^!\[([^\]]*)\]\(([^)]+)\)$/;

// A body entry starting with "## " renders as an H2 subheading, "### " as an
// H3 — breaking long posts into scannable sections. Existing posts with
// neither entry are unaffected.
const HEADING2_ENTRY = /^##\s+(.+)$/;
const HEADING3_ENTRY = /^###\s+(.+)$/;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    BLOG_SLUGS.map((slug) => ({ locale, slug })),
  );
}

async function resolve(locale: string, slug: string) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const index = dict.blog.posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return { dict, index, post: dict.blog.posts[index] };
}

// Parses the one supported inline markup in post body paragraphs —
// "[label](url)" — into a real link; anything else passes through as plain
// text unchanged, so existing posts with no bracket syntax render exactly
// as before. External links (http/https) open in a new tab to match the
// site's existing convention for outbound links (see work/[slug]/page.tsx).
function renderRichText(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, href] = match;
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        key={i}
        href={href}
        className="text-lime underline decoration-lime/40 underline-offset-2 transition-colors hover:decoration-lime"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    );
  });
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const resolved = await resolve(locale, slug);
  if (!resolved) return {};
  return buildMetadata({
    locale: locale as "en" | "ar",
    path: `/blog/${slug}`,
    title: resolved.post.metaTitle,
    description: resolved.post.metaDescription,
    type: "article",
    publishedTime: resolved.post.date,
    ...(resolved.post.ogImage ? { ogImage: resolved.post.ogImage } : {}),
  });
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const resolved = await resolve(locale, slug);
  if (!resolved || !isLocale(locale)) notFound();
  const { dict, post } = resolved;

  const schema = articleSchema(post, locale);
  const breadcrumbItems = [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.blog, path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  const breadcrumbs = breadcrumbSchema(locale, breadcrumbItems);

  const related = getRelatedPosts(dict.blog.posts, post, 3).map(toCardData);
  const latest = getLatestPosts(dict.blog.posts, post, 4).map(toCardData);
  const categories = getCategories(dict.blog.posts);
  const canonicalUrl = `${SITE_URL}/${locale}/blog/${post.slug}/`;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <ReadingProgress dir={dict.dir} />

      <header className="relative overflow-hidden border-b border-white/8 bg-ink-2/50">
        <div className="absolute inset-0 opacity-45">
          <BlogVisual slug={post.slug} alt={post.title} priority />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,20,0.6) 0%, rgba(10,10,20,0.8) 100%)",
          }}
        />
        <div className="container-x relative py-20 lg:py-28">
          <Reveal>
            <ArticleBreadcrumbs items={breadcrumbItems} locale={locale} />
            <p className="eyebrow mt-5">{post.category}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl balance">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
              <p className="flex flex-wrap items-center gap-3 text-[0.9rem] text-cream/55">
                <time dateTime={post.date}>{formatBlogDate(post.date, locale)}</time>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
              </p>
              <ArticleShare
                url={canonicalUrl}
                title={post.title}
                shareLabel={dict.blog.shareTitle}
                copyLabel={dict.blog.copyLink}
                copiedLabel={dict.blog.linkCopied}
              />
            </div>
          </Reveal>
        </div>
      </header>

      <div className="container-x py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_360px]">
          <Reveal className="min-w-0 max-w-prose2 space-y-6">
            {post.body.map((para, i) => {
              const imageMatch = para.match(IMAGE_ENTRY);
              if (imageMatch) {
                const [, alt, src] = imageMatch;
                return (
                  <div key={i} className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                    <Image src={src} alt={alt} fill className="object-cover" />
                  </div>
                );
              }
              const heading2Match = para.match(HEADING2_ENTRY);
              if (heading2Match) {
                return (
                  <h2
                    key={i}
                    className="!mt-12 font-display text-2xl text-cream sm:text-3xl balance"
                  >
                    {heading2Match[1]}
                  </h2>
                );
              }
              const heading3Match = para.match(HEADING3_ENTRY);
              if (heading3Match) {
                return (
                  <h3
                    key={i}
                    className="!mt-9 font-display text-xl text-cream sm:text-2xl balance"
                  >
                    {heading3Match[1]}
                  </h3>
                );
              }
              return (
                <p key={i} className="text-lg leading-relaxed text-cream/75 pretty">
                  {renderRichText(para)}
                </p>
              );
            })}
          </Reveal>

          <BlogSidebar
            related={related}
            latest={latest}
            categories={categories}
            locale={locale}
            readArticleLabel={dict.common.readArticle}
            relatedTitle={dict.blog.relatedTitle}
            latestTitle={dict.blog.latestTitle}
            exploreTitle={dict.blog.exploreTitle}
          />
        </div>

        <Reveal delay={0.1} className="mt-20 border-t border-white/8 pt-16 lg:mt-28">
          <RelatedArticles
            title={dict.blog.continueReadingTitle}
            posts={related}
            locale={locale}
            readArticleLabel={dict.common.readArticle}
            variant="cards"
          />
        </Reveal>
      </div>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
