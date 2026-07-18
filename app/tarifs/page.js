import ContactForm from "@/components/ContactForm";

const FORMULES = [
  {
    label: "En ligne (visioconférence)",
    tarif: "20 – 22 € / heure",
    points: [
      "Cours en visio, matériel interactif partagé à l'écran",
      "Accès inclus à la plateforme d'exercices et QCM",
      "Flexibilité totale sur les horaires",
    ],
  },
  {
    label: "Présentiel",
    tarif: "25 – 28 € / heure",
    points: [
      "Cours au domicile de l'élève (zone : [ZONE_GÉOGRAPHIQUE])",
      "Support papier et numérique combinés",
      "Accès inclus à la plateforme d'exercices et QCM",
    ],
  },
];

const INFOS = [
  "Durée : 1h ou 1h30 au choix",
  "Fréquence : hebdomadaire recommandée, ajustable",
  "Premier cours : échange gratuit de 15 min pour définir les objectifs",
  "Modes de paiement : [MODES_PAIEMENT]",
];

export const metadata = {
  title: "Tarifs",
  description:
    "Tarifs des cours particuliers avec Paul Gibouin : 20–22€/h en ligne, 25–28€/h en présentiel. Premier échange gratuit.",
};

export default function TarifsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl text-cream">
        Des tarifs simples et transparents
      </h1>
      <p className="mt-4 font-sans text-lg text-cream/70">
        Deux formules, adaptées à vos besoins. Aucun engagement de durée.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {FORMULES.map((formule) => (
          <div
            key={formule.label}
            className="rounded-lg border border-gold-dim bg-navy-light p-6"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {formule.label}
            </p>
            <p className="mt-3 font-display text-2xl text-cream">
              {formule.tarif}
            </p>
            <ul className="mt-5 flex flex-col gap-2 font-sans text-sm text-cream/70">
              {formule.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-16 font-display text-2xl text-cream">
        Informations complémentaires
      </h2>
      <ul className="mt-6 flex flex-col gap-2 font-sans text-cream/80">
        {INFOS.map((info) => (
          <li key={info}>{info}</li>
        ))}
      </ul>

      <h2 id="contact" className="mt-16 font-display text-2xl text-cream">
        Réserver un premier échange
      </h2>
      <p className="mt-2 font-sans text-cream/70">
        Remplis ce formulaire, je te réponds sous 48h pour organiser le
        premier cours.
      </p>
      <div className="mt-6">
        <ContactForm />
      </div>
    </section>
  );
}
