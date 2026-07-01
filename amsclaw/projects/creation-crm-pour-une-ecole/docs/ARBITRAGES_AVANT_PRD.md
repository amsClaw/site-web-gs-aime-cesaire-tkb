# Arbitrages avant PRD - CRM ecole

Date : 2026-06-13

Objectif :
obtenir une validation claire de l'expression de besoin avant de rediger la PRD.

## 1. Perimetre V1

Recommandation amsClaw :
valider une V1 limitee au socle suivant :

- gestion des eleves ;
- import Excel de liste eleves ;
- gestion des classes ;
- recherche eleve ;
- fiche eleve ;
- statut de scolarite simple ;
- commentaires internes sur la fiche eleve ;
- tableau de bord simple ;
- exports Excel ;
- utilisateurs et permissions simples ;
- sauvegarde et restauration documentees.

Decision Ams du 2026-06-13 :
`valide avec ajustement` : ajouter une fonction d'import de liste eleves par Excel et conserver une fonction d'export.

## 2. Statut de scolarite

Recommandation amsClaw :
utiliser trois valeurs en V1 :

- `a jour` ;
- `non a jour` ;
- `a verifier`.

Hors perimetre V1 :

- encaissement ;
- recu ;
- facture ;
- montant du ;
- historique financier detaille ;
- relance automatique.

Decision attendue d'Ams :

- confirmer ces trois statuts ;
- ou proposer les libelles exacts souhaites.

## 3. Commentaires eleves

Recommandation amsClaw :

- les instructeurs peuvent ajouter un commentaire ;
- chaque commentaire affiche son auteur et sa date ;
- un instructeur peut modifier uniquement ses propres commentaires ;
- la direction et le secretariat peuvent consulter tous les commentaires ;
- la suppression definitive est evitee en V1 ; si necessaire, on archive ou masque.

Decision attendue d'Ams :

- confirmer les droits ;
- preciser si le secretariat peut aussi modifier les commentaires ;
- preciser si les commentaires doivent etre visibles par tous les instructeurs ou seulement par la direction.

## 4. Utilisateurs V1

Recommandation amsClaw :
limiter la V1 a trois profils :

- administrateur / direction ;
- secretariat ;
- instructeur.

Comptabilite peut etre traitee comme un role direction ou secretariat en V1, sauf besoin contraire.

Decision attendue d'Ams :

- confirmer les trois profils ;
- ou ajouter un profil indispensable.

## 5. Champs eleve obligatoires

Recommandation amsClaw :

- matricule ;
- nom ;
- prenom ;
- sexe ;
- date de naissance ;
- classe ;
- parent ou tuteur principal ;
- telephone parent ;
- adresse ;
- statut de scolarite.

Decision attendue d'Ams :

- confirmer ;
- ajouter ou retirer des champs.

## 6. Critere de validation de la V1

Proposition amsClaw :
la V1 est utile si l'ecole peut :

- enregistrer ses eleves ;
- importer une liste d'eleves par Excel ;
- retrouver rapidement un eleve ;
- voir les effectifs par classe ;
- savoir quels eleves sont `a jour`, `non a jour` ou `a verifier` ;
- consulter l'historique simple des commentaires internes ;
- exporter les listes essentielles dans Excel.

Decision attendue d'Ams :

- valider ce critere ;
- ou preciser le resultat minimum attendu.

## Format de reponse recommande

Ams peut repondre simplement :

```text
1. Perimetre V1 : valide / ajustement...
2. Statut scolarite : valide / ajustement...
3. Commentaires : valide / ajustement...
4. Utilisateurs : valide / ajustement...
5. Champs eleve : valide / ajustement...
6. Critere V1 utile : valide / ajustement...
```
