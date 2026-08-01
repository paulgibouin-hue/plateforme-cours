import { Link } from "next-view-transitions";
import data from "@/data/qcm.json";
import Reveal from "@/components/Reveal";
import IconeNiveau from "@/components/IconeNiveau";

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
    <section className="mx-auto max-w-4xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-lime">
        QCM interactifs
      </p>
      <h1 className="mt-4 font-display text-4xl text-cream">
        Teste tes connaissances
      </h1>

      <div className="mt-12 flex flex-col divide-y divide-gold-dim/30">
        {groupes.map(({ matiere, niveaux }, index) => (
          <Reveal
            key={matiere}
            className={index === 0 ? "pb-12" : "pt-12 pb-12"}
          >
            <h2 className="font-display text-2xl text-cream">
              {LABELS_MATIERE[matiere] ?? matiere}
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {niveaux.map(({ niveau, qcms }) => (
                <div key={niveau}>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold/15 text-gold">
                      <IconeNiveau niveau={niveau} />
                    </span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
                      {LABELS_NIVEAU[niveau] ?? niveau}
                    </h3>
                  </div>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {qcms.map((qcm, index) => (
                      <Reveal key={qcm.id} as="li" delay={index * 80}>
                        <Link
                          href={`/qcm/${qcm.id}`}
                          className="flex items-center justify-between gap-3 rounded-lg border-l-4 border-l-gold bg-navy-light px-6 py-4 transition hover:-translate-y-1 hover:bg-white/10 hover:ring-1 hover:ring-gold/50"
                        >
                          <span className="font-sans text-cream">
                            {qcm.titre}
                          </span>
                          <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-lime/80">
                            {qcm.questions.length} questions
                          </span>
                        </Link>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}