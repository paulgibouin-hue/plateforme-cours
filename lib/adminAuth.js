import { createHash } from "crypto";

const NOM_COOKIE = "admin_session";

export function jetonAdmin(motDePasse) {
  return createHash("sha256").update(motDePasse).digest("hex");
}

export function estJetonValide(jeton) {
  return (
    Boolean(process.env.ADMIN_PASSWORD) &&
    Boolean(jeton) &&
    jeton === jetonAdmin(process.env.ADMIN_PASSWORD)
  );
}

export { NOM_COOKIE };
