# Dashboard multi-agent

## Objectif

Construire le cockpit amsClaw qui centralise les projets, priorites, blocages, routines, idees business et recommandations des sous-agents.

Le dashboard doit aider Ams a piloter l'ecosysteme multi-agents sans perdre le fil des projets.

## Statut

Actif.

## Prochaine action

Cadrer l'evolution `Validations projet visibles dans Taches`.

La V1.15 est validee cote utilisateur par Ams le 2026-06-12. Elle rend le cap visible avant chaque action : backlog, decisions, aujourd'hui, revue hebdo, recherche globale, fiche projet, score projet et sauvegarde versionnee.

Le 2026-06-13, la synchronisation Markdown -> JSON a ete durcie : `sync-dashboard-data.js` lance un audit prealable, bloque l'ecriture en cas de divergence et cree une sauvegarde avant modification de `dashboard-data.json`.

Le modele de creation projet genere maintenant aussi `docs/PROJECT_CHECKLIST.md`. Ce flux a ete valide par Ams le 2026-06-13 via la creation reelle du projet `Creation CRM pour une ecole`.

Le 2026-06-13, le projet CRM ecole devient aussi le cas pilote des actions guidees : le dashboard peut proposer une validation de PRD depuis la fiche projet lorsque la prochaine action le justifie, puis mettre a jour la prochaine action, le journal, les decisions et la memoire durable.

Le 2026-06-14, la validation du cahier de recette V1 du projet CRM ecole est ajoutee comme tache liee visible dans l'onglet `Taches`. L'evolution generale `Validations projet visibles dans Taches` est ajoutee au backlog dashboard.

Le 2026-06-14 soir, l'action guidee PRD est verifiee : elle n'est plus visible avec l'etat actuel du CRM ecole, car la prochaine action ne porte plus sur la validation PRD. Le nettoyage restant concerne donc seulement le cadrage durable des validations visibles dans `Taches`.

## Perimetre V1

- Vue d'ensemble des projets, priorites et blocages.
- Vue `Aujourd'hui` avec actions, blocages, projets dormants et taches a echeance.
- Vue `Backlog` pour suivre les evolutions prevues, en cours, faites ou ecartees.
- Vue `Decisions` pour conserver les arbitrages importants.
- Vue projets avec statuts detailles, filtres actifs, pause, bloques et clotures.
- Fiche projet detaillee et score projet sur 20.
- Actions guidees sur fiche projet pour faire avancer un jalon simple sans terminal.
- Bilan de cloture projet avec date et resultat final.
- Suivi des idees business avec scoring simple.
- Taches agents avec creation, edition, suppression, echeance, suivi d'avancement, filtre `À vérifier`, compteur d'executions en attente de validation et etat vide explicite.
- Revue hebdomadaire copiable en Markdown.
- Recherche globale.
- Routines quotidiennes, hebdomadaires et mensuelles.
- Rapport copiable.
- Lancement local simple.
- Documentation minimale pour reprendre le projet.

## Organisation

```text
docs/      documentation projet
src/       futures sources applicatives si la V2 quitte la V1 statique
data/      exemples ou fichiers intermediaires
scripts/   scripts de lancement et maintenance
tests/     scenarios de verification
reports/   points d'avancement et bilans
archive/   anciens essais et elements retires
```

## Lancement ou utilisation

La V1 actuelle se trouve dans :

```text
amsclaw/dashboard/
```

Depuis le workspace :

```sh
./amsclaw/projects/dashboard-multi-agent/scripts/launch-v1.sh
```

Ou directement :

```sh
./amsclaw/dashboard/launch-dashboard.sh
```

URL locale :

```text
http://localhost:8787/amsclaw/dashboard/
```

## Rituel de pilotage

Le rituel hebdomadaire est documente dans :

```text
amsclaw/projects/dashboard-multi-agent/docs/RITUEL_HEBDOMADAIRE.md
```

Il sert a garder les projets actifs priorises, redemarrables et documentes.

## Synchronisation des donnees

Le dashboard lit le fichier :

```text
amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json
```

Pour mettre a jour la liste des projets depuis la memoire active :

```sh
node amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js
```

Le script lit :

```text
memory/active-projects.md
```

Puis met a jour les projets dans `dashboard-data.json` sans toucher aux idees business ni aux routines.
Les taches agents, le backlog, les decisions et le journal d'activite restent aussi conserves dans le JSON.
Avant d'ecrire, il produit un audit non destructif. Si l'audit detecte une divergence projet, statut, prochaine action ou decision non journalisee, la synchronisation est annulee par defaut.
Les divergences de champs deja arbitrees peuvent etre appliquees explicitement :

