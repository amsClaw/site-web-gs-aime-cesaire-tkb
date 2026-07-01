# Création CRM pour une école

## Objectif

Créer un CRM pour l'école GS AIME CESAIRE TKB en Guinée Conakry.

## Statut

V1 stable validee par les utilisateurs - developpements suivants ouverts

## Prochaine action

Choisir la prochaine petite evolution V1.1 a traiter, en gardant la V1 stable comme reference.

## Perimetre V1

- Gestion des eleves.
- Import Excel de liste eleves avec controles avant validation, import partiel et indicateur de donnees a completer.
- Fiche eleve avec statut de scolarite simple.
- Fiche eleve avec parent 1 et parent 2.
- Photo optionnelle unique sur la fiche eleve, avec recadrage simple et compression.
- Commentaires internes de suivi eleve.
- Gestion des classes avec rattachement possible d'instructeurs.
- Recherche eleve.
- Tableau de bord simple.
- Exports Excel des listes essentielles.
- Utilisateurs et permissions simples.
- Sauvegarde et restauration documentees.

## Methode projet

1. Ideation avec Ams pour transformer l'idee initiale en besoin clair.
2. Redaction d'une expression de besoin courte.
3. Validation de l'expression de besoin par Ams.
4. Redaction d'une PRD soumise a validation.
5. Creation d'un cahier de recette a partir de la PRD validee.
6. Developpement autonome de la V1.
7. Passage des tests et de la recette technique.
8. Livraison de la V1 a Ams avec bilan.
9. Validation utilisateur V1.
10. Usage terrain puis arbitrage V1.1 si necessaire.

## Organisation

```text
docs/
src/
data/
scripts/
tests/
reports/
archive/
```

## Lancement ou utilisation

V1 locale disponible.

Avant le premier lancement sur une nouvelle machine, verifier et installer les packages :

Depuis Finder sur Mac :

```text
Double-cliquer sur INSTALLER_PACKAGES_CRM_MAC.command
```

Depuis Windows :

```text
Double-cliquer sur INSTALLER_PACKAGES_CRM_WINDOWS.bat
```

Depuis Finder sur Mac :

```text
Double-cliquer sur LANCER_CRM_MAC.command
```

Pour autoriser les autres appareils du meme reseau local a acceder au CRM depuis le Mac serveur :

```text
Double-cliquer sur LANCER_CRM_RESEAU_MAC.command
```

Depuis le dossier projet :

```sh
./LANCER_CRM_MAC.command
```

Depuis Windows :

```text
Double-cliquer sur LANCER_CRM_WINDOWS.bat
```

Pour autoriser les autres appareils du meme reseau local a acceder au CRM depuis le PC serveur :

```text
Double-cliquer sur LANCER_CRM_RESEAU_WINDOWS.bat
```

Depuis le workspace :

```sh
./amsclaw/projects/creation-crm-pour-une-ecole/scripts/launch-v1.sh
```

URL :

```text
http://127.0.0.1:8791
```

En mode reseau local, utiliser l'adresse affichee par le script sur les autres appareils, par exemple :

```text
http://adresse-ip-du-serveur:8791
```

Pour une session courte de test distant via Cloudflare Tunnel depuis le Mac :

```text
1. Double-cliquer sur LANCER_CRM_MAC.command
2. Double-cliquer sur LANCER_TUNNEL_CLOUDFLARE_MAC.command
3. Envoyer au testeur l'URL https://...trycloudflare.com affichee par Cloudflare
```

Ce mode est reserve aux demonstrations et recettes courtes. Fermer la fenetre du tunnel coupe l'acces distant.

Pour arreter le tunnel, fermer la fenetre Terminal ouverte par `LANCER_TUNNEL_CLOUDFLARE_MAC.command` ou utiliser `Ctrl + C` dans cette fenetre. Cela coupe le lien public Cloudflare, mais n'arrete pas forcement le CRM local s'il tourne dans une autre fenetre.

Pour arreter le CRM depuis Finder :

```text
Double-cliquer sur ARRETER_CRM_MAC.command
```

Pour arreter le CRM depuis Windows :

```text
Double-cliquer sur ARRETER_CRM_WINDOWS.bat
```

Runbook : `docs/RUNBOOK_V1.md`

Guide utilisateur non technique : `docs/GUIDE_UTILISATEUR_CRM.html`

Scripts utiles :

