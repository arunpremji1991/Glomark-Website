import Link from "next/link";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Category } from "@/lib/blog";

// Deep-links back to the listing page with a category pre-selected
// (BlogExplorer reads "?category=" on mount) — no separate category route.
export function ExploreTopics({
  title,
  categories,
  locale,
}: {
  title: string;
  categories: Category[];
  locale: Locale;
}) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`${localeHref(locale, "/blog")}?category=${c.slug}`}
              className="inline-flex rounded-full border border-white/12 px-3.5 py-1.5 text-[0.78rem] font-medium text-cream/65 transition-colors hover:border-lime/50 hover:text-lime"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
