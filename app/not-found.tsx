import Link from "next/link";
import { GlomarkMark } from "@/components/GlomarkMark";

// Top-level 404 (used for unknown routes / the static export's 404.html).
// Locale-neutral by necessity — we don't know the visitor's language here.
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 text-center">
      <GlomarkMark className="h-10 w-auto text-lime" title="Glomark" />
      <h1 className="mt-8 font-display text-5xl text-cream">404</h1>
      <p className="mt-3 max-w-sm text-cream/60">
        This page doesn&apos;t exist. / هذه الصفحة غير موجودة.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/en/"
          className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink"
        >
          English
        </Link>
        <Link
          href="/ar/"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-cream"
        >
          عربي
        </Link>
      </div>
    </div>
  );
}
