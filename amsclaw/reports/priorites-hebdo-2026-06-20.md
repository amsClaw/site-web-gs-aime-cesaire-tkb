# Priorites hebdomadaires - 2026-06-20

Heure de controle : 10:30 Europe/Paris

Objectif :
reviser les priorites, verifier l'avancement des projets et detecter les opportunites utiles sans disperser Ams.

## Synthese

La priorite de la semaine reste de transformer l'ecosysteme OpenClaw en machine d'execution simple :

1. valider `Automatisation projet AAS` V0.1 ;
2. terminer la validation des roles du CRM ecole apres durcissement serveur ;
3. choisir un cas test court pour appliquer AAS ;
4. garder `Relance paiements scolaires WhatsApp` en cadrage court.

## Priorite recommandee

1. **Automatisation projet AAS** : relire la V0.1 officielle et l'utiliser sur un cas reel.
2. **Creation CRM pour une ecole** : valider les roles `admin`, `secretariat` et `instructeur` dans l'interface.
3. **Dashboard multi-agent** : cadrer `Validations projet visibles dans Taches`, sans complexifier la source de donnees.
4. **Relance paiements scolaires WhatsApp** : identifier un fichier ou une classe pilote avant tout developpement.

## Avancement par projet

### Automatisation projet AAS

Statut :
actif, V0.1 officielle.

Avancement :
le draft initial a ete fusionne avec le guide manuel Ams et transforme en process V0.1 avec garde-fous, validations et templates OpenClaw.

Risque :
le process reste theorique tant qu'il n'est pas teste sur un projet reel.

Prochaine action :
relire `amsclaw/projects/automatisation-projet-aas/docs/PROCESS_AAS_FUSIONNE.md`, puis choisir un cas test court.

### Creation CRM pour une ecole

Statut :
actif, V1 validee et durcie.

Avancement :
donnees chargees, usage reseau local valide, affichage Eleves iPhone valide, sessions serveur et droits API par role ajoutes.

Risque :
ouvrir trop vite une V1.1 fonctionnelle avant d'avoir valide les droits et les retours terrain.

Prochaine action :
faire valider les roles `admin`, `secretariat` et `instructeur`.

### Dashboard multi-agent

Statut :
actif, cockpit stable.

Avancement :
audit Markdown / JSON relance le 2026-06-20 : aucune divergence.

Risque :
ajouter une synchronisation inverse ou une logique trop generique avant d'avoir observe de nouveaux cas reels.

Prochaine action :
cadrer l'evolution `Validations projet visibles dans Taches`.

### Relance paiements scolaires WhatsApp

Statut :
actif, cadrage V1.

Avancement :
le perimetre utile est clair : paiements attendus, paiements recus, reste a payer, recu simple, message WhatsApp pret a copier.

Risque :
deriver vers une gestion scolaire complete alors que le besoin vendable est un flux court de relance.

Prochaine action :
identifier une ecole, une classe ou un fichier Excel existant comme cas pilote.

### Sensibilisation Code de la route & Civisme

Statut :
en attente.

Avancement :
idee cadree et documentee.

Risque :
disperser Ams si le test 30 jours est lance avant les priorites education / AAS.

Prochaine action :
ne pas lancer sans decision explicite d'Ams.

## Opportunites business detectees

### 1. Pack education local

Opportunity :
assembler progressivement CRM ecole, suivi de scolarite, relance paiements et exports Excel comme suite modulaire pour petites ecoles d'Afrique francophone.

Interet :
fort, car le CRM fournit deja un terrain reel et la relance paiements peut devenir un module vendable court.

Condition :
ne pas promettre une gestion scolaire complete avant validation terrain.

### 2. AAS comme accelerateur interne

Opportunity :
utiliser AAS pour transformer chaque idee en sequence reproductible : brief, PRD, recette, V1, tests, documentation, decision Go / No-Go.

Interet :
fort, car cela reduit la dispersion et rend les futurs projets plus rapides a cadrer.

Condition :
tester la V0.1 sur un cas reel cette semaine.

### 3. Assistant PME Excel + WhatsApp

Opportunity :
adapter le futur module de relance scolaire a d'autres PME : factures, relances clients, suivi de paiement, recus simples.

Interet :
moyen a fort, mais seulement apres validation d'un premier cas education.

## Projets a ne pas relancer maintenant

- `Sensibilisation Code de la route & Civisme` : garder en attente.
- Nouvelle idee SaaS non cadree : attendre que AAS V0.1 soit teste.
- V1.1 CRM large : attendre les retours terrain et la validation des roles.

## Blocages

Aucun blocage technique urgent detecte.

Blocages de decision :

- AAS doit etre relu et teste avant de devenir le standard OpenClaw.
- CRM doit recevoir une validation utilisateur des roles apres durcissement serveur.
- Relance paiements a besoin d'un cas pilote concret.

## Controle donnees

Audit dashboard relance le 2026-06-20 :

- projets seulement JSON : 0 ;
- projets seulement Markdown : 0 ;
- prochaines actions divergentes : 0 ;
- statuts divergents : 0 ;
- decisions dashboard non journalisees : 0.

## Controle documentaire

Controle mensuel leger execute pendant le heartbeat :

- aucun projet actif ou en attente sans `README.md` ;
- aucun projet actif ou en attente sans `docs/PROJECT_BRIEF.md` ;
- aucun projet actif ou en attente sans `docs/NEXT_STEPS.md` ;
- aucun projet cloture reference a archiver ;
- aucun projet abandonne detecte, mais `Sensibilisation Code de la route & Civisme` reste volontairement en attente.

## Recommandation hebdomadaire

Ne pas ouvrir de nouveau chantier.

Sequence conseillee :

```text
1. Valider les roles CRM.
2. Relire AAS V0.1.
3. Appliquer AAS sur une evolution courte ou sur Relance paiements.
4. Documenter le retour d'experience avant d'elargir.
```
