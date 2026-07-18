import { Fraunces, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Titres — charte graphique
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Corps de texte — charte graphique
const inter = Inter({
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
    "Cours particuliers en mathématiques, physique-chimie et NSI pour collégiens et lycéens, en présentiel à [TA_VILLE] et en ligne.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
