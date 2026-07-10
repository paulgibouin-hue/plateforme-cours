import Link from "next/link";
import data from "@/data/qcm.json";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  technologie: "Technologie",
};

const LABELS_NIVEAU = {
  brevet: "Brevet",
  premiere: "Première",
  terminale: "Terminale",
  bac: "Bac",
};

const ORDRE_MATIERES = ["mathematiques", "physique", "chimie", "technologie"];

function groupParMatiere(qcms) {
  const groupes = new Map();
  for (const qcm of qcms) {
    if (!groupes.has(qcm.matiere)) groupes.set(qcm.matiere, []);
    groupes.get(qcm.matiere).push(qcm);
  }
  return ORDRE_MATIERES.filter((matiere) => groupes.has(matiere)).map(
    (matiere) => ({
      matiere,
      qcms: groupes.get(matiere),
    })
  );
}

export default function QcmPage() {
  const groupes = groupParMatiere(data.qcms);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        QCM interactifs
      </p>
      <h1 className="mt-4 font-display text-4xl text-cream">
        Teste tes connaissances
      </h1>

      <div className="mt-12 flex flex-col gap-12">
        {groupes.map(({ matiere, qcms }) => (
          <div key={matiere}>
            <h2 className="font-display text-2xl text-cream">
              {LABELS_MATIERE[matiere] ?? matiere}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {qcms.map((qcm) => (
                <li key={qcm.id}>
                  <Link
                    href={`/qcm/${qcm.id}`}
                    className="flex items-center justify-between rounded-lg border border-gold-dim bg-navy-light px-6 py-4 transition-colors hover:border-gold"
                  >
                    <span className="font-sans text-cream">{qcm.titre}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-gold">
                      {LABELS_NIVEAU[qcm.niveau] ?? qcm.niveau} ·{" "}
                      {qcm.questions.length} questions
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
