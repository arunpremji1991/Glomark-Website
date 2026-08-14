import type { Metadata } from "next";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { BlogVisual } from "@/components/BlogVisual";
import { LocaleLink } from "@/components/LocaleLink";
import { CtaBand } from "@/components/home/CtaBand";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/blog",
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
  });
}

export default async function BlogIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const breadcrumbs = breadcrumbSchema(locale, [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.blog, path: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <header className="border-b border-white/8 bg-ink-2/50">
        <div className="container-x py-20 lg:py-28">
          <Reveal>
            <p className="eyebrow">{dict.blog.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl balance">
              {dict.blog.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65 pretty">
              {dict.blog.intro}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-x py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.blog.posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.07}>
              <TiltCard max={5} className="h-full">
                <LocaleLink
                  locale={locale}
                  href={`/blog/${post.slug}`}
                  className="panel group flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <article className="flex h-full flex-col">
                    <div className="relative h-48 overflow-hidden bg-indigo-deep/60">
                      <BlogVisual
                        slug={post.slug}
                        alt={post.title}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-lime">
                        {post.category}
                      </p>
                      <h2 className="mt-2 font-display text-xl text-cream pretty">
                        {post.title}
                      </h2>
                      <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-cream/60 pretty">
                        {post.excerpt}
                      </p>
                      <p className="mt-4 text-[0.78rem] text-cream/45">
                        {post.readTime}
                      </p>
                    </div>
                  </article>
                </LocaleLink>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
