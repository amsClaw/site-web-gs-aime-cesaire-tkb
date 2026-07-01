# Prochaines etapes

## Prochaine action recommandee

Cadrer l'evolution `Validations projet visibles dans Taches`.

Objectif :

- eviter que les validations importantes restent cachees dans une seule prochaine action projet ;
- transformer les validations Ams en taches visibles quand c'est utile ;
- eviter les doublons avec les validations deja traitees.

Premiere action guidee ajoutee :

- `Valider la PRD` sur le projet `Creation CRM pour une ecole` ;
- mise a jour de la prochaine action vers le cahier de recette V1 ;
- ajout d'une decision, d'une activite et d'une mise a jour de la memoire durable.
- controle du 2026-06-14 soir : l'action guidee PRD n'est plus visible avec l'etat courant du CRM ecole, car elle depend d'une prochaine action contenant une validation PRD.

Amelioration ajoutee au backlog le 2026-06-14 :

- rendre les validations projet importantes visibles aussi dans l'onglet `Taches` ;
- cas concret traite : une tache liee au projet CRM ecole a ete creee pour la validation du cahier de recette V1 ;
- evolution durable a cadrer : creer ou proposer automatiquement une tache liee quand la prochaine action projet contient une validation Ams.

## Checklist integree au modele projet

Decision prise le 2026-06-13 :

- le flux de creation depuis modele genere aussi `docs/PROJECT_CHECKLIST.md` ;
- la confirmation avant creation affiche ce fichier ;
- le test a ete realise en `dryRun` sur un serveur temporaire, sans creation reelle.
- le test utilisateur reel est valide par Ams via la creation du projet `Creation CRM pour une ecole`.

Prochaine sortie attendue :

- un document d'expression de besoin court pour le projet CRM ecole ;
- un perimetre V1 limite avant redaction d'une PRD.

## Synchronisation securisee realisee

Decision prise le 2026-06-13 :

- `sync-dashboard-data.js` lance un audit non destructif avant toute ecriture ;
- la synchronisation est annulee par defaut si l'audit detecte un projet absent d'un cote, une prochaine action divergente, un statut divergent ou une decision dashboard non journalisee ;
- les divergences de champs deja arbitrees peuvent etre appliquees explicitement avec `--apply-reviewed-divergences` ;
- un rapport d'audit Markdown est produit dans `reports/` ;
- une sauvegarde de `dashboard-data.json` est creee dans `data/backups/` avant ecriture.

Rituel documente :

```text
amsclaw/projects/dashboard-multi-agent/docs/RITUEL_HEBDOMADAIRE.md
```

Source de verite documentee :

```text
amsclaw/projects/dashboard-multi-agent/docs/SOURCE_DE_VERITE_DONNEES.md
```

Audit non destructif disponible :

```sh
node amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js
```

Dernier rapport :

```text
amsclaw/projects/dashboard-multi-agent/reports/audit-data-sync-2026-06-13.md
```

## V1.15 realisee

1. Vue `Aujourd'hui` : realise.
2. Vue `Backlog` : realise.
3. Vue `Decisions` : realise.
4. Score de priorite projet : realise.
5. Journal d'activite dashboard : realise.
6. Detection des projets dormants : realise.
7. Mode `Revue hebdo` : realise.
8. Taches liees avec echeance : realise.
9. Fiche projet detaillee : realise.
10. Export rapport hebdo par copie Markdown : realise.
11. Sauvegarde versionnee de `dashboard-data.json` : realise.
12. Recherche globale : realise.

Tests V1.15 :

- checks JavaScript dashboard et serveur OK ;
- JSON OK ;
- dashboard HTTP `200` ;
- API dashboard-data HTTP `200` ;
- POST API OK avec conservation des nouvelles collections ;
- sauvegarde versionnee creee dans `data/backups/`.
- tests utilisateur OK cote Ams le 2026-06-12.

Rapport de validation :

```text
amsclaw/projects/dashboard-multi-agent/reports/2026-06-12-validation-utilisateur-v1-15.md
```

