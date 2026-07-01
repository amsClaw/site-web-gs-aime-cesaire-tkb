# Correction badge taches menu lateral - 2026-06-12

## Contexte

Ams ne voyait pas de badge dans le menu lateral `Taches`.

## Actions realisees

- Ajout d'un badge visible dans le bouton lateral `Taches`.
- Raccordement du badge au nombre de taches agents ouvertes.
- Affichage conserve a `0` quand aucune tache n'est ouverte, pour eviter une absence ambigue.
- Couleur d'attention appliquee quand le nombre de taches ouvertes est superieur a zero.

## Fichiers modifies

- `amsclaw/dashboard/index.html`
- `amsclaw/dashboard/styles.css`
- `amsclaw/dashboard/app.js`

## Verification

- `node --check amsclaw/dashboard/app.js` : OK.
- Dashboard local : HTTP 200 sur `http://127.0.0.1:8787/amsclaw/dashboard/`.
- HTML servi : contient `agent-task-nav-badge`.
