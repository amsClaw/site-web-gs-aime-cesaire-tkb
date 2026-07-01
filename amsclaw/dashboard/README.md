# Dashboard multi-agents V1.6

Objectif :
Fournir une premiere version testable du cockpit amsClaw pour suivre les projets, idees business, routines et blocages.

La V1.6 lit et met a jour une source de donnees JSON simple :

```text
amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json
```

## Lancement

Depuis le workspace :

```sh
./amsclaw/dashboard/launch-dashboard.sh
```

Ou manuellement :

```sh
node amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js
```

Puis ouvrir :

```text
http://localhost:8787/amsclaw/dashboard/
```

## Fonctionnalites V1

- Vue d'ensemble avec indicateurs.
- Liste des actions prioritaires.
- Repartition des sous-agents.
- Suivi des projets avec filtres.
- Ajout de projets avec sauvegarde dans `dashboard-data.json`.
- Modification et suppression des projets.
- Scoring local des idees business.
- Ajout d'idees avec sauvegarde dans `dashboard-data.json`.
- Modification et suppression des idees.
- Suivi quotidien des actions projet : `A faire`, `En cours`, `Fait`.
- Creation, modification, suppression et suivi des taches agents.
- Routines quotidiennes, hebdomadaires et mensuelles cochables.
- Generation d'un rapport copiable.

## Donnees

Les donnees viennent de `dashboard-data.json`.

Les ajouts faits dans l'interface sont sauvegardes dans ce meme fichier via le serveur local.

Le bouton de reinitialisation recharge la source JSON depuis le disque.

## Limite volontaire

Il n'y a pas encore d'ecriture automatique dans les fichiers Markdown du workspace.

Ce choix permet de tester rapidement l'experience sans base de donnees ni architecture lourde. La prochaine evolution logique sera de synchroniser proprement le JSON avec les fichiers `memory/*.md`.
