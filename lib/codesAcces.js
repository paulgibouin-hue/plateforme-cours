import { supabase } from "@/lib/supabase";

export async function lireCodes() {
  const { data, error } = await supabase()
    .from("codes_acces")
    .select("code, prenom, actif");
  if (error) throw error;
  return data ?? [];
}

/**
 * Remplace entièrement le contenu de la table par la liste fournie.
 * Les modifications (ajout/activation/suppression d'un code) sont rares et
 * faites uniquement par l'administrateur depuis /admin : ce remplacement
 * complet reste donc simple et sûr à ce niveau d'usage.
 */
export async function ecrireCodes(codes) {
  const { error: erreurSuppression } = await supabase()
    .from("codes_acces")
    .delete()
    .not("code", "is", null);
  if (erreurSuppression) throw erreurSuppression;

  if (codes.length > 0) {
    const { error: erreurInsertion } = await supabase()
      .from("codes_acces")
      .insert(codes);
    if (erreurInsertion) throw erreurInsertion;
  }
}
