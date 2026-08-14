import type { Metadata } from "next";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

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
    path: "/contact",
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
  });
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale);
  const breadcrumbs = breadcrumbSchema(locale, [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.contact, path: "/contact" },
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
            <p className="eyebrow">{dict.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl balance">
              {dict.contact.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65 pretty">
              {dict.contact.intro}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-x py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="panel rounded-2xl p-7 sm:p-9">
            <ContactForm dict={dict} />
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <div>
              <h2 className="eyebrow">{dict.contact.directTitle}</h2>
              <ul className="mt-4 space-y-3 text-[0.98rem]">
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="text-cream/85 hover:text-lime transition-colors"
                  >
                    {dict.common.call}: {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.emailHref}
                    className="text-cream/85 hover:text-lime transition-colors"
                  >
                    {dict.common.email}: {CONTACT.email}
                  </a>
                </li>
                <li className="text-cream/65 pretty">
                  {dict.common.location}: {CONTACT.addressLine}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">{dict.contact.hoursTitle}</h2>
              <p className="mt-3 text-[0.95rem] text-cream/65">
                {dict.contact.hours}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={CONTACT.mapEmbed}
                title={
                  locale === "ar"
                    ? "خريطة موقع جلومارك في صلالة"
                    : "Map showing Glomark's location in Salalah"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full grayscale invert-0"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
