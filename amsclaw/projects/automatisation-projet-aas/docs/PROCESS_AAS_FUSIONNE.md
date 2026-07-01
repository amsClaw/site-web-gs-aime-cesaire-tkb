# Processus AAS fusionne — V0.1 officielle OpenClaw

> Statut : V0.1 officielle, utilisable comme procedure de reference apres relecture Ams.
> Date : 2026-06-19
> Source : fusion du draft amsClaw, du guide manuel Ams et des templates `automatisation Projets SAAS`.

## Objectif

Transformer le processus manuel de creation d'application IA / SaaS en un processus OpenClaw reutilisable pour les projets d'Ams.

Le processus doit permettre de partir d'une idee et d'arriver a un produit fonctionnel, documente, testable et pilotable depuis le dashboard, sans obliger Ams a gerer lui-meme tous les outils, prompts et fichiers intermediaires.

## Ce que fixe la V0.1

Cette version fige le socle de travail OpenClaw :

- un mode leger par defaut pour eviter la surdocumentation ;
- un mode complet pour les projets SaaS, apps complexes ou projets a risque ;
- des commandes de demarrage explicites pour laisser Ams forcer le mode ;
- des points de validation Ams visibles dans le dashboard ;
- des templates OpenClaw reutilisables dans `docs/templates/` ;
- des garde-fous sur securite, couts, donnees sensibles, publication et decisions structurantes ;
- une autonomie d'execution entre deux validations, sans autonomie sur les decisions sensibles.

La V0.1 est une procedure operationnelle. Elle devra etre ajustee apres 1 ou 2 projets reels.

## Principe directeur

OpenClaw orchestre le travail. Ams garde les decisions.

Le process ne doit pas devenir une usine a gaz. Il doit s'adapter a la taille du projet :

- **Mode leger** : petit outil, automatisation, prototype, script, mini app locale.
- **Mode complet** : SaaS commercialisable, app multi-utilisateurs, donnees sensibles, paiement, deploiement public, usage client.

Les templates du dossier source ne sont pas repris tels quels. Ils deviennent des bases adaptees au fonctionnement OpenClaw :

- les noms d'outils externes deviennent des roles d'agents ;
- les prompts deviennent des instructions reutilisables ;
- les livrables deviennent des fichiers standardises ;
- les validations deviennent des taches visibles dans le dashboard ;
- les exemples Shopify servent de reference de qualite.

## Autonomie et limites de l'agent

Entre deux validations Ams, l'agent peut avancer de maniere autonome si :

- le perimetre valide est clair ;
- il reste dans les choix approuves ;
- il ne change pas la direction produit ;
- il ne cree pas de cout, publication ou dependance externe non validee ;
- il journalise les decisions importantes.

L'agent doit s'arreter et demander validation si :

- le perimetre V1 change ;
- une depense, souscription ou cout recurrent apparait ;
- une publication publique est envisagee ;
- un message doit etre envoye a un tiers ;
- des donnees doivent etre supprimees ou migrees ;
- des comptes utilisateurs, paiement, donnees sensibles ou droits d'acces sont introduits ;
- la stack, l'hebergement ou l'architecture doivent changer ;
- une contradiction bloque l'execution.

## Agents specialises

### amsClaw — orchestration

Responsabilites :

- clarifier l'objectif ;
- choisir le mode leger ou complet ;
- coordonner les agents specialises ;
- tenir le dashboard et l'index projet a jour ;
- proteger Ams contre la complexite inutile ;
- proposer la prochaine action concrete.

### Agent Produit & Communication

Responsabilites :

- ideation ;
- proposition de valeur ;
- business model ;
- positionnement ;
- monétisation ;
- brief produit ;
- PRD ;
- messages marketing et documentation utilisateur.

### Agent Recherche & Veille

Responsabilites :

- benchmark ;
- analyse concurrence ;
- veille marche ;
- recherche d'opportunites ;
- sources et tendances ;
- validation de faisabilite marche.

### Agent Technique & Automatisation

