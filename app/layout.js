import { Space_Grotesk, Open_Sans, Space_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Titres — charte graphique
const spaceGrotesk = Space_Grotesk({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Corps de texte — charte graphique
const openSans = Open_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Labels / code — charte graphique
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    default:
      "Paul Gibouin — Cours particuliers Maths, Physique-Chimie, Techno",
    template: "%s | Paul Gibouin",
  },
  description:
    "Cours particuliers en mathématiques, physique-chimie et NSI pour collégiens et lycéens, en présentiel à Évry-Courcouronnes et en ligne.",
};

const SCRIPT_THEME = `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html
        lang="fr"
        className={`${spaceGrotesk.variable} ${openSans.variable} ${spaceMono.variable} h-full antialiased`}
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: SCRIPT_THEME }} />
        </head>
        <body className="min-h-full flex flex-col bg-navy text-cream">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
