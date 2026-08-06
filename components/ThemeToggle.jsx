"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const actuel =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    setTheme(actuel);
  }, []);

  function basculer() {
    const suivant = theme === "light" ? "dark" : "light";
    setTheme(suivant);
    document.documentElement.setAttribute("data-theme", suivant);
    try {
      localStorage.setItem("theme", suivant);
    } catch {
      // stockage indisponible (navigation privée) : le choix ne persiste
      // simplement pas, sans bloquer le basculement de la page en cours.
    }
  }

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={
        theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"
      }
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold-dim text-cream transition-colors hover:border-gold hover:text-gold ${className}`}
    >
      {theme === "light" ? (
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <path
            d="M16.5 11.8A6.7 6.7 0 018 3.3a6.7 6.7 0 108.5 8.5z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M10 2.2v2M10 15.8v2M17.8 10h-2M4.2 10h-2M15.4 4.6l-1.4 1.4M6 14l-1.4 1.4M15.4 15.4L14 14M6 6L4.6 4.6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
