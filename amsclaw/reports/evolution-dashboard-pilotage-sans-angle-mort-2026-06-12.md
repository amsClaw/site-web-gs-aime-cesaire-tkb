# Evolution dashboard - Pilotage sans angle mort

Date : 2026-06-12

## Objectif

Donner a Ams une vision claire de ce qui est fait, prevu, bloque et decide avant de continuer les evolutions du dashboard.

## Nouveautes livrees

- Vue `Aujourd'hui`.
- Vue `Backlog`.
- Vue `Decisions`.
- Score de priorite projet sur 20.
- Journal d'activite visible.
- Detection des projets dormants.
- Vue `Revue hebdo` copiable en Markdown.
- Echeance sur les taches agents.
- Fiche projet detaillee.
- Sauvegarde versionnee de `dashboard-data.json`.
- Recherche globale.
- Backlog V1.15 initialise dans les donnees.

## Fichiers modifies

- `amsclaw/dashboard/index.html`
- `amsclaw/dashboard/app.js`
- `amsclaw/dashboard/styles.css`
- `amsclaw/dashboard/GUIDE_UTILISATION.md`
- `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`
- `amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js`
- `amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js`
- `amsclaw/projects/dashboard-multi-agent/docs/ROADMAP.md`
- `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md`
- `amsclaw/projects/dashboard-multi-agent/README.md`
- `memory/decisions.md`

## Tests realises

- `node --check amsclaw/dashboard/app.js`
- `node --check amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js`
- `node --check amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js`
- validation JSON de `dashboard-data.json`
- HTTP `200` sur le dashboard
- HTTP `200` sur `/api/dashboard-data`
- POST API avec conservation de `backlogItems`, `decisions`, `activityLog`
- creation d'une sauvegarde versionnee dans `data/backups/`

## Point de vigilance

Le test navigateur Chrome headless n'a pas ete exploitable dans cet environnement. Les controles serveur, JS, JSON et API sont passes.

## Prochaine action

Tester manuellement dans l'IHM les vues `Aujourd'hui`, `Backlog`, `Decisions`, `Revue hebdo`, `Recherche` et le bouton `Details` d'une carte projet.
