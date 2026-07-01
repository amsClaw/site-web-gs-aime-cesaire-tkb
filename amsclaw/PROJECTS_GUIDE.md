# Guide projets amsClaw

Objectif :
Garder chaque projet clair, documente et redemarrable, sans melanger les fichiers avec le reste du workspace.

## Regle principale

Tout nouveau projet doit etre cree dans :

```text
amsclaw/projects/<nom-du-projet>/
```

Exception possible :
un outil transversal peut rester dans `amsclaw/dashboard/`, `amsclaw/automation/` ou `amsclaw/resources/`, mais cette decision doit etre documentee.

## Depot de fichiers par Ams

Pour transmettre des fichiers a rattacher a un projet, utiliser le sas temporaire :

```text
amsclaw/inbox/
```

Si le projet est connu, utiliser de preference un sous-dossier avec l'ID du projet :

```text
amsclaw/inbox/<nom-du-projet>/
```

Exemple :

```text
amsclaw/inbox/site-web-gs-aime-cesaire-tkb/
```

Regle : apres copie verifiee dans le bon dossier projet, le fichier original situe dans `amsclaw/inbox/` peut etre supprime. Cette autorisation ne concerne que le sas `amsclaw/inbox/` ; toute suppression ailleurs reste soumise a confirmation explicite d'Ams.

## Structure recommandee

```text
amsclaw/projects/<nom-du-projet>/
├── README.md
├── docs/
├── src/
├── data/
├── scripts/
├── tests/
├── reports/
└── archive/
```

## Role des dossiers

- `README.md` : fiche de pilotage du projet.
- `docs/` : specs, notes fonctionnelles, architecture, comptes rendus.
- `src/` : code source de l'application ou du prototype.
- `data/` : exemples de donnees, fichiers de test, exports non sensibles.
- `scripts/` : scripts utiles au lancement, tests, generation ou maintenance.
- `tests/` : tests techniques ou scenarios de recette.
- `reports/` : rapports d'avancement, bilans, syntheses.
- `archive/` : anciennes versions, elements retires, documents obsoletes.

## Documentation minimale

Chaque projet doit avoir dans son `README.md` :

- objectif ;
- statut ;
- prochaine action ;
- perimetre V1 ;
- mode de lancement ou d'utilisation ;
- decisions importantes ;
- risques ou points de vigilance ;
- liens vers les fichiers utiles.

## Regles de suivi

- L'index de reprise global est `amsclaw/PROJECTS_INDEX.md`.
- Tout projet actif, en pause, termine ou cloture doit etre reference dans `memory/active-projects.md`.
- Une decision structurante doit etre ajoutee dans `memory/decisions.md`.
- Une lecon reutilisable doit etre ajoutee dans `memory/lessons-learned.md`.
- Un script utile doit etre explique dans le README ou dans un guide dedie.
- Un projet termine ou cloture doit etre documente puis archive si necessaire, mais son resume doit rester dans la memoire durable.

Mettre a jour `amsclaw/PROJECTS_INDEX.md` quand un projet est cree, change de statut, change de prochaine action ou atteint une version importante.

## Cloture d'un projet

Avant de cloturer un projet, renseigner au minimum :

- statut final ;
- resultat obtenu ;
- date de cloture si connue ;
- liens vers la documentation utile ;
- decisions importantes ;
- lecons reutilisables ;
- raison de l'arret si le projet est abandonne.

## Principe

La structure doit servir l'execution.

Si un dossier n'est pas utile maintenant, il peut etre ajoute plus tard. Le minimum non negociable est : un dossier projet, un README, une prochaine action claire.
