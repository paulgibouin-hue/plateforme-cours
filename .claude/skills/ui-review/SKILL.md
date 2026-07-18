---
name: ui-review
description: Checklist de qualité UI/UX pour ce site (Next.js App Router + Tailwind CSS v4). Utiliser lors de la création ou revue de pages, composants, formulaires, ou changements de style — accessibilité, contraste, espacement, typographie, responsive, retours utilisateur.
---

# Revue UI/UX — plateforme de cours

Checklist adaptée à ce projet : site web (pas d'app mobile), Next.js App Router,
Tailwind CSS v4, charte graphique Navy `#0E1B35` / Or `#C6A15B`, polices
Fraunces (titres) / Inter (corps) / Space Mono (labels, code).

Pas de dépendance externe (pas de script, pas d'API) — ce skill est une
référence de règles à appliquer directement en écrivant ou relisant du JSX/CSS.

## Quand l'utiliser

- Création d'une nouvelle page ou section
- Ajout/modification d'un composant (formulaire, carte, bouton, modale)
- Revue d'un changement de style ou de layout
- Doute sur l'accessibilité (contraste, clavier, lecteurs d'écran)

## Checklist prioritaire

### 1. Accessibilité (critique)
- Contraste texte/fond ≥ 4.5:1 pour le texte normal, ≥ 3:1 pour le grand texte
- Chaque `<input>` a un `<label>` visible (pas seulement un `placeholder`)
- États `focus` visibles (ne jamais faire `outline: none` sans remplacement)
- Boutons icône-seule : `aria-label` explicite
- Hiérarchie de titres séquentielle (`h1` → `h2` → `h3`, pas de saut de niveau)
- L'information ne doit jamais reposer sur la couleur seule (ajouter texte/icône)

### 2. Interaction & retours (critique)
- Boutons désactivés pendant un envoi (`disabled` + libellé "Envoi...")
- Erreurs de formulaire affichées près du champ concerné, message clair (cause + solution)
- Confirmation avant une action destructrice (suppression d'un code élève, etc.)
- Zone cliquable suffisante (éviter les liens/boutons trop petits ou collés)

### 3. Layout & responsive (haute priorité)
- Mobile-first : tester à 375px de large avant de valider
- Pas de scroll horizontal involontaire
- Largeur de contenu cohérente (`max-w-3xl` / `max-w-5xl` déjà utilisés sur le site — rester cohérent)
- Grilles qui repassent en une colonne sous `sm:`

### 4. Typographie & couleur (priorité moyenne)
- Respecter les tokens Tailwind déjà définis (`text-cream`, `text-gold`, `bg-navy`, `border-gold-dim`) plutôt que des couleurs arbitraires
- Taille de texte corps ≥ 16px (`text-sm`/`text-base` selon contexte, jamais en dessous de lisible)
- Une seule police par rôle : `font-display` (titres), `font-sans` (corps), `font-mono` (labels/code)

### 5. Animation (priorité moyenne)
- Transitions courtes (150–300ms), déjà en place via `transition-colors`/`transition-opacity`
- Pas d'animation purement décorative qui distrait de l'action principale

### 6. Cohérence avec l'existant
Avant d'introduire un nouveau style, vérifier s'il existe déjà un pattern
équivalent dans le site (carte `border-gold-dim bg-navy-light`, bouton
`bg-gold text-navy`, etc.) et le réutiliser plutôt que d'en inventer un
nouveau — le site n'a qu'une poignée de composants visuels, la cohérence
prime sur la variété.

## Anti-patterns à éviter

- Emoji utilisé comme icône structurelle (préférer un SVG si le site venait à en avoir besoin — pour l'instant les emojis `🔒`/`🤖` sont un choix assumé et cohérent, pas une icône de navigation)
- Couleurs en dur (`#xxxxxx`) dans les composants au lieu des classes Tailwind/tokens existants
- Contenu asynchrone sans retour visuel (toujours un état de chargement au-delà de quelques centaines de ms)
- Casser la hiérarchie de titres pour des raisons purement visuelles
