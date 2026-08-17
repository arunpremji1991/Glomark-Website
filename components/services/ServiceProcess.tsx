import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export function ServiceProcess({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; body: string }[];
}) {
  return (
    <Reveal className="mt-20 border-t border-white/8 pt-16 lg:mt-24 lg:pt-20">
      <h2 className="eyebrow">{title}</h2>
      <div className="mt-8 grid grid-cols-1 divide-y divide-white/10 border border-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.06} className="h-full">
            <TiltCard
              max={4}
              className="group relative h-full overflow-hidden p-7 transition-colors duration-300 hover:bg-white/[0.03]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-4 select-none font-display text-7xl font-bold text-white/[0.04] transition-all duration-500 ease-out group-hover:-right-1 group-hover:-top-2 group-hover:text-lime/[0.09]"
              >
                0{i + 1}
              </span>
              <p className="relative font-display text-sm font-bold tracking-wide text-lime">
                0{i + 1}
              </p>
              <h3 className="relative mt-5 font-display text-xl text-cream transition-colors duration-300 group-hover:text-lime">
                {step.title}
              </h3>
              <p className="relative mt-3 max-w-[26ch] text-[0.88rem] leading-relaxed text-cream/60 pretty">
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
    </Reveal>
  );
}
