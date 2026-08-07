import { Space_Grotesk, Open_Sans, Space_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const TITRE_SITE =
  "Paul Gibouin — Cours particuliers Maths, Physique-Chimie, NSI";
const DESCRIPTION_SITE =
  "Cours particuliers en mathématiques, physique-chimie et NSI pour collégiens et lycéens, en présentiel à Évry-Courcouronnes et en ligne.";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITRE_SITE,
    template: "%s | Paul Gibouin",
  },
  description: DESCRIPTION_SITE,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Paul Gibouin — Cours particuliers",
    title: TITRE_SITE,
    description: DESCRIPTION_SITE,
    images: [
      {
        url: "/logo.png",
        width: 720,
        height: 720,
        alt: "Paul Gibouin — Cours particuliers",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: TITRE_SITE,
    description: DESCRIPTION_SITE,
    images: ["/logo.png"],
  },
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
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
