# Evolution dashboard pilotage portefeuille - 2026-06-12

## Contexte

Ams a valide une liste d'ameliorations pour ne plus avancer a l'aveugle dans le dashboard.

Regle de travail validee :

- documenter ce qui est fait et ce qui est prevu ;
- tenir le backlog a jour ;
- implementer chaque point avec verification ;
- maintenir le guide utilisateur du dashboard.

## Fonctionnalites ajoutees

- Compteurs de statut dans la vue `Projets`.
- Recherche texte dans les projets.
- Filtre `Sans action`.
- Filtre `Archives`.
- Alerte visuelle sur les projets bloques.
- Bloc `Prochaine action` renforce dans les cartes projet.
- Champ `Historique / decision importante`.
- Champ `Derniere mise a jour` gere automatiquement.
- Bouton `Cloturer` avec pre-remplissage du statut et de la date.
- Vue `Suivi` enrichie avec blocages, projets sans action et actions utiles.
- Badges lateraux sur `Projets`, `Suivi` et `Taches`.
- Export Markdown et JSON des projets.

## Fichiers modifies

- `amsclaw/dashboard/index.html`
- `amsclaw/dashboard/app.js`
- `amsclaw/dashboard/styles.css`
- `amsclaw/dashboard/GUIDE_UTILISATION.md`
- `amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js`
- `amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js`
- `amsclaw/projects/dashboard-multi-agent/docs/ROADMAP.md`
- `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md`
- `amsclaw/projects/dashboard-multi-agent/README.md`
- `memory/decisions.md`

## Tests effectues

- `node --check amsclaw/dashboard/app.js` : OK.
- `node --check amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js` : OK.
- `node --check amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js` : OK.
- Validation JSON de `dashboard-data.json` : OK.
- Dashboard local `http://127.0.0.1:8787/amsclaw/dashboard/` : HTTP 200.
- API locale `/api/dashboard-data` : HTTP 200, projets charges.
- Verification HTML/JS/CSS des nouveaux identifiants : OK.

## Point de vigilance corrige

Le script `sync-dashboard-data.js` ne preservait pas encore les nouveaux champs projet. Il conserve maintenant `finalResult`, `closureDate`, `projectLog` et `lastUpdated` lors des synchronisations futures.

## Prochaine verification utilisateur

Tester dans l'IHM :

1. Vue `Projets` : compteurs, recherche, filtres `Sans action` et `Archives`.
2. Carte projet : bouton `Cloturer`, historique, derniere mise a jour.
3. Vue `Suivi` : signaux blocages, sans action et actions utiles.
4. Exports Markdown et JSON.
