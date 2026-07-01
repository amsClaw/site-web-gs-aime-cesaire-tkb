# Runbook V1 - CRM ecole GS AIME CESAIRE TKB

Statut : premiere version technique

Date : 2026-06-14

## Objectif

Permettre de lancer, tester, sauvegarder et reprendre la V1 locale du CRM ecole.

Guide utilisateur pour les personnes non techniques :

```text
docs/GUIDE_UTILISATEUR_CRM.html
```

Ce guide doit etre mis a jour a chaque evolution visible du CRM : nouveau menu, bouton renomme, workflow modifie, changement d'ecran ou nouvelle procedure utilisateur.

## Socle technique

- Node.js
- Express
- Multer pour recevoir les fichiers Excel
- ExcelJS pour lire et generer les fichiers `.xlsx`
- Playwright pour tester les workflows navigateur bout en bout
- Stockage fichier JSON local : `data/app-data.json`

Dependances installees :

```sh
npm install
```

## Preparation d'une nouvelle machine

Utiliser cette procedure apres avoir copie le dossier CRM sur un autre Mac ou PC Windows.

Depuis Finder sur Mac :

```text
Double-cliquer sur INSTALLER_PACKAGES_CRM_MAC.command
```

Depuis Windows :

```text
Double-cliquer sur INSTALLER_PACKAGES_CRM_WINDOWS.bat
```

Les scripts :

- verifient que Node.js est disponible ;
- verifient que npm est disponible ;
- proposent d'installer Node.js si possible avec le gestionnaire standard de la machine ;
- installent les dependances CRM avec `npm install` ;
- verifient les packages principaux `express`, `multer` et `exceljs`.

Sur Mac, l'installation automatique de Node.js utilise Homebrew si Homebrew est deja installe.
Sur Windows, l'installation automatique de Node.js utilise `winget` si `winget` est disponible.
Si ces outils ne sont pas disponibles, installer Node.js manuellement depuis `https://nodejs.org`, puis relancer le script.

Audit securite realise :

```sh
npm audit --omit=dev
```

Resultat au 2026-06-14 : `found 0 vulnerabilities`.

## Lancement

Depuis Finder sur Mac :

```text
Double-cliquer sur LANCER_CRM_MAC.command
```

Pour un usage depuis les autres appareils du meme reseau local :

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

Pour un usage depuis les autres appareils du meme reseau local :

```text
Double-cliquer sur LANCER_CRM_RESEAU_WINDOWS.bat
```

Ou depuis le workspace :

```sh
./amsclaw/projects/creation-crm-pour-une-ecole/scripts/launch-v1.sh
```

URL locale :

```text
http://127.0.0.1:8791
```

URL reseau local :

```text
http://adresse-ip-du-serveur:8791
```

Les scripts reseau affichent l'adresse IP a utiliser depuis les autres appareils. Ce mode doit rester limite au reseau local de l'ecole et ne doit pas etre expose sur Internet.

## Test distant temporaire

Pour une demonstration ou une recette courte avec un testeur hors du reseau Wi-Fi :

```text
1. Double-cliquer sur LANCER_CRM_MAC.command
2. Double-cliquer sur LANCER_TUNNEL_CLOUDFLARE_MAC.command
3. Envoyer au testeur l'URL https://...trycloudflare.com affichee par Cloudflare
4. Fermer la fenetre du tunnel a la fin de la session
```

Ce mode depend du Mac d'Ams et de sa connexion Internet. Il doit rester temporaire et ne remplace pas un hebergement de production.

Pour arreter le tunnel, fermer la fenetre Terminal ouverte par `LANCER_TUNNEL_CLOUDFLARE_MAC.command` ou utiliser `Ctrl + C` dans cette fenetre. Cela coupe le lien public Cloudflare, mais n'arrete pas forcement le CRM local s'il tourne dans une autre fenetre.

## Arret

Depuis Finder sur Mac :

```text
Double-cliquer sur ARRETER_CRM_MAC.command
```

Depuis Windows :

```text
Double-cliquer sur ARRETER_CRM_WINDOWS.bat
```

Le script :

- detecte si le serveur CRM est lance sur le port `8791` ;
- demande confirmation avant arret ;
- arrete le serveur ;
- indique si le CRM etait deja arrete.

## Comptes de test

Mot de passe commun :

```text
demo2026
```

Comptes :

- `admin_test` : Administrateur / Direction
- `secretariat_test` : Secretariat
- `instructeur_test` : Instructeur

## Donnees

Fichier principal :

```text
data/app-data.json
```

Ce fichier contient :

- utilisateurs ;
- classes ;
- eleves ;
- commentaires ;
- photos eleves compressees en Base64 dans le champ `photoDataUrl` ;
- metadonnees.

