import Image from "next/image";
import { CLIENT_LOGO_VERSION, CLIENT_SLUGS, type ClientSlug } from "@/lib/site";

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
  const version = CLIENT_LOGO_VERSION[slug];
  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`}>
      <Image
        src={`/media/clients/${slug}.webp${version ? `?v=${version}` : ""}`}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 20vw, 40vw"
        className="object-contain p-6"
      />
    </div>
  );
}
