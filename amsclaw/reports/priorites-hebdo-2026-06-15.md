# Priorites hebdomadaires - 2026-06-15

Heure de generation : 00:30 Europe/Paris

## Synthese

La semaine doit rester orientee terrain. Le CRM ecole est valide en V1 et devient le projet prioritaire a transformer en usage reel. Le dashboard reste utile comme cockpit, mais il ne doit pas prendre le dessus sur la livraison terrain. Le projet relance paiements scolaires WhatsApp garde un fort potentiel business, a condition de partir d'un cas concret.

## Ordre recommande

1. `Creation CRM pour une ecole`
   - Statut : V1 validee, utilisable sur Mac et Windows d'apres l'index projet.
   - Action de la semaine : charger ou saisir les donnees reelles, utiliser le runbook, noter les retours terrain.
   - Resultat attendu : premiers retours exploitables pour decider d'une V1.1 courte.

2. `Dashboard multi-agent`
   - Statut : actif, cockpit deja stabilise.
   - Action de la semaine : cadrer `Validations projet visibles dans Taches`.
   - Resultat attendu : meilleure visibilite des validations importantes sans complexifier la source de verite.

3. `Relance paiements scolaires WhatsApp`
   - Statut : actif, V1 a cadrer.
   - Action de la semaine : identifier un premier fichier, une classe ou une ecole test.
   - Resultat attendu : choisir entre fichier Excel ameliore, mini app locale ou formulaire web simple.

## Projets bloques

Aucun projet bloque detecte dans :

- `amsclaw/PROJECTS_INDEX.md`
- `memory/active-projects.md`

## Opportunites business detectees

1. Pack terrain ecole locale
   - Angle : CRM eleves local + import Excel + sauvegardes + formation courte.
   - Pourquoi maintenant : le projet CRM a une V1 concrete qui peut servir de demonstration.
   - Prochaine validation : verifier si GS AIME CEASIRE peut fournir ou confirmer un jeu de donnees reel.

2. Relance paiements scolaires WhatsApp
   - Angle : suivi simple des montants dus / payes + recu + message WhatsApp pret a copier.
   - Pourquoi maintenant : besoin potentiellement monetisable et plus facile a vendre qu'un CRM scolaire complet.
   - Prochaine validation : trouver 10 lignes de paiements ou simuler un cas credibile.

3. Service de migration Excel vers outil simple
   - Angle : transformer les fichiers ecole/PME disperses en mini outil local avec sauvegarde et exports.
   - Pourquoi maintenant : le CRM ecole prouve la methode : besoin court, PRD, recette, V1 locale.
   - Prochaine validation : lister 2 ou 3 processus papier/Excel frequents en Guinee ou PME francophones.

## Avancement hebdomadaire

- `Creation CRM pour une ecole` : forte avancee, V1 validee et documentee.
- `Dashboard multi-agent` : stable, prochaine evolution clairement cadree.
- `Relance paiements scolaires WhatsApp` : opportunite encore en cadrage, pas bloquee mais depend d'un cas test.
- `Espace de travail amsClaw` : propre, aucun projet en pause ou cloture a traiter.
- `Connexion donnees dashboard` : pas de divergence signalee au dernier controle.

## Point de vigilance

Le risque principal de la semaine est la dispersion : scripts, dashboard, V1.1, V2 scolaire, paiements WhatsApp et nouvelles idees peuvent vite se melanger. La bonne sequence reste :

```text
CRM terrain -> retours reels -> V1.1 courte si necessaire -> opportunite paiements WhatsApp
```

## Decision heartbeat

Ne pas notifier Ams.

Raison :

- aucun blocage ;
- aucun arbitrage urgent ;
- la revue hebdomadaire est documentee ;
- la prochaine action reste claire.
