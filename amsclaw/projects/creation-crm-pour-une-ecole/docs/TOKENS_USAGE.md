# Suivi tokens - Projet CRM ecole

Objectif :
garder une trace simple de l'usage tokens lie au projet, sans integration dashboard.

## Etat connu

Date : 2026-06-14

Contexte :
OpenClaw ne fournit pas, a ce stade, le cumul exact des tokens consommes sur tout le projet apres compactions.

Donnees visibles au moment du controle :

- session actuelle : 483 tokens in / 474 tokens out ;
- cache indique : environ 79k tokens cached ;
- compactions indiquees : 20.

Conclusion :
le total reel consomme sur le projet est superieur au chiffre visible, mais le total exact n'est pas disponible depuis la session actuelle.

## Methode de suivi recommandee

Ajouter une entree manuelle apres les grosses phases de travail :

```text
Date :
Phase :
Compteur visible :
Estimation / remarque :
```

## Journal

### 2026-06-14

Phase : cadrage PRD V1, commentaires Ams, analyse `liste_eleve.xlsx`, ajustement PRD.

Compteur visible :

- 483 tokens in ;
- 474 tokens out ;
- 79k tokens cached ;
- 20 compactions.

Remarque :
compteur incomplet pour le projet total ; sert uniquement de point de reference.
