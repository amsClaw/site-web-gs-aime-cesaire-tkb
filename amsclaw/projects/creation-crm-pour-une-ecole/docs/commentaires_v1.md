# Commentaires recette V1

Objectif :
centraliser les retours d'Ams apres les premiers tests de la V1 locale, puis decider ce qui doit etre corrige, ameliore, reporte ou refuse.

Principe important :
chaque remarque sera analysee avant d'etre transformee en developpement. Je dois challenger la demande pour eviter d'alourdir la V1, de sortir du besoin prioritaire ou de creer une complexite inutile.

## Mode d'utilisation

- Ajouter un commentaire par bloc.
- Garder les commentaires meme apres traitement.
- Ne pas passer directement de `Nouveau` a `A developper` sans analyse.
- Prioriser ce qui bloque vraiment l'utilisation terrain.
- Distinguer bug, ergonomie, besoin metier et idee d'evolution.

## Statuts possibles

- Nouveau
- A clarifier
- A challenger
- Valide pour correction
- Valide pour evolution
- Reporte V2
- Refuse
- Traite

## Types possibles

- Bug bloquant
- Bug non bloquant
- Ergonomie
- Donnee manquante
- Regle metier
- Import / export
- Droit utilisateur
- Performance
- Documentation
- Idee V2

## Niveaux de priorite

- P0 : bloque la recette ou empeche l'usage principal.
- P1 : important pour utiliser correctement la V1.
- P2 : utile mais contournable.
- P3 : confort, optimisation ou evolution future.

## Grille d'analyse amsClaw

Pour chaque commentaire, je dois verifier :

- Est-ce un bug ou une preference d'utilisation ?
- Est-ce indispensable pour la V1 ?
- Quel est le risque si on ne le fait pas maintenant ?
- Existe-t-il une solution plus simple ?
- Est-ce coherent avec le perimetre valide de la PRD V1 ?
- Est-ce que cela ajoute une dependance, une regle ou un ecran supplementaire ?
- Quelle preuve de test permettra de dire que le point est traite ?

## Commentaire 1

Statut : Traite

Type : Regle metier

Priorite : P1

Ecran / parcours concerne : classes

Commentaire Ams : il n'est pas possible de supprimer ou modifier le classes créer. pareil pour les utilisateurs. est ce que ca créerai des pb de pouvoir les supprimer ? n'hésite pas à me challenger. Info complementaire chauqe classe à un instututeur principal, c'est celui qu'on definit pour le moment sur les classes, on verra les prochaines versions mais pour le college et lycée en plus du principal il y'aura des professeurs par matieres. je te laisse me poser des questions et challenger le point

Impact constate : une erreur de saisie sur une classe ou un utilisateur ne peut pas etre corrigee depuis l'interface. Cela bloque le parametrage propre de la base avant usage reel.

Resultat attendu : pouvoir modifier les classes et les utilisateurs depuis l'interface. Pour la suppression, privilegier l'archivage/desactivation en V1 plutot que la suppression definitive.

Question / challenge amsClaw : je recommande de ne pas ajouter de suppression definitive en V1 pour les classes et utilisateurs, sauf cas tres limite. Supprimer une classe peut casser l'historique des eleves, les imports, les exports et les droits des instructeurs. Supprimer un utilisateur peut rendre orphelins des commentaires ou des rattachements de classe. L'option simple et plus fiable est : modifier les informations, archiver/desactiver, et masquer les elements archives dans les nouvelles saisies.

Decision : valide par Ams le 2026-06-14. V1.1 = ajouter modification + archivage/desactivation des classes et utilisateurs. Pas de suppression definitive dans l'interface courante. Les classes peuvent etre creees sans instructeur principal. Les classes archivees restent visibles dans la liste des archives. Les noms des utilisateurs desactives restent conserves sur les anciens commentaires et rattachements. Les professeurs par matiere sont reportes en V2.