## Import Excel

Le fichier `docs/liste_eleve.xlsx` est supporte.

Particularite constatee :

- la vraie ligne d'en-tete est en ligne 2 ;
- la V1 detecte automatiquement cette ligne ;
- si le fichier n'a pas de colonne classe, choisir une classe cible avant analyse ;
- les lignes importables mais incompletes sont marquees `donnees a completer`.

## Export Excel

Exports disponibles :

- eleves actifs ;
- eleves avec donnees a completer ;
- eleves non a jour ;
- effectifs par classe.

Les commentaires internes ne sont pas inclus dans les exports standards.

## Sauvegarde

Depuis l'interface, l'administrateur peut creer une sauvegarde manuelle.

Au premier demarrage de chaque jour, le CRM cree aussi une sauvegarde automatique dans le meme dossier. Cette sauvegarde sert de point de reprise simple si une erreur est detectee apres lancement.

Les sauvegardes sont creees dans :

```text
data/backups/
```

Format :

```text
crm-ecole-backup-<date>.json
crm-ecole-auto-<date>-<horodatage>.json
```

## Restauration

Depuis Finder sur Mac :

```text
Double-cliquer sur RESTAURER_SAUVEGARDE_MAC.command
```

Depuis Windows :

```text
Double-cliquer sur RESTAURER_SAUVEGARDE_WINDOWS.bat
```

Le script :

- detecte si le serveur CRM est encore lance ;
- propose de l'arreter ;
- affiche la liste des sauvegardes disponibles ;
- demande le numero de la sauvegarde a restaurer ;
- cree une copie de securite de l'etat actuel dans `data/backups/` ;
- remplace `data/app-data.json` par la sauvegarde choisie ;
- propose de relancer le CRM.

Procedure manuelle equivalente :

1. Arreter le serveur.
2. Copier le fichier de sauvegarde choisi.
3. Le renommer ou le remplacer en `data/app-data.json`.
4. Relancer le serveur.
5. Verifier la connexion et les donnees dans l'interface.

## Reinitialisation complete des donnees

Utiliser cette procedure seulement si tu veux repartir sur une base vide.

Depuis Finder sur Mac :

```text
Double-cliquer sur REINITIALISER_DONNEES_MAC.command
```

Depuis Windows :

```text
Double-cliquer sur REINITIALISER_DONNEES_WINDOWS.bat
```

Le script :

- detecte si le serveur CRM est encore lance ;
- propose de l'arreter ;
- demande une confirmation simple ;
- demande ensuite de taper exactement `VIDER TOUT` ;
- cree une sauvegarde de securite de l'etat actuel dans `data/backups/` ;
- remplace `data/app-data.json` par une base vide ;
- conserve les anciennes sauvegardes ;
- propose de relancer le CRM.

Au prochain lancement, le CRM recree seulement les comptes de connexion de demarrage.
Aucune classe ni aucun eleve n'est recree automatiquement.

Compte administrateur de test :

```text
admin_test / demo2026
```

## Tests

Suite de test :

```sh
npm test
```

Les tests verifient :

- demarrage serveur ;
- connexion `admin_test` ;
- lecture de l'etat applicatif ;
- creation manuelle d'un eleve depuis l'interface ;
- creation d'une classe ;
- creation d'un utilisateur ;
- creation d'un commentaire interne ;
- ajout, suppression et persistance d'une photo eleve compressee ;
- creation d'eleve par import Excel ;
- creation d'une sauvegarde ;
- export Excel des classes.

Journal du 2026-06-14 :

- correction du submit de creation eleve : identification du formulaire via `getAttribute("id")` pour eviter le conflit avec le champ cache `name="id"` ;
- installation de `playwright` en dependance de developpement ;
- installation locale de Chromium Playwright via `npx playwright install chromium` ;
- verification executee : `npm test` ;
- verification securite executee : `npm audit --omit=dev` ;
- resultat : `Smoke tests OK`, `E2E creation workflows OK`, `found 0 vulnerabilities`.
- stabilisation finale executee apres validation Ams de la photo : exports Excel verifies, sauvegarde manuelle creee et sauvegarde JSON relue avec succes.

## Points de vigilance

- L'authentification est simple et adaptee a une V1 locale, pas a une exposition Internet.
- Les droits sont principalement appliques cote interface ; avant toute mise en production exposee, il faudra durcir les controles serveur.
- La suppression definitive n'est pas implementee : l'archivage est privilegie.
- Le stockage JSON est simple et lisible, mais une base de donnees sera preferable si plusieurs postes modifient les donnees en meme temps.
