import { supabase } from "@/lib/supabase";

/**
 * Renvoie la progression de tous les élèves, regroupée par code :
 * { [CODE]: { [cle]: true|false } }
 */
export async function lireProgressionServeur() {
  const { data, error } = await supabase()
    .from("progression")
    .select("code, cle, valeur");
  if (error) throw error;

  const progression = {};
  for (const ligne of data ?? []) {
    if (!progression[ligne.code]) progression[ligne.code] = {};
    progression[ligne.code][ligne.cle] = ligne.valeur;
  }
  return progression;
}

/**
 * Enregistre (ou met à jour) une seule entrée de progression pour un élève.
 * Écriture ciblée (upsert sur la clé composite code+cle) plutôt qu'une
 * réécriture complète de la table, pour rester correct même si plusieurs
 * élèves cochent des exercices en même temps.
 */
export async function enregistrerProgression(code, cle, valeur) {
  const { error } = await supabase()
    .from("progression")
    .upsert({ code, cle, valeur }, { onConflict: "code,cle" });
  if (error) throw error;
}
