import Image from "next/image";
import type { BrandImage } from "@/lib/site";

export function BrandShowcase({
  images,
  captions,
  clientName,
}: {
  images: BrandImage[];
  captions: string[];
  clientName: string;
}) {
  const wide = images.filter((i) => i.kind === "wide");
  const square = images.filter((i) => i.kind === "square");

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
        {wide.map((img, i) => (
          <figure key={img.file} className={i < 2 ? "md:col-span-2" : undefined}>
            <div className="overflow-hidden rounded-xl bg-indigo-deep/60">
              <Image
                src={`/media/clients/brand/${img.file}`}
                alt={`${clientName} — ${captions[i] ?? "brand identity"}`}
                width={1800}
                height={i < 2 ? 1012 : 1180}
                sizes={i < 2 ? "(min-width: 1024px) 90vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
                className="h-auto w-full"
              />
            </div>
            {captions[i] ? (
              <figcaption className="mt-3 text-[0.9rem] leading-relaxed text-cream/60">
                {captions[i]}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {square.length > 0 ? (
        <figure>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {square.map((img, i) => (
              <div
                key={img.file}
                className="relative aspect-square overflow-hidden rounded-xl bg-indigo-deep/60"
              >
                <Image
                  src={`/media/clients/brand/${img.file}`}
                  alt={`${clientName} — ${captions[wide.length] ?? "brand application"} (${i + 1})`}
                  fill
                  sizes="(min-width: 768px) 30vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {captions[wide.length] ? (
            <figcaption className="mt-3 text-[0.9rem] leading-relaxed text-cream/60">
              {captions[wide.length]}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </div>
  );
}
