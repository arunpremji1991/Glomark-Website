import type { Dictionary, Locale } from "@/lib/i18n";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { ClientLogo } from "@/components/ClientLogo";

export function FeaturedWork({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const clients = dict.work.clients.slice(0, 3);

  return (
    <section className="container-x py-24 lg:py-32">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="eyebrow">{dict.home.workEyebrow}</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl balance">
            {dict.home.workTitle}
          </h2>
          <p className="mt-4 text-lg text-cream/65 pretty">{dict.home.workSub}</p>
        </div>
        <LocaleLink
          locale={locale}
          href="/work"
          className="shrink-0 text-[0.9rem] font-semibold text-cream lime-underline hover:text-lime"
        >
          {dict.nav.work}
        </LocaleLink>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {clients.map((client, i) => (
          <Reveal key={client.slug} delay={i * 0.08}>
            <TiltCard max={5} className="h-full">
              <LocaleLink
                locale={locale}
                href={`/work/${client.slug}`}
                className="panel group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <article className="flex h-full flex-col">
                  <div className="relative h-52 overflow-hidden bg-cream/95">
                    <ClientLogo slug={client.slug} alt={`${client.name} logo`} className="h-full w-full" />
                  </div>
                  <div className="p-6">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-lime">
                      {client.services[0]}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-cream">
                      {client.name}
                    </h3>
                    <p className="mt-3 text-[0.86rem] text-cream/70">
                      {client.summary}
                    </p>
                  </div>
                </article>
              </LocaleLink>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
