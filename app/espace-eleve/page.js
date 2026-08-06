import { Link } from "next-view-transitions";
import { cookies } from "next/headers";
import { lireCodes } from "@/lib/codesAcces";
import { lireDevoirsEleve } from "@/lib/devoirs";
import {
  lireProgressionEleveServeur,
  lireTendanceHebdomadaire,
} from "@/lib/progressionServeur";
import { calculerBarresMatieres, calculerBarreQcm } from "@/lib/statsProgression";
import CodeForm from "@/components/CodeForm";
import DeconnexionButton from "@/components/DeconnexionButton";
import ProgressionDashboard from "@/components/ProgressionDashboard";
import ChatBot from "@/components/ChatBot";
import CahierTexte from "@/components/CahierTexte";

const NOM_COOKIE = "espace_eleve_code";

export const metadata = {
  title: "Espace élève",
  robots: { index: false, follow: false },
};

export default async function EspaceElevePage() {
  const cookieStore = await cookies();
  const code = cookieStore.get(NOM_COOKIE)?.value;
  const codes = await lireCodes();
  const entree = code
    ? codes.find(
        (c) => c.code.toUpperCase() === code.toUpperCase() && c.actif !== false
      )
    : null;

  if (!entree) {
    return (
      <section className="mx-auto max-w-md px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-lime">
          Espace élève
        </p>
        <h1 className="mt-4 font-display text-3xl text-cream">Accès privé</h1>
        <p className="mt-4 font-sans text-cream/70">
          Entre le code d&apos;accès qui t&apos;a été communiqué pour
          rejoindre ton espace personnel.
        </p>
        <div className="mt-8">
          <CodeForm />
        </div>
      </section>
    );
  }

  const codeEleve = entree.code.toUpperCase();
  const [devoirs, progressionEleve, tendance] = await Promise.all([
    lireDevoirsEleve(codeEleve),
    lireProgressionEleveServeur(codeEleve),
    lireTendanceHebdomadaire(codeEleve),
  ]);
  const barresMatieres = calculerBarresMatieres(progressionEleve);
  const barreQcm = calculerBarreQcm(progressionEleve);
  const exercicesCetteSemaine = Math.max(
    tendance[tendance.length - 1] - tendance[tendance.length - 2],
    0
  );

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="animate-blob-drift pointer-events-none absolute -top-40 right-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-gold/15 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="animate-blob-drift-reverse pointer-events-none absolute -left-24 top-96 -z-10 h-96 w-96 rounded-full bg-lime/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Espace élève
            </p>
            <h1 className="mt-2 font-display text-3xl text-cream">
              Bonjour {entree.prenom}
              {exercicesCetteSemaine > 0 ? (
                <span className="text-cream/50">
                  {" "}
                  · {exercicesCetteSemaine} exercice
                  {exercicesCetteSemaine > 1 ? "s" : ""} cette semaine
                </span>
              ) : null}
            </h1>
          </div>
          <DeconnexionButton />
        </div>

        {/* Suivi de progression : pleine largeur */}
        <section className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-lime">
            Suivi
          </p>
          <h2 className="mt-2 font-display text-xl text-cream">
            Ma progression
          </h2>
          <div className="mt-6">
            <ProgressionDashboard
              tendance={tendance}
              barresMatieres={barresMatieres}
              barreQcm={barreQcm}
            />
          </div>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-gold-dim border-l-4 border-l-gold bg-navy-light p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold/15 text-gold">
                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                  <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M6 7h8M6 10h8M6 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-lime">
                Cahier de texte
              </p>
            </div>
            <h2 className="mt-2 font-display text-xl text-cream">
              Tes tâches à faire
            </h2>
            <div className="mt-6">
              <CahierTexte devoirsInitiaux={devoirs} />
            </div>
          </section>

          <section className="flex flex-col gap-3 rounded-lg border border-gold-dim bg-navy-light p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Continuer
            </p>
            <Link
              href="/matieres/mathematiques"
              className="flex items-center gap-3 rounded-lg bg-navy px-5 py-4 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gold/15 text-gold">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path d="M3 4.5c2-1 5-1 7 0v11c-2-1-5-1-7 0v-11zM17 4.5c-2-1-5-1-7 0v11c2-1 5-1 7 0v-11z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg text-cream">Exercices</span>
                <span className="block font-sans text-xs text-cream/50">Fiches classées par matière — reprendre</span>
              </span>
              <span className="font-mono text-gold">→</span>
            </Link>
            <Link
              href="/qcm"
              className="flex items-center gap-3 rounded-lg bg-navy px-5 py-4 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gold/15 text-gold">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M7 10.2l2 2 4-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg text-cream">QCM</span>
                <span className="block font-sans text-xs text-cream/50">Teste tes connaissances</span>
              </span>
              <span className="font-mono text-gold">→</span>
            </Link>
          </section>
        </div>

        <section
          id="chatbot"
          className="mt-8 scroll-mt-24 rounded-lg border border-gold-dim border-l-4 border-l-lime bg-navy-light p-6"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-lime/15 text-lime">
              <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                <path d="M3 4h14v9H8l-3 3v-3H3V4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Assistant
            </p>
          </div>
          <h2 className="mt-2 font-display text-xl text-cream">
            Une question ? Demande à l&apos;assistant
          </h2>
          <p className="mt-2 max-w-xl font-sans text-sm text-cream/70">
            Un exercice bloque, une notion pas claire ? Discute avec
            l&apos;assistant pédagogique de la plateforme.
          </p>
          <div className="mt-6">
            <ChatBot />
          </div>
        </section>
      </div>
    </section>
  );
}
