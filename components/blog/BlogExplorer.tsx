"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type { BlogCardData, Category } from "@/lib/blog";
import { BlogCard } from "./BlogCard";

const PAGE_SIZE = 9;

// Client-side search + category filter + "load more" over the full post
// list. All cards are still rendered by the server first (see
// app/[locale]/blog/page.tsx) into real crawlable links — this component
// only narrows which of those already-known posts are *visible*, so search
// engines never depend on this JS running to discover any article.
export function BlogExplorer({
  posts,
  categories,
  locale,
  dict,
}: {
  posts: BlogCardData[];
  categories: Category[];
  locale: Locale;
  dict: {
    allCategoriesLabel: string;
    categoryNavLabel: string;
    searchLabel: string;
    searchPlaceholder: string;
    noResults: string;
    loadMore: string;
    readArticle: string;
  };
}) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Support a deep link from ExploreTopics ("/blog/?category=<slug>") without
  // introducing a new route — read once on mount.
  useEffect(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl && categories.some((c) => c.slug === fromUrl)) {
      setCategory(fromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = !category || categories.find((c) => c.slug === category)?.name === p.category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, category, query, categories]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [category, query]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label={dict.categoryNavLabel}
          className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 py-1"
        >
          <CategoryPill
            active={category === null}
            onClick={() => setCategory(null)}
            label={dict.allCategoriesLabel}
          />
          {categories.map((c) => (
            <CategoryPill
              key={c.slug}
              active={category === c.slug}
              onClick={() => setCategory(c.slug)}
              label={c.name}
            />
          ))}
        </div>

        <label className="relative shrink-0 sm:w-64">
          <span className="sr-only">{dict.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.searchPlaceholder}
            aria-label={dict.searchLabel}
            className="w-full rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[0.88rem] text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-lime/60"
          />
        </label>
      </div>

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-cream/55">{dict.noResults}</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} readArticleLabel={dict.readArticle} />
          ))}
        </div>
      )}

      {visible < filtered.length ? (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center rounded-full border border-white/15 px-7 py-3 text-[0.9rem] font-semibold text-cream transition-colors hover:border-lime/60 hover:text-lime"
          >
            {dict.loadMore}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function CategoryPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-wide transition-colors ${
        active
          ? "bg-lime text-ink"
          : "border border-white/12 text-cream/60 hover:border-lime/50 hover:text-lime"
      }`}
    >
      {label}
    </button>
  );
}