- `INSTALLER_PACKAGES_CRM_MAC.command` : verifier Node.js/npm et installer les dependances CRM sur Mac.
- `LANCER_CRM_MAC.command` : lancer le CRM local sur Mac.
- `LANCER_CRM_RESEAU_MAC.command` : lancer le CRM sur Mac pour les appareils du meme reseau local.
- `LANCER_TUNNEL_CLOUDFLARE_MAC.command` : ouvrir un lien Cloudflare temporaire pour une recette distante courte.
- `ARRETER_CRM_MAC.command` : arreter le CRM local sur Mac.
- `RESTAURER_SAUVEGARDE_MAC.command` : restaurer une sauvegarde existante sur Mac.
- `REINITIALISER_DONNEES_MAC.command` : vider les donnees courantes sur Mac avec sauvegarde automatique avant reset.
- `INSTALLER_PACKAGES_CRM_WINDOWS.bat` : verifier Node.js/npm et installer les dependances CRM sur Windows.
- `LANCER_CRM_WINDOWS.bat` : lancer le CRM local sur Windows.
- `LANCER_CRM_RESEAU_WINDOWS.bat` : lancer le CRM sur Windows pour les appareils du meme reseau local.
- `ARRETER_CRM_WINDOWS.bat` : arreter le CRM local sur Windows.
- `RESTAURER_SAUVEGARDE_WINDOWS.bat` : restaurer une sauvegarde existante sur Windows.
- `REINITIALISER_DONNEES_WINDOWS.bat` : vider les donnees courantes sur Windows avec sauvegarde automatique avant reset.

## Decisions importantes

