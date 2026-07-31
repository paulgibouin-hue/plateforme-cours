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

const ORDRE_MATIERES = ["mathematiques", "physique", "chimie", "nsi"];

function calculerBarresMatieres(progression) {
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
      total,
      fait,
      pourcentage: total === 0 ? 0 : Math.round((fait / total) * 100),
    };
  });
}

function calculerBarreQcm(progression) {
  let total = 0;
  let fait = 0;
  for (const qcm of qcmData.qcms) {
    total += qcm.questions.length;
    fait += qcm.questions.filter(
      (question) => progression[`qcm:${qcm.id}:${question.id}`]
    ).length;
  }
  return { total, fait, pourcentage: total === 0 ? 0 : Math.round((fait / total) * 100) };
}

function BarreProgression({ label, fait, total, pourcentage, accent = "gold" }) {
  return (
    <div>
      <div className="flex items-center justify-between font-sans text-sm text-cream/80">
        <span>{label}</span>
        <span className="font-mono text-xs text-cream/50">
          {fait}/{total}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-navy">
        <div
          className={`h-full rounded-full ${
            accent === "gold" ? "bg-gold" : "bg-lime"
          }`}
          style={{ width: `${pourcentage}%` }}
        />
      </div>
    </div>
  );
}

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
  const barresMatieres = calculerBarresMatieres(progression);
  const barreQcm = calculerBarreQcm(progression);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {barresMatieres.map((b) => (
          <BarreProgression
            key={b.matiere}
            label={LABELS_MATIERE[b.matiere] ?? b.matiere}
            fait={b.fait}
            total={b.total}
            pourcentage={b.pourcentage}
            accent="gold"
          />
        ))}
        <BarreProgression
          label="QCM (toutes matières)"
          fait={barreQcm.fait}
          total={barreQcm.total}
          pourcentage={barreQcm.pourcentage}
          accent="lime"
        />
      </div>

      <details className="group">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-cream/50 hover:text-cream/80">
          Voir le détail
        </summary>
        <div className="mt-4 flex flex-col gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cream/50">
              Exercices réalisés
            </p>
            <div className="mt-3">
              <ExercicesFaits progression={progression} />
            </div>
          </div>

          <hr className="border-gold-dim/50" />

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cream/50">
              QCM réalisés
            </p>
            <div className="mt-3">
              <QcmFaits progression={progression} />
            </div>
          </div>
        </div>
      </details>

      <p className="font-mono text-xs text-cream/40">
        Cette progression est enregistrée uniquement sur cet appareil et ce
        navigateur.
      </p>
    </div>
  );
}
