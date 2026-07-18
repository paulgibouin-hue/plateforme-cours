import Link from "next/link";
import data from "@/data/qcm.json";

const LABELS_MATIERE = {
  mathematiques: "Mathématiques",
  physique: "Physique",
  chimie: "Chimie",
  nsi: "NSI",
};

const LABELS_NIVEAU = {
  brevet: "Collège (Brevet)",
  seconde: "Seconde",
  premiere: "Première",
  terminale: "Terminale",
};

const ORDRE_MATIERES = ["mathematiques", "physique", "chimie", "nsi"];
const ORDRE_NIVEAUX = ["brevet", "seconde", "premiere", "terminale"];

function groupParMatiere(qcms) {
  const groupes = new Map();
  for (const qcm of qcms) {
    if (!groupes.has(qcm.matiere)) groupes.set(qcm.matiere, []);
    groupes.get(qcm.matiere).push(qcm);
  }
  return ORDRE_MATIERES.filter((matiere) => groupes.has(matiere)).map(
    (matiere) => ({
      matiere,
      niveaux: groupParNiveau(groupes.get(matiere)),
    })
  );
}

function groupParNiveau(qcms) {
  const groupes = new Map();
  for (const qcm of qcms) {
    if (!groupes.has(qcm.niveau)) groupes.set(qcm.niveau, []);
    groupes.get(qcm.niveau).push(qcm);
  }
  return ORDRE_NIVEAUX.filter((niveau) => groupes.has(niveau)).map(
    (niveau) => ({
      niveau,
      qcms: groupes.get(niveau),
    })
  );
}

export const metadata = {
  title: "QCM interactifs",
  description:
    "QCM interactifs de mathématiques, physique-chimie et NSI pour réviser en autonomie, avec correction et explication.",
};

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
        {groupes.map(({ matiere, niveaux }) => (
          <div key={matiere}>
            <h2 className="font-display text-2xl text-cream">
              {LABELS_MATIERE[matiere] ?? matiere}
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {niveaux.map(({ niveau, qcms }) => (
                <div key={niveau}>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
                    {LABELS_NIVEAU[niveau] ?? niveau}
                  </h3>
                  <ul className="mt-3 flex flex-col gap-3">
                    {qcms.map((qcm) => (
                      <li key={qcm.id}>
                        <Link
                          href={`/qcm/${qcm.id}`}
                          className="flex items-center justify-between rounded-lg border border-gold-dim bg-navy-light px-6 py-4 transition-colors hover:border-gold"
                        >
                          <span className="font-sans text-cream">
                            {qcm.titre}
                          </span>
                          <span className="font-mono text-xs uppercase tracking-widest text-gold/70">
                            {qcm.questions.length} questions
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}