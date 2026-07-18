import fs from "fs/promises";
import path from "path";

const CHEMIN_FICHIER = path.join(process.cwd(), "data", "codes-acces.json");

export async function lireCodes() {
  const brut = await fs.readFile(CHEMIN_FICHIER, "utf-8");
  const data = JSON.parse(brut);
  return data.codes ?? [];
}

export async function ecrireCodes(codes) {
  const contenu = JSON.stringify({ codes }, null, 2) + "\n";
  await fs.writeFile(CHEMIN_FICHIER, contenu, "utf-8");
}