## V1.14 realisee

1. Compteurs de statut dans la vue `Projets` : realise.
2. Alerte visuelle pour projets bloques : realise.
3. Prochaine action plus visible : realise.
4. Vue `Suivi` plus operationnelle : realise.
5. Derniere mise a jour automatique : realise.
6. Filtre `Sans prochaine action` : realise.
7. Historique / decision importante par projet : realise.
8. Cloture guidee : realise.
9. Vue ou filtre `Archives / Memoire projets` : realise.
10. Badges lateraux pour signaux utiles : realise.
11. Recherche texte projet : realise.
12. Export Markdown ou JSON : realise.

Regle validee par Ams :
ne pas avancer a l'aveugle. Chaque point implemente doit etre teste et documente avant de continuer.

## Validation V1.11

Specification de cadrage :

```text
amsclaw/projects/dashboard-multi-agent/docs/PROJECT_CREATION_MODEL.md
```

Projet de test recommande :

```text
Relance paiements scolaires WhatsApp
```

Recette :

```text
amsclaw/projects/dashboard-multi-agent/tests/recette-creation-projet-modele.md
```

Resultat du test du 2026-06-12 :

- creation reelle validee via l'API locale du dashboard ;
- fichiers minimaux crees : `README.md`, `docs/PROJECT_BRIEF.md`, `docs/NEXT_STEPS.md` ;
- projet ajoute dans `dashboard-data.json` ;
- dashboard disponible en HTTP 200 apres creation ;
- double creation refusee en 409, donc aucun ecrasement detecte.

## Proposition

Source persistante :

```text
amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json
```

Ce fichier contient :

- projets ;
- idees business ;
- taches agents ;
- routines ;
- blocages ;
- decisions recentes.

## Pourquoi

Un fichier JSON est plus simple a lire par le dashboard qu'un ensemble de fichiers Markdown.

Il permet de tester une vraie source de donnees sans installer de base de donnees, sans backend et sans complexite inutile.

## Etat apres validation utilisateur

Flux deja en place :

- lecture des projets depuis `memory/active-projects.md` ;
- generation de `dashboard-data.json` par `scripts/sync-dashboard-data.js` ;
- sauvegarde des projets et idees crees dans l'IHM via `scripts/dashboard-server.js` ;
- resynchronisation de l'IHM avec la reponse sauvegardee par l'API apres validation de formulaire ;
- modification et suppression des projets depuis l'IHM ;
- modification et suppression des idees depuis l'IHM ;
- suivi d'avancement des actions projet dans `dashboard-data.json` ;
- creation, modification, suppression et suivi des taches agents dans `dashboard-data.json` ;
- execution manuelle des taches Markdown simples via l'API locale ;
- validation utilisateur du premier flux d'execution Markdown le 2026-06-11 ;
- correction du parseur pour extraire le contenu apres `note dedans :` au lieu d'ecrire toute la consigne ;
- notification visible apres ajout, modification, suppression ou erreur ;
- conservation des idees business et routines dans le JSON tant que leur source de verite n'est pas stabilisee.

## Commande utile

Depuis le workspace :

```sh
./amsclaw/projects/dashboard-multi-agent/scripts/launch-v1.sh
```

## Prochaine decision

Apres la V1.15, la prochaine decision conseillee sera de choisir entre :

- stabiliser le rituel de pilotage hebdomadaire ;
- connecter plus proprement `dashboard-data.json` avec la memoire Markdown ;
- cadrer la V1 du projet `Relance paiements scolaires WhatsApp` ;
- preparer d'autres actions agents autorisees.

Decision prise :
avant toute synchronisation automatique, produire d'abord un rapport d'audit non destructif, bloquer l'ecriture si l'audit n'est pas propre, puis autoriser seulement les ecarts de champs explicitement arbitres avec `--apply-reviewed-divergences`.

Etat :
l'audit non destructif existe, le rapport du 2026-06-13 ne signale aucune divergence, et la synchronisation Markdown -> JSON est gardee par cet audit.
