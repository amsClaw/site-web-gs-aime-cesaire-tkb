# Décisions

Objectif :
Documenter les décisions importantes afin de garder les projets compréhensibles et redémarrables.

## Modèle

### Décision

Date :

Projet concerné :

Contexte :

Options envisagées :

Décision prise :

Raison :

Risques ou hypothèses :

Prochaine action :

## 2026-06-17 - Projet en attente - Sensibilisation Code de la route & Civisme

- Contexte : l'idee de Page Facebook de sensibilisation au code de la route et au civisme en Guinee a ete cadree et documentee comme projet en attente, mais elle ne doit pas passer devant les priorites actuelles.
- Decision : conserver ce projet en statut `En attente`, avec demarrage ulterieur uniquement si Ams valide le lancement d'un test 30 jours.
- Modifications deja en place : documentation projet dans `amsclaw/projects/sensibilisation-code-route-civisme-facebook/`, suivi dans `amsclaw/PROJECTS_INDEX.md` et `memory/active-projects.md`.
- Alignement heartbeat : le 2026-06-17 a 21:00, `dashboard-data.json` a ete aligne pour afficher aussi ce projet dans le cockpit, avec sauvegarde prealable `amsclaw/projects/dashboard-multi-agent/data/backups/dashboard-data-2026-06-17T21-00-project-waiting-sync-pre-update.json`.
- Raison : eviter qu'une idee documentee devienne invisible dans le dashboard tout en gardant la priorite sur le CRM ecole, le dashboard et `Relance paiements scolaires WhatsApp`.
- Risques ou hypotheses : ne pas lancer la publication automatique sans strategie editoriale claire, validation humaine, verification des regles locales et gestion du token Facebook.
- Prochaine action : relire la documentation projet et decider explicitement du lancement du test 30 jours seulement quand Ams veut l'activer.

### Script reinitialisation donnees CRM ecole

Date : 2026-06-14

Projet concerné : Creation CRM pour une ecole

Contexte : Ams demande s'il existe un moyen de supprimer toutes les donnees du CRM. Une suppression manuelle du fichier JSON serait trop technique et trop risquee pour un usage courant.

Options envisagées : Ajouter un bouton dans l'interface ; demander une commande Terminal ; creer un script macOS double-cliquable avec sauvegarde et confirmation forte.

Décision prise : Creer `REINITIALISER_DONNEES.command`, un script double-cliquable qui sauvegarde l'etat courant, conserve les anciennes sauvegardes, vide `data/app-data.json`, puis propose de relancer le CRM.

Raison : Le script donne une action simple a Ams tout en reduisant le risque de suppression accidentelle. Le choix de ne pas ajouter de bouton direct dans l'interface V1 evite une action destructive trop accessible.

Risques ou hypothèses : La reinitialisation supprime les donnees courantes, mais une sauvegarde `pre-reset-current-<date>.json` est creee avant reset. Il faut verifier la sauvegarde avant toute utilisation en conditions reelles importantes.

Prochaine action : Utiliser le script seulement lorsqu'Ams veut repartir sur une base vide ; sinon continuer l'usage terrain normal avec sauvegardes regulieres.

### Validation finale V1 CRM ecole

Date : 2026-06-14

Projet concerné : Creation CRM pour une ecole

Contexte : Ams a teste les parcours principaux de la V1 locale, y compris les ecrans Eleves, Classes, Utilisateurs, la photo eleve, les sauvegardes et la restauration simplifiee par script.

Options envisagées : Cloturer la V1 et passer a l'usage terrain ; ouvrir immediatement une V1.1 ; elargir vers une V2 plus complete.

Décision prise : Valider officiellement la V1 locale et ne pas ouvrir de V1.1 avant les premiers retours d'usage terrain.

Raison : Le socle V1 repond au besoin prioritaire et les controles de stabilisation sont passes. Ajouter de nouvelles fonctions maintenant augmenterait le perimetre sans retour terrain suffisant.

Risques ou hypothèses : La V1 reste locale et ne doit pas etre exposee sur Internet sans durcissement. Les photos restent stockees dans le JSON en V1, ce qui est acceptable a court terme mais a surveiller si le volume augmente.

Prochaine action : Preparer l'usage terrain de la V1 validee : conserver le point de reprise, utiliser le runbook, charger les donnees reelles et noter les retours avant d'ouvrir une V1.1 courte.

### Confirmation tests V1 CRM ecole

Date : 2026-06-17

Projet concerné : Creation CRM pour une ecole

Contexte : Ams confirme que les tests V1 sont OK de son cote apres reprise du projet CRM et lancement de l'application locale.

Options envisagées : Ouvrir immediatement une V1.1 ; conserver la V1 comme socle terrain ; revenir en recette technique.

Décision prise : Conserver la V1 comme socle actif pour usage terrain et creer une sauvegarde de reprise post-validation.

Raison : Les tests utilisateur sont confirmes OK et aucune anomalie bloquante n'est signalee a ce stade.

Risques ou hypothèses : Les retours terrain peuvent encore faire apparaitre des ajustements utiles ; ils doivent etre notes et priorises avant toute V1.1.

Prochaine action : Utiliser la V1 sur donnees reelles, surveiller les retours bloquants et conserver la sauvegarde `data/backups/crm-ecole-backup-2026-06-17T14-19-35-955Z.json`.

### Nettoyage action guidee PRD dashboard

Date : 2026-06-14

Projet concerné : Dashboard multi-agent

Contexte : La prochaine action dashboard demandait de nettoyer l'action guidee PRD devenue obsolete sur le projet CRM ecole. Le code affiche cette action seulement si la prochaine action du CRM contient une validation PRD. Or le CRM est deja passe en phase de recette V1.

Options envisagées : Supprimer totalement le code de l'action guidee PRD ; conserver le code mais corriger la documentation ; reporter le nettoyage.

Décision prise : Conserver le code conditionnel de l'action guidee PRD, car il n'est plus visible dans l'etat actuel du CRM, et nettoyer la documentation ainsi que la prochaine action dashboard.

Raison : L'action reste un exemple reutilisable pour un futur projet en phase PRD, sans generer de bouton obsolete pour le CRM ecole.

Risques ou hypothèses : Si plusieurs actions guidees sont ajoutees plus tard, il faudra une regle plus generique pour eviter les actions visibles apres validation.

Prochaine action : Cadrer l'evolution `Validations projet visibles dans Taches`.

### Cadrage initial du besoin CRM ecole

Date : 2026-06-13

Projet concerné : Creation CRM pour une ecole

Contexte : Ams a cree `docs/mon_besoin.md` pour decrire son idee d'outil pour GS AIME CESAIRE TKB. Le besoin brut couvre les eleves, classes, notes, presences, enseignants, finances, tableaux de bord, rapports, utilisateurs, sauvegardes et communications parents.

Options envisagées : Garder tout le perimetre dans une V1 unique ; decouper l'application en socle V1 puis modules successifs ; commencer directement par un module de suivi administratif de scolarite.

Décision prise : Structurer l'expression de besoin en distinguant vision cible et V1 recommandee. La V1 proposee se limite au socle eleves, classes, recherche, tableau de bord simple, exports et utilisateurs basiques.

Raison : Le besoin complet correspond a une gestion scolaire large. Une V1 trop large augmenterait fortement le delai, le risque fonctionnel et le risque de tests incomplets.

Risques ou hypothèses : Ams doit encore valider que les presences, notes, communications et fonctions avancees de scolarite peuvent etre repoussees apres le socle. Les donnees terrain exactes restent a confirmer.

Prochaine action : Faire valider ou ajuster par Ams le perimetre V1 recommande avant redaction de la PRD.

### Statut de scolarite sans gestion de paiement

Date : 2026-06-13

Projet concerné : Creation CRM pour une ecole

Contexte : Ams precise que lorsqu'il parle de paiement dans le CRM ecole, il ne souhaite pas que l'outil gere les paiements, les encaissements ou les recus. Le besoin est uniquement d'avoir l'information permettant de savoir si l'eleve est a jour dans sa scolarite.

Options envisagées : Creer un module financier complet ; exclure totalement l'information de scolarite de la V1 ; integrer un statut administratif simple sur la fiche eleve.

Décision prise : Integrer en V1 un statut de scolarite simple sur la fiche eleve, par exemple `a jour`, `non a jour`, `a verifier`.

Raison : Cette approche repond au besoin de pilotage administratif sans complexifier la V1 avec de la comptabilite, des recus ou de l'encaissement.

Risques ou hypothèses : Le format exact du statut reste a valider avec Ams. Les montants, echeances, recus et historiques detailles restent hors perimetre tant qu'ils ne sont pas explicitement valides.

Prochaine action : Confirmer le format exact du statut de scolarite avant PRD.

### Commentaires de suivi sur fiche eleve

Date : 2026-06-13

Projet concerné : Creation CRM pour une ecole

Contexte : Ams souhaite que chaque fiche eleve contienne une section commentaire pouvant etre mise a jour par les instructeurs.

Options envisagées : Ajouter un simple champ texte libre ; creer une vraie messagerie interne ; integrer une section commentaires de suivi interne avec auteur et date.

Décision prise : Integrer en V1 une section commentaires de suivi sur la fiche eleve, accessible aux instructeurs autorises, avec auteur, date de creation et date de derniere modification.

Raison : Le besoin apporte de la valeur au suivi quotidien de l'eleve sans attendre les modules notes, presences ou communication parents.

Risques ou hypothèses : Les droits exacts restent a definir. Il faudra cadrer qui peut lire, creer, modifier ou supprimer les commentaires pour eviter des informations sensibles mal controlees.

Prochaine action : Confirmer les droits de lecture et modification des commentaires avant PRD.

### Validation expression de besoin CRM ecole

Date : 2026-06-13

Projet concerné : Creation CRM pour une ecole

Contexte : Ams valide l'expression de besoin du CRM ecole, avec une precision finale : la V1 doit proposer une fonction d'import de liste eleves par Excel et une fonction d'export.

Options envisagées : Garder seulement une saisie manuelle eleve par eleve ; ajouter un import Excel simple ; ajouter une synchronisation avancee avec fichiers externes.

Décision prise : Valider l'expression de besoin et integrer en V1 un import Excel de liste eleves avec controles avant validation, ainsi que des exports Excel des listes essentielles.

Raison : L'import Excel reduit fortement l'effort initial de saisie si l'ecole possede deja une liste exploitable. L'export Excel reste indispensable pour partager, verifier ou retraiter les donnees sans dependance technique.

Risques ou hypothèses : L'import devra etre cadre dans la PRD pour eviter doublons, classes inconnues et donnees incoherentes. Un modele Excel standard devra etre defini.

Prochaine action : Rediger la PRD V1 a partir de l'expression de besoin validee.

### PRD V1 CRM ecole soumise a validation

Date : 2026-06-13

Projet concerné : Creation CRM pour une ecole

Contexte : Ams demande a amsClaw de rediger la PRD V1 et de la lui soumettre pour validation.

Options envisagées : Attendre de nouveaux arbitrages avant PRD ; rediger une PRD complete avec points ouverts ; passer directement au cahier de recette.

Décision prise : Rediger `docs/PRD_V1.md` comme document produit V1 soumis a validation, en conservant les points ouverts a trancher avant developpement.

Raison : Le besoin est suffisamment valide pour structurer les exigences. Les derniers points ouverts peuvent etre traites pendant la validation PRD sans bloquer la progression.

Risques ou hypothèses : La PRD contient des hypotheses prudentes sur les roles, les commentaires, l'archivage et le format Excel. Elles devront etre acceptees ou ajustees par Ams avant cahier de recette.

