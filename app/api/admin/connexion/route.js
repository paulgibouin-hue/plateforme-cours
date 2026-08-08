import { NextResponse } from "next/server";
import { NOM_COOKIE, jetonAdmin } from "@/lib/adminAuth";

const DUREE_COOKIE = 60 * 60 * 8; // 8 heures

export async function POST(request) {
  let motDePasse;
  try {
    ({ motDePasse } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      {
        erreur:
          "Mot de passe administrateur non configuré (variable ADMIN_PASSWORD manquante).",
      },
      { status: 500 }
    );
  }

  if (motDePasse !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { erreur: "Mot de passe incorrect." },
      { status: 401 }
    );
  }

  const reponse = NextResponse.json({ ok: true });
  reponse.cookies.set(NOM_COOKIE, jetonAdmin(motDePasse), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DUREE_COOKIE,
    path: "/",
  });
  return reponse;
}
