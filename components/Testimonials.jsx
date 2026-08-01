import Reveal from "@/components/Reveal";
import temoignagesData from "@/data/temoignages.json";

function Etoiles({ note }) {
  return (
    <span className="flex shrink-0 gap-0.5" title={`${note}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          fill={n <= note ? "var(--color-lime)" : "none"}
          stroke={n <= note ? "var(--color-lime)" : "currentColor"}
          className={`h-3.5 w-3.5 ${n <= note ? "" : "text-cream/20"}`}
        >
          <path
            strokeWidth="1.2"
            strokeLinejoin="round"
            d="M10 1.5l2.47 5.27 5.78.65-4.3 3.94 1.16 5.72L10 14.9l-5.11 2.18 1.16-5.72-4.3-3.94 5.78-.65L10 1.5z"
          />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const temoignages = temoignagesData.temoignages ?? [];

  if (temoignages.length === 0) {
    return null;
  }

  return (
    <Reveal as="section" className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-lime">
        Témoignages
      </p>
      <h2 className="mt-2 font-display text-2xl text-cream">
        Ce qu&apos;en disent mes élèves
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {temoignages.map((temoignage, index) => (
          <Reveal
            key={temoignage.id ?? index}
            delay={index * 100}
            className="flex h-full flex-col rounded-lg border border-gold-dim bg-navy-light p-6"
          >
            {temoignage.note ? (
              <Etoiles note={temoignage.note} />
            ) : null}
            <p className="mt-3 flex-1 font-sans text-sm text-cream/80">
              « {temoignage.citation} »
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-cream/50">
              {temoignage.nom}
            </p>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
