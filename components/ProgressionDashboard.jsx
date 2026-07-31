const LARGEUR_GRAPHIQUE = 220;
const HAUTEUR_GRAPHIQUE = 56;
const LABELS_SEMAINE = ["S-6", "S-5", "S-4", "S-3", "S-2", "Cette sem."];

function TendanceHebdomadaire({ points }) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const etendue = Math.max(max - min, 1);

  const coords = points.map((valeur, index) => {
    const x = (index / (points.length - 1)) * LARGEUR_GRAPHIQUE;
    const y = HAUTEUR_GRAPHIQUE - ((valeur - min) / etendue) * HAUTEUR_GRAPHIQUE;
    return { x, y };
  });

  const ligne = coords.map((p) => `${p.x},${p.y}`).join(" ");
  const zone = `0,${HAUTEUR_GRAPHIQUE} ${ligne} ${LARGEUR_GRAPHIQUE},${HAUTEUR_GRAPHIQUE}`;
  const delta = points[points.length - 1] - points[1];

  return (
    <div className="rounded-lg border border-gold-dim bg-navy-light p-4">
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs text-cream/70">
          Tendance sur 6 semaines
        </p>
        <span
          className={`font-mono text-xs ${
            delta >= 0 ? "text-lime" : "text-red-300"
          }`}
        >
          {delta >= 0 ? "+" : ""}
          {delta} vs S-5
        </span>
      </div>

      <svg
        viewBox={`0 0 ${LARGEUR_GRAPHIQUE} ${HAUTEUR_GRAPHIQUE}`}
        preserveAspectRatio="none"
        className="mt-3 h-14 w-full overflow-visible"
      >
        <polygon points={zone} fill="var(--color-lime)" fillOpacity="0.12" />
        <polyline
          points={ligne}
          fill="none"
          stroke="var(--color-lime)"
          strokeWidth="2"
        />
        {coords.map((p, index) => (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={index === coords.length - 1 ? 3 : 2}
            fill="var(--color-lime)"
          />
        ))}
      </svg>

      <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-wide text-cream/40">
        {LABELS_SEMAINE.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function AnneauProgression({ label, fait, total, pourcentage, accent }) {
  const rayon = 24;
  const circonference = 2 * Math.PI * rayon;
  const decalage = circonference - (circonference * pourcentage) / 100;
  const couleur = accent === "lime" ? "var(--color-lime)" : "var(--color-gold)";

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-gold-dim bg-navy-light p-3">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={rayon}
            fill="none"
            stroke="var(--color-gold-dim)"
            strokeWidth="6"
          />
          <circle
            cx="32"
            cy="32"
            r={rayon}
            fill="none"
            stroke={couleur}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circonference}
            strokeDashoffset={decalage}
            style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-cream">
          {pourcentage}%
        </span>
      </div>
      <div className="text-center">
        <p className="font-sans text-xs text-cream/80">{label}</p>
        <p className="font-mono text-[10px] text-cream/40">
          {fait}/{total}
        </p>
      </div>
    </div>
  );
}

/**
 * Tableau de bord de progression (colonne latérale de l'espace élève) :
 * tendance hebdomadaire + anneaux de progression par matière et pour les QCM.
 *
 * @param {Object} props
 * @param {number[]} props.tendance - 6 points (cumul d'items faits, du plus ancien au plus récent)
 * @param {Array} props.barresMatieres - [{ matiere, label, fait, total, pourcentage }]
 * @param {Object} props.barreQcm - { fait, total, pourcentage }
 */
export default function ProgressionDashboard({
  tendance,
  barresMatieres,
  barreQcm,
}) {
  return (
    <div className="flex flex-col gap-4">
      <TendanceHebdomadaire points={tendance} />
      <div className="grid grid-cols-2 gap-3">
        {barresMatieres.map((b) => (
          <AnneauProgression
            key={b.matiere}
            label={b.label}
            fait={b.fait}
            total={b.total}
            pourcentage={b.pourcentage}
            accent="gold"
          />
        ))}
        <AnneauProgression
          label="QCM (toutes matières)"
          fait={barreQcm.fait}
          total={barreQcm.total}
          pourcentage={barreQcm.pourcentage}
          accent="lime"
        />
      </div>
    </div>
  );
}
