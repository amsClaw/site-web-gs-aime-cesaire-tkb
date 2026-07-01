# Controle documentation - Automatisation projet AAS

Date : 2026-06-19

Objectif :
verifier si la documentation du projet AAS est suffisante pour permettre a Ams de valider le draft et de l'utiliser comme processus standard.

## Documents relus

- `README.md`
- `docs/PROJECT_BRIEF.md`
- `docs/NEXT_STEPS.md`
- `docs/DRAFT_PROCESS_AAS.md`
- `docs/PROCESS_AAS_FUSIONNE.md`

## Verdict

Documentation propre et redemarrable.

Mise a jour : un nouveau draft fusionne existe maintenant dans `docs/PROCESS_AAS_FUSIONNE.md`. Il devient le document principal a relire. `docs/DRAFT_PROCESS_AAS.md` reste l'historique du premier draft automatise.

Le projet possede :

- un objectif clair ;
- un statut explicite ;
- une prochaine action ;
- un draft de processus en 7 phases ;
- un draft fusionne OpenClaw avec mode leger / mode complet ;
- une cartographie agents specialises / livrables / validations ;
- des risques identifiés ;
- une documentation suffisante pour reprise.

## Points a renforcer avant validation definitive

### 1. Ajouter des criteres Go / No-Go

Statut : partiellement couvert par `docs/PROCESS_AAS_FUSIONNE.md`.

Le draft fusionne indique les validations Ams et les fichiers cibles. Il reste a formaliser les criteres Go / No-Go detaillees par phase.

Ajout recommande :

- criteres de validation de l'expression de besoin ;
- criteres de validation PRD / architecture ;
- criteres de lancement dev ;
- criteres de livraison MVP.

### 2. Normaliser les livrables par phase

Statut : partiellement couvert par `docs/PROCESS_AAS_FUSIONNE.md`.

Les livrables sont maintenant normalises pour mode leger et mode complet. Il reste a transformer les templates sources en templates OpenClaw reutilisables.

Ajout recommande :

- template fiche idee ;
- template expression de besoin ;
- template benchmark ;
- template PRD ;
- template cahier de recette ;
- template bilan MVP.

### 3. Integrer securite, donnees et conformite

Statut : partiellement couvert par `docs/PROCESS_AAS_FUSIONNE.md`.

Le draft fusionne distingue petits projets et SaaS public. Il reste a ajouter une checklist securite detaillee pour les projets publics.

Ajout recommande :

- classification des donnees ;
- niveau d'exposition : local, prive, public ;
- sauvegarde et restauration ;
- droits utilisateurs ;
- revue securite avant mise en ligne.

### 4. Ajouter une vraie phase recette

Statut : couvert dans `docs/PROCESS_AAS_FUSIONNE.md`.

La phase recette est maintenant separee du developpement et prevoit cahier de recette light / complet.

Ajout recommande :

- cahier de recette avant developpement ;
- passage des tests metier avant livraison ;
- liste des anomalies bloquantes / non bloquantes ;
- decision : livraison, correction, ou V1.1.

### 5. Ajouter le cout et l'exploitation

Statut : a renforcer.

Le draft fusionne mentionne les decisions structurantes, mais les couts, la maintenance et le support restent a cadrer dans la version finale.

Ajout recommande :

- estimation cout mensuel cible ;
- responsable maintenance ;
- procedure de sauvegarde ;
- procedure de mise a jour ;
- indicateur minimal de succes commercial.

## Recommandation

Ne pas bloquer la relecture du draft fusionne sur ces points.

Prochaine etape conseillee :

```text
Ams relit `docs/PROCESS_AAS_FUSIONNE.md`, puis amsClaw le peaufine avec Codex / GPT-5 pour produire une V0.1 avec templates OpenClaw, criteres Go/No-Go, recette et securite.
```

Cela garde l'avancement rapide sans surcharger la premiere validation.
