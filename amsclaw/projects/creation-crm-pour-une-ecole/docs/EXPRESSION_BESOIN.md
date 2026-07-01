# Expression de besoin - Creation CRM pour une ecole

Statut : valide par Ams le 2026-06-13, avec ajustement import/export Excel

Source initiale : `docs/mon_besoin.md`

Date : 2026-06-13

## 1. Contexte

GS AIME CESAIRE TKB est une ecole situee en Guinee. Aujourd'hui, la gestion administrative et scolaire se fait principalement dans des cahiers, sans outil informatique centralise.

Ams souhaite construire un outil simple, fonctionnel, evolutif et utilisable par l'ecole pour centraliser les informations essentielles et reduire la dependance aux cahiers papier.

## 2. Vision cible

La vision cible est une application de gestion scolaire locale, evolutive vers une version hebergee.

Elle doit permettre a terme de gerer :

- les eleves ;
- les classes ;
- les notes et bulletins ;
- les presences et retards ;
- les enseignants ;
- le statut de scolarite des eleves, sans gestion d'encaissement ;
- les tableaux de bord administratifs ;
- les rapports PDF / Excel ;
- les utilisateurs et permissions ;
- les communications parents par WhatsApp ou email.

## 3. Mode de deploiement souhaite

La premiere version doit pouvoir fonctionner sur un PC installe a l'ecole, toujours branche et connecte a Internet si possible.

Ce PC servira de serveur local. Les utilisateurs devront pouvoir se connecter :

- depuis le PC serveur ;
- depuis d'autres ordinateurs connectes au meme reseau local ;
- depuis des telephones connectes au meme reseau local.

Une version hebergee accessible depuis l'exterieur pourra etre etudiee plus tard.

## 4. Utilisateurs pressentis

Les utilisateurs cibles sont :

- Administrateur / Direction : pilotage global, acces complet, suivi des indicateurs.
- Secretariat : gestion des eleves, classes, documents, inscriptions.
- Enseignants : saisie ou consultation des notes, presences, classes.
- Instructeurs : ajout et mise a jour de commentaires de suivi sur les fiches eleves.
- Comptabilite : consultation ou mise a jour du statut de scolarite des eleves.
- Parents : pas utilisateurs directs en V1, mais destinataires de communications.

## 5. Problemes a resoudre

Les problemes pressentis sont :

- informations eleves dispersees dans des cahiers ;
- difficulte a retrouver rapidement un eleve, un parent ou une classe ;
- suivi manuel des effectifs ;
- difficulte a savoir rapidement si un eleve est a jour dans sa scolarite ;
- risque d'erreurs sur les presences, notes ou bulletins ;
- production lente des rapports ;
- manque de vision globale pour la direction ;
- communication parents non centralisee.

## 6. Besoin reformule

L'ecole a besoin d'un outil local, simple et en francais permettant de centraliser progressivement la gestion administrative et scolaire.

La premiere priorite doit etre de creer un socle fiable : eleves, parents/tuteurs, classes, recherche, effectifs et tableau de bord simple.

Ce socle permettra ensuite d'ajouter les modules metier plus sensibles : presences, notes, bulletins et communications.

## 7. Perimetre V1 recommande

Pour livrer vite une V1 utile et testable, le perimetre recommande est :

### Gestion des eleves

- Ajouter un eleve.
- Modifier un eleve.
- Archiver ou supprimer un eleve selon regle a confirmer.
- Consulter une fiche eleve.
- Rechercher rapidement un eleve.
- Stocker les informations minimales :
  - matricule ;
  - nom ;
  - prenom ;
  - sexe ;
  - date de naissance ;
  - classe ;
  - parent ou tuteur principal ;
  - telephone parent ;
  - adresse ;
  - statut de scolarite : a jour / non a jour / a verifier ;
  - photo si techniquement simple.

### Import de liste eleves

- Importer une liste d'eleves depuis un fichier Excel.
- Utiliser l'import pour initialiser rapidement la base eleves ou ajouter plusieurs eleves.
- Prevoir un modele Excel simple avec les colonnes attendues.
- Controler les donnees avant validation de l'import :
  - champs obligatoires manquants ;
  - doublons possibles ;
  - classes inconnues ;
  - format telephone ou date de naissance incorrect.
- Afficher un resume avant validation : nombre d'eleves a importer, lignes en erreur, lignes ignorees.
- Ne pas ecraser massivement les donnees existantes sans confirmation explicite.

### Commentaires de suivi eleve

- Afficher une section `Commentaires` dans chaque fiche eleve.
- Permettre aux instructeurs autorises d'ajouter un commentaire.
- Permettre la mise a jour d'un commentaire selon les permissions a definir.
- Conserver au minimum pour chaque commentaire :
  - texte du commentaire ;
  - auteur ;
  - date de creation ;
  - date de derniere modification si le commentaire est modifie.
- Distinguer ces commentaires d'une messagerie parent : il s'agit d'un suivi interne de l'eleve.

### Gestion des classes

- Creer et modifier une classe.
- Affecter un eleve a une classe.
- Consulter la liste des eleves par classe.
- Afficher les effectifs par classe.

### Tableau de bord administrateur

- Nombre total d'eleves.
- Nombre de classes.
- Effectifs par classe.
- Nombre d'eleves a jour / non a jour / a verifier.
- Derniers eleves ajoutes.

### Exports simples

- Export Excel de la liste des eleves.
- Export Excel des effectifs par classe.
- Export Excel des eleves non a jour ou a verifier.
- Export CSV possible en option si techniquement simple.
- Les exports doivent produire des fichiers exploitables directement dans Excel.

