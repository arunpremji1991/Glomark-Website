import { CONTACT } from "@/lib/site";

// Sits directly above the WhatsApp button (56px button + 24px gap = 80px),
// fixed in the same corner on every page. Tapping it dials the phone number
// directly — same "utility widget, not RTL-mirrored" reasoning as WhatsApp.
export function CallButton({ label }: { label: string }) {
  return (
    <a
      href={CONTACT.phoneHref}
      aria-label={label}
      className="fixed bottom-24 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink shadow-lg shadow-black/40 ring-1 ring-white/10 transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none"
    >
      <PhoneIcon className="h-6 w-6" />
    </a>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}
