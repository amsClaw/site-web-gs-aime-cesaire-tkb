# Product Requirements Document
## Copilote Merchandising pour Shopify

**Version 2.0 — Décembre 2024**

---

# 1. Vue d'ensemble

## 1.1 Résumé exécutif

Un copilote merchandising pour boutiques mode Shopify qui cartographie le catalogue, détecte les trous, doublons et orphelins, et prépare des actions concrètes (collections, promos, nettoyages) à partir d'ensembles de produits intelligents.

## 1.2 Problème adressé

Les marques DTC mode sur Shopify font face à plusieurs défis majeurs :

- **Catalogue illisible au-delà de 500 SKU** : l'admin Shopify + Excel deviennent ingérables
- **Collections impossibles à maintenir** : orphelins, doublons, structures incohérentes
- **Promos peu intelligentes** : décisions à l'intuition, pas de simulation d'impact
- **Fiches produits incomplètes mais en ligne** : qualité de données dégradée
- **Aucun outil merch dédié** : la majorité des PME n'ont que Shopify + fichiers bricolés

## 1.3 Solution proposée

Une plateforme SaaS qui introduit une **vision par ensembles** au cœur de l'expérience : croiser, combiner et exclure des groupes de produits selon des critères métier (catégories, tags, prix, stock, ventes). Cette approche mathématique mais intuitive permet de raisonner en termes de « Robes en promo avec stock » ou « Produits orphelins » plutôt qu'en listes infinies.

## 1.4 Utilisateurs cibles

**Segment principal** : marques mode/RTW sur Shopify avec 500 à 5 000 SKU et un CA annuel de 0,5 à 5 M€, gérées par 1 à 3 personnes (e-com managers, fondateurs DTC).

**Extension future** : autres verticaux retail (beauté, déco).

## 1.5 Proposition de valeur unique

> *« Le premier copilote merchandising pour Shopify qui pense en ensembles, pas en listes de produits : voyez votre catalogue comme une carte, détectez les trous, préparez des actions concrètes, sans casser votre Shopify. »*

## 1.6 Vision long terme

Devenir l'outil standard de pilotage catalogue et merchandising pour les marques mode sur Shopify (puis d'autres plateformes). À maturité, le produit devient le **cerveau merchandising** branché sur Shopify : Shopify exécute, nous décidons.

---

# 2. Fonctionnalités principales

## 2.1 Carte du catalogue

**Description** : Visualisation interactive de la répartition du catalogue selon plusieurs dimensions (catégories, couleurs, tailles, prix, états de stock).

**Importance** : Permet en 30 secondes de comprendre la structure réelle du catalogue et d'identifier visuellement les déséquilibres.

**Fonctionnement** : Treemaps, barres empilées et matrices croisant les attributs. Un clic sur un bloc crée automatiquement un ensemble de travail.

## 2.2 Builder d'ensembles

**Description** : Interface permettant de créer des ensembles de produits par opérations logiques : croiser (intersection), combiner (union), exclure (différence).

**Importance** : Cœur différenciant du produit — remplace la pensée « liste » par une pensée « ensembles » plus puissante et proche du métier merchandising.

**Fonctionnement** : Sélection de filtres (catégorie, tags, prix, stock, ventes, rotation) et opérateurs logiques. Prévisualisation en temps réel du nombre de produits et aperçu des premiers items.

## 2.3 Rapports d'optimisation des collections

**Description** : Analyse automatique de la structure des collections Shopify pour détecter les anomalies.

**Importance** : Résout le problème récurrent des collections mal organisées qui dégradent la navigation et le SEO.

**Détections** : Produits orphelins (sans collection principale), produits dans trop de collections, collections quasi vides, collections redondantes.

## 2.4 Rapports de préparation des promos

**Description** : Identification automatique des produits candidats à la promotion ou au nettoyage.

**Importance** : Transforme les décisions promos de l'intuition vers le data-driven.

**Détections** : Surstocks, rotation faible, dormants (pas de vente depuis X jours), risques de frustration (tailles manquantes sur produits populaires).

## 2.5 Playground prix et promos (V2)

**Description** : Simulateur d'impact permettant de tester des scénarios de réduction sur un ensemble avant application.

**Importance** : Évite les erreurs coûteuses et permet d'optimiser les marges.

**Fonctionnement** : Sélection d'un ensemble, application d'un pourcentage de réduction, estimation du CA, de la marge et du pourcentage du catalogue impacté.

## 2.6 Copilote en langage naturel (V2)

