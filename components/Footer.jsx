import { Link } from "next-view-transitions";
import { cookies } from "next/headers";
import { lireCodes } from "@/lib/codesAcces";
import SuggestionModal from "@/components/SuggestionModal";

const NOM_COOKIE = "espace_eleve_code";

const LIENS_MATIERES = [
  { href: "/matieres/mathematiques", label: "Mathématiques" },
  { href: "/matieres/physique", label: "Physique" },
  { href: "/matieres/chimie", label: "Chimie" },
  { href: "/matieres/nsi", label: "NSI" },
];

const LIENS_SITE = [
  { href: "/qcm", label: "QCM" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/a-propos", label: "À propos" },
  { href: "/espace-eleve", label: "Espace élève" },
];

export default async function Footer() {
  const cookieStore = await cookies();
  const code = cookieStore.get(NOM_COOKIE)?.value;
  const codes = code ? await lireCodes() : [];
  const entree = code
    ? codes.find(
        (c) => c.code.toUpperCase() === code.toUpperCase() && c.actif !== false
      )
    : null;

  return (
    <footer className="mt-auto border-t border-gold-dim bg-navy-deep">
      <div className="px-6 py-12 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg text-cream">Paul Gibouin</p>
            <p className="mt-2 font-sans text-sm text-cream/60">
              Cours particuliers à Évry-Courcouronnes et en ligne, du collège
              à la spécialité NSI en lycée.
            </p>
            <Link
              href="/tarifs#contact"
              className="mt-4 inline-block rounded-md bg-gold px-5 py-2.5 font-sans text-sm font-medium text-white transition active:scale-95 hover:opacity-90"
            >
              Réserver un premier cours
            </Link>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Matières
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-sm text-cream/70">
              {LIENS_MATIERES.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="hover:text-gold">
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Le site
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-sm text-cream/70">
              {LIENS_SITE.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="hover:text-gold">
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Contact
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-sm text-cream/70">
              <li>
                <a href="tel:+33649983203" className="hover:text-gold">
                  06 49 98 32 03
                </a>
              </li>
              <li>
                <a
                  href="mailto:paul.gibouin.17@gmail.com"
                  className="hover:text-gold"
                >
                  paul.gibouin.17@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <SuggestionModal prenom={entree?.prenom} />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gold-dim/50 pt-6 font-mono text-[11px] text-cream/40">
          © {new Date().getFullYear()} Paul Gibouin — Cours particuliers.
          Toutes les données élèves restent privées et ne sont jamais
          partagées.
        </div>
      </div>
    </footer>
  );
}