Traitement realise : analyse initiale faite le 2026-06-14. Arbitrage Ams recu. Developpement V1.1 realise : modification et archivage/desactivation depuis l'interface, sans suppression definitive. L'interface permet maintenant de modifier les classes, d'archiver/restaurer leur statut, de modifier les utilisateurs, de les activer/desactiver et de changer leur mot de passe sans changer leur identifiant.

Test de validation : OK via `npm test` le 2026-06-14. Le test navigateur couvre creation classe, modification et archivage classe, creation utilisateur, modification et desactivation utilisateur, creation manuelle eleve, commentaire, import Excel et sauvegarde.

Questions a trancher :

- Une classe doit-elle avoir exactement un instructeur principal obligatoire, ou peut-elle etre creee sans instructeur au depart ?
- Quand une classe est archivee, veux-tu qu'elle reste visible dans la liste des classes avec badge `archivee`, ou qu'elle soit masquee par defaut avec un filtre `Afficher archives` ?
- Pour un utilisateur desactive, doit-on conserver son nom sur les anciens commentaires et anciennes classes ? Ma recommandation : oui.
- Faut-il permettre de changer l'identifiant de connexion d'un utilisateur, ou seulement son nom, role, mot de passe et statut ? Ma recommandation : ne pas changer l'identifiant en V1 pour eviter les confusions.
- Pour college/lycee, je recommande de garder en V1 un seul champ `instructeur principal` et de reporter les professeurs par matiere en V2, sinon on ouvre un module pedagogique plus large.

## Commentaire 2

Statut : Traite

Type : Ergonomie

Priorite : P2

Ecran / parcours concerne : Classes et Utilisateurs

Commentaire Ams : l'affichage est un peu trop rigide sur les ecrans Classes et Utilisateurs avec les nouvelles fonctions d'archivage, et pas tres responsive.

Impact constate : le rendu en tableau editable devient dense avec les champs de modification, le statut archive/desactive et les actions. Sur petit ecran, l'usage est moins confortable.

Resultat attendu : rendre ces deux ecrans plus souples, plus lisibles et mieux adaptes aux tailles d'ecran, sans ajouter de complexite metier.

Question / challenge amsClaw : je ne recommande pas de creer tout de suite un ecran separe `Archives`, car cela ajoute une navigation et une logique supplementaires. Pour la V1, le meilleur compromis est de garder une seule liste, avec cartes lisibles, badges de statut et actions visibles.

Decision : traiter en amelioration ergonomique V1.1. Garder les memes fonctionnalites, mais remplacer le tableau editable par des cartes de gestion responsives.

Traitement realise : les ecrans Classes et Utilisateurs utilisent maintenant une mise en page en cartes, avec badge de statut, informations principales en en-tete, champs en grille responsive et bouton d'enregistrement aligne.

Test de validation : OK via `npm test` le 2026-06-14. Controle navigateur Playwright OK en desktop 1366px et mobile 390px : cartes Classes et Utilisateurs visibles, sans debordement horizontal.

## Commentaire 3

Statut : Traite

Type : Ergonomie

Priorite : P2

Ecran / parcours concerne : Classes

Commentaire Ams : le champ `Niveau` dans la creation des classes n'est pas assez clair.

Impact constate : le terme peut etre compris comme cycle scolaire, niveau exact ou nom complet de classe, alors que le nom de classe contient deja souvent `6eme A`, `CP1 A` ou equivalent.

Resultat attendu : rendre le libelle plus clair pour l'utilisateur.

Question / challenge amsClaw : pour la V1, renommer le libelle visible en `Cycle` est plus simple que d'ajouter une nouvelle regle metier. Cela garde le champ optionnel, sans impact sur les droits ni sur les eleves existants.

Decision : valide par Ams le 2026-06-14. Le champ visible devient `Cycle`, avec usage recommande : `Maternelle`, `Primaire`, `College`, `Lycee`.

Traitement realise : libelle interface renomme en `Cycle`, export effectifs renomme en colonne `Cycle`, documentation PRD et cahier de recette alignee. Le nom technique interne reste `level` pour eviter une migration inutile en V1.

