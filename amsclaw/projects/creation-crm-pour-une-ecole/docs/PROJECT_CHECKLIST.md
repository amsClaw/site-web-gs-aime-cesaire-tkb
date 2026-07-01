# Checklist creation projet - Création CRM pour une école

Objectif :
verifier que le projet est propre, redemarrable et visible dans le dashboard.

## Cadrage

- Objectif formule en une phrase.
- Statut initial defini.
- Prochaine action concrete identifiee.
- Responsable identifie.
- Priorite estimee.
- Perimetre V1 limite.

## Fichiers minimum

- `README.md` cree.
- `docs/PROJECT_BRIEF.md` cree.
- `docs/NEXT_STEPS.md` cree.
- `docs/PROJECT_CHECKLIST.md` cree.
- `docs/PRD_V1.md` cree.
- Dossiers standards presents : `docs/`, `src/`, `data/`, `scripts/`, `tests/`, `reports/`, `archive/`.

## Dashboard

- Projet present dans `dashboard-data.json`.
- Statut correct : `actif`.
- Prochaine action visible : Faire la revue finale de livraison V1 avec Ams.
- Score projet renseigne si le projet est prioritaire.
- Taches liees creees si une action agent est utile.

## Memoire durable

- Projet reference dans `memory/active-projects.md` si le projet doit rester suivi durablement.
- Decision structurante ajoutee dans `memory/decisions.md`.
- Blocage documente si le projet ne peut pas avancer.
- Rapport cree dans `reports/` pour une livraison ou validation importante.

## Controle final

```sh
node amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js
```

Resultat attendu :

- zero divergence projet ;
- zero prochaine action divergente ;
- zero statut divergent ;
- zero decision dashboard non journalisee.
