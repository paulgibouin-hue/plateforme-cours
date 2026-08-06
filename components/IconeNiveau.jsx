const CHEMINS = {
  brevet: (
    <>
      <path d="M10 3l8 4-8 4-8-4 8-4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5 9v4c0 1.5 2.5 3 5 3s5-1.5 5-3V9" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  seconde: (
    <path
      d="M3 4.5c2-1 5-1 7 0v11c-2-1-5-1-7 0v-11zM17 4.5c-2-1-5-1-7 0v11c2-1 5-1 7 0v-11z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  premiere: (
    <path
      d="M3 4.5c2-1 5-1 7 0v11c-2-1-5-1-7 0v-11zM17 4.5c-2-1-5-1-7 0v11c2-1 5-1 7 0v-11z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  terminale: (
    <path
      d="M5 2v16M5 3h9l-2 3 2 3H5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
};

/**
 * Petite icône représentant un niveau (brevet/seconde/première/terminale),
 * utilisée pour distinguer visuellement les groupes de chapitres/QCM.
 */
export default function IconeNiveau({ niveau, className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      {CHEMINS[niveau] ?? CHEMINS.premiere}
    </svg>
  );
}
