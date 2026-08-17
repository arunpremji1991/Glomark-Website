import type { Locale, ClientCase } from "@/lib/i18n";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { ClientLogo } from "@/components/ClientLogo";

export function RelatedWork({
  locale,
  title,
  clients,
}: {
  locale: Locale;
  title: string;
  clients: ClientCase[];
}) {
  if (clients.length === 0) return null;

  return (
    <Reveal className="mt-20 border-t border-white/8 pt-16 lg:mt-24 lg:pt-20">
      <h2 className="eyebrow">{title}</h2>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client, i) => (
          <Reveal key={client.slug} delay={i * 0.07}>
            <TiltCard max={5} className="h-full">
              <LocaleLink
                locale={locale}
                href={`/work/${client.slug}`}
                className="panel group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <article className="flex h-full flex-col">
                  <div className="relative h-40 overflow-hidden bg-cream/95">
                    <ClientLogo
                      slug={client.slug}
                      alt={`${client.name} logo`}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-lime">
                      {client.tagline}
                    </p>
                    <h3 className="mt-2 font-display text-lg text-cream group-hover:text-lime transition-colors">
                      {client.name}
                    </h3>
                    <p className="mt-3 text-[0.86rem] leading-relaxed text-cream/70">
                      {client.summary}
                    </p>
                  </div>
                </article>
              </LocaleLink>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
