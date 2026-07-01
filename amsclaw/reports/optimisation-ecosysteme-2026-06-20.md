# Optimisation ecosysteme OpenClaw - 2026-06-20

Heure de controle : 11:00 Europe/Paris

Objectif :
proposer des optimisations simples pour garder l'ecosysteme OpenClaw lisible, redemarrable et utile a Ams.

## Constat

Le workspace reste sain :

- `amsclaw/reports` pese environ 3,8 Mo ;
- 96 rapports Markdown sont presents dans `amsclaw/reports` ;
- 62 rapports racine sont des rapports `heartbeat-*.md` ;
- aucun projet actif ou en attente ne manque de `README.md`, `docs/PROJECT_BRIEF.md` ou `docs/NEXT_STEPS.md` ;
- aucun projet cloture n'est reference a archiver ;
- l'audit dashboard du 2026-06-20 est propre.

Le probleme n'est donc pas le stockage.

Le risque principal est la lisibilite : trop de petits rapports rendent la reprise moins directe, surtout quand ils confirment le meme etat.

## Optimisations recommandees

### 1. Consolider les heartbeats repetitifs

Recommandation :
continuer a utiliser `heartbeat_respond` avec `notify=false` pour les controles sans changement, et ne creer un fichier que si le heartbeat apporte une vraie valeur :

- rapport du matin ;
- veille IA ;
- priorites hebdomadaires ;
- controle mensuel ;
- livraison projet ;
- audit ou blocage nouveau.

Impact :
moins de bruit documentaire, reprise plus rapide.

Statut :
a appliquer immediatement.

### 2. Creer un index des rapports utiles

Recommandation :
ajouter plus tard un fichier `amsclaw/reports/INDEX.md` qui pointe seulement vers les rapports de reference :

- derniers rapports du matin ;
- dernier rapport hebdomadaire ;
- dernier controle mensuel ;
- dernier audit dashboard ;
- rapports de livraison projet ;
- decisions importantes deja referencees dans `memory/decisions.md`.

Impact :
Ams peut retrouver les documents utiles sans parcourir toute la pile de rapports.

Statut :
utile, mais non urgent.

### 3. Distinguer projet actif et squelette de projet

Recommandation :
pour les projets crees depuis modele mais pas encore developpes, ne pas remplir artificiellement `src/`, `scripts/`, `tests/` ou `reports` avec du contenu tant que ce n'est pas necessaire.

Constat :
certains projets courts disposent deja d'une structure complete mais quasi vide. Ce n'est pas bloquant, mais cela peut donner l'impression qu'un developpement existe alors que le projet est encore en cadrage.

Impact :
meilleure lecture de l'etat reel du projet.

Statut :
a appliquer aux prochains projets.

### 4. Ne pas archiver automatiquement

Recommandation :
ne deplacer aucun rapport et aucun projet sans validation explicite d'Ams.

Raison :
le volume disque est faible, et l'archivage peut casser les habitudes de reprise ou les liens existants.

Statut :
decision prudente maintenue.

### 5. Nettoyer les fichiers systeme seulement avec accord

Constat :
des fichiers `.DS_Store` sont visibles dans plusieurs dossiers.

Recommandation :
ne pas les supprimer automatiquement pendant un heartbeat. Si Ams veut un nettoyage workspace, faire une passe dediee avec journalisation.

Impact :
evite les changements invisibles non demandes.

Statut :
pas d'action immediate.

## Proposition de prochaine action

La prochaine optimisation utile, quand Ams le demande, serait :

```text
creer amsclaw/reports/INDEX.md pour rendre les rapports vraiment exploitables.
```

Ce serait plus utile qu'un archivage automatique.

## Decision du heartbeat

Aucune notification utilisateur necessaire.

Raison :
aucun risque urgent, aucune action bloquante, aucune suppression ou reorganisation a faire sans accord explicite.