Responsabilites :

- architecture ;
- choix stack ;
- modele de donnees ;
- API ;
- securite ;
- developpement ;
- tests ;
- automatisation ;
- deploiement.

### Agent Organisation & PMO

Responsabilites :

- planning ;
- priorisation ;
- decoupage epics / stories ;
- backlog ;
- suivi dashboard ;
- points de validation ;
- historique des decisions ;
- readiness du projet pour reprise ulterieure.

## Choix du mode

### Regle de decision rapide

Le mode leger est le mode par defaut.

L'agent ne passe en mode complet que si au moins un declencheur fort est present. En cas de doute, l'agent doit proposer le mode leger avec une option d'extension, puis demander validation a Ams.

### Commandes explicites d'Ams

Ams peut forcer le mode a tout moment au demarrage du projet.

Commandes reconnues :

- **"Demarre le process projet leger"** : l'agent applique le mode leger, sauf risque critique de securite ou donnees sensibles.
- **"Demarre le process projet lourd"** : l'agent applique le mode complet, meme si le projet semble simple.
- **"Recommande le bon process"** : l'agent applique la regle de decision rapide et explique son choix.

Regle :

- si Ams force le mode lourd, l'agent respecte ce choix ;
- l'agent peut signaler que le mode lourd risque d'etre excessif, mais il ne le bloque pas ;
- si Ams force le mode leger alors qu'il y a paiement, donnees sensibles, comptes utilisateurs ou usage multi-clients, l'agent doit alerter et demander confirmation avant de continuer.

Questions de triage a poser au demarrage :

1. Le projet doit-il gerer des comptes utilisateurs ou une authentification ?
2. Le projet manipule-t-il des donnees personnelles, sensibles ou metier critiques ?
3. Le projet comporte-t-il paiement, abonnement, facturation ou espace client ?
4. Le projet doit-il etre maintenu comme un produit durable avec plusieurs versions ?
5. Le projet doit-il s'integrer a des API externes importantes ?
6. Le projet aura-t-il une base de donnees ou des workflows metier ?
7. Le projet doit-il etre utilise par plusieurs organisations ou clients ?
8. Le projet a-t-il un objectif commercial direct au-dela d'une simple presence en ligne ?

Interpretation :

- 0 a 1 reponse "oui" faible : mode leger.
- 2 a 3 reponses "oui" : mode leger renforce, avec mini spec plus detaillee.
- 4 reponses "oui" ou plus : mode complet.
- 1 seul "oui" critique sur paiement, donnees sensibles, comptes utilisateurs ou usage multi-clients : mode complet recommande.

Exemple :

Un site vitrine pour un artisan doit partir en mode leger si le besoin est : pages publiques, presentation, photos, formulaire de contact simple, SEO local, hebergement simple.

Il bascule en mode complet seulement si on ajoute : espace client, prise de rendez-vous avec compte, paiement en ligne, devis automatises complexes, CRM, donnees sensibles, back-office multi-utilisateurs ou objectif SaaS.

## Criteres Go / No-Go

Les criteres Go / No-Go servent a eviter de lancer un developpement mal cadre.

### Go

Un projet peut avancer si :

- le probleme est compris ;
- la cible est identifiee ;
- le resultat utile de la V1 est clair ;
- le mode leger/complet est choisi ou force par Ams ;
- les risques critiques sont connus ;
- la prochaine validation dashboard est creee.

### Go conditionnel

Le projet peut avancer avec une reserve si :

- l'idee est interessante mais la cible reste a clarifier ;
- le potentiel business est plausible mais non verifie ;
- la technique semble faisable mais demande un spike court ;
- le perimetre V1 doit etre reduit avant developpement.

Dans ce cas, l'agent doit creer une tache dashboard de clarification ou de spike avant de coder.

### No-Go temporaire

Le projet ne doit pas passer en developpement si :

