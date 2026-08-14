import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { BLOG_SLUGS } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";
import { BlogVisual } from "@/components/BlogVisual";
import { CtaBand } from "@/components/home/CtaBand";

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

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
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
  });
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const resolved = await resolve(locale, slug);
  if (!resolved || !isLocale(locale)) notFound();
  const { dict, index, post } = resolved;

  const schema = articleSchema(post, locale);
  const breadcrumbs = breadcrumbSchema(locale, [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.blog, path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  const next = dict.blog.posts[(index + 1) % dict.blog.posts.length];

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
            <LocaleLink
              locale={locale}
              href="/blog"
              className="text-[0.82rem] font-semibold text-cream/60 hover:text-lime"
            >
              ← {dict.common.backToBlog}
            </LocaleLink>
            <p className="eyebrow mt-5">{post.category}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl balance">
              {post.title}
            </h1>
            <p className="mt-5 flex flex-wrap items-center gap-3 text-[0.9rem] text-cream/55">
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-x py-20 lg:py-28">
        <Reveal className="mx-auto max-w-prose2 space-y-6">
          {post.body.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-cream/75 pretty">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal
          delay={0.1}
          className="mx-auto mt-20 max-w-prose2 border-t border-white/8 pt-10"
        >
          <p className="eyebrow">{locale === "ar" ? "التالي" : "Next"}</p>
          <LocaleLink
            locale={locale}
            href={`/blog/${next.slug}`}
            className="mt-3 inline-block font-display text-2xl text-cream hover:text-lime transition-colors sm:text-3xl"
          >
            {next.title} →
          </LocaleLink>
        </Reveal>
      </div>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
