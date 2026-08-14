import { CONTACT } from "@/lib/site";

// Persistent chat entry point, fixed in the same corner across both locales
// (a utility widget, not primary content — so it isn't RTL-mirrored).
export function WhatsAppButton({ label }: { label: string }) {
  return (
    <a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 ring-1 ring-white/10 transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.3-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.57-.48-.5-.65-.5-.17-.01-.36-.01-.56-.01-.2 0-.51.07-.78.37-.26.3-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.15 5 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.25.17-1.37-.07-.12-.26-.2-.55-.34Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.02 2C6.5 2 2 6.48 2 11.98c0 1.83.5 3.55 1.36 5.03L2 22l5.13-1.34a10 10 0 0 0 4.89 1.26h.01c5.52 0 10-4.48 10-9.98C22 6.48 17.53 2 12.02 2Zm0 18.13h-.01a8.1 8.1 0 0 1-4.14-1.13l-.3-.18-3.05.8.81-2.96-.2-.31a8.08 8.08 0 0 1-1.25-4.37c0-4.48 3.66-8.13 8.16-8.13 2.18 0 4.22.85 5.76 2.39a8.06 8.06 0 0 1 2.39 5.75c0 4.48-3.67 8.14-8.17 8.14Z"
      />
    </svg>
  );
}
