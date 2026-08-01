import { Link } from "next-view-transitions";
import exercicesData from "@/data/exercices.json";
import qcmData from "@/data/qcm.json";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";

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
          className="animate-blob-drift pointer-events-none absolute -top-48 -right-16 -z-10 h-[36rem] w-[36rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(3,103,252,0.35) 0%, rgba(3,103,252,0) 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-blob-drift-reverse pointer-events-none absolute -left-32 top-52 -z-10 h-[28rem] w-[28rem] rounded-full bg-lime/20 blur-[160px]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Cours particuliers à Évry-Courcouronnes et en ligne
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-cream sm:text-5xl">
              Des maths et de la physique qui deviennent enfin claires.
            </h1>
            <p className="mt-6 max-w-xl font-sans text-lg text-cream/80">
              Cours particuliers pour collégiens et lycéens, par un étudiant
              en école d&apos;ingénieur passé par une classe préparatoire
              scientifique. Méthode rigoureuse, pédagogie accessible.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/tarifs#contact"
                className="rounded-md bg-gold px-6 py-3 text-center font-sans text-sm font-medium text-white transition active:scale-95 hover:opacity-90"
              >
                Réserver un premier cours
              </Link>
              <a
                href="#matieres"
                className="flex items-center justify-center gap-2 rounded-md border border-lime px-6 py-3 text-center font-sans text-sm font-medium text-lime transition active:scale-95 hover:bg-lime/10"
              >
                Découvrir les matières
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Aperçu de la plateforme : cartes flottantes */}
          <div className="relative mt-16 hidden lg:mt-0 lg:block">
            <div className="rounded-lg border-l-4 border-l-lime bg-carte-opaque p-6 shadow-2xl shadow-black/40">
              <p className="font-mono text-xs uppercase tracking-widest text-lime">
                Exercice 3 · Première
              </p>
              <h3 className="mt-2 font-display text-lg text-cream">
                Équations du second degré
              </h3>
              <p className="mt-3 font-mono text-sm text-cream/80">
                Δ = b² − 4ac = 25 &gt; 0
              </p>
              <p className="mt-4 flex items-center gap-1.5 font-mono text-xs text-lime">
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                  <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Correction détaillée incluse
              </p>
            </div>
            <div className="absolute -bottom-8 -right-4 z-10 w-56 rounded-lg border-l-4 border-l-gold bg-carte-opaque p-4 shadow-lg shadow-black/30 sm:-right-8">
              <p className="flex items-center gap-1.5 font-display text-base text-cream">
                <span className="text-lime">↗</span> +6 exercices cette
                semaine
              </p>
              <p className="mt-1 font-sans text-xs text-cream/60">
                Suivi dans ton espace élève
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Reveal as="section" className="relative mx-auto max-w-5xl px-6 py-4">
        <div className="grid grid-cols-2 gap-y-6 sm:flex sm:flex-wrap sm:gap-y-0 sm:divide-x sm:divide-gold-dim">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 sm:px-10 sm:first:pl-0 ${
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

      <Testimonials />

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
              <div className="rounded-lg border border-gold-dim bg-navy-light p-6 shadow-md shadow-black/10 transition hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:shadow-black/15">
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
          Prêt à commencer ? Premier cours possible dès la rentrée de
          septembre 2026.
          Places limitées pour un suivi personnalisé.
        </p>
        <Link
          href="/tarifs#contact"
          className="mt-8 inline-block rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-white transition active:scale-95 hover:opacity-90"
        >
          Réserver mon premier cours
        </Link>
      </Reveal>
    </>
  );
}
