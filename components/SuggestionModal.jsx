"use client";

import { useState } from "react";
import SuggestionForm from "@/components/SuggestionForm";

export default function SuggestionModal({ prenom }) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        className="font-mono text-xs uppercase tracking-widest text-lime hover:underline"
      >
        Une idée à proposer ?
      </button>

      {ouvert ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 p-6 backdrop-blur-sm"
          onClick={() => setOuvert(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="suggestion-modal-titre"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-lg border border-gold-dim bg-navy-light p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-lime">
                  Suggestions
                </p>
                <h2
                  id="suggestion-modal-titre"
                  className="mt-2 font-display text-xl text-cream"
                >
                  Une idée à proposer ?
                </h2>
                <p className="mt-2 font-sans text-sm text-cream/70">
                  Un chapitre, un exercice, une fonctionnalité ? Dis-le à
                  Paul, ton message part directement par mail.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOuvert(false)}
                aria-label="Fermer"
                className="shrink-0 rounded-md border border-gold-dim px-2 py-1 text-cream/70 transition-colors hover:border-gold hover:text-cream"
              >
                ✕
              </button>
            </div>

            <div className="mt-6">
              <SuggestionForm prenom={prenom} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
