# Cahier de recette V1 - Gestion scolaire GS AIME CESAIRE TKB

Statut : valide par Ams

Date : 2026-06-14

Source : `docs/PRD_V1.md`, validee par Ams le 2026-06-14

Validation : valide par Ams le 2026-06-14

## 1. Objectif

Ce cahier de recette sert a verifier que la V1 du CRM ecole respecte la PRD validee.

Il doit permettre a Ams, a l'ecole et au developpeur de tester les parcours essentiels avant livraison :

- utilisateurs et droits ;
- classes et instructeur principal ;
- creation et modification d'eleves ;
- import Excel complet ou partiel ;
- fiche eleve avec parents, statut de scolarite, completude et commentaires ;
- recherche, filtres, exports ;
- tableau de bord ;
- sauvegarde et restauration documentee.

## 2. Regles de recette

Statuts de test :

- `A tester` : test non execute.
- `OK` : resultat conforme.
- `KO` : resultat non conforme.
- `Bloque` : test impossible a realiser.
- `NA` : non applicable a la version testee.

Regle de validation :
la V1 est acceptable si tous les tests critiques sont `OK`, et si les tests non critiques restants sont documentes avec une decision claire.

## 3. Environnement de recette

Environnement cible :

- application accessible depuis un navigateur ;
- installation locale ou reseau local de l'ecole ;
- interface en francais ;
- donnees de test separees des donnees definitives si possible.

Navigateurs a tester au minimum :

- Chrome ou navigateur Chromium recent ;
- navigateur disponible sur le poste principal de l'ecole.

## 4. Jeux de donnees de recette

### Utilisateurs

| Role | Identifiant de test | Objectif |
| --- | --- | --- |
| Administrateur / Direction | `admin_test` | Droits complets, utilisateurs, classes, exports, sauvegarde |
| Secretariat | `secretariat_test` | Saisie eleves, classes, import, export |
| Instructeur | `instructeur_test` | Consultation limitee, commentaires |

### Classes

| Classe | Cycle | Instructeur rattache |
| --- | --- | --- |
| 6eme A | College | `instructeur_test` |
| 5eme A | College | Aucun au depart |

### Eleves manuels

| Matricule | Nom | Prenom | Classe | Statut scolarite | Completude |
| --- | --- | --- | --- | --- | --- |
| TEST001 | Diallo | Aminata | 6eme A | a jour | complet |
| TEST002 | Camara | Mohamed | 5eme A | a verifier | a completer |

### Fichiers Excel

| Fichier | Usage |
| --- | --- |
| `docs/liste_eleve.xlsx` | Tester une extraction existante par classe sans colonne classe |
| Modele Excel V1 | Tester un import conforme avec colonnes recommandees |
| Fichier avec doublon matricule | Tester le blocage ou l'arbitrage des doublons |
| Fichier incomplet | Tester les fiches `donnees a completer` |

## 5. Tests de prise en main

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-001 | Critique | Connexion administrateur | Application installee | Se connecter avec `admin_test` | L'utilisateur accede a l'application et voit les fonctions autorisees | A tester |
| REC-002 | Critique | Creation des utilisateurs | Connecte en admin | Creer `secretariat_test` et `instructeur_test` avec leurs roles | Les utilisateurs sont crees et actifs | A tester |
| REC-003 | Critique | Verification des droits par role | Utilisateurs crees | Se connecter avec chaque role | Les menus/actions visibles correspondent au role | A tester |
| REC-004 | Haute | Ordre de prise en main comprehensible | Application vierge | Suivre le parcours utilisateurs, classes, eleves, statuts, commentaires, exports, sauvegarde | L'utilisateur comprend quoi faire en premier sans formation longue | A tester |

## 6. Tests classes et instructeurs

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-010 | Critique | Creer une classe active | Connecte admin ou secretariat autorise | Creer `6eme A` | La classe est creee et disponible dans les fiches eleves | A tester |
| REC-011 | Critique | Affecter un instructeur a une classe | Classe et instructeur actifs | Modifier `6eme A`, choisir `instructeur_test` dans la liste | L'instructeur est rattache a la classe | A tester |
| REC-012 | Haute | Liste deroulante instructeurs | Instructeurs actifs et archives | Ouvrir l'affectation instructeur | Seuls les instructeurs actifs sont proposes | A tester |
| REC-013 | Haute | Classe dans tableau de bord | Classe creee | Ouvrir le tableau de bord | La classe apparait avec son effectif calcule | A tester |
| REC-014 | Haute | Classe archivee non proposee | Classe archivee | Ajouter ou importer un eleve | La classe archivee n'est plus proposee pour un nouvel eleve | A tester |