Prochaine action : Obtenir la validation Ams de `docs/PRD_V1.md`, puis produire le cahier de recette.

### Ajustements PRD CRM ecole apres commentaires Ams

Date : 2026-06-14

Projet concerné : Creation CRM pour une ecole

Contexte : Ams a ajoute deux commentaires dans `docs/COMMENTAIRES_PRD.md` avant validation de la PRD : pouvoir saisir les enseignants et les affecter aux classes, et pouvoir importer des extractions Excel eleves par classe meme si certains champs ne sont pas complets. Ams a aussi fourni `docs/liste_eleve.xlsx`, qui contient notamment matricule, eleve, sexe, date et lieu de naissance, pere, mere et telephone.

Options envisagées : Ajouter un module enseignant complet ; gerer les enseignants comme de simples utilisateurs instructeurs rattaches aux classes ; bloquer les imports incomplets ; autoriser un import partiel avec indicateur de donnees a completer.

Décision prise : Integrer en V1 les enseignants comme utilisateurs de role `Instructeur` affectables aux classes via liste deroulante. Autoriser l'import partiel d'extractions Excel par classe, avec choix d'une classe cible si la colonne classe est absente, badge `donnees a completer` sur les fiches incompletes, filtre dedie, et ajout de `parent 2` dans la fiche eleve.

Raison : Cette approche couvre le besoin terrain sans ouvrir un module RH ni bloquer l'initialisation de la base a cause de fichiers Excel imparfaits.

Risques ou hypothèses : Il faut encore confirmer si `liste_eleve.xlsx` represente le format principal a supporter et decider quoi faire si un fichier n'a pas de matricule fiable.

Prochaine action : Faire relire par Ams la PRD V1 ajustee, puis valider la PRD ou lister les derniers ajustements.

### Validation PRD V1 CRM ecole

Date : 2026-06-14

Projet concerné : Creation CRM pour une ecole

Contexte : Ams valide la PRD V1 du projet CRM ecole apres integration du workflow de prise en main, des commentaires sur les instructeurs rattaches aux classes, de l'import Excel partiel et de `parent 2` sur la fiche eleve.

Options envisagées : Continuer les ajustements PRD ; valider la PRD et passer au cahier de recette ; revenir au cadrage fonctionnel.

Décision prise : Valider la PRD V1 comme base fonctionnelle de la V1.

Raison : Le perimetre V1 est suffisamment clair pour transformer les exigences en cas de recette, tout en gardant les points ouverts non bloquants a confirmer avant ou pendant le developpement.

Risques ou hypothèses : Les points ouverts restent a surveiller, notamment le format exact des classes, la regle en cas de matricule absent et les droits fins sur les commentaires.

Prochaine action : Produire le cahier de recette V1 a partir de `docs/PRD_V1.md`.

### Production cahier de recette V1 CRM ecole

Date : 2026-06-14

Projet concerné : Creation CRM pour une ecole

Contexte : Apres validation de la PRD V1 par Ams, le projet doit disposer d'un cahier de recette permettant de verifier les parcours et criteres d'acceptation avant livraison.

Options envisagées : Passer directement au developpement ; produire une checklist courte ; produire un cahier de recette structure par domaines fonctionnels.

Décision prise : Produire `docs/CAHIER_RECETTE_V1.md` avec des cas de recette couvrant prise en main, utilisateurs, classes, instructeurs, eleves, import Excel, completude des donnees, commentaires, recherche, exports, tableau de bord, sauvegarde et exigences non fonctionnelles.

Raison : Transformer la PRD validee en tests concrets reduit le risque de developper une V1 difficile a accepter ou incomplete.

Risques ou hypothèses : Le cahier de recette devra etre relu par Ams avant developpement pour confirmer qu'il couvre les attentes metier prioritaires.

Prochaine action : Faire relire et valider par Ams le cahier de recette V1.

### Visibilite des validations projet dans le dashboard

Date : 2026-06-14

Projet concerné : Dashboard multi-agent

Contexte : La validation du cahier de recette V1 du projet CRM ecole etait bien renseignee comme prochaine action projet, mais Ams ne la voyait pas dans l'onglet `Taches`.

Options envisagées : Laisser la validation uniquement comme prochaine action projet ; creer manuellement une tache liee pour ce cas ; automatiser immediatement la creation de taches pour toutes les validations.

Décision prise : Creer maintenant une tache liee au projet CRM ecole pour la validation du cahier de recette V1, et ajouter au backlog dashboard l'evolution `Validations projet visibles dans Taches`.

Raison : La tache repond au besoin immediat sans coder a chaud une regle trop fragile. Le backlog garde l'evolution durable visible pour l'automatiser proprement plus tard.

Risques ou hypothèses : Il faudra eviter les doublons si une future automatisation cree des taches a partir des prochaines actions projet deja existantes.

Prochaine action : Relire et valider le cahier de recette V1, puis cadrer plus tard l'automatisation des validations projet visibles comme taches.

### Validation cahier de recette V1 CRM ecole

Date : 2026-06-14

Projet concerné : Creation CRM pour une ecole

Contexte : Le cahier de recette V1 a ete produit a partir de la PRD V1 validee pour couvrir les parcours essentiels avant developpement.

Options envisagées : Demander des ajustements avant developpement ; valider le cahier de recette et passer au developpement V1 ; revenir sur le perimetre PRD.

Décision prise : Ams valide le cahier de recette V1.

Raison : Le cahier de recette couvre suffisamment les attentes metier prioritaires pour servir de base de controle pendant le developpement et avant livraison.

Risques ou hypothèses : Les points terrain ouverts restent a confirmer pendant l'implementation, notamment les classes exactes, les droits fins sur les commentaires et la regle si un matricule est absent.

Prochaine action : Demarrer le developpement autonome de la V1.

### Stabilisation finale V1 CRM ecole

Date : 2026-06-14

Projet concerné : Creation CRM pour une ecole

Contexte : Ams valide les tests des ecrans Eleves, Classes, Utilisateurs et Photo eleve. La V1 locale doit etre stabilisee avant revue finale de livraison.

Options envisagées : Ajouter de nouvelles fonctionnalites avant livraison ; lancer une stabilisation courte puis faire une revue finale ; cloturer directement sans controle operationnel supplementaire.

Décision prise : Stabiliser la V1 sans ajout fonctionnel : tests automatises, audit securite, verification exports Excel, creation d'une sauvegarde manuelle et lecture JSON de la sauvegarde.

Raison : Le socle V1 repond au besoin prioritaire. Avant toute V1.1, il faut securiser la livraison et garder un point de reprise clair.

Risques ou hypothèses : La V1 reste locale et ne doit pas etre exposee sur Internet sans durcissement des controles serveur. Le stockage des photos dans le JSON est acceptable en V1 mais a surveiller si le volume augmente.

Prochaine action : Faire la revue finale de livraison V1 avec Ams, puis decider cloture V1 ou ouverture d'une V1.1 courte.

### Premiere V1 locale implementee

Date : 2026-06-14

Projet concerné : Creation CRM pour une ecole

Contexte : Apres validation de la PRD et du cahier de recette, Ams demande de demarrer le developpement autonome de la V1.

Options envisagées : Application statique pure ; application locale Node/Express avec stockage JSON ; application avec base de donnees des maintenant.

Décision prise : Implementer une V1 locale Node/Express avec interface web, stockage JSON, import/export Excel via ExcelJS, sauvegarde manuelle et smoke test.

Raison : Ce choix livre rapidement une V1 testable en navigateur, tout en gardant l'import/export Excel et la persistance locale sans complexite de base de donnees.

Risques ou hypothèses : Les droits serveur restent simples et adaptes a une V1 locale. Une base de donnees et un durcissement d'authentification seront a envisager avant toute exposition Internet ou usage multi-postes intensif.

Prochaine action : Tester la V1 locale dans le navigateur et passer les premiers cas critiques du cahier de recette.

### Creation d'un espace projet dedie

Date : 2026-06-11

Projet concerné : Espace de travail amsClaw

Contexte : La racine du workspace contient deja les fichiers de configuration OpenClaw, la memoire et les archives bootstrap. Ams souhaite eviter de melanger les futurs projets avec ces fichiers systeme.

Options envisagées : Garder une racine plate ; creer des dossiers projets directement a la racine ; creer un dossier conteneur dedie.

Décision prise : Creer `amsclaw/` comme dossier conteneur pour les projets, dashboards, automatisations, rapports, ressources et archives de travail.

Raison : Separer clairement la configuration OpenClaw de l'espace de production projet, tout en gardant une structure simple.

Risques ou hypothèses : La structure devra rester legere pour ne pas devenir bureaucratique.

Prochaine action : Initialiser le projet `dashboard multi-agents` dans `amsclaw/projects/` ou `amsclaw/dashboard/`.

### Dashboard multi-agents V1 statique

Date : 2026-06-11

Projet concerné : Dashboard multi-agents

Contexte : Ams souhaite une V1 testable rapidement, tout en gardant le workspace propre et sans complexite inutile.

Options envisagées : Application avec framework ; mini backend ; page HTML/CSS/JS statique avec stockage navigateur.

Décision prise : Creer une V1 statique dans `amsclaw/dashboard/` avec donnees de demonstration et persistance locale via `localStorage`.

Raison : Tester l'utilite du cockpit et les workflows avant de choisir une architecture de synchronisation avec les fichiers `memory/*.md`.

Risques ou hypothèses : Les donnees ajoutees dans la V1 restent dans le navigateur et ne mettent pas encore a jour les fichiers Markdown.

Prochaine action : Tester la navigation, l'ajout local de projets/idees, les routines et le rapport copiable.

### Script de lancement du dashboard

Date : 2026-06-11

Projet concerné : Dashboard multi-agents

Contexte : Ams veut lancer facilement la V1 sans retenir la commande serveur ni ouvrir l'URL manuellement.

Options envisagées : Garder la commande documentee ; creer un script shell local ; ajouter un serveur applicatif.

Décision prise : Creer `amsclaw/dashboard/launch-dashboard.sh` pour lancer le serveur local Python sur le port `8787` et ouvrir le dashboard dans le navigateur.

Raison : Solution simple, reutilisable et sans nouvelle dependance.

Risques ou hypothèses : Le script suppose un environnement macOS avec `python3` et utilise `open` si disponible.

Prochaine action : Tester le lancement direct depuis le workspace.

### Standard d'organisation des projets

Date : 2026-06-11

Projet concerné : Espace de travail amsClaw

Contexte : Ams veut eviter que les futurs projets deviennent des dossiers melanges ou difficiles a reprendre.

Options envisagées : Garder seulement une consigne orale ; documenter une structure projet minimale ; creer une architecture complete des maintenant.

Décision prise : Ajouter `amsclaw/PROJECTS_GUIDE.md`, `amsclaw/projects/README.md` et `amsclaw/resources/project-readme-template.md`.

Raison : Mettre en place une organisation simple, reutilisable et compatible avec l'objectif de projets redemarrables.

Risques ou hypothèses : Trop de structure pourrait ralentir l'execution ; le guide reste donc minimal et adaptable.

Prochaine action : Utiliser ce standard pour le premier vrai projet pilote.

### Creation du projet dashboard-multi-agent

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : Ams veut creer le projet `dashboard-multi-agent` en appliquant le standard d'organisation des dossiers et de documentation.

Options envisagées : Deplacer la V1 existante dans `projects/` ; creer un dossier projet de pilotage sans deplacer la V1 ; repartir de zero.