- le probleme est flou ;
- la cible n'est pas definie ;
- le projet melange plusieurs idees incompatibles ;
- une decision structurante manque ;
- des couts ou obligations externes sont necessaires sans validation ;
- des donnees sensibles sont impliquees sans cadrage securite ;
- Ams n'a pas valide le livrable de cadrage attendu.

### Stop obligatoire

L'agent doit stopper et demander validation explicite si :

- paiement, abonnement ou facturation sont ajoutes ;
- authentification ou espace client sont ajoutes ;
- donnees personnelles, scolaires, financieres, medicales ou sensibles sont manipulees ;
- publication publique, envoi d'email/message ou exposition web externe sont prevus ;
- suppression irreversible de donnees ou fichiers est envisagee.

### Mode leger

Utiliser ce mode si le projet est :

- un script ;
- une automatisation personnelle ;
- un outil local ;
- un site vitrine simple ;
- une petite app sans paiement ;
- une preuve de concept ;
- un MVP rapide pour tester une idee.

Livrables minimum :

- `docs/IDEE.md`
- `docs/MINI_SPEC.md`
- `docs/PLAN_DEV.md`
- `docs/CAHIER_RECETTE_LIGHT.md`
- app / script fonctionnel

Validations Ams :

- validation du besoin ;
- validation de la mini spec ;
- recette finale.

### Mode complet

Utiliser ce mode si le projet comporte au moins un de ces elements :

- comptes utilisateurs ou espace authentifie ;
- paiement ou abonnement ;
- donnees personnelles ou sensibles ;
- espace client ;
- application publique transactionnelle ou avec donnees persistantes ;
- objectif commercial avec parcours de vente, paiement, devis automatise ou suivi client ;
- integration API importante ;
- besoin de maintenance durable.

Livrables minimum :

- `docs/IDEE.md`
- `docs/BENCHMARK.md`
- `docs/PROJECT_BRIEF.md`
- `docs/PRD_V1.md`
- `docs/PRD_REVIEW.md`
- `docs/PRD_V2.md`
- `docs/FRONT_SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/BACKLOG.md`
- `docs/CAHIER_RECETTE_V1.md`
- `docs/DECISIONS.md` ou section decisions dans README / memoire
- app fonctionnelle + tests + documentation utilisateur si necessaire

Validations Ams :

- validation du brief produit ;
- validation du PRD ;
- validation de l'architecture si decisions structurantes ;
- validation des maquettes/spec front ;
- validation recette.

## Processus complet OpenClaw

### Phase 0 — Creation du projet

Objectif : creer un espace projet redemarrable.

Agent principal : amsClaw + Agent Organisation & PMO.

Inputs :

- idee brute ;
- nom provisoire ;
- priorite ;
- contexte metier ;
- objectif final.

Actions :

- creer le dossier projet ;
- creer README, brief initial et prochaines etapes ;
- ajouter le projet au dashboard ;
- ajouter le projet a `amsclaw/PROJECTS_INDEX.md` ;
- enregistrer les decisions importantes en memoire ;
- determiner mode leger ou complet.

Livrables :

- `README.md`
- `docs/PROJECT_BRIEF.md` ou `docs/IDEE.md`
- `docs/NEXT_STEPS.md`
- entree dashboard

Validation Ams : oui, seulement si le cadrage ou la priorite est ambigu.

### Phase 1 — Ideation et cadrage

Objectif : transformer une idee vague en besoin clair.

Agent responsable : Agent Produit & Communication.

Role remplace dans le guide manuel :

- brainstorming ChatGPT ;
- GPT "SaaS Idea Elevator" ;
- premiere structuration du concept.

Questions minimales :

- Quel probleme concret resout-on ?
- Pour qui ?
- Pourquoi maintenant ?
- Quelle douleur existe aujourd'hui ?
- Quelle solution de contournement est utilisee ?
- Quel resultat minimum rendrait le projet utile ?
- Quel potentiel business ou gain de temps ?
- Qu'est-ce qu'on exclut de la V1 ?

Livrables mode leger :

