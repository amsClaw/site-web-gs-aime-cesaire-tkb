# Revue pilote dashboard - Espace de travail amsClaw - 2026-06-13

## Objectif

Tester le rituel dashboard sur un autre projet que `Relance paiements scolaires WhatsApp`.

## Projet retenu

`Espace de travail amsClaw`

Raison :

- projet support utile a tout l'ecosysteme ;
- faible risque metier ;
- bon cas pour verifier la discipline de documentation et de reprise.

## Lecture dashboard

- Statut : actif.
- Priorite : moyenne.
- Blocage : aucun.
- Taches liees : aucune.
- Decisions liees dans le dashboard : aucune.
- Backlog lie : aucun.

## Action realisee

Creation de la checklist :

```text
amsclaw/resources/project-creation-checklist.md
```

Elle couvre :

- cadrage avant creation ;
- fichiers minimum ;
- presence dashboard ;
- memoire durable ;
- controle final par audit JSON / Markdown.

## Resultat du test

Le rituel fonctionne mieux avec un petit projet support qu'avec un projet business encore a cadrer.

Point observe :
la prochaine action du projet doit etre immediatement executable. Une action du type "appliquer le standard au prochain projet cree" est utile, mais trop dependante d'un evenement futur.

Correction faite :
la prochaine action devient tester la checklist sur le prochain projet cree ou l'integrer au modele de creation du dashboard.

## Prochaine action

Ajouter la checklist au flux de creation depuis modele du dashboard, ou l'utiliser manuellement lors du prochain projet cree.
