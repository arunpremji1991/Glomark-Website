import type { Metadata } from "next";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import { Hero } from "@/components/home/Hero";
import { ServicesReel } from "@/components/home/ServicesReel";
import { Statement } from "@/components/home/Statement";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { BlogPreview } from "@/components/home/BlogPreview";
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
    path: "/",
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
  });
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const schema = organizationSchema(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero locale={locale} dict={dict} />
      <ServicesReel locale={locale} dict={dict} />
      <Statement dict={dict} />
      <FeaturedWork locale={locale} dict={dict} />
      <BlogPreview locale={locale} dict={dict} />
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
