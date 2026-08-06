import { NextResponse } from "next/server";
import { lireCodes } from "@/lib/codesAcces";

const NOM_COOKIE = "espace_eleve_code";
const MODELE = "llama-3.3-70b-versatile";
/*constantes d'utilisation*/
const MAX_MESSAGES = 20;
const MAX_LONGUEUR_MESSAGE = 2000;

const INSTRUCTION_SYSTEME = `Tu es l'assistant pédagogique de la plateforme de cours particuliers de Paul Gibouin, destiné à des collégiens et lycéens en mathématiques, physique-chimie et NSI (spécialité lycée).

Règles :
- Explique et guide le raisonnement, ne donne jamais directement la réponse finale d'un exercice ou devoir sans expliquer la méthode.
- Explique qu'il est necessaire de copier coller un énoncé complet pour que tu puisses aider efficacement.
- Adapte ton niveau de langage à un élève de collège ou lycée.
- Reste uniquement sur les sujets scolaires (maths, physique-chimie, NSI). Si une question sort de ce cadre, réponds poliment que tu ne peux aider que sur ces matières.
- Utilise des explications claires et concises, avec des étapes numérotées si utile.
- Pour toute formule ou notation mathématique/scientifique, utilise exclusivement la syntaxe LaTeX entourée d'un unique symbole dollar de chaque côté, par exemple $x^2 + 1$ ou $(u_n)_{n \\in \\mathbb{N}}$. N'utilise jamais $$...$$, \\[...\\] ni \\(...\\).`;

async function estEleveConnecte(request) {
  const code = request.cookies.get(NOM_COOKIE)?.value;
  if (!code) return false;
  const codes = await lireCodes();
  return codes.some(
    (c) => c.code.toUpperCase() === code.toUpperCase() && c.actif !== false
  );
}

export async function POST(request) {
  if (!(await estEleveConnecte(request))) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { erreur: "Le chatbot n'est pas encore configuré (GROQ_API_KEY manquante)." },
      { status: 500 }
    );
  }

  let messages;
  try {
    ({ messages } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ erreur: "Message manquant." }, { status: 400 });
  }

  if (messages.length > MAX_MESSAGES) {
    return NextResponse.json(
      { erreur: "Conversation trop longue, démarre une nouvelle discussion." },
      { status: 400 }
    );
  }

  for (const message of messages) {
    if (
      typeof message.contenu !== "string" ||
      message.contenu.length === 0 ||
      message.contenu.length > MAX_LONGUEUR_MESSAGE ||
      !["utilisateur", "assistant"].includes(message.role)
    ) {
      return NextResponse.json({ erreur: "Message invalide." }, { status: 400 });
    }
  }

  const messagesGroq = [
    { role: "system", content: INSTRUCTION_SYSTEME },
    ...messages.map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: message.contenu,
    })),
  ];

  try {
    const reponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODELE,
          messages: messagesGroq,
        }),
      }
    );

    if (reponse.status === 429) {
      return NextResponse.json(
        { erreur: "Trop de questions pour le moment, réessaie dans quelques minutes." },
        { status: 429 }
      );
    }

    if (!reponse.ok) {
      return NextResponse.json(
        { erreur: "Le chatbot n'a pas pu répondre, réessaie." },
        { status: 502 }
      );
    }

    const data = await reponse.json();
    const texte = data.choices?.[0]?.message?.content;

    if (!texte) {
      return NextResponse.json(
        { erreur: "Le chatbot n'a pas pu répondre, réessaie." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reponse: texte });
  } catch {
    return NextResponse.json(
      { erreur: "Le chatbot n'a pas pu répondre, réessaie." },
      { status: 502 }
    );
  }
}