## 7. Tests eleves et fiches

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-020 | Critique | Ajouter un eleve complet | Classe active | Creer `TEST001` avec tous les champs principaux | La fiche est creee, statut complet, visible dans la recherche | A tester |
| REC-021 | Critique | Champs essentiels controles | Formulaire eleve | Tenter d'enregistrer sans nom ou sans classe | L'enregistrement est bloque avec message clair | A tester |
| REC-022 | Critique | Matricule unique | `TEST001` existe | Creer un autre eleve avec matricule `TEST001` | Le doublon est bloque ou demande une decision explicite | A tester |
| REC-023 | Haute | Parent 1 et parent 2 | Formulaire eleve | Renseigner parent 1 et parent 2 | Les deux parents sont enregistres et visibles sur la fiche | A tester |
| REC-024 | Haute | Lieu de naissance | Formulaire eleve | Renseigner un lieu de naissance | Le lieu est enregistre et visible sur la fiche | A tester |
| REC-025 | Haute | Statut de scolarite | Fiche eleve | Choisir `a jour`, puis `non a jour`, puis `a verifier` | Seules ces valeurs sont autorisees et sauvegardees | A tester |
| REC-026 | Haute | Fiche a completer | Creer `TEST002` avec champs non critiques manquants | Enregistrer la fiche | La fiche affiche un badge texte `donnees a completer` | A tester |
| REC-027 | Moyenne | Archivage eleve | Eleve actif | Archiver l'eleve | L'eleve n'apparait plus dans les listes actives mais reste retrouvable si filtre archive | A tester |
| REC-028 | Haute | Photo eleve optionnelle | Fiche eleve editable | Choisir une photo, ajuster zoom et centrage, enregistrer | La photo est affichee en cercle sur la fiche et dans la liste, le bouton `Choisir une photo` disparait tant que la photo existe, puis la photo reste visible apres rechargement | A tester |

## 8. Tests import Excel

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-030 | Critique | Import modele conforme | Classe active, fichier conforme | Importer un fichier avec colonnes recommandees | Resume avant validation, lignes valides, import confirme | A tester |
| REC-031 | Critique | Import extraction existante par classe | `docs/liste_eleve.xlsx`, classe cible active | Choisir une classe cible puis importer le fichier | Les colonnes `Matricule`, `Eleve`, `Sexe`, `Date de naissance`, `Lieu de naissance`, `Pere`, `Mere`, `Telephone` sont reconnues ou mappees | A tester |
| REC-032 | Critique | Absence de colonne classe | Fichier sans colonne classe | Importer sans choisir de classe cible | L'application demande une classe cible avant import | A tester |
| REC-033 | Critique | Resume avant validation | Fichier avec lignes valides et incompletes | Lancer l'analyse import | Le resume affiche total lignes, valides, bloquees, donnees a completer, doublons | A tester |
| REC-034 | Critique | Import partiel | Fichier incomplet mais non bloquant | Confirmer l'import partiel | Les lignes importables sont creees, les fiches incompletes ont le badge `donnees a completer` | A tester |
| REC-035 | Critique | Doublon matricule dans fichier | Fichier avec deux fois le meme matricule | Lancer l'analyse | La ligne doublon est bloquee ou explicitement signalee | A tester |
| REC-036 | Critique | Doublon avec base existante | Eleve existant en base | Importer une ligne avec son matricule | L'application bloque la ligne ou demande une decision explicite | A tester |
| REC-037 | Haute | Date invalide | Fichier avec date de naissance invalide | Lancer l'analyse | La ligne est signalee avec erreur ou champ a corriger | A tester |
| REC-038 | Haute | Lignes vides | Fichier contenant lignes vides | Lancer l'analyse | Les lignes vides sont ignorees | A tester |
| REC-039 | Haute | Pas d'ecrasement massif | Donnees existantes | Importer un fichier ressemblant a une mise a jour | L'application ne remplace pas les donnees sans confirmation explicite | A tester |