### Utilisateurs

- Compte administrateur.
- Compte secretariat.
- Permissions simples.

### Sauvegarde

- Sauvegarde automatique ou manuelle des donnees.
- Procedure claire de restauration a definir dans la PRD.

## 8. Hors perimetre V1 recommande

Ces sujets sont importants, mais devraient etre repousses apres validation du socle :

- saisie des notes ;
- calcul des moyennes ;
- classement des eleves ;
- generation automatique des bulletins PDF ;
- gestion complete des presences ;
- suivi financier complet ;
- gestion d'encaissement ;
- recus automatiques ;
- paiements enseignants ;
- emploi du temps ;
- communication WhatsApp ou email automatisee ;
- version hebergee accessible depuis Internet ;
- synchronisation hors ligne / en ligne complexe ;
- portail parent.

## 9. Modules V2 possibles

Apres validation de la V1, les modules suivants pourront etre priorises :

- module scolarite avance : historique du statut de scolarite, echeances, relances ;
- module communication : messages WhatsApp pre-remplis par parent, classe ou groupe ;
- module presence : absences, retards, rapports mensuels ;
- module notes : matieres, notes, moyennes, bulletins ;
- module enseignants : fiches enseignants, matieres, planning ;
- version hebergee multi-ecoles.

## 10. Points a challenger

### CRM ou gestion scolaire ?

Le mot CRM est utile pour l'idee generale, mais le besoin decrit correspond plutot a une application de gestion scolaire. Pour eviter la confusion, le produit peut etre nomme provisoirement :

`Gestion scolaire GS AIME CESAIRE TKB`.

### V1 trop large

Tout integrer dans une seule V1 risquerait de ralentir fortement le projet. Les notes, bulletins, presences et communications demandent chacun des regles metier specifiques.

La recommandation est donc de construire d'abord le registre eleves/classes, avec un statut simple de scolarite, puis d'ajouter les modules a forte valeur.

### Paiement ou statut de scolarite ?

Ams precise que l'outil ne doit pas gerer les paiements. Le besoin est seulement de savoir si l'eleve est a jour dans sa scolarite.

La V1 doit donc gerer un indicateur administratif simple, pas un module comptable :

- `a jour` ;
- `non a jour` ;
- `a verifier`.

Les montants, encaissements, recus, factures et rapprochements financiers restent hors perimetre V1.

### Commentaires instructeurs

Ams souhaite une section commentaire sous chaque fiche eleve, pouvant etre mise a jour par les instructeurs.

La V1 peut l'integrer si le besoin reste simple :

- commentaires internes sur le suivi de l'eleve ;
- auteur et date visibles ;
- modification possible selon les droits ;
- pas de fil de discussion avec les parents ;
- pas de notification automatique en V1.

Point de vigilance : il faudra eviter que les commentaires deviennent une zone sensible non maitrisee. La PRD devra preciser qui peut lire, creer, modifier ou supprimer un commentaire.

### Suppression des eleves

La suppression definitive peut etre dangereuse. Il faudra probablement preferer un statut `archive` pour conserver l'historique.

### Donnees terrain

Avant PRD, il faut confirmer les donnees exactes disponibles aujourd'hui : cahiers, listes papier, Excel, photos, numeros parents, classes existantes.

## 11. Questions restantes avant validation du besoin

1. Confirme-tu que la V1 doit commencer par le socle `eleves + classes + recherche + tableau de bord simple` ?
2. Qui utilisera vraiment la V1 au quotidien : direction, secretariat, comptabilite, enseignants ?
3. Les classes exactes de l'ecole sont lesquelles ?
4. Existe-t-il deja une liste d'eleves exploitable, meme papier ou Excel ?
5. Le statut de scolarite doit-il etre limite a `a jour / non a jour / a verifier`, ou faut-il ajouter une date de derniere verification ?
6. La suppression d'un eleve doit-elle etre autorisee, ou seulement l'archivage ?
7. La photo eleve est-elle indispensable des la V1 ?
8. L'outil sera utilise sur combien de postes ou telephones au debut ?
9. Les commentaires eleves doivent-ils etre visibles par tous les utilisateurs internes, ou seulement direction / secretariat / instructeurs ?
10. Un instructeur doit-il pouvoir modifier seulement ses propres commentaires, ou aussi ceux des autres ?

## 12. Criteres de validation du besoin

L'expression de besoin pourra etre consideree comme validee quand :

- le perimetre V1 est confirme ;
- les utilisateurs prioritaires sont confirmes ;
- les donnees minimales d'une fiche eleve sont validees ;
- les classes a gerer sont connues ;
- les modules repousses hors V1 sont acceptes ;
- les criteres de succes de la V1 sont clairs.

Validation Ams du 2026-06-13 :
l'expression de besoin est validee avec un ajustement : ajouter une fonction d'import de liste eleves par Excel et conserver une fonction d'export Excel.

## 13. Proposition de critere de succes V1

La V1 sera utile si, depuis un navigateur sur le reseau local de l'ecole, un utilisateur autorise peut :

- ajouter un eleve en moins de 2 minutes ;
- importer une liste d'eleves depuis Excel avec controle avant validation ;
- retrouver un eleve en quelques secondes ;
- consulter la liste des eleves d'une classe ;
- lire et ajouter un commentaire de suivi sur une fiche eleve ;
- voir les effectifs par classe ;
- exporter une liste eleves exploitable dans Excel ;
- sauvegarder les donnees sans manipulation technique complexe.