- 2026-06-13 : projet cree depuis le modele du dashboard amsClaw.
- 2026-06-13 : Ams valide une approche en etapes : ideation, expression de besoin, PRD, cahier de recette, developpement V1 autonome, tests, livraison.
- 2026-06-13 : Ams fournit un premier besoin brut dans `docs/mon_besoin.md`; l'expression de besoin est structuree avec une recommandation de V1 limitee au socle eleves, classes, recherche, tableau de bord et exports.
- 2026-06-13 : Ams precise que le CRM ne doit pas gerer les paiements ; il doit seulement indiquer si l'eleve est a jour dans sa scolarite.
- 2026-06-13 : Ams ajoute le besoin d'une section commentaires sur chaque fiche eleve, mise a jour par les instructeurs autorises.
- 2026-06-13 : Ams valide l'expression de besoin avec un ajustement : ajouter une fonction d'import de liste eleves par Excel et conserver une fonction d'export Excel.
- 2026-06-13 : PRD V1 redigee dans `docs/PRD_V1.md` et soumise a validation Ams.
- 2026-06-14 : Ams demande d'ajouter un workflow de prise en main a la PRD pour visualiser l'ordre des actions, les dependances, les roles et les types de saisies.
- 2026-06-14 : creation de `docs/COMMENTAIRES_PRD.md` pour permettre a Ams de centraliser ses remarques avant validation ou nouvelle version de la PRD.
- 2026-06-14 : integration des commentaires PRD d'Ams apres analyse de `docs/liste_eleve.xlsx` : instructeurs geres comme utilisateurs rattaches aux classes, import Excel partiel avec badge `donnees a completer`, ajout de `parent 2` sur la fiche eleve.
- 2026-06-14 : creation de `docs/TOKENS_USAGE.md` pour suivre simplement l'usage tokens du projet sans integration dashboard.
- 2026-06-14 : Ams valide la PRD V1 ; prochaine etape : produire le cahier de recette V1.
- 2026-06-14 : cahier de recette V1 produit dans `docs/CAHIER_RECETTE_V1.md` a partir de la PRD validee.
- 2026-06-14 : Ams valide le cahier de recette V1 ; prochaine etape : demarrer le developpement autonome de la V1.
- 2026-06-14 : socle technique V1 implemente avec Node/Express, stockage JSON, interface web, import/export Excel, sauvegarde et smoke test.
- 2026-06-14 : correction du flux de creation manuelle d'eleve cote interface ; validation par test navigateur automatise Chrome et `npm test`.
- 2026-06-14 : creation de `docs/commentaires_v1.md` pour centraliser les retours de recette V1 et les challenger avant arbitrage.
- 2026-06-14 : arbitrage recette V1 sur classes/utilisateurs : modification et archivage/desactivation autorises, suppression definitive exclue de la V1, professeurs par matiere reportes en V2.
- 2026-06-14 : amelioration ergonomique des ecrans Classes et Utilisateurs : remplacement des tableaux editables par des cartes responsives avec badges de statut.
- 2026-06-14 : securisation du stockage JSON local avec ecriture atomique pour eviter une lecture de fichier vide pendant un enregistrement.
- 2026-06-14 : clarification du champ de creation/modification des classes : le libelle visible `Niveau` devient `Cycle` pour distinguer le cycle scolaire du nom de classe.
- 2026-06-14 : amelioration du parametrage des classes : `Instructeurs rattaches` devient `Instructeur principal` et le cycle passe en liste de selection.
- 2026-06-14 : ajout d'une photo optionnelle unique sur la fiche eleve, avec apercu rond, recadrage simple et compression avant stockage.
- 2026-06-14 : Ams valide les tests photo ; stabilisation finale V1 executee avec tests automatises, audit securite, exports Excel et sauvegarde manuelle verifiee.
- 2026-06-14 : script `RESTAURER_SAUVEGARDE_MAC.command` ajoute pour restaurer une sauvegarde sans commande Terminal.
- 2026-06-14 : Ams valide le test de restauration et valide officiellement la V1.
- 2026-06-14 : script `REINITIALISER_DONNEES_MAC.command` ajoute pour repartir sur une base vide avec sauvegarde automatique et confirmation forte.
- 2026-06-14 : script `ARRETER_CRM_MAC.command` ajoute pour arreter le serveur local sans commande Terminal.
- 2026-06-15 : scripts Mac renommes avec suffixe `_MAC` et scripts Windows `.bat` ajoutes a la racine du projet.
- 2026-06-15 : scripts `INSTALLER_PACKAGES_CRM_MAC.command` et `INSTALLER_PACKAGES_CRM_WINDOWS.bat` ajoutes pour preparer une nouvelle machine avant lancement.
- 2026-06-15 : guide utilisateur HTML ajoute dans `docs/GUIDE_UTILISATEUR_CRM.html`, avec captures d'ecran et workflow conseille. Il doit etre maintenu a chaque evolution visible du CRM.
- 2026-06-17 : Ams confirme que les tests V1 sont OK de son cote. Sauvegarde post-validation creee : `data/backups/crm-ecole-backup-2026-06-17T14-19-35-955Z.json`.
- 2026-06-19 : Ams confirme que les donnees sont chargees, que toutes les fonctions livrees testees sont conformes et qu'une sauvegarde post-chargement est creee : `data/backups/crm-ecole-backup-2026-06-19T16-17-41-810Z.json`.
- 2026-06-19 : ajout d'un mode de lancement reseau local Mac/Windows pour respecter l'exigence PRD d'acces depuis les appareils connectes au meme reseau local.
- 2026-06-19 : Ams valide la connexion au CRM depuis un iPhone sur le meme reseau Wi-Fi.
- 2026-06-19 : correction ergonomique du menu Eleves sur petit ecran : la fiche eleve s'affiche avant la liste et l'ouverture d'un eleve positionne l'ecran sur la fiche.
- 2026-06-20 : Ams valide le test du nouvel affichage Eleves sur iPhone.
- 2026-06-20 : durcissement V1 conforme PRD : sessions serveur, droits API par role, exports authentifies et sauvegarde automatique au premier demarrage du jour.
- 2026-06-20 : installation de Cloudflare Tunnel sur le Mac d'Ams et ajout d'un script de recette distante temporaire.
- 2026-06-20 : Ams confirme que le test distant est valide par les utilisateurs. La version courante devient la V1 stable de reference et les developpements suivants peuvent continuer sur une V1.1 courte.
- 2026-06-20 : Ams confirme qu'il n'y a pas d'autre retour utilisateur. Cadrage V1.1 cree dans `docs/CADRAGE_V1_1.md`. Prochaine evolution recommandee : fiche eleve imprimable.
- 2026-06-20 : fiche eleve imprimable V1.1 developpee avec bouton `Imprimer la fiche`, feuille d'impression dediee et test E2E. Prochaine action : tester l'impression sur 2 ou 3 eleves reels.
- 2026-06-20 : correction impression fiche eleve validee par Ams apres suppression des pages vides. Prochaine action : choisir la prochaine evolution V1.1 courte.

## Risques et points de vigilance

- Risque : perimetre trop large.
- Impact : ralentissement de l'execution.
- Mitigation : garder une V1 courte avec une prochaine action concrete.

## Notes

Projet initialise automatiquement depuis le dashboard.
