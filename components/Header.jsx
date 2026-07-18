"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/matieres/mathematiques", label: "Mathématiques" },
  { href: "/matieres/physique", label: "Physique" },
  { href: "/matieres/chimie", label: "Chimie" },
  { href: "/matieres/nsi", label: "NSI" },
  { href: "/qcm", label: "QCM" },
  { href: "/a-propos", label: "À propos", separateur: true },
  { href: "/tarifs", label: "Tarifs" },
];

const ESPACE_ELEVE = { href: "/espace-eleve", label: "Espace élève" };

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-gold-dim">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          onClick={() => setMenuOuvert(false)}
          className="font-display text-lg tracking-tight text-cream"
        >
          Paul Gibouin
        </Link>

        {/* Navigation desktop + bouton Espace élève */}
        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-6 font-sans text-sm text-cream/80">
            {NAV_LINKS.flatMap((link) => [
              link.separateur ? (
                <span
                  key={`${link.href}-separateur`}
                  className="h-4 w-px bg-gold-dim"
                  aria-hidden="true"
                />
              ) : null,
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-gold ${
                  pathname === link.href ? "text-gold" : ""
                }`}
              >
                {link.label}
              </Link>,
            ])}
          </nav>
          <Link
            href={ESPACE_ELEVE.href}
            className={`rounded-full border px-4 py-1.5 font-sans text-sm transition-colors ${
              pathname === ESPACE_ELEVE.href
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold text-gold hover:bg-gold/10"
            }`}
          >
            {ESPACE_ELEVE.label}
          </Link>
        </div>

        {/* Bouton hamburger, mobile uniquement */}
        <button
          type="button"
          onClick={() => setMenuOuvert((ouvert) => !ouvert)}
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOuvert}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-gold-dim text-cream md:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOuvert ? (
              <path
                d="M2 2L16 16M16 2L2 16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 4.5H16M2 9H16M2 13.5H16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Panneau de navigation mobile */}
      {menuOuvert ? (
        <nav className="flex flex-col gap-1 border-t border-gold-dim px-6 py-4 font-sans text-sm text-cream/80 md:hidden">
          {NAV_LINKS.flatMap((link) => [
            link.separateur ? (
              <hr
                key={`${link.href}-separateur`}
                className="my-2 border-gold-dim"
              />
            ) : null,
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOuvert(false)}
              className={`rounded-md px-3 py-2 transition-colors hover:bg-navy-light hover:text-gold ${
                pathname === link.href ? "text-gold" : ""
              }`}
            >
              {link.label}
            </Link>,
          ])}
          <Link
            href={ESPACE_ELEVE.href}
            onClick={() => setMenuOuvert(false)}
            className={`mt-2 rounded-md border px-3 py-2 text-center transition-colors ${
              pathname === ESPACE_ELEVE.href
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold text-gold hover:bg-gold/10"
            }`}
          >
            {ESPACE_ELEVE.label}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
