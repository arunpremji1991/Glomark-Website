import type { Metadata } from "next";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { ClientLogo } from "@/components/ClientLogo";
import { LocaleLink } from "@/components/LocaleLink";
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.work.clients.map((client, i) => (
            <Reveal key={client.slug} delay={(i % 3) * 0.07}>
              <TiltCard max={5} className="h-full">
                <LocaleLink
                  locale={locale}
                  href={`/work/${client.slug}`}
                  className="panel group flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <article className="flex h-full flex-col">
                    <div className="relative h-48 overflow-hidden bg-cream/95">
                      <ClientLogo
                        slug={client.slug}
                        alt={`${client.name} logo`}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-display text-xl text-cream">
                        {client.name}
                      </h2>
                      <p className="mt-1.5 text-[0.86rem] text-cream/55">
                        {client.tagline}
                      </p>
                      <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-cream/70 pretty">
                        {client.summary}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {client.services.slice(0, 3).map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-white/10 px-2.5 py-1 text-[0.7rem] text-cream/60"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </LocaleLink>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
