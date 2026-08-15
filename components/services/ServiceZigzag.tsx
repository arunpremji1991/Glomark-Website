"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Dictionary, Locale, ServiceContent } from "@/lib/i18n";
import { LocaleLink } from "@/components/LocaleLink";
import { ServiceVisual } from "@/components/ServiceVisual";

/**
 * Alternating "zigzag" service list: image and copy swap sides row by row,
 * each row reveals from its own side on scroll with a slow parallax drift
 * on the image, and a lime progress spine fills down the middle as you
 * move through the list — a more cinematic read than a plain grid, in
 * keeping with a media-production agency's own site.
 */
export function ServiceZigzag({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={listRef} className="relative">
      {!reduce ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/8 lg:block"
        >
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute inset-x-0 top-0 h-full origin-top bg-lime"
          />
        </div>
      ) : null}

      {dict.services.map((service, i) => (
        <ZigzagRow
          key={service.slug}
          service={service}
          index={i}
          total={dict.services.length}
          locale={locale}
          exploreLabel={dict.common.exploreService}
          reduce={!!reduce}
        />
      ))}
    </div>
  );
}

function ZigzagRow({
  service,
  index,
  total,
  locale,
  exploreLabel,
  reduce,
}: {
  service: ServiceContent;
  index: number;
  total: number;
  locale: Locale;
  exploreLabel: string;
  reduce: boolean;
}) {
  const isEven = index % 2 === 0;
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: reveal } = useScroll({
    target: rowRef,
    offset: ["start 0.9", "start 0.4"],
  });
  const { scrollYProgress: through } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(reveal, [0, 1], [reduce ? 1 : 0, 1]);
  const xImg = useTransform(reveal, [0, 1], [reduce ? 0 : isEven ? -36 : 36, 0]);
  const xText = useTransform(reveal, [0, 1], [reduce ? 0 : isEven ? 36 : -36, 0]);
  const imgParallax = useTransform(through, [0, 1], [reduce ? 0 : -26, reduce ? 0 : 26]);

  return (
    <div
      ref={rowRef}
      id={service.slug}
      className="group relative scroll-mt-24 border-b border-white/8 py-16 first:border-t lg:py-24"
    >
      <div
        className={`container-x flex flex-col gap-10 lg:items-center lg:gap-16 ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <motion.div style={{ opacity, x: xImg }} className="lg:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-indigo-deep/60">
            <motion.div style={{ y: imgParallax }} className="absolute -inset-y-6 inset-x-0">
              <ServiceVisual
                slug={service.slug}
                alt={`${service.title} — Glomark`}
                priority={index < 2}
                className="scale-[1.08] transition-transform duration-700 ease-out group-hover:scale-[1.18]"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-10"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-4 right-4 select-none font-display text-6xl font-bold text-cream/10 transition-colors duration-500 group-hover:text-lime/25 sm:text-7xl"
            >
              0{index + 1}
            </span>
          </div>
        </motion.div>

        <motion.div style={{ opacity, x: xText }} className="lg:w-1/2">
          <p className="eyebrow">
            0{index + 1} / 0{total} — {service.tagline}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[0.98] text-cream sm:text-6xl lg:text-7xl balance">
            {service.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/65 pretty">
            {service.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {service.deliverables.slice(0, 3).map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 px-3 py-1.5 text-[0.78rem] text-cream/60"
              >
                {item}
              </li>
            ))}
          </ul>
          <LocaleLink
            locale={locale}
            href={`/services/${service.slug}`}
            className="mt-7 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-lime"
          >
            {exploreLabel}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5"
            >
              →
            </span>
          </LocaleLink>
        </motion.div>
      </div>
    </div>
  );
}
