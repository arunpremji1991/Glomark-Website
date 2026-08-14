import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { GlomarkMark } from "@/components/GlomarkMark";

export function Statement({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-indigo-deep">
      <div
        aria-hidden
        className="absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-25 sm:-right-10"
        style={{
          background:
            "radial-gradient(circle, rgba(184,212,68,0.4) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative py-24 lg:py-32">
        <Reveal className="max-w-3xl">
          <GlomarkMark className="h-8 w-auto text-lime opacity-90" title="" />
          <p className="eyebrow mt-6">{dict.home.statementEyebrow}</p>
          <p className="mt-5 font-display text-3xl leading-[1.15] text-cream sm:text-4xl lg:text-5xl balance">
            {dict.home.statement}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70 pretty">
            {dict.home.statementBody}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
