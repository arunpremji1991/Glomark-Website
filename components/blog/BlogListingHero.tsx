import { Reveal } from "@/components/Reveal";

// Editorial opening for /blog — same copy the site already ships
// (dict.blog.eyebrow/title/intro), presented with a magazine-style type
// scale instead of the boxed page header used elsewhere on the site.
export function BlogListingHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="border-b border-white/8">
      <div className="container-x py-20 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl text-cream sm:text-6xl lg:text-7xl balance">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/65 pretty sm:text-xl">
            {intro}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
