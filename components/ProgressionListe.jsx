"use client";

import Link from "next/link";
import exercicesData from "@/data/exercices.json";
import qcmData from "@/data/qcm.json";
import { useProgression } from "@/lib/progression";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  nsi: "NSI",
};

function ExercicesFaits({ progression }) {
  const exercicesFaits = [];

  for (const chapitre of exercicesData.chapitres) {
    for (const exercice of chapitre.exercices) {
      if (progression[`exercice:${exercice.id}`]) {
        exercicesFaits.push({ chapitre, exercice });
      }
    }
  }

  if (exercicesFaits.length === 0) {
    return (
      <p className="font-sans text-sm text-cream/50">
        Aucun exercice coché pour l&apos;instant. Coche-les au fur et à
        mesure sur les fiches !
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {exercicesFaits.map(({ chapitre, exercice }) => (
        <li key={exercice.id}>
          <Link
            href={`/matieres/${chapitre.matiere}/${chapitre.id}#${exercice.id}`}
            className="flex items-center justify-between gap-4 rounded-md border border-gold-dim bg-navy px-4 py-2 text-sm transition-colors hover:border-gold hover:bg-white/10"
          >
            <span className="font-sans text-cream/90">
              {exercice.numero}. {exercice.titre}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-lime/70">
              {LABELS_MATIERE[chapitre.matiere] ?? chapitre.matiere}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function QcmFaits({ progression }) {
  const lignes = qcmData.qcms
    .map((qcm) => {
      const nbFaites = qcm.questions.filter(
        (question) => progression[`qcm:${qcm.id}:${question.id}`]
      ).length;
      return { qcm, nbFaites };
    })
    .filter(({ nbFaites }) => nbFaites > 0);

  if (lignes.length === 0) {
    return (
      <p className="font-sans text-sm text-cream/50">
        Aucun QCM commencé pour l&apos;instant.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {lignes.map(({ qcm, nbFaites }) => (
        <li key={qcm.id}>
          <Link
            href={`/qcm/${qcm.id}`}
            className="flex items-center justify-between gap-4 rounded-md border border-gold-dim bg-navy px-4 py-2 text-sm transition-colors hover:border-gold hover:bg-white/10"
          >
            <span className="font-sans text-cream/90">{qcm.titre}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-lime/70">
              {nbFaites}/{qcm.questions.length} questions
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ProgressionListe() {
  const { progression } = useProgression();

  return (
    <div className="mt-10 flex flex-col gap-8">
      <div>
        <h2 className="font-display text-xl text-cream">
          Exercices réalisés
        </h2>
        <div className="mt-3">
          <ExercicesFaits progression={progression} />
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl text-cream">QCM réalisés</h2>
        <div className="mt-3">
          <QcmFaits progression={progression} />
        </div>
      </div>

      <p className="font-mono text-xs text-cream/40">
        Cette progression est enregistrée uniquement sur cet appareil et ce
        navigateur.
      </p>
    </div>
  );
}
