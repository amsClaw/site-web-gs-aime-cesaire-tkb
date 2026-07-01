# Projets

Objectif :
Garder en mémoire tous les projets amsClaw, qu'ils soient actifs, en pause, terminés ou clôturés, avec assez de contexte pour les reprendre, les auditer ou réutiliser leurs enseignements.

Note :
Le fichier conserve son nom historique `active-projects.md` pour compatibilité avec les scripts existants, mais il sert désormais d'index durable de tous les projets.

## Modèle

### Nom du projet

ID :

Statut :

Objectif :

Prochaine action :

Résultat final :

Priorité :

Responsable :

Échéance :

Date de clôture :

Documentation :

Historique des décisions :

Leçons utiles :

Points de blocage :

Notes :

### Dashboard multi-agent

ID : dashboard-multi-agent

Statut : Actif - V1 stable validee utilisateurs

Objectif : Construire une V1 testable du cockpit amsClaw pour suivre projets, idees business, routines, blocages et actions prioritaires.

Prochaine action : Cadrer l'evolution `Validations projet visibles dans Taches`.

Priorité : Haute

Responsable : amsClaw

Échéance : V1 initiale le 2026-06-11

Documentation : `amsclaw/PROJECTS_INDEX.md`, `amsclaw/projects/dashboard-multi-agent/README.md`, `amsclaw/projects/dashboard-multi-agent/docs/ROADMAP.md`, `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md`, `amsclaw/projects/dashboard-multi-agent/docs/RITUEL_HEBDOMADAIRE.md`, `amsclaw/projects/dashboard-multi-agent/docs/SOURCE_DE_VERITE_DONNEES.md`, `amsclaw/dashboard/GUIDE_UTILISATION.md`, `amsclaw/PROJECTS_GUIDE.md`

Historique des décisions : Creation d'un dashboard statique local pour valider l'usage avant d'ajouter une architecture plus lourde. Creation d'un dossier projet dedie le 2026-06-11. Ajout d'une source JSON simple le 2026-06-11. Ajout d'un script de synchronisation depuis la memoire active le 2026-06-11. Ajout d'un serveur local Node pour sauvegarder les formulaires dans `dashboard-data.json` le 2026-06-11. Correction de l'affichage immediat apres validation de formulaire le 2026-06-11. Ajout d'un rendu optimiste avant sauvegarde API le 2026-06-11. Ajout des actions modifier et supprimer sur les cartes projet le 2026-06-11. Ajout des actions modifier et supprimer sur les idees le 2026-06-11. Ajout de l'execution manuelle des taches Markdown simples le 2026-06-11. Ajout de l'historique d'execution, de l'ouverture de fichier, de la verification manuelle, du filtre `À vérifier`, du compteur et de l'etat vide le 2026-06-11. Cadrage et implementation de la creation de projet depuis modele le 2026-06-12 avec endpoint local, formulaire, confirmation, durcissement par dossier temporaire et mode `dryRun`. Test reel valide le 2026-06-12 via l'API locale : creation du projet `Relance paiements scolaires WhatsApp`, generation des fichiers minimaux, ajout au JSON et refus d'une double creation en 409. V1.14 realisee le 2026-06-12 : compteurs projet, recherche, filtres `Sans action` et `Archives`, blocages renforces, prochaine action visible, suivi enrichi, derniere mise a jour, historique projet, cloture guidee, badges lateraux et exports. V1.15 realisee le 2026-06-12 : vues `Aujourd'hui`, `Backlog`, `Decisions`, `Revue hebdo`, `Recherche`, score projet, journal d'activite, projets dormants, fiche projet detaillee et sauvegardes versionnees. Tests utilisateur V1.15 valides par Ams le 2026-06-12. Cadrage source de verite le 2026-06-12 : JSON source operationnelle, Markdown memoire durable, audit non destructif avant synchronisation automatique. Script `audit-data-sync.js` cree le 2026-06-12 et audit ramene a zero divergence. Le 2026-06-13, `sync-dashboard-data.js` a ete durci : audit obligatoire avant ecriture, blocage en cas de divergence et sauvegarde pre-ecriture. Integration de `docs/PROJECT_CHECKLIST.md` au modele de creation projet du dashboard. Test reel valide par Ams le 2026-06-13 via la creation du projet `Creation CRM pour une ecole`. Ajout le 2026-06-13 d'une premiere action guidee `Valider la PRD` sur ce projet pilote. Le 2026-06-14, ajout d'une tache liee pour rendre visible la validation du cahier de recette V1 du projet CRM ecole dans l'onglet `Taches`, et ajout au backlog de l'evolution `Validations projet visibles dans Taches`. Le 2026-06-14 soir, controle confirme que l'action guidee PRD n'est plus affichee lorsque la prochaine action CRM ne concerne plus la validation PRD.

