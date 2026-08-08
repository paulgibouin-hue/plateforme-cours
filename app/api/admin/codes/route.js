import { NextResponse } from "next/server";
import { lireCodes, ecrireCodes } from "@/lib/codesAcces";
import { NOM_COOKIE, estJetonValide } from "@/lib/adminAuth";

function estAutorise(request) {
  return estJetonValide(request.cookies.get(NOM_COOKIE)?.value);
}

export async function POST(request) {
  if (!estAutorise(request)) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  let code, prenom;
  try {
    ({ code, prenom } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  if (!code?.trim() || !prenom?.trim()) {
    return NextResponse.json(
      { erreur: "Code et prénom requis." },
      { status: 400 }
    );
  }

  const codeNormalise = code.trim().toUpperCase();
  const codes = await lireCodes();

  if (codes.some((c) => c.code.toUpperCase() === codeNormalise)) {
    return NextResponse.json(
      { erreur: "Ce code existe déjà." },
      { status: 409 }
    );
  }

  codes.push({ code: codeNormalise, prenom: prenom.trim(), actif: true });
  await ecrireCodes(codes);

  return NextResponse.json({ ok: true });
}

export async function PATCH(request) {
  if (!estAutorise(request)) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  let code;
  try {
    ({ code } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const codes = await lireCodes();
  const entree = codes.find((c) => c.code === code);
  if (!entree) {
    return NextResponse.json({ erreur: "Code introuvable." }, { status: 404 });
  }

  entree.actif = entree.actif === false ? true : false;
  await ecrireCodes(codes);

  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  if (!estAutorise(request)) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  let code;
  try {
    ({ code } = await request.json());
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const codes = await lireCodes();
  const codesRestants = codes.filter((c) => c.code !== code);
  await ecrireCodes(codesRestants);

  return NextResponse.json({ ok: true });
}
