import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { CONTACT, SOCIAL } from "@/lib/site";
import { GlomarkLogo } from "./GlomarkMark";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 bg-ink-2">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <GlomarkLogo />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-cream/60 pretty">
              {dict.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-cream/70 transition-colors hover:border-lime/60 hover:text-lime"
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={dict.footer.servicesTitle}>
            <h3 className="eyebrow">{dict.footer.servicesTitle}</h3>
            <ul className="mt-4 space-y-2.5">
              {dict.services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={localeHref(locale, `/services/${s.slug}`)}
                    className="text-[0.92rem] text-cream/70 hover:text-lime transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.companyTitle}>
            <h3 className="eyebrow">{dict.footer.companyTitle}</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href={localeHref(locale, "/about")} className="text-[0.92rem] text-cream/70 hover:text-lime transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/work")} className="text-[0.92rem] text-cream/70 hover:text-lime transition-colors">
                  {dict.nav.work}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/blog")} className="text-[0.92rem] text-cream/70 hover:text-lime transition-colors">
                  {dict.nav.blog}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/services")} className="text-[0.92rem] text-cream/70 hover:text-lime transition-colors">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/contact")} className="text-[0.92rem] text-cream/70 hover:text-lime transition-colors">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow">{dict.footer.connectTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-[0.92rem] text-cream/70">
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-lime transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="hover:text-lime transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="pretty text-cream/55">{CONTACT.addressLine}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start gap-3 border-t border-white/8 pt-6 text-[0.82rem] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Glomark. {dict.footer.rights}
          </p>
          <p>{dict.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor" as const };
  switch (name) {
    case "Instagram":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 2.02.24 2.75.52.75.29 1.38.68 2.01 1.31.63.63 1.02 1.26 1.31 2.01.28.73.47 1.58.52 2.75.07 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.24 2.02-.52 2.75a5.55 5.55 0 0 1-1.31 2.01 5.55 5.55 0 0 1-2.01 1.31c-.73.28-1.58.47-2.75.52-1.25.07-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-2.02-.24-2.75-.52a5.55 5.55 0 0 1-2.01-1.31 5.55 5.55 0 0 1-1.31-2.01c-.28-.73-.47-1.58-.52-2.75C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.24-2.02.52-2.75.29-.75.68-1.38 1.31-2.01a5.55 5.55 0 0 1 2.01-1.31c.73-.28 1.58-.47 2.75-.52C8.4 2.2 8.8 2.2 12 2.2Zm0 2c-3.14 0-3.51 0-4.75.07-.96.04-1.48.2-1.82.34-.46.18-.78.39-1.13.74-.35.35-.56.67-.74 1.13-.14.34-.3.86-.34 1.82C3.15 9.34 3.15 9.71 3.15 12s0 2.66.07 3.9c.04.96.2 1.48.34 1.82.18.46.39.78.74 1.13.35.35.67.56 1.13.74.34.14.86.3 1.82.34 1.24.07 1.61.07 4.75.07s3.51 0 4.75-.07c.96-.04 1.48-.2 1.82-.34.46-.18.78-.39 1.13-.74.35-.35.56-.67.74-1.13.14-.34.3-.86.34-1.82.07-1.24.07-1.61.07-3.9s0-2.66-.07-3.9c-.04-.96-.2-1.48-.34-1.82a3.03 3.03 0 0 0-.74-1.13 3.03 3.03 0 0 0-1.13-.74c-.34-.14-.86-.3-1.82-.34C15.51 4.2 15.14 4.2 12 4.2Zm0 3.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm0 2a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm4.6-2.6a1.03 1.03 0 1 1 0 2.06 1.03 1.03 0 0 1 0-2.06Z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...common} aria-hidden>
          <path d="M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.06c0-.89.25-1.5 1.52-1.5h1.63V3.83A21.9 21.9 0 0 0 14.3 3.7c-2.35 0-3.96 1.43-3.96 4.06v2.26H7.68v3.08h2.66V21h3.16Z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common} aria-hidden>
          <path d="M6.94 8.5H3.56V20.4h3.38V8.5ZM5.25 3.1a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20.4h-3.37v-6.2c0-1.48-.03-3.38-2.06-3.38-2.07 0-2.38 1.62-2.38 3.28v6.3H9.26V8.5h3.24v1.62h.05c.45-.86 1.55-1.76 3.2-1.76 3.42 0 4.05 2.25 4.05 5.18v6.86Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common} aria-hidden>
          <path d="M21.6 7.2s-.21-1.5-.87-2.16c-.83-.87-1.76-.87-2.19-.92C15.44 4 12 4 12 4h-.01s-3.44 0-6.54.12c-.43.05-1.36.05-2.19.92C2.6 5.7 2.4 7.2 2.4 7.2S2.19 8.94 2.19 10.7v1.6c0 1.75.2 3.5.2 3.5s.2 1.5.86 2.16c.83.87 1.92.85 2.4.94 1.75.17 7.35.22 7.35.22s3.45 0 6.55-.13c.43-.05 1.36-.05 2.19-.92.66-.66.87-2.16.87-2.16s.2-1.75.2-3.5v-1.6c0-1.76-.2-3.5-.2-3.5ZM9.95 14.6V8.9l5.6 2.86-5.6 2.85Z" />
        </svg>
      );
    default:
      return null;
  }
}
