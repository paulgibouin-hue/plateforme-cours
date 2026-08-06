import { NextResponse } from "next/server";
import { lireCodes } from "@/lib/codesAcces";
import { toggleDevoirFait } from "@/lib/devoirs";

const NOM_COOKIE = "espace_eleve_code";

export async function PATCH(request) {
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

  let id, fait;
  try {
    ({ id, fait } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  if (typeof id !== "number" || typeof fait !== "boolean") {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  await toggleDevoirFait(id, entree.code.toUpperCase(), fait);

  return NextResponse.json({ ok: true });
}
