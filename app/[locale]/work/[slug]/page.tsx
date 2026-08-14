import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { CLIENT_SLUGS, CLIENT_LINKS, CLIENT_GALLERY } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";
import { ClientLogo } from "@/components/ClientLogo";
import { MediaGallery } from "@/components/MediaGallery";
import { CtaBand } from "@/components/home/CtaBand";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CLIENT_SLUGS.map((slug) => ({ locale, slug })),
  );
}

async function resolve(locale: string, slug: string) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const index = dict.work.clients.findIndex((c) => c.slug === slug);
  if (index === -1) return null;
  return { dict, index, client: dict.work.clients[index] };
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
    path: `/work/${slug}`,
    title: resolved.client.metaTitle,
    description: resolved.client.metaDescription,
  });
}

export default async function ClientCasePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const resolved = await resolve(locale, slug);
  if (!resolved || !isLocale(locale)) notFound();
  const { dict, index, client } = resolved;

  const breadcrumbs = breadcrumbSchema(locale, [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.work, path: "/work" },
    { name: client.name, path: `/work/${client.slug}` },
  ]);

  const next = dict.work.clients[(index + 1) % dict.work.clients.length];
  const href = CLIENT_LINKS[client.slug];
  const gallery = CLIENT_GALLERY[client.slug];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <header className="border-b border-white/8 bg-ink-2/50">
        <div className="container-x py-20 lg:py-28">
          <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-center">
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-cream/95 sm:h-48 sm:w-48">
              <ClientLogo
                slug={client.slug}
                alt={`${client.name} logo`}
                className="h-full w-full"
                priority
              />
            </div>
            <div>
              <LocaleLink
                locale={locale}
                href="/work"
                className="text-[0.82rem] font-semibold text-cream/60 hover:text-lime"
              >
                ← {dict.common.backToWork}
              </LocaleLink>
              <p className="eyebrow mt-5">{client.tagline}</p>
              <h1 className="mt-3 max-w-2xl font-display text-4xl text-cream sm:text-5xl balance">
                {client.name}
              </h1>
              <ul className="mt-5 flex flex-wrap gap-2">
                {client.services.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-[0.78rem] font-medium text-lime"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-[0.86rem] font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                {client.linkLabel} ↗
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="container-x py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal className="space-y-5">
            <h2 className="eyebrow">{dict.work.scopeTitle}</h2>
            {client.scope.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-cream/75 pretty">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            <h2 className="eyebrow">{dict.work.approachTitle}</h2>
            {client.approach.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-cream/75 pretty">
                {para}
              </p>
            ))}
          </Reveal>
        </div>

        {gallery.length > 0 ? (
          <Reveal delay={0.12} className="mt-20">
            <h2 className="eyebrow">{dict.work.galleryTitle}</h2>
            <div className="mt-6">
              <MediaGallery
                items={gallery}
                viewLabel={dict.work.viewPost}
                watchLabel={dict.work.watchVideo}
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.15} className="mt-20 border-t border-white/8 pt-10">
          <p className="eyebrow">{locale === "ar" ? "التالي" : "Next"}</p>
          <LocaleLink
            locale={locale}
            href={`/work/${next.slug}`}
            className="mt-3 inline-block font-display text-3xl text-cream hover:text-lime transition-colors sm:text-4xl"
          >
            {next.name} →
          </LocaleLink>
        </Reveal>
      </div>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
