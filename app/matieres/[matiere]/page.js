import Link from "next/link";
import { notFound } from "next/navigation";
import data from "@/data/exercices.json";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  nsi: "NSI",
};

const LABELS_NIVEAU = {
  brevet: "Collège (Brevet)",
  seconde: "Seconde",
  premiere: "Première",
  terminale: "Terminale",
};

const ORDRE_NIVEAUX = ["brevet", "seconde", "premiere", "terminale"];

function groupParNiveau(chapitres) {
  const groupes = new Map();
  for (const chapitre of chapitres) {
    if (!groupes.has(chapitre.niveau)) groupes.set(chapitre.niveau, []);
    groupes.get(chapitre.niveau).push(chapitre);
  }
  return ORDRE_NIVEAUX.filter((niveau) => groupes.has(niveau)).map(
    (niveau) => ({
      niveau,
      chapitres: groupes.get(niveau),
    })
  );
}

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
  const groupes = groupParNiveau(chapitres);

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        Fiches d&apos;exercices
      </p>
      <h1 className="mt-4 font-display text-4xl text-cream">{label}</h1>
      <p className="mt-4 max-w-xl font-sans text-cream/70">
        Exercices classés par niveau et par difficulté, avec corrections
        détaillées.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {groupes.map(({ niveau, chapitres }) => (
          <div key={niveau}>
            <h2 className="font-mono text-xs uppercase tracking-widest text-gold">
              {LABELS_NIVEAU[niveau] ?? niveau}
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {chapitres.map((chapitre) => (
                <Link
                  key={chapitre.id}
                  href={`/matieres/${matiere}/${chapitre.id}`}
                  className="rounded-lg border border-gold-dim bg-navy-light p-6 transition-colors hover:border-gold"
                >
                  <h3 className="font-display text-xl text-cream">
                    {chapitre.titre}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-cream/60">
                    {chapitre.exercices.length} exercice
                    {chapitre.exercices.length > 1 ? "s" : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
