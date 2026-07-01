# Relance paiements scolaires WhatsApp

## Objectif

Tester un outil simple pour suivre les frais scolaires, generer des recus et preparer les relances parents.

## Statut

actif

## Prochaine action

Identifier un premier cas de test concret : une ecole, une classe ou un fichier Excel existant.

## Perimetre V1

- Suivi des frais scolaires attendus, payes et restants.
- Statut simple : a jour, partiel, en retard.
- Recu simple pour les paiements saisis.
- Message WhatsApp de relance pret a copier.
- Pas de gestion complete de l'ecole dans la V1.

## Organisation

```text
docs/
src/
data/
scripts/
tests/
reports/
archive/
```

## Lancement ou utilisation

A definir.

## Decisions importantes

- 2026-06-12 : projet cree depuis le modele du dashboard amsClaw.
- 2026-06-12 : cadrage V1 limite au flux paiement, recu et relance WhatsApp.

## Risques et points de vigilance

- Risque : perimetre trop large.
- Impact : ralentissement de l'execution.
- Mitigation : garder une V1 courte avec une prochaine action concrete.

## Notes

Projet issu de la meilleure opportunite business actuelle.
