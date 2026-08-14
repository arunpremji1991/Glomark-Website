import { SITE_URL } from "@/lib/site";

// Root "/": Next.js requires app/page.tsx to exist alongside app/layout.tsx,
// and `output: "export"` has no server to issue a real redirect — so this
// renders a tiny, crawler-safe static redirect to the default locale (/en),
// per the brief ("Default to English"). The <meta httpEquiv="refresh"> tag
// below is hoisted into <head> by Next.js (html/body already come from the
// root layout, so this page must not render its own). A canonical pointer
// plus a visible link keep it usable with JS off.
export const metadata = {
  title: "Glomark",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/en/` },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a14",
          color: "#f4f3ee",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p>
          Redirecting to{" "}
          <a href="/en/" style={{ color: "#b8d444" }}>
            Glomark (English)
          </a>{" "}
          /{" "}
          <a href="/ar/" style={{ color: "#b8d444" }}>
            جلومارك (عربي)
          </a>
        </p>
      </div>
    </>
  );
}
