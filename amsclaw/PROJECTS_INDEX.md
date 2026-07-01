# Index de reprise des projets amsClaw

Objectif :
servir de point d'entree unique apres redemarrage, nouvelle discussion OpenClaw ou reprise par un agent.

Derniere mise a jour : 2026-06-20

## Comment reprendre le fil

1. Lire ce fichier.
2. Ouvrir le README du projet prioritaire.
3. Verifier la prochaine action dans le README projet et, si besoin, dans `memory/active-projects.md`.
4. Consulter `memory/decisions.md` pour les derniers arbitrages.
5. Si le sujet concerne le dashboard, verifier aussi `amsclaw/dashboard/GUIDE_UTILISATION.md` et `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md`.

## Sources de verite

- Memoire durable des projets : `memory/active-projects.md`
- Decisions importantes : `memory/decisions.md`
- Guide d'organisation projet : `amsclaw/PROJECTS_GUIDE.md`
- Sas de depot temporaire des fichiers Ams : `amsclaw/inbox/`
- Index des rapports utiles : `amsclaw/reports/INDEX.md`
- Dashboard local : `http://127.0.0.1:8787/amsclaw/dashboard/`
- Donnees dashboard : `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`

## Priorite actuelle

1. **Nouveau** Valider le draft processus AAS avant de lancer un projet SaaS.
2. Choisir la prochaine petite evolution V1.1 du CRM ecole.
3. Stabiliser le dashboard comme cockpit de pilotage.
4. Cadrer la V1 de `Relance paiements scolaires WhatsApp`.

## Projets actifs

### Automatisation projet AAS

Statut : actif (V0.1 officielle)

Objectif :
Automatiser le processus de développement SaaS de l'idée au déploiement, en minimisant l'intervention humaine et en fusionnant le guide manuel d'Ams avec le draft automatisé.

Derniere avancee :
projet créé le 2026-06-19 depuis Telegram. Draft initial copié depuis `.process/saas-dev-draft.md` (7 phases, 45-70 min Ams par projet). Le guide manuel Ams et ses templates ont été analysés, puis le process fusionné OpenClaw a été renforcé en V0.1 officielle dans `docs/PROCESS_AAS_FUSIONNE.md`. Les templates OpenClaw réutilisables ont été créés dans `docs/templates/`, et le guide de démarrage Markdown/HTML a été mis à jour.

Prochaine action :
Relire la V0.1 officielle dans `docs/PROCESS_AAS_FUSIONNE.md`, puis tester le process sur un premier projet réel.

Documentation :

- `amsclaw/projects/automatisation-projet-aas/README.md`
- `amsclaw/projects/automatisation-projet-aas/docs/PROJECT_BRIEF.md`
- `amsclaw/projects/automatisation-projet-aas/docs/NEXT_STEPS.md`
- `amsclaw/projects/automatisation-projet-aas/docs/DRAFT_PROCESS_AAS.md`
- `amsclaw/projects/automatisation-projet-aas/docs/PROCESS_AAS_FUSIONNE.md`
- `amsclaw/projects/automatisation-projet-aas/docs/GUIDE_DEMARRAGE_PROJET.md`
- `amsclaw/projects/automatisation-projet-aas/docs/GUIDE_DEMARRAGE_PROJET.html`
- `amsclaw/projects/automatisation-projet-aas/docs/templates/README.md`

Points de vigilance :
- Processus à tester sur un projet réel avant de le considérer stable.
- La V0.1 doit être testée sur un projet réel avant d'être considérée stable.
- Ne pas surcharger le process avant un premier test terrain.

### Dashboard multi-agent

Statut : actif - V1 stable validee utilisateurs

Objectif :
construire le cockpit amsClaw pour centraliser projets, priorites, blocages, routines, idees business, decisions, backlog, recherche et recommandations des agents.

Derniere avancee :
V1.15 livree et validee par Ams le 2026-06-12 avec vues `Aujourd'hui`, `Backlog`, `Decisions`, `Revue hebdo`, `Recherche`, fiche projet detaillee, score projet, journal d'activite, projets dormants et sauvegardes versionnees. Le 2026-06-13, la synchronisation Markdown -> JSON a ete durcie avec audit prealable obligatoire, puis la checklist projet a ete integree et validee via la creation reelle du projet `Creation CRM pour une ecole`. Le projet CRM sert maintenant de cas pilote pour les actions guidees, avec une premiere action `Valider la PRD`. Le 2026-06-14, une tache liee est ajoutee pour rendre visible la validation du cahier de recette V1 dans l'onglet `Taches`, et l'automatisation des validations projet visibles comme taches est ajoutee au backlog.

