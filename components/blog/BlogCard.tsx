import type { Locale } from "@/lib/i18n";
import { formatBlogDate, type BlogCardData } from "@/lib/blog";
import { LocaleLink } from "@/components/LocaleLink";
import { BlogVisual } from "@/components/BlogVisual";

// Shared editorial card — used by the listing grid ("grid") and by the
// sidebar's Related/Latest modules ("compact"). One component, two layouts,
// so a visual tweak never has to be made in more than one place.
export function BlogCard({
  post,
  locale,
  readArticleLabel,
  variant = "grid",
  priority = false,
}: {
  post: BlogCardData;
  locale: Locale;
  readArticleLabel: string;
  variant?: "grid" | "compact";
  priority?: boolean;
}) {
  if (variant === "compact") {
    return (
      <LocaleLink
        locale={locale}
        href={`/blog/${post.slug}`}
        className="group flex items-start gap-3"
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-indigo-deep/60">
          <BlogVisual
            slug={post.slug}
            alt=""
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-lime">
            {post.category}
          </p>
          <h3 className="mt-1 font-display text-[0.95rem] leading-snug text-cream line-clamp-2 group-hover:text-lime transition-colors">
            {post.title}
          </h3>
          <p className="mt-1 text-[0.76rem] text-cream/45">
            {formatBlogDate(post.date, locale)} · {post.readTime}
          </p>
        </div>
      </LocaleLink>
    );
  }

  return (
    <LocaleLink
      locale={locale}
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl panel"
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-indigo-deep/60">
          <BlogVisual
            slug={post.slug}
            alt={post.title}
            priority={priority}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-lime">
            {post.category}
          </p>
          <h3 className="mt-2 font-display text-xl text-cream pretty">{post.title}</h3>
          <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-cream/60 pretty line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4 text-[0.78rem] text-cream/45">
            <span>
              {formatBlogDate(post.date, locale)} · {post.readTime}
            </span>
            <span className="font-semibold text-cream/70 transition-colors group-hover:text-lime">
              {readArticleLabel} →
            </span>
          </div>
        </div>
      </article>
    </LocaleLink>
  );
}
