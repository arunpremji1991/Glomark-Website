import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { SERVICE_SLUGS } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";
import { ServiceVisual } from "@/components/ServiceVisual";
import { CtaBand } from "@/components/home/CtaBand";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

async function resolve(locale: string, slug: string) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const index = dict.services.findIndex((s) => s.slug === slug);
  if (index === -1) return null;
  return { dict, index, service: dict.services[index] };
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const resolved = await resolve(locale, slug);
  if (!resolved) return {};
  return buildMetadata({
    locale: locale as "en" | "ar",
    path: `/services/${slug}`,
    title: resolved.service.metaTitle,
    description: resolved.service.metaDescription,
  });
}

export default async function ServiceDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const resolved = await resolve(locale, slug);
  if (!resolved || !isLocale(locale)) notFound();
  const { dict, index, service } = resolved;

  const schema = serviceSchema(service, locale, dict);
  const breadcrumbs = breadcrumbSchema(locale, [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.services, path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  const next = dict.services[(index + 1) % dict.services.length];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <header className="relative overflow-hidden border-b border-white/8 bg-ink-2/50">
        <div className="absolute inset-0 opacity-50">
          <ServiceVisual
            slug={service.slug}
            alt={`${service.title} — Glomark`}
            priority
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,20,0.55) 0%, rgba(10,10,20,0.75) 100%)",
          }}
        />
        <div className="container-x relative py-20 lg:py-28">
          <Reveal>
            <LocaleLink
              locale={locale}
              href="/services"
              className="text-[0.82rem] font-semibold text-cream/60 hover:text-lime"
            >
              ← {dict.common.backToServices}
            </LocaleLink>
            <p className="eyebrow mt-5">0{index + 1} / 08</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl balance">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-lime/90 pretty">
              {service.tagline}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-x py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="max-w-prose2 space-y-6">
            {service.description.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-cream/75 pretty">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel rounded-2xl p-7">
              <h2 className="eyebrow">
                {locale === "ar" ? "ماذا نُقدّم" : "What's included"}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] text-cream/80"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <LocaleLink
                locale={locale}
                href="/contact"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-lime px-5 py-3 text-[0.9rem] font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                {dict.common.getInTouch}
              </LocaleLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-20 border-t border-white/8 pt-10">
          <p className="eyebrow">{locale === "ar" ? "التالي" : "Next"}</p>
          <LocaleLink
            locale={locale}
            href={`/services/${next.slug}`}
            className="mt-3 inline-block font-display text-3xl text-cream hover:text-lime transition-colors sm:text-4xl"
          >
            {next.title} →
          </LocaleLink>
        </Reveal>
      </div>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
