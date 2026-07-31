import { supabase } from "@/lib/supabase";

export async function lireDevoirsEleve(code) {
  const { data, error } = await supabase()
    .from("devoirs")
    .select("id, titre, description, date_limite, fait")
    .eq("code", code)
    .order("date_limite", { ascending: true, nullsFirst: false })
    .order("cree_le", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function lireTousLesDevoirs() {
  const { data, error } = await supabase()
    .from("devoirs")
    .select("id, code, titre, description, date_limite, fait")
    .order("cree_le", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function creerDevoir({ code, titre, description, dateLimite }) {
  const { error } = await supabase().from("devoirs").insert({
    code,
    titre,
    description: description || null,
    date_limite: dateLimite || null,
  });
  if (error) throw error;
}

export async function supprimerDevoir(id) {
  const { error } = await supabase().from("devoirs").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleDevoirFait(id, code, valeur) {
  const { error } = await supabase()
    .from("devoirs")
    .update({ fait: valeur })
    .eq("id", id)
    .eq("code", code);
  if (error) throw error;
}
