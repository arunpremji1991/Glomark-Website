import { Suspense } from "react";
import type { Metadata } from "next";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { getCategories, toCardData } from "@/lib/blog";
import { BlogListingHero } from "@/components/blog/BlogListingHero";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
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

  const posts = dict.blog.posts;
  const featured = posts[0];
  const rest = posts.slice(1);
  const categories = getCategories(posts);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <BlogListingHero eyebrow={dict.blog.eyebrow} title={dict.blog.title} intro={dict.blog.intro} />

      <div className="container-x py-16 lg:py-24">
        <FeaturedArticle
          post={toCardData(featured)}
          locale={locale}
          eyebrow={dict.blog.featuredLabel}
          readArticleLabel={dict.common.readArticle}
        />
      </div>

      <div className="container-x pb-20 lg:pb-28">
        <Suspense>
          <BlogExplorer
            posts={rest.map(toCardData)}
            categories={categories}
            locale={locale}
            dict={{
              allCategoriesLabel: dict.blog.allCategoriesLabel,
              categoryNavLabel: dict.blog.categoryNavLabel,
              searchLabel: dict.blog.searchLabel,
              searchPlaceholder: dict.blog.searchPlaceholder,
              noResults: dict.blog.noResults,
              loadMore: dict.blog.loadMore,
              readArticle: dict.common.readArticle,
            }}
          />
        </Suspense>
      </div>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
