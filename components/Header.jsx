import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/matieres/mathematiques", label: "Mathématiques" },
  { href: "/matieres/physique", label: "Physique" },
  { href: "/matieres/chimie", label: "Chimie" },
  { href: "/matieres/technologie", label: "Technologie" },
  { href: "/qcm", label: "QCM" },
  { href: "/a-propos", label: "À propos" },
  { href: "/tarifs", label: "Tarifs" },
];

export default function Header() {
  return (
    <header className="border-b border-gold-dim">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-cream"
        >
          Paul Gibouin
        </Link>
        <nav className="flex gap-6 font-sans text-sm text-cream/80">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