Test de validation : OK via `npm test` le 2026-06-14. Le test couvre le flux de creation/modification classe et confirme que le renommage visible ne casse pas les traitements existants.

## Commentaire 4

Statut : Traite

Type : Ergonomie

Priorite : P2

Ecran / parcours concerne : Classes

Commentaire Ams : renommer `Instructeurs rattaches` et mettre le cycle sous forme de liste de selection avec les quatre choix vus ensemble.

Impact constate : le libelle `Instructeurs rattaches` est trop technique et laisse penser que plusieurs enseignants sont geres en V1. Le champ `Cycle` en saisie libre peut creer des valeurs incoherentes.

Resultat attendu : afficher `Instructeur principal` et proposer une liste de selection pour le cycle.

Question / challenge amsClaw : rester sur un seul instructeur principal en V1 est plus coherent avec l'arbitrage precedent. Les professeurs multiples par matiere restent reportes en V2.

Decision : valide par Ams le 2026-06-14. Le cycle propose `Maternelle`, `Primaire`, `College`, `Lycee`. L'instructeur principal reste optionnel.

Traitement realise : l'ecran Classes utilise maintenant un select `Cycle` et un select `Instructeur principal`, en conservant la compatibilite technique avec les rattachements existants.

Test de validation : OK via `npm test` le 2026-06-14. Le test navigateur couvre la creation de classe avec cycle en liste, le rattachement d'un instructeur principal, puis la conservation de ce rattachement apres desactivation de l'utilisateur.

## Commentaire 5

Statut : Traite

Type : Fonctionnel / Ergonomie

Priorite : P2

Ecran / parcours concerne : Eleves / fiche eleve

Commentaire Ams : ajouter la possibilite de rattacher une seule photo a la fiche de l'eleve, affichee en cercle, avec choix de centrage apres chargement et compression a l'enregistrement pour eviter les images lourdes.

Impact constate : la fiche eleve est fonctionnelle, mais l'identification visuelle rapide manque pour un usage reel en ecole.

Resultat attendu : photo optionnelle unique sur la fiche eleve, apercu rond dans la fiche et la liste, recadrage simple avant sauvegarde, stockage compresse.

Question / challenge amsClaw : fonctionnalite pertinente seulement apres validation des ecrans Eleves, Classes et Utilisateurs, car elle ajoute de la complexite de stockage. Ne pas stocker l'original, ne pas gerer de galerie, ne pas rendre la photo obligatoire en V1.

Decision : valide par Ams le 2026-06-14 apres fin de recette des ecrans Eleves, Classes et Utilisateurs. Scope retenu : une seule photo optionnelle, compressee et recadree simplement.

Traitement realise : ajout d'un champ photo sur la fiche eleve, selection image, apercu circulaire, reglages de zoom et de centrage horizontal/vertical, compression canvas en image carree avant enregistrement, affichage en rond dans la liste et la fiche. Le serveur controle le format et refuse une image compressee trop lourde.

Test de validation : tests automatises mis a jour pour verifier la persistence d'une photo eleve via API et via parcours navigateur.

Retour recette Ams : apres chargement d'une photo, l'interface doit etre plus aeree. Retirer la phrase explicative et masquer le bouton `Choisir une photo` tant qu'une photo existe ; le bouton reapparait uniquement apres suppression.

Traitement realise : phrase retiree, bouton de choix masque apres chargement ou sur fiche avec photo existante, bouton de choix reactive apres suppression. Test navigateur complete pour verifier ce comportement.

## Commentaire 6

Statut : Traite

Type : Exploitation / Ergonomie

Priorite : P1

Ecran / parcours concerne : Restauration des donnees

Commentaire Ams : la restauration par commandes Terminal est trop compliquee. Besoin d'un script simple permettant de selectionner la sauvegarde a restaurer.

Impact constate : la procedure documentee est techniquement correcte mais pas assez accessible pour un administrateur non technique.

Resultat attendu : restauration guidée, sans saisie de commandes manuelles.