Décision prise : Creer `amsclaw/projects/dashboard-multi-agent/` comme dossier projet dedie, tout en conservant la V1 actuelle dans `amsclaw/dashboard/`.

Raison : Eviter de casser le lancement existant et commencer a piloter l'evolution du dashboard avec une documentation propre.

### Memoire durable de tous les projets

Date : 2026-06-12

Projet concerné : Configuration OpenClaw / amsClaw

Contexte : Ams veut que l'agent garde en memoire tous les projets, y compris ceux qui sont termines ou clotures, afin de pouvoir les retrouver, les auditer et reutiliser les enseignements.

Options envisagées : Retirer les projets clotures du suivi actif ; creer un fichier separe pour les projets clotures ; garder un index unique de tous les projets dans `memory/active-projects.md` malgre son nom historique.

Décision prise : Conserver tous les projets dans la memoire durable. Les projets clotures peuvent etre archives physiquement, mais un resume doit rester dans l'index projet avec objectif, statut final, resultat, documentation, decisions importantes et lecons utiles.

Raison : Eviter la perte de contexte et garder OpenClaw capable de reprendre ou analyser un ancien projet sans repartir de zero.

Risques ou hypothèses : Le fichier `memory/active-projects.md` conserve un nom imparfait pour compatibilite avec les scripts existants. Une future migration pourra le renommer proprement si les scripts sont adaptes.

Prochaine action : Appliquer cette regle lors de la prochaine cloture ou mise en pause de projet.

Risques ou hypothèses : Pendant une phase transitoire, la V1 technique et le dossier projet sont separes.

Prochaine action : Creer une source de donnees simple pour connecter progressivement la V1 au projet.

### Dashboard V1.14 - pilotage visible du portefeuille

Date : 2026-06-12

Projet concerné : Dashboard multi-agent

Contexte : Ams veut savoir ou il va avant de continuer un projet et ne veut pas avancer a l'aveugle.

Options envisagées : Continuer les petites ameliorations sans backlog explicite ; documenter d'abord le backlog puis implementer ; repousser les ameliorations au profit d'un autre projet.

Décision prise : Documenter le backlog V1.14 puis implementer les 12 ameliorations approuvees : compteurs, blocages visibles, prochaine action, suivi quotidien renforce, derniere mise a jour, filtre sans action, historique projet, cloture guidee, archives, badges lateraux, recherche et exports.

Raison : Le dashboard doit devenir un outil de pilotage clair, pas seulement une liste de donnees.

Risques ou hypothèses : Les nouveaux champs `projectLog` et `lastUpdated` sont geres progressivement. Les anciens projets restent compatibles avec des valeurs vides.

Prochaine action : Faire tester la V1.14 dans l'IHM par Ams.

### Source de donnees JSON pour le dashboard

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : Ams suit la recommandation de rendre le dashboard utile avec des donnees reelles avant de construire une architecture plus lourde.

Options envisagées : Continuer avec des donnees codees dans `app.js` ; lire directement les fichiers Markdown ; ajouter un fichier JSON intermediaire.

Décision prise : Creer `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json` et adapter le dashboard pour le lire au lancement.

Raison : Permettre une V1.2 testable avec une source de donnees claire, sans backend ni base de donnees.

Risques ou hypothèses : Les modifications faites dans l'interface restent dans `localStorage` et ne sont pas encore ecrites dans le JSON ou les fichiers Markdown.

Prochaine action : Tester la V1.2 puis choisir le premier flux de synchronisation a automatiser.

### Synchronisation projets vers le dashboard

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : La V1.2 lit deja `dashboard-data.json`, mais les projets actifs sont suivis durablement dans `memory/active-projects.md`.

Options envisagées : Mettre a jour le JSON manuellement ; lire directement le Markdown dans le navigateur ; generer le JSON avec un script local.

Décision prise : Ajouter `amsclaw/projects/dashboard-multi-agent/scripts/sync-dashboard-data.js` pour synchroniser les projets depuis `memory/active-projects.md` vers `dashboard-data.json`.

Raison : Garder `memory/active-projects.md` comme source de verite des projets actifs tout en conservant un JSON simple pour le dashboard.

Risques ou hypothèses : Le parsing Markdown reste volontairement limite au format documente dans `memory/active-projects.md`.

Prochaine action : Tester l'affichage V1.3 et choisir le prochain flux : creation de projet depuis modele ou suivi renforce des blocages.

### Persistance JSON depuis le dashboard

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : Les ajouts de projets et d'idees apparaissaient dans l'IHM mais disparaissaient apres rafraichissement, et les modifications manuelles de `dashboard-data.json` ne remontaient pas correctement a l'ecran.

Options envisagées : Continuer avec `localStorage` ; demander une edition manuelle du JSON ; ajouter une petite API locale sans dependance externe.

Décision prise : Ajouter `scripts/dashboard-server.js`, remplacer le serveur statique Python par un serveur Node local, et faire sauvegarder les formulaires dans `dashboard-data.json`.

Raison : Garder une architecture simple tout en rendant la V1 testable avec de vraies donnees persistantes.

Risques ou hypothèses : L'ecriture fichier fonctionne uniquement lorsque le dashboard est lance avec le script projet et que Node est disponible.

Prochaine action : Tester dans le navigateur l'ajout d'un projet, l'ajout d'une idee, puis le rechargement de la page.

### Affichage immediat apres validation de formulaire

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : Les formulaires sauvegardaient les nouveaux projets et idees, mais l'affichage visible ne remontait le nouveau point qu'apres rafraichissement de l'IHM.

Options envisagées : Se contenter d'un rendu local apres mutation du state ; forcer un rechargement complet apres chaque sauvegarde ; renvoyer l'etat sauvegarde par l'API et resynchroniser l'IHM dessus.

Décision prise : Faire renvoyer au serveur l'etat normalise ecrit dans `dashboard-data.json`, puis remplacer le `state` front par cette reponse avant `renderAll()`.

Raison : Garantir que l'IHM affiche immediatement la meme donnee que celle qui vient d'etre sauvegardee, sans rechargement manuel et sans architecture plus lourde.

Risques ou hypothèses : La correction suppose que le dashboard est servi par `scripts/dashboard-server.js`, car le mode fichier statique ne peut pas ecrire dans le JSON.

Prochaine action : Tester dans le navigateur l'ajout d'un projet et d'une idee : le nouvel element doit apparaitre des le clic de validation.

### Rendu optimiste des formulaires dashboard

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : Apres correction de la persistance, Ams constate que le nouveau point n'apparait toujours qu'apres rafraichissement de l'IHM.

Décision prise : Afficher le nouveau projet ou la nouvelle idee immédiatement apres mutation du `state`, avant d'attendre la reponse de sauvegarde API, puis resynchroniser l'ecran apres l'ecriture fichier.

Raison : Decoupler la sensation de validation dans l'IHM du temps de reponse de l'ecriture dans `dashboard-data.json`.

Risques ou hypothèses : Si la sauvegarde echoue, l'element reste visible localement mais un toast indique que l'ajout n'est pas persiste.

Prochaine action : Recharger la page du dashboard pour charger `app.js?v=1.4.2`, puis retester l'ajout projet et idee sans rafraichissement intermediaire.

### Modification et suppression des projets depuis l'IHM

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : Ams veut pouvoir nettoyer les projets test et corriger les projets sans modifier `dashboard-data.json` a la main.

Décision prise : Ajouter deux actions sur chaque carte projet : `Modifier`, qui recharge le projet dans le formulaire existant, et `Supprimer`, qui demande confirmation avant retrait et sauvegarde.

Raison : Garder l'IHM simple en reutilisant le formulaire projet tout en couvrant les actions de gestion essentielles.

Risques ou hypothèses : La suppression reste volontairement confirmee par le navigateur pour eviter une perte accidentelle.

Prochaine action : Tester la modification d'un projet puis la suppression d'un projet test depuis le dashboard.

### Modification et suppression des idees depuis l'IHM

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : Les actions `Modifier` et `Supprimer` fonctionnent pour les projets. Ams veut le meme comportement pour les idees business.

Décision prise : Ajouter deux actions sur chaque ligne d'idee : `Modifier`, qui recharge l'idee dans le formulaire existant, et `Supprimer`, qui demande confirmation avant retrait et sauvegarde.

Raison : Garder une experience coherente entre projets et idees, avec notification visible apres chaque action.

Risques ou hypothèses : La suppression reste volontairement confirmee par le navigateur pour eviter une perte accidentelle.

Prochaine action : Tester la modification d'une idee puis la suppression d'une idee test depuis le dashboard.

### Execution manuelle des taches agents

Date : 2026-06-11

Projet concerné : Dashboard multi-agent

Contexte : Ams a cree une tache agent demandant de creer un fichier `.md` avec une note dedans et veut savoir si les agents executent reellement les taches ou si la vue reste seulement declarative.

Décision prise : Ajouter un bouton `Executer` sur les taches agents et un endpoint local `POST /api/agent-tasks/:id/execute` capable de traiter un premier cas borne : creer une note Markdown sans ecraser de fichier existant.

Raison : Transformer progressivement le dashboard en outil d'action, tout en gardant un controle manuel avant toute automatisation plus large.

Risques ou hypothèses : L'execution est volontairement limitee a la creation de fichiers Markdown. Les actions sensibles restent exclues et devront demander confirmation explicite.

Prochaine action : Tester depuis l'IHM une nouvelle tache Markdown simple, puis definir les prochains types d'actions autorisees.

### Dashboard V1.15 - Pilotage sans angle mort

Date : 2026-06-12

Projet concerné : Dashboard multi-agent

Contexte : Ams a valide toutes les evolutions conseillees apres la V1.14 et a rappele qu'il ne veut pas avancer a l'aveugle dans un projet.

Décision prise : Implementer une V1.15 centrée sur la visibilite du cap : vues `Aujourd'hui`, `Backlog`, `Decisions`, `Revue hebdo`, `Recherche globale`, score projet, fiche projet, echeances de taches, journal d'activite et sauvegardes versionnees.

Décision dashboard associée : Implémenter la roadmap de pilotage dashboard V1.15.

Raison : Le dashboard doit montrer ce qui est fait, ce qui est prevu, ce qui bloque et pourquoi une orientation a ete prise.

Risques ou hypothèses : La source reste un fichier JSON local. C'est simple et rapide, mais il faudra surveiller les doublons avec les fichiers Markdown si la synchronisation memoire evolue.

Prochaine action : Tester la V1.15 dans l'IHM avec Ams, puis utiliser la revue hebdomadaire pour piloter les projets actifs.

### Lisibilite de la vue Aujourd'hui

Date : 2026-06-12

Projet concerné : Dashboard multi-agent

Contexte : Ams trouve que la V1.15 commence a bien prendre forme, mais que les sujets sont difficiles a distinguer dans les blocs de la vue `Aujourd'hui`.

Décision prise : Afficher le sujet principal de chaque ligne en gras dans les blocs de synthese de la vue `Aujourd'hui`, avec le detail en texte secondaire dessous.

Raison : Faciliter la lecture rapide des actions du jour, blocages, projets dormants et taches a echeance sans changer la logique fonctionnelle.

Risques ou hypothèses : L'ajustement est volontairement limite au rendu des blocs de synthese pour eviter une regression sur les autres vues.

Prochaine action : Tester la vue `Aujourd'hui` avec des projets ayant une prochaine action, un blocage, une tache a echeance et un projet dormant.
## 2026-06-12 - Dashboard - Hiérarchie visuelle de la vue Aujourd'hui

