import Link from "next/link";
import { cookies } from "next/headers";
import { lireCodes } from "@/lib/codesAcces";
import CodeForm from "@/components/CodeForm";
import DeconnexionButton from "@/components/DeconnexionButton";
import ProgressionListe from "@/components/ProgressionListe";
import SuggestionForm from "@/components/SuggestionForm";
import ChatBot from "@/components/ChatBot";

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

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-lime">
            Espace élève
          </p>
          <h1 className="mt-2 font-display text-3xl text-cream">
            Bonjour {entree.prenom}
          </h1>
        </div>
        <DeconnexionButton />
      </div>

      <p className="mt-12 font-mono text-xs uppercase tracking-widest text-lime">
        Continuer
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <Link
          href="/matieres/mathematiques"
          className="rounded-lg border border-gold-dim bg-navy-light p-6 transition-colors hover:border-gold hover:bg-white/20"
        >
          <p className="font-display text-lg text-cream">Exercices</p>
          <p className="mt-1 font-sans text-sm text-cream/60">
            Reprends les fiches classées par matière
          </p>
        </Link>
        <Link
          href="/qcm"
          className="rounded-lg border border-gold-dim bg-navy-light p-6 transition-colors hover:border-gold hover:bg-white/20"
        >
          <p className="font-display text-lg text-cream">QCM</p>
          <p className="mt-1 font-sans text-sm text-cream/60">
            Teste tes connaissances
          </p>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:items-start">
        <section
          id="chatbot"
          className="scroll-mt-24 rounded-lg border border-gold-dim bg-navy-light p-6 lg:col-span-2"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-lime">
            Assistant
          </p>
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

        <div className="flex flex-col gap-6">
          <section className="rounded-lg border border-gold-dim bg-navy-light p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Suivi
            </p>
            <h2 className="mt-2 font-display text-xl text-cream">
              Ma progression
            </h2>
            <div className="mt-6">
              <ProgressionListe />
            </div>
          </section>

          <section className="rounded-lg border border-gold-dim bg-navy-light p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              Suggestions
            </p>
            <h2 className="mt-2 font-display text-xl text-cream">
              Une idée à proposer ?
            </h2>
            <p className="mt-2 font-sans text-sm text-cream/70">
              Un chapitre, un exercice, une fonctionnalité ? Dis-le à Paul,
              ton message part directement par mail.
            </p>
            <div className="mt-6">
              <SuggestionForm prenom={entree.prenom} />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