**Description** : Interface conversationnelle permettant de créer des ensembles par requêtes texte.

**Exemple** : « Trouve-moi les robes de soirée en promo avec beaucoup de stock mais qui ne se vendent pas » génère automatiquement l'ensemble correspondant.

## 2.7 Exports et actions

**Description** : Génération de fichiers CSV et vues checklist pour action dans Shopify.

**Types d'exports** : Listes « à corriger », « à remiser », « à supprimer », « à booster ». Format compatible import Shopify.

---

# 3. Règles métier et détections

## 3.1 Tableau des règles métier clés

| Règle | Définition | Variables | Valeur par défaut | Paramétrable | Phase |
|-------|------------|-----------|-------------------|--------------|-------|
| **Surstock** | Produit dont le stock dépasse un seuil absolu ou relatif à la rotation | `seuil_stock_min` (unités), `ratio_stock_rotation` (mois de stock) | ≥50 unités OU >6 mois de stock | ✅ Oui | MVP |
| **Dormant** | Produit sans aucune vente sur une période glissante | `jours_sans_vente` | 90 jours | ✅ Oui | MVP |
| **Slow mover** | Produit avec une rotation inférieure à un seuil | `ventes_min_periode`, `periode_jours` | <3 ventes sur 30 jours | ✅ Oui | Phase 2 |
| **Bestseller** | Produit dans le top X% des ventes sur une période | `percentile_top`, `periode_jours` | Top 10% sur 30 jours | ✅ Oui | MVP |
| **Frustration taille** | Bestseller avec rupture sur ≥1 taille courante | `tailles_courantes[]`, `seuil_bestseller` | S, M, L + top 20% ventes | ✅ Oui | Phase 2 |
| **Orphelin collection** | Produit n'appartenant à aucune collection manuelle | — | Aucune collection manuelle | ❌ Non | MVP |
| **Multi-collection** | Produit présent dans plus de X collections | `max_collections` | >5 collections | ✅ Oui | MVP |
| **Collection vide** | Collection contenant moins de X produits actifs | `min_produits` | <3 produits | ✅ Oui | MVP |
| **Collection quasi-dupliquée** | Deux collections partageant >X% de produits | `seuil_overlap_pct` | >80% de recouvrement | ✅ Oui | Phase 2 |
| **Prix incohérent** | Écart anormal entre prix et compare_at_price | `ecart_max_pct`, `ecart_min_pct` | Réduction <5% ou >70% | ✅ Oui | Phase 2 |
| **Fiche incomplète** | Produit sans image, description, ou attributs clés | `champs_requis[]` | Image + description + catégorie | ✅ Oui (champs) | MVP |
| **Nouveau sans traction** | Produit créé récemment avec 0 vente | `jours_depuis_creation`, `ventes_min` | Créé il y a >14 jours, 0 vente | ✅ Oui | Phase 2 |

## 3.2 Notes sur les règles

**Fenêtres temporelles** : Toutes les règles basées sur les ventes utilisent des fenêtres glissantes calculées quotidiennement. La granularité minimale est le jour.

**Combinaison de règles** : Les règles peuvent être combinées via le builder d'ensembles. Exemple : `Surstock ∩ Dormant` = produits à remiser en priorité.

**Évolution des seuils** : En Phase 3, les seuils par défaut pourront être suggérés par l'IA en fonction du vertical et de la taille du catalogue.

---

# 4. Expérience utilisateur

## 4.1 Personas

### Persona 1 : Marie, E-commerce Manager

- 32 ans, marque mode DTC, 2 500 SKU, CA 2 M€
- Gère seule l'e-commerce, débordée par les tâches opérationnelles
- **Douleur** : « Je passe des heures dans Excel avant chaque soldes »
- **Attente** : gagner du temps, avoir confiance dans ses décisions promos

### Persona 2 : Thomas, Fondateur DTC

- 28 ans, marque créée il y a 3 ans, 800 SKU, CA 800 K€
- Touche-à-tout, peu de temps pour l'analytique
- **Douleur** : « J'ai l'impression qu'on rate de l'argent mais je ne sais pas où »
- **Attente** : vue claire et actionnable sans courbe d'apprentissage

## 4.2 Parcours utilisateur principal

### Étape 1 : Onboarding (J0)

- Installation depuis Shopify App Store en 2 clics
- Synchronisation automatique du catalogue (background)
- Tutoriel interactif : « Découvrez la pensée par ensembles » avec 2-3 scénarios pré-configurés

