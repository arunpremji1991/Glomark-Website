import { Reveal } from "@/components/Reveal";

export function ServiceTrust({
  eyebrow,
  title,
  points,
}: {
  eyebrow: string;
  title: string;
  points: { title: string; body: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-indigo-deep">
      <div
        aria-hidden
        className="absolute -left-24 bottom-0 h-[420px] w-[420px] opacity-25 sm:-left-10"
        style={{
          background:
            "radial-gradient(circle, rgba(184,212,68,0.35) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lime" />
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl balance">
            {title}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.07} className="panel rounded-2xl p-6">
              <h3 className="font-display text-lg text-lime">{point.title}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-cream/70 pretty">
                {point.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
