import { cookies } from "next/headers";
import { lireCodes } from "@/lib/codesAcces";
import SuggestionModal from "@/components/SuggestionModal";

const NOM_COOKIE = "espace_eleve_code";

export default async function Footer() {
  const cookieStore = await cookies();
  const code = cookieStore.get(NOM_COOKIE)?.value;
  const codes = code ? await lireCodes() : [];
  const entree = code
    ? codes.find(
        (c) => c.code.toUpperCase() === code.toUpperCase() && c.actif !== false
      )
    : null;

  return (
    <footer className="mt-auto border-t border-gold-dim">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 font-mono text-xs text-cream/60 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <p> 06 49 98 32 03 <br></br>paul.gibouin.17@gmail.com</p>
          <p>Cours particuliers à Évry-Courcouronnes et en ligne</p>
        </div>
        <SuggestionModal prenom={entree?.prenom} />
      </div>
    </footer>
  );
}
