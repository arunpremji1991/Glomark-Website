import Link from "next/link";
import type { ComponentProps } from "react";
import { localeHref, type Locale } from "@/lib/i18n";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  locale: Locale;
  href: string; // locale-relative, e.g. "/services"
};

/** next/link that automatically prefixes the current locale. */
export function LocaleLink({ locale, href, ...rest }: LocaleLinkProps) {
  return <Link href={localeHref(locale, href)} {...rest} />;
}
