import Link from "next/link";
import exercicesData from "@/data/exercices.json";
import qcmData from "@/data/qcm.json";
import Reveal from "@/components/Reveal";

function arrondir(nombre, palier) {
  return Math.floor(nombre / palier) * palier;
}

const STATS = [
  {
    valeur: `${arrondir(exercicesData.chapitres.length, 5)}+`,
    label: "chapitres de cours",
  },
  {
    valeur: `${arrondir(
      exercicesData.chapitres.reduce((s, c) => s + c.exercices.length, 0),
      10
    )}+`,
    label: "exercices corrigés",
  },
  {
    valeur: `${arrondir(qcmData.qcms.length, 5) || qcmData.qcms.length}+`,
    label: "QCM interactifs",
  },
  {
    valeur: `${new Set(exercicesData.chapitres.map((c) => c.matiere)).size}`,
    label: "matières couvertes",
  },
];

const MATIERES = [
  {
    titre: "Mathématiques",
    niveau: "Collège / Lycée",
    description:
      "Du calcul de base aux équations du second degré, trigonométrie, suites — compréhension solide, pas de par-cœur.",
  },
  {
    titre: "Physique-Chimie",
    niveau: "Collège / Lycée",
    description:
      "Électricité, mécanique, réactions chimiques rendues concrètes.",
  },
  {
    titre: "NSI",
    niveau: "Spécialité Lycée",
    description:
      "Python, structures de données, algorithmique, bases de données.",
  },
];

const ETAPES = [
  {
    numero: "1",
    titre: "Premier échange",
    description: "Besoins, niveau, objectifs.",
  },
  {
    numero: "2",
    titre: "Cours sur-mesure",
    description: "Présentiel ou visio.",
  },
  {
    numero: "3",
    titre: "Suivi entre les cours",
    description: "Via la plateforme pédagogique.",
  },
];

export default function AccueilPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="animate-blob-drift pointer-events-none absolute -top-48 -right-16 -z-10 h-[36rem] w-[36rem] rounded-full bg-gold/25 blur-[160px]"
        />
        <div
          aria-hidden="true"
          className="animate-blob-drift-reverse pointer-events-none absolute -left-32 top-52 -z-10 h-[28rem] w-[28rem] rounded-full bg-lime/20 blur-[160px]"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-lime">
            Cours particuliers à [TA_VILLE] et en ligne
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-cream sm:text-5xl">
            Des maths et de la physique qui deviennent enfin claires.
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg text-cream/80">
            Cours particuliers pour collégiens et lycéens, par un étudiant en
            école d&apos;ingénieur passé par une classe préparatoire
            scientifique. Méthode rigoureuse, pédagogie accessible.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/tarifs#contact"
              className="rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-cream transition active:scale-95 hover:opacity-90"
            >
              Réserver un premier cours
            </Link>
            <a
              href="#matieres"
              className="rounded-md border border-lime/40 px-6 py-3 font-sans text-sm font-medium text-cream transition active:scale-95 hover:border-lime"
            >
              Découvrir les matières
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Reveal as="section" className="relative mx-auto max-w-5xl px-6 py-4">
        <div className="flex flex-wrap divide-x divide-gold-dim">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-8 first:pl-0 sm:px-10 ${
                index % 2 === 1 ? "sm:translate-y-3" : ""
              }`}
            >
              <p
                className={`font-display text-4xl sm:text-5xl ${
                  index % 2 === 0 ? "text-gold" : "text-lime"
                }`}
              >
                {stat.valeur}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-cream/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Ce que je propose */}
      <section id="matieres" className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="font-display text-2xl text-cream">
            Ce que je propose
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {MATIERES.map((matiere, index) => (
            <Reveal key={matiere.titre} delay={index * 100}>
              <div className="rounded-lg border border-gold-dim bg-navy-light p-6 transition hover:-translate-y-1 hover:border-gold">
                <p className="font-mono text-xs uppercase tracking-widest text-lime">
                  {matiere.niveau}
                </p>
                <h3 className="mt-3 font-display text-xl text-cream">
                  {matiere.titre}
                </h3>
                <p className="mt-2 font-sans text-sm text-cream/70">
                  {matiere.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pourquoi cette approche */}
      <Reveal as="section" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl text-cream">
          Pourquoi cette approche
        </h2>
        <ul className="mt-8 flex flex-col gap-4 font-sans text-cream/80">
          <li>
            Parcours qui parle aux élèves scientifiques (prépa MPI/MPI*,
            école d&apos;ingénieur)
          </li>
          <li>Exercices sur-mesure classés par difficulté, corrections détaillées</li>
          <li>
            Plateforme pédagogique dédiée : fiches et QCM interactifs entre
            les séances
          </li>
        </ul>
      </Reveal>

      {/* Comment ça marche */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="font-display text-2xl text-cream">
            Comment ça marche
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {ETAPES.map((etape, index) => (
            <Reveal key={etape.numero} as="li" delay={index * 100}>
              <p className="font-mono text-2xl text-lime">{etape.numero}</p>
              <p className="mt-2 font-display text-lg text-cream">
                {etape.titre}
              </p>
              <p className="mt-1 font-sans text-sm text-cream/70">
                {etape.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CTA finale */}
      <Reveal
        as="section"
        className="mx-auto max-w-5xl px-6 py-24 text-center"
      >
        <p className="font-sans text-lg text-cream/90">
          Prêt à commencer ? Premier cours possible dès [DATE_DISPONIBILITE].
          Places limitées pour un suivi personnalisé.
        </p>
        <Link
          href="/tarifs#contact"
          className="mt-8 inline-block rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-cream transition active:scale-95 hover:opacity-90"
        >
          Réserver mon premier cours
        </Link>
      </Reveal>
    </>
  );
}