- `docs/IDEE.md`
- section "Objectif / Utilisateur / Probleme / V1" dans README.

Livrables mode complet :

- `docs/IDEE.md`
- `docs/PROJECT_BRIEF.md`

Template a adapter :

- `docs/templates/IDEATION_PROJET_LEGER.md`
- `docs/templates/IDEATION_SAAS_COMPLET.md`

Validation Ams : oui si l'objectif, la cible ou le perimetre sont encore flous.

### Phase 2 — Recherche et benchmark

Objectif : comprendre ce qui existe et identifier les opportunites.

Agent responsable : Agent Recherche & Veille.

Role remplace dans le guide manuel :

- Perplexity Research ;
- recherche concurrentielle ;
- benchmark technologies et usages.

Actions :

- identifier 5 a 10 solutions similaires ;
- comparer cible, prix, fonctionnalites, positionnement, forces et faiblesses ;
- repérer les standards du marche ;
- formuler les opportunites de differenciation ;
- recommander ce qu'il faut reprendre, eviter et tester.

Livrable mode leger :

- section "Benchmark rapide" dans `docs/MINI_SPEC.md`, limitee a 3 concurrents ou alternatives.

Livrable mode complet :

- `docs/BENCHMARK.md`

Template OpenClaw :

- `docs/templates/ANALYSE_BUSINESS_MARCHE.md`

Regle :

- pas de rapport long par defaut ;
- synthese actionnable avant exhaustivite ;
- sources citees lorsque la recherche web est utilisee.

Validation Ams : non par defaut, sauf si le benchmark remet en cause l'idee.

### Phase 3 — Brief produit

Objectif : produire une vision produit exploitable pour la suite.

Agent responsable : Agent Produit & Communication.

Actions :

- condenser idee + benchmark ;
- definir cible prioritaire ;
- formuler proposition de valeur ;
- distinguer MVP, V1, V2 ;
- identifier modele economique ;
- formaliser risques et hypotheses ;
- poser les questions bloquantes.

Livrables :

- mode leger : `docs/MINI_SPEC.md`
- mode complet : `docs/PROJECT_BRIEF.md`

Template OpenClaw :

- `docs/templates/BRIEF_PRODUIT.md`

Contenu minimum du brief complet :

- resume executif ;
- probleme ;
- utilisateurs cibles ;
- jobs-to-be-done ;
- proposition de valeur ;
- solution V1 ;
- business model ;
- opportunites IA ;
- risques ;
- prochaines actions.

Reference qualite :

- `Exemple Shopify/Project Brief.docx`

Validation Ams : oui.

### Phase 4 — PRD

Objectif : transformer le brief en exigences produit.

Agent responsable : Agent Produit & Communication.

Actions :

- formaliser les objectifs produit ;
- detailler les fonctionnalites ;
- definir les user stories ;
- separer MVP, V1, backlog ;
- expliciter les regles metier ;
- poser les criteres d'acceptation ;
- noter les exigences non fonctionnelles utiles ;
- lister les decisions ouvertes.

Livrable mode leger :

- section "Fonctionnalites et criteres d'acceptation" dans `docs/MINI_SPEC.md`.

Livrables mode complet :

- `docs/PRD_V1.md`
- `docs/PRD_REVIEW.md`
- `docs/PRD_V2.md`

Adaptation du guide manuel :

- remplacer "Claude redige / GPT critique" par un flux Agent Produit redige, puis Agent Produit ou Agent PMO critique avec un regard senior ;
- conserver l'idee de produire une V2 apres critique.

Reference qualite :

- `Exemple Shopify/PRD_Copilote_Merchandising_Shopify_v2.md`
- `Sources/example_prd_rpg.txt`

Validation Ams : oui, obligatoire avant architecture detaillee ou developpement.

### Phase 5 — Spec front / UX

Objectif : clarifier les ecrans, parcours et comportements avant de coder.

Agent responsable : Agent Produit & Communication, avec Agent Technique si interface complexe.

Actions :