## 9. Tests completude des donnees

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-040 | Critique | Badge donnees a completer | Fiche incomplete | Ouvrir la fiche | Badge visible avec libelle texte et couleur | A tester |
| REC-041 | Haute | Correction d'une fiche incomplete | Fiche `donnees a completer` | Completer les champs manquants | La fiche passe a `complet` si tous les champs requis sont remplis | A tester |
| REC-042 | Haute | Filtre donnees a completer | Plusieurs fiches completes et incompletes | Filtrer `donnees a completer` | Seules les fiches incompletes apparaissent | A tester |
| REC-043 | Haute | Tableau de bord completude | Fiches incompletes en base | Ouvrir tableau de bord | Le nombre d'eleves avec donnees a completer est affiche | A tester |

## 10. Tests commentaires

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-050 | Critique | Ajouter un commentaire instructeur | Instructeur rattache a la classe | Ouvrir une fiche autorisee et ajouter un commentaire | Commentaire enregistre avec auteur et date | A tester |
| REC-051 | Critique | Lecture commentaires direction | Commentaire existant | Se connecter admin/direction et ouvrir la fiche | Le commentaire est visible | A tester |
| REC-052 | Haute | Lecture commentaires secretariat | Commentaire existant | Se connecter secretariat et ouvrir la fiche | Le commentaire est visible | A tester |
| REC-053 | Haute | Modification par auteur | Commentaire cree par `instructeur_test` | Modifier ce commentaire avec le meme instructeur | Modification enregistree avec date de derniere modification | A tester |
| REC-054 | Critique | Protection donnees administratives | Connecte instructeur | Tenter de modifier les donnees eleve ou statut scolarite | L'action est interdite | A tester |
| REC-055 | Haute | Commentaires internes uniquement | Commentaire existant | Chercher dans exports standards ou messages parents | Le commentaire n'est pas exporte ni envoye par defaut | A tester |

## 11. Tests recherche et filtres

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-060 | Critique | Recherche par matricule | Eleve existant | Rechercher `TEST001` | L'eleve est trouve rapidement | A tester |
| REC-061 | Critique | Recherche par nom/prenom | Eleve existant | Rechercher nom ou prenom | Les resultats correspondants s'affichent | A tester |
| REC-062 | Haute | Filtre classe | Eleves dans plusieurs classes | Filtrer `6eme A` | Seuls les eleves de la classe s'affichent | A tester |
| REC-063 | Haute | Filtre statut scolarite | Eleves avec statuts differents | Filtrer `a verifier` | Seuls les eleves au statut choisi s'affichent | A tester |
| REC-064 | Haute | Filtre actif/archive | Eleves actifs et archives | Filtrer archives | Les eleves archives sont affiches separement | A tester |
| REC-065 | Haute | Respect droits instructeur | Instructeur rattache a `6eme A` | Rechercher un eleve d'une autre classe | L'eleve non autorise n'est pas visible | A tester |

## 12. Tests exports Excel

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-070 | Critique | Export tous eleves actifs | Eleves actifs en base | Exporter tous les eleves actifs | Fichier Excel lisible, nom date, colonnes minimales presentes | A tester |
| REC-071 | Haute | Export par classe | Eleves dans plusieurs classes | Exporter `6eme A` | Le fichier contient uniquement la classe choisie | A tester |
| REC-072 | Haute | Export statuts scolarite | Eleves `non a jour` ou `a verifier` | Exporter par statut | Le fichier contient uniquement les statuts demandes | A tester |
| REC-073 | Haute | Export donnees a completer | Fiches incompletes | Exporter les eleves `donnees a completer` | Le fichier contient les fiches incompletes | A tester |
| REC-074 | Haute | Export effectifs par classe | Classes avec eleves | Exporter effectifs | Le fichier contient les classes et effectifs calcules | A tester |
| REC-075 | Critique | Droits export instructeur | Connecte instructeur | Tenter un export standard | L'export est interdit par defaut | A tester |
| REC-076 | Haute | Commentaires exclus export standard | Commentaires existants | Exporter liste eleves | Les commentaires internes ne sont pas presents | A tester |

## 13. Tests tableau de bord

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-080 | Critique | Effectifs globaux | Donnees eleves/classes | Ouvrir tableau de bord | Nombre total eleves actifs et classes actives affiches | A tester |
| REC-081 | Haute | Effectif par classe | Donnees par classe | Ouvrir tableau de bord | Effectifs par classe corrects | A tester |
| REC-082 | Haute | Repartition statuts scolarite | Statuts differents | Ouvrir tableau de bord | Repartition `a jour`, `non a jour`, `a verifier` correcte | A tester |
| REC-083 | Haute | Donnees a completer | Fiches incompletes | Ouvrir tableau de bord | Nombre d'eleves a completer affiche | A tester |
| REC-084 | Moyenne | Derniers eleves ajoutes | Ajouts recents | Ouvrir tableau de bord | Les derniers eleves ajoutes sont visibles | A tester |

