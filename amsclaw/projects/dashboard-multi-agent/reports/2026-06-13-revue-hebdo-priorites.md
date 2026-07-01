# Revue hebdomadaire - priorites et avancement

Date : 2026-06-13 19:30 Europe/Paris

## Objectif

Executer le volet hebdomadaire du heartbeat :

- reviser les priorites ;
- verifier l'avancement des projets ;
- detecter les incoherences de suivi.

## Priorites confirmees

1. Finaliser l'expression de besoin de `Creation CRM pour une ecole`.
2. Maintenir le dashboard stable comme cockpit de pilotage.
3. Reprendre ensuite le cadrage de `Relance paiements scolaires WhatsApp`.

## Constat

L'index de reprise et les documents projet etaient mieux a jour que `memory/active-projects.md`.

Risque :
un redemarrage futur aurait pu reprendre une prochaine action trop ancienne pour le dashboard et le CRM ecole.

## Actions realisees

- Lecture de `HEARTBEAT.md`.
- Lecture de `amsclaw/PROJECTS_INDEX.md`.
- Lecture de `memory/active-projects.md`.
- Lecture de `amsclaw/projects/dashboard-multi-agent/docs/RITUEL_HEBDOMADAIRE.md`.
- Mise a jour de `memory/active-projects.md` :
  - prochaine action dashboard ;
  - prochaine action CRM ecole ;
  - documentation CRM avec `ARBITRAGES_AVANT_PRD.md` ;
  - historique de decision CRM.
- Mise a jour de `amsclaw/PROJECTS_INDEX.md` pour ajouter `ARBITRAGES_AVANT_PRD.md` dans la documentation CRM.
- Audit JSON / Markdown.
- Synchronisation `memory/active-projects.md` -> `dashboard-data.json` avec arbitrage explicite.
- Audit final de coherence.

## Synchronisation

Commande executee :

```sh
node amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js --apply-reviewed-divergences
```

Sauvegarde pre-ecriture :

```text
amsclaw/projects/dashboard-multi-agent/data/backups/dashboard-data-2026-06-13T17-31-32-640Z-pre-sync.json
```

## Resultat

- Projets bloques : aucun.
- Projets seulement JSON : 0.
- Projets seulement Markdown : 0.
- Prochaines actions divergentes : 0.
- Statuts divergents : 0.
- Decisions dashboard non journalisees : 0.
- `dashboard-data.json` valide.

## Prochaine action recommandee

Quand Ams reprend le projet CRM ecole, utiliser :

```text
amsclaw/projects/creation-crm-pour-une-ecole/docs/ARBITRAGES_AVANT_PRD.md
```

Objectif :
valider rapidement les six arbitrages avant de rediger la PRD.
