"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import { renderAvecLatex } from "@/lib/latex";
import { useProgression } from "@/lib/progression";

/**
 * Affiche une question de QCM avec sélection, correction visuelle et
 * explication dépliable. La question est automatiquement marquée comme
 * "faite" dès qu'une réponse est sélectionnée.
 *
 * @param {Object} props
 * @param {string} props.qcmId - id du QCM parent (qcm.json > qcms[].id)
 * @param {Object} props.question - un item de qcm.json > qcms[].questions[]
 *   ({ id, numero, question, choix, bonneReponse, explication })
 */
export default function QcmCard({ qcmId, question }) {
  const [selection, setSelection] = useState(null);
  const { id, numero, question: enonce, choix, bonneReponse, explication } =
    question;
  const { marquerFait } = useProgression();
  const cle = `qcm:${qcmId}:${id}`;

  function handleSelection(index) {
    setSelection(index);
    marquerFait(cle);
  }

  return (
    <div className="rounded-lg border border-gold-dim bg-navy-light p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        Question {numero}
      </p>
      <p className="mt-2 font-sans text-cream">{renderAvecLatex(enonce)}</p>

      <ul className="mt-4 flex flex-col gap-2">
        {choix.map((option, index) => {
          const estSelectionnee = selection === index;
          const estCorrecte = index === bonneReponse;
          const afficherEtat = selection !== null;

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => handleSelection(index)}
                className={`w-full rounded-md border px-4 py-2 text-left font-sans text-sm transition-colors ${
                  afficherEtat && estCorrecte
                    ? "border-gold bg-gold/10 text-gold"
                    : afficherEtat && estSelectionnee
                      ? "border-red-400/60 text-red-300"
                      : "border-gold-dim text-cream/80 hover:border-gold"
                }`}
              >
                {renderAvecLatex(option)}
              </button>
            </li>
          );
        })}
      </ul>

      {selection !== null && explication ? (
        <div className="mt-4 rounded-md border border-gold-dim/50 bg-navy p-4 font-sans text-sm text-cream/70">
          {renderAvecLatex(explication)}
        </div>
      ) : null}
    </div>
  );
}
