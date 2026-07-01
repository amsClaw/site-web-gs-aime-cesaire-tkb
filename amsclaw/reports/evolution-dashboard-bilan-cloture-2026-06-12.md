# Evolution dashboard bilan cloture - 2026-06-12

## Contexte

Ams a valide la gestion des projets clotures dans le dashboard.
Prochaine amelioration retenue : garder un bilan utile au moment de la cloture.

## Action realisee

Ajout d'un bilan de cloture projet dans le dashboard.

## Changements

- Ajout du champ `Date de cloture`.
- Ajout du champ `Resultat final / bilan`.
- Date du jour renseignee automatiquement si un projet passe en `Cloture` sans date.
- Affichage du resultat final sur la carte projet quand il est renseigne.
- Conservation de `closureDate` et `finalResult` dans `dashboard-data.json`.
- Conservation de ces champs dans l'endpoint de creation depuis modele.

## Fichiers modifies

- `amsclaw/dashboard/index.html`
- `amsclaw/dashboard/app.js`
- `amsclaw/dashboard/styles.css`
- `amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js`
- `amsclaw/projects/dashboard-multi-agent/docs/ROADMAP.md`
- `amsclaw/projects/dashboard-multi-agent/README.md`

## Verification

- `node --check amsclaw/dashboard/app.js` : OK.
- `node --check amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js` : OK.
- Dashboard local : HTTP 200 sur `http://127.0.0.1:8787/amsclaw/dashboard/`.
