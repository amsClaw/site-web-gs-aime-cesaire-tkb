# Guide d'utilisation - Dashboard amsClaw

## Objectif

Le dashboard sert a piloter l'ecosysteme amsClaw sans avancer a l'aveugle.

Il centralise :

- les projets actifs, en pause, bloques et clotures ;
- les prochaines actions ;
- les idees business ;
- les taches agents ;
- les routines ;
- le suivi quotidien ;
- le backlog des evolutions ;
- les decisions importantes ;
- la revue hebdomadaire ;
- la recherche globale ;
- les exports utiles.

## Lancer le dashboard

Depuis le workspace OpenClaw :

```sh
cd /Users/amsfox/.openclaw/workspace
./amsclaw/projects/dashboard-multi-agent/scripts/launch-v1.sh
```

URL locale :

```text
http://localhost:8787/amsclaw/dashboard/
```

Le dashboard lit et sauvegarde principalement :

```text
amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json
```

## Vue d'ensemble

La vue d'ensemble affiche :

- le nombre total de projets ;
- les priorites hautes ;
- les blocages ;
- les taches agents ouvertes ;
- les actions prioritaires ;
- la repartition des agents.

Les projets clotures sont conserves en memoire, mais exclus des actions prioritaires.

## Aujourd'hui

La vue `Aujourd'hui` sert a savoir quoi regarder en premier.

Elle affiche :

- les actions du jour ;
- les projets bloques ;
- les projets sans prochaine action ;
- les projets dormants ;
- les taches arrivees a echeance ;
- le journal d'activite recent du dashboard.

Dans les blocs de synthese, le sujet principal de chaque ligne est affiche en gras.
Le detail est affiche dessous en texte plus discret pour faciliter la lecture rapide.

Un projet est considere dormant s'il est actif et sans mise a jour depuis 14 jours ou plus.

## Backlog

La vue `Backlog` liste les evolutions prevues ou realisees du dashboard.

Chaque item contient :

- un titre ;
- une categorie ;
- une priorite ;
- un statut : `A faire`, `En cours`, `Fait`, `Ecarte` ;
- une prochaine action.

Cette vue sert a ne pas avancer a l'aveugle : les evolutions doivent etre visibles avant implementation.

## Decisions

La vue `Decisions` conserve les arbitrages importants.

Chaque decision contient :

- une date ;
- un projet lie si pertinent ;
- un titre ;
- la decision ;
- la raison ;
- l'impact.

Utiliser cette vue des qu'une orientation importante est prise sur un projet.

## Projets

La vue `Projets` sert a piloter le portefeuille.

Elle contient :

- des compteurs `Actifs`, `En pause`, `Bloques`, `Clotures`, `Sans action` ;
- une recherche texte ;
- des filtres : `Tous`, `Actifs`, `Pause`, `Bloques`, `Sans action`, `Clotures`, `Archives` ;
- des cartes projet avec statut, prochaine action, priorite, responsable et derniere mise a jour ;
- un score projet sur 20 ;
- un affichage renforce pour les projets bloques ;
- un bouton `Details` pour ouvrir la fiche projet ;
- un bouton `Cloturer` pour guider la cloture ;
- des exports Markdown et JSON.

### Ajouter un projet

Renseigner :

- nom ;
- objectif ;
- prochaine action ;
- statut ;
- priorite ;
- score de priorite : rapidite, motivation, effort/gain, financier ;
- date de cloture si le projet est deja cloture ;
- resultat final / bilan si pertinent ;
- historique ou decision importante si pertinent.

Le champ `Prochaine action` doit rester concret pour que le projet soit redemarrable.

### Modifier un projet

Cliquer sur `Modifier`, ajuster les champs puis cliquer sur `Enregistrer`.

La date `Derniere mise a jour` est actualisee automatiquement apres modification.

### Actions guidées

Certaines fiches projet peuvent afficher une action guidée lorsque la prochaine action est claire et validable.

Premier cas teste :

- projet `Creation CRM pour une ecole` ;
- action `Valider la PRD` ;
- effet : la PRD V1 est marquée comme validée, la prochaine action devient la production du cahier de recette V1, une décision est ajoutée et le suivi durable est mis à jour.
- état actuel : cette action n'est plus affichée pour le CRM école, car la PRD est déjà validée et la prochaine action ne porte plus sur cette validation.

Principe :
le dashboard doit permettre de faire avancer un projet sans terminal pour les validations simples, mais il ne remplace pas les documents projet détaillés.

### Cloturer un projet

Cliquer sur `Cloturer` depuis la carte projet.

Le formulaire passe automatiquement le statut a `Cloture` et remplit la date du jour si aucune date n'existe.

Avant d'enregistrer, renseigner si possible :

- le resultat final ;
- le bilan ;
- une decision ou lecon utile.

Un projet cloture reste visible dans `Tous`, `Clotures` et `Archives`.

### Rechercher un projet

La recherche filtre sur :

- le nom ;
- l'objectif ;
- la prochaine action ;
- la priorite ;
- le responsable ;
- la documentation ;
- le resultat final ;
- l'historique / decision.

### Exporter les projets

Deux exports sont disponibles :

- `Export Markdown` ;
- `Export JSON`.

Ils generent un fichier local telechargeable depuis le navigateur.

## Suivi quotidien

La vue `Suivi` montre :

- les projets bloques ;
- les projets sans prochaine action ;
- les actions utiles a traiter ;
- les colonnes `A faire`, `En cours`, `Fait`.

Les projets clotures sont exclus du suivi quotidien.

## Idees business

La vue `Idees` permet de qualifier une opportunite avec un score sur 20.

Criteres :

- rapidite ;
- motivation ;
- effort / gain ;
- potentiel financier.

## Taches agents

La vue `Taches` permet de :

- creer une tache agent ;
- la lier a un projet ou une idee ;
- saisir une echeance ;
- suivre son statut ;
- executer certaines taches Markdown simples ;
- ouvrir les fichiers generes ;
- marquer une execution comme verifiee ;
- filtrer les executions `A verifier`.

Le badge lateral `Taches` affiche le nombre de taches ouvertes.

## Revue hebdo

La vue `Revue hebdo` prepare une synthese Markdown copiable.

Elle reprend :

- les projets actifs ;
- les blocages ;
- les projets en pause ;
- les taches ouvertes ;
- les dernieres decisions ;
- la prochaine action recommandee.

Les sujets principaux des lignes sont mis en avant avec un style semi-fort, plus discret que les titres de sections, pour faciliter la lecture sans surcharger l'ecran.

## Recherche globale

La vue `Recherche` permet de chercher dans :

- les projets ;
- les taches ;
- les decisions ;
- le backlog ;
- les idees.

Elle complete la recherche specifique de la vue `Projets`.

## Routines

La vue `Routines` permet de suivre les routines quotidiennes, hebdomadaires et mensuelles.

## Regle de pilotage

Chaque projet doit rester documente avec :

- un objectif ;
- un statut ;
- une prochaine action ;
- une documentation ;
- un historique de decisions utiles ;
- un bilan de cloture si le projet est termine.

Chaque evolution importante du dashboard doit etre :

- presente dans le backlog ;
- testee avant de passer au point suivant ;
- documentee dans ce guide si elle change l'usage ;
- journalisee dans les decisions si elle structure la suite.

Les projets clotures ne sont pas oublies. Ils restent dans la memoire durable du dashboard et du workspace.