Points de blocage : Aucun blocage technique. La synchronisation Markdown -> JSON est maintenant gardee par audit prealable ; l'ecriture JSON -> Markdown reste volontairement non automatisee.

Notes : La V1.15 utilise `dashboard-data.json` comme source persistante principale. Les taches agents peuvent creer des fichiers Markdown, et le dashboard peut maintenant creer un nouveau projet depuis un modele. Le serveur local repond en HTTP 200 sur `http://127.0.0.1:8787/amsclaw/dashboard/`.

### Automatisation projet AAS

ID : automatisation-projet-aas

Statut : Actif

Objectif : Automatiser le processus de développement SaaS de l'idée au déploiement, en minimisant l'intervention humaine et en fusionnant le guide manuel d'Ams avec le draft automatisé.

Prochaine action : Relire la V0.1 officielle dans `docs/PROCESS_AAS_FUSIONNE.md`, puis tester le process sur un premier projet réel.

Priorité : Haute

Responsable : amsClaw

Échéance :

Documentation : `amsclaw/projects/automatisation-projet-aas/README.md`, `amsclaw/projects/automatisation-projet-aas/docs/PROJECT_BRIEF.md`, `amsclaw/projects/automatisation-projet-aas/docs/NEXT_STEPS.md`, `amsclaw/projects/automatisation-projet-aas/docs/DRAFT_PROCESS_AAS.md`, `amsclaw/projects/automatisation-projet-aas/docs/PROCESS_AAS_FUSIONNE.md`, `amsclaw/projects/automatisation-projet-aas/docs/GUIDE_DEMARRAGE_PROJET.md`, `amsclaw/projects/automatisation-projet-aas/docs/GUIDE_DEMARRAGE_PROJET.html`, `amsclaw/projects/automatisation-projet-aas/docs/templates/README.md`

Historique des décisions : Projet créé le 2026-06-19 depuis Telegram par Ams. Draft initial copié depuis `.process/saas-dev-draft.md` (7 phases, 45-70 min Ams par projet). La tâche existante `Relire et valider le draft processus développement SaaS` est liée au projet. Le 2026-06-19, création du draft fusionné `docs/PROCESS_AAS_FUSIONNE.md` à partir du guide manuel Ams, des templates sources et du draft automatisé. Creation du guide `docs/GUIDE_DEMARRAGE_PROJET.md` pour initier un projet et utiliser les prompts d'ideation. Creation de `docs/GUIDE_DEMARRAGE_PROJET.html` comme version lisible. Apres connexion ChatGPT/Codex, transformation du process en V0.1 officielle avec criteres Go/No-Go, validations dashboard explicites, garde-fous et templates OpenClaw dans `docs/templates/`.

Points de blocage : Aucun blocage identifié.

Notes : Le draft processus a été formulé le 2026-06-18 dans `.process/saas-dev-draft.md`. Le guide manuel Ams avec templates est intégré dans `docs/automatisation Projets SAAS/`. L'objectif est de transformer le process en procédure OpenClaw modulable, avec mode léger et mode complet.

### Espace de travail amsClaw

ID : workspace-amsclaw

Statut : Actif

Objectif : Garder une organisation propre entre workspace OpenClaw, projets, ressources, rapports et archives.

Prochaine action : Maintenir la checklist projet comme controle standard lors des prochaines creations depuis le dashboard.

Priorité : Moyenne

Responsable : amsClaw

Échéance :

Documentation : `amsclaw/PROJECTS_GUIDE.md`, `amsclaw/PROJECTS_INDEX.md`, `amsclaw/inbox/README.md`

Historique des décisions : Creation de `amsclaw/` comme espace projet dedie le 2026-06-11. Mise en place d'un index central de reprise le 2026-06-12. Le 2026-06-13, Ams choisit de tester le rituel dashboard sur un autre projet que `Relance paiements scolaires WhatsApp`; `Espace de travail amsClaw` est retenu comme projet pilote leger. Creation de `amsclaw/resources/project-creation-checklist.md` pour standardiser le controle des nouveaux projets. Integration de `docs/PROJECT_CHECKLIST.md` au modele de creation projet du dashboard. Le 2026-06-20, creation de `amsclaw/inbox/` comme sas temporaire commun pour les fichiers deposes par Ams, avec nettoyage autorise uniquement apres copie verifiee dans le bon projet.

Points de blocage : Aucun blocage identifie.