- Contexte : les sujets en gras dans les blocs de la vue `Aujourd'hui` étaient trop proches visuellement des titres de blocs.
- Décision : conserver les sujets en évidence, mais réduire leur poids visuel en semi-bold et avec une taille légèrement inférieure.
- Résultat attendu : lecture plus rapide des lignes sans concurrence avec les titres `Actions du jour`, `Blocages`, etc.

## 2026-06-12 - Dashboard - Lisibilité des vues denses

- Contexte : les vues `Backlog`, `Décisions` et `Revue hebdo` concentrent beaucoup d'informations textuelles.
- Décision : appliquer une hiérarchie visuelle commune avec sujet semi-fort et détails discrets.
- Résultat attendu : faciliter le scan rapide des sujets sans donner aux lignes le même poids que les titres de sections.

## 2026-06-12 - amsClaw - Index central de reprise des projets

- Contexte : Ams veut pouvoir redemarrer le poste ou ouvrir une nouvelle discussion OpenClaw sans perdre le fil des projets.
- Décision : créer `amsclaw/PROJECTS_INDEX.md` comme point d'entrée unique de reprise.
- Changements associés : ajout de la reference dans `amsclaw/README.md`, `amsclaw/PROJECTS_GUIDE.md` et `memory/active-projects.md`.
- Résultat attendu : permettre a un agent de reprendre rapidement le contexte, les priorites, les prochaines actions et les liens utiles.

## 2026-06-12 - amsClaw - Reflexe de reprise depuis l'index projets

- Contexte : Ams veut pouvoir demander naturellement `quels sont les projets en cours ?` ou `reprends le projet dashboard`.
- Décision : ajouter dans `AGENTS.md` la regle de lire d'abord `amsclaw/PROJECTS_INDEX.md` pour toute question projet ou reprise de projet.
- Résultat attendu : rendre la reprise automatique sans demander a Ams de fournir les chemins de fichiers.

## 2026-06-12 - OpenClaw - Démarrage automatique au login macOS

- Contexte : Ams veut qu'OpenClaw se lance automatiquement au démarrage du Mac.
- Décision : conserver le LaunchAgent existant `ai.openclaw.gateway` pour le gateway OpenClaw, conserver `com.amsclaw.dashboard` pour le dashboard local, et ajouter `com.openclaw.dashboard-login` pour ouvrir l'interface web OpenClaw après la connexion utilisateur.
- Modifications : création de `amsclaw/automation/openclaw-dashboard-at-login.sh`, création de `~/Library/LaunchAgents/com.openclaw.dashboard-login.plist`, documentation dans `amsclaw/automation/OPENCLAW_AUTOSTART.md`.
- Scripts/commandes exécutés : vérification `openclaw status`, validation `plutil -lint`, chargement `launchctl bootstrap`, test `launchctl kickstart`, contrôle `launchctl print`.
- Point de vigilance : le script définit explicitement le `PATH` Homebrew, car `launchd` ne charge pas l'environnement du terminal au démarrage.
- Résultat : test manuel OK, le LaunchAgent finit avec le code `0` et ouvre `http://127.0.0.1:18789/`.

## 2026-06-12 - Heartbeat - Realignement de la prochaine action dashboard

- Contexte : le controle heartbeat de 23:30 a detecte que `dashboard-data.json` attribuait au projet `Dashboard multi-agent` une prochaine action appartenant au projet `Relance paiements scolaires WhatsApp`.
- Décision : corriger uniquement la prochaine action du dashboard pour la realigner sur la validation manuelle de la V1.15.
- Sauvegarde : `amsclaw/projects/dashboard-multi-agent/data/backups/dashboard-data-2026-06-12-2330-pre-heartbeat-fix.json`.
- Résultat attendu : eviter une confusion dans les prochains rapports et dans la vue projets du dashboard.

## 2026-06-12 - OpenClaw - Export Markdown du fil de discussion terminal

- Contexte : Ams veut conserver tous les échanges du fil de discussion terminal dans un fichier `.md`.
- Action : exporter le transcript JSONL OpenClaw visible pour la session courante vers `amsclaw/reports/fil-discussion-terminal-openclaw-2026-06-12.md`.
- Source : `/Users/amsfox/.openclaw/agents/main/sessions/7d93ad0b-c8d4-4e90-8c1d-a02b2a813e26.jsonl`.
- Résultat : 3929 messages exportés, incluant messages utilisateur, réponses assistant, appels outils et résultats outils présents dans le transcript.
- Commandes exécutées : lecture du transcript, conversion Node.js JSONL vers Markdown, vérification `ls`, `wc`, `sed`, `tail` et `rg`.

## 2026-06-12 - Dashboard - Validation utilisateur V1.15

- Contexte : Ams confirme que les tests de la V1.15 sont OK de son côté.
- Décision : considérer la V1.15 comme validée côté utilisateur et déplacer la prochaine action vers le rituel de pilotage hebdomadaire puis le cadrage de la synchronisation JSON / Markdown.
- Modifications : mise à jour de `amsclaw/PROJECTS_INDEX.md`, `README.md`, `docs/NEXT_STEPS.md`, `memory/active-projects.md`, `dashboard-data.json` et création du rapport `amsclaw/projects/dashboard-multi-agent/reports/2026-06-12-validation-utilisateur-v1-15.md`.
- Sauvegarde : `amsclaw/projects/dashboard-multi-agent/data/backups/dashboard-data-2026-06-12-2345-validation-v115.json`.
- Prochaine action : définir le rituel hebdomadaire minimal et choisir la source de vérité prioritaire entre `dashboard-data.json` et les fichiers Markdown.

## 2026-06-12 - Dashboard - Rituel hebdomadaire de pilotage

- Contexte : après validation utilisateur de la V1.15, le dashboard doit devenir un vrai cockpit de suivi récurrent.
- Décision : formaliser un rituel hebdomadaire simple dans `amsclaw/projects/dashboard-multi-agent/docs/RITUEL_HEBDOMADAIRE.md`.
- Contenu : ordre de lecture des vues, questions de pilotage, sorties attendues, règle de priorisation et amélioration future possible.
- Point de vigilance : ne pas automatiser l'archivage de la revue avant d'avoir clarifié la source de vérité JSON / Markdown.

## 2026-06-12 - Dashboard - Source de vérité des données

- Contexte : le dashboard écrit dans `dashboard-data.json`, tandis que la reprise projet dépend aussi des fichiers Markdown de mémoire et de documentation.
- Décision : considérer `dashboard-data.json` comme source opérationnelle de l'IHM et les fichiers Markdown comme mémoire durable de reprise et de décision.
- Règles : pas de suppression automatique d'un projet JSON absent du Markdown, pas d'écrasement de champs opérationnels sans sauvegarde, et pas de synchronisation destructive avant rapport de divergence.
- Documentation : `amsclaw/projects/dashboard-multi-agent/docs/SOURCE_DE_VERITE_DONNEES.md`.
- Prochaine action : créer un script `audit-data-sync.js` qui produit un rapport Markdown non destructif sur les divergences JSON / Markdown.

## 2026-06-12 - Dashboard - Audit non destructif JSON / Markdown

- Contexte : le cadrage de source de vérité demande un rapport de divergence avant toute synchronisation automatique.
- Action : créer `amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js`.
- Résultat : rapport généré dans `amsclaw/projects/dashboard-multi-agent/reports/audit-data-sync-2026-06-12.md`.
- Corrections associées : ajout d'un champ `ID` dans `memory/active-projects.md`, alignement des IDs projets, alignement de la prochaine action du projet `data-sync`, et journalisation explicite de la décision V1.15.
- État final : audit à zéro divergence entre JSON et Markdown.
- Prochaine action : décider si `sync-dashboard-data.js` doit exiger un audit propre avant écriture.

## 2026-06-13 - Dashboard - Synchronisation Markdown -> JSON sécurisée

- Contexte : la prochaine décision dashboard était de choisir si `sync-dashboard-data.js` devait exiger un audit propre avant écriture.
- Décision : rendre l'audit JSON / Markdown obligatoire avant toute synchronisation Markdown -> JSON.
- Modifications : `audit-data-sync.js` expose une fonction réutilisable, `sync-dashboard-data.js` bloque l'écriture en cas de divergence, accepte `--apply-reviewed-divergences` pour appliquer des écarts de champs déjà arbitrés, et crée une sauvegarde pré-écriture dans `data/backups/`.
- Résultat : audit du 2026-06-13 à zéro divergence, synchronisation testée avec sauvegarde `dashboard-data-2026-06-13T14-14-33-608Z-pre-sync.json`.
- Prochaine action : tester le rituel hebdomadaire sur une vraie revue de portefeuille, puis cadrer l'usage dashboard pour la V1 `Relance paiements scolaires WhatsApp`.

## 2026-06-13 - Dashboard - Revue pilote sur Espace de travail amsClaw

- Contexte : Ams veut tester le dashboard sur un autre projet que `Relance paiements scolaires WhatsApp`.
- Décision : utiliser `Espace de travail amsClaw` comme projet pilote, car il est utile, léger et peu risqué.
- Action : création de `amsclaw/resources/project-creation-checklist.md` pour standardiser le contrôle des nouveaux projets.
- Résultat attendu : vérifier le rituel dashboard sur un projet support avant de l'appliquer à un projet business.
- Prochaine action : tester la checklist sur le prochain projet créé ou l'intégrer au modèle de création du dashboard.

## 2026-06-13 - Dashboard - Checklist intégrée au modèle projet

- Contexte : après la revue pilote, Ams valide la poursuite et demande d'intégrer la checklist au flux dashboard.
- Décision : générer automatiquement `docs/PROJECT_CHECKLIST.md` lors d'une création de projet depuis modèle.
- Modifications : `dashboard-server.js` génère le fichier checklist et l'ajoute à la documentation du projet ; `app.js` l'affiche dans la confirmation avant création ; `PROJECT_CREATION_MODEL.md` documente le nouveau fichier.
- Test : endpoint `POST /api/projects/create-from-template` testé en `dryRun` sur le port temporaire `8791`, puis sur le serveur principal `8787` après redémarrage du LaunchAgent `com.amsclaw.dashboard`, sans création réelle de projet.
- Résultat : le dry run renvoie bien `README.md`, `PROJECT_BRIEF.md`, `NEXT_STEPS.md` et `PROJECT_CHECKLIST.md`; dashboard et API répondent en HTTP `200`; audit final à zéro divergence.
- Prochaine action : utiliser la checklist lors de la prochaine création réelle de projet depuis le dashboard.

## 2026-06-13 - Dashboard - Test réel de création projet avec checklist

- Contexte : Ams confirme que le test est OK après création d'un projet depuis le dashboard.
- Décision : considérer le flux de création projet avec checklist comme validé en réel.
- Projet créé : `Creation CRM pour une ecole`.
- Résultat : le projet existe dans `amsclaw/projects/creation-crm-pour-une-ecole/`, il est présent dans `dashboard-data.json`, et `docs/PROJECT_CHECKLIST.md` a bien été généré.
- Prochaine action : cadrer le besoin du CRM école et produire le document d'expression de besoin avant une PRD.

## 2026-06-13 - CRM école - Méthode projet validée

- Contexte : Ams a l'idée en tête mais souhaite passer par une idéation structurée avant la PRD.
- Décision : avancer par étapes : idéation, expression de besoin validée, PRD validée, cahier de recette, développement V1 autonome, tests, puis livraison.
- Document créé : `amsclaw/projects/creation-crm-pour-une-ecole/docs/EXPRESSION_BESOIN.md`.
- Prochaine action : répondre aux questions d'idéation pour cadrer le premier besoin métier.

