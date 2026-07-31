import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

const FORMULES = [
  {
    label: "En ligne (visioconférence)",
    tarif: "20€ / heure",
    points: [
      "Cours en visio, matériel interactif partagé à l'écran",
      "Accès inclus à la plateforme d'exercices et QCM",
      "Flexibilité sur les horaires",
    ],
  },
  {
    label: "Présentiel",
    tarif: "22€ / heure",
    points: [
      "Cours au domicile de l'élève (Évry-Courcouronnes et communes proches : Corbeil-Essonnes, Ris-Orangis, Bondoufle, Lisses...)",
      "Support papier et numérique combinés",
      "Accès inclus à la plateforme d'exercices et QCM",
    ],
  },
];

const INFOS = [
  "Durée : 1h, 1h30 ou 2h au choix",
  "Fréquence : hebdomadaire recommandée, ajustable",
  "Premier cours : échange gratuit de 15 min pour définir les objectifs",
  "Modes de paiement : Espèces, virement bancaire, PayPal",
];

export const metadata = {
  title: "Tarifs",
  description:
    "Tarifs des cours particuliers avec Paul Gibouin : 20€/h en ligne, 22€/h en présentiel. Premier échange gratuit.",
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
        {FORMULES.map((formule, index) => (
          <Reveal key={formule.label} delay={index * 100}>
            <div className="rounded-lg border border-gold-dim bg-navy-light p-6 transition hover:-translate-y-1 hover:border-gold">
              <p className="font-mono text-xs uppercase tracking-widest text-lime">
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
          </Reveal>
        ))}
      </div>

      <Reveal as="div">
        <h2 className="mt-16 font-display text-2xl text-cream">
          Informations complémentaires
        </h2>
        <ul className="mt-6 flex flex-col gap-2 font-sans text-cream/80">
          {INFOS.map((info) => (
            <li key={info}>{info}</li>
          ))}
        </ul>
      </Reveal>

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
