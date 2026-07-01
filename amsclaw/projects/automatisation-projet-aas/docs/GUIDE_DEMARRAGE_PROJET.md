# Guide officiel de demarrage projet OpenClaw

> Statut : V0.1 officielle
> Date : 2026-06-19
> Projet lie : Automatisation projet AAS

## Objectif

Ce document explique comment initier un projet avec amsClaw / OpenClaw, en utilisant le process AAS.

Il sert surtout a donner les bons prompts de demarrage, notamment pour la phase d'ideation, et a rappeler quand utiliser le mode leger, complet ou force.

## Principe simple

Pour demarrer un projet, Ams peut envoyer une phrase simple dans Telegram.

L'agent doit ensuite :

1. reformuler l'idee ;
2. recommander un mode leger ou complet, sauf si Ams force le mode ;
3. poser seulement les questions necessaires ;
4. creer le projet dans le dashboard ;
5. creer le dossier projet ;
6. creer les premiers fichiers ;
7. creer la premiere tache de validation.

## Regle rapide

Par defaut, utilise :

```text
@amsclawMM_bot Recommande le bon process : [idee]
```

Le mode leger est le mode par defaut.

Le mode complet est recommande si le projet contient comptes utilisateurs, paiement, donnees sensibles, espace client, base de donnees metier, workflows complexes, usage multi-clients ou ambition SaaS durable.

Tu peux forcer le mode :

- `Demarre le process projet leger` : l'agent applique le mode leger, sauf risque critique.
- `Demarre le process projet lourd` : l'agent applique le mode complet, meme si le projet semble simple.

## Les 3 commandes de demarrage

### 1. Laisser l'agent recommander

Commande recommandee par defaut :

```text
@amsclawMM_bot Recommande le bon process pour ce nouveau projet :
[decris ton idee en quelques lignes]

Objectif :
[ce que tu veux obtenir]

Contexte :
[pour qui / pourquoi / ou]
```

Utiliser cette commande quand tu n'es pas certain du niveau de process necessaire.

### 2. Forcer le mode leger

```text
@amsclawMM_bot Demarre le process projet leger :
[decris ton idee]

Objectif :
[resultat attendu]

Contrainte importante :
[temps, budget, cible, outil, support, etc.]
```

Exemple :

```text
@amsclawMM_bot Demarre le process projet leger :
je veux creer un site vitrine pour un artisan plombier a Conakry.

Objectif :
presenter ses services, afficher ses realisations, permettre un contact WhatsApp et travailler le SEO local.

Contrainte importante :
site simple, rapide a livrer, sans compte utilisateur ni paiement.
```

### 3. Forcer le mode lourd

```text
@amsclawMM_bot Demarre le process projet lourd :
[decris ton idee]

Objectif :
[resultat attendu]

Contexte :
[cible, marche, usage, contraintes]
```

Exemple :

```text
@amsclawMM_bot Demarre le process projet lourd :
je veux creer une plateforme SaaS de relance clients pour PME.

Objectif :
permettre aux entreprises de suivre les factures, relancer les clients, gerer des comptes utilisateurs et proposer un abonnement mensuel.

Contexte :
cible PME en Afrique francophone, usage web, paiement a etudier.
```

## Prompt minimal d'ideation

Quand l'idee est encore floue :

```text
@amsclawMM_bot Aide-moi a clarifier cette idee de projet :
[idee brute]

Pose-moi les bonnes questions pour transformer cette idee en projet concret.
Ne cree pas encore le projet dans le dashboard tant que le besoin n'est pas clair.
```

Utiliser ce prompt quand tu veux juste reflechir sans lancer officiellement le projet.

Template utilise par l'agent :

- `docs/templates/IDEATION_PROJET_LEGER.md`

## Prompt d'ideation structuree

Quand tu veux cadrer serieusement l'idee :

```text
@amsclawMM_bot Lance une ideation structuree pour ce projet :
[idee brute]

Je veux que tu m'aides a clarifier :
- le probleme concret ;
- la cible ;
- le contexte d'utilisation ;
- la proposition de valeur ;
- les fonctionnalites principales ;
- le mode leger ou complet recommande ;
- les risques ;
- le premier livrable utile.

Ne cree le projet qu'apres m'avoir propose une synthese et une recommandation.
```

Template utilise par l'agent :

- petit projet : `docs/templates/IDEATION_PROJET_LEGER.md`
- SaaS / projet ambitieux : `docs/templates/IDEATION_SAAS_COMPLET.md`

## Prompt d'ideation business

Quand l'objectif est de tester une opportunite business :

```text
@amsclawMM_bot Analyse cette idee comme une opportunite business :
[idee]

Je veux une premiere analyse claire :
- probleme resolu ;
- clients cibles ;
- douleur actuelle ;
- alternatives existantes ;
- proposition de valeur ;
- potentiel de monetisation ;
- complexite de mise en oeuvre ;
- mode recommande : leger ou complet ;
- prochaine action concrete.

Ne lance pas encore le projet sans mon accord.
```

Template utilise par l'agent :

- `docs/templates/ANALYSE_BUSINESS_MARCHE.md`

## Prompt SaaS Idea Elevator adapte OpenClaw

Quand tu veux reprendre l'esprit du GPT SaaS Idea Elevator, utilise ce prompt :

