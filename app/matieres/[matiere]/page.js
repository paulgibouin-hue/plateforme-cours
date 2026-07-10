import Link from "next/link";
import { notFound } from "next/navigation";
import data from "@/data/exercices.json";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  technologie: "Technologie",
};

const LABELS_NIVEAU = {
  brevet: "Brevet",
  premiere: "Première",
  terminale: "Terminale",
  bac: "Bac",
};

export function generateStaticParams() {
  const matieres = new Set(data.chapitres.map((c) => c.matiere));
  return Array.from(matieres).map((matiere) => ({ matiere }));
}

export default async function MatierePage({ params }) {
  const { matiere } = await params;
  const chapitres = data.chapitres.filter((c) => c.matiere === matiere);

  if (chapitres.length === 0) {
    notFound();
  }

  const label = LABELS_MATIERE[matiere] ?? matiere;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        Fiches d&apos;exercices
      </p>
      <h1 className="mt-4 font-display text-4xl text-cream">{label}</h1>
      <p className="mt-4 max-w-xl font-sans text-cream/70">
        Exercices classés par difficulté, avec corrections détaillées.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {chapitres.map((chapitre) => (
          <Link
            key={chapitre.id}
            href={`/matieres/${matiere}/${chapitre.id}`}
            className="rounded-lg border border-gold-dim bg-navy-light p-6 transition-colors hover:border-gold"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {LABELS_NIVEAU[chapitre.niveau] ?? chapitre.niveau}
            </p>
            <h2 className="mt-3 font-display text-xl text-cream">
              {chapitre.titre}
            </h2>
            <p className="mt-2 font-sans text-sm text-cream/60">
              {chapitre.exercices.length} exercice
              {chapitre.exercices.length > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