Prochaine action :
cadrer l'evolution `Validations projet visibles dans Taches`.

Documentation :

- `amsclaw/projects/dashboard-multi-agent/README.md`
- `amsclaw/projects/dashboard-multi-agent/docs/ROADMAP.md`
- `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md`
- `amsclaw/projects/dashboard-multi-agent/docs/RITUEL_HEBDOMADAIRE.md`
- `amsclaw/projects/dashboard-multi-agent/docs/SOURCE_DE_VERITE_DONNEES.md`
- `amsclaw/dashboard/GUIDE_UTILISATION.md`

Commandes utiles :

```sh
./amsclaw/projects/dashboard-multi-agent/scripts/launch-v1.sh
```

Points de vigilance :

- Eviter de complexifier trop vite avec une base de donnees.
- Clarifier progressivement la source de verite entre Markdown et JSON.
- Continuer a tester chaque evolution avant de passer a la suivante.

### Espace de travail amsClaw

Statut : actif

Objectif :
garder une organisation propre entre workspace OpenClaw, projets, ressources, rapports et archives.

Derniere avancee :
le 2026-06-13, la checklist projet est devenue un controle standard pour les nouvelles creations depuis le dashboard, avec generation automatique de `docs/PROJECT_CHECKLIST.md`.

Prochaine action :
maintenir la checklist projet comme controle standard lors des prochaines creations depuis le dashboard.

Documentation :

- `amsclaw/PROJECTS_GUIDE.md`
- `amsclaw/PROJECTS_INDEX.md`
- `amsclaw/resources/project-creation-checklist.md`

Points de vigilance :

- Eviter que les rapports heartbeat deviennent une pile difficile a exploiter.
- Garder les projets redemarrables avec un objectif, un statut et une prochaine action.

### Connexion donnees dashboard

Statut : actif

Objectif :
remplacer progressivement les donnees codees ou dispersees par une source de donnees simple, lisible et synchronisable.

Derniere avancee :
le 2026-06-13, `sync-dashboard-data.js` a ete durci avec audit obligatoire avant ecriture, blocage en cas de divergence et sauvegarde pre-ecriture.

Prochaine action :
observer le prochain cas reel de divergence JSON / Markdown avant d'ajouter une synchronisation inverse.

Documentation :

- `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md`
- `amsclaw/projects/dashboard-multi-agent/docs/SOURCE_DE_VERITE_DONNEES.md`
- `amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js`

Points de vigilance :

- Ne pas automatiser l'ecriture JSON -> Markdown sans arbitrage.
- Continuer a bloquer les synchronisations si l'audit detecte une divergence non revue.

### Relance paiements scolaires WhatsApp

Statut : actif

Objectif :
tester un outil simple pour suivre les frais scolaires, generer des recus et preparer les relances parents WhatsApp.

Derniere avancee :
projet cree depuis le modele dashboard le 2026-06-12 avec structure projet minimale et cadrage V1 limite au flux paiement, recu et relance.

Prochaine action :
identifier un premier cas de test concret : une ecole, une classe ou un fichier Excel existant.

Documentation :

- `amsclaw/projects/relance-paiements-scolaires-whatsapp/README.md`
- `amsclaw/projects/relance-paiements-scolaires-whatsapp/docs/PROJECT_BRIEF.md`
- `amsclaw/projects/relance-paiements-scolaires-whatsapp/docs/NEXT_STEPS.md`

Points de vigilance :

- Ne pas elargir trop vite vers une gestion scolaire complete.
- Garder une V1 courte : paiements attendus, paiements recus, reste a payer, recu simple, message WhatsApp pret a copier.

### Creation CRM pour une ecole

Statut : actif

Objectif :
creer un CRM pour l'ecole GS AIME CESAIRE TKB en Guinee Conakry.

