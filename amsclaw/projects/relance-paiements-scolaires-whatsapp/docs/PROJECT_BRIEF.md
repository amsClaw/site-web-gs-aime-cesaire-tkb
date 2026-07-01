# Brief projet - Relance paiements scolaires WhatsApp

## Contexte

Beaucoup d'ecoles privees suivent encore les frais scolaires avec un melange de cahiers, fichiers Excel, appels et messages WhatsApp. Le besoin prioritaire n'est pas de remplacer tout le systeme scolaire, mais de rendre le suivi paiement -> recu -> relance plus clair.

## Probleme

Suivi des paiements et relances parents encore gere sur papier, Excel ou WhatsApp non structure.

## Cible

Education / etablissements scolaires

## Proposition de valeur

J'aide les ecoles a suivre les frais scolaires, generer des recus simples et preparer les relances WhatsApp aux parents sans perdre de temps dans les cahiers et fichiers disperses.

## Hypothese principale

Une ecole acceptera de tester un outil tres simple si la V1 reduit le temps passe a verifier qui a paye, combien reste du, et quel message envoyer au parent.

## Criteres de succes

- Un responsable peut saisir une classe, un eleve, un montant attendu, un montant paye et un reste a payer.
- Le tableau indique immediatement les eleves a relancer.
- Un message WhatsApp pret a copier est genere pour chaque retard.
- Le besoin est valide avec au moins un retour terrain concret.

## Mini maquette V1

| Eleve | Classe | Parent | Total attendu | Paye | Reste | Statut | Action |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| Exemple A | 6eme | 622 00 00 00 | 1 500 000 GNF | 1 000 000 GNF | 500 000 GNF | A relancer | Copier message |
| Exemple B | 5eme | 623 00 00 00 | 1 500 000 GNF | 1 500 000 GNF | 0 GNF | A jour | Generer recu |

## Champs indispensables

- Nom eleve
- Classe
- Nom ou telephone parent
- Montant total attendu
- Montant paye
- Reste a payer
- Date du dernier paiement
- Statut : a jour, partiel, en retard
- Message de relance prepare

## Limites V1

- Ne pas elargir le perimetre avant validation du premier flux.
- Ne pas gerer les emplois du temps, notes, absences ou inscriptions dans cette premiere version.
