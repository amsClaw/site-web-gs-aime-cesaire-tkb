# Integration logo ecole - 2026-06-20

## Objectif

Integrer le logo de l'ecole Aime Cesaire TKB dans le CRM afin de rendre la version de test plus presentable pour les utilisateurs externes.

## Modifications realisees

- Ajout du logo source dans `src/assets/logo-ecole-aime-cesaire.jpg`.
- Ajout d'une favicon derivee dans `src/assets/favicon-ecole.png`.
- Integration du logo sur l'ecran de connexion.
- Integration d'un logo compact dans la barre laterale du CRM.
- Mise a jour du cache-busting des fichiers `styles.css` et `app.js` dans `src/index.html`.
- Ajout des styles responsive dans `src/styles.css`.
- Mise a jour des captures du guide utilisateur :
  - `docs/guide-utilisateur-assets/01-connexion.png`
  - `docs/guide-utilisateur-assets/02-tableau-de-bord.png`

## Decisions

- Le logo est affiche en grand uniquement sur la connexion.
- Dans l'application connectee, le logo reste compact pour ne pas prendre trop de place dans l'outil de gestion.
- La palette globale du CRM n'a pas ete refondue afin de limiter le risque visuel avant les tests terrain.

## Verification

- `npm test` OK.
- Controle Playwright desktop OK.
- Controle Playwright mobile OK.
- Verification du chargement effectif du logo dans le navigateur OK.

## Point de vigilance

Le logo original a un fond noir et un format horizontal. Il fonctionne bien pour la connexion et la barre laterale, mais il faudra une variante plus carree si l'on veut un favicon ou une icone mobile parfaitement lisible.