```sh
node amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js --apply-reviewed-divergences
```

Avant chaque ecriture serveur ou synchronisation autorisee, une sauvegarde horodatee est creee dans :

```text
amsclaw/projects/dashboard-multi-agent/data/backups/
```

Le cadrage de la source de verite est documente dans :

```text
amsclaw/projects/dashboard-multi-agent/docs/SOURCE_DE_VERITE_DONNEES.md
```

Audit non destructif :

```sh
node amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js
```

## Decisions importantes

- 2026-06-11 : creer un dossier projet dedie dans `amsclaw/projects/dashboard-multi-agent/` sans deplacer la V1 existante, afin de ne pas casser le lancement actuel.
- 2026-06-11 : utiliser la V1 comme prototype testable et faire evoluer le projet par petites etapes.
- 2026-06-11 : ajouter un script de synchronisation simple depuis `memory/active-projects.md` vers `dashboard-data.json`.
- 2026-06-11 : ajouter une vue `Tâches` pour creer et suivre des actions affectees aux agents.
- 2026-06-11 : ajouter un historique d'execution visible pour les taches agents et maintenir le serveur local via le LaunchAgent macOS `com.amsclaw.dashboard`.
- 2026-06-11 : ajouter un lien `Ouvrir le fichier` dans l'historique des taches agents quand une execution genere un fichier local servi par le dashboard.
- 2026-06-11 : ajouter une validation manuelle `Marquer comme vérifié` sur les executions de taches agents.
- 2026-06-11 : ajouter un filtre `À vérifier` dans la vue `Tâches` pour isoler les executions non validees.
- 2026-06-11 : ajouter un compteur d'executions `À vérifier` dans la vue `Tâches`.
- 2026-06-11 : ajouter un etat vide explicite quand le filtre `À vérifier` ne contient plus aucune execution.
- 2026-06-12 : cloturer le test V1.10 et repositionner la prochaine evolution sur la creation de projet depuis modele.
- 2026-06-12 : valider la creation reelle de projet depuis le modele via l'API locale. Le projet `Relance paiements scolaires WhatsApp` a ete cree, les fichiers minimaux existent, l'entree JSON est presente et une double creation est refusee en 409.
- 2026-06-12 : ajouter l'edition detaillee du statut projet dans le dashboard, avec les statuts actif, pause, bloque et cloture.
- 2026-06-12 : ajouter un bilan de cloture projet avec date de cloture et resultat final conserve dans le JSON.
- 2026-06-12 : Ams valide le principe de ne pas avancer a l'aveugle. La V1.14 doit etre implementee par points testes et documentes avant de continuer.
- 2026-06-12 : implementer la V1.15 pour rendre visibles le backlog, les decisions, les actions du jour, la revue hebdo, la recherche globale, le score projet, la fiche projet et les sauvegardes versionnees.
- 2026-06-12 : Ams confirme que les tests utilisateur de la V1.15 sont OK. La suite prioritaire devient le rituel de pilotage hebdomadaire et la clarification de la source de verite des donnees.
- 2026-06-12 : cadrer la source de verite des donnees : JSON comme source operationnelle du dashboard, Markdown comme memoire durable, audit de divergence avant synchronisation automatique.
- 2026-06-12 : ajouter `scripts/audit-data-sync.js`, produire un rapport Markdown non destructif et ramener l'audit a zero divergence.
- 2026-06-13 : valider en reel la creation de projet avec checklist integree via `Creation CRM pour une ecole`.
- 2026-06-13 : ajouter la premiere action guidee de fiche projet : validation de la PRD V1 du projet `Creation CRM pour une ecole` depuis le dashboard.
- 2026-06-14 : ajouter une tache liee pour rendre visible la validation du cahier de recette V1 du projet CRM ecole dans l'onglet `Taches`, et ajouter au backlog l'automatisation future des validations projet visibles comme taches.

## Risques et points de vigilance

- Risque : complexifier trop vite avec une base de donnees ou un backend.
- Impact : perte de vitesse et maintenance inutile.
- Mitigation : connecter d'abord une source de donnees simple avant toute architecture lourde.

- Risque : dupliquer les informations entre `memory/*.md`, `localStorage` et les fichiers projet.
- Impact : confusion sur la source de verite.
- Mitigation : choisir rapidement la source de donnees prioritaire pour la V2.

## Notes

La V1 statique est volontairement separee du dossier projet. Le dossier projet sert a piloter l'evolution, documenter les decisions et preparer la V2 proprement.
