import { cookies } from "next/headers";
import { lireCodes } from "@/lib/codesAcces";
import ConnexionAdmin from "@/components/admin/ConnexionAdmin";
import DeconnexionAdmin from "@/components/admin/DeconnexionAdmin";
import GestionCodes from "@/components/admin/GestionCodes";

const NOM_COOKIE = "admin_session";

export const metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(NOM_COOKIE)?.value;
  const estAuthentifie =
    Boolean(process.env.ADMIN_PASSWORD) &&
    session === process.env.ADMIN_PASSWORD;

  if (!estAuthentifie) {
    return (
      <section className="mx-auto max-w-sm px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-gold">
          Administration
        </p>
        <h1 className="mt-4 font-display text-3xl text-cream">Connexion</h1>
        <div className="mt-8">
          <ConnexionAdmin />
        </div>
      </section>
    );
  }

  const codes = await lireCodes();

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold">
            Administration
          </p>
          <h1 className="mt-2 font-display text-3xl text-cream">
            Codes d&apos;accès élèves
          </h1>
        </div>
        <DeconnexionAdmin />
      </div>

      <div className="mt-10">
        <GestionCodes codesInitiaux={codes} />
      </div>
    </section>
  );
}
