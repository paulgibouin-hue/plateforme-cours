const PARCOURS = [
  {
    periode: "[ANNÉE-2]–[ANNÉE]",
    titre: "Classe préparatoire scientifique MPI/MPI*",
    lieu: "Lycée Clemenceau, Nantes",
  },
  {
    periode: "[ANNÉE]–aujourd'hui",
    titre: "École d'ingénieurs",
    lieu: "[NOM_ÉCOLE]",
  },
];

const MATIERES_ENSEIGNEES = [
  "Mathématiques (collège, lycée)",
  "Physique-Chimie (collège, lycée)",
  "NSI (spécialité, lycée)",
];

export const metadata = {
  title: "À propos",
  description:
    "Parcours, méthode pédagogique et matières enseignées par Paul Gibouin, élève ingénieur passé par une classe préparatoire scientifique MPI/MPI*.",
};

export default function AProposPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl text-cream">Qui suis-je ?</h1>

      <div className="mt-8 flex flex-col gap-5 font-sans text-lg leading-relaxed text-cream/80">
        <p>
          Je m&apos;appelle Paul. Après deux années de classe préparatoire
          scientifique (MPI/MPI*) au lycée Clemenceau à Nantes,
          j&apos;intègre une école d&apos;ingénieurs à la rentrée [ANNÉE].
        </p>
        <p>
          Cette expérience m&apos;a appris une chose essentielle : la
          réussite en sciences ne tient presque jamais à un manque de
          capacité, mais à des bases mal comprises à un moment donné —
          souvent bien plus tôt qu&apos;on ne le pense. Un chapitre mal
          digéré en troisième peut peser sur toute une scolarité
          scientifique.
        </p>
        <p>
          C&apos;est pour ça que je donne des cours particuliers en
          mathématiques et physique-chimie, du collège au lycée, ainsi
          qu&apos;en NSI pour les lycéens. Mon objectif
          n&apos;est pas de faire du bachotage, mais de reconstruire une
          compréhension solide — pour que les progrès tiennent dans la
          durée.
        </p>
        <p>
          En parallèle, je développe une plateforme pédagogique en ligne :
          fiches d&apos;exercices classées par difficulté avec corrections,
          et QCM interactifs pour réviser en autonomie.
        </p>
      </div>

      <p className="mt-8 font-display text-xl italic text-gold">
        Ma méthode en trois mots : rigueur, clarté, patience.
      </p>

      <h2 className="mt-16 font-display text-2xl text-cream">Parcours</h2>
      <ul className="mt-6 flex flex-col gap-4">
        {PARCOURS.map((etape) => (
          <li
            key={etape.titre}
            className="rounded-lg border border-gold-dim bg-navy-light p-5"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {etape.periode}
            </p>
            <p className="mt-2 font-sans text-cream">{etape.titre}</p>
            <p className="font-sans text-sm text-cream/60">{etape.lieu}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 font-display text-2xl text-cream">
        Matières enseignées
      </h2>
      <ul className="mt-6 flex flex-col gap-2 font-sans text-cream/80">
        {MATIERES_ENSEIGNEES.map((matiere) => (
          <li key={matiere}>{matiere}</li>
        ))}
      </ul>
    </section>
  );
}
