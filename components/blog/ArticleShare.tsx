"use client";

import { useState } from "react";

// Minimal share row — WhatsApp/LinkedIn/Facebook open their own share
// intents, "copy link" uses the Clipboard API with a small local
// aria-live confirmation instead of a toast library.
export function ArticleShare({
  url,
  title,
  shareLabel,
  copyLabel,
  copiedLabel,
}: {
  url: string;
  title: string;
  shareLabel: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently no-op,
      // the other share buttons still work.
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon />,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon />,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon />,
    },
  ];

  return (
    <div role="group" aria-label={shareLabel} className="flex items-center gap-2">
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.name}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-cream/70 transition-colors hover:border-lime/60 hover:text-lime"
        >
          {l.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copyLabel}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-cream/70 transition-colors hover:border-lime/60 hover:text-lime"
      >
        <LinkIcon />
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
      {copied ? (
        <span className="text-[0.78rem] font-medium text-lime" aria-hidden>
          {copiedLabel}
        </span>
      ) : null}
    </div>
  );
}

const iconProps = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "currentColor" as const, "aria-hidden": true };

function WhatsAppIcon() {
  return (
    <svg {...iconProps}>
      <path d="M17.5 14.4c-.3-.15-1.75-.86-2-.96-.28-.1-.48-.15-.68.15-.2.3-.78.96-.95 1.15-.18.2-.35.22-.65.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.79-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.94-2.25-.25-.6-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.15 4.55.72.3 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.4.25-.7.25-1.28.18-1.4-.08-.13-.28-.2-.58-.35Z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.86.51 3.6 1.4 5.09L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.1c-1.68 0-3.24-.48-4.57-1.32l-.33-.2-3 .8.8-2.93-.21-.3A8.08 8.08 0 0 1 3.9 12 8.1 8.1 0 1 1 12 20.1Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6.94 8.5H3.56V20.4h3.38V8.5ZM5.25 3.1a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20.4h-3.37v-6.2c0-1.48-.03-3.38-2.06-3.38-2.07 0-2.38 1.62-2.38 3.28v6.3H9.26V8.5h3.24v1.62h.05c.45-.86 1.55-1.76 3.2-1.76 3.42 0 4.05 2.25 4.05 5.18v6.86Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.06c0-.89.25-1.5 1.52-1.5h1.63V3.83A21.9 21.9 0 0 0 14.3 3.7c-2.35 0-3.96 1.43-3.96 4.06v2.26H7.68v3.08h2.66V21h3.16Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 13.5 13.5 10.5M8.5 15.5l-1.6 1.6a3 3 0 0 1-4.24-4.25L4.9 10.6a3 3 0 0 1 4.25 0M15.5 8.5l1.6-1.6a3 3 0 1 1 4.24 4.25L19.1 13.4a3 3 0 0 1-4.25 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
