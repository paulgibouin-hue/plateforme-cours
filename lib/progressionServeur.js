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
 * Renvoie la progression d'un seul élève : { [cle]: true|false }
 */
export async function lireProgressionEleveServeur(code) {
  const { data, error } = await supabase()
    .from("progression")
    .select("cle, valeur")
    .eq("code", code);
  if (error) throw error;

  const progression = {};
  for (const ligne of data ?? []) {
    progression[ligne.cle] = ligne.valeur;
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
    .upsert(
      { code, cle, valeur, maj_le: new Date().toISOString() },
      { onConflict: "code,cle" }
    );
  if (error) throw error;
}

/**
 * Renvoie, pour un élève, le nombre cumulé d'exercices/QCM cochés à la fin
 * de chacune des 6 dernières semaines (pour un graphique de tendance).
 */
export async function lireTendanceHebdomadaire(code) {
  const { data, error } = await supabase()
    .from("progression")
    .select("maj_le, valeur")
    .eq("code", code)
    .eq("valeur", true)
    .order("maj_le", { ascending: true });
  if (error) throw error;

  const MS_PAR_SEMAINE = 7 * 24 * 60 * 60 * 1000;
  const maintenant = Date.now();

  const points = [];
  for (let i = 5; i >= 0; i--) {
    const finSemaine = maintenant - i * MS_PAR_SEMAINE;
    const cumul = (data ?? []).filter(
      (ligne) => new Date(ligne.maj_le).getTime() <= finSemaine
    ).length;
    points.push(cumul);
  }
  return points;
}