- definir les personas utiles ;
- lister les ecrans ;
- dessiner les flux principaux ;
- decrire les composants attendus ;
- definir les etats vides, erreurs et confirmations ;
- verifier mobile / desktop ;
- identifier les points de friction.

Livrable mode leger :

- section "Ecrans / parcours" dans `docs/MINI_SPEC.md`, ou prototype rapide si necessaire.

Livrable mode complet :

- `docs/FRONT_SPEC.md`

Template a adapter :

- `docs/templates/FRONT_SPEC_LIGHT.md`
- `docs/templates/FRONT_SPEC_COMPLETE.md`

Reference qualite :

- `Exemple Shopify/front-spec-ux-ui.md`

Validation Ams : oui si l'interface est importante pour l'usage.

### Phase 6 — Architecture technique

Objectif : definir comment construire sans surdimensionner.

Agent responsable : Agent Technique & Automatisation.

Actions :

- recommander une stack ;
- justifier les choix ;
- definir structure projet ;
- definir modele de donnees ;
- cadrer API et integrations ;
- cadrer securite ;
- cadrer tests ;
- cadrer deploiement ;
- lister hypotheses et questions bloquantes.

Livrable mode leger :

- `docs/PLAN_DEV.md`, avec stack, fichiers principaux, donnees, tests minimum.

Livrable mode complet :

- `docs/ARCHITECTURE.md`

Template a adapter :

- `docs/templates/ARCHITECTURE_LIGHT.md`
- `docs/templates/ARCHITECTURE_COMPLETE.md`

Regle anti-lourdeur :

- pour un petit projet, ne pas remplir toutes les rubriques du template architecture ;
- pour un SaaS public, ne pas ignorer securite, deploiement, variables d'environnement, logs et sauvegardes.

Reference qualite :

- `Exemple Shopify/architecture-copilote-merchandising.md`

Validation Ams : oui si la stack, l'hebergement, le paiement ou les couts sont structurants.

### Phase 7 — Backlog, epics et stories

Objectif : transformer la documentation en travail executable.

Agent responsable : Agent Organisation & PMO + Agent Technique.

Actions :

- decouper le produit en epics ;
- decouper chaque epic en stories ;
- limiter chaque story a un increment testable ;
- definir dependances ;
- definir criteres d'acceptation ;
- prioriser V1 / V1.1 / plus tard ;
- creer les taches dashboard utiles.

Livrables :

- mode leger : checklist dans `docs/PLAN_DEV.md`
- mode complet : `docs/BACKLOG.md`

Regle :

- une story doit etre assez petite pour etre implementee et testee sans perdre le contexte ;
- si une story depasse une demi-journee de travail agent, elle doit etre decoupee.

Validation Ams : non par defaut, sauf arbitrage de priorite.

### Phase 8 — Developpement

Objectif : construire par increments testes.

Agent responsable : Agent Technique & Automatisation.

Actions :

- initialiser ou reprendre le repo ;
- implementer story par story ;
- tester a chaque increment ;
- documenter decisions techniques ;
- eviter les refontes non demandees ;
- faire une review avant validation ;
- livrer une V1 utilisable.

Contexte minimum donne a l'agent technique :

- PRD ou mini spec ;
- architecture ou plan dev ;
- story cible ;
- fichiers concernes ;
- criteres d'acceptation ;
- contraintes connues.

Livrables :

- code fonctionnel ;
- tests ;
- notes de release ou changelog ;
- guide de lancement si necessaire ;
- documentation utilisateur si usage non technique.

Validation Ams : non pendant les increments techniques, oui a la fin d'un jalon visible.

### Phase 9 — Recette et iteration

Objectif : verifier que le produit marche pour le besoin reel.

Agent responsable : Agent Organisation & PMO + Agent Technique.

Actions :

- creer un cahier de recette ;
- executer tests automatises ;
- verifier les flux metier ;
- collecter retours Ams ;
- classer bugs / ajustements / idees futures ;
- corriger en cycle court ;
- documenter la validation finale.