## 2026-06-13 - Dashboard - Actions guidées projet

- Contexte : Ams veut pouvoir faire avancer un projet depuis le dashboard, par exemple valider la PRD du projet CRM, sans passer par le terminal.
- Décision : ajouter une première action guidée `Valider la PRD` sur la fiche du projet `Creation CRM pour une ecole`.
- Règle : l'action guidée reste limitée à un jalon explicite, confirmé par l'utilisateur, avec mise à jour du JSON, du journal, des décisions et de la mémoire durable.
- Point de vigilance : ne pas transformer le dashboard en éditeur complet de documents ; garder des actions simples et contrôlées.

## 2026-06-14 - CRM école - Retours recette V1 classes/utilisateurs

- Contexte : Ams signale dans `docs/commentaires_v1.md` qu'il ne peut pas modifier ou supprimer les classes et utilisateurs créés.
- Décision : ajouter la modification et l'archivage/désactivation des classes et utilisateurs en V1.1, mais ne pas ajouter de suppression définitive dans l'interface courante.
- Arbitrages : une classe peut être créée sans instructeur principal ; les classes archivées restent visibles ; les noms des utilisateurs désactivés sont conservés dans l'historique ; les professeurs par matière sont reportés en V2.
- Modifications : `src/app.js`, `src/styles.css`, `src/index.html`, `tests/smoke.mjs`, `tests/e2e.mjs`, `docs/commentaires_v1.md`, `README.md`, `amsclaw/PROJECTS_INDEX.md`.
- Tests : `npm test` OK, avec couverture navigateur de création classe, modification/archivage classe, création utilisateur, modification/désactivation utilisateur, création élève, commentaire, import Excel et sauvegarde.

## 2026-06-14 - CRM école - Clarification du champ Cycle des classes

- Contexte : Ams demande à quoi sert le champ `Niveau` lors de la création des classes et valide que `Cycle` serait plus clair.
- Décision : renommer le libellé visible `Niveau` en `Cycle` pour désigner `Maternelle`, `Primaire`, `College` ou `Lycee`, sans changer la structure technique interne en V1.
- Modifications : `src/app.js`, `scripts/server.js`, `docs/PRD_V1.md`, `docs/CAHIER_RECETTE_V1.md`, `docs/commentaires_v1.md`, `README.md`, `amsclaw/PROJECTS_INDEX.md`.
- Tests : `npm test` OK le 2026-06-14.

## 2026-06-14 - CRM école - Instructeur principal et cycle en liste

- Contexte : Ams demande de renommer `Instructeurs rattaches` et de transformer le champ `Cycle` en liste de sélection.
- Décision : afficher `Instructeur principal` en V1, avec un seul choix optionnel par classe ; proposer les cycles `Maternelle`, `Primaire`, `College`, `Lycee`.
- Point de vigilance : ne pas ouvrir en V1 le module des professeurs multiples par matière, reporté en V2.
- Modifications : `src/app.js`, `tests/e2e.mjs`, `docs/PRD_V1.md`, `docs/CAHIER_RECETTE_V1.md`, `docs/commentaires_v1.md`, `README.md`, `amsclaw/PROJECTS_INDEX.md`.
- Tests : `npm test` OK le 2026-06-14.

## 2026-06-14 - Heartbeat - Alignement de la prochaine action CRM école

- Contexte : le contrôle heartbeat de 20:30 a confirmé que `amsclaw/PROJECTS_INDEX.md` portait la prochaine action la plus à jour du projet CRM école, tandis que `README.md`, `docs/NEXT_STEPS.md`, `memory/active-projects.md` et `dashboard-data.json` restaient sur une formulation plus ancienne.
- Décision : aligner les sources de reprise sur la poursuite de la recette utilisateur V1 via `docs/commentaires_v1.md`.
- Modifications : `amsclaw/projects/creation-crm-pour-une-ecole/README.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/NEXT_STEPS.md`, `memory/active-projects.md`, `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`, `memory/decisions.md`.
- Contrôle : audit JSON / Markdown relancé après mise à jour.

## 2026-06-14 - Heartbeat - Reprise CRM école après ajout photo élève

- Contexte : la fonctionnalité photo élève a été ajoutée après validation par Ams des écrans Élèves, Classes et Utilisateurs, mais certaines sources de reprise pointaient encore vers une recette V1 générale.
- Décision : concentrer la prochaine action CRM école sur le test utilisateur de la photo élève : ajout d'image, ajustement du cadrage, enregistrement, rafraîchissement et vérification de la persistance.
- Modifications : `amsclaw/PROJECTS_INDEX.md`, `amsclaw/projects/creation-crm-pour-une-ecole/README.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/NEXT_STEPS.md`, `memory/active-projects.md`, `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`, `memory/decisions.md`.
- Script exécuté : mise à jour structurée de `dashboard-data.json` via Node pour aligner `nextAction`, `documentation`, `projectLog` et `lastUpdated`.
- Prochaine action : Ams teste la photo élève dans l'application locale.

## 2026-06-15 - Heartbeat - Alignement mémoire CRM école après portabilité et guide utilisateur

- Contexte : `amsclaw/PROJECTS_INDEX.md` documentait déjà les scripts Mac renommés, les scripts Windows, les scripts d'installation de packages et le guide utilisateur HTML, mais `memory/active-projects.md` gardait encore des noms de scripts plus anciens et ne référençait pas le guide utilisateur.
- Décision : aligner la mémoire durable du projet CRM école avec l'état livré : scripts `_MAC.command`, scripts `_WINDOWS.bat`, scripts `INSTALLER_PACKAGES_CRM_*` et guide `docs/GUIDE_UTILISATEUR_CRM.html`.
- Modifications : `memory/active-projects.md`, `memory/decisions.md`.
- Raison : garantir qu'une reprise future depuis la mémoire centrale ne perde pas la portabilité Mac / Windows ni la règle de maintenance du guide utilisateur.
- Prochaine action : garder le guide utilisateur à jour à chaque évolution visible du CRM.

## 2026-06-15 - Heartbeat - Réalignement priorité tâche dashboard

- Contexte : le contrôle des tâches prioritaires a détecté que `task-dashboard-guided-action-notification` restait en priorité `Haute`, alors que les sources de reprise placent désormais la priorité dashboard sur `Validations projet visibles dans Taches` et la priorité globale sur l'usage terrain du CRM école.
- Décision : rétrograder cette tâche de `Haute` à `Moyenne` et préciser qu'elle est à reprendre seulement si les actions guidées se multiplient.
- Modifications : `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`, `memory/decisions.md`.
- Sauvegarde : `amsclaw/projects/dashboard-multi-agent/data/backups/dashboard-data-2026-06-15T01-30-priority-task-cleanup.json`.
- Raison : éviter qu'une tâche technique secondaire remonte artificiellement devant les priorités hebdomadaires validées.
- Prochaine action : garder en priorité haute l'évolution `Validations projet visibles dans Taches`.

## 2026-06-18 - CRM école - Publication guide utilisateur sur GitHub Pages

