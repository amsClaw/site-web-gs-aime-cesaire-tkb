# Cadrage V1.1 - CRM ecole GS AIME CESAIRE TKB

## Contexte

La V1 est stable et validee par les utilisateurs. Ams indique le 2026-06-20 qu'il n'y a pas d'autre retour utilisateur a traiter immediatement.

Objectif de la V1.1 : avancer sans fragiliser la V1 stable.

## Regle de cadrage

La V1.1 doit rester courte.

Une evolution V1.1 est acceptable si elle respecte les criteres suivants :

- utile pour l'usage terrain ;
- visible ou mesurable rapidement ;
- testable sans scenario complexe ;
- faible risque sur les donnees existantes ;
- compatible avec le fonctionnement local et Cloudflare Tunnel.

## Hors scope V1.1

- Notes, bulletins et evaluations.
- Presences et retards.
- Module de paiement.
- Messagerie parents.
- Professeurs multiples par matiere.
- Application mobile native.
- Hebergement production permanent.

Ces sujets peuvent rester dans une V2 ou dans un projet separe apres observation terrain.

## Backlog recommande

### Priorite 1 - Fiche eleve imprimable

But : permettre d'imprimer ou sauvegarder en PDF une fiche eleve propre depuis le navigateur.

Valeur : forte pour une ecole qui travaille encore avec du papier.

Risque : faible, car ne modifie pas le modele de donnees.

Test attendu : ouvrir une fiche eleve, cliquer sur `Imprimer`, verifier que la fiche est lisible et ne contient pas les elements de navigation.

### Priorite 2 - Tableau de bord plus utile pour la direction

But : enrichir legerement le tableau de bord avec des indicateurs simples :

- repartition par cycle ;
- nombre de fiches a completer ;
- dernier import ;
- classes sans instructeur principal.

Valeur : moyenne a forte.

Risque : faible a moyen, selon les indicateurs retenus.

### Priorite 3 - Controle d'import Excel plus lisible

But : rendre l'analyse avant import plus claire pour l'utilisateur :

- compteur lignes importables ;
- compteur lignes bloquees ;
- raison de blocage plus visible ;
- rappel des colonnes attendues.

Valeur : forte si l'ecole importe souvent des fichiers Excel.

Risque : moyen, car l'import touche aux donnees.

### Priorite 4 - Archivage eleves plus guide

But : mieux encadrer les eleves sortants ou les changements d'annee.

Valeur : forte a moyen terme.

Risque : moyen, car cela touche au cycle de vie des eleves.

### Priorite 5 - Preparation hebergement de test durable

But : preparer une option de recette distante plus durable qu'un tunnel temporaire.

Valeur : forte si les tests distants deviennent frequents.

Risque : moyen a fort, car cela implique securite, sauvegarde et exposition reseau.

## Recommandation amsClaw

Commencer par la fiche eleve imprimable.

Raison : c'est utile, concret, peu risqué, compatible avec l'usage papier de l'ecole, et cela ne remet pas en cause la V1 stable.

## Prochaine action proposee

Developper la fiche eleve imprimable comme premiere evolution V1.1, puis la faire tester sur 2 ou 3 eleves reels.
