import type { BlogPost, Locale } from "./i18n";

export function formatBlogDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Same category first (most recent), backfilled with the latest other posts
 *  if there aren't enough — the current post is never included either way. */
export function getRelatedPosts(
  posts: BlogPost[],
  current: BlogPost,
  count: number,
): BlogPost[] {
  const others = posts.filter((p) => p.slug !== current.slug);
  const sameCategory = sortByDateDesc(others.filter((p) => p.category === current.category));
  const result = sameCategory.slice(0, count);
  if (result.length < count) {
    const used = new Set(result.map((p) => p.slug));
    const rest = sortByDateDesc(others.filter((p) => !used.has(p.slug)));
    result.push(...rest.slice(0, count - result.length));
  }
  return result;
}

export function getLatestPosts(
  posts: BlogPost[],
  current: BlogPost,
  count: number,
): BlogPost[] {
  return sortByDateDesc(posts.filter((p) => p.slug !== current.slug)).slice(0, count);
}

// The subset of BlogPost that a card actually renders — used to type
// components/blog/BlogCard.tsx and, importantly, to strip `body` (and other
// unused fields) before handing posts to the client-side BlogExplorer, so
// full article text never ships in that component's client bundle payload.
export type BlogCardData = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "category" | "date" | "readTime"
>;

export function toCardData(post: BlogPost): BlogCardData {
  const { slug, title, excerpt, category, date, readTime } = post;
  return { slug, title, excerpt, category, date, readTime };
}

export interface Category {
  slug: string; // kebab-case, used for the "?category=" deep link
  name: string; // display label, locale-specific
}

/** De-duplicated, alphabetical category list with a stable slug per label —
 *  categories are free-text per post (no separate category enum), so the
 *  slug is derived rather than stored. */
export function getCategories(posts: BlogPost[]): Category[] {
  const names = Array.from(new Set(posts.map((p) => p.category))).sort((a, b) =>
    a.localeCompare(b),
  );
  return names.map((name) => ({ name, slug: slugify(name) }));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