### Étape 2 : Découverte (J0-J7)

- Exploration de la carte du catalogue
- Consultation des rapports automatiques (collections, promos)
- **Moment « aha »** : découverte de problèmes insoupçonnés (orphelins, surstocks)

### Étape 3 : Activation (J7-J30)

- Création du premier ensemble personnalisé
- Export CSV et action dans Shopify
- Première opération préparée via l'outil (nettoyage collections ou promo ciblée)

### Étape 4 : Usage récurrent (mensuel)

- Préparation des temps forts (nouvelle saison, soldes, Black Friday)
- Monitoring régulier de la santé du catalogue
- Rapports pour la direction / reporting interne

## 4.3 Principes UX

- **Langage métier** : vocabulaire merchandising (croiser, exclure, orphelins), pas de notation mathématique (∩, ∪)
- **Actionnable first** : chaque écran mène à une action concrète (export, checklist, modification)
- **Progressive disclosure** : fonctionnalités avancées masquées par défaut
- **Recettes prêtes à l'emploi** : templates d'ensembles pour démarrer vite
- **Sécurité perçue** : aucune action automatique sur Shopify sans validation explicite

---

# 5. Scénarios UX détaillés (Happy Paths)

## 5.1 Scénario A : Préparer les soldes d'été

### Contexte
Marie, e-com manager, doit préparer les soldes d'été. Elle a 2 500 SKU et 3 heures devant elle pour identifier les produits à solder et définir les niveaux de réduction.

### Parcours détaillé

| Étape | Écran | Action utilisateur | Réponse système | Durée |
|-------|-------|-------------------|-----------------|-------|
| 1 | Dashboard | Clic sur « Préparer une promo » | Affiche le wizard de préparation promo | 5s |
| 2 | Wizard étape 1 | Sélectionne « Soldes saisonnières » | Pré-charge le template avec filtres recommandés | 3s |
| 3 | Builder d'ensembles | Visualise l'ensemble « Candidats soldes » pré-configuré (Surstocks ∪ Dormants ∪ Slow movers) | Affiche 342 produits correspondants | 2s |
| 4 | Builder d'ensembles | Affine : exclut la catégorie « Nouveautés SS25 » | Recalcule : 287 produits | 1s |
| 5 | Builder d'ensembles | Affine : filtre prix > 50€ (pour protéger les marges petits prix) | Recalcule : 156 produits | 1s |
| 6 | Liste produits | Parcourt la liste, aperçu des 20 premiers | Affiche photo, titre, stock, dernière vente, prix | — |
| 7 | Liste produits | Clic « Segmenter par priorité » | Propose 3 sous-ensembles : Priorité 1 (dormants >180j), Priorité 2 (surstocks >6 mois), Priorité 3 (slow movers) | 2s |
| 8 | Playground promos | Sélectionne Priorité 1 (43 produits), applique -50% | Affiche simulation : CA potentiel 12 400€, marge résiduelle 18%, 1.7% du catalogue | 3s |
| 9 | Playground promos | Sélectionne Priorité 2 (67 produits), applique -30% | Affiche simulation : CA potentiel 28 600€, marge résiduelle 32%, 2.7% du catalogue | 3s |
| 10 | Playground promos | Sélectionne Priorité 3 (46 produits), applique -20% | Affiche simulation : CA potentiel 9 200€, marge résiduelle 41%, 1.8% du catalogue | 3s |
| 11 | Récap | Valide le plan global | Affiche récapitulatif : 156 produits, 3 paliers, CA estimé 50 200€ | — |
| 12 | Export | Clic « Exporter pour Shopify » | Génère 3 fichiers CSV (un par palier) avec colonnes : SKU, Handle, Nouveau prix, Compare at price | 5s |
| 13 | Export | Télécharge le ZIP | Fichier `soldes-ete-2025.zip` contenant les 3 CSV | 2s |

### Sorties générées

**Fichier CSV (exemple Priorité 1)** :
```csv
handle,variant_sku,price,compare_at_price,tags
robe-fleurie-marguerite,RFM-S-BLEU,49.50,99.00,soldes-ete-2025;priorite-1
robe-fleurie-marguerite,RFM-M-BLEU,49.50,99.00,soldes-ete-2025;priorite-1
...
```

### Impact côté Shopify

L'utilisateur importe manuellement les CSV dans Shopify via :
1. **Produits > Importer** : mise à jour des prix
2. **Bulk editor** : ajout des tags pour créer une collection automatique « Soldes été 2025 »

