# Correction nom ecole - 2026-06-20

## Contexte

Ams precise le nom officiel de l'ecole : `GS AIME CESAIRE TKB`.

## Decision

Remplacer l'ancien libelle `GS AIME CEASIRE` par `GS AIME CESAIRE TKB` dans les sources actives du CRM et du suivi projet.

## Modifications realisees

- Interface CRM : titre de page, ecran de connexion, barre laterale et textes alternatifs du logo.
- Serveur et scripts : metadata applicative, endpoint de sante, reset data.
- Donnees courantes : `data/app-data.json`.
- Point de reprise stable : `data/backups/crm-ecole-stable-utilisateurs-2026-06-20.json`.
- Documentation projet : README, PRD, cahier de recette, runbook, guide utilisateur, expression de besoin, brief projet, besoin initial.
- Captures du guide utilisateur regenerees :
  - `docs/guide-utilisateur-assets/01-connexion.png`
  - `docs/guide-utilisateur-assets/02-tableau-de-bord.png`
- Suivi durable : `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, `memory/decisions.md`, dashboard data.

## Non modifie volontairement

- Les anciennes sauvegardes historiques restent avec le nom qu'elles portaient au moment de leur creation.
- Le fichier logo conserve son visuel original ; seul le texte affiche par le CRM est corrige.

## Verification

- `npm test` OK.
- JSON courant et dashboard lisibles.
- Controle visuel Playwright OK sur connexion et tableau de bord.
- Aucune occurrence de `CEASIRE` dans les sources actives controlees.
