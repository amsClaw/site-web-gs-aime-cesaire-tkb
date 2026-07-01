# Source de vérité des données

Objectif :
clarifier le rôle de `dashboard-data.json` et des fichiers Markdown pour éviter les doublons, pertes de données et contradictions.

## Décision de cadrage

Pour la V1 actuelle :

- `dashboard-data.json` est la source opérationnelle du dashboard.
- Les fichiers Markdown sont la mémoire durable de reprise, de décision et de documentation.
- Les synchronisations doivent être prudentes, traçables et sauvegardées.

## Rôle de chaque source

### `dashboard-data.json`

Source principale pour l'interface.

Contient :

- projets affichés dans le dashboard ;
- statuts opérationnels ;
- prochaines actions visibles ;
- scores projet ;
- tâches agents ;
- idées business ;
- routines ;
- backlog ;
- décisions affichées dans l'IHM ;
- journal d'activité.

Règle :
le dashboard lit et écrit d'abord dans ce fichier.

### `memory/active-projects.md`

Mémoire durable de reprise des projets.

Contient :

- objectif ;
- statut ;
- prochaine action durable ;
- documentation ;
- historique des décisions ;
- points de blocage ;
- notes utiles.

Règle :
ce fichier sert à redémarrer un projet dans une nouvelle session, même si le dashboard n'est pas ouvert.

### `memory/decisions.md`

Journal durable des décisions structurantes.

Contient :

- décisions importantes ;
- contexte ;
- raison ;
- risques ;
- prochaine action.

Règle :
toute décision importante doit y être journalisée, même si elle apparaît aussi dans la vue `Décisions` du dashboard.

### Fichiers projet Markdown

Mémoire détaillée par projet.

Contient :

- README projet ;
- roadmap ;
- prochaines étapes ;
- rapports ;
- specs ou cadrages.

Règle :
ces fichiers documentent le fond du projet. Le dashboard n'a pas vocation à remplacer cette documentation.

## Flux actuel

```text
memory/active-projects.md
        |
        | audit-data-sync.js obligatoire
        | puis sync-dashboard-data.js si audit propre
        v
dashboard-data.json
        |
        | dashboard-server.js
        v
Interface dashboard
```

Le dashboard écrit ensuite directement dans `dashboard-data.json`.

## Risques identifiés

1. Projet présent dans le JSON mais absent de `memory/active-projects.md`.
2. Prochaine action différente entre JSON et Markdown.
3. Décision ajoutée dans le dashboard mais non journalisée dans `memory/decisions.md`.
4. Champ opérationnel du dashboard écrasé par une synchronisation Markdown.
5. Multiplication de sources sans règle claire.

## Règles de sécurité

- Ne jamais supprimer automatiquement un projet JSON absent du Markdown.
- Ne jamais écraser les champs opérationnels sans sauvegarde préalable.
- Toujours créer une sauvegarde avant écriture de `dashboard-data.json`.
- Journaliser les décisions importantes dans `memory/decisions.md`.
- Préférer un rapport de divergence avant toute synchronisation destructive.

## Contrat de synchronisation recommandé

### Lecture Markdown vers JSON

Autorisé pour :

- nom du projet ;
- objectif ;
- statut ;
- prochaine action ;
- priorité ;
- responsable ;
- documentation ;
- blocages.

À préserver côté JSON :

- score projet ;
- tâches ;
- idées ;
- routines ;
- backlog ;
- journal d'activité ;
- décisions IHM ;
- dates de mise à jour ;
- champs de clôture ;
- historique opérationnel.

### JSON vers Markdown

À éviter en écriture automatique générale dans l'immédiat.

Préférer d'abord :

- générer un rapport de divergence ;
- proposer les mises à jour ;
- appliquer seulement après validation ou règle explicite.

Exception cadrée :
une action guidée peut écrire dans le JSON et dans les fichiers Markdown si elle correspond à un jalon projet explicite, confirmé par l'utilisateur, avec sauvegarde JSON et journalisation.

Premier cas autorisé :
validation de la PRD V1 du projet `Creation CRM pour une ecole` depuis la fiche projet.

## Audit non destructif

Script disponible :

```text
amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js
```

Ce script :

- lire `dashboard-data.json` ;
- lire `memory/active-projects.md` ;
- comparer les projets ;
- signaler les projets présents d'un seul côté ;
- signaler les prochaines actions divergentes ;
- signaler les décisions dashboard non journalisées dans `memory/decisions.md` ;
- produire un rapport Markdown dans `reports/`.

Dernier rapport :

```text
amsclaw/projects/dashboard-multi-agent/reports/audit-data-sync-2026-06-13.md
```

Résultat du 2026-06-13 :
aucune divergence détectée.

## Synchronisation Markdown -> JSON

Décision du 2026-06-13 :

- `sync-dashboard-data.js` exécute l'audit avant toute écriture ;
- si l'audit détecte une divergence, la synchronisation est annulée par défaut ;
- les divergences de champs déjà arbitrées peuvent être appliquées explicitement avec `--apply-reviewed-divergences` ;
- le rapport d'audit indique les écarts à arbitrer ;
- une sauvegarde pré-écriture est créée dans `data/backups/` lorsque la synchronisation est autorisée.

## Prochaine évolution recommandée

Observer le prochain cas réel de divergence JSON / Markdown avant d'ajouter une synchronisation inverse JSON -> Markdown.