⚠️ **Aucune action automatique** : l'app ne modifie jamais Shopify directement. L'utilisateur garde le contrôle total.

### Temps total estimé : 45 minutes
(vs. 3-4 heures en méthode Excel traditionnelle)

---

## 5.2 Scénario B : Nettoyer les collections avant nouvelle saison

### Contexte
Thomas, fondateur, veut faire le ménage dans ses collections avant le lancement de la collection Automne-Hiver. Il a 47 collections et sent que c'est « le bazar ».

### Parcours détaillé

| Étape | Écran | Action utilisateur | Réponse système | Durée |
|-------|-------|-------------------|-----------------|-------|
| 1 | Dashboard | Clic sur carte « Santé des collections » | Affiche le rapport Collections avec score global : 62/100 | 3s |
| 2 | Rapport Collections | Visualise les 4 catégories de problèmes | Affiche : 23 orphelins, 8 collections vides, 12 produits multi-collections, 3 paires quasi-dupliquées | — |
| 3 | Rapport Collections | Clic sur « Collections vides » | Liste les 8 collections avec <3 produits | 1s |
| 4 | Détail collections vides | Parcourt la liste | Affiche pour chaque : nom, nb produits, date création, dernière modif | — |
| 5 | Détail collections vides | Sélectionne 5 collections à supprimer | Cases cochées, bouton « Créer checklist » activé | — |
| 6 | Checklist | Clic « Créer checklist » | Génère une checklist « Collections à supprimer » avec liens directs Shopify | 2s |
| 7 | Rapport Collections | Retour, clic sur « Produits orphelins » | Liste les 23 produits sans collection | 1s |
| 8 | Détail orphelins | Trie par « Ventes 30j » décroissant | 5 orphelins ont des ventes → problème de catégorisation | 1s |
| 9 | Détail orphelins | Sélectionne les 5 orphelins vendeurs | Affiche le détail avec catégorie suggérée (basée sur tags/titre) | — |
| 10 | Détail orphelins | Clic « Exporter avec suggestions » | Génère CSV avec colonnes : Handle, Titre, Collection suggérée | 2s |
| 11 | Détail orphelins | Sélectionne les 18 orphelins sans vente | Affiche option « Marquer comme candidats archivage » | — |
| 12 | Détail orphelins | Clic « Exporter candidats archivage » | Génère CSV pour passage en brouillon | 2s |
| 13 | Rapport Collections | Clic sur « Collections quasi-dupliquées » | Affiche les 3 paires avec % de recouvrement | 1s |
| 14 | Détail doublons | Examine paire « Robes été » / « Robes légères » (87% overlap) | Affiche diagramme de Venn simplifié + liste des produits en commun/exclusifs | 3s |
| 15 | Détail doublons | Décide de fusionner → clic « Créer plan de fusion » | Génère recommandation : garder « Robes été », ajouter 4 produits exclusifs de « Robes légères », supprimer « Robes légères » | 2s |
| 16 | Export final | Clic « Télécharger le plan de nettoyage » | ZIP contenant : checklist-suppressions.pdf, orphelins-a-categoriser.csv, orphelins-a-archiver.csv, plan-fusion-robes.pdf | 5s |

### Sorties générées

**1. Checklist suppressions (PDF)** :
```
☐ Supprimer collection "Test hiver 2023" (0 produits) → [Lien Shopify]
☐ Supprimer collection "Archive soldes" (1 produit) → [Lien Shopify]
☐ Supprimer collection "À trier" (2 produits) → [Lien Shopify]
...
```

**2. CSV orphelins à catégoriser** :
```csv
handle,title,suggested_collection,confidence
top-marguerite,Top Marguerite brodé,Tops été,high
jupe-plissee-marine,Jupe plissée marine,Jupes,medium
...
```

**3. CSV orphelins à archiver** :
```csv
handle,title,last_sale,stock,action
chemise-lin-2022,Chemise lin oversize,2023-04-12,3,draft
robe-noel-promo,Robe soirée Noël,2023-12-28,1,draft
...
```

**4. Plan de fusion (PDF)** :
```
FUSION RECOMMANDÉE : "Robes été" + "Robes légères"

Collection à conserver : Robes été (34 produits)
Collection à supprimer : Robes légères (29 produits)
Recouvrement : 87% (25 produits en commun)

Actions :
1. Ajouter à "Robes été" : [4 produits listés avec handles]
2. Supprimer "Robes légères"

Impact : -1 collection, 0 produit perdu
```

### Impact côté Shopify

