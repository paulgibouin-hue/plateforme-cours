"use client";

import { useMemo, useState } from "react";
import { Link } from "next-view-transitions";
import Reveal from "@/components/Reveal";
import IconeNiveau from "@/components/IconeNiveau";

const LABELS_NIVEAU = {
  brevet: "Collège (Brevet)",
  seconde: "Seconde",
  premiere: "Première",
  terminale: "Terminale",
};

const LABELS_PILL = {
  tous: "Tous",
  brevet: "Collège",
  seconde: "Seconde",
  premiere: "Première",
  terminale: "Terminale",
};

const ORDRE_NIVEAUX = ["brevet", "seconde", "premiere", "terminale"];

function normaliser(texte) {
  return texte
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .toLowerCase();
}

function difficulteMax(chapitre) {
  return Math.max(...chapitre.exercices.map((e) => e.difficulte ?? 1));
}

function PointsDifficulte({ niveau }) {
  return (
    <span className="flex shrink-0 gap-0.5" title={`Difficulté jusqu'à ${niveau}/3`}>
      {[1, 2, 3].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          fill={n <= niveau ? "var(--color-lime)" : "none"}
          stroke={n <= niveau ? "var(--color-lime)" : "currentColor"}
          className={`h-3 w-3 ${n <= niveau ? "" : "text-cream/20"}`}
        >
          <path
            strokeWidth="1.2"
            strokeLinejoin="round"
            d="M10 1.5l2.47 5.27 5.78.65-4.3 3.94 1.16 5.72L10 14.9l-5.11 2.18 1.16-5.72-4.3-3.94 5.78-.65L10 1.5z"
          />
        </svg>
      ))}
    </span>
  );
}

export default function ChapitresFiltrables({ matiere, chapitres }) {
  const [recherche, setRecherche] = useState("");
  const [niveauActif, setNiveauActif] = useState("tous");

  const niveauxDisponibles = useMemo(
    () =>
      ORDRE_NIVEAUX.filter((niveau) =>
        chapitres.some((c) => c.niveau === niveau)
      ),
    [chapitres]
  );

  const chapitresFiltres = useMemo(() => {
    const requete = normaliser(recherche.trim());
    return chapitres.filter((chapitre) => {
      if (niveauActif !== "tous" && chapitre.niveau !== niveauActif) {
        return false;
      }
      if (!requete) return true;
      const contenu = normaliser(
        `${chapitre.titre} ${chapitre.description ?? ""}`
      );
      return contenu.includes(requete);
    });
  }, [chapitres, recherche, niveauActif]);

  return (
    <div className="mt-8 sm:mt-12">
      <div className="relative">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40"
        >
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M17 17l-3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un chapitre..."
          className="w-full rounded-md border border-gold-dim bg-navy-light py-2.5 pl-11 pr-4 font-sans text-sm text-cream placeholder-cream/40 outline-none transition focus:border-gold"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setNiveauActif("tous")}
          className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition ${
            niveauActif === "tous"
              ? "border-gold bg-gold text-navy"
              : "border-gold-dim text-cream/70 hover:border-gold/60 hover:text-cream"
          }`}
        >
          {LABELS_PILL.tous}
        </button>
        {niveauxDisponibles.map((niveau) => (
          <button
            key={niveau}
            type="button"
            onClick={() => setNiveauActif(niveau)}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition ${
              niveauActif === niveau
                ? "border-gold bg-gold text-navy"
                : "border-gold-dim text-cream/70 hover:border-gold/60 hover:text-cream"
            }`}
          >
            <IconeNiveau niveau={niveau} className="h-3 w-3" />
            {LABELS_PILL[niveau] ?? niveau}
          </button>
        ))}
      </div>

      {chapitresFiltres.length === 0 ? (
        <p className="mt-10 font-sans text-sm text-cream/50">
          Aucun chapitre ne correspond à ta recherche.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapitresFiltres.map((chapitre, index) => (
            <Reveal key={chapitre.id} delay={Math.min(index, 8) * 60}>
              <Link
                href={`/matieres/${matiere}/${chapitre.id}`}
                className="group flex h-full flex-col rounded-lg border-l-4 border-l-gold bg-navy-light p-5 transition hover:-translate-y-1 hover:bg-white/10 hover:ring-1 hover:ring-gold/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
                    {LABELS_NIVEAU[chapitre.niveau] ?? chapitre.niveau}
                  </p>
                  <PointsDifficulte niveau={difficulteMax(chapitre)} />
                </div>
                <h3 className="mt-2 flex items-center gap-1.5 font-display text-lg text-cream">
                  {chapitre.titre}
                  <span className="text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </h3>
                {chapitre.description ? (
                  <p className="mt-1.5 font-sans text-sm text-cream/60">
                    {chapitre.description}
                  </p>
                ) : null}
                <p className="mt-auto pt-3 font-mono text-xs text-cream/50">
                  {chapitre.exercices.length} exercice
                  {chapitre.exercices.length > 1 ? "s" : ""}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
