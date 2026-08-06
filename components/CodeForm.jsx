"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CodeForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!code.trim()) {
      setErreur("Merci de saisir ton code d'accès.");
      return;
    }

    setEnCours(true);
    setErreur("");

    try {
      const reponse = await fetch("/api/espace-eleve/verifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!reponse.ok) {
        setErreur("Code invalide. Vérifie la saisie ou contacte-moi.");
        setEnCours(false);
        return;
      }

      router.refresh();
    } catch {
      setErreur("Une erreur est survenue, réessaie.");
      setEnCours(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code d'accès"
        autoComplete="off"
        className="rounded-md border border-gold-dim bg-navy px-3 py-2 font-mono text-cream outline-none focus:border-gold"
      />
      {erreur ? (
        <p className="font-sans text-sm text-red-300">{erreur}</p>
      ) : null}
      <button
        type="submit"
        disabled={enCours}
        className="self-start rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-white transition active:scale-95 hover:opacity-90 disabled:opacity-50"
      >
        {enCours ? "Vérification..." : "Accéder"}
      </button>
    </form>
  );
}
