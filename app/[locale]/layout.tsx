import { notFound } from "next/navigation";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CallButton } from "@/components/CallButton";
import { AmbientGlow } from "@/components/AmbientGlow";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Only /en and /ar exist as static pages.
export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    // `dir`/`lang` live here (not on <html>, which the true root layout
    // already owns) — see app/layout.tsx. Every child uses Tailwind's
    // `rtl:`/CSS `[dir="rtl"]` selectors, which match through this wrapper
    // exactly as they would through <html>, so the whole layout mirrors in
    // Arabic, not just text direction.
    <div lang={locale} dir={dict.dir} className="flex min-h-dvh flex-col">
      <AmbientGlow />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        {locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
      </a>
      <Header locale={locale} dict={dict} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
      <CallButton label={dict.common.callUs} />
      <WhatsAppButton label={dict.common.whatsapp} />
    </div>
  );
}
