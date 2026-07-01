# Synchronisation securisee - 2026-06-13

## Objectif

Durcir la synchronisation Markdown -> JSON du dashboard sans ajouter de base de donnees ni complexite inutile.

## Modifications realisees

- `scripts/audit-data-sync.js` expose maintenant `runAudit()` et `hasBlockingDivergence()` pour etre reutilise par d'autres scripts.
- `scripts/sync-dashboard-data.js` lance un audit avant toute ecriture.
- La synchronisation est bloquee par defaut en cas de divergence.
- Les divergences de champs deja arbitrees peuvent etre appliquees avec `--apply-reviewed-divergences`.
- Une sauvegarde pre-ecriture est creee dans `data/backups/` avant modification de `dashboard-data.json`.
- Les documents de reprise ont ete mis a jour : index projets, README, prochaines etapes, source de verite, roadmap, memoire active et decisions.

## Commandes executees

```sh
node --check amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js
node --check amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js
node amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js
node amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js --apply-reviewed-divergences
node amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8787/amsclaw/dashboard/
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8787/api/dashboard-data
```

## Resultat

- Audit final : zero divergence.
- JSON valide.
- Dashboard HTTP : `200`.
- API dashboard-data HTTP : `200`.
- Sauvegarde creee : `data/backups/dashboard-data-2026-06-13T14-14-33-608Z-pre-sync.json`.

## Prochaine action

Tester le rituel hebdomadaire sur une vraie revue de portefeuille, puis cadrer l'usage dashboard pour la V1 `Relance paiements scolaires WhatsApp`.
