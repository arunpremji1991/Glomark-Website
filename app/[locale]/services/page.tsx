import type { Metadata } from "next";
import Image from "next/image";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { ServiceZigzag } from "@/components/services/ServiceZigzag";
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
    path: "/services",
    title: dict.servicesPage.metaTitle,
    description: dict.servicesPage.metaDescription,
  });
}

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const breadcrumbs = breadcrumbSchema(locale, [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.services, path: "/services" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <header className="relative overflow-hidden border-b border-white/8 bg-ink-2/50">
        <div className="absolute inset-0">
          <Image
            src="/media/services/cover.webp"
            alt={dict.servicesPage.coverAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,20,0.7) 0%, rgba(10,10,20,0.88) 100%)",
          }}
        />
        <div className="container-x relative py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{dict.servicesPage.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl balance">
              {dict.servicesPage.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65 pretty">
              {dict.servicesPage.intro}
            </p>
          </Reveal>
        </div>
      </header>

      <ServiceZigzag locale={locale} dict={dict} />

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
