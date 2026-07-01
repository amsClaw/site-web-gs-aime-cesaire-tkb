# Priorites hebdomadaires - 2026-06-19

Objectif :
reviser les priorites, verifier l'avancement des projets et detecter les opportunites utiles sans disperser Ams.

## Priorite recommandee

1. **Automatisation projet AAS** : valider le draft avant tout nouveau projet SaaS.
2. **Creation CRM pour une ecole** : passer du test valide a l'usage terrain.
3. **Dashboard multi-agent** : cadrer l'evolution `Validations projet visibles dans Taches`.
4. **Relance paiements scolaires WhatsApp** : cadrer une V1 courte avec un cas test concret.

## Avancement par projet

### Automatisation projet AAS

Statut :
actif, en draft.

Avancement :
le projet est cree et documente. Le draft processus existe et attend validation Ams.

Risque :
si le processus n'est pas valide rapidement, Ams risque de relancer des idees SaaS sans cadre reusable.

Prochaine action :
relire `amsclaw/projects/automatisation-projet-aas/docs/DRAFT_PROCESS_AAS.md`.

### Creation CRM pour une ecole

Statut :
V1 validee, prete pour usage terrain.

Avancement :
la V1 locale est livree, testee et sauvegardee apres validation.

Risque :
ouvrir trop vite une V1.1 avant donnees reelles.

Prochaine action :
charger des donnees reelles ou un jeu representatif, puis noter les retours.

### Dashboard multi-agent

Statut :
actif, cockpit stable.

Avancement :
V1.15 validee. La prochaine evolution cible la visibilite des validations projet dans les taches.

Risque :
complexifier la source de verite avant d'avoir observe plus de cas reels.

Prochaine action :
cadrer l'evolution `Validations projet visibles dans Taches` avant implementation.

### Relance paiements scolaires WhatsApp

Statut :
actif, cadrage V1.

Avancement :
projet cree et perimetre court identifie.

Risque :
deriver vers une gestion scolaire complete.

Prochaine action :
choisir un cas de test : ecole, classe ou fichier Excel.

## Opportunites business detectees

### 1. Processus AAS comme moteur interne

Opportunity :
transformer chaque idee SaaS en sequence reproductible : cadrage, PRD, recette, V1, test, documentation.

Interet :
fort, car cela reduit la dispersion et augmente la vitesse de livraison.

### 2. Suite education Afrique francophone

Opportunity :
partir du CRM ecole et du suivi paiements pour creer des outils simples, locaux, vendables aux ecoles.

Interet :
fort, a condition de rester sur des modules courts.

### 3. Assistant PME Excel + WhatsApp

Opportunity :
adapter la logique relance paiements a d'autres PME : factures, relances clients, recus, suivi simple.

Interet :
moyen a fort, apres validation d'un premier cas education.

## Blocages

Aucun blocage urgent detecte.

Le seul point d'attention est un blocage de decision :
AAS attend la validation d'Ams avant de devenir le processus standard.

## Recommandation hebdomadaire

Ne pas multiplier les nouveaux projets cette semaine.

La meilleure sequence est :

```text
1. Valider AAS.
2. Tester AAS sur un cas concret.
3. Utiliser CRM ecole ou Relance paiements comme projet pilote.
```
