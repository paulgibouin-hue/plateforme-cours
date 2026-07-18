"use client";

import "katex/dist/katex.min.css";
import { renderAvecLatex } from "@/lib/latex";
import { useProgression } from "@/lib/progression";

const ETOILES = {
  1: "★☆☆",
  2: "★★☆",
  3: "★★★",
};

/**
 * Affiche un exercice.
 *
 * @param {Object} props
 * @param {Object} props.exercice - un item de exercices.json >
 *   chapitres[].exercices[] ({ numero, titre, difficulte, enonce, correction })
 */
export default function ExerciceCard({ exercice }) {
  const { id, numero, titre, difficulte, enonce, correction } = exercice;
  const { progression, toggle } = useProgression();
  const cle = `exercice:${id}`;
  const fait = Boolean(progression[cle]);

  return (
    <article
      id={id}
      className={`rounded-lg border p-6 transition-colors ${
        fait ? "border-gold bg-gold/5" : "border-gold-dim bg-navy-light"
      }`}
    >
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

      <div className="mt-4 whitespace-pre-line font-sans text-cream/90">
        {renderAvecLatex(enonce)}
      </div>

      {correction ? (
        <details className="mt-4 font-sans text-sm text-cream/70">
          <summary className="cursor-pointer text-gold">Correction</summary>
          <div className="mt-2 whitespace-pre-line">
            {renderAvecLatex(correction)}
          </div>
        </details>
      ) : null}

      <label className="mt-4 flex w-fit cursor-pointer items-center gap-2 font-sans text-sm text-cream/70">
        <input
          type="checkbox"
          checked={fait}
          onChange={() => toggle(cle)}
          className="h-4 w-4 accent-gold"
        />
        J&apos;ai fait cet exercice
      </label>
    </article>
  );
}

