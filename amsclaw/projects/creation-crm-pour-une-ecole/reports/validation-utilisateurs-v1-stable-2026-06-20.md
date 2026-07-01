# Validation utilisateurs V1 stable - 2026-06-20

## Contexte

Ams confirme que le test du CRM est valide par les utilisateurs et que la version courante est stable.

## Decision

La version courante devient la V1 stable de reference du CRM ecole.

Les developpements peuvent continuer, mais ils doivent repartir d'un cadrage V1.1 court, priorise et testable.

## Point de reprise

Sauvegarde creee :

`data/backups/crm-ecole-stable-utilisateurs-2026-06-20.json`

Sauvegarde dashboard avant mise a jour :

`amsclaw/projects/dashboard-multi-agent/data/backups/dashboard-data-2026-06-20T-crm-stable-utilisateurs-pre-update.json`

## Modifications de suivi

- `README.md`
- `docs/NEXT_STEPS.md`
- `docs/commentaires_v1.md`
- `amsclaw/PROJECTS_INDEX.md`
- `memory/active-projects.md`
- `memory/decisions.md`
- `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`

## Prochaine action

Cadrer une V1.1 courte a partir des retours utilisateurs valides, en preservant la V1 stable comme point de reprise.

## Garde-fou

Ne pas empiler de nouvelles fonctions sans arbitrage. La V1.1 doit corriger ou ajouter uniquement ce qui est utile, visible et prioritaire pour l'usage terrain.
