const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  nsi: "NSI",
};

/**
 * Calcule, pour un élève donné, la liste des exercices faits et le nombre
 * de questions de QCM répondues par QCM.
 */
function calculerSuivi(progressionEleve, chapitres, qcms) {
  const exercicesFaits = [];
  for (const chapitre of chapitres) {
    for (const exercice of chapitre.exercices) {
      if (progressionEleve[`exercice:${exercice.id}`]) {
        exercicesFaits.push({
          titre: exercice.titre,
          matiere: chapitre.matiere,
          chapitreTitre: chapitre.titre,
        });
      }
    }
  }

  const qcmSuivi = qcms
    .map((qcm) => {
      const nbFaites = qcm.questions.filter(
        (question) => progressionEleve[`qcm:${qcm.id}:${question.id}`]
      ).length;
      return { titre: qcm.titre, nbFaites, total: qcm.questions.length };
    })
    .filter(({ nbFaites }) => nbFaites > 0);

  return { exercicesFaits, qcmSuivi };
}

/**
 * Affiche, pour chaque élève enregistré, sa progression (exercices faits
 * et QCM entamés), à destination de l'administrateur.
 *
 * @param {Object} props
 * @param {Array} props.codes - table Supabase `codes_acces`
 * @param {Object} props.progression - table Supabase `progression`, regroupée
 *   par code ({ [CODE]: { [cle]: true } })
 * @param {Array} props.chapitres - data/exercices.json > chapitres
 * @param {Array} props.qcms - data/qcm.json > qcms
 */
export default function SuiviEleves({ codes, progression, chapitres, qcms }) {
  if (codes.length === 0) {
    return (
      <p className="font-sans text-sm text-cream/50">
        Aucun élève enregistré pour l&apos;instant.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {codes.map((entree) => {
        const progressionEleve = progression[entree.code.toUpperCase()] ?? {};
        const { exercicesFaits, qcmSuivi } = calculerSuivi(
          progressionEleve,
          chapitres,
          qcms
        );
        const total = exercicesFaits.length + qcmSuivi.length;

        return (
          <details
            key={entree.code}
            className="rounded-md border border-gold-dim bg-navy px-4 py-3"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-sans text-sm text-cream">
              <span>
                {entree.prenom}{" "}
                <span className="font-mono text-xs text-cream/50">
                  ({entree.code})
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-lime">
                {total === 0
                  ? "Aucune activité"
                  : `${exercicesFaits.length} exercice${exercicesFaits.length > 1 ? "s" : ""} · ${qcmSuivi.length} QCM`}
              </span>
            </summary>

            <div className="mt-4 flex flex-col gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-cream/50">
                  Exercices faits
                </p>
                {exercicesFaits.length === 0 ? (
                  <p className="mt-2 font-sans text-sm text-cream/40">
                    Aucun exercice coché.
                  </p>
                ) : (
                  <ul className="mt-2 flex flex-col gap-1">
                    {exercicesFaits.map((ex, index) => (
                      <li
                        key={index}
                        className="font-sans text-sm text-cream/80"
                      >
                        {ex.titre}{" "}
                        <span className="font-mono text-xs text-cream/40">
                          — {LABELS_MATIERE[ex.matiere] ?? ex.matiere} ·{" "}
                          {ex.chapitreTitre}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-cream/50">
                  QCM entamés
                </p>
                {qcmSuivi.length === 0 ? (
                  <p className="mt-2 font-sans text-sm text-cream/40">
                    Aucun QCM commencé.
                  </p>
                ) : (
                  <ul className="mt-2 flex flex-col gap-1">
                    {qcmSuivi.map((qcm, index) => (
                      <li
                        key={index}
                        className="font-sans text-sm text-cream/80"
                      >
                        {qcm.titre}{" "}
                        <span className="font-mono text-xs text-cream/40">
                          — {qcm.nbFaites}/{qcm.total} questions
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
