import Image from "next/image";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/site";

// Higgsfield-generated abstract stills (see README) — one per service, in
// the brand palette, echoing the logo's arc motif. Sits behind a lime
// glyph mark so every card keeps the same signature accent regardless of
// the underlying artwork.
export function ServiceVisual({
  slug,
  alt,
  className,
  priority = false,
}: {
  slug: ServiceSlug;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  if (!SERVICE_SLUGS.includes(slug)) return null;
  return (
    <Image
      src={`/media/services/${slug}.webp`}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 25vw, 50vw"
      className={`object-cover ${className ?? ""}`}
    />
  );
}