```text
@amsclawMM_bot Lance une ideation SaaS complete avec le template OpenClaw :
[idee brute]

Contexte :
[pays / cible / secteur / probleme observe]

Je veux que tu analyses :
- le probleme concret ;
- la cible prioritaire ;
- les jobs-to-be-done ;
- la proposition de valeur ;
- les alternatives ;
- les opportunites IA utiles ;
- le business model ;
- les risques ;
- le MVP, la V1 et la V2 ;
- le score d'opportunite ;
- une recommandation Go / No-Go / A clarifier.

Ne cree pas encore le projet sans mon accord.
```

Template utilise par l'agent :

- `docs/templates/IDEATION_SAAS_COMPLET.md`

## Prompt site vitrine / petit projet

Pour un site simple, artisan, PME, association, commerce local :

```text
@amsclawMM_bot Recommande le bon process :
je veux creer un site vitrine pour [type de client].

Objectif :
[presentation, contact, WhatsApp, galerie, SEO local, prise de contact]

Contexte :
[ville / pays / cible / activite]

Contraintes :
site simple, rapide, sans compte utilisateur, sans paiement, sans back-office complexe.
```

Exemple :

```text
@amsclawMM_bot Recommande le bon process :
je veux creer un site vitrine pour un menuisier a Conakry.

Objectif :
presenter ses services, montrer ses realisations, recevoir des demandes par WhatsApp et ameliorer sa visibilite locale.

Contraintes :
site simple, rapide, sans paiement, sans compte utilisateur.
```

## Prompt SaaS / projet complet

Pour une application plus ambitieuse :

```text
@amsclawMM_bot Recommande le bon process :
je veux creer une application SaaS pour [cible].

Objectif :
[resultat attendu]

Fonctionnalites envisagees :
- [fonction 1]
- [fonction 2]
- [fonction 3]

Contraintes :
[paiement, utilisateurs, donnees, pays, stack, delai, budget]

Je veux que tu determines si le process lourd est necessaire.
```

## Ce que l'agent doit faire apres le prompt

### Si l'idee est claire

L'agent peut agir directement :

1. recommander ou confirmer le mode ;
2. proposer un nom projet ;
3. creer le projet dashboard ;
4. creer le dossier projet ;
5. creer les premiers documents ;
6. creer la premiere tache de validation.

### Si l'idee est floue

L'agent doit d'abord poser des questions.

Questions prioritaires :

- Quel probleme concret veux-tu resoudre ?
- Pour qui ?
- Quel resultat minimum rendrait le projet utile ?
- Est-ce un outil interne, un site, une app, ou un SaaS ?
- Y a-t-il paiement, compte utilisateur ou donnees sensibles ?
- Quelle est la premiere version la plus simple ?

### Si Ams demande seulement de brainstormer

L'agent ne doit pas creer de projet.

Il doit produire une synthese d'idee et attendre la validation d'Ams.

## Points de validation a attendre

### Mode leger

Tu interviens surtout pour :

- valider le besoin ;
- valider la mini spec ;
- valider la recette finale.

### Mode complet

Tu interviens surtout pour :

- valider le brief produit ;
- valider le PRD ;
- valider la spec front si l'UX est importante ;
- valider l'architecture si elle implique stack, hebergement, securite, couts ou donnees sensibles ;
- valider le cahier de recette ;
- valider la V1.

Entre ces validations, l'agent avance de maniere autonome dans le perimetre approuve.

## Formules courtes utiles

### Demarrer vite

```text
@amsclawMM_bot Recommande le bon process : [idee courte]
```

### Brainstormer sans creer

```text
@amsclawMM_bot Aide-moi a clarifier cette idee sans creer de projet pour l'instant : [idee]
```

### Creer directement un petit projet

```text
@amsclawMM_bot Demarre le process projet leger : [idee]
```

### Creer directement un projet complet

```text
@amsclawMM_bot Demarre le process projet lourd : [idee]
```

### Reprendre un projet

```text
@amsclawMM_bot Reprends le projet [nom du projet] et dis-moi la prochaine action.
```

## Ce qu'il faut eviter

- Demander "fais-moi une application" sans expliquer le probleme.
- Demander un projet complet quand un mode leger suffit.
- Lancer le developpement sans validation du besoin.
- Ajouter paiement, comptes utilisateurs ou donnees sensibles sans le dire.
- Melanger plusieurs idees dans un seul projet.

## Phrase de demarrage ideale

La phrase ideale contient :

- l'idee ;
- la cible ;
- le resultat attendu ;
- le niveau souhaite si tu le connais ;
- les contraintes importantes.

Modele :

```text
@amsclawMM_bot Recommande le bon process pour ce nouveau projet :
je veux [idee].

Cible :
[utilisateurs / clients]

Objectif :
[resultat attendu]

Contraintes :
[temps, budget, donnees, paiement, pays, outil, support]
```

## Exemple complet

```text
@amsclawMM_bot Recommande le bon process pour ce nouveau projet :
je veux creer un outil de suivi des relances clients pour petites entreprises.

Cible :
PME en Afrique francophone qui suivent encore les relances sur Excel ou WhatsApp.

Objectif :
centraliser les clients, les factures en retard et generer des messages de relance prets a envoyer.

Contraintes :
je veux commencer simple, mais il pourrait y avoir plus tard des comptes utilisateurs et un abonnement.
```

Reponse attendue de l'agent :

- reformulation de l'idee ;
- recommandation du mode ;
- questions utiles ;
- proposition de nom projet ;
- creation projet si Ams valide ou si l'objectif est clair ;
- premiere tache de validation dans le dashboard.

## Prochaine amelioration

Tester ce guide sur un premier projet reel, puis produire une V0.2 avec les ajustements observes.
