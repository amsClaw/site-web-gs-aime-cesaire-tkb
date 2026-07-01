# Stabilisation V1 - 2026-06-14

## Objectif

Controler la V1 locale apres validation par Ams des ecrans Eleves, Classes, Utilisateurs et Photo eleve.

## Resultat

Statut : V1 validee par Ams le 2026-06-14.

## Controles executes

- `npm test` : OK.
- `npm audit --omit=dev` : OK, `found 0 vulnerabilities`.
- Export eleves : OK, fichier de controle `reports/stabilisation-v1/eleves-export-check.xlsx`.
- Export effectifs/classes : OK, fichier de controle `reports/stabilisation-v1/effectifs-export-check.xlsx`.
- Sauvegarde manuelle via API : OK.
- Lecture JSON de la sauvegarde : OK.
- Restauration via `RESTAURER_SAUVEGARDE_MAC.command` : OK, test valide par Ams.

## Sauvegarde creee

`data/backups/crm-ecole-backup-2026-06-14T19-18-35-478Z.json`

Contenu verifie :

- utilisateurs : 5 ;
- classes : 6 ;
- eleves : 20.

## Points de vigilance avant usage reel

- La V1 reste locale : ne pas exposer sur Internet sans durcissement des droits serveur.
- Les photos sont stockees dans `data/app-data.json` sous forme Base64 compressee ; ce choix est acceptable pour la V1, mais a migrer en fichiers separes en V2 si le volume augmente.
- La restauration reste une procedure manuelle documentee dans `docs/RUNBOOK_V1.md`.

## Prochaine action recommandee

Preparer l'usage terrain : conserver le point de reprise V1, utiliser le runbook, charger les donnees reelles et noter les retours avant d'ouvrir une V1.1 courte.
