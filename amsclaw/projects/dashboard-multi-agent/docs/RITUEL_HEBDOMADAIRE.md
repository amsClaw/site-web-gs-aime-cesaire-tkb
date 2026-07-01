# Rituel hebdomadaire de pilotage

Objectif :
garder les projets amsClaw redemarrables, priorises et documentes sans alourdir le systeme.

## Frequence

Une fois par semaine.

Moment recommande :
debut de semaine ou fin de semaine, selon le rythme d'Ams.

Durée cible :
20 a 30 minutes.

## Entrees

Ouvrir le dashboard :

```text
http://127.0.0.1:8787/amsclaw/dashboard/
```

Lire dans cet ordre :

1. Vue `Aujourd'hui`
2. Vue `Projets`
3. Vue `Taches`
4. Vue `Backlog`
5. Vue `Decisions`
6. Vue `Revue hebdo`

## Questions de pilotage

### Projets

- Quels projets restent actifs ?
- Quel projet doit avancer en premier ?
- Un projet doit-il etre mis en pause ?
- Un projet doit-il etre cloture ?
- Chaque projet actif a-t-il une prochaine action concrete ?

### Taches

- Quelles taches sont ouvertes ?
- Quelles taches sont a verifier ?
- Une tache agent peut-elle etre executee maintenant ?
- Une tache est-elle obsolete ?

### Backlog

- Quel item est vraiment prioritaire ?
- Un item doit-il passer en `Ecarte` ?
- Un item fait-il doublon avec une decision ou une prochaine action ?

### Decisions

- Une decision importante a-t-elle ete prise cette semaine ?
- Faut-il documenter une raison ou un impact ?
- Une decision change-t-elle la priorite d'un projet ?

## Sortie attendue

A la fin du rituel, le dashboard doit contenir :

- une prochaine action a jour pour chaque projet actif ;
- aucun projet actif sans prochaine action ;
- les blocages visibles ;
- les decisions importantes journalisees ;
- les taches obsoletes nettoyees ou mises a jour ;
- une revue hebdomadaire copiable en Markdown.

## Regle de priorisation

Prioriser dans cet ordre :

1. Rapidite de mise en oeuvre
2. Motivation d'Ams
3. Ratio effort / gain
4. Potentiel financier maximal

## Prochaine amelioration possible

Ajouter plus tard un bouton ou une action `Cloturer la revue hebdo` qui :

- enregistre la revue dans `reports/` ;
- ajoute une trace dans le journal d'activite ;
- met a jour la date de derniere revue.

Cette amelioration doit attendre le cadrage de la source de verite JSON / Markdown.
