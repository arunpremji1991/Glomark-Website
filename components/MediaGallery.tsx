import Image from "next/image";
import type { GalleryItem } from "@/lib/site";

export function MediaGallery({
  items,
  clientName,
  viewLabel,
  watchLabel,
}: {
  items: GalleryItem[];
  clientName: string;
  viewLabel: string;
  watchLabel: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => (
        <a
          key={item.file}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.isVideo ? watchLabel : viewLabel}
          className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-indigo-deep/60"
        >
          <Image
            src={`/media/clients/gallery/${item.file}`}
            alt={`${clientName} — ${item.isVideo ? "video" : "photo"} content by Glomark (${i + 1})`}
            fill
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />
          {item.isVideo ? (
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur-sm ring-1 ring-white/20 transition-transform group-hover:scale-110">
                <PlayIcon className="ml-0.5 h-4 w-4" />
              </span>
            </span>
          ) : null}
        </a>
      ))}
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M4 2.5v11l10-5.5-10-5.5Z" />
    </svg>
  );
}