Notes : Projet support pour maintenir le workspace propre et redemarrable. La checklist projet est maintenant generee automatiquement lors d'une creation depuis modele et le test reel a ete valide par Ams.

### Creation CRM pour une ecole

ID : creation-crm-pour-une-ecole

Statut : Actif

Objectif : Creer un CRM pour l'ecole GS AIME CESAIRE TKB en Guinee Conakry.

Prochaine action : Choisir la prochaine petite evolution V1.1 a traiter, en gardant la V1 stable comme reference.

Résultat final : V1 locale livree et validee par Ams le 2026-06-14. Tests V1 confirmes OK par Ams le 2026-06-17. Donnees chargees et fonctions livrees testees conformes le 2026-06-19. Connexion reseau local validee depuis iPhone le 2026-06-19. Affichage Eleves mobile valide par Ams le 2026-06-20. Durcissement droits serveur V1 realise le 2026-06-20. Cloudflare Tunnel installe le 2026-06-20 pour recettes distantes courtes via URL temporaire. Test distant valide par les utilisateurs le 2026-06-20 ; version courante declaree V1 stable de reference. Cadrage V1.1 cree le 2026-06-20 avec recommandation de commencer par une fiche eleve imprimable. Fiche eleve imprimable developpee et validee par Ams le 2026-06-20 apres correction du probleme de pages vides.

Priorité : Haute

Responsable : amsClaw

Échéance :

