import { NextResponse } from "next/server";

const NOM_COOKIE = "espace_eleve_code";

export async function POST() {
  const reponse = NextResponse.json({ ok: true });
  reponse.cookies.set(NOM_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return reponse;
}
