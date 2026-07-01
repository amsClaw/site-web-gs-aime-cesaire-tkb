# Cas de test V1 - Relance paiements scolaires WhatsApp

## Objectif

Permettre a Ams de valider rapidement le premier flux :

```text
paiement attendu -> paiement recu -> reste a payer -> recu ou relance WhatsApp
```

## Cas de test minimal recommande

- 1 ecole ou structure fictive.
- 1 classe.
- 10 eleves maximum.
- 1 periode de frais scolaire.
- 1 montant attendu par eleve.
- 3 situations visibles : a jour, paiement partiel, retard.

## Donnees a demander ou simuler

| Champ | Exemple |
| --- | --- |
| Ecole | Ecole Test Conakry |
| Classe | 6eme A |
| Eleve | Mariama Diallo |
| Parent | Mme Diallo |
| Telephone parent | 622000001 |
| Montant attendu | 1500000 |
| Montant paye | 1000000 |
| Date dernier paiement | 2026-06-10 |

## Regles V1

- Si `reste a payer = 0`, statut `A jour`.
- Si `montant paye > 0` et `reste a payer > 0`, statut `Partiel`.
- Si `montant paye = 0`, statut `A relancer`.
- Le message WhatsApp doit etre copiable sans envoi automatique.
- Le recu doit rester simple : eleve, classe, montant paye, date, solde.

## Message WhatsApp type

```text
Bonjour {parent}, sauf erreur de notre part, il reste {reste} GNF a regler pour les frais scolaires de {eleve} en classe de {classe}. Merci de vous rapprocher de l'administration.
```

## Decision attendue d'Ams

Choisir une source pour le premier test :

1. un vrai fichier Excel anonymise ;
2. une classe fictive de 10 lignes ;
3. une ecole cible a interviewer avant maquette.

Recommandation amsClaw : demarrer avec une classe fictive de 10 lignes, puis remplacer par un vrai fichier des qu'Ams a un contact terrain.
