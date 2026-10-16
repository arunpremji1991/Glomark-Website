import Image from "next/image";
import { BLOG_SLUGS, blogCoverPath, type BlogSlug } from "@/lib/site";

// Higgsfield-generated editorial stills (see README) — one per post, in the
// brand palette, distinct compositions from the service visuals.
export function BlogVisual({
  slug,
  alt,
  className,
  priority = false,
}: {
  slug: BlogSlug;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  if (!BLOG_SLUGS.includes(slug)) return null;
  return (
    <Image
      src={blogCoverPath(slug)}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 33vw, 100vw"
      className={`object-cover ${className ?? ""}`}
    />
  );
}
