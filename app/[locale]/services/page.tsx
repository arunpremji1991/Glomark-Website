import type { Metadata } from "next";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { ServiceVisual } from "@/components/ServiceVisual";
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

      <header className="border-b border-white/8 bg-ink-2/50">
        <div className="container-x py-20 lg:py-28">
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

      <div className="container-x py-20 lg:py-28">
        <div id="grid" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dict.services.map((service, i) => (
            <Reveal key={service.slug} id={service.slug} delay={(i % 2) * 0.08}>
              <TiltCard max={4} className="h-full">
                <article className="panel flex h-full flex-col overflow-hidden rounded-2xl sm:flex-row">
                  <div className="relative h-44 shrink-0 overflow-hidden bg-indigo-deep/60 sm:h-auto sm:w-48">
                    <ServiceVisual
                      slug={service.slug}
                      alt={`${service.title} — Glomark`}
                      priority={i < 4}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-[0.7rem] font-semibold text-muted">
                      0{i + 1}
                    </span>
                    <h2 className="mt-2 font-display text-2xl text-cream">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/60">
                      {service.summary}
                    </p>
                    <LocaleLink
                      locale={locale}
                      href={`/services/${service.slug}`}
                      className="mt-5 inline-flex w-fit items-center gap-1.5 text-[0.85rem] font-semibold text-lime lime-underline"
                    >
                      {dict.common.exploreService}
                    </LocaleLink>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
