import { Reveal } from "@/components/Reveal";

export function ServiceFaq({
  title,
  items,
}: {
  title: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <Reveal className="mt-20 border-t border-white/8 pt-16 lg:mt-24 lg:pt-20">
      <h2 className="eyebrow">{title}</h2>
      <div className="mt-8 divide-y divide-white/8 border-y border-white/8">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-cream marker:content-none">
              {item.question}
              <span
                aria-hidden
                className="shrink-0 text-xl text-lime transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-prose2 text-[0.95rem] leading-relaxed text-cream/70 pretty">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Reveal>
  );
}
