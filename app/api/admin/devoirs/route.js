import { NextResponse } from "next/server";
import { creerDevoir, supprimerDevoir } from "@/lib/devoirs";
import { NOM_COOKIE, estJetonValide } from "@/lib/adminAuth";

function estAutorise(request) {
  return estJetonValide(request.cookies.get(NOM_COOKIE)?.value);
}

export async function POST(request) {
  if (!estAutorise(request)) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  let code, titre, description, dateLimite;
  try {
    ({ code, titre, description, dateLimite } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  if (!code?.trim() || !titre?.trim()) {
    return NextResponse.json(
      { erreur: "Élève et titre de la tâche requis." },
      { status: 400 }
    );
  }

  await creerDevoir({
    code: code.trim().toUpperCase(),
    titre: titre.trim(),
    description: description?.trim(),
    dateLimite: dateLimite || null,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  if (!estAutorise(request)) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  let id;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  if (typeof id !== "number") {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  await supprimerDevoir(id);

  return NextResponse.json({ ok: true });
}
