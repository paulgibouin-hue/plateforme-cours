"use client";

import { useCallback, useSyncExternalStore } from "react";

const CLE_STOCKAGE = "progression-eleve";
const EVENEMENT_MAJ = "progression-eleve-maj";
const SNAPSHOT_VIDE = {};

// Cache du dernier snapshot lu, pour que getSnapshot() renvoie une
// référence stable tant que le contenu du localStorage n'a pas changé
// (obligatoire avec useSyncExternalStore, sinon boucle infinie).
let dernierBrut;
let dernierSnapshot = SNAPSHOT_VIDE;

function lireProgression() {
  let brut;
  try {
    brut = window.localStorage.getItem(CLE_STOCKAGE);
  } catch {
    return SNAPSHOT_VIDE;
  }

  if (brut === dernierBrut) {
    return dernierSnapshot;
  }

  dernierBrut = brut;
  try {
    dernierSnapshot = brut ? JSON.parse(brut) : SNAPSHOT_VIDE;
  } catch {
    dernierSnapshot = SNAPSHOT_VIDE;
  }
  return dernierSnapshot;
}

function ecrireProgression(progression) {
  window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(progression));
  window.dispatchEvent(new Event(EVENEMENT_MAJ));
}

// Synchronise la modification vers le serveur, pour que l'administrateur
// puisse suivre la progression des élèves. Best-effort : si la requête
// échoue (élève non connecté, hors ligne...), la progression reste quand
// même disponible localement via le localStorage.
function synchroniserServeur(cle, valeur) {
  fetch("/api/progression", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cle, valeur }),
  }).catch(() => {});
}

function subscribe(callback) {
  window.addEventListener(EVENEMENT_MAJ, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENEMENT_MAJ, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot() {
  return SNAPSHOT_VIDE;
}

/**
 * Hook de suivi de progression basé sur localStorage (pas de backend).
 * `progression` est un objet { [cle]: true } où `cle` identifie de façon
 * unique un exercice (`exercice:{id}`) ou une question de QCM
 * (`qcm:{qcmId}:{questionId}`).
 */
export function useProgression() {
  const progression = useSyncExternalStore(
    subscribe,
    lireProgression,
    getServerSnapshot
  );

  const toggle = useCallback((cle) => {
    const actuelle = lireProgression();
    const nouvelleValeur = !actuelle[cle];
    ecrireProgression({ ...actuelle, [cle]: nouvelleValeur });
    synchroniserServeur(cle, nouvelleValeur);
  }, []);

  const marquerFait = useCallback((cle) => {
    const actuelle = lireProgression();
    if (actuelle[cle]) return;
    ecrireProgression({ ...actuelle, [cle]: true });
    synchroniserServeur(cle, true);
  }, []);

  return { progression, toggle, marquerFait };
}
