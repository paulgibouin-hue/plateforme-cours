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
          className={`h-3 w-3 ${n <= note ? "" : "text-cream/20"}`}
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
      <div className="mt-10 grid gap-x-10 gap-y-10 sm:flex sm:flex-wrap sm:divide-x sm:divide-gold-dim">
        {temoignages.map((temoignage, index) => (
          <Reveal
            key={temoignage.id ?? index}
            delay={index * 100}
            className="flex-1 sm:min-w-[15rem] sm:px-8 sm:first:pl-0"
          >
            <svg
              viewBox="0 0 32 24"
              className="h-5 w-6 text-lime/60"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.2C9.6 4.8 7.2 8 7.2 12h6.4v12H0zm18.4 0V14.4c0-8 4.8-13.2 12.8-14.4l1.6 3.2c-4.8 1.6-7.2 4.8-7.2 8.8h6.4v12H18.4z" />
            </svg>
            <p className="mt-3 font-display text-lg italic leading-snug text-cream/90">
              {temoignage.citation}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <p className="font-mono text-xs uppercase tracking-widest text-cream/50">
                {temoignage.nom}
              </p>
              {temoignage.note ? <Etoiles note={temoignage.note} /> : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
