import type { Metadata } from "next";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { ServiceGlyph } from "@/components/ServiceGlyph";
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
    path: "/work",
    title: dict.work.metaTitle,
    description: dict.work.metaDescription,
  });
}

export default async function WorkPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const breadcrumbs = breadcrumbSchema(locale, [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.work, path: "/work" },
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
            <p className="eyebrow">{dict.work.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl balance">
              {dict.work.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65 pretty">
              {dict.work.intro}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-x py-20 lg:py-28">
        <Reveal className="panel mb-12 rounded-xl px-6 py-4">
          <p className="text-[0.86rem] text-cream/60 pretty">
            {dict.work.placeholderNote}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.work.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.07}>
              <TiltCard max={5} className="h-full">
                <article className="panel flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="relative h-48 overflow-hidden bg-indigo-deep/60">
                    <ServiceGlyph index={i} className="h-full w-full" />
                  </div>
                  <div className="p-6">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-lime">
                      {item.category}
                    </p>
                    <h2 className="mt-2 font-display text-xl text-cream">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-[0.86rem] text-cream/55">
                      {item.client}
                    </p>
                    <p className="mt-3 text-[0.86rem] text-cream/70">
                      {item.result}
                    </p>
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