Decision : ajouter un script macOS double-cliquable, en conservant une confirmation avant remplacement des donnees.

Traitement realise : creation de `RESTAURER_SAUVEGARDE_MAC.command`. Le script liste les sauvegardes, detecte si le serveur tourne, propose de l'arreter, demande la sauvegarde a restaurer, cree une copie de securite de l'etat courant, remplace `data/app-data.json`, puis propose de relancer le CRM.

Test de validation : controle syntaxique `bash -n` OK. Test d'ouverture avec annulation OK. Test de selection d'une sauvegarde puis annulation a la confirmation OK.

## Commentaire 7

Statut : Traite

Type : Exploitation / Securite donnees

Priorite : P1

Ecran / parcours concerne : Reinitialisation des donnees

Commentaire Ams : besoin d'un moyen simple pour supprimer toutes les donnees du CRM.

Impact constate : la suppression manuelle de `data/app-data.json` ou son remplacement par commande Terminal est trop risquee pour un usage non technique.

Resultat attendu : permettre de repartir sur une base vide avec confirmation forte et sauvegarde automatique avant reset.

Decision : ajouter un script macOS double-cliquable `REINITIALISER_DONNEES_MAC.command`, sans bouton dans l'interface V1 pour eviter les suppressions accidentelles.

Traitement realise : creation de `REINITIALISER_DONNEES_MAC.command`. Le script detecte le serveur, propose de l'arreter, demande deux confirmations dont la saisie exacte `VIDER TOUT`, cree une sauvegarde `pre-reset-current-<date>.json`, vide `data/app-data.json`, conserve les anciennes sauvegardes, puis propose de relancer le CRM.

Test de validation : controle syntaxique `bash -n` OK. Test d'ouverture avec annulation OK. Test de confirmation partielle avec annulation OK.

Retour test Ams : apres reinitialisation, deux classes de demonstration etaient recreees automatiquement au redemarrage.

Correction : le serveur ne recree plus de classes de demonstration au demarrage. Apres reinitialisation, seuls les comptes de connexion de test sont recréés afin de permettre l'acces a l'application.

## Retour V1 - Script d'arret serveur

Priorite : P2

Ecran / parcours concerne : lancement et arret local

Commentaire Ams : besoin d'un moyen simple pour arreter le serveur CRM sans commande Terminal.

Resultat attendu : disposer d'un script macOS double-cliquable pour arreter le serveur local.

Traitement realise : creation de `ARRETER_CRM_MAC.command`. Le script detecte le serveur sur le port `8791`, demande confirmation, arrete le processus, puis confirme l'arret ou indique que le CRM etait deja arrete.

## Retour V1 - Scripts Windows

Priorite : P2

Ecran / parcours concerne : lancement, arret, restauration et reinitialisation locale

Commentaire Ams : besoin de pouvoir copier le CRM sur un PC Windows et d'avoir des scripts clairement differencies entre Mac et Windows.

Resultat attendu : disposer de scripts visibles a la racine pour Mac et Windows, avec des noms explicites.

Traitement realise : les scripts Mac sont renommes avec suffixe `_MAC.command`. Les scripts Windows `LANCER_CRM_WINDOWS.bat`, `ARRETER_CRM_WINDOWS.bat`, `RESTAURER_SAUVEGARDE_WINDOWS.bat` et `REINITIALISER_DONNEES_WINDOWS.bat` sont ajoutes a la racine. Les actions complexes Windows utilisent des helpers Node dans `scripts/`.

## Retour V1 - Installation packages nouvelle machine

Priorite : P2

Ecran / parcours concerne : preparation d'un Mac ou PC Windows avant utilisation

Commentaire Ams : besoin d'un script qui verifie si les packages necessaires au CRM sont installes et les installe si besoin via invite de commande ou Terminal.

Resultat attendu : disposer d'un script visible a la racine pour preparer une nouvelle machine avant de lancer le CRM.

