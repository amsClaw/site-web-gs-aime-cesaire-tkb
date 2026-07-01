# Commentaires PRD V1

Objectif :
centraliser les remarques d'Ams sur `PRD_V1.md` avant validation ou nouvelle version.

Mode d'utilisation :
- Ajouter un commentaire par bloc.
- Garder les commentaires meme apres traitement, en passant le statut a `Traite`.
- Utiliser `A arbitrer` si la decision n'est pas encore claire.

## Statuts possibles

- Nouveau
- A arbitrer
- Integre
- Rejete
- Traite

## Types possibles

- Ajout
- Modification
- Suppression
- Question
- Clarification
- Risque

## Commentaire 1

Statut : Integre

Section concernee : données

Type : Ajout

Priorite : Haute

Commentaire : pouvoir saisir une liste d'enseignants et pouvoir les affecter à des classes dans la création des classes avec ne liste déroulante.

Decision attendue : intégrer en V1 sous forme simple, sans module RH enseignant.

Reponse / traitement amsClaw : intégré dans `PRD_V1.md`. Les enseignants sont traités comme des utilisateurs de rôle `Instructeur`, affectables aux classes via liste déroulante. Ce rattachement peut servir à limiter les fiches visibles par instructeur.

## Commentaire 2

Statut : Integre

Section concernee : données

Type : Modification

Priorite : Haute

Commentaire : j'ai des extractions excel des eleves par classe mais pas avec tous les champs obligatoires. L'administrateur doit pourvoir charger ces fichiers et une indication (de couleur par exemple) doit s'afficher sur le profil des eleves pour indiquer données pas à jour

Decision attendue : intégrer en V1 en autorisant un import partiel contrôlé.

Reponse / traitement amsClaw : intégré dans `PRD_V1.md` après analyse de `liste_eleve.xlsx`. La PRD prévoit l'import d'extractions par classe, le choix d'une classe cible si la colonne classe est absente, un statut de complétude `complet` / `a completer` / `bloquant`, un badge visible sur la fiche élève, et un filtre des élèves dont les données sont à compléter. La fiche élève inclut aussi `parent 2`.

## Commentaire 3

Statut : Nouveau

Section concernee :

Type :

Priorite :

Commentaire :

Decision attendue :

Reponse / traitement amsClaw :
