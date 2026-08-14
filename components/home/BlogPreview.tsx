import type { Dictionary, Locale } from "@/lib/i18n";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { BlogVisual } from "@/components/BlogVisual";

export function BlogPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const posts = dict.blog.posts.slice(0, 3);

  return (
    <section className="container-x py-24 lg:py-32">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="eyebrow">{dict.home.blogEyebrow}</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl balance">
            {dict.home.blogTitle}
          </h2>
          <p className="mt-4 text-lg text-cream/65 pretty">{dict.home.blogSub}</p>
        </div>
        <LocaleLink
          locale={locale}
          href="/blog"
          className="shrink-0 text-[0.9rem] font-semibold text-cream lime-underline hover:text-lime"
        >
          {dict.nav.blog}
        </LocaleLink>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <TiltCard max={5} className="h-full">
              <LocaleLink
                locale={locale}
                href={`/blog/${post.slug}`}
                className="panel group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <article className="flex h-full flex-col">
                  <div className="relative h-44 overflow-hidden bg-indigo-deep/60">
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
                    <h3 className="mt-2 font-display text-xl text-cream pretty">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-cream/60 pretty">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </LocaleLink>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
