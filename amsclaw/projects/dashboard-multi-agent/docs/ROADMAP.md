# Roadmap - Dashboard multi-agent

## V1 - Prototype testable

Statut : realise.

- Interface HTML/CSS/JS locale.
- Donnees de demonstration.
- Persistance navigateur via `localStorage`.
- Script de lancement local.
- Guide d'utilisation.

## V1.1 - Projet structure

Statut : realise.

- Dossier projet dans `amsclaw/projects/`.
- Documentation projet.
- Roadmap.
- Brief.
- Script de lancement depuis le projet.

## V1.2 - Source de donnees simple

Statut : realise.

Objectif :
choisir une source de donnees lisible et maintenable.

Options possibles :

- fichier JSON intermediaire dans `data/` ;
- lecture controlee des fichiers `memory/*.md` ;
- generation manuelle de donnees depuis les fichiers Markdown.

Decision prise :
commencer par un fichier JSON intermediaire pour eviter de parser trop tot du Markdown libre.

## V1.3 - Flux projets

Statut : realise.

- Synchroniser les projets depuis `memory/active-projects.md` vers `dashboard-data.json` : realise.
- Afficher les projets actifs : realise via la V1.2.
- Afficher la prochaine action : realise via la V1.2.
- Signaler les projets bloques : partiel, a renforcer.
- Lier un projet a sa documentation : partiel, la donnee existe mais le lien n'est pas encore cliquable.
- Creer un projet depuis un modele : a faire.

## V1.4 - Persistance JSON depuis l'IHM

Statut : realise.

- Serveur local Node avec API d'ecriture.
- Ajout de projets depuis l'IHM avec sauvegarde dans `dashboard-data.json`.
- Ajout d'idees depuis l'IHM avec sauvegarde dans `dashboard-data.json`.
- Modification et suppression des projets et idees depuis l'IHM.
- Rechargement des donnees depuis le fichier JSON a chaque ouverture.
- Abandon de `localStorage` comme source prioritaire.

## V1.5 - Suivi quotidien

Statut : realise.

- Nouvelle vue `Suivi`.
- Colonnes `A faire`, `En cours`, `Fait`.
- Statut d'avancement sauvegarde par projet dans `dashboard-data.json`.
- Notification apres changement d'avancement.

## V1.6 - Taches agents

Statut : realise.

- Nouvelle vue `Tâches`.
- Creation de taches avec agent responsable, priorite, note et lien projet/idee.
- Colonnes `A faire`, `En cours`, `Fait`.
- Modification et suppression des taches.
- Statut d'avancement sauvegarde dans `dashboard-data.json`.

## V1.7 - Execution manuelle de taches simples

Statut : realise.

- Bouton `Executer` sur les taches agents non terminees.
- Endpoint local `POST /api/agent-tasks/:id/execute`.
- Premier cas pris en charge : creation d'une note Markdown.
- Creation sans ecrasement de fichier existant.
- Passage automatique de la tache a `Fait` apres execution reussie.
- Ajout d'une trace d'execution dans la note de la tache.

## V1.8 - Historique exploitable des executions

Statut : realise.

- Bloc `Historique` visible sur les taches agents.
- Lien `Ouvrir le fichier` quand une execution genere un fichier local.
- Endpoint local pour servir les fichiers generes par les taches agents.
- Validation manuelle `Marquer comme vérifié` sur les executions.

## V1.9 - Suivi des executions a verifier

Statut : realise.

- Filtre `À vérifier` dans la vue `Tâches`.
- Detection des executions terminees mais non validees visuellement.
- Compteur d'executions a verifier dans l'onglet `Tâches`.

## V1.10 - Etat vide de verification

Statut : realise.

- Message explicite quand le filtre `À vérifier` ne contient aucune execution.
- Cycle complet teste par l'utilisateur : execution, ouverture du fichier, validation, filtre, compteur puis etat vide.

## V1.11 - Creation de projet depuis modele

Statut : realise.

- Creer un dossier projet standard depuis le dashboard.
- Generer les fichiers minimaux de reprise.
- Ajouter le projet dans `dashboard-data.json`.
- Journaliser les fichiers crees.
- Demander confirmation avant toute creation de fichiers.
- Specification de cadrage : `docs/PROJECT_CREATION_MODEL.md`.
- Endpoint local `POST /api/projects/create-from-template` : implemente, avec tests non destructifs.
- Mode `dryRun` non destructif : implemente et teste.
- Formulaire dashboard connecte a l'endpoint avec option explicite et confirmation utilisateur.
- Scenario de recette : `tests/recette-creation-projet-modele.md`.
- Test reel de creation depuis l'IHM : realise le 2026-06-12 avec le projet `Relance paiements scolaires WhatsApp`.

