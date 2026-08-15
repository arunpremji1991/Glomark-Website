"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
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
    { href: "/blog", label: dict.nav.blog },
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
          className="hidden lg:flex items-center gap-6 xl:gap-8"
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
              <div className="flex items-center justify-end pt-5">
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
  dict,
  restPath,
}: {
  locale: Locale;
  otherLocale: Locale;
  dict: Dictionary;
  restPath: string;
}) {
  const codes: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "ar", label: "AR" },
  ];

  return (
    <div
      role="group"
      aria-label={dict.nav.switchTo}
      className="inline-flex items-center gap-0.5 rounded-full border border-white/15 bg-white/[0.04] p-1"
    >
      <GlobeIcon className="mx-1.5 h-3.5 w-3.5 shrink-0 text-cream/40" />
      {codes.map(({ code, label }) => {
        const active = code === locale;
        return active ? (
          <span
            key={code}
            aria-current="true"
            className="rounded-full bg-lime px-2.5 py-1 text-[0.76rem] font-bold tracking-wide text-ink"
          >
            {label}
          </span>
        ) : (
          <Link
            key={code}
            href={localeHref(code, restPath)}
            hrefLang={code}
            className="rounded-full px-2.5 py-1 text-[0.76rem] font-bold tracking-wide text-cream/50 transition-colors hover:text-lime"
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M2 8h12M8 1.6c1.7 1.8 2.6 4 2.6 6.4S9.7 12.6 8 14.4C6.3 12.6 5.4 10.4 5.4 8S6.3 3.4 8 1.6Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
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
