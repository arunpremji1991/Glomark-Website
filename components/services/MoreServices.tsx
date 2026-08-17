import type { Locale, ServiceContent } from "@/lib/i18n";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";

export function MoreServices({
  locale,
  title,
  services,
}: {
  locale: Locale;
  title: string;
  services: ServiceContent[];
}) {
  return (
    <Reveal className="mt-20 border-t border-white/8 pt-16 lg:mt-24 lg:pt-20">
      <h2 className="eyebrow">{title}</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {services.map((service) => (
          <LocaleLink
            key={service.slug}
            locale={locale}
            href={`/services/${service.slug}`}
            className="rounded-full border border-white/15 px-5 py-2.5 text-[0.88rem] font-medium text-cream/85 transition-colors hover:border-lime/50 hover:text-lime"
          >
            {service.title}
          </LocaleLink>
        ))}
      </div>
    </Reveal>
  );
}
