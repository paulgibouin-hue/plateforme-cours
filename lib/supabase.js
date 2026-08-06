import { createClient } from "@supabase/supabase-js";

let client;

/**
 * Client Supabase côté serveur uniquement (clé service_role, jamais exposée
 * au navigateur). N'est jamais importé depuis un composant "use client".
 */
export function supabase() {
  if (!client) {
    client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
  }
  return client;
}
