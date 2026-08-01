"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConnexionAdmin() {
  const router = useRouter();
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setEnCours(true);
    setErreur("");

    try {
      const reponse = await fetch("/api/admin/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motDePasse }),
      });

      if (!reponse.ok) {
        const data = await reponse.json().catch(() => ({}));
        setErreur(data.erreur || "Mot de passe incorrect.");
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
        type="password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        placeholder="Mot de passe administrateur"
        autoComplete="current-password"
        className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
      />
      {erreur ? (
        <p className="font-sans text-sm text-red-300">{erreur}</p>
      ) : null}
      <button
        type="submit"
        disabled={enCours}
        className="self-start rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-white transition active:scale-95 hover:opacity-90 disabled:opacity-50"
      >
        {enCours ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
