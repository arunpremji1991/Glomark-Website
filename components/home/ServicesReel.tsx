"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { LocaleLink } from "@/components/LocaleLink";

/**
 * Pinned, scroll-driven "reel" through the eight services: the section is
 * tall enough to give each service its own scroll range, a sticky viewport
 * stays fixed while scrollYProgress cross-fades + Ken-Burns-zooms between
 * the Higgsfield stills, with the copy following the same rhythm. One
 * continuous scene the page moves through, per the brief — built on
 * transform/opacity only (no WebGL), so it stays cheap on mobile.
 */
export function ServicesReel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const services = dict.services;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    // Reduced motion: a plain static stack, no scroll-linked transforms.
    return (
      <section className="container-x py-24 lg:py-32">
        <ReelHeading dict={dict} />
        <div className="mt-14 space-y-4">
          {services.map((service, i) => (
            <LocaleLink
              key={service.slug}
              locale={locale}
              href={`/services/${service.slug}`}
              className="panel flex items-center gap-6 rounded-2xl p-6 hover:border-lime/40"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={`/media/services/${service.slug}.webp`}
                  alt={`${service.title} — Glomark`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div>
                <span className="text-[0.7rem] font-semibold text-muted">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl text-cream">
                  {service.title}
                </h3>
              </div>
            </LocaleLink>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ height: `${services.length * 100}vh` }}>
      <div className="sticky top-0 h-dvh overflow-hidden bg-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-64"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,20,0.85) 0%, rgba(10,10,20,0) 100%)",
          }}
        />
        <div className="container-x pointer-events-none absolute inset-x-0 top-0 z-10 pt-28 lg:pt-32">
          <ReelHeading dict={dict} />
        </div>

        {services.map((service, i) => (
          <ReelSlide
            key={service.slug}
            index={i}
            total={services.length}
            progress={scrollYProgress}
            title={service.title}
            tagline={service.tagline}
            slug={service.slug}
            locale={locale}
            exploreLabel={dict.common.exploreService}
          />
        ))}

        <ReelProgress progress={scrollYProgress} count={services.length} />
      </div>
    </section>
  );
}

function ReelHeading({ dict }: { dict: Dictionary }) {
  return (
    <div className="pointer-events-none max-w-xl">
      <p className="eyebrow">{dict.home.servicesEyebrow}</p>
      <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl balance">
        {dict.home.servicesTitle}
      </h2>
    </div>
  );
}

function ReelSlide({
  index,
  total,
  progress,
  title,
  tagline,
  slug,
  locale,
  exploreLabel,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  tagline: string;
  slug: string;
  locale: Locale;
  exploreLabel: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const imgPad = 0.4 / total; // wide window: images cross-dissolve softly
  const txtPad = 0.08 / total; // narrow window: text swaps crisply, never
  // two headlines legible at once mid-crossfade

  const imageOpacity = useTransform(
    progress,
    [Math.max(0, start - imgPad), start, end - imgPad, Math.min(1, end)],
    [0, 1, 1, 0],
  );
  // Slow Ken-Burns zoom-out across each slide's active window.
  const scale = useTransform(progress, [start, end], [1.12, 1.0]);

  const textOpacity = useTransform(
    progress,
    [Math.max(0, start - txtPad), start, end - txtPad, Math.min(1, end)],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [Math.max(0, start - txtPad), start, end - txtPad, Math.min(1, end)],
    [16, 0, 0, -16],
  );

  return (
    <div aria-hidden={index !== 0} className="absolute inset-0">
      <motion.div style={{ opacity: imageOpacity }} className="absolute inset-0">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src={`/media/services/${slug}.webp`}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,20,0.35) 0%, rgba(10,10,20,0.45) 55%, rgba(10,10,20,0.92) 100%)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ opacity: textOpacity, y }}
        className="container-x absolute inset-x-0 bottom-24 lg:bottom-28"
      >
        <span className="text-[0.7rem] font-semibold text-lime">
          0{index + 1} / 0{total}
        </span>
        <h3 className="mt-2 max-w-lg font-display text-4xl text-cream sm:text-5xl balance">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-lg text-cream/75 pretty">{tagline}</p>
        <LocaleLink
          locale={locale}
          href={`/services/${slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-lime lime-underline"
        >
          {exploreLabel}
        </LocaleLink>
      </motion.div>
    </div>
  );
}

function ReelProgress({
  progress,
  count,
}: {
  progress: MotionValue<number>;
  count: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-y-0 end-6 z-10 hidden flex-col justify-center gap-2.5 sm:flex lg:end-10">
      {Array.from({ length: count }).map((_, i) => (
        <Tick key={i} index={i} count={count} progress={progress} />
      ))}
    </div>
  );
}

function Tick({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const start = index / count;
  const end = (index + 1) / count;
  const height = useTransform(
    progress,
    [start, (start + end) / 2, end],
    [16, 28, 16],
  );
  const opacity = useTransform(
    progress,
    [start, (start + end) / 2, end],
    [0.35, 1, 0.35],
  );
  return (
    <motion.span
      style={{ height, opacity }}
      className="w-[3px] rounded-full bg-lime"
    />
  );
}
