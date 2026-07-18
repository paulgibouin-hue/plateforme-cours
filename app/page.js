import Link from "next/link";

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
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-gold">
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
            className="rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-navy transition-opacity hover:opacity-90"
          >
            Réserver un premier cours
          </Link>
          <a
            href="#matieres"
            className="rounded-md border border-gold-dim px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:border-gold"
          >
            Découvrir les matières
          </a>
        </div>
      </section>

      {/* Ce que je propose */}
      <section id="matieres" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl text-cream">Ce que je propose</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {MATIERES.map((matiere) => (
            <div
              key={matiere.titre}
              className="rounded-lg border border-gold-dim bg-navy-light p-6"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-gold">
                {matiere.niveau}
              </p>
              <h3 className="mt-3 font-display text-xl text-cream">
                {matiere.titre}
              </h3>
              <p className="mt-2 font-sans text-sm text-cream/70">
                {matiere.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi cette approche */}
      <section className="mx-auto max-w-5xl px-6 py-16">
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
      </section>

      {/* Comment ça marche */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl text-cream">Comment ça marche</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {ETAPES.map((etape) => (
            <li key={etape.numero}>
              <p className="font-mono text-2xl text-gold">{etape.numero}</p>
              <p className="mt-2 font-display text-lg text-cream">
                {etape.titre}
              </p>
              <p className="mt-1 font-sans text-sm text-cream/70">
                {etape.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA finale */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="font-sans text-lg text-cream/90">
          Prêt à commencer ? Premier cours possible dès [DATE_DISPONIBILITE].
          Places limitées pour un suivi personnalisé.
        </p>
        <Link
          href="/tarifs#contact"
          className="mt-8 inline-block rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-navy transition-opacity hover:opacity-90"
        >
          Réserver mon premier cours
        </Link>
      </section>
    </>
  );
}
