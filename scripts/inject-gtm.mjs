// Runs after `next build` (see package.json → "postbuild"). Next.js's App
// Router always places its own required <head> tags (charset, viewport,
// font preloads, icons) before any manually-authored <head> content — this
// is true regardless of source order in app/layout.tsx or next/script
// strategy (confirmed by inspecting the built output). Google's
// installation instructions ask for the GTM script "as high as possible"
// in <head>, so this walks every generated HTML file and physically moves
// it to the literal top — restoring the exact official snippet, including
// its HTML comments, which JSX can't author directly.
import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const OUT_DIR = fileURLToPath(new URL("../out", import.meta.url));
const GTM_ID = "GTM-TQ9R7JN3";

const HEAD_SNIPPET = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;

const BODY_SNIPPET = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

// Matches the app/layout.tsx-authored <script>...</script> for GTM,
// wherever Next.js placed it in <head>.
const HEAD_SCRIPT_RE =
  /<script>\(function\(w,d,s,l,i\)\{[\s\S]*?'script','dataLayer','GTM-TQ9R7JN3'\);<\/script>/;

// Matches the app/layout.tsx-authored noscript iframe for GTM.
const BODY_NOSCRIPT_RE =
  /<noscript><iframe src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-TQ9R7JN3"[^>]*><\/iframe><\/noscript>/;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (entry.endsWith(".html")) files.push(full);
  }
  return files;
}

let touched = 0;
for (const file of walk(OUT_DIR)) {
  let html = readFileSync(file, "utf8");
  if (!html.includes(GTM_ID)) continue;

  let changed = false;

  if (HEAD_SCRIPT_RE.test(html)) {
    html = html.replace(HEAD_SCRIPT_RE, "");
    html = html.replace("<head>", `<head>${HEAD_SNIPPET}`);
    changed = true;
  }

  if (BODY_NOSCRIPT_RE.test(html)) {
    html = html.replace(BODY_NOSCRIPT_RE, "");
    html = html.replace(/<body>/, `<body>${BODY_SNIPPET}`);
    changed = true;
  }

  if (changed) {
    writeFileSync(file, html);
    touched++;
  }
}

console.log(`[inject-gtm] repositioned GTM tags in ${touched} file(s)`);
