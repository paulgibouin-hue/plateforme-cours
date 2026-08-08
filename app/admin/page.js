import { cookies } from "next/headers";
import { lireCodes } from "@/lib/codesAcces";
import { lireProgressionServeur } from "@/lib/progressionServeur";
import { lireTousLesDevoirs } from "@/lib/devoirs";
import exercicesData from "@/data/exercices.json";
import qcmData from "@/data/qcm.json";
import ConnexionAdmin from "@/components/admin/ConnexionAdmin";
import DeconnexionAdmin from "@/components/admin/DeconnexionAdmin";
import GestionCodes from "@/components/admin/GestionCodes";
import SuiviEleves from "@/components/admin/SuiviEleves";
import CahierTexteAdmin from "@/components/admin/CahierTexteAdmin";
import { NOM_COOKIE, estJetonValide } from "@/lib/adminAuth";

export const metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(NOM_COOKIE)?.value;
  const estAuthentifie = estJetonValide(session);

  if (!estAuthentifie) {
    return (
      <section className="mx-auto max-w-sm px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-lime">
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
  const progression = await lireProgressionServeur();
  const devoirs = await lireTousLesDevoirs();

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-lime">
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

      <div className="mt-16">
        <p className="font-mono text-xs uppercase tracking-widest text-lime">
          Suivi
        </p>
        <h2 className="mt-2 font-display text-2xl text-cream">
          Progression des élèves
        </h2>
        <div className="mt-6">
          <SuiviEleves
            codes={codes}
            progression={progression}
            chapitres={exercicesData.chapitres}
            qcms={qcmData.qcms}
          />
        </div>
      </div>

      <div className="mt-16">
        <p className="font-mono text-xs uppercase tracking-widest text-lime">
          Cahier de texte
        </p>
        <h2 className="mt-2 font-display text-2xl text-cream">
          Tâches assignées
        </h2>
        <div className="mt-6">
          <CahierTexteAdmin codes={codes} devoirsInitiaux={devoirs} />
        </div>
      </div>
    </section>
  );
}
