import { NextResponse } from "next/server";
import codesData from "@/data/codes-acces.json";

const NOM_COOKIE = "espace_eleve_code";
const DUREE_COOKIE = 60 * 60 * 24 * 30; // 30 jours

export async function POST(request) {
  let code;
  try {
    ({ code } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  if (!code || typeof code !== "string") {
    return NextResponse.json({ erreur: "Code manquant." }, { status: 400 });
  }

  const codeNormalise = code.trim().toUpperCase();
  const entree = codesData.codes.find(
    (c) => c.code.toUpperCase() === codeNormalise && c.actif !== false
  );

  if (!entree) {
    return NextResponse.json({ erreur: "Code invalide." }, { status: 401 });
  }

  const reponse = NextResponse.json({ prenom: entree.prenom });
  reponse.cookies.set(NOM_COOKIE, codeNormalise, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DUREE_COOKIE,
    path: "/",
  });
  return reponse;
}