- Contexte : Ams demande de publier le `GUIDE_UTILISATEUR_CRM.html` (25 Ko, 8 captures d'écran) sur GitHub sous forme de site web accessible uniquement via le lien.
- Décision : créer le dépôt public `amsClaw/crm-ecole-guide`, renommer la page en `index.html`, pusher avec les assets (captures d'écran), activer GitHub Pages.
- Lien : https://amsclaw.github.io/crm-ecole-guide/
- Dépôt : https://github.com/amsClaw/crm-ecole-guide
- Visibilité : dépôt public, GitHub Pages activé en HTTPS. Accessible uniquement aux détenteurs du lien (pas de référencement dans les moteurs).
- Prochaine action : maintenir le guide à jour = script `bash .sync/sync-crm-guide.sh` ; cron job `sync-crm-guide-github` toutes les 15 min via OpenClaw.
- Script créé : `.sync/sync-crm-guide.sh` (compare le HTML + assets locaux avec le clone GitHub, copie et push si modifié).
- Cron : toutes les 15 min, exécute le script ; notifie Ams sur Telegram uniquement si un changement a été détecté et pushé.

## 2026-06-18 - Référentiel skills installés

- Contexte : Ams veut connaître et installer les skills utiles manquants, et disposer d'un fichier HTML listant tous les skills installés.
- Décision : vérifier l'écosystème. Tous les skills listés (browser-automation, taskflow, healthcheck, spike, send-email, diagram-maker, apple-shortcuts, notion, apple-notes, apple-reminders, apple-calendar, etc.) sont déjà installés. Création du fichier `docs/skills-referentiel.html` qui liste les 27 skills disponibles avec description et catégorie.
- Fichier créé : `docs/skills-referentiel.html` (vignettes par catégorie : Noyau, Web & Automatisation, Sécurité & Infra, Apple & macOS, Productivité, Création, Développement).
- Prochaine action : maintenir ce fichier à jour à chaque ajout/retrait de skill.

## 2026-06-18 - Installation summarize + gemini + openai-whisper

- Contexte : Ams valide l'installation de 3 skills recommandés.
- Décision : installer les binaires via brew : `summarize` (0.18.1), `gemini-cli` (0.46.0), `openai-whisper` (dernière).
- Dépendances installées (total ~75+ formules) : ffmpeg, yt-dlp, tesseract, deno, python@3.14, pytorch, llvm@20, gcc, numpy, openblas, etc.
- Config : `GEMINI_CLI_TRUST_WORKSPACE=true` ajouté à .zshrc pour le mode headless.
- Vérifications : summarize ✅, gemini ✅ (clé API existante), whisper ✅.
- Mise à jour : `docs/skills-referentiel.html` (27 → 30 skills).
- Prochaine action : si besoin, installer wacli (brew tap manquant, alternative go), voice-call (config existante, besoin creds Twilio), obsidian (app desktop), bear-notes (besoin Go + grizzly).

## 2026-06-18 - Installation suite skills (coding-agent, model-usage, session-logs, tmux, video-frames)

- Contexte : Ams valide l'installation du reste de la liste.
- Décision : installer les binaires et activer les plugins.
- Installé : `tmux` (brew), `ripgrep` (brew, pour session-logs), `@anthropic-ai/claude-code` (npm, pour coding-agent), `codexbar` (brew cask, pour model-usage).
- Déjà présent : `ffmpeg` (video-frames), `jq` (session-logs).
- Config : les 5 plugins activés dans `skills.entries` + `GEMINI_CLI_TRUST_WORKSPACE=true` dans .zshrc.
- Non installables simplement : `wacli` (formule brew manquante, besoin Go), `voice-call` (nécessite creds Twilio/Telnyx), `obsidian` (app GUI), `bear-notes` (besoin Go + grizzly).
- Référentiel mis à jour : 37 skills.

## 2026-06-18 - Publication skills-référentiel sur GitHub Pages

- Contexte : Ams valide la publication du fichier sur GitHub pour y accéder depuis son iPhone ; veut sync automatique comme le guide CRM.
- Décision : créer le dépôt public `amsClaw/skills-referentiel`, activer GitHub Pages, créer le script `.sync/sync-skills-ref.sh` et le cron job `sync-skills-ref-github` (toutes les 15 min).
- Lien : https://amsclaw.github.io/skills-referentiel/
- Dépôt : https://github.com/amsClaw/skills-referentiel
- Cron jobs actifs : remplacés les 2 crons 15min par un seul cron `sync-daily` à 6h du matin.
- Règle validée par Ams : guide CRM + skills ref → sync automatique 1x/jour ; sites vitrines → push manuel à chaque version seulement.

## 2026-06-18 - Processus génération image/vidéo avec Gemini Pro

- Contexte : Ams a un abonnement Gemini Pro. Pour la génération d'images/vidéos, plutôt que d'utiliser l'API payante, je rédige les prompts pour qu'il les colle sur gemini.google.com.
- Décision : créer un fichier processus `.process/gemini-generation.md` avec les règles, outils disponibles, et style de prompts.
- Flux : je donne prompt + outil → Ams colle sur gemini.google.com → Ams dépose le fichier dans `assets/generated/gemini/` → je l'intègre au projet.
- Dossier créé : `assets/generated/gemini/`.

## 2026-06-19 - Creation projet Automatisation AAS

- Contexte : Ams demande la creation d'un nouveau projet dashboard nomme `automatisation projet AAS` avec son dossier project et la documentation draft formulee ensemble.
- Décision : creer le projet `amsclaw/projects/automatisation-projet-aas/` avec README, PROJECT_BRIEF, NEXT_STEPS et copie du draft `.process/saas-dev-draft.md` comme DRAFT_PROCESS_AAS.md.
- Actions simultanees : ajout du projet au dashboard dans dashboard-data.json, mise a jour de PROJECTS_INDEX.md en priorite 1 et de memory/active-projects.md comme projet actif.
- La tache existante `Relire et valider le draft processus developpement SaaS` est rattachee au projet.

## 2026-06-19 - Automatisation AAS - Draft fusionne OpenClaw

- Contexte : Ams valide l'idee de fusionner le guide manuel `automatisation Projets SAAS` avec le draft amsClaw, tout en remplacant la logique d'outils nommes par des agents specialises OpenClaw.
- Décision : creer `amsclaw/projects/automatisation-projet-aas/docs/PROCESS_AAS_FUSIONNE.md` comme draft de travail. Le document definit un mode leger pour petits projets, un mode complet pour SaaS/produits commercialisables, les agents responsables, les livrables, les validations Ams et l'adaptation des templates sources.
- Raison : disposer d'une methode reutilisable sans surdocumenter les petits projets, et garder Ams decisionnaire sur les validations structurantes.
- Prochaine action : relire le draft fusionne puis le peaufiner avec Codex / GPT-5 quand le compte dedie sera connecte.

## 2026-06-19 - Automatisation AAS - Tache peaufiner avec GPT-5/Codex

- Contexte : Ams demande quoi formuler une fois GPT-5 connecte et veut une tache dashboard associee au projet.
- Décision : ajouter la tache dashboard `task-peaufiner-process-aas-gpt5`, liee au projet `automatisation-projet-aas`, priorite Haute, owner `amsClaw`.
- Objectif : relire `docs/PROCESS_AAS_FUSIONNE.md`, ameliorer la structure, ajouter les criteres Go/No-Go, renforcer securite/couts/exploitation, transformer les templates sources en templates OpenClaw et produire une V0.1 officielle.
- Prochaine action : attendre la connexion du compte GPT-5/Codex dedie, puis executer la tache.

## 2026-06-19 - Automatisation AAS - Regle choix mode leger/complet

- Contexte : Ams demande comment l'agent saura choisir le mode leger ou complet pour un projet simple, par exemple un site vitrine d'artisan.
- Décision : ajouter dans `docs/PROCESS_AAS_FUSIONNE.md` une regle de decision rapide. Le mode leger devient le mode par defaut ; le mode complet est choisi seulement si des declencheurs forts existent : comptes utilisateurs, donnees sensibles, paiement, API importantes, workflow metier, multi-clients ou produit durable.
- Exemple retenu : un site vitrine artisan reste en mode leger sauf ajout d'espace client, paiement, back-office, devis automatises complexes, CRM ou donnees sensibles.
- Raison : eviter la surdocumentation des petits projets tout en gardant un chemin de bascule vers le mode complet.

## 2026-06-19 - Automatisation AAS - Commandes explicites de mode

- Contexte : Ams veut pouvoir forcer le process lourd si necessaire, meme lorsque la regle automatique recommanderait le mode leger.
- Décision : ajouter dans `docs/PROCESS_AAS_FUSIONNE.md` les commandes explicites `Demarre le process projet leger`, `Demarre le process projet lourd` et `Recommande le bon process`.
- Regle : si Ams force le mode lourd, l'agent respecte ce choix en signalant seulement le risque de surdocumentation. Si Ams force le mode leger malgre paiement, donnees sensibles, comptes utilisateurs ou usage multi-clients, l'agent doit alerter et demander confirmation avant de continuer.
- Raison : garder Ams decisionnaire tout en conservant des garde-fous sur les cas sensibles.

## 2026-06-19 - Automatisation AAS - Guide demarrage projet

- Contexte : Ams demande un document type expliquant comment initier un projet avec le process AAS, avec les bons prompts de demarrage et surtout d'ideation.
- Décision : creer `amsclaw/projects/automatisation-projet-aas/docs/GUIDE_DEMARRAGE_PROJET.md`.
- Contenu : commandes de demarrage recommande / leger / lourd, prompts d'ideation minimale, structuree et business, prompts pour site vitrine et SaaS, comportement attendu de l'agent apres le prompt, formules courtes utiles et exemple complet.
- Raison : permettre a Ams de lancer un projet rapidement depuis Telegram sans devoir se rappeler toute la methode.

## 2026-06-19 - Automatisation AAS - Version HTML guide demarrage

- Contexte : Ams demande une version HTML du guide de demarrage pour faciliter la lecture.
- Décision : creer `amsclaw/projects/automatisation-projet-aas/docs/GUIDE_DEMARRAGE_PROJET.html`.
- Contenu : conversion autonome du guide Markdown avec style integre, sommaire rapide, blocs de prompts lisibles et support impression.
- Raison : rendre le guide plus confortable a lire et a consulter rapidement.

## 2026-06-19 - Codex - Connexion ChatGPT temporaire

- Contexte : Ams souhaite utiliser temporairement son compte ChatGPT personnel pour finaliser la documentation du process AAS avec Codex/GPT-5, avant de basculer plus tard vers un compte dedie au Mac mini.
- Action : lancer `codex login`, ouvrir la page d'authentification OpenAI locale et laisser Ams effectuer lui-meme la connexion.
- Résultat : `codex login status` indique `Logged in using ChatGPT`; `codex doctor` confirme que l'auth ChatGPT est configuree et que la connexion websocket OpenAI est operationnelle.
- Garde-fou : aucun mot de passe, code 2FA, cle API ou jeton n'a ete demande, stocke dans la conversation ou journalise.

## 2026-06-19 - Automatisation AAS - V0.1 officielle

- Contexte : apres connexion ChatGPT/Codex, Ams demande de finaliser toute la documentation du process AAS pour en faire une V0.1 officielle OpenClaw.
- Décision : renforcer `amsclaw/projects/automatisation-projet-aas/docs/PROCESS_AAS_FUSIONNE.md` pour passer du statut draft a une procedure V0.1 officielle.
- Ajouts principaux : criteres Go / No-Go, stop obligatoire sur paiement/auth/donnees sensibles/publication/suppression, autonomie encadree de l'agent, validations dashboard par mode, adaptation explicite des sources vers templates OpenClaw.
- Templates crees dans `amsclaw/projects/automatisation-projet-aas/docs/templates/` : ideation projet leger, ideation SaaS complet, analyse business/marche, brief produit, architecture light, architecture complete, front spec light, front spec complete.
- Guide mis a jour : `docs/GUIDE_DEMARRAGE_PROJET.md` devient guide officiel V0.1 et `docs/GUIDE_DEMARRAGE_PROJET.html` est regenere.
- Dashboard : la tache `task-peaufiner-process-aas-gpt5` est terminee et une nouvelle tache `task-relire-v01-process-aas` demande a Ams de relire la V0.1 puis de choisir un projet test.
- Nettoyage dashboard : la tache ancienne `task-relire-saas-dev-draft` est cloturee comme supersedee par la tache V0.1 pour eviter les doublons.
- Prochaine action : relecture Ams de la V0.1, puis application sur un premier projet reel avant V0.2.

## 2026-06-18 - Draft processus développement SaaS

- Contexte : Ams réfléchit à un process structuré pour développer des apps SaaS avec un minimum d'intervention de sa part.
- Décision : formaliser la proposition en draft dans `.process/saas-dev-draft.md` pour relecture et modifications ultérieures.
- Process : 7 phases (Idéation → Expression besoin → Benchmark → PRD/Architecture → Maquette → Dev MVP → Retour/Itérations). Ams valide aux étapes ②, ④, ⑤ et ⑦.
- Total temps Ams estimé : 45-70 min par projet.
- Prochaine action : Ams relit le draft et propose modifications.

## 2026-06-19 - CRM ecole - Validation donnees chargees et fonctions conformes

- Contexte : Ams confirme que les tests sont OK, que les donnees sont chargees et que toutes les fonctions livrees testees sont conformes.
- Décision : considerer la V1 comme prete pour utilisation terrain en conditions reelles, sans ouvrir de V1.1 tant qu'aucun retour terrain priorise ne le justifie.
- Sauvegarde creee : `amsclaw/projects/creation-crm-pour-une-ecole/data/backups/crm-ecole-backup-2026-06-19T16-17-41-810Z.json`.
- Raison : le socle livre est conforme ; la prochaine valeur vient maintenant de l'observation terrain, pas de l'ajout preventif de fonctions.
- Prochaine action : utiliser le CRM en conditions reelles, noter uniquement les retours bloquants ou fortement utiles dans `docs/commentaires_v1.md`, puis arbitrer une eventuelle V1.1 courte.

## 2026-06-19 - CRM ecole - Mode reseau local conforme PRD

- Contexte : Ams indique qu'aucun point n'est bloquant et souhaite continuer selon le PRD. Le PRD prevoit un acces depuis les appareils connectes au meme reseau local de l'ecole.
- Décision : ajouter un mode de lancement reseau local optionnel, distinct du lancement local existant, via `LANCER_CRM_RESEAU_MAC.command` et `LANCER_CRM_RESEAU_WINDOWS.bat`.
- Modifications : `scripts/server.js`, `scripts/launch-v1.sh`, scripts reseau Mac/Windows, `README.md`, `docs/RUNBOOK_V1.md`, `docs/GUIDE_UTILISATEUR_CRM.html`, `docs/NEXT_STEPS.md`, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, `memory/decisions.md`.
- Tests : `npm test` OK, `node -c scripts/server.js` OK, `bash -n` OK, demarrage `HOST=0.0.0.0 PORT=8891 npm start` OK, `/api/health` OK.
- Garde-fou : le mode reseau local ne doit pas etre expose sur Internet.
- Prochaine action : tester l'acces depuis un deuxieme appareil du meme reseau local que la machine serveur.

## 2026-06-19 - CRM ecole - Test iPhone reseau local valide

- Contexte : Ams teste l'acces au CRM depuis son iPhone connecte au meme reseau Wi-Fi.
- Resultat : connexion au CRM reussie depuis l'iPhone.
- Documentation : `docs/GUIDE_UTILISATEUR_CRM.html` est renforce pour expliquer l'acces depuis telephone/tablette/autre ordinateur et preciser de ne pas utiliser `127.0.0.1` depuis un autre appareil.
- Prochaine action : piloter l'utilisation terrain de la V1, noter les retours utiles et ne pas ouvrir de V1.1 tant qu'aucun retour priorise ne le justifie.

## 2026-06-19 - CRM ecole - Ergonomie fiche eleve mobile

- Contexte : Ams signale que sur le menu Eleves, la fiche eleve ne s'affiche qu'en toute fin de liste, ce qui rend l'usage peu confortable sur iPhone.
- Décision : garder le layout liste + fiche sur ordinateur, mais afficher la fiche avant la liste sur mobile/tablette et scroller automatiquement vers la fiche lors de l'ouverture d'un eleve.
- Modifications : `src/app.js`, `src/styles.css`, `src/index.html`, `tests/e2e.mjs`, `docs/GUIDE_UTILISATEUR_CRM.html`, `docs/commentaires_v1.md`, `README.md`, `docs/NEXT_STEPS.md`, `amsclaw/PROJECTS_INDEX.md`, `memory/decisions.md`.
- Tests : `npm test` OK le 2026-06-19 ; le test E2E verifie le positionnement mobile de la fiche avant la liste.
- Prochaine action : faire valider le confort d'affichage Eleves par Ams sur iPhone.

## 2026-06-20 - CRM ecole - Validation affichage Eleves mobile

- Contexte : Ams teste le nouvel affichage du menu Eleves sur iPhone apres correction ergonomique.
- Resultat : test OK.
- Décision : considerer la correction ergonomique Eleves mobile comme validee.
- Prochaine action : piloter l'utilisation terrain de la V1 et noter uniquement les retours utiles ou bloquants avant d'envisager une V1.1.

## 2026-06-20 - CRM ecole - Durcissement droits serveur V1

- Contexte : Ams valide la recommandation de continuer le developpement conforme PRD par le durcissement V1 : droits serveur, regles de roles et sauvegarde automatique simple.
- Décision : ajouter des sessions serveur avec jeton navigateur, proteger les endpoints API par role, transformer les exports en boutons authentifies et creer une sauvegarde automatique au premier demarrage du jour.
- Modifications : `scripts/server.js`, `src/app.js`, `src/index.html`, `tests/smoke.mjs`, `tests/e2e.mjs`, `docs/GUIDE_UTILISATEUR_CRM.html`, `docs/RUNBOOK_V1.md`, `README.md`, `docs/NEXT_STEPS.md`, `docs/commentaires_v1.md`, `memory/decisions.md`.
- Tests : `npm test` OK le 2026-06-20. Le smoke test couvre aussi le refus d'export et de modification administrative pour un instructeur.
- Prochaine action : faire valider par Ams le comportement des roles `admin`, `secretariat` et `instructeur` dans l'interface.

## 2026-06-20 - CRM ecole - Cloudflare Tunnel pour recette distante

- Contexte : Ams souhaite faire tester le CRM par un utilisateur situe en Guinee sans lui faire telecharger le dossier complet ni installer le CRM.
- Décision : installer `cloudflared` sur le Mac d'Ams et ajouter un mode de recette distante temporaire via URL `trycloudflare.com`.
- Modifications : ajout de `LANCER_TUNNEL_CLOUDFLARE_MAC.command`, ajout de `docs/ACCES_DISTANCE_TEST_CLOUDFLARE.md`, mise a jour de `README.md`, `docs/RUNBOOK_V1.md`, `docs/NEXT_STEPS.md`, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, `memory/decisions.md`.
- Installation : `brew install cloudflared`, version installee `cloudflared 2026.6.1`.
- Tests : `cloudflared --version` OK, `bash -n LANCER_TUNNEL_CLOUDFLARE_MAC.command` OK, generation d'une URL temporaire `trycloudflare.com` OK, `npm test` OK.
- Garde-fou : mode reserve aux demonstrations et recettes courtes ; fermer la fenetre du tunnel coupe l'acces ; eviter les donnees sensibles ou reelles pendant les premieres sessions ; ne pas publier le lien publiquement.
- Prochaine action : organiser une courte session de test distant via Cloudflare Tunnel avec un compte de test, puis noter les retours dans `docs/commentaires_v1.md`.

## 2026-06-20 - CRM ecole - V1 stable validee utilisateurs

- Contexte : Ams confirme que le test est valide par les utilisateurs et que la version courante est stable.
- Décision : considerer la version courante comme V1 stable de reference et autoriser la poursuite des developpements.
- Sauvegarde de reprise : `amsclaw/projects/creation-crm-pour-une-ecole/data/backups/crm-ecole-stable-utilisateurs-2026-06-20.json`.
- Modifications : `amsclaw/PROJECTS_INDEX.md`, `amsclaw/projects/creation-crm-pour-une-ecole/README.md`, `amsclaw/projects/creation-crm-pour-une-ecole/docs/NEXT_STEPS.md`, `memory/active-projects.md`, `memory/decisions.md`, `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`.
- Raison : disposer d'un point de reprise clair avant de reprendre les evolutions, et eviter que la V1.1 ne degrade une version deja acceptee par les utilisateurs.
- Prochaine action : cadrer une V1.1 courte a partir des retours utilisateurs valides, avec un scope priorise et testable.

## 2026-06-20 - CRM ecole - Nom officiel ecole corrige

- Contexte : Ams precise que le nom officiel de l'ecole est `GS AIME CESAIRE TKB`.
- Décision : corriger les sources actives du CRM et du suivi projet pour remplacer l'ancien libelle `GS AIME CEASIRE`.
- Modifications : interface CRM, metadata serveur, donnees courantes, sauvegarde stable, README, PRD, cahier de recette, runbook, guide utilisateur, expression de besoin, brief projet, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, dashboard data, et rapport `reports/correction-nom-ecole-2026-06-20.md`.
- Garde-fou : les anciennes sauvegardes historiques ne sont pas modifiees, afin de conserver leur trace exacte au moment de creation.
- Tests : `npm test` OK, JSON courant OK, controle visuel Playwright OK, aucune occurrence de `CEASIRE` dans les sources actives controlees.

## 2026-06-20 - CRM ecole - Cadrage V1.1 sans nouveaux retours

- Contexte : Ams confirme que le test V1 est OK et qu'il n'a pas d'autres retours utilisateurs.
- Décision : ne pas ajouter de gros module sans besoin terrain ; creer un cadrage V1.1 court et recommander une premiere evolution a faible risque.
- Document cree : `amsclaw/projects/creation-crm-pour-une-ecole/docs/CADRAGE_V1_1.md`.
- Recommandation : commencer par une fiche eleve imprimable, utile pour l'usage papier de l'ecole et sans modification du modele de donnees.
- Prochaine action : developper la fiche eleve imprimable, puis la faire tester sur 2 ou 3 eleves reels.

## 2026-06-20 - CRM ecole - Fiche eleve imprimable V1.1

- Contexte : premiere evolution V1.1 retenue apres validation de la V1 stable.
- Décision : ajouter une fiche eleve imprimable sans changer le modele de donnees ni les API.
- Modifications : `src/app.js`, `src/styles.css`, `tests/e2e.mjs`, `docs/GUIDE_UTILISATEUR_CRM.html`, `docs/commentaires_v1.md`, `README.md`, `docs/NEXT_STEPS.md`, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, dashboard data.
- Fonctionnement : bouton `Imprimer la fiche` sur la fiche eleve ; impression dediee avec identite, classe, responsables, suivi administratif, note et derniers commentaires ; navigation et formulaires masques en media print.
- Tests : `npm test` OK le 2026-06-20 ; controle Playwright avec screenshot Eleves et generation PDF OK.
- Prochaine action : faire tester l'impression sur 2 ou 3 eleves reels.

## 2026-06-20 - CRM ecole - Correction impression fiche eleve

- Contexte : Ams teste la fiche imprimable et signale que la fiche occupe seulement le quart de la premiere page et que 9 pages vides sont generees.
- Cause : l'ancien CSS d'impression utilisait `visibility: hidden`, ce qui masquait le contenu mais conservait la hauteur de la longue liste d'eleves dans le flux d'impression.
- Correction : creer une sortie d'impression isolee `#print-output`, masquer completement `#app` avec `display: none` pendant l'impression, puis nettoyer la sortie apres impression.
- Modifications : `src/app.js`, `src/styles.css`, `tests/e2e.mjs`, `docs/commentaires_v1.md`, `reports/correction-impression-fiche-eleve-pages-vides-2026-06-20.md`.
- Tests : `npm test` OK ; PDF de controle Playwright avec 1 page reelle detectee.
- Validation : Ams confirme le test OK le 2026-06-20.
- Prochaine action : choisir la prochaine petite evolution V1.1 a traiter, en gardant la V1 stable comme reference.

## 2026-06-20 - Creation projet - Site web GS Aime Cesaire TKB

- Contexte : Ams demande la creation d'un nouveau dossier projet pour le site web de l'ecole GS AIME CESAIRE TKB, lie au CRM ecole existant (creation-crm-pour-une-ecole).
- Decision : creer le projet `site-web-gs-aime-cesaire-tkb` avec structure minimale : README, docs/PROJECT_BRIEF.md, docs/NEXT_STEPS.md. Le site doit rester independant du CRM en V1.
- Modifications : `amsclaw/PROJECTS_INDEX.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/README.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/PROJECT_BRIEF.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/NEXT_STEPS.md`, `memory/active-projects.md`, `memory/decisions.md`.
- Prochaine action : cadrer le perimetre V1 du site avec Ams (pages, contenu, hebergement).

## 2026-06-20 - Site web GS Aime Cesaire TKB - Plaquette recue

- Contexte : Ams envoie la plaquette de l'ecole et demande d'utiliser le meme logo que celui du CRM.
- Decision : conserver la plaquette comme source principale de contenu pour la Phase 2 - Mini spec, et reprendre le logo transparent deja utilise dans le CRM.
- Fichiers sources : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/data/plaquette-ecole.pdf`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/src/assets/logo-ecole-aime-cesaire-transparent.png`.
- Document cree : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_PLAQUETTE.md`.
- Elements extraits : ecole franco-guineenne a Samatra, maternelle/primaire/college, 370 eleves, mission d'egalite des chances, cadre propre et securise, priorites francais/mathematiques/informatique, partenariats France Volontaires, La Guilde, Le Bouquin Volant et Service Civique.
- Points a confirmer avant publication : telephone officiel, adresse precise, WhatsApp, droits d'usage des photos, procedure d'admission.

## 2026-06-20 - Workspace amsClaw - Sas de depot fichiers

- Contexte : Ams demande un dossier commun pour deposer des fichiers exploitables par amsClaw sur tous les projets, avec nettoyage apres recuperation.
- Decision : creer `amsclaw/inbox/` comme sas temporaire commun, avec sous-dossiers optionnels par projet, par exemple `amsclaw/inbox/site-web-gs-aime-cesaire-tkb/`.
- Regle : apres copie verifiee dans le bon dossier projet, amsClaw peut supprimer uniquement le fichier original situe dans `amsclaw/inbox/`.
- Garde-fou : aucune suppression hors `amsclaw/inbox/` sans confirmation explicite d'Ams ; demander confirmation si le projet cible est ambigu.
- Documentation : `amsclaw/inbox/README.md`, `amsclaw/PROJECTS_GUIDE.md`, `amsclaw/PROJECTS_INDEX.md`.
- Proposition Skill Workshop : `project-file-inbox-20260620-27dc370116` creee en attente d'application.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Lecture Facebook limitee

- Contexte : Ams indique que la presence en ligne actuelle de l'ecole repose uniquement sur une page Facebook et fournit le lien `https://www.facebook.com/share/1CvNrkTWhy/?mibextid=wwXIfr`.
- Resultat : le lien redirige vers un profil public Facebook ID `100084445643251`, nom affiche `EcoleAime Cesaire`.
- Limite : sans connexion Facebook, les publications, photos, contacts detailles, adresse, horaires et description ne sont pas lisibles par acces automatise.
- Decision : documenter cette source limitee dans `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_FACEBOOK.md` et prevoir l'ajout d'un lien Facebook dans la mini-spec si Ams confirme que c'est la page officielle a afficher.
- Garde-fou : ne pas reprendre de photos Facebook sans confirmation des droits d'usage.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Lecture Facebook connectee partielle

- Contexte : Ams autorise la lecture de la page Facebook via la session locale.
- Resultat : Safari connecte permet de lire partiellement la page/profil `EcoleAime Cesaire`.
- Elements recuperes : profil Facebook ID `100084445643251`, profil non verifie, onglets A propos / Ami(e)s / Photos / Reels / Lieux / Evenements / Avis donnes, environ 250 ami(e)s, lien Messenger, localisation mentionnee `Samatra T8 Nord`, publication sur la 3e edition du concours de lecture et de mathematiques ayant eu lieu le 3 avril 2026.
- Decision : enrichir `docs/SOURCE_FACEBOOK.md` avec ces elements, en conservant la plaquette comme source principale pour la mini-spec.
- Garde-fou : ne pas reprendre automatiquement les photos ni les noms de personnes taguees ; demander validation d'Ams avant reutilisation dans le site.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Photos inbox recues

- Contexte : Ams depose des photos dans `amsclaw/inbox/site-web-gs-aime-cesaire-tkb/`.
- Action : 8 photos JPEG copiees dans `amsclaw/projects/site-web-gs-aime-cesaire-tkb/data/photos-source/inbox-2026-06-20/`, copie verifiee, puis originaux supprimes uniquement du sas inbox conformement a la regle convenue.
- Document cree : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/SOURCE_PHOTOS.md`.
- Contenu : entree principale, salle maternelle, cour, activites, salle informatique, bibliotheque, affiche ancienne de rentree 2023-2024.
- Points de vigilance : confirmer droits d'usage photo, eviter les cadrages centres sur les enfants sans autorisation, confirmer les coordonnees car l'affiche ancienne et la plaquette affichent des emails/numeros differents.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Besoin enrichi

- Contexte : Ams demande de mettre a jour le besoin avec les nouvelles informations recoltees et de clarifier le document a valider.
- Action : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/IDEE.md` mis a jour avec les elements issus de la plaquette, de Facebook et des photos source.
- Cadrage confirme : site vitrine statique, source principale plaquette, Facebook source secondaire, photos utilisables apres validation des droits et des cadrages.
- Points a valider par Ams avant Phase 2 : probleme, cible, resultat minimum utile, perimetre V1, sources retenues, et points a confirmer (coordonnees, adresse, droits photo, admissions).

## 2026-06-20 - Site web GS Aime Cesaire TKB - Confirmations Ams avant mini-spec

- Contexte : Ams confirme plusieurs informations qui etaient ouvertes dans `docs/IDEE.md`.
- Confirmations : nom exact `Groupe Scolaire Aime Cesaire TKB`, adresse `Samatra T8 Nord`, email officiel `aimecesairetkb@gmail.com`, telephone/WhatsApp provisoire `+224 60 xx xx xx xx`, droit d'usage des photos confirme.
- Decision : prevoir une localisation Google Maps sur la page contact.
- Garde-fou : le site ne sera pas mis en production tant que le telephone officiel definitif n'est pas confirme ; le placeholder reste acceptable pour cadrage et prototype.
- Modifications : `docs/IDEE.md`, `docs/SOURCE_PLAQUETTE.md`, `docs/SOURCE_PHOTOS.md`, `docs/NEXT_STEPS.md`, `memory/active-projects.md`, `memory/decisions.md`.

## 2026-06-20 - Site web GS Aime Cesaire TKB - IDEE validee et mini-spec creee

- Contexte : Ams valide `docs/IDEE.md`.
- Decision : clore la Phase 1 - Idee et lancer la Phase 2 - Mini spec.
- Document cree : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/MINI_SPEC.md`.
- Contenu : objectif UX, pages V1, contenus par page, contact, Google Maps, medias, SEO minimum, contraintes, criteres d'acceptation et points a valider.
- Prochaine action : Ams valide `docs/MINI_SPEC.md`, puis amsClaw produit `docs/PLAN_DEV.md`.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Mini-spec validee et plan dev cree

- Contexte : Ams valide `docs/MINI_SPEC.md`.
- Decision : clore la Phase 2 - Mini spec et lancer la Phase 3 - Plan dev.
- Document cree : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/PLAN_DEV.md`.
- Choix technique recommande : site statique HTML/CSS/JS sans framework, 4 pages HTML, photos optimisees dans `src/assets/photos/`, liens directs email/Facebook/Messenger/Google Maps.
- Garde-fou : pas de formulaire backend ni mise en production tant que le telephone officiel n'est pas confirme.
- Prochaine action : Ams valide `docs/PLAN_DEV.md`, puis amsClaw lance le developpement.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Index projet synchronise Phase 3

- Contexte : apres validation de `docs/MINI_SPEC.md`, l'index global pointait encore vers l'ancienne prochaine action de Phase 2.
- Action : mise a jour de `amsclaw/PROJECTS_INDEX.md` avec le statut Phase 3, la prochaine action `docs/PLAN_DEV.md` et la liste complete des documents source.
- Prochaine action : Ams valide `docs/PLAN_DEV.md`, puis amsClaw lance le developpement du site statique.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Carte Google Maps integree

- Contexte : Ams precise vouloir un petit carre d'affichage Google Maps sur la page contact, pas seulement un lien externe.
- Decision : prevoir une carte Google Maps integree compacte sur `contact.html`, avec un lien `Ouvrir dans Google Maps` en secours.
- Garde-fou : utiliser une carte basee sur une recherche publique et ne pas inventer de coordonnees GPS si la localisation exacte n'est pas confirmee.
- Modifications : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/MINI_SPEC.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/PLAN_DEV.md`, `memory/decisions.md`.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Plan dev valide

- Contexte : Ams valide `docs/PLAN_DEV.md`.
- Decision : clore la Phase 3 - Plan dev et lancer la Phase 4 - Developpement.
- Garde-fou : le telephone, l'eventuel WhatsApp et l'adresse exacte complete seront mis a jour plus tard ; pas de mise en production avant confirmation de ces informations.
- Modifications : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/PLAN_DEV.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/NEXT_STEPS.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/README.md`, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, `memory/decisions.md`.
- Prochaine action : optimiser les photos, creer les 4 pages HTML/CSS/JS, tester localement et produire `docs/CAHIER_RECETTE_LIGHT.md`.

## 2026-06-20 - Site web GS Aime Cesaire TKB - V1 locale creee

- Contexte : apres validation du plan dev, amsClaw lance le developpement de la V1 statique locale.
- Livrables : `src/index.html`, `src/notre-ecole.html`, `src/admissions.html`, `src/contact.html`, `src/assets/css/styles.css`, `src/assets/js/main.js`, photos optimisees dans `src/assets/photos/`, `src/README_SITE.md`.
- Recette : tests HTTP locaux OK sur les 4 pages via serveur temporaire `127.0.0.1:8127`, CSS/JS/images accessibles, `docs/CAHIER_RECETTE_LIGHT.md` produit.
- Limite : controle visuel Playwright non realise car Playwright n'est pas installe dans le workspace.
- Garde-fou : ne pas mettre en production avant validation du telephone officiel definitif, du WhatsApp eventuel et de l'adresse exacte complete.
- Modifications : `amsclaw/projects/site-web-gs-aime-cesaire-tkb/src/`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/CAHIER_RECETTE_LIGHT.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/docs/NEXT_STEPS.md`, `amsclaw/projects/site-web-gs-aime-cesaire-tkb/README.md`, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, `memory/decisions.md`.
- Prochaine action : Ams ouvre la V1 locale, relit les pages et valide ou liste les ajustements de recette.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Numeros de telephone confirmes

- Contexte : Ams fournit les numeros de telephone de l'ecole : `+224 628 780 205` et `+224 614 639 274`.
- Decision : remplacer le placeholder `+224 60 xx xx xx xx` par les deux numeros confirmes et les afficher comme telephones simples tant que l'usage WhatsApp n'est pas precise.
- Garde-fou : l'adresse exacte complete, les coordonnees GPS et l'eventuel WhatsApp restent a confirmer avant mise en production.
- Modifications : site `src/contact.html`, `src/admissions.html`, documents projet, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, `memory/decisions.md`.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Localisation Google Maps confirmee

- Contexte : Ams fournit le lien Google Maps `https://maps.app.goo.gl/xNSVErC1EoUhQYqr9`.
- Verification : le lien court redirige vers une recherche Google Maps aux coordonnees `9.675889, -13.542859`.
- Decision : utiliser ces coordonnees pour la carte integree de `contact.html` et conserver le lien court comme bouton `Ouvrir dans Google Maps`.
- Garde-fou : verifier visuellement pendant la recette que la carte affiche bien l'emplacement attendu.
- Modifications : `src/contact.html`, `src/admissions.html`, `src/README_SITE.md`, documents projet, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, `memory/decisions.md`.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Publication GitHub Pages de test

- Contexte : Ams demande de pousser le site sur GitHub pour test et de fournir le lien.
- Decision : creer un depot GitHub separe contenant uniquement le site statique `src/`, afin de ne pas publier tout le workspace OpenClaw.
- Depot : https://github.com/amsClaw/site-web-gs-aime-cesaire-tkb
- URL de test : https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/
- Verification : depot pousse sur `main`, GitHub Pages active depuis `/`, build termine avec succes, URL testee en HTTP 200.
- Modifications : depot Git local initialise dans `src/`, publication GitHub, `README.md`, `docs/NEXT_STEPS.md`, `docs/CAHIER_RECETTE_LIGHT.md`, `amsclaw/PROJECTS_INDEX.md`, `memory/active-projects.md`, `memory/decisions.md`.

## 2026-06-20 - Site web GS Aime Cesaire TKB - Retours recette hero logo Facebook traites

- Contexte : Ams remonte trois corrections sur la version GitHub Pages : hero desktop trop haut, logo trop petit/peu lisible, lien Facebook sans logo bleu officiel.
- Corrections : hauteur et padding du hero desktop reduits, logo d'en-tete agrandi avec fond blanc, ajout de `assets/facebook-blue.svg`, liens Facebook enrichis avec l'icone bleue.
- Verification : tests locaux HTTP OK, asset Facebook accessible, commit `4f41a54` pousse sur `main`, build GitHub Pages termine avec succes.
- URL de test : https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/
- Modifications : `src/assets/css/styles.css`, `src/assets/facebook-blue.svg`, `src/index.html`, `src/notre-ecole.html`, `src/admissions.html`, `src/contact.html`, `docs/CAHIER_RECETTE_LIGHT.md`, `memory/decisions.md`.

## 2026-06-20 - CRM ecole : V1.1 cinq evolutions livrees

- Contexte : V1 stable validee utilisateurs, pas de nouveaux retours, on continue sur les 5 evolutions V1.1 conformes PRD : import enrichi, dashboard enrichi, verification scolarite, archivage avec motif, commentaires edit/archive.
- Fichiers : `scripts/server.js`, `src/app.js`, `tests/e2e.mjs`, `reports/v1-1-cinq-evolutions-2026-06-20.md`.
- Tests : npm test OK.
