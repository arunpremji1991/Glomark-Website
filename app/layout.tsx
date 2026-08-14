import type { Metadata } from "next";
import { display, body, arabic } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Glomark — Marketing, Media & Branding Agency",
    template: "%s",
  },
  icons: {
    icon: "/brand/glomark-symbol.svg",
    shortcut: "/brand/glomark-symbol.svg",
    apple: "/brand/glomark-symbol.svg",
  },
};

// This is the single root <html>/<body> Next.js requires. Locale-specific
// `lang`/`dir` are applied one level down in app/[locale]/layout.tsx on the
// page wrapper — see that file for why, and lib/i18n.ts for the locale list.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
