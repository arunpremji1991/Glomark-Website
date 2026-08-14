"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import { GlomarkLogo, GlomarkMark } from "./GlomarkMark";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Strip the current locale prefix so we can rebuild the same path in the
  // other language, e.g. "/ar/services/branding" -> "/services/branding".
  const restPath = pathname.replace(/^\/(en|ar)/, "") || "/";
  const otherLocale: Locale = locale === "en" ? "ar" : "en";

  const navItems = [
    { href: "/", label: dict.nav.home },
    { href: "/services", label: dict.nav.services },
    { href: "/work", label: dict.nav.work },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-white/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link
          href={localeHref(locale, "/")}
          className="shrink-0"
          aria-label="Glomark — home"
        >
          <GlomarkLogo />
        </Link>

        <nav
          aria-label={dict.nav.menu}
          className="hidden lg:flex items-center gap-9"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? restPath === "/"
                : restPath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={localeHref(locale, item.href)}
                className={`text-[0.92rem] font-medium tracking-wide transition-colors hover:text-lime ${
                  active ? "text-lime" : "text-cream/85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href={CONTACT.phoneHref}
            className="text-[0.9rem] text-cream/70 hover:text-lime transition-colors"
          >
            {CONTACT.phone}
          </a>
          <LangToggle locale={locale} otherLocale={otherLocale} dict={dict} restPath={restPath} />
          <Link
            href={localeHref(locale, "/contact")}
            className="inline-flex items-center rounded-full bg-lime px-5 py-2.5 text-[0.86rem] font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {dict.nav.startProject}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.nav.close : dict.nav.menu}
          aria-expanded={open}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream"
        >
          <BurgerIcon open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-ink/97 backdrop-blur-md border-b border-white/8"
          >
            <div className="container-x flex flex-col gap-1 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localeHref(locale, item.href)}
                  className="py-3 text-lg font-display font-medium text-cream border-b border-white/6 last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-5">
                <a href={CONTACT.phoneHref} className="text-sm text-cream/70">
                  {CONTACT.phone}
                </a>
                <LangToggle
                  locale={locale}
                  otherLocale={otherLocale}
                  dict={dict}
                  restPath={restPath}
                />
              </div>
              <Link
                href={localeHref(locale, "/contact")}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink"
              >
                <GlomarkMark className="h-4 w-auto text-ink" title="" />
                {dict.nav.startProject}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function LangToggle({
  locale,
  otherLocale,
  dict,
  restPath,
}: {
  locale: Locale;
  otherLocale: Locale;
  dict: Dictionary;
  restPath: string;
}) {
  return (
    <Link
      href={localeHref(otherLocale, restPath)}
      hrefLang={otherLocale}
      aria-label={dict.nav.switchTo}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[0.82rem] font-semibold text-cream/85 hover:border-lime/60 hover:text-lime transition-colors"
    >
      {dict.nav.switchLabel}
    </Link>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <line
        x1="2"
        y1="5.5"
        x2="16"
        y2="5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "transform 0.25s ease",
          transform: open ? "translateY(3.5px) rotate(45deg)" : "none",
        }}
      />
      <line
        x1="2"
        y1="12.5"
        x2="16"
        y2="12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "transform 0.25s ease",
          transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none",
        }}
      />
    </svg>
  );
}