Livrable mode leger :

- `docs/CAHIER_RECETTE_LIGHT.md`

Livrables mode complet :

- `docs/CAHIER_RECETTE_V1.md`
- `reports/STABILISATION_V1_YYYY-MM-DD.md` si projet deploye ou livre.

Validation Ams : oui, obligatoire avant cloture V1.

## Matrice des livrables

| Livrable | Mode leger | Mode complet | Responsable |
|---|---:|---:|---|
| README projet | Oui | Oui | PMO |
| Idee | Oui | Oui | Produit |
| Benchmark | Optionnel court | Oui | Recherche |
| Brief produit | Fusionne mini spec | Oui | Produit |
| PRD | Mini spec | Oui | Produit |
| Review PRD | Optionnel | Oui | Produit / PMO |
| Spec front | Optionnel | Oui si UI | Produit |
| Architecture | Plan dev simple | Oui | Technique |
| Backlog | Checklist | Oui | PMO / Technique |
| Cahier recette | Light | Oui | PMO |
| Guide utilisateur | Si utile | Oui si utilisateurs externes | Produit |
| Rapport stabilisation | Non | Oui si livraison | Technique |

## Points de validation dashboard

Chaque validation importante doit devenir visible dans le dashboard sous forme de tache ou de statut projet.

### Mode leger

| Validation | Fichier cible | Condition de passage |
|---|---|---|
| Valider le besoin | `docs/IDEE.md` | Ams confirme le probleme, la cible et le resultat attendu |
| Valider la mini spec | `docs/MINI_SPEC.md` | Ams confirme le perimetre V1 et les exclusions |
| Valider la recette finale | `docs/CAHIER_RECETTE_LIGHT.md` | Ams confirme que le livrable repond au besoin |

### Mode complet

| Validation | Fichier cible | Condition de passage |
|---|---|---|
| Valider le brief produit | `docs/PROJECT_BRIEF.md` | Vision, cible, probleme et proposition de valeur valides |
| Valider le PRD | `docs/PRD_V2.md` | Fonctionnalites, regles metier et criteres d'acceptation valides |
| Valider la spec front | `docs/FRONT_SPEC.md` | Parcours et ecrans valides si l'interface est structurante |
| Valider l'architecture | `docs/ARCHITECTURE.md` | Stack, hebergement, couts, securite et donnees valides si structurants |
| Valider le cahier de recette | `docs/CAHIER_RECETTE_V1.md` | Cas de test et criteres de validation acceptes |
| Valider la V1 | `reports/STABILISATION_V1_YYYY-MM-DD.md` ou rapport de recette | Livraison acceptee et suite decidee |

### Taches dashboard recommandees

- `Valider le brief produit`
- `Valider le PRD`
- `Valider la spec front`
- `Valider l'architecture`
- `Valider le cahier de recette`
- `Valider la V1`

Regle :

- une validation Ams doit avoir un fichier cible ;
- la tache dashboard doit mentionner le fichier a relire ;
- apres validation, la decision doit etre notee dans l'historique projet ;
- si Ams valide dans Telegram, l'agent doit reporter la validation dans le dashboard et la memoire durable ;
- si Ams demande une correction, la tache reste ouverte jusqu'a production de la version corrigee.

## Adaptation des templates existants

### `Sources/instructions.txt`

Statut V0.1 :

- transforme en templates OpenClaw dedies ;
- conserve comme source historique et reference d'ambition SaaS ;
- ne doit plus etre utilise tel quel pour tous les projets.

Templates crees :

- `docs/templates/IDEATION_PROJET_LEGER.md`
- `docs/templates/IDEATION_SAAS_COMPLET.md`
- `docs/templates/ANALYSE_BUSINESS_MARCHE.md`
- `docs/templates/BRIEF_PRODUIT.md`

### `Sources/front-end-spec-tmpl.md`

Statut V0.1 :

- transforme en deux versions OpenClaw.

Templates crees :

