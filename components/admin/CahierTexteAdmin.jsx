"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CahierTexteAdmin({ codes, devoirsInitiaux }) {
  const router = useRouter();
  const [code, setCode] = useState(codes[0]?.code ?? "");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateLimite, setDateLimite] = useState("");
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function handleAjouter(event) {
    event.preventDefault();
    if (!code || !titre.trim()) {
      setErreur("Choisis un élève et renseigne un titre.");
      return;
    }
    setEnCours(true);
    setErreur("");
    try {
      const reponse = await fetch("/api/admin/devoirs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, titre, description, dateLimite }),
      });
      if (!reponse.ok) {
        const data = await reponse.json().catch(() => ({}));
        throw new Error(data.erreur || "Erreur inconnue.");
      }
      setTitre("");
      setDescription("");
      setDateLimite("");
      router.refresh();
    } catch (e) {
      setErreur(e.message);
    } finally {
      setEnCours(false);
    }
  }

  async function handleSupprimer(id) {
    try {
      const reponse = await fetch("/api/admin/devoirs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!reponse.ok) throw new Error();
      router.refresh();
    } catch {
      setErreur("La suppression a échoué.");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={handleAjouter}
        className="flex flex-col gap-3 rounded-lg border border-gold-dim bg-navy-light p-6"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
            Élève
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
            >
              {codes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.prenom} ({c.code})
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
            Date limite (optionnel)
            <input
              type="date"
              value={dateLimite}
              onChange={(e) => setDateLimite(e.target.value)}
              className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
          Titre de la tâche
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex : Réviser le chapitre Suites numériques"
            className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
          Détails (optionnel)
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Ex : exercices 1 à 4 de la fiche, corrigés à revoir"
            className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
          />
        </label>

        {erreur ? (
          <p className="font-sans text-sm text-red-300">{erreur}</p>
        ) : null}

        <button
          type="submit"
          disabled={enCours || codes.length === 0}
          className="self-start rounded-md bg-gold px-6 py-2 font-sans text-sm font-medium text-white transition active:scale-95 hover:opacity-90 disabled:opacity-50"
        >
          Assigner
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {devoirsInitiaux.length === 0 ? (
          <p className="font-sans text-sm text-cream/50">
            Aucune tâche assignée pour l&apos;instant.
          </p>
        ) : (
          devoirsInitiaux.map((devoir) => {
            const eleve = codes.find((c) => c.code.toUpperCase() === devoir.code);
            return (
              <div
                key={devoir.id}
                className="flex items-start justify-between gap-4 rounded-md border border-gold-dim bg-navy px-4 py-3"
              >
                <div>
                  <p className="font-sans text-sm text-cream">
                    {devoir.titre}{" "}
                    <span className="font-mono text-xs text-cream/50">
                      — {eleve?.prenom ?? devoir.code}
                    </span>
                  </p>
                  {devoir.description ? (
                    <p className="mt-1 font-sans text-xs text-cream/60">
                      {devoir.description}
                    </p>
                  ) : null}
                  {devoir.date_limite ? (
                    <p className="mt-1 font-mono text-xs text-lime/70">
                      Pour le {devoir.date_limite}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-md border px-3 py-1.5 font-sans text-xs ${
                      devoir.fait
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-gold-dim text-cream/50"
                    }`}
                  >
                    {devoir.fait ? "Fait" : "À faire"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSupprimer(devoir.id)}
                    className="rounded-md border border-red-400/40 px-3 py-1.5 font-sans text-xs text-red-300 transition-colors hover:border-red-400"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