Derniere avancee :
projet cree depuis le modele dashboard le 2026-06-13. La creation a valide l'integration automatique de `docs/PROJECT_CHECKLIST.md`. Ams a formalise son besoin brut dans `docs/mon_besoin.md`, puis l'expression de besoin a ete structuree avec un perimetre V1 recommande. Trois precisions ont ete integrees : le CRM ne gere pas les paiements, il affiche seulement le statut de scolarite ; chaque fiche eleve doit contenir une section commentaires de suivi mise a jour par les instructeurs autorises ; la V1 doit proposer un import de liste eleves par Excel et un export Excel. Ams valide l'expression de besoin le 2026-06-13 avec cet ajustement. La PRD V1 est redigee dans `docs/PRD_V1.md` et soumise a validation. Le 2026-06-14, un workflow de prise en main est ajoute a la PRD pour visualiser l'ordre des actions, les dependances, les roles utilisateurs et les types de saisies. Le meme jour, deux commentaires PRD sont integres apres analyse de `docs/liste_eleve.xlsx` : les instructeurs sont geres comme utilisateurs rattaches aux classes, l'import Excel partiel est autorise avec badge `donnees a completer`, et la fiche eleve inclut `parent 2`. Ams valide la PRD V1 le 2026-06-14. Le cahier de recette V1 est produit puis valide par Ams le 2026-06-14. La premiere V1 locale est implementee le 2026-06-14 avec Node/Express, interface web, stockage JSON, import/export Excel et sauvegarde. Le premier retour recette V1 cree `docs/commentaires_v1.md` puis valide une evolution courte : modification et archivage/desactivation des classes et utilisateurs, sans suppression definitive, professeurs par matiere reportes en V2. Le champ visible `Niveau` des classes est clarifie en `Cycle`, puis le cycle passe en liste de selection et `Instructeurs rattaches` devient `Instructeur principal`.
Apres validation par Ams des ecrans Eleves, Classes et Utilisateurs, une photo optionnelle unique est ajoutee sur la fiche eleve avec affichage rond, recadrage simple et compression avant stockage. Ams valide les tests photo le 2026-06-14. La stabilisation finale V1 est executee le meme jour : tests automatises, audit securite, exports Excel, sauvegarde manuelle et lecture JSON de la sauvegarde. Le script `RESTAURER_SAUVEGARDE_MAC.command` est ajoute pour restaurer une sauvegarde sans commande Terminal. Ams valide le test de restauration puis valide officiellement la V1 le 2026-06-14. Le script `REINITIALISER_DONNEES_MAC.command` est ajoute pour repartir sur une base vide avec sauvegarde automatique et confirmation forte. Le script `ARRETER_CRM_MAC.command` est ajoute pour arreter le serveur local sans commande Terminal. Le 2026-06-15, les scripts Mac sont renommes avec suffixe `_MAC.command` et les scripts Windows `.bat` sont ajoutes a la racine du projet. Les scripts `INSTALLER_PACKAGES_CRM_MAC.command` et `INSTALLER_PACKAGES_CRM_WINDOWS.bat` sont ajoutes pour preparer une nouvelle machine avant lancement. Un guide utilisateur HTML non technique est ajoute dans `docs/GUIDE_UTILISATEUR_CRM.html` avec captures d'ecran et workflow conseille ; il doit etre maintenu a chaque evolution visible du CRM. Le 2026-06-17, Ams confirme que les tests V1 sont OK de son cote et une sauvegarde post-validation est creee : `data/backups/crm-ecole-backup-2026-06-17T14-19-35-955Z.json`. Le 2026-06-19, Ams confirme que les donnees sont chargees et que toutes les fonctions livrees testees sont conformes ; une sauvegarde post-chargement est creee : `data/backups/crm-ecole-backup-2026-06-19T16-17-41-810Z.json`. Le 2026-06-19, un mode reseau local Mac/Windows est ajoute pour respecter l'exigence PRD d'acces depuis les appareils du meme reseau, puis Ams valide la connexion depuis un iPhone sur le meme Wi-Fi. Le 2026-06-19, l'ergonomie du menu Eleves est corrigee sur petit ecran pour afficher la fiche avant la liste. Le 2026-06-20, Ams valide ce nouvel affichage Eleves sur iPhone. Le 2026-06-20, la V1 est durcie avec sessions serveur, droits API par role, exports authentifies et sauvegarde automatique quotidienne au demarrage. Le 2026-06-20, Cloudflare Tunnel est installe sur le Mac d'Ams et un script `LANCER_TUNNEL_CLOUDFLARE_MAC.command` est ajoute pour permettre des recettes distantes courtes via URL temporaire. Le 2026-06-20, Ams confirme que le test distant est valide par les utilisateurs ; la version courante devient la V1 stable de reference et une sauvegarde `data/backups/crm-ecole-stable-utilisateurs-2026-06-20.json` est creee. Le 2026-06-20, Ams confirme qu'il n'y a pas d'autre retour utilisateur ; un cadrage V1.1 court est cree dans `docs/CADRAGE_V1_1.md`, avec recommandation de commencer par une fiche eleve imprimable. Le 2026-06-20, la fiche eleve imprimable est developpee avec bouton d'impression, feuille print dediee et test E2E. Apres correction du probleme de pages vides, Ams valide le test d'impression.

