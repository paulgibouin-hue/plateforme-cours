"use client";

import { useState } from "react";

function formatDate(dateIso) {
  const date = new Date(dateIso + "T00:00:00");
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}

function estEnRetard(dateIso, fait) {
  if (!dateIso || fait) return false;
  const aujourdhui = new Date();
  aujourdhui.setHours(0, 0, 0, 0);
  return new Date(dateIso + "T00:00:00") < aujourdhui;
}

export default function CahierTexte({ devoirsInitiaux }) {
  const [devoirs, setDevoirs] = useState(devoirsInitiaux);
  const [erreur, setErreur] = useState("");

  async function toggler(id, faitActuel) {
    const nouvelleValeur = !faitActuel;
    setDevoirs((precedent) =>
      precedent.map((d) => (d.id === id ? { ...d, fait: nouvelleValeur } : d))
    );
    setErreur("");

    try {
      const reponse = await fetch("/api/devoirs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, fait: nouvelleValeur }),
      });
      if (!reponse.ok) throw new Error();
    } catch {
      setDevoirs((precedent) =>
        precedent.map((d) => (d.id === id ? { ...d, fait: faitActuel } : d))
      );
      setErreur("La mise à jour a échoué, réessaie.");
    }
  }

  if (devoirs.length === 0) {
    return (
      <p className="font-sans text-sm text-cream/50">
        Rien à faire pour l&apos;instant — reviens vérifier régulièrement,
        Paul y ajoute des tâches au fil des séances.
      </p>
    );
  }

  const aFaire = devoirs.filter((d) => !d.fait);
  const termines = devoirs.filter((d) => d.fait);

  return (
    <div className="flex flex-col gap-4">
      {erreur ? (
        <p className="font-sans text-sm text-red-300">{erreur}</p>
      ) : null}

      {[...aFaire, ...termines].map((devoir) => {
        const enRetard = estEnRetard(devoir.date_limite, devoir.fait);
        return (
          <label
            key={devoir.id}
            className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 transition-colors ${
              devoir.fait
                ? "border-gold-dim/50 bg-navy opacity-60"
                : enRetard
                  ? "border-red-400/50 bg-red-400/5"
                  : "border-gold-dim bg-navy hover:border-gold"
            }`}
          >
            <input
              type="checkbox"
              checked={devoir.fait}
              onChange={() => toggler(devoir.id, devoir.fait)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
            />
            <div className="flex-1">
              <p
                className={`font-sans text-sm ${
                  devoir.fait ? "text-cream/50 line-through" : "text-cream/90"
                }`}
              >
                {devoir.titre}
              </p>
              {devoir.description ? (
                <p className="mt-1 font-sans text-sm text-cream/60">
                  {devoir.description}
                </p>
              ) : null}
              {devoir.date_limite ? (
                <p
                  className={`mt-1 font-mono text-xs uppercase tracking-widest ${
                    enRetard ? "text-red-300" : "text-lime/70"
                  }`}
                >
                  {enRetard ? "En retard — " : "Pour le "}
                  {formatDate(devoir.date_limite)}
                </p>
              ) : null}
            </div>
          </label>
        );
      })}
    </div>
  );
}
