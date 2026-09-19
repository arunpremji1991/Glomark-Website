import type { Locale } from "@/lib/i18n";
import type { BlogCardData, Category } from "@/lib/blog";
import { RelatedArticles } from "./RelatedArticles";
import { ExploreTopics } from "./ExploreTopics";

// Desktop: sticky alongside the article (offset below the site's own sticky
// header, see Header.tsx's h-16 pill + top padding). Mobile/tablet: plain
// block flow, so it simply stacks below the article — no separate mobile
// layout to maintain.
export function BlogSidebar({
  related,
  latest,
  categories,
  locale,
  readArticleLabel,
  relatedTitle,
  latestTitle,
  exploreTitle,
}: {
  related: BlogCardData[];
  latest: BlogCardData[];
  categories: Category[];
  locale: Locale;
  readArticleLabel: string;
  relatedTitle: string;
  latestTitle: string;
  exploreTitle: string;
}) {
  return (
    <aside className="mt-16 space-y-10 lg:sticky lg:top-28 lg:mt-0 lg:self-start">
      <RelatedArticles
        title={relatedTitle}
        posts={related}
        locale={locale}
        readArticleLabel={readArticleLabel}
      />
      <RelatedArticles
        title={latestTitle}
        posts={latest}
        locale={locale}
        readArticleLabel={readArticleLabel}
      />
      <ExploreTopics title={exploreTitle} categories={categories} locale={locale} />
    </aside>
  );
}