Documentation : `amsclaw/projects/creation-crm-pour-une-ecole/README.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/PROJECT_BRIEF.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/NEXT_STEPS.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/PROJECT_CHECKLIST.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/EXPRESSION_BESOIN.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/PRD_V1.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/CAHIER_RECETTE_V1.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/GUIDE_UTILISATEUR_CRM.html`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/commentaires_v1.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/ARBITRAGES_AVANT_PRD.md`, `amsclaw/projects/creation-crm-pour-une-ecole/reports/STABILISATION_V1_2026-06-14.md`

Historique des décisions : Projet cree depuis le modele dashboard le 2026-06-13. La creation reelle valide l'integration automatique de la checklist projet dans le flux de creation. Ams valide une methode projet en etapes : ideation, expression de besoin, PRD, cahier de recette, developpement V1 autonome, tests, livraison. Ams fournit un besoin brut dans `docs/mon_besoin.md`; l'expression de besoin est structuree avec une recommandation de V1 limitee au socle eleves, classes, recherche, tableau de bord et exports. Ams precise que l'outil ne doit pas gerer les paiements, mais seulement afficher si l'eleve est a jour dans sa scolarite. Ams ajoute le besoin d'une section commentaires sur chaque fiche eleve, mise a jour par les instructeurs autorises. Le 2026-06-13, une fiche `docs/ARBITRAGES_AVANT_PRD.md` est creee pour faciliter la validation finale de l'expression de besoin avant PRD. Le 2026-06-13, Ams valide l'expression de besoin avec un ajustement : import de liste eleves par Excel et export Excel. Le 2026-06-13, la PRD V1 est redigee dans `docs/PRD_V1.md` et soumise a validation Ams. Le 2026-06-14, un workflow de prise en main est ajoute a la PRD pour visualiser l'ordre des actions, les dependances, les roles utilisateurs et les types de saisies. Le 2026-06-14, les commentaires PRD d'Ams sont integres apres analyse de `docs/liste_eleve.xlsx` : instructeurs geres comme utilisateurs rattaches aux classes, import Excel partiel avec badge `donnees a completer`, ajout de `parent 2`. Le 2026-06-14, Ams valide la PRD V1. Le 2026-06-14, le cahier de recette V1 est produit dans `docs/CAHIER_RECETTE_V1.md`, puis valide par Ams. Le 2026-06-14, une premiere V1 locale est implementee avec Node/Express, interface web, stockage JSON, import/export Excel via ExcelJS, sauvegarde manuelle et smoke test. Le 2026-06-14, les premiers retours recette V1 sont traites : modification et archivage/desactivation des classes et utilisateurs, cartes responsives, champ visible `Cycle`, selection des cycles `Maternelle`, `Primaire`, `College`, `Lycee`, et libelle `Instructeur principal`. Apres validation par Ams des ecrans Eleves, Classes et Utilisateurs, ajout d'une photo optionnelle unique sur la fiche eleve, avec affichage rond, recadrage simple et compression avant stockage. Ams valide les tests photo le 2026-06-14. La stabilisation finale V1 est executee le meme jour avec `npm test`, `npm audit --omit=dev`, exports Excel, sauvegarde manuelle et lecture JSON de sauvegarde. Le script `RESTAURER_SAUVEGARDE_MAC.command` est ajoute pour restaurer une sauvegarde sans commande Terminal. Ams valide le test de restauration, puis valide officiellement la V1 le 2026-06-14. Le script `REINITIALISER_DONNEES_MAC.command` est ajoute pour repartir sur une base vide avec sauvegarde automatique et confirmation forte. Le script `ARRETER_CRM_MAC.command` est ajoute pour arreter le serveur local sans commande Terminal. Le 2026-06-15, les scripts Mac sont renommes avec suffixe `_MAC.command`, les scripts Windows `.bat` sont ajoutes a la racine du projet, et les scripts `INSTALLER_PACKAGES_CRM_MAC.command` / `INSTALLER_PACKAGES_CRM_WINDOWS.bat` preparent une nouvelle machine avant lancement. Un guide utilisateur HTML non technique est ajoute dans `docs/GUIDE_UTILISATEUR_CRM.html` avec captures d'ecran et workflow conseille ; il doit etre maintenu a chaque evolution visible du CRM. Le 2026-06-17, Ams confirme que les tests V1 sont OK de son cote et une sauvegarde post-validation est creee : `data/backups/crm-ecole-backup-2026-06-17T14-19-35-955Z.json`. Le 2026-06-19, Ams confirme que les donnees sont chargees et que toutes les fonctions livrees testees sont conformes ; une sauvegarde post-chargement est creee : `data/backups/crm-ecole-backup-2026-06-19T16-17-41-810Z.json`. Le 2026-06-19, un mode reseau local Mac/Windows est ajoute pour respecter l'exigence PRD d'acces depuis les appareils du meme reseau. Le 2026-06-20, Cloudflare Tunnel est installe sur le Mac d'Ams et `LANCER_TUNNEL_CLOUDFLARE_MAC.command` est ajoute pour permettre des recettes distantes courtes via URL temporaire. Le 2026-06-20, Ams confirme que le test distant est valide par les utilisateurs ; la version courante devient la V1 stable de reference et les developpements peuvent continuer sur une V1.1 courte. Le 2026-06-20, Ams confirme qu'il n'a pas d'autre retour utilisateur ; un cadrage V1.1 est cree et la prochaine evolution recommandee est la fiche eleve imprimable. Le 2026-06-20, la fiche eleve imprimable est developpee avec bouton `Imprimer la fiche`, feuille d'impression dediee et test E2E.

Points de blocage : Aucun blocage identifie.

Notes : Projet education prioritaire avec V1 locale validee. La vision cible ressemble a une gestion scolaire complete ; la V1 doit rester courte tant que les retours terrain ne justifient pas une V1.1. Le statut de scolarite est un indicateur administratif, pas un module de paiement. Les commentaires eleves doivent rester un suivi interne simple en V1, sans messagerie ni notification automatique. L'import Excel doit etre controle avant validation pour eviter doublons et donnees incoherentes, tout en acceptant les fiches importables mais incompletes avec un statut `donnees a completer`. Le rattachement enseignant doit rester un rattachement utilisateur / classe, pas un module RH. Le guide utilisateur HTML fait partie de la livraison et doit etre mis a jour a chaque evolution visible.

### Connexion donnees dashboard

ID : data-sync

Statut : Actif

Objectif : Remplacer progressivement les donnees codees ou dispersees par une source de donnees simple, lisible et synchronisable.

Prochaine action : Observer le prochain cas reel de divergence JSON / Markdown avant d'ajouter une synchronisation inverse.

Priorité : Haute

Responsable : Agent Technique & Automatisation

Échéance :

Documentation : `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md`, `amsclaw/projects/dashboard-multi-agent/docs/SOURCE_DE_VERITE_DONNEES.md`, `amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js`

Historique des décisions : Ajout d'une source JSON simple le 2026-06-11. Cadrage de la source de verite le 2026-06-12 : JSON source operationnelle, Markdown memoire durable, audit non destructif avant synchronisation automatique. Audit `audit-data-sync.js` cree le 2026-06-12 et rapport final sans divergence. Le 2026-06-13, `sync-dashboard-data.js` exige un audit propre avant ecriture et cree une sauvegarde pre-ecriture.

Points de blocage : Aucun blocage technique. Les divergences bloquent volontairement la synchronisation tant qu'elles ne sont pas arbitrees.

Notes : Projet technique support du dashboard multi-agent.

### Site web GS Aime Cesaire TKB

ID : site-web-gs-aime-cesaire-tkb

Statut : Actif - Phase 5 Recette

Objectif : Creer le site web vitrine de l'ecole GS AIME CESAIRE TKB en Guinee Conakry.

Prochaine action : Faire la revue Ams de la version GitHub Pages https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/ avec `docs/CAHIER_RECETTE_LIGHT.md`, puis corriger les ajustements avant mise en production finale.

Priorite : Haute

Responsable : amsClaw

Echeance :

Documentation : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/README.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/PROJECT_BRIEF.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/NEXT_STEPS.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/IDEE.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/MINI_SPEC.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/PLAN_DEV.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/CAHIER_RECETTE_LIGHT.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_PLAQUETTE.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_FACEBOOK.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_PHOTOS.md`

