# Correction impression fiche eleve - pages vides - 2026-06-20

## Contexte

Ams teste la fiche eleve imprimable et constate un KO :

- la fiche s'affiche sur le quart de la premiere page ;
- le navigateur genere 9 pages vides supplementaires.

## Cause

Le CSS d'impression masquait l'application avec `visibility: hidden`.

Les elements invisibles restaient donc dans le flux de mise en page, notamment la longue liste des eleves. Le navigateur imprimait la hauteur de la page complete, ce qui creait des pages blanches.

## Correction

Remplacement de l'impression directe par une sortie isolee :

- creation temporaire de `#print-output` au moment du clic ;
- clonage uniquement de `.print-student-sheet` ;
- ajout de `body.is-printing-student` ;
- masquage complet de `#app` avec `display: none` pendant l'impression ;
- suppression de la sortie temporaire apres impression.

## Fichiers modifies

- `src/app.js`
- `src/styles.css`
- `tests/e2e.mjs`
- `docs/commentaires_v1.md`

## Verification

- `npm test` OK.
- PDF de controle genere avec Playwright.
- Controle structure PDF :
  - `/Type /Page` : 1
  - `/MediaBox` : 1

## Prochaine action

Ams reteste l'impression depuis le navigateur sur une fiche eleve reelle.
