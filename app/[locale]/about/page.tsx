import type { Metadata } from "next";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { GlomarkMark } from "@/components/GlomarkMark";
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
    path: "/about",
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
  });
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const breadcrumbs = breadcrumbSchema(locale, [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.about, path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <header className="relative overflow-hidden border-b border-white/8 bg-ink-2/50">
        <div
          aria-hidden
          className="absolute -left-16 -top-16 h-72 w-72 opacity-20 sm:-left-8"
          style={{
            background:
              "radial-gradient(circle, rgba(184,212,68,0.5) 0%, transparent 70%)",
          }}
        />
        <div className="container-x relative py-20 lg:py-28">
          <Reveal>
            <p className="eyebrow">{dict.about.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl balance">
              {dict.about.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65 pretty">
              {dict.about.lead}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-x py-20 lg:py-28">
        <Reveal className="mx-auto max-w-prose2 space-y-6">
          {dict.about.story.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-cream/75 pretty">
              {para}
            </p>
          ))}
        </Reveal>
      </div>

      <section className="border-t border-white/8 bg-ink-2/50">
        <div className="container-x py-20 lg:py-28">
          <Reveal>
            <p className="eyebrow">{dict.about.valuesTitle}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {dict.about.values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <div className="panel h-full rounded-2xl p-7">
                  <GlomarkMark className="h-6 w-auto text-lime/70" title="" />
                  <h2 className="mt-4 font-display text-xl text-cream">
                    {v.title}
                  </h2>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-cream/65 pretty">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