Traitement realise : creation de `INSTALLER_PACKAGES_CRM_MAC.command` et `INSTALLER_PACKAGES_CRM_WINDOWS.bat`. Les scripts verifient Node.js, npm et les dependances CRM, installent les dependances avec `npm install`, puis controlent les packages principaux `express`, `multer` et `exceljs`. L'installation automatique de Node.js est proposee uniquement si Homebrew est disponible sur Mac ou `winget` sur Windows.

## Retour V1 - Guide utilisateur HTML

Priorite : P1

Ecran / parcours concerne : prise en main complete du CRM

Commentaire Ams : besoin d'un guide utilisateur HTML pour une personne sans competence informatique, menu par menu, avec illustrations et exemple de workflow.

Resultat attendu : disposer d'un guide ouvrable dans un navigateur et maintenu au fur et a mesure des evolutions du CRM.

Traitement realise : creation de `docs/GUIDE_UTILISATEUR_CRM.html` avec explication des menus Tableau de bord, Eleves, Classes, Utilisateurs, Import / Export et Sauvegarde. Des captures d'ecran reelles sont ajoutees dans `docs/guide-utilisateur-assets/`. Le guide contient aussi un workflow conseille pour demarrer une nouvelle annee et une section de maintenance indiquant qu'il doit etre mis a jour a chaque evolution visible.

## Validation Ams - Tests V1

Statut : Valide

Type : Recette utilisateur

Priorite : P1

Ecran / parcours concerne : V1 complete

Retour Ams : tests V1 OK de mon cote.

Decision : validation utilisateur confirmee par Ams le 2026-06-17. La V1 reste le socle actif pour usage terrain.

Traitement realise : creation d'un point de reprise apres validation utilisateur : `data/backups/crm-ecole-backup-2026-06-17T14-19-35-955Z.json`.

Prochaine action : preparer l'utilisation terrain avec les donnees reelles, surveiller les retours bloquants et n'ouvrir une V1.1 courte qu'apres observation concrete.

## Retour V1 - Ergonomie fiche eleve sur mobile

Statut : Traite

Type : Ergonomie

Priorite : P1

Ecran / parcours concerne : Eleves / fiche eleve sur petit ecran

Commentaire Ams : l'affichage n'est pas top sur le menu eleves ; la fiche eleve ne s'affiche qu'en toute fin de liste.

Impact constate : sur mobile ou petit ecran, la liste eleves peut etre longue et la fiche detaillee devient difficile a atteindre apres selection.

Resultat attendu : rendre la fiche eleve accessible immediatement, sans obliger l'utilisateur a descendre apres toute la liste.

Question / challenge amsClaw : je recommande de ne pas creer un nouvel ecran complet pour la V1. La correction la plus simple est de conserver le mode liste + fiche sur ordinateur, mais de placer la fiche avant la liste sur petit ecran et de scroller automatiquement vers la fiche quand un eleve est ouvert.

Decision : traiter comme correction ergonomique V1. La fiche eleve remonte avant la liste sur mobile/tablette, et l'action `Ouvrir` positionne l'ecran directement sur la fiche.

Traitement realise : ajout d'une classe de layout eleves, ordre mobile de la fiche avant la liste, scroll automatique sur petit ecran, titre de fiche plus explicite avec nom/prenom de l'eleve, correction du cas `Nouvel eleve` pour passer par le rendu standard, et mise a jour des versions CSS/JS dans `src/index.html` pour forcer le rechargement sur iPhone.

Test de validation : OK via `npm test` le 2026-06-19. Le test E2E verifie que sur viewport mobile, la fiche eleve est affichee avant la liste apres ouverture d'un eleve.

Retour test Ams : test OK le 2026-06-20.

## Retour V1 - Durcissement droits serveur et sauvegarde automatique

Statut : Traite

Type : Securite / Exploitation

Priorite : P1

Ecran / parcours concerne : connexion, roles utilisateurs, exports, sauvegarde

Contexte : Ams valide la recommandation de continuer le developpement conforme PRD par le durcissement V1 plutot que par des modules hors perimetre.

