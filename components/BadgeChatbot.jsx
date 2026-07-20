import Link from "next/link";

/**
 * Badge en forme d'étoile éclatée ("burst") annonçant le chatbot,
 * accroché au coin d'un élément parent positionné en `relative`.
 */
export default function BadgeChatbot({ className = "", onClick }) {
  return (
    <Link
      href="/espace-eleve#chatbot"
      onClick={onClick}
      className={`absolute z-10 flex h-12 w-18 rotate-12 items-center justify-center transition-transform hover:scale-105 ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow-md"
        aria-hidden="true"
      >
        <polygon
          points="50.00,2.00 58.54,18.12 74.00,8.43 73.33,26.67 91.57,26.00 81.88,41.46 98.00,50.00 81.88,58.54 91.57,74.00 73.33,73.33 74.00,91.57 58.54,81.88 50.00,98.00 41.46,81.88 26.00,91.57 26.67,73.33 8.43,74.00 18.12,58.54 2.00,50.00 18.12,41.46 8.43,26.00 26.67,26.67 26.00,8.43 41.46,18.12"
          className="fill-lime"
        />
      </svg>
      <span className="relative font-mono text-[8px] font-bold uppercase tracking-wide text-black">
        Chatbot
      </span>
    </Link>
  );
}
