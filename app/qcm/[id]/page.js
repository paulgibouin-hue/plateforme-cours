import Link from "next/link";
import { notFound } from "next/navigation";
import data from "@/data/qcm.json";
import QcmCard from "@/components/QcmCard";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  nsi: "NSI",
};

const LABELS_NIVEAU = {
  brevet: "Brevet",
  premiere: "Première",
  terminale: "Terminale",
  bac: "Bac",
};

export function generateStaticParams() {
  return data.qcms.map((qcm) => ({ id: qcm.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const qcm = data.qcms.find((q) => q.id === id);

  if (!qcm) return {};

  return {
    title: `QCM — ${qcm.titre}`,
    description: `Teste tes connaissances sur ${qcm.titre} avec ce QCM interactif corrigé (${qcm.questions.length} questions).`,
  };
}

export default async function QcmDetailPage({ params }) {
  const { id } = await params;
  const qcm = data.qcms.find((q) => q.id === id);

  if (!qcm) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/qcm"
        className="font-mono text-xs uppercase tracking-widest text-gold hover:underline"
      >
        ← Tous les QCM
      </Link>

      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gold">
        {LABELS_MATIERE[qcm.matiere] ?? qcm.matiere} ·{" "}
        {LABELS_NIVEAU[qcm.niveau] ?? qcm.niveau}
      </p>
      <h1 className="mt-2 font-display text-4xl text-cream">{qcm.titre}</h1>

      <div className="mt-10 flex flex-col gap-6">
        {qcm.questions.map((question) => (
          <QcmCard key={question.id} qcmId={qcm.id} question={question} />
        ))}
      </div>
    </section>
  );
}