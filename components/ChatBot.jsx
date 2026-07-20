"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import { renderAvecLatex } from "@/lib/latex";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [saisie, setSaisie] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  async function envoyerMessage(event) {
    event.preventDefault();
    const contenu = saisie.trim();
    if (!contenu || enCours) return;

    const nouveauxMessages = [...messages, { role: "utilisateur", contenu }];
    setMessages(nouveauxMessages);
    setSaisie("");
    setErreur("");
    setEnCours(true);

    try {
      const reponse = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nouveauxMessages }),
      });

      const data = await reponse.json().catch(() => ({}));

      if (!reponse.ok) {
        setErreur(data.erreur || "Le chatbot n'a pas pu répondre, réessaie.");
        return;
      }

      setMessages([
        ...nouveauxMessages,
        { role: "assistant", contenu: data.reponse },
      ]);
    } catch {
      setErreur("Une erreur est survenue, réessaie.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gold-dim bg-navy-light p-6">
      <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="font-sans text-sm text-cream/50">
            Pose une question sur un chapitre, un exercice, une notion mal
            comprise... L&apos;assistant t&apos;aide à comprendre, sans
            donner directement la réponse d&apos;un exercice.
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`whitespace-pre-line rounded-md px-4 py-2 font-sans text-sm ${
                message.role === "utilisateur"
                  ? "ml-8 bg-gold/10 text-cream"
                  : "mr-8 bg-navy text-cream/90"
              }`}
            >
              {renderAvecLatex(message.contenu)}
            </div>
          ))
        )}
        {enCours ? (
          <p className="mr-8 font-sans text-sm text-cream/50">
            L&apos;assistant réfléchit...
          </p>
        ) : null}
      </div>

      {erreur ? (
        <p className="font-sans text-sm text-red-300">{erreur}</p>
      ) : null}

      <form onSubmit={envoyerMessage} className="flex gap-3">
        <input
          type="text"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          placeholder="Écris ta question..."
          className="flex-1 rounded-md border border-gold-dim bg-navy px-3 py-2 text-cream outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={enCours || !saisie.trim()}
          className="rounded-md bg-gold px-6 py-2 font-sans text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
