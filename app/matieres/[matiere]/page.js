import data from "@/data/exercices.json";
import { notFound } from "next/navigation";
import ChapitresFiltrables from "@/components/ChapitresFiltrables";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  nsi: "NSI",
};

export function generateStaticParams() {
  const matieres = new Set(data.chapitres.map((c) => c.matiere));
  return Array.from(matieres).map((matiere) => ({ matiere }));
}

export async function generateMetadata({ params }) {
  const { matiere } = await params;
  const label = LABELS_MATIERE[matiere] ?? matiere;

  return {
    title: label,
    description: `Fiches d'exercices de ${label} classées par chapitre, avec corrections détaillées.`,
  };
}

export default async function MatierePage({ params }) {
  const { matiere } = await params;
  const chapitres = data.chapitres.filter((c) => c.matiere === matiere);

  if (chapitres.length === 0) {
    notFound();
  }

  const label = LABELS_MATIERE[matiere] ?? matiere;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-lime">
        Fiches d&apos;exercices
      </p>
      <h1 className="mt-4 font-display text-4xl text-cream">{label}</h1>
      <p className="mt-4 max-w-xl font-sans text-cream/70">
        Exercices classés par niveau et par difficulté, avec corrections
        détaillées.
      </p>

      <ChapitresFiltrables matiere={matiere} chapitres={chapitres} />
    </section>
  );
}
