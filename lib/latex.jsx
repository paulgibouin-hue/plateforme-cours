import { InlineMath } from "react-katex";

/**
 * Découpe un texte contenant des segments LaTeX ($...$) et renvoie un
 * tableau de fragments texte / KaTeX à rendre dans du JSX.
 * Les retours à la ligne (\n) du texte source sont préservés visuellement
 * par le conteneur appelant via la classe Tailwind `whitespace-pre-line`.
 */
export function renderAvecLatex(texte) {
  if (!texte) return null;
  const segments = texte.split(/(\$[^$]+\$)/g);
  return segments.map((segment, index) => {
    if (segment.startsWith("$") && segment.endsWith("$")) {
      return <InlineMath key={index} math={segment.slice(1, -1)} />;
    }
    return <span key={index}>{segment}</span>;
  });
}
