"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fait apparaître son contenu en fondu + léger glissement dès qu'il entre
 * dans la zone visible de l'écran. Respecte prefers-reduced-motion (géré
 * globalement dans globals.css, qui neutralise la durée des transitions).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {number} [props.delay] - délai en ms avant le déclenchement (pour échelonner une liste)
 * @param {string} [props.as] - élément HTML englobant (par défaut "div")
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Composant = "div",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Composant
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Composant>
  );
}
