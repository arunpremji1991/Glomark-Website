import Image from "next/image";
import { CLIENT_SLUGS, type ClientSlug } from "@/lib/site";

// Every client logo sits in the same fixed-size, centered box via
// object-contain, so square Instagram marks and wide wordmarks line up
// identically regardless of their original size or aspect ratio.
export function ClientLogo({
  slug,
  alt,
  className,
  priority = false,
}: {
  slug: ClientSlug;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  if (!CLIENT_SLUGS.includes(slug)) return null;
  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`}>
      <Image
        src={`/media/clients/${slug}.webp`}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 20vw, 40vw"
        className="object-contain p-6"
      />
    </div>
  );
}
