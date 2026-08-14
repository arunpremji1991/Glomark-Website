import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function StatsBar({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-white/8 bg-ink-2/60">
      <div className="container-x grid grid-cols-2 gap-8 py-10 lg:grid-cols-4 lg:gap-6">
        {dict.home.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <p className="font-display text-3xl text-lime sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[0.82rem] text-cream/55">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
