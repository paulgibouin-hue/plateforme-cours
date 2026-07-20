"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function genererCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function GestionCodes({ codesInitiaux }) {
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [code, setCode] = useState(() => genererCode());
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function appelerApi(method, corps) {
    const reponse = await fetch("/api/admin/codes", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corps),
    });
    if (!reponse.ok) {
      const data = await reponse.json().catch(() => ({}));
      throw new Error(data.erreur || "Erreur inconnue.");
    }
  }

  async function handleAjouter(event) {
    event.preventDefault();
    if (!prenom.trim() || !code.trim()) {
      setErreur("Renseigne un prénom et un code.");
      return;
    }
    setEnCours(true);
    setErreur("");
    try {
      await appelerApi("POST", { code, prenom });
      setPrenom("");
      setCode(genererCode());
      router.refresh();
    } catch (e) {
      setErreur(e.message);
    } finally {
      setEnCours(false);
    }
  }

  async function handleToggle(codeCible) {
    setErreur("");
    try {
      await appelerApi("PATCH", { code: codeCible });
      router.refresh();
    } catch (e) {
      setErreur(e.message);
    }
  }

  async function handleSupprimer(codeCible) {
    if (!window.confirm(`Supprimer le code ${codeCible} ?`)) return;
    setErreur("");
    try {
      await appelerApi("DELETE", { code: codeCible });
      router.refresh();
    } catch (e) {
      setErreur(e.message);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={handleAjouter}
        className="flex flex-col gap-3 rounded-lg border border-gold-dim bg-navy-light p-6 sm:flex-row sm:items-end"
      >
        <label className="flex flex-1 flex-col gap-1 font-sans text-sm text-cream/80">
          Prénom de l&apos;élève
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
          Code d&apos;accès
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="rounded-md border border-gold-dim bg-navy px-3 py-2 font-mono text-cream outline-none focus:border-gold"
          />
        </label>
        <button
          type="submit"
          disabled={enCours}
          className="rounded-md bg-gold px-6 py-2 font-sans text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Ajouter
        </button>
      </form>

      {erreur ? (
        <p className="font-sans text-sm text-red-300">{erreur}</p>
      ) : null}

      <div className="flex flex-col gap-2">
        {codesInitiaux.length === 0 ? (
          <p className="font-sans text-sm text-cream/50">
            Aucun élève enregistré pour l&apos;instant.
          </p>
        ) : (
          codesInitiaux.map((entree) => (
            <div
              key={entree.code}
              className="flex items-center justify-between gap-4 rounded-md border border-gold-dim bg-navy px-4 py-3"
            >
              <div>
                <p className="font-sans text-cream">{entree.prenom}</p>
                <p className="font-mono text-xs text-cream/50">
                  {entree.code}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle(entree.code)}
                  className={`rounded-md border px-3 py-1.5 font-sans text-xs transition-colors ${
                    entree.actif !== false
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold-dim text-cream/50"
                  }`}
                >
                  {entree.actif !== false ? "Actif" : "Inactif"}
                </button>
                <button
                  type="button"
                  onClick={() => handleSupprimer(entree.code)}
                  className="rounded-md border border-red-400/40 px-3 py-1.5 font-sans text-xs text-red-300 transition-colors hover:border-red-400"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
