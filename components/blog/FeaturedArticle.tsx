import type { Locale } from "@/lib/i18n";
import { formatBlogDate, type BlogCardData } from "@/lib/blog";
import { LocaleLink } from "@/components/LocaleLink";
import { BlogVisual } from "@/components/BlogVisual";
import { Reveal } from "@/components/Reveal";

// The newest post gets a full editorial split-hero treatment instead of
// sitting in the grid as just another card — the deliberate hierarchy the
// redesign asks for (posts[0] is always latest, see BLOG_SLUGS in lib/site.ts).
export function FeaturedArticle({
  post,
  locale,
  eyebrow,
  readArticleLabel,
}: {
  post: BlogCardData;
  locale: Locale;
  eyebrow: string;
  readArticleLabel: string;
}) {
  return (
    <Reveal>
      <LocaleLink
        locale={locale}
        href={`/blog/${post.slug}`}
        className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-indigo-deep/60 lg:aspect-[4/3]">
          <BlogVisual
            slug={post.slug}
            alt={post.title}
            priority
            className="transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <p className="mt-4 text-[0.8rem] font-semibold uppercase tracking-wide text-cream/50">
            {post.category}
          </p>
          <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl lg:text-5xl balance">
            {post.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/65 pretty">
            {post.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4 text-[0.85rem] text-cream/50">
            <span>
              {formatBlogDate(post.date, locale)} · {post.readTime}
            </span>
          </div>
          <span className="mt-7 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-cream lime-underline transition-colors group-hover:text-lime">
            {readArticleLabel} →
          </span>
        </div>
      </LocaleLink>
    </Reveal>
  );
}
