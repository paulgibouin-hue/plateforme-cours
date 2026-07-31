import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import data from "@/data/exercices.json";
import Reveal from "@/components/Reveal";

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
      <p className="font-mono text-xs uppercase tracking-widest text-lime">
        Fiches d&apos;exercices
      </p>
      <h1 className="mt-4 font-display text-4xl text-cream">{label}</h1>
      <p className="mt-4 max-w-xl font-sans text-cream/70">
        Exercices classés par niveau et par difficulté, avec corrections
        détaillées.
      </p>

      <div className="mt-8 flex flex-col gap-8 sm:mt-12 sm:gap-12">
        {groupes.map(({ niveau, chapitres }) => (
          <Reveal key={niveau}>
            <h2 className="font-mono text-xs uppercase tracking-widest text-lime">
              {LABELS_NIVEAU[niveau] ?? niveau}
            </h2>
            <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-6 sm:grid-cols-2">
              {chapitres.map((chapitre, index) => (
                <Reveal key={chapitre.id} delay={index * 80}>
                  <Link
                    href={`/matieres/${matiere}/${chapitre.id}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-gold-dim bg-navy-light p-4 transition hover:-translate-y-1 hover:border-gold hover:bg-white/20 sm:block sm:p-6"
                  >
                    <h3 className="font-display text-base text-cream sm:text-xl">
                      {chapitre.titre}
                    </h3>
                    <p className="shrink-0 font-sans text-xs text-cream/60 sm:mt-2 sm:text-sm">
                      {chapitre.exercices.length} exercice
                      {chapitre.exercices.length > 1 ? "s" : ""}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
