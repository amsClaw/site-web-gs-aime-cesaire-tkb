# Creation de projet depuis modele

## Objectif

Permettre a Ams de transformer une idee ou une opportunite en projet structure directement depuis le dashboard.

Le resultat attendu est simple :

- un dossier projet cree dans `amsclaw/projects/<slug>/` ;
- une documentation minimale pre-remplie ;
- une entree projet ajoutee dans `dashboard-data.json` ;
- une trace claire des fichiers crees.

## Perimetre V1.11

Inclus :

- creation d'un nouveau dossier projet ;
- generation de `README.md` ;
- generation de `docs/PROJECT_BRIEF.md` ;
- generation de `docs/NEXT_STEPS.md` ;
- generation de `docs/PROJECT_CHECKLIST.md` ;
- creation des dossiers standards utiles ;
- ajout du projet dans `dashboard-data.json`.

Exclu pour cette version :

- suppression ou ecrasement de projet existant ;
- creation automatique de code applicatif ;
- synchronisation complete avec tous les fichiers `memory/*.md` ;
- publication, email ou message a un tiers.

## Champs du formulaire

Champs obligatoires :

- nom du projet ;
- objectif ;
- prochaine action ;
- priorite ;
- owner.

Champs optionnels :

- statut initial, par defaut `actif` ;
- idee source ;
- marche cible ;
- probleme traite ;
- note courte.

## Regles de slug

Le slug du projet doit etre genere depuis le nom :

- minuscules ;
- accents retires ;
- espaces remplaces par des tirets ;
- caracteres non alphanumeriques retires ;
- longueur raisonnable.

Exemple :

```text
Relance paiements scolaires WhatsApp -> relance-paiements-scolaires-whatsapp
```

## Structure creee

```text
amsclaw/projects/<slug>/
├── README.md
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── NEXT_STEPS.md
│   └── PROJECT_CHECKLIST.md
├── data/
├── scripts/
├── tests/
├── reports/
└── archive/
```

## Contenu minimum

### README.md

Doit contenir :

- objectif ;
- statut ;
- prochaine action ;
- perimetre V1 ;
- organisation ;
- lancement ou utilisation ;
- decisions importantes ;
- risques et points de vigilance ;
- notes.

### docs/PROJECT_BRIEF.md

Doit contenir :

- contexte ;
- probleme ;
- cible ;
- proposition de valeur ;
- hypothese principale ;
- criteres de succes ;
- limites de la V1.

### docs/NEXT_STEPS.md

Doit contenir :

- prochaine action immediate ;
- actions suivantes ;
- points a confirmer avec Ams ;
- risques a surveiller.

### docs/PROJECT_CHECKLIST.md

Doit contenir :

- controles de cadrage ;
- fichiers minimum ;
- presence dashboard ;
- memoire durable ;
- controle final par audit JSON / Markdown.

## API locale proposee

Endpoint :

```text
POST /api/projects/create-from-template
```

Payload minimal :

```json
{
  "name": "Relance paiements scolaires WhatsApp",
  "objective": "Tester un outil simple de suivi des frais scolaires et relances parents.",
  "nextAction": "Rediger une phrase d'offre et une mini maquette.",
  "priority": "Haute",
  "owner": "amsClaw"
}
```

Payload de simulation non destructive :

```json
{
  "dryRun": true,
  "name": "Relance paiements scolaires WhatsApp",
  "objective": "Tester un outil simple de suivi des frais scolaires et relances parents.",
  "nextAction": "Rediger une phrase d'offre et une mini maquette.",
  "priority": "Haute",
  "owner": "amsClaw"
}
```

En mode `dryRun`, l'endpoint valide les champs, calcule le slug, les dossiers et les fichiers prevus, mais ne cree rien et ne modifie pas `dashboard-data.json`.

Reponse attendue :

```json
{
  "project": {},
  "createdFiles": [],
  "createdDirectories": []
}
```

## Confirmations

Avant creation, l'IHM doit afficher une confirmation avec :

- le slug final ;
- le chemin du dossier projet ;
- la liste des fichiers qui seront crees ;
- la checklist projet generee ;
- le rappel qu'aucun fichier existant ne sera ecrase.

## Regles de securite

- Refuser un slug vide.
- Refuser `..`, `/`, `\` et tout chemin absolu.
- Refuser si le dossier projet existe deja.
- Ne jamais ecraser un fichier existant.
- Limiter la creation au dossier `amsclaw/projects/`.
- Generer d'abord dans un dossier temporaire, puis renommer vers le dossier final quand les fichiers sont prets.
- Journaliser les fichiers crees.

## Mise a jour dashboard-data.json

Ajouter un projet avec :

```json
{
  "id": "<slug>",
  "name": "<nom>",
  "status": "actif",
  "objective": "<objectif>",
  "nextAction": "<prochaine action>",
  "actionStatus": "todo",
  "priority": "<priorite>",
  "owner": "<owner>",
  "documentation": "amsclaw/projects/<slug>/README.md, amsclaw/projects/<slug>/docs/PROJECT_BRIEF.md, amsclaw/projects/<slug>/docs/NEXT_STEPS.md, amsclaw/projects/<slug>/docs/PROJECT_CHECKLIST.md",
  "blockers": []
}
```

## Critere de fin

La V1.11 est terminee quand :

- un projet test peut etre cree depuis le dashboard ;
- les fichiers attendus existent ;
- la checklist projet est generee ;
- le projet apparait dans la vue `Projets` ;
- aucun fichier existant n'est ecrase ;
- le README du dashboard documente la decision.
