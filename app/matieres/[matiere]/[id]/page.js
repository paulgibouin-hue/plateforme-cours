import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import data from "@/data/exercices.json";
import ExerciceCard from "@/components/ExerciceCard";
import ExerciceVerrouille from "@/components/ExerciceVerrouille";
import { lireCodes } from "@/lib/codesAcces";
import "katex/dist/katex.min.css";
import { renderAvecLatex } from "@/lib/latex";

const NOM_COOKIE = "espace_eleve_code";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  nsi: "NSI",
};

export function generateStaticParams() {
  return data.chapitres.map((chapitre) => ({
    matiere: chapitre.matiere,
    id: chapitre.id,
  }));
}

export async function generateMetadata({ params }) {
  const { matiere, id } = await params;
  const chapitre = data.chapitres.find(
    (c) => c.id === id && c.matiere === matiere
  );

  if (!chapitre) return {};

  return {
    title: chapitre.titre,
    description: `Exercices corrigés sur ${chapitre.titre}, classés par difficulté, avec rappel de cours.`,
  };
}

export default async function ChapitrePage({ params }) {
  const { matiere, id } = await params;
  const chapitre = data.chapitres.find(
    (c) => c.id === id && c.matiere === matiere
  );

  if (!chapitre) {
    notFound();
  }

  const cookieStore = await cookies();
  const code = cookieStore.get(NOM_COOKIE)?.value;
  const codes = code ? await lireCodes() : [];
  const estConnecte = Boolean(
    code &&
      codes.some(
        (c) => c.code.toUpperCase() === code.toUpperCase() && c.actif !== false
      )
  );

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
          <p className="font-mono text-xs uppercase tracking-widest text-lime">
            Rappel de cours
          </p>
          <ul className="mt-3 flex flex-col gap-2 font-sans text-sm text-cream/90">
            {chapitre.rappelCours.map((point, index) => (
              <li key={index}>{renderAvecLatex(point)}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {estConnecte ? null : (
        <div className="mt-10 rounded-lg border border-gold bg-gold/10 p-6">
          <p className="font-display text-lg text-cream">
            🔒 Exercices réservés aux élèves
          </p>
          <p className="mt-2 font-sans text-sm text-cream/70">
            Connecte-toi à ton espace élève avec ton code d&apos;accès pour
            voir les énoncés complets et les corrections détaillées.
          </p>
          <Link
            href="/espace-eleve"
            className="mt-4 inline-block rounded-md bg-gold px-6 py-2 font-sans text-sm font-medium text-cream transition active:scale-95 hover:opacity-90"
          >
            Accéder à mon espace élève
          </Link>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-6">
        {chapitre.exercices.map((exercice) =>
          estConnecte ? (
            <ExerciceCard key={exercice.id} exercice={exercice} />
          ) : (
            <ExerciceVerrouille key={exercice.id} exercice={exercice} />
          )
        )}
      </div>
    </section>
  );
}
