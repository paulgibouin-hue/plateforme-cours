# Plateforme — Cours particuliers

Projet Next.js (App Router) + Tailwind CSS v4, initialisé avec la charte
graphique (Navy `#0E1B35` / Or `#C6A15B`, polices Fraunces / Inter / Space
Mono) et les dépendances `react-katex` + `katex` pour le rendu des exercices.

## Démarrage

1. Décompresser l'archive puis ouvrir le dossier dans VSCode.
2. Ouvrir un terminal (`Terminal` > `Nouveau terminal` dans VSCode) et lancer :

   ```bash
   npm install
   npm run dev
   ```

3. Ouvrir http://localhost:3000 dans le navigateur.

> Note : dans l'environnement où ce projet a été généré, l'accès à
> `fonts.googleapis.com` est bloqué par le sandbox — le build échoue donc ici
> avec une erreur de récupération des polices Google. Ce n'est pas un problème
> de code : sur ton ordinateur, avec un accès internet normal, `next/font/google`
> téléchargera Fraunces / Inter / Space Mono sans souci dès le premier
> `npm run dev`.

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
