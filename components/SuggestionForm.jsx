"use client";

import { useState } from "react";

const TYPES = ["Nouveau chapitre", "Nouvel exercice", "Fonctionnalité", "Autre"];

const ENDPOINT_FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export default function SuggestionForm({ prenom: prenomConnu }) {
  const [prenomSaisi, setPrenomSaisi] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  const prenom = prenomConnu || prenomSaisi;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!prenomConnu && !prenomSaisi.trim()) {
      setErreur("Merci d'indiquer ton prénom.");
      return;
    }

    if (!message.trim()) {
      setErreur("Merci de décrire ta suggestion.");
      return;
    }

    if (!ENDPOINT_FORMSPREE) {
      setErreur(
        "Le formulaire n'est pas encore configuré (NEXT_PUBLIC_FORMSPREE_ENDPOINT manquant)."
      );
      return;
    }

    setErreur("");
    setEnCours(true);

    try {
      const reponse = await fetch(ENDPOINT_FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          prenom,
          type,
          message,
          _subject: `Suggestion élève (${type}) — ${prenom}`,
        }),
      });

      if (!reponse.ok) {
        throw new Error();
      }

      setEnvoye(true);
      setType(TYPES[0]);
      setMessage("");
      setPrenomSaisi("");
    } catch {
      setErreur("L'envoi a échoué. Réessaie dans quelques instants.");
    } finally {
      setEnCours(false);
    }
  }

  if (envoye) {
    return (
      <div className="rounded-lg border border-gold bg-gold/10 p-6 text-center">
        <p className="font-display text-lg text-cream">Suggestion envoyée !</p>
        <p className="mt-2 font-sans text-sm text-cream/70">
          Merci, Paul la lira avec attention.
        </p>
        <button
          type="button"
          onClick={() => setEnvoye(false)}
          className="mt-4 font-mono text-xs uppercase tracking-widest text-gold hover:underline"
        >
          Envoyer une autre suggestion
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      {!prenomConnu ? (
        <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
          Ton prénom
          <input
            type="text"
            value={prenomSaisi}
            onChange={(e) => setPrenomSaisi(e.target.value)}
            className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
          />
        </label>
      ) : null}

      <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
        Type de suggestion
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
        Ta suggestion
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Décris le chapitre, l'exercice ou la fonctionnalité que tu aimerais voir sur la plateforme..."
          className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
        />
      </label>

      {erreur ? (
        <p className="font-sans text-sm text-red-300">{erreur}</p>
      ) : null}

      <button
        type="submit"
        disabled={enCours}
        className="self-start rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-white transition active:scale-95 hover:opacity-90 disabled:opacity-50"
      >
        {enCours ? "Envoi..." : "Envoyer ma suggestion"}
      </button>
    </form>
  );
}