Actions manuelles de l'utilisateur :
1. Suppression des 5 collections vides via l'admin
2. Ajout des 5 orphelins vendeurs dans leurs collections respectives
3. Passage en brouillon des 18 orphelins sans vente
4. Fusion des collections dupliquées

### Temps total estimé : 30 minutes
(vs. 2-3 heures d'audit manuel collection par collection)

---

# 6. Architecture : exigences et contraintes

## 6.1 Exigences de performance

| Métrique | Cible | Contexte |
|----------|-------|----------|
| Temps de calcul d'un ensemble | <3 secondes | Pour 90% des requêtes, catalogue jusqu'à 10 000 SKU |
| Affichage carte du catalogue | <5 secondes | Après chargement initial de la page |
| Synchronisation initiale | <10 minutes | Catalogue de 5 000 produits |
| Synchronisation incrémentale | <30 secondes | Après webhook Shopify |
| Génération d'un rapport | <10 secondes | Rapport complet collections ou promos |
| Export CSV | <5 secondes | Jusqu'à 1 000 produits |
| Disponibilité | 99.5% | Moyenne mensuelle |

## 6.2 Exigences de capacité

| Dimension | Minimum supporté | Cible Phase 2 |
|-----------|------------------|---------------|
| Taille catalogue par boutique | 10 000 SKU | 50 000 SKU |
| Nombre de variants par produit | 100 | 250 |
| Nombre de collections par boutique | 500 | 1 000 |
| Nombre d'ensembles sauvegardés par boutique | 50 | 200 |
| Profondeur d'historique des ventes | 12 mois | 24 mois |
| Nombre de boutiques simultanées | 100 | 1 000 |

## 6.3 Exigences de sécurité et conformité

- **Authentification** : OAuth 2.0 exclusivement via Shopify (pas de login/password propre en V1)
- **Données** : ne jamais stocker les tokens Shopify en clair
- **RGPD** : aucune donnée client final stockée (uniquement données catalogue et agrégats de ventes)
- **Isolation** : les données d'une boutique ne doivent jamais être accessibles à une autre
- **Audit trail** : journaliser toutes les actions d'export (qui, quand, quoi)

## 6.4 Exigences d'intégration Shopify

- **API utilisée** : Admin API (GraphQL privilégié pour la flexibilité)
- **Scopes requis** : `read_products`, `read_inventory`, `read_orders` (pour les ventes), `read_collections`
- **Rate limiting** : respecter les limites Shopify sans dégradation perceptible pour l'utilisateur
- **Webhooks obligatoires** : `products/create`, `products/update`, `products/delete`, `inventory_levels/update`
- **Compatibilité** : Shopify stores sur tous les plans (Basic, Shopify, Advanced, Plus)

## 6.5 Exigences UX

- **Mobile** : l'app doit être utilisable (consultation) sur tablette, pas nécessairement optimisée mobile phone
- **Accessibilité** : niveau AA minimum (contraste, navigation clavier)
- **Internationalisation** : français et anglais en V1, architecture prête pour d'autres langues
- **Offline** : non requis (toujours connecté)

## 6.6 Contraintes techniques laissées ouvertes

Les choix suivants sont **délégués à l'équipe technique** et ne font pas partie du PRD :

- Architecture monolithique vs microservices
- Langage backend (Node.js, Python, Go, etc.)
- Base de données spécifique (PostgreSQL, MySQL, MongoDB, etc.)
- Framework frontend (React, Vue, Svelte, etc.)
- Hébergement (AWS, GCP, Vercel, Railway, etc.)
- Stratégie de cache (Redis, Memcached, in-memory, etc.)

---

# 7. Décisions structurantes ouvertes

Les questions suivantes doivent être tranchées **avant le début du développement**. Chaque décision a un impact significatif sur l'architecture, le coût ou le time-to-market.

## 7.1 Décisions techniques

| Question | Options | Critères de décision | Deadline |
|----------|---------|---------------------|----------|
| **Runtime backend** | Node.js (TypeScript) vs Python (FastAPI) vs Go | Compétences équipe, écosystème libs data, performance | Avant sprint 1 |
| **Granularité des données de vente** | Agrégats quotidiens vs données commande par commande | Coût stockage, précision des règles, complexité sync | Avant sprint 1 |
| **Billing** | Shopify Billing API vs Stripe | Simplicité (Shopify) vs flexibilité (Stripe), commission App Store | Avant Phase 2 |
| **Multi-tenancy** | Schema par tenant vs row-level security vs DB par tenant | Coût infra, isolation, complexité opérationnelle | Avant sprint 1 |

## 7.2 Décisions produit

| Question | Options | Critères de décision | Deadline |
|----------|---------|---------------------|----------|
| **Scope MVP : rapports inclus** | Collections + Promos vs Collections seul | Vélocité vs complétude de la proposition de valeur | Avant sprint 3 |
| **Actions Shopify directes** | Export CSV uniquement vs modifications via API | Risque perçu par l'utilisateur, complexité dev, valeur ajoutée | Avant Phase 2 |
| **Modèle de données ventes** | Via Orders API vs via Analytics API (si dispo) | Exhaustivité, rate limits, données accessibles | Avant sprint 1 |
| **Seuils par défaut** | Fixes vs calculés dynamiquement par boutique | Complexité, pertinence pour petits catalogues | Avant sprint 4 |

## 7.3 Décisions business

| Question | Options | Critères de décision | Deadline |
|----------|---------|---------------------|----------|
| **Pricing V1** | Freemium vs trial payant vs trial gratuit → payant | CAC, conversion, valeur perçue | Avant lancement App Store |
| **Marché initial** | France seule vs France + marchés anglophones | Support, traduction, réglementations | Avant lancement |
| **Engagement agences** | Programme partenaires dès le début vs plus tard | Ressources, channel conflict, accélération | Avant Phase 2 |

---

# 8. Feuille de route développement

## 8.1 Phase 1 : MVP — Fondations

**Objectif** : Valider le concept avec 5-10 design partners. Démontrer la valeur de la vision « ensembles ».

### Scope MVP

#### Infrastructure de base
- Authentification Shopify OAuth complète
- Synchronisation catalogue (products, variants, collections, inventory)
- Gestion des webhooks pour mise à jour temps réel
- Base de données et cache configurés

#### Carte du catalogue (version 1)
- Visualisation treemap par catégorie
- Filtres par prix, stock, date de création
- Clic pour créer un ensemble de travail

#### Builder d'ensembles (version 1)
- Filtres de base : catégorie, tags, prix (min/max), stock (min/max)
- Opérations : intersection (croiser) et différence (exclure)
- Sauvegarde des ensembles créés
- Aperçu en temps réel (compteur + 10 premiers produits)

#### Rapports automatiques (version 1)
- Rapport « Collections » : orphelins, produits multi-collections, collections vides
- Rapport « Promos » : surstocks (>X unités), dormants (0 vente depuis Y jours)

#### Exports
- Export CSV des ensembles
- Vue checklist imprimable

#### Onboarding
- Tutorial interactif (3-5 étapes)
- 2 ensembles pré-configurés (« Orphelins », « Surstocks »)

## 8.2 Phase 2 : Product-Market Fit

**Objectif** : Atteindre le PMF avec une base de 50-100 clients payants. Prouver que l'outil influence des décisions à impact financier mesurable.

### Scope Phase 2

#### Playground prix et promos
- Sélection d'un ensemble existant
- Simulation de réduction (%, montant fixe)
- Calcul d'impact : CA estimé, marge, % catalogue affecté
- Comparaison de scénarios côte à côte

#### Copilote simplifié
- Barre de recherche en langage naturel
- Parsing des requêtes et traduction en filtres
- Suggestions de clarification si requête ambiguë

#### Librairie de recettes merchandising
- 10-15 templates d'ensembles métier
- Catégories : Nettoyage, Prépa soldes, Nouvelle saison, Qualité données
- Application en 1 clic avec paramétrage

#### Améliorations carte et rapports
- Nouvelles dimensions : couleur, taille, vendeur
- Rapport « Frustrations tailles » : bestsellers avec ruptures de taille
- Comparaison temporelle (évolution du catalogue)

#### Multi-boutiques (plan Plus)
- Connexion de plusieurs boutiques Shopify
- Vue consolidée et comparaisons
- Permissions par équipe

#### Système de billing
- Intégration Stripe ou Shopify Billing (selon décision)
- Plans Starter / Growth / Plus
- Gestion trial et upgrades

## 8.3 Phase 3 : Scale — Cerveau merchandising

**Objectif** : Devenir la référence du pilotage merchandising pour les marques mode DTC.

### Scope Phase 3

#### IA avancée
- Modèles prédictifs d'impact promo basés sur historique
- Suggestions proactives (« Il est temps de nettoyer cette collection »)
- Tagging automatique par computer vision (matière, style, occasion)

#### Benchmarking anonymisé
- Comparaison aux pairs du même segment
- Insights type « Top 25% en profondeur tailles, bottom 25% en rotation robes »

#### Écosystème et API
- API publique pour intégrations tierces
- Connecteurs ads (Meta, Google) pour cibler les ensembles
- Webhook pour actions automatisées

#### Extension plateformes
- WooCommerce
- BigCommerce
- Connecteurs ERP/OMS

---

# 9. Chaîne de dépendances logiques

## 9.1 Fondations techniques (semaines 1-3)

Ces éléments doivent être construits en premier car tout le reste en dépend :

1. **Auth Shopify** : OAuth flow, stockage sécurisé des tokens
2. **Sync catalogue** : import initial + webhooks pour updates
3. **Modèle de données** : tables + indexes optimisés
4. **API de base** : CRUD produits/collections/ensembles

## 9.2 Premier livrable visible (semaines 4-6)

Objectif : avoir quelque chose à montrer aux design partners rapidement.

1. **Shell applicatif** : layout, navigation, design system de base
2. **Carte du catalogue V1** : treemap simple par catégorie
3. **Compteurs dashboard** : nombre de produits, collections, variants
4. **Liste produits basique** : avec filtres simples

## 9.3 Moteur d'ensembles (semaines 7-10)

Cœur différenciant du produit, à construire de manière atomique :

1. **Filtre unique** : un filtre → un ensemble (ex: catégorie = Robes)
2. **Filtres combinés** : plusieurs filtres AND (catégorie + prix + stock)
3. **Opération intersection** : croiser deux ensembles existants
4. **Opération exclusion** : ensemble A moins ensemble B
5. **Sauvegarde** : persister les ensembles créés
6. **Templates** : ensembles pré-configurés (orphelins, surstocks)

## 9.4 Rapports et exports (semaines 11-14)

Dépendent du moteur d'ensembles pour générer les données :

- Rapport collections : utilise l'ensemble « orphelins » + « multi-collections »
- Rapport promos : utilise les ensembles « surstocks » + « dormants »
- Export CSV : génération à partir de n'importe quel ensemble
- Vue checklist : mise en forme imprimable des exports

## 9.5 Onboarding et polish (semaines 15-16)

Dernière couche pour rendre le MVP présentable :

- Tutorial interactif : guide les nouveaux utilisateurs
- Empty states : messages et actions suggérées quand pas de données
- Loading states : feedback pendant la sync et les calculs
- Error handling : messages clairs et recovery graceful

## 9.6 Diagramme de dépendances

| Phase | Composant | Dépend de |
|-------|-----------|-----------|
| 1 | Auth Shopify | — |
| 1 | Sync catalogue | Auth |
| 1 | Modèle de données | — |
| 2 | Carte du catalogue | Sync |
| 2 | Shell applicatif | — |
| 3 | Moteur filtres | Sync, Modèle |
| 3 | Opérations ensembles | Moteur filtres |
| 3 | Builder UI | Opérations, Shell |
| 4 | Rapports | Moteur ensembles |
| 4 | Exports | Moteur ensembles |
| 5 | Onboarding | Tout le reste |

---

# 10. Risques et mitigations

## 10.1 Risques techniques

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Rate limits Shopify API | Élevé | Sync incrémentale, cache agressif, queue avec backoff exponentiel |
| Performance sur gros catalogues (>10K SKU) | Moyen | Indexes optimisés, pagination, calculs asynchrones |
| Changements API Shopify | Moyen | Abstraction layer, veille changelog Shopify, tests d'intégration |
| Coût IA croissant (V2) | Moyen | Caching des résultats, features IA dans plans supérieurs, modèles légers |

## 10.2 Risques produit

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Concept « ensembles » trop abstrait | Critique | Onboarding ultra-guidé, recettes prêtes à l'emploi, langage métier pas mathématique |
| Perception « encore un outil de reporting » | Élevé | Focus sur l'actionnable, études de cas chiffrées, témoignages clients |
| Peur de « casser Shopify » | Moyen | Aucune action automatique, exports CSV uniquement, messaging rassurant |
| Time-to-value trop long | Élevé | Rapports automatiques dès J0, ensembles pré-configurés, quick wins immédiats |

## 10.3 Risques business

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Marché trop niche (mode seule) | Moyen | Validation rapide puis extension à d'autres verticaux retail |
| Dépendance à Shopify | Élevé | Architecture découplée, roadmap multi-plateforme prévue en Phase 3 |
| CAC élevé / PMF long | Élevé | PLG via App Store, contenu expert organique, partenariats agences |
| Churn élevé (usage occasionnel) | Élevé | Emails de réengagement, alertes proactives, valeur continue pas ponctuelle |

## 10.4 Définition du MVP minimal

Pour mitiger le risque de sur-engineering, le MVP doit permettre de répondre à cette question :

> ***« Un e-com manager peut-il, en moins de 30 minutes, identifier 20 produits à remiser et exporter cette liste ? »***

Si oui, le MVP est suffisant pour valider l'hypothèse centrale. Tout le reste est nice-to-have pour la V1.

---

# 11. Annexes

## 11.1 Jobs-to-be-done détaillés

### Job principal

> *« Quand mon catalogue Shopify explose en nombre de produits et de collections, je veux voir clairement où sont les trous, les doublons et les surstocks, pour décider quoi mettre en avant, quoi remiser et quoi supprimer sans passer ma vie dans Excel. »*

### Jobs fonctionnels

- Comprendre la répartition réelle du catalogue (catégories, tailles, couleurs, prix, états de stock)
- Identifier les produits orphelins (sans collection principale, fiches incomplètes)
- Repérer les surstocks, dormants, mauvais pricing
- Préparer des listes d'action concrètes : à pousser, à remiser, à nettoyer, à sortir
- Simuler l'impact d'un plan promo avant de le lancer

### Jobs émotionnels

- Se sentir en contrôle du catalogue (et pas subir Shopify)
- Réduire l'angoisse de « j'ai l'impression qu'on rate de l'argent / qu'on frustre des clients »
- Avoir le sentiment de faire un merchandising pro, pas approximatif

## 11.2 Grille tarifaire prévisionnelle

| Plan | Prix/mois | Limites | Fonctionnalités |
|------|-----------|---------|-----------------|
| Starter | 79-99 € | ~500 produits, 0,5 M€ CA | Carte, ensembles simples, rapports basiques, export CSV |
| Growth | 199-249 € | ~5 000 produits, 5 M€ CA | + ensembles avancés, playground promos basique |
| Plus | 399-599 € | >5 000 produits, multi-boutiques | + multi-boutiques, support prioritaire, IA avancée, API |

*Annualisation : -20% pour sécuriser le cash.*

## 11.3 Métriques clés

### North Star Metric

Nombre de boutiques qui, chaque mois, **créent au moins un nouvel ensemble** ET **consultent/exportent au moins un rapport d'action**.

### Métriques secondaires

- MRR et croissance
- Nombre de boutiques actives
- Taux d'activation (1er ensemble créé + 1er rapport lu)
- Rétention 6/12 mois
- Part du catalogue traitée via l'outil
- LTV:CAC ratio (cible >3:1)

### Unit economics cibles

- **ARPU moyen** : 150-200 €/mois
- **Marge brute** : 80-85%
- **Churn mensuel** : <4% (petits comptes), <2% (Growth/Plus)
- **CAC payback** : <12 mois, idéalement 6-9 mois

## 11.4 Capacités IA futures

| Capacité | Valeur ajoutée | Horizon |
|----------|----------------|---------|
| Copilote langage naturel | Création d'ensembles par requête texte | Phase 2 |
| Suggestions d'ensembles | Propose automatiquement surstocks, dormants, frustrations | Phase 2 |
| Détection d'anomalies | Fiches incohérentes, prix aberrants, tailles manquantes | Phase 2 |
| Tagging automatique | Computer vision pour matière, style, occasion | Phase 3 |
| Simulation prédictive | Estimer CA, marge, risque rupture selon scénarios | Phase 3 |

## 11.5 Opportunity scorecard

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Taille marché et timing | 7/10 | Marché Shopify mode important, timing bon, vertical pointu |
| Sévérité du problème | 9/10 | Vrai enfer sur catalogues >500 SKU |
| Fit solution | 8/10 | Vision ensembles colle aux besoins merch |
| Levier IA | 8/10 | Gros potentiel en reco, simulation, copilote |
| Moat potentiel | 7/10 | Data et recettes merch = avantage durable |
| Clarté GTM | 7/10 | App Store + contenu expert = clair |
| Unit economics | 8/10 | ARPU correct, coûts surtout fixes |
| Faisabilité exécution | 7/10 | Tech raisonnable, gros travail UX |
| **SCORE GLOBAL** | **7,5-8/10** | **Très prometteur avec design partners solides** |

---

*— Fin du document —*
