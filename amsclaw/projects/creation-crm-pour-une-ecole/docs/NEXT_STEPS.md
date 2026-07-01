# Prochaines etapes (mise a jour 2026-06-20)

## 5 evolutions V1.1 livrees

- Amelioration analyse import Excel
- Enrichissement tableau de bord direction
- Date derniere verification scolarite
- Archivage mieux encadre (confirmation + motif)
- Gestion commentaires (modification + archivage)

**Prochaine action :** Tester les 5 evolutions sur donnees reelles. - Création CRM pour une école

## Prochaine action immediate

Choisir la prochaine petite evolution V1.1 a traiter, en gardant la V1 stable comme reference.

## Actions suivantes

- Conserver le point de reprise V1 : `data/backups/crm-ecole-backup-2026-06-14T19-18-35-478Z.json`.
- Conserver aussi le point de reprise apres validation utilisateur Ams du 2026-06-17 : `data/backups/crm-ecole-backup-2026-06-17T14-19-35-955Z.json`.
- Conserver le point de reprise post-chargement des donnees du 2026-06-19 : `data/backups/crm-ecole-backup-2026-06-19T16-17-41-810Z.json`.
- Conserver le point de reprise V1 stable validee utilisateurs du 2026-06-20 : `data/backups/crm-ecole-stable-utilisateurs-2026-06-20.json`.
- Utiliser `docs/RUNBOOK_V1.md` comme guide d'exploitation locale.
- Lancer `LANCER_CRM_RESEAU_MAC.command` ou `LANCER_CRM_RESEAU_WINDOWS.bat` sur la machine serveur.
- Depuis un deuxieme appareil du meme reseau local, ouvrir l'adresse affichee par le script reseau. Test valide sur iPhone le 2026-06-19.
- Pour un testeur hors Wi-Fi, lancer `LANCER_CRM_MAC.command`, puis `LANCER_TUNNEL_CLOUDFLARE_MAC.command`, et transmettre l'URL temporaire affichee.
- Utiliser la V1 stable comme base de reference.
- Noter les retours terrain dans `docs/commentaires_v1.md`.
- Pour la V1.1 : limiter le scope aux ajustements vraiment necessaires, priorises et testables.
- Utiliser `docs/CADRAGE_V1_1.md` comme garde-fou avant chaque evolution V1.1.
- Ne pas ouvrir de V2 avant d'avoir observe l'utilisation reelle de la V1.

## Points a confirmer avec Ams

- Personnes qui utiliseront l'outil.
- Donnees deja disponibles : papier, Excel, photos, numeros parents.
- Classes exactes.
- Commentaires eleves : visibilite, droits de modification, suppression ou archivage.
- Regle de suppression ou archivage des eleves.
- Exemple reel ou fictif de fichier Excel eleves pour preparer le modele d'import.
- Regle a appliquer si un fichier Excel n'a pas de matricule : bloquer la ligne ou generer un identifiant temporaire.
- Commentaires ajoutes dans `docs/COMMENTAIRES_PRD.md` a integrer ou arbitrer si Ams en ajoute de nouveaux.
- Validation finale de la PRD V1 : faite le 2026-06-14.
- Validation du cahier de recette V1 : faite le 2026-06-14.
- Validation utilisateur V1 : faite le 2026-06-14.

## Risques a surveiller

- Perimetre trop large.
- Donnees ou acces terrain insuffisants.
- Complexite technique inutile.
- Import Excel trop permissif qui creerait des doublons ou des donnees incoherentes.

## Documentation technique

- Runbook V1 : `docs/RUNBOOK_V1.md`
- Application : `src/`
- Serveur : `scripts/server.js`
- Donnees locales : `data/app-data.json`
- Tests : `tests/smoke.mjs`

## Journal technique

- 2026-06-14 : correction de la creation manuelle d'eleve. Le bouton de fiche passe par la soumission du formulaire, le gestionnaire `submit` est capte au niveau `document`, le retour reste sur l'onglet `Eleves`, et le cache navigateur est force via la version du script.
- 2026-06-14 : controles executes : `npm test` et test navigateur automatise Chrome avec creation reelle d'un eleve sur donnees temporaires.
- 2026-06-14 : ajout d'une photo optionnelle unique sur la fiche eleve, avec apercu rond, recadrage simple, compression avant stockage et controles automatises API/navigateur.
- 2026-06-14 : tests photo valides par Ams, puis stabilisation finale V1 executee : `npm test`, `npm audit --omit=dev`, exports Excel, sauvegarde manuelle et lecture JSON de sauvegarde.
- 2026-06-14 : script `RESTAURER_SAUVEGARDE_MAC.command` ajoute pour restaurer une sauvegarde par selection, sans commande Terminal.
- 2026-06-15 : scripts Mac renommes avec suffixe `_MAC.command` et scripts Windows `.bat` ajoutes pour lancement, arret, restauration et reinitialisation.
- 2026-06-14 : restauration testee et validee par Ams ; V1 officiellement validee.
- 2026-06-17 : tests V1 confirmes OK par Ams. Sauvegarde post-validation creee : `data/backups/crm-ecole-backup-2026-06-17T14-19-35-955Z.json`.
- 2026-06-19 : Ams confirme que les donnees sont chargees et que toutes les fonctions livrees testees sont conformes. Sauvegarde post-chargement creee : `data/backups/crm-ecole-backup-2026-06-19T16-17-41-810Z.json`.
- 2026-06-19 : ajout d'un mode reseau local Mac/Windows conforme au PRD. Tests OK : `npm test`, `node -c scripts/server.js`, `bash -n`, demarrage `HOST=0.0.0.0 PORT=8891 npm start`, endpoint `/api/health` OK.
- 2026-06-19 : connexion reseau local validee par Ams depuis un iPhone connecte au meme Wi-Fi.
- 2026-06-19 : correction ergonomique Eleves sur petit ecran. Tests OK : `npm test`.
- 2026-06-20 : Ams valide le test du nouvel affichage Eleves sur iPhone.
- 2026-06-20 : durcissement V1 conforme PRD : sessions serveur, droits API par role, exports authentifies et sauvegarde automatique au premier demarrage du jour. Tests OK : `npm test`.
- 2026-06-20 : installation de Cloudflare Tunnel et ajout de `LANCER_TUNNEL_CLOUDFLARE_MAC.command` pour recette distante courte. Tests OK : `cloudflared --version`, `bash -n`, generation d'une URL temporaire et `npm test`.
- 2026-06-20 : test distant valide par les utilisateurs. La version courante devient la V1 stable de reference. Sauvegarde de reprise creee : `data/backups/crm-ecole-stable-utilisateurs-2026-06-20.json`.
- 2026-06-20 : Ams confirme qu'il n'y a pas d'autre retour utilisateur. Cadrage V1.1 cree dans `docs/CADRAGE_V1_1.md`. Prochaine evolution recommandee : fiche eleve imprimable.
- 2026-06-20 : fiche eleve imprimable V1.1 developpee. Tests OK : `npm test`. Prochaine action : tester l'impression sur 2 ou 3 eleves reels.
- 2026-06-20 : correction impression fiche eleve validee par Ams. Prochaine action : choisir la prochaine evolution V1.1 courte.
