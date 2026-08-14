import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { GlomarkMark } from "@/components/GlomarkMark";
import { CONTACT } from "@/lib/site";

export function CtaBand({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="container-x pb-24 lg:pb-32">
      <Reveal className="relative overflow-hidden rounded-3xl bg-lime px-8 py-16 text-ink sm:px-14 sm:py-20">
        <GlomarkMark
          className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-auto text-ink/10 sm:h-72"
          title=""
        />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl balance">
            {dict.home.ctaTitle}
          </h2>
          <p className="mt-4 max-w-lg text-lg text-ink/75 pretty">
            {dict.home.ctaBody}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={localeHref(locale, "/contact")}
              className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-semibold text-cream transition-transform hover:scale-[1.03]"
            >
              {dict.common.getInTouch}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink/80 hover:text-ink"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
