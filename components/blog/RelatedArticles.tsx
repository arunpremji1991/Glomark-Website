import type { Locale } from "@/lib/i18n";
import type { BlogCardData } from "@/lib/blog";
import { BlogCard } from "./BlogCard";

// Renders the same computed post list two ways: a compact stacked list for
// the sidebar module, or a 3-up card row for the end-of-article "Continue
// Reading" section — one source of truth (getRelatedPosts in lib/blog.ts),
// two presentations.
export function RelatedArticles({
  title,
  posts,
  locale,
  readArticleLabel,
  variant = "list",
}: {
  title: string;
  posts: BlogCardData[];
  locale: Locale;
  readArticleLabel: string;
  variant?: "list" | "cards";
}) {
  if (posts.length === 0) return null;

  if (variant === "cards") {
    return (
      <section>
        <h2 className="font-display text-2xl text-cream sm:text-3xl">{title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} readArticleLabel={readArticleLabel} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <div className="mt-4 space-y-5">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} locale={locale} readArticleLabel={readArticleLabel} variant="compact" />
        ))}
      </div>
    </div>
  );
}