Decision : ajouter une session serveur apres connexion, envoyer un jeton depuis le navigateur, bloquer les endpoints API selon les roles PRD, transformer les exports en boutons authentifies et creer une sauvegarde automatique au premier demarrage du jour.

Traitement realise : droits serveur admin/secretariat/instructeur, etat applicatif filtre pour instructeur, commentaires limites aux eleves accessibles, imports/exports reserves admin/secretariat, sauvegarde reservee admin, sauvegarde automatique quotidienne au demarrage.

Test de validation : OK via `npm test` le 2026-06-20. Le smoke test verifie aussi qu'un instructeur ne peut pas exporter ni modifier administrativement un eleve.

## Validation utilisateurs - V1 stable

Statut : Valide

Type : Recette utilisateurs distants

Priorite : P1

Ecran / parcours concerne : V1 complete

Retour Ams : test valide par les utilisateurs ; la version est stable et validee.

Decision : considerer la version courante comme V1 stable de reference. Les developpements peuvent continuer, mais sous forme de V1.1 courte, cadree et testable.

Traitement realise : creation du point de reprise `data/backups/crm-ecole-stable-utilisateurs-2026-06-20.json` et mise a jour du suivi projet.

Prochaine action : cadrer les evolutions V1.1 a partir des retours utilisateurs valides, sans degrader la V1 stable.

## Evolution V1.1 - Fiche eleve imprimable

Statut : Traite

Type : V1.1 courte

Priorite : P1

Ecran / parcours concerne : Eleves / fiche eleve

Contexte : Ams valide la poursuite des developpements apres V1 stable, sans autre retour utilisateur immediat.

Decision : commencer par une fiche eleve imprimable, utile pour l'usage papier de l'ecole et sans modification du modele de donnees.

Traitement realise : ajout d'un bouton `Imprimer la fiche` sur la fiche eleve, generation d'une fiche imprimee dediee avec identite, classe, responsables, suivi administratif, note et derniers commentaires internes. La feuille d'impression masque la navigation et les formulaires.

Test de validation : `npm test` OK le 2026-06-20. Le test E2E verifie la presence des informations cles et le declenchement de `window.print()`.

Prochaine action : faire tester l'impression sur 2 ou 3 eleves reels.

Retour test Ams : test KO le 2026-06-20. La fiche s'affiche sur le quart de la premiere page et genere 9 pages vides.

Correction realisee : remplacement du mode impression base sur `visibility:hidden` par une sortie d'impression isolee. Le CRM clone uniquement la fiche imprimable dans un conteneur temporaire `#print-output`, masque completement l'application pendant l'impression, puis nettoie la sortie apres impression.

Test de correction : `npm test` OK. PDF de controle genere via Playwright : 1 page reelle detectee.

Retour test Ams apres correction : test OK le 2026-06-20.

Decision : correction d'impression validee.

## Anomalie V1.1 - Bouton verification scolarite peu visible et sans effet

Statut : Traite

Type : Anomalie recette V1.1

Priorite : P1

Ecran / parcours concerne : Eleves / fiche eleve / suivi scolarite

Retour Ams : le bouton `Marquer scolarite verifiee` ne ressemble pas a un bouton, et le changement attendu apres clic n'est pas clair.

Analyse : le bouton utilisait le style secondaire, trop discret pour une action metier importante. Plus grave, le front appelait bien `POST /api/students/:id/verify-status`, mais la route serveur correspondante etait absente. Le clic ne pouvait donc pas persister la date de verification.

Resultat attendu : le bouton doit etre visible comme une action principale. Apres clic, la fiche eleve doit afficher `Derniere verification scolarite` avec la date et l'heure du moment. La date doit aussi rester disponible dans l'impression et l'export Excel.

Traitement realise : passage du bouton en style principal, affichage permanent du bloc `Derniere verification scolarite` avec `Non verifiee` avant premier clic, ajout de la route serveur `POST /api/students/:id/verify-status`, persistence de `schoolStatusCheckedAt`, et ajout d'un controle dans le smoke test.

Test de validation : OK via `npm test` le 2026-06-20.
