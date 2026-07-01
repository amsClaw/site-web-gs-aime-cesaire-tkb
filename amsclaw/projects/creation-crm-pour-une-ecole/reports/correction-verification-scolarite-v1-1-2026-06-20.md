# Correction verification scolarite V1.1 - 2026-06-20

## Contexte

Ams signale pendant la recette V1.1 que le bouton `Marquer scolarite verifiee` ne ressemble pas assez a un bouton et demande ce qui doit changer apres clic.

## Analyse

- Le bouton etait affiche avec le style secondaire, trop discret pour une action metier.
- Le front appelait `POST /api/students/:id/verify-status`.
- La route serveur correspondante etait absente, donc la date de verification ne pouvait pas etre enregistree.

## Correction

- Bouton passe en action principale sur la fiche eleve.
- Bloc `Derniere verification scolarite` affiche en permanence :
  - `Non verifiee` avant clic ;
  - date et heure apres clic.
- Route serveur `POST /api/students/:id/verify-status` ajoutee.
- Champ `schoolStatusCheckedAt` persiste avec l'horodatage courant.
- Smoke test complete pour verifier la persistence de la date.

## Tests

- `node -c scripts/server.js` : OK.
- `npm test` : OK.

## Fichiers modifies

- `src/app.js`
- `scripts/server.js`
- `tests/smoke.mjs`
- `docs/commentaires_v1.md`
