# Integration checklist au modele projet - 2026-06-13

## Objectif

Integrer la checklist de creation projet au flux dashboard afin que chaque nouveau projet cree depuis modele dispose de son controle local.

## Modifications realisees

- Ajout de la generation de `docs/PROJECT_CHECKLIST.md` dans `dashboard-server.js`.
- Ajout de `PROJECT_CHECKLIST.md` dans le champ `documentation` du projet cree.
- Ajout du fichier dans la confirmation de creation cote `app.js`.
- Mise a jour de `docs/PROJECT_CREATION_MODEL.md`.
- Mise a jour de `memory/active-projects.md` et `memory/decisions.md`.

## Test realise

Serveur temporaire :

```sh
PORT=8791 node amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js
```

Simulation non destructive :

```sh
curl -s -X POST http://127.0.0.1:8791/api/projects/create-from-template \
  -H 'Content-Type: application/json' \
  -d '{"dryRun":true,"name":"Projet Test Checklist Temporaire","objective":"Verifier la generation de la checklist projet.","nextAction":"Valider le dry run de creation projet.","priority":"Moyenne","owner":"amsClaw"}'
```

## Resultat

Le dry run renvoie bien les fichiers prevus :

- `README.md`
- `docs/PROJECT_BRIEF.md`
- `docs/NEXT_STEPS.md`
- `docs/PROJECT_CHECKLIST.md`

Aucun projet reel n'a ete cree pendant ce test.

## Verification serveur principal

Le LaunchAgent `com.amsclaw.dashboard` a ete relance pour charger le nouvel endpoint :

```sh
launchctl kickstart -k gui/$(id -u)/com.amsclaw.dashboard
```

Controle apres redemarrage :

- dashboard HTTP : `200` ;
- API dashboard-data HTTP : `200` ;
- dry run sur `http://127.0.0.1:8787/api/projects/create-from-template` OK ;
- audit JSON / Markdown final : zero divergence.

## Prochaine action

Utiliser la checklist lors de la prochaine creation reelle de projet depuis le dashboard.