## 14. Tests sauvegarde et restauration

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-090 | Critique | Sauvegarde manuelle | Connecte admin | Lancer une sauvegarde | Message de confirmation et fichier de sauvegarde date | A tester |
| REC-091 | Critique | Procedure de restauration documentee | Sauvegarde disponible | Consulter la documentation de restauration | Les etapes de restauration sont comprehensibles | A tester |
| REC-092 | Haute | Emplacement sauvegarde documente | Sauvegarde disponible | Verifier le chemin ou dossier de sauvegarde | L'emplacement est clair pour l'administrateur | A tester |
| REC-093 | Moyenne | Sauvegarde automatique si disponible | Fonction activee si developpee | Verifier la presence d'une sauvegarde quotidienne | Une sauvegarde recente existe ou la fonction est marquee hors V1 | A tester |

## 15. Tests non fonctionnels

| ID | Priorite | Test | Preconditions | Etapes | Resultat attendu | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| REC-100 | Critique | Interface en francais | Application lancee | Parcourir les ecrans principaux | Les libelles principaux sont en francais | A tester |
| REC-101 | Haute | Simplicite d'usage | Utilisateur non technique | Realiser creation classe + eleve + recherche | Parcours realisable sans formation longue | A tester |
| REC-102 | Haute | Performance recherche | Base de test representative | Rechercher un eleve | Resultat en quelques secondes | A tester |
| REC-103 | Critique | Mots de passe non visibles | Utilisateurs crees | Verifier stockage/affichage des mots de passe | Les mots de passe ne sont pas visibles en clair dans l'interface | A tester |
| REC-104 | Critique | Droits differencies | Comptes de roles differents | Comparer les actions autorisees | Les droits respectent la PRD | A tester |
| REC-105 | Haute | Redemarrage application | Donnees creees | Redemarrer application ou serveur local | Les donnees sont conservees | A tester |

## 16. Points ouverts a arbitrer avant ou pendant developpement

Ces points ne bloquent pas la recette, mais doivent etre documentes avant livraison :

| ID | Point | Decision attendue |
| --- | --- | --- |
| PO-001 | Liste exacte des classes | Confirmer les classes a parametrer au lancement |
| PO-002 | Matricule absent dans un import | Bloquer la ligne ou generer un identifiant temporaire |
| PO-003 | Suppression eleve | Confirmer archivage seul ou suppression admin |
| PO-004 | Photo eleve | Validee optionnelle, unique, recadree et compressee |
| PO-005 | Droits du secretariat sur commentaires | Lecture seule, modification ou archivage |
| PO-006 | Visibilite commentaires entre instructeurs | Visible par tous les instructeurs de la classe ou seulement par auteur/direction |
| PO-007 | Date de verification statut scolarite | Ajouter ou non une date de derniere verification |
| PO-008 | Stockage et sauvegarde | Confirmer choix technique et emplacement |

## 17. Synthese de validation

Cette section sera remplie pendant la recette.

| Domaine | Nombre tests | OK | KO | Bloque | Commentaire |
| --- | ---: | ---: | ---: | ---: | --- |
| Prise en main | 4 | 0 | 0 | 0 |  |
| Classes et instructeurs | 5 | 0 | 0 | 0 |  |
| Eleves et fiches | 8 | 0 | 0 | 0 |  |
| Import Excel | 10 | 0 | 0 | 0 |  |
| Completude donnees | 4 | 0 | 0 | 0 |  |
| Commentaires | 6 | 0 | 0 | 0 |  |
| Recherche et filtres | 6 | 0 | 0 | 0 |  |
| Exports Excel | 7 | 0 | 0 | 0 |  |
| Tableau de bord | 5 | 0 | 0 | 0 |  |
| Sauvegarde | 4 | 0 | 0 | 0 |  |
| Non fonctionnel | 6 | 0 | 0 | 0 |  |

## 18. Decision de recette

Decision finale a renseigner apres execution :

- `Recette acceptee` ;
- `Recette acceptee avec reserves` ;
- `Recette refusee`.

Commentaires Ams :

```text
A completer pendant la recette.
```
