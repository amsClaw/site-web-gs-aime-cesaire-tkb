# Correction bouton Enregistrer classes - 2026-06-20

## Contexte

Ams signale que, sur la page Classes, les boutons `Enregistrer` des fiches classes ne sont pas en fond bleu comme les actions principales des autres pages.

## Modification realisee

- Fichier modifie : `src/app.js`
- Correction : remplacement de la classe CSS `secondary-button` par `primary-button` sur le bouton `Enregistrer` des fiches classes.

## Verification

- Commande executee : `npm test`
- Resultat : `Smoke tests OK` et `E2E creation workflows OK`

