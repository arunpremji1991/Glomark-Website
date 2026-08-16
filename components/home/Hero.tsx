"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref, isRtl } from "@/lib/i18n";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { GlomarkMark } from "@/components/GlomarkMark";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-ink">
      <HeroCanvas mirrored={isRtl(locale)} />
      {/* Wash to keep hero text readable over the scene at any device. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,20,0.35) 0%, rgba(10,10,20,0.15) 40%, rgba(10,10,20,0.85) 100%)",
        }}
      />

      <div className="container-x relative z-10 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-7 flex items-center gap-2.5"
        >
          <GlomarkMark className="h-4 w-auto text-lime" title="" />
          <p className="eyebrow">{dict.home.heroEyebrow}</p>
        </motion.div>

        <h1 className="max-w-4xl font-display text-[13vw] leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.5rem] balance">
          <motion.span
            initial={{ opacity: 0, y: reduce ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
            className="block text-cream"
          >
            {dict.home.heroTitleLead}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: reduce ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease }}
            className="block text-lime"
          >
            {dict.home.heroTitleAccent}.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-cream/75 pretty"
        >
          {dict.home.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.46, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href={localeHref(locale, "/contact")}
            className="inline-flex items-center rounded-full bg-lime px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {dict.home.heroCtaPrimary}
          </Link>
          <Link
            href={localeHref(locale, "/services")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[0.95rem] font-medium text-cream/90 transition-colors hover:border-lime/50 hover:text-lime"
          >
            {dict.home.heroCtaSecondary}
          </Link>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-8 z-10 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-2 text-cream/40">
          <span className="text-[0.68rem] uppercase tracking-eyebrow">
            {dict.common.scroll}
          </span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-lime/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
