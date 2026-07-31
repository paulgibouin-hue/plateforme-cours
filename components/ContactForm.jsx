"use client";

import { useState } from "react";

const NIVEAUX = ["6ᵉ", "5ᵉ", "4ᵉ", "3ᵉ", "2nde", "1ère", "Terminale"];

const MAX_MATIERES = 3;
const MATIERES = ["Mathématiques", "Physique-Chimie", "NSI"];

const ENDPOINT_FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

const CHAMPS_INITIAUX = {
  nom: "",
  email: "",
  niveau: NIVEAUX[0],
  matieres: [],
  message: "",
};

export default function ContactForm() {
  const [champs, setChamps] = useState(CHAMPS_INITIAUX);
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  function mettreAJour(cle, valeur) {
    setChamps((precedent) => ({ ...precedent, [cle]: valeur }));
  }

  function toggleMatiere(matiere) {
    setChamps((precedent) => {
      const dejaSelectionnee = precedent.matieres.includes(matiere);
      if (dejaSelectionnee) {
        return {
          ...precedent,
          matieres: precedent.matieres.filter((m) => m !== matiere),
        };
      }
      if (precedent.matieres.length >= MAX_MATIERES) {
        return precedent;
      }
      return { ...precedent, matieres: [...precedent.matieres, matiere] };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !champs.nom.trim() ||
      !champs.email.trim() ||
      !champs.message.trim() ||
      champs.matieres.length === 0
    ) {
      setErreur(
        "Merci de remplir ton nom, ton email, ton message, et de choisir au moins une matière."
      );
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
          nom: champs.nom,
          email: champs.email,
          niveau: champs.niveau,
          matieres: champs.matieres.join(", "),
          message: champs.message,
          _subject: `Demande de cours — ${champs.matieres.join(", ")} (${champs.niveau})`,
        }),
      });

      if (!reponse.ok) {
        throw new Error();
      }

      setEnvoye(true);
      setChamps(CHAMPS_INITIAUX);
    } catch {
      setErreur(
        "L'envoi a échoué. Réessaie, ou écris-moi directement à [TON_EMAIL]."
      );
    } finally {
      setEnCours(false);
    }
  }

  if (envoye) {
    return (
      <div className="rounded-lg border border-gold bg-gold/10 p-6 text-center">
        <p className="font-display text-lg text-cream">
          Message envoyé !
        </p>
        <p className="mt-2 font-sans text-sm text-cream/70">
          Je te réponds sous 48h.
        </p>
        <button
          type="button"
          onClick={() => setEnvoye(false)}
          className="mt-4 font-mono text-xs uppercase tracking-widest text-gold hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-lg border border-gold-dim bg-navy-light p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
          Nom
          <input
            type="text"
            value={champs.nom}
            onChange={(e) => mettreAJour("nom", e.target.value)}
            required
            className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
          Email
          <input
            type="email"
            value={champs.email}
            onChange={(e) => mettreAJour("email", e.target.value)}
            required
            className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
          Niveau de l&apos;élève
          <select
            value={champs.niveau}
            onChange={(e) => mettreAJour("niveau", e.target.value)}
            className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
          >
            {NIVEAUX.map((niveau) => (
              <option key={niveau} value={niveau}>
                {niveau}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-1 font-sans text-sm text-cream/80 sm:col-span-2">
          <span>
            Matière(s){" "}
            <span className="font-mono text-xs text-cream/50">
              (jusqu&apos;à {MAX_MATIERES})
            </span>
          </span>
          <div className="flex flex-wrap gap-2">
            {MATIERES.map((matiere) => {
              const selectionnee = champs.matieres.includes(matiere);
              const desactivee =
                !selectionnee && champs.matieres.length >= MAX_MATIERES;
              return (
                <button
                  key={matiere}
                  type="button"
                  onClick={() => toggleMatiere(matiere)}
                  disabled={desactivee}
                  aria-pressed={selectionnee}
                  className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                    selectionnee
                      ? "border-gold bg-gold/10 text-gold"
                      : desactivee
                        ? "cursor-not-allowed border-gold-dim/40 text-cream/30"
                        : "border-gold-dim text-cream/80 hover:border-gold"
                  }`}
                >
                  {matiere}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <label className="flex flex-col gap-1 font-sans text-sm text-cream/80">
        Message
        <textarea
          value={champs.message}
          onChange={(e) => mettreAJour("message", e.target.value)}
          required
          rows={5}
          placeholder="Décris le besoin : objectifs, disponibilités, contexte scolaire..."
          className="rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
        />
      </label>

      {erreur ? (
        <p className="font-sans text-sm text-red-300">{erreur}</p>
      ) : null}

      <button
        type="submit"
        disabled={enCours}
        className="self-start rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-cream transition active:scale-95 hover:opacity-90 disabled:opacity-50"
      >
        {enCours ? "Envoi..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
