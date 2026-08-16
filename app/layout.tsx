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
      <head>
        {/* Google Tag Manager. Next.js's App Router always places its own
            required tags (charset, viewport, font preloads) before any
            manually-authored <head> content, regardless of source order or
            next/script strategy — confirmed by inspecting the built output.
            This marker-commented script is moved to the literal top of
            <head> in every generated page by scripts/inject-gtm.mjs, a
            postbuild step, so it's genuinely "as high as possible" rather
            than merely present somewhere in <head>. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TQ9R7JN3');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQ9R7JN3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
