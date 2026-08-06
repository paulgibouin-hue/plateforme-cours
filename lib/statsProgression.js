import exercicesData from "@/data/exercices.json";
import qcmData from "@/data/qcm.json";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  nsi: "NSI",
};

const ORDRE_MATIERES = ["mathematiques", "physique", "chimie", "nsi"];

export function calculerBarresMatieres(progression) {
  const parMatiere = {};
  for (const chapitre of exercicesData.chapitres) {
    const stats = (parMatiere[chapitre.matiere] ??= { total: 0, fait: 0 });
    for (const exercice of chapitre.exercices) {
      stats.total += 1;
      if (progression[`exercice:${exercice.id}`]) stats.fait += 1;
    }
  }

  return ORDRE_MATIERES.filter((m) => parMatiere[m]).map((matiere) => {
    const { total, fait } = parMatiere[matiere];
    return {
      matiere,
      label: LABELS_MATIERE[matiere] ?? matiere,
      total,
      fait,
      pourcentage: total === 0 ? 0 : Math.round((fait / total) * 100),
    };
  });
}

export function calculerBarreQcm(progression) {
  let total = 0;
  let fait = 0;
  for (const qcm of qcmData.qcms) {
    total += qcm.questions.length;
    fait += qcm.questions.filter(
      (question) => progression[`qcm:${qcm.id}:${question.id}`]
    ).length;
  }
  return {
    total,
    fait,
    pourcentage: total === 0 ? 0 : Math.round((fait / total) * 100),
  };
}
