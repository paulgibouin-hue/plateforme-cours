# Plateforme — Cours particuliers

## Structure

```
app/
  layout.js        # Layout racine : polices, Header, Footer
  page.js          # Accueil
  a-propos/page.js
  tarifs/page.js
  globals.css      # Thème Tailwind v4 (couleurs, polices) — @theme inline
components/
  Header.jsx
  Footer.jsx
  ExerciceCard.jsx # Rendu d'un exercice (KaTeX)
  QcmCard.jsx      # Question de QCM interactive
data/
  exercices.json   # Stub — à remplacer par le contenu réel (Notion)
  qcm.json         # Stub — à remplacer par le contenu réel (Notion)
```

## À faire ensuite

- [ ] Récupérer le contenu éditorial réel (Accueil / À propos / Tarifs) et le
      contenu JSON (`exercices.json`, `qcm.json`) depuis la page Notion et les
      injecter dans les fichiers correspondants.
- [ ] Compléter les placeholders `[TA_VILLE]`, `[TON_TÉLÉPHONE]`,
      `[TON_EMAIL]`, `[TON_NOM]` une fois la ville d'affectation connue
      (fin juillet / début août).
- [ ] Construire les pages listant les chapitres d'exercices et le QCM à
      partir de `ExerciceCard` / `QcmCard`.
- [ ] Réfléchir à la zone privée élève (codes d'accès) et au panel admin.