Prochaine action :
choisir la prochaine petite evolution V1.1 a traiter, en gardant la V1 stable comme reference.

Documentation :

- `amsclaw/projects/creation-crm-pour-une-ecole/README.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/PROJECT_BRIEF.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/NEXT_STEPS.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/PROJECT_CHECKLIST.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/EXPRESSION_BESOIN.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/PRD_V1.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/CAHIER_RECETTE_V1.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/GUIDE_UTILISATEUR_CRM.html`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/CADRAGE_V1_1.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/commentaires_v1.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/docs/ARBITRAGES_AVANT_PRD.md`
- `amsclaw/projects/creation-crm-pour-une-ecole/reports/STABILISATION_V1_2026-06-14.md`

Points de vigilance :

- Eviter de partir directement sur une gestion scolaire complete.
- Clarifier les utilisateurs, les donnees a suivre et le premier flux metier avant toute PRD.
- Ne pas transformer le statut de scolarite en module de paiement.
- Definir simplement les droits de lecture et modification des commentaires eleves.
- Cadrer l'import Excel avec controles pour eviter doublons et donnees incoherentes.
- Ne pas transformer le rattachement des instructeurs en module RH ; rester sur un rattachement simple utilisateur / classe.
- Garder l'import partiel lisible : distinguer les lignes bloquees des fiches `donnees a completer`.

### Site web GS Aime Cesaire TKB

Statut : actif - Phase 5 recette

Objectif :
Creer le site web vitrine du Groupe Scolaire Aime Cesaire TKB en Guinee Conakry.

Derniere avancee :
projet cree le 2026-06-20 depuis Telegram, lie au projet CRM ecole existant. Process AAS V0.1 mode leger applique. `docs/IDEE.md`, `docs/MINI_SPEC.md` et `docs/PLAN_DEV.md` valides par Ams le 2026-06-20. V1 locale statique creee dans `src/`, `docs/CAHIER_RECETTE_LIGHT.md` produit, version de test publiee sur GitHub Pages.

Prochaine action :
Faire la revue locale Ams avec `docs/CAHIER_RECETTE_LIGHT.md`, puis corriger les ajustements avant mise en production.

URL de test : https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/

Processus : AAS V0.1 mode leger.

Documentation :

- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/README.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/PROJECT_BRIEF.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/NEXT_STEPS.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/IDEE.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/MINI_SPEC.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/PLAN_DEV.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/CAHIER_RECETTE_LIGHT.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_PLAQUETTE.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_FACEBOOK.md`
- `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_PHOTOS.md`

Points de vigilance :
- Garder une V1 type vitrine sans dependance technique avec le CRM.
- Partir sur un site statique (GitHub Pages, Netlify) pour un hebergement gratuit.
- Ne pas elargir le perimetre avant la premiere version testable.
- Ne pas mettre en production avant revue finale Ams et decision sur l'eventuel WhatsApp a afficher.

## Projets en attente

### Sensibilisation Code de la route & Civisme (Page Facebook)

Statut : en attente (idee cadree, demarrage ulterieur)

Objectif :
Creer et animer une Page Facebook automatisee dediee a la sensibilisation au code de la route et au civisme routier en Guinee.

Prochaine action :
Relire la documentation projet et decider du lancement du test 30 jours.

Documentation :

- `amsclaw/projects/sensibilisation-code-route-civisme-facebook/README.md`
- `amsclaw/projects/sensibilisation-code-route-civisme-facebook/docs/PROJECT_BRIEF.md`
- `amsclaw/projects/sensibilisation-code-route-civisme-facebook/docs/NEXT_STEPS.md`
- `amsclaw/projects/sensibilisation-code-route-civisme-facebook/docs/CREATION_COMPTES.md`

Points de vigilance :
- Demarrer par Facebook uniquement, TikTok en V2.
- Ne pas lancer sans une strategie editorial claire.
- Le token API Facebook expire tous les 60 jours.
- L'audience guineenne peut etre lente a croitre sans budget pub.

## Projets clotures

Aucun projet cloture reference a ce jour.

## Regle de mise a jour

Mettre a jour cet index quand :

- un nouveau projet est cree ;
- un projet change de statut ;
- une prochaine action change ;
- une version importante est livree ;
- un projet est mis en pause, cloture ou archive.

Chaque mise a jour importante doit aussi etre journalisee dans `memory/decisions.md`.
