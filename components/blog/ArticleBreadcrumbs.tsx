import type { Locale } from "@/lib/i18n";
import { LocaleLink } from "@/components/LocaleLink";

// Renders the exact same {name, path}[] list already built for
// breadcrumbSchema() in the page component — one source of truth between
// the visible trail and the JSON-LD, so they can never drift apart.
export function ArticleBreadcrumbs({
  items,
  locale,
}: {
  items: { name: string; path: string }[];
  locale: Locale;
}) {
  const last = items.length - 1;
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8rem] text-cream/45">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i === last ? (
              <span aria-current="page" className="text-cream/60 line-clamp-1 max-w-[16rem]">
                {item.name}
              </span>
            ) : (
              <>
                <LocaleLink locale={locale} href={item.path} className="hover:text-lime transition-colors">
                  {item.name}
                </LocaleLink>
                <span aria-hidden>/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