- `docs/templates/FRONT_SPEC_LIGHT.md`
- `docs/templates/FRONT_SPEC_COMPLETE.md`

### `Sources/architecture-tmpl.md`

Statut V0.1 :

- transforme en deux versions OpenClaw.

Templates crees :

- `docs/templates/ARCHITECTURE_LIGHT.md`
- `docs/templates/ARCHITECTURE_COMPLETE.md`

### Exemple Shopify

Usage cible :

- reference de qualite pour un projet SaaS complet ;
- exemple pour le niveau attendu PRD / front / architecture.

Limite :

- ne pas copier son niveau de lourdeur sur les petits projets.

## Definition du mode leger

Le mode leger est reussi si :

- Ams comprend ce qui va etre construit ;
- le perimetre V1 est clair ;
- l'agent technique sait quoi coder ;
- les criteres de recette sont explicites ;
- le projet reste redemarrable apres interruption.

Structure recommandee :

```text
README.md
docs/
  IDEE.md
  MINI_SPEC.md
  PLAN_DEV.md
  CAHIER_RECETTE_LIGHT.md
```

Phases appliquees :

1. Idee
2. Mini spec
3. Plan dev
4. Developpement
5. Recette

## Definition du mode complet

Le mode complet est reussi si :

- le produit est cadré comme un vrai projet ;
- le business model ou gain attendu est explicite ;
- les risques sont identifies ;
- l'architecture est claire ;
- le backlog est executable ;
- les validations Ams sont tracees ;
- la V1 peut etre testee, livree, reprise et amelioree.

Structure recommandee :

```text
README.md
docs/
  IDEE.md
  BENCHMARK.md
  PROJECT_BRIEF.md
  PRD_V1.md
  PRD_REVIEW.md
  PRD_V2.md
  FRONT_SPEC.md
  ARCHITECTURE.md
  BACKLOG.md
  CAHIER_RECETTE_V1.md
  NEXT_STEPS.md
reports/
  STABILISATION_V1_YYYY-MM-DD.md
```

Phases appliquees :

1. Creation projet
2. Ideation
3. Benchmark
4. Brief produit
5. PRD
6. Spec front
7. Architecture
8. Backlog
9. Developpement
10. Recette et iteration

## Criteres de qualite

Un projet passe correctement par le process si :

- chaque fichier utile existe ;
- chaque livrable a un objectif clair ;
- les decisions importantes sont tracees ;
- Ams sait quelle action faire ensuite ;
- le dashboard pointe vers les bonnes validations ;
- le perimetre V1 reste court ;
- les choix techniques sont justifies ;
- les tests ou controles de recette sont ecrits avant validation ;
- aucun projet n'est laisse sans prochaine action.

## Anti-patterns a eviter

- remplir tous les templates par reflexe ;
- transformer un petit script en faux SaaS ;
- coder avant d'avoir valide le besoin ;
- multiplier les outils externes alors qu'un agent specialise suffit ;
- produire des rapports longs qui ne guident aucune decision ;
- oublier le dashboard ;
- ne pas documenter une decision structurante ;
- laisser Ams valider oralement sans trace.

## Premiere utilisation recommandee

Tester le processus sur un petit projet reel avant de le stabiliser davantage.

Projet candidat :

- un outil interne utile a Ams ;
- perimetre court ;
- valeur visible rapidement ;
- pas de paiement ;
- peu d'integrations externes.

Objectif du test :

- verifier que le mode leger n'est pas trop lourd ;
- verifier que les validations dashboard sont utiles ;
- identifier les templates a simplifier ;
- produire une V1 sans ralentir l'execution.

## Points ouverts pour la V0.2

- decider si le dashboard doit generer automatiquement les livrables de base ;
- definir quand utiliser la recherche web ;
- ajouter une checklist automatique de creation projet ;
- tester sur un cas reel puis ajuster.

## Prochaine action

Faire relire la V0.1 par Ams, puis l'appliquer sur un premier projet test.

Apres un premier test terrain, produire une V0.2 avec les ajustements observes.