Historique des decisions : Projet cree le 2026-06-20 depuis Telegram par Ams, lie au CRM ecole existant (creation-crm-pour-une-ecole). Le 2026-06-20, Ams confirme l'utilisation du process AAS V0.1 mode leger. `docs/IDEE.md` produite via le template IDEATION_PROJET_LEGER puis enrichie avec la plaquette, la lecture Facebook connectee et les photos deposees par Ams. Plaquette ecole conservee comme source principale de contenu ; logo repris du CRM. Ams valide `docs/IDEE.md`, `docs/MINI_SPEC.md` et `docs/PLAN_DEV.md` le 2026-06-20. Phase 4 developpement realisee, V1 locale creee dans `src/`, cahier de recette light produit. V1 de test publiee sur GitHub Pages : https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/.

Points de blocage : Aucun blocage pour developper ou relire la version locale. Ne pas mettre en production avant revue finale Ams et decision sur l'eventuel WhatsApp a afficher.

Notes : Projet destine a la meme ecole que le CRM. Les integrations (pre-inscription, portail parents) sont pour plus tard. Confirmations Ams du 2026-06-20 : nom a afficher `Groupe Scolaire Aime Cesaire TKB`, adresse `Samatra T8 Nord`, email officiel `aimecesairetkb@gmail.com`, telephones `+224 628 780 205` et `+224 614 639 274`, droit d'usage photos confirme, localisation Google Maps `https://maps.app.goo.gl/xNSVErC1EoUhQYqr9`, coordonnees `9.675889, -13.542859`. Points restant a confirmer : WhatsApp definitif si affiche, procedure d'admission, documents demandes, eventuel libelle d'adresse plus complet.

### Relance paiements scolaires WhatsApp

ID : relance-paiements-scolaires-whatsapp

Statut : Actif

Objectif : Tester un outil simple pour suivre les frais scolaires, generer des recus et preparer les relances parents.

Prochaine action : Identifier un premier cas de test concret : une ecole, une classe ou un fichier Excel existant.

Priorité : Haute

Responsable : amsClaw

Échéance : V1 a cadrer

Documentation : `amsclaw/PROJECTS_INDEX.md`, `amsclaw/projects/relance-paiements-scolaires-whatsapp/README.md`, `amsclaw/projects/relance-paiements-scolaires-whatsapp/docs/PROJECT_BRIEF.md`, `amsclaw/projects/relance-paiements-scolaires-whatsapp/docs/NEXT_STEPS.md`

Historique des décisions : Projet cree depuis le modele dashboard le 2026-06-12. Idee retenue apres mini analyse marche : demarrer par un cas simple de relance de paiements scolaires plutot qu'une gestion scolaire complete.

Points de blocage : Aucun blocage identifie.

Notes : Projet cible prioritaire pour transformer l'opportunite education en livrable concret rapide.

### Sensibilisation Code de la route & Civisme (Page Facebook)

ID : sensibilisation-code-route-civisme-facebook

Statut : En attente

Objectif : Creer et animer une Page Facebook automatisee dediee a la sensibilisation au code de la route et au civisme routier en Guinee.

Prochaine action : Relire la documentation projet et decider du lancement du test 30 jours.

Priorité : Basse (projet en attente)

Responsable : amsClaw

Échéance : Non définie

Documentation : `amsclaw/projects/sensibilisation-code-route-civisme-facebook/README.md`, `amsclaw/projects/sensibilisation-code-route-civisme-facebook/docs/PROJECT_BRIEF.md`, `amsclaw/projects/sensibilisation-code-route-civisme-facebook/docs/NEXT_STEPS.md`, `amsclaw/projects/sensibilisation-code-route-civisme-facebook/docs/CREATION_COMPTES.md`

Historique des décisions : Idee ajoutee au dashboard le 2026-06-17. Projet cree et documentation technique preparee le 2026-06-17, en attente de demarrage ulterieur.

Points de blocage : Demarrage bloque par decision de priorite (autres projets actifs avant).

Notes : Demarrer par Facebook uniquement, TikTok en V2. Token API Facebook expire tous les 60 jours. Audience guineenne peut etre lente sans budget pub.
