import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export function Statement({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-indigo-deep">
      <div
        aria-hidden
        className="absolute -right-24 top-0 h-[420px] w-[420px] opacity-25 sm:-right-10"
        style={{
          background:
            "radial-gradient(circle, rgba(184,212,68,0.4) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative py-24 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lime" />
            {dict.home.statementEyebrow}
          </p>
          <p className="relative mt-5 font-display text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl balance">
            {dict.home.statement}
            <span
              aria-hidden
              className="absolute -right-2 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-lime/70 lg:inline-block"
            />
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70 pretty">
            {dict.home.statementBody}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 divide-y divide-white/10 border border-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {dict.home.process.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="h-full">
              <TiltCard
                max={4}
                className="group relative h-full overflow-hidden p-8 transition-colors duration-300 hover:bg-white/[0.03] lg:p-9"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-4 select-none font-display text-8xl font-bold text-white/[0.04] transition-all duration-500 ease-out group-hover:-right-1 group-hover:-top-2 group-hover:text-lime/[0.09] lg:text-9xl"
                >
                  {step.number}
                </span>

                <p className="relative font-display text-sm font-bold tracking-wide text-lime">
                  {step.number}
                </p>
                <h3 className="relative mt-6 font-display text-2xl text-cream transition-colors duration-300 group-hover:text-lime">
                  {step.title}
                </h3>
                <p className="relative mt-3 max-w-[26ch] text-[0.92rem] leading-relaxed text-cream/60 pretty">
                  {step.body}
                </p>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
