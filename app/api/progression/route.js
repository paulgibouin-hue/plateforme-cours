import { NextResponse } from "next/server";
import { lireCodes } from "@/lib/codesAcces";
import { enregistrerProgression } from "@/lib/progressionServeur";

const NOM_COOKIE = "espace_eleve_code";

export async function POST(request) {
  const code = request.cookies.get(NOM_COOKIE)?.value;
  if (!code) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const codes = await lireCodes();
  const entree = codes.find(
    (c) => c.code.toUpperCase() === code.toUpperCase() && c.actif !== false
  );
  if (!entree) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  let cle, valeur;
  try {
    ({ cle, valeur } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  if (typeof cle !== "string" || typeof valeur !== "boolean") {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const codeNormalise = entree.code.toUpperCase();
  await enregistrerProgression(codeNormalise, cle, valeur);

  return NextResponse.json({ ok: true });
}
