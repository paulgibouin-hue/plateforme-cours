import Link from "next/link";
import { notFound } from "next/navigation";
import data from "@/data/exercices.json";
import ExerciceCard from "@/components/ExerciceCard";
import "katex/dist/katex.min.css";
import { renderAvecLatex } from "@/lib/latex";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  technologie: "Technologie",
};

export function generateStaticParams() {
  return data.chapitres.map((chapitre) => ({
    matiere: chapitre.matiere,
    id: chapitre.id,
  }));
}

export default async function ChapitrePage({ params }) {
  const { matiere, id } = await params;
  const chapitre = data.chapitres.find(
    (c) => c.id === id && c.matiere === matiere
  );

  if (!chapitre) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href={`/matieres/${matiere}`}
        className="font-mono text-xs uppercase tracking-widest text-gold hover:underline"
      >
        ← {LABELS_MATIERE[matiere] ?? matiere}
      </Link>

      <h1 className="mt-4 font-display text-4xl text-cream">
        {chapitre.titre}
      </h1>

      {chapitre.rappelCours?.length ? (
        <div className="mt-8 rounded-lg border border-gold bg-gold/10 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-gold">
            Rappel de cours
          </p>
          <ul className="mt-3 flex flex-col gap-2 font-sans text-sm text-cream/90">
            {chapitre.rappelCours.map((point, index) => (
              <li key={index}>{renderAvecLatex(point)}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-10 flex flex-col gap-6">
        {chapitre.exercices.map((exercice) => (
          <ExerciceCard key={exercice.id} exercice={exercice} />
        ))}
      </div>
    </section>
  );
}
