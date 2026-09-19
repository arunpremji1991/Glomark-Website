import Image from "next/image";
import { Reveal } from "@/components/Reveal";

// Editorial opening for /blog — same copy the site already ships
// (dict.blog.eyebrow/title/intro), presented with a magazine-style type
// scale instead of the boxed page header used elsewhere on the site. The
// background photo (a silhouetted camera on a tripod against a night
// skyline — public/media/blog/blog-index-cover.webp, Pexels, free for
// commercial use) is purely decorative, same treatment as the article
// header's hero image in app/[locale]/blog/[slug]/page.tsx.
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
    <header className="relative overflow-hidden border-b border-white/8">
      <div aria-hidden className="absolute inset-0 opacity-45">
        <Image
          src="/media/blog/blog-index-cover.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,20,0.55) 0%, rgba(10,10,20,0.85) 100%)",
        }}
      />
      <div className="container-x relative py-20 lg:py-32">
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
