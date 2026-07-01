# Reveil heartbeat - opportunites business

Date : 2026-06-13 22:30 Europe/Paris

## Objectif

Executer le heartbeat workspace sur l'angle opportunites business, sans ajouter de nouvelle idee au dashboard tant qu'Ams n'a pas valide la priorite actuelle.

## Sources controlees

- `HEARTBEAT.md`
- `amsclaw/PROJECTS_INDEX.md`
- `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`
- `amsclaw/projects/dashboard-multi-agent/reports/2026-06-12-mini-analyse-marche-gestion-scolaire.md`

## Lecture des signaux actuels

### Signal 1 - Education Guinee

Les deux projets education pointent vers le meme marche cible :

- `Creation CRM pour une ecole`
- `Relance paiements scolaires WhatsApp`

Lecture :
le CRM ecole est utile pour apprendre le terrain et structurer les donnees, mais le module paiement / relance reste probablement plus monetisable a court terme.

### Signal 2 - Dashboard comme produit

Le dashboard amsClaw devient progressivement un cockpit de validation et d'avancement projet.

Lecture :
ce n'est pas encore une offre a vendre, mais le cas d'usage pourrait devenir plus tard un produit simple pour PME ou independants :

```text
piloter projets, decisions, prochaines actions et routines sans tableur disperse.
```

### Signal 3 - Assistant documents PME

L'idee `Assistant documents PME` garde un bon ratio rapidite / effort, mais elle est moins prioritaire maintenant car elle n'a pas encore de cas terrain concret.

## Classement recommande a ce stade

1. Continuer le CRM ecole jusqu'a validation PRD et cahier de recette.
2. Utiliser les apprentissages CRM pour cadrer plus vite `Relance paiements scolaires WhatsApp`.
3. Garder `Dashboard projets PME` comme opportunite secondaire a documenter apres stabilisation interne.
4. Garder `Assistant documents PME` en veille, sans demarrer maintenant.

## Decision heartbeat

Ne pas notifier Ams.

Raison :

- aucune opportunite urgente nouvelle ;
- le meilleur prochain mouvement reste deja documente ;
- ajouter une nouvelle idee maintenant augmenterait la dispersion.

## Prochaine action recommandee

Ne pas changer la priorite actuelle :

```text
Faire valider la PRD V1 du CRM ecole, puis produire le cahier de recette V1.
```
