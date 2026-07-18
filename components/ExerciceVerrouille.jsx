const ETOILES = {
  1: "★☆☆",
  2: "★★☆",
  3: "★★★",
};

/**
 * Aperçu d'un exercice pour un visiteur non connecté : titre et difficulté
 * visibles, énoncé et correction masqués.
 *
 * @param {Object} props
 * @param {Object} props.exercice - un item de exercices.json >
 *   chapitres[].exercices[] ({ numero, titre, difficulte })
 */
export default function ExerciceVerrouille({ exercice }) {
  const { numero, titre, difficulte } = exercice;

  return (
    <article className="rounded-lg border border-gold-dim bg-navy-light p-6 opacity-70">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-xl text-cream">
          {numero}. {titre}
        </h3>
        {difficulte ? (
          <span
            className="font-mono text-sm text-gold"
            title={`Difficulté ${difficulte}/3`}
          >
            {ETOILES[difficulte] ?? ""}
          </span>
        ) : null}
      </div>
      <p className="mt-4 font-sans text-sm text-cream/50">
        🔒 Connecte-toi à ton espace élève pour voir l&apos;énoncé et la
        correction détaillée.
      </p>
    </article>
  );
}
