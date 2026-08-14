import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

// Display: characterful grotesque, used with restraint for headings.
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body: clean, warm grotesque for reading text and UI.
export const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Arabic: proper Arabic face for the RTL locale.
export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