## V1.12 - Statuts projet detailles

Statut : realise.

- Ajout du champ `Statut` dans le formulaire projet.
- Statuts disponibles : `Actif`, `En pause`, `Bloque`, `Cloture`.
- Ajout des filtres `Pause` et `Clotures` dans la vue `Projets`.
- Les projets clotures restent visibles dans `Tous`.
- Les projets clotures sont exclus des actions prioritaires et du suivi quotidien.
- La creation depuis modele conserve le statut choisi dans le formulaire.

## V1.13 - Bilan de cloture projet

Statut : realise.

- Ajout du champ `Date de cloture` dans le formulaire projet.
- Ajout du champ `Resultat final / bilan` dans le formulaire projet.
- Remplissage automatique de la date du jour quand un projet passe en `Cloture` sans date saisie.
- Affichage du resultat final sur les cartes projet quand le champ est renseigne.
- Conservation du bilan et de la date dans `dashboard-data.json`.
- Conservation du bilan et de la date lors d'une creation depuis modele.

## V1.14 - Pilotage visible du portefeuille

Statut : realise.

Objectif :
eviter d'avancer a l'aveugle dans le dashboard. Chaque evolution doit rendre le portefeuille plus lisible, plus pilotable et mieux documente.

Livrables :

1. Compteurs en haut de la vue `Projets` : actif, pause, bloque, cloture, sans action.
2. Alerte visuelle renforcee sur les cartes des projets bloques.
3. Bloc `Prochaine action` plus visible dans les cartes projet.
4. Vue `Suivi` enrichie avec signaux : blocages, projets sans prochaine action, actions utiles.
5. Champ `lastUpdated` gere automatiquement lors des modifications projet.
6. Filtre `Sans action`.
7. Champ `Historique / decision importante` via `projectLog`.
8. Bouton `Cloturer` qui prepare le formulaire avec statut cloture et date du jour.
9. Filtre `Archives` pour la memoire des projets clotures.
10. Badges lateraux sur `Projets`, `Suivi` et `Taches`.
11. Recherche texte dans les projets.
12. Export Markdown et JSON des projets.

Regle de progression :
chaque point doit etre implemente, teste et documente avant de passer au point suivant.

## V1.15 - Pilotage sans angle mort

Statut : realise.

Objectif :
donner a Ams une trajectoire visible avant chaque evolution et conserver la memoire des arbitrages.

Livrables :

1. Vue `Aujourd'hui` avec actions du jour, blocages, projets sans prochaine action, projets dormants et taches a echeance.
2. Vue `Backlog` avec statut `A faire`, `En cours`, `Fait`, `Ecarte`.
3. Vue `Decisions` avec date, projet lie, decision, raison et impact.
4. Score projet sur 20 : rapidite, motivation, effort/gain, potentiel financier.
5. Journal d'activite recent visible dans `Aujourd'hui`.
6. Detection des projets dormants sans mise a jour depuis 14 jours.
7. Vue `Revue hebdo` avec synthese Markdown copiable.
8. Echeance sur les taches agents.
9. Fiche projet detaillee avec objectif, score, taches, decisions, historique et documentation.
10. Export de revue hebdomadaire par copie presse-papiers.
11. Sauvegarde versionnee de `dashboard-data.json` avant chaque ecriture serveur.
12. Recherche globale dans projets, taches, decisions, backlog et idees.

Tests realises :

- `node --check amsclaw/dashboard/app.js` ;
- `node --check amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js` ;
- validation JSON de `dashboard-data.json` ;
- HTTP `200` sur le dashboard ;
- HTTP `200` sur `/api/dashboard-data` ;
- POST API valide avec conservation de `backlogItems`, `decisions`, `activityLog` ;
- creation d'une sauvegarde dans `data/backups/`.

## V2 - Synchronisation memoire

Statut : en cours.

- Lire les donnees depuis la memoire amsClaw.
- Eviter les doublons entre dashboard et fichiers Markdown.
- Journaliser les decisions importantes.
- Produire un rapport du matin exploitable.

Avancee du 2026-06-13 :

- audit JSON / Markdown reutilisable par le script de synchronisation ;
- synchronisation Markdown -> JSON bloquee si l'audit detecte une divergence ;
- sauvegarde pre-ecriture creee avant modification de `dashboard-data.json`.
