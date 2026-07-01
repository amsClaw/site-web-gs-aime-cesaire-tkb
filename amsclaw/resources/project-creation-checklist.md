# Checklist creation projet amsClaw

Objectif :
verifier rapidement qu'un nouveau projet est propre, redemarrable et visible dans le dashboard.

## Avant creation

- Objectif du projet formule en une phrase.
- Statut initial defini : actif, en pause, bloque ou cloture.
- Prochaine action concrete identifiee.
- Responsable identifie.
- Priorite estimee.
- Perimetre V1 limite.

## Fichiers minimum

- Dossier dans `amsclaw/projects/<nom-du-projet>/`.
- `README.md` cree.
- `docs/PROJECT_BRIEF.md` cree.
- `docs/NEXT_STEPS.md` cree.
- Liens ajoutes dans `amsclaw/PROJECTS_INDEX.md` si le projet devient prioritaire.
- Projet reference dans `memory/active-projects.md`.

## Dashboard

- Projet present dans `dashboard-data.json`.
- Statut correct.
- Prochaine action visible.
- Score projet renseigne si le projet est prioritaire.
- Taches liees creees si une action agent est utile.

## Memoire durable

- Decision structurante ajoutee dans `memory/decisions.md`.
- Blocage documente si le projet ne peut pas avancer.
- Rapport cree dans `reports/` pour une livraison ou une validation importante.

## Controle final

```sh
node amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js
```

Resultat attendu :

- zero divergence projet ;
- zero prochaine action divergente ;
- zero statut divergent ;
- zero decision dashboard non journalisee.
