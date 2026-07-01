# Copilote Merchandising Shopify — Document d'Architecture

## Introduction / Préambule

Ce document définit l'architecture technique complète du projet **Copilote Merchandising Shopify**, une application SaaS destinée aux marques mode DTC sur Shopify. Il sert de référence architecturale pour le développement, garantissant la cohérence des choix techniques et des patterns utilisés.

**Relation avec l'Architecture Frontend :**
Ce projet utilise Remix comme framework fullstack, unifiant le backend et le frontend dans une architecture monolithique. Les spécifications UI/UX détaillées sont documentées dans le fichier `front-spec-ux-ui.md` et doivent être utilisées conjointement avec ce document.

**Documents de référence :**
- PRD v2.0 — Décembre 2024
- Spécifications UI/UX v1.0
- Shopify Polaris Design System

---

## Table des Matières

1. [Résumé Technique](#résumé-technique)
2. [Vue d'Ensemble Haut Niveau](#vue-densemble-haut-niveau)
3. [Patterns Architecturaux Adoptés](#patterns-architecturaux-adoptés)
4. [Vue des Composants](#vue-des-composants)
5. [Structure du Projet](#structure-du-projet)
6. [Référence API](#référence-api)
7. [Modèles de Données](#modèles-de-données)
8. [Workflows et Diagrammes de Séquence](#workflows-et-diagrammes-de-séquence)
9. [Stack Technique Définitif](#stack-technique-définitif)
10. [Infrastructure et Déploiement](#infrastructure-et-déploiement)
11. [Stratégie de Gestion des Erreurs](#stratégie-de-gestion-des-erreurs)
12. [Standards de Code](#standards-de-code)
13. [Stratégie de Tests](#stratégie-de-tests)
14. [Bonnes Pratiques de Sécurité](#bonnes-pratiques-de-sécurité)
15. [Journal des Modifications](#journal-des-modifications)

---

## Résumé Technique

Le **Copilote Merchandising Shopify** est une application SaaS embarquée (Shopify App) qui permet aux e-commerce managers de visualiser, analyser et agir sur leur catalogue produits via une approche innovante basée sur la **théorie des ensembles**.

**Architecture globale :** Application monolithique fullstack basée sur Remix, déployée sur l'infrastructure Shopify (ou cloud provider compatible). L'application s'intègre nativement à l'admin Shopify via l'App Bridge et utilise Polaris pour l'interface utilisateur.

**Composants clés :**
- **Sync Engine** : Synchronisation bidirectionnelle avec Shopify via GraphQL Admin API et Webhooks
- **Set Engine** : Moteur de calcul d'ensembles (intersection, union, différence) sur les produits
- **Visualization Layer** : Treemaps et visualisations interactives du catalogue
- **Report Generator** : Génération automatique de rapports (Collections, Promos)
- **Export Engine** : Production de fichiers CSV/PDF compatibles Shopify

**Objectifs de performance (PRD) :**
- Temps de calcul d'un ensemble : < 3 secondes (90% des requêtes, jusqu'à 10 000 SKU)
- Synchronisation initiale : < 10 minutes (5 000 produits)
- Synchronisation incrémentale : < 30 secondes
- Disponibilité : 99.5%

---

## Vue d'Ensemble Haut Niveau

### Style Architectural

**Monolithe Modulaire** déployé comme application Shopify embarquée. Ce choix est justifié par :
- Complexité réduite pour une équipe restreinte (1-3 développeurs)
- Latence minimale entre les modules
- Déploiement simplifié
- Évolution possible vers des microservices en Phase 3

### Structure du Repository

**Monorepo** géré avec npm workspaces, permettant :
- Partage de types TypeScript entre frontend et backend
- Configuration unifiée (ESLint, Prettier, TypeScript)
- CI/CD simplifiée

### Diagramme de Contexte Système (C4 Level 1)

```mermaid
graph TB
    subgraph "Utilisateurs"
        ECM[E-commerce Manager<br/>Marie, Thomas]
    end
    
    subgraph "Copilote Merchandising"
        APP[Application Remix<br/>Shopify Embedded App]
    end
    
    subgraph "Systèmes Externes"
        SHOPIFY[Shopify Platform<br/>Admin API + Webhooks]
        DB[(PostgreSQL<br/>Base de données)]
        CACHE[(Redis<br/>Cache & Sessions)]
        STORAGE[Object Storage<br/>Exports CSV/PDF]
    end
    
    ECM -->|Utilise via Admin Shopify| APP
    APP -->|OAuth 2.0 + GraphQL| SHOPIFY
    APP -->|Lecture/Écriture| DB
    APP -->|Cache requêtes| CACHE
    APP -->|Stocke exports| STORAGE
    SHOPIFY -->|Webhooks| APP
```

### Diagramme de Containers (C4 Level 2)

```mermaid
graph TB
    subgraph "Shopify Admin"
        BRIDGE[App Bridge<br/>Iframe Integration]
    end
    
    subgraph "Copilote Merchandising App"
        subgraph "Frontend Layer"
            REMIX_UI[Remix Routes<br/>React + Polaris]
            TREEMAP[Visualization<br/>D3.js / Recharts]
        end
        
        subgraph "Backend Layer"
            REMIX_SERVER[Remix Server<br/>Node.js Loaders/Actions]
            SYNC[Sync Service<br/>Shopify Data Sync]
            SETS[Set Engine<br/>Ensemble Calculator]
            REPORTS[Report Service<br/>Auto-detection]
            EXPORTS[Export Service<br/>CSV/PDF Generator]
        end
        
        subgraph "Data Layer"
            PRISMA[Prisma ORM<br/>Data Access]
        end
    end
    
    subgraph "Infrastructure"
        PG[(PostgreSQL)]
        REDIS[(Redis)]
        S3[Object Storage]
    end
    
    BRIDGE --> REMIX_UI
    REMIX_UI --> TREEMAP
    REMIX_UI --> REMIX_SERVER
    REMIX_SERVER --> SYNC
    REMIX_SERVER --> SETS
    REMIX_SERVER --> REPORTS
    REMIX_SERVER --> EXPORTS
    SYNC --> PRISMA
    SETS --> PRISMA
    REPORTS --> PRISMA
    EXPORTS --> S3
    PRISMA --> PG
    REMIX_SERVER --> REDIS
```

---

## Patterns Architecturaux Adoptés

### 1. Embedded App Architecture (Shopify)
**Rationale :** Intégration native dans l'admin Shopify via App Bridge, offrant une expérience utilisateur cohérente et un accès simplifié aux données de la boutique.

### 2. Server-Side Rendering (SSR) avec Remix
**Rationale :** Performance optimale, SEO (si applicable), et gestion unifiée des données via loaders/actions. Remix gère nativement le data fetching et les mutations.

### 3. Repository Pattern
**Rationale :** Abstraction de l'accès aux données via Prisma, facilitant les tests et l'évolution du schéma de base de données.

### 4. Service Layer Pattern
**Rationale :** Encapsulation de la logique métier dans des services dédiés (SyncService, SetEngine, ReportService), séparant les préoccupations et facilitant les tests unitaires.

### 5. Event-Driven Updates (Webhooks)
**Rationale :** Synchronisation en temps réel des modifications Shopify via webhooks, évitant le polling et respectant les rate limits.

### 6. CQRS Léger
**Rationale :** Séparation des opérations de lecture (loaders Remix) et d'écriture (actions Remix), optimisant les performances et la clarté du code.

### 7. Cache-Aside Pattern
**Rationale :** Utilisation de Redis pour mettre en cache les résultats de calculs coûteux (ensembles, agrégats), avec invalidation sur webhook.

---

## Vue des Composants

### Architecture des Composants (C4 Level 3)

```mermaid
graph TB
    subgraph "Remix Application"
        subgraph "Routes Layer"
            DASHBOARD[routes/app._index<br/>Dashboard]
            CATALOG[routes/app.catalog<br/>Carte Catalogue]
            BUILDER[routes/app.builder<br/>Builder Ensembles]
            REPORTS[routes/app.reports<br/>Rapports]
            SETTINGS[routes/app.settings<br/>Paramètres]
        end
        
        subgraph "Services Layer"
            SHOP_SVC[ShopifyService<br/>API Communication]
            SYNC_SVC[SyncService<br/>Data Synchronization]
            SET_SVC[SetService<br/>Set Operations]
            REPORT_SVC[ReportService<br/>Report Generation]
            EXPORT_SVC[ExportService<br/>File Generation]
            RULE_SVC[RuleService<br/>Business Rules]
        end
        
        subgraph "Domain Layer"
            PRODUCT[Product<br/>Domain Model]
            COLLECTION[Collection<br/>Domain Model]
            VARIANT[Variant<br/>Domain Model]
            PRODUCTSET[ProductSet<br/>Domain Model]
            RULE[Rule<br/>Domain Model]
        end
        
        subgraph "Infrastructure Layer"
            PRISMA_CLIENT[Prisma Client<br/>Database Access]
            REDIS_CLIENT[Redis Client<br/>Caching]
            SHOPIFY_CLIENT[Shopify Client<br/>GraphQL/REST]
            STORAGE_CLIENT[Storage Client<br/>S3/GCS]
        end
    end
    
    DASHBOARD --> SET_SVC
    DASHBOARD --> REPORT_SVC
    CATALOG --> SET_SVC
    BUILDER --> SET_SVC
    BUILDER --> RULE_SVC
    REPORTS --> REPORT_SVC
    
    SHOP_SVC --> SHOPIFY_CLIENT
    SYNC_SVC --> SHOP_SVC
    SYNC_SVC --> PRISMA_CLIENT
    SET_SVC --> PRISMA_CLIENT
    SET_SVC --> REDIS_CLIENT
    REPORT_SVC --> SET_SVC
    EXPORT_SVC --> STORAGE_CLIENT
```

### Description des Composants

#### Routes Layer (Remix Routes)

| Route | Responsabilité | Loader | Action |
|-------|---------------|--------|--------|
| `app._index` | Dashboard avec KPIs et raccourcis | Charge stats, alertes, dernières syncs | — |
| `app.catalog` | Carte du catalogue (Treemap) | Charge données agrégées par dimension | Créer ensemble depuis sélection |
| `app.builder` | Builder d'ensembles | Charge ensembles existants, filtres | CRUD ensembles, opérations |
| `app.builder.$setId` | Visualisation/édition ensemble | Charge détail ensemble + produits | Modifier, dupliquer, supprimer |
| `app.reports` | Liste des rapports | Charge rapports disponibles | — |
| `app.reports.collections` | Rapport Collections | Charge anomalies collections | Créer checklist |
| `app.reports.promos` | Rapport Promos | Charge candidats promos | Exporter sélection |
| `app.exports` | Historique exports | Charge liste exports | Télécharger, supprimer |
| `app.settings` | Configuration | Charge paramètres boutique | Modifier seuils, préférences |

#### Services Layer

| Service | Responsabilité |
|---------|---------------|
| `ShopifyService` | Communication avec l'API Shopify (GraphQL Admin API), gestion des rate limits, retry logic |
| `SyncService` | Synchronisation initiale et incrémentale du catalogue, gestion des webhooks |
| `SetService` | Création, manipulation et persistance des ensembles de produits, opérations ensemblistes |
| `RuleService` | Application des règles métier (surstock, dormant, orphelin, etc.), calcul des seuils |
| `ReportService` | Génération des rapports automatiques (Collections, Promos), scoring santé catalogue |
| `ExportService` | Génération des fichiers CSV/PDF, formatage compatible Shopify import |
| `CacheService` | Gestion du cache Redis, invalidation, TTL |

---

## Structure du Projet

```plaintext
copilote-merchandising/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Tests, lint, type-check
│       ├── deploy-staging.yml        # Déploiement staging
│       └── deploy-production.yml     # Déploiement production
├── .vscode/
│   ├── settings.json                 # Configuration workspace
│   └── extensions.json               # Extensions recommandées
├── docs/
│   ├── PRD_v2.md                     # Product Requirements Document
│   ├── architecture.md               # Ce document
│   ├── front-spec-ux-ui.md          # Spécifications UI/UX
│   ├── api.md                        # Documentation API interne
│   └── environment-vars.md           # Variables d'environnement
├── prisma/
│   ├── schema.prisma                 # Schéma de base de données
│   ├── migrations/                   # Migrations Prisma
│   └── seed.ts                       # Données de seed
├── public/
│   └── assets/                       # Assets statiques
├── app/
│   ├── entry.client.tsx              # Point d'entrée client Remix
│   ├── entry.server.tsx              # Point d'entrée serveur Remix
│   ├── root.tsx                      # Layout racine
│   ├── routes/
│   │   ├── _index.tsx                # Redirection vers /app
│   │   ├── auth.$.tsx                # OAuth Shopify callbacks
│   │   ├── webhooks.tsx              # Endpoint webhooks Shopify
│   │   ├── app.tsx                   # Layout app (App Bridge)
│   │   ├── app._index.tsx            # Dashboard
│   │   ├── app.catalog.tsx           # Carte du catalogue
│   │   ├── app.builder.tsx           # Liste ensembles
│   │   ├── app.builder.$setId.tsx    # Détail ensemble
│   │   ├── app.builder.new.tsx       # Création ensemble
│   │   ├── app.reports.tsx           # Layout rapports
│   │   ├── app.reports._index.tsx    # Vue globale rapports
│   │   ├── app.reports.collections.tsx
│   │   ├── app.reports.promos.tsx
│   │   ├── app.exports.tsx           # Historique exports
│   │   ├── app.settings.tsx          # Paramètres
│   │   └── api/
│   │       ├── sets.$setId.products.tsx  # API produits d'un ensemble
│   │       └── exports.$exportId.tsx     # Téléchargement export
│   ├── components/
│   │   ├── ui/                       # Composants UI génériques
│   │   │   ├── LoadingState.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── catalog/
│   │   │   ├── CatalogTreemap.tsx    # Treemap D3.js
│   │   │   ├── CatalogFilters.tsx
│   │   │   └── DimensionSwitcher.tsx
│   │   ├── builder/
│   │   │   ├── SetBuilder.tsx        # Builder principal
│   │   │   ├── FilterBlock.tsx       # Bloc filtre individuel
│   │   │   ├── OperationSelector.tsx # Sélecteur opération
│   │   │   ├── SetPreview.tsx        # Aperçu résultats
│   │   │   └── ProductList.tsx       # Liste produits
│   │   ├── reports/
│   │   │   ├── ReportCard.tsx
│   │   │   ├── IssueList.tsx
│   │   │   └── HealthScore.tsx
│   │   ├── dashboard/
│   │   │   ├── KPICard.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── AlertsBanner.tsx
│   │   └── exports/
│   │       ├── ExportModal.tsx
│   │       └── ChecklistGenerator.tsx
│   ├── services/
│   │   ├── shopify.server.ts         # ShopifyService
│   │   ├── sync.server.ts            # SyncService
│   │   ├── sets.server.ts            # SetService
│   │   ├── rules.server.ts           # RuleService
│   │   ├── reports.server.ts         # ReportService
│   │   ├── exports.server.ts         # ExportService
│   │   └── cache.server.ts           # CacheService
│   ├── domain/
│   │   ├── product.ts                # Product domain model
│   │   ├── variant.ts                # Variant domain model
│   │   ├── collection.ts             # Collection domain model
│   │   ├── product-set.ts            # ProductSet domain model
│   │   ├── rule.ts                   # Rule domain model
│   │   └── types.ts                  # Types partagés
│   ├── lib/
│   │   ├── shopify/
│   │   │   ├── client.server.ts      # Client GraphQL Shopify
│   │   │   ├── queries.ts            # Requêtes GraphQL
│   │   │   ├── mutations.ts          # Mutations GraphQL
│   │   │   └── webhooks.server.ts    # Handler webhooks
│   │   ├── db.server.ts              # Instance Prisma
│   │   ├── redis.server.ts           # Client Redis
│   │   ├── storage.server.ts         # Client Object Storage
│   │   └── utils/
│   │       ├── set-operations.ts     # Opérations ensemblistes
│   │       ├── csv-generator.ts      # Générateur CSV
│   │       ├── pdf-generator.ts      # Générateur PDF
│   │       └── date.ts               # Utilitaires dates
│   ├── hooks/
│   │   ├── useSetBuilder.ts          # Hook builder ensembles
│   │   ├── useTreemapData.ts         # Hook données treemap
│   │   └── useRealTimeSync.ts        # Hook sync temps réel
│   └── styles/
│       └── app.css                   # Styles globaux (Tailwind)
├── test/
│   ├── unit/
│   │   ├── services/
│   │   │   ├── sets.test.ts
│   │   │   ├── rules.test.ts
│   │   │   └── reports.test.ts
│   │   └── domain/
│   │       └── product-set.test.ts
│   ├── integration/
│   │   ├── sync.test.ts
│   │   ├── webhooks.test.ts
│   │   └── api.test.ts
│   └── e2e/
│       ├── builder.spec.ts
│       ├── reports.spec.ts
│       └── exports.spec.ts
├── scripts/
│   ├── sync-full.ts                  # Script sync complète
│   └── migrate-data.ts               # Migration données
├── .env.example                      # Template variables env
├── .eslintrc.cjs                     # Configuration ESLint
├── .prettierrc                       # Configuration Prettier
├── tailwind.config.ts                # Configuration Tailwind
├── tsconfig.json                     # Configuration TypeScript
├── vite.config.ts                    # Configuration Vite (Remix)
├── package.json
├── Dockerfile
├── docker-compose.yml                # Dev environment
└── README.md
```

### Description des Répertoires Clés

| Répertoire | Description |
|------------|-------------|
| `app/routes/` | Routes Remix avec loaders et actions. Convention de nommage : `app.` pour les routes protégées |
| `app/components/` | Composants React organisés par domaine fonctionnel. Utilisent Polaris exclusivement |
| `app/services/` | Services métier côté serveur uniquement (`.server.ts`). Contiennent la logique applicative |
| `app/domain/` | Modèles de domaine et types TypeScript. Indépendants du framework |
| `app/lib/` | Infrastructure et utilitaires : clients externes, helpers |
| `prisma/` | Schéma de base de données et migrations Prisma |
| `test/` | Tests organisés par niveau (unit, integration, e2e) |

---

## Référence API

### API Externe Consommée : Shopify Admin API

#### Informations Générales

- **Purpose :** Accès aux données de la boutique (produits, variants, collections, commandes, inventory)
- **Base URL :** `https://{shop}.myshopify.com/admin/api/2024-10/graphql.json`
- **Authentication :** OAuth 2.0 avec Access Token (header `X-Shopify-Access-Token`)
- **Rate Limits :** 
  - GraphQL : 1000 points/seconde (coût variable par requête)
  - REST : 40 requêtes/seconde (bucket avec leak)
- **Documentation :** https://shopify.dev/docs/api/admin-graphql

#### Scopes Requis

```
read_products
read_inventory
read_orders
read_collections
```

#### Requêtes GraphQL Principales

##### Sync Produits (Bulk Operation)

```graphql
mutation {
  bulkOperationRunQuery(
    query: """
    {
      products {
        edges {
          node {
            id
            title
            handle
            status
            productType
            vendor
            tags
            createdAt
            updatedAt
            variants(first: 100) {
              edges {
                node {
                  id
                  sku
                  price
                  compareAtPrice
                  inventoryQuantity
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            collections(first: 50) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
    """
  ) {
    bulkOperation {
      id
      status
    }
    userErrors {
      field
      message
    }
  }
}
```

##### Requête Produits Paginée

```graphql
query GetProducts($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        handle
        status
        productType
        vendor
        tags
        totalInventory
        createdAt
        updatedAt
      }
    }
  }
}
```

##### Requête Collections

```graphql
query GetCollections($first: Int!, $after: String) {
  collections(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        handle
        productsCount
        ruleSet {
          rules {
            column
            condition
            relation
          }
        }
      }
    }
  }
}
```

##### Requête Commandes (pour ventes)

```graphql
query GetOrders($first: Int!, $after: String, $query: String) {
  orders(first: $first, after: $after, query: $query) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        createdAt
        lineItems(first: 50) {
          edges {
            node {
              quantity
              variant {
                id
              }
            }
          }
        }
      }
    }
  }
}
```

#### Webhooks Obligatoires

| Topic | Endpoint | Description |
|-------|----------|-------------|
| `products/create` | `/webhooks` | Nouveau produit créé |
| `products/update` | `/webhooks` | Produit modifié |
| `products/delete` | `/webhooks` | Produit supprimé |
| `inventory_levels/update` | `/webhooks` | Stock modifié |
| `collections/create` | `/webhooks` | Collection créée |
| `collections/update` | `/webhooks` | Collection modifiée |
| `collections/delete` | `/webhooks` | Collection supprimée |
| `app/uninstalled` | `/webhooks` | App désinstallée |

### API Interne (Remix Resource Routes)

#### GET `/api/sets/:setId/products`

Retourne les produits d'un ensemble avec pagination.

**Query Parameters :**
- `page` (number, default: 1)
- `limit` (number, default: 50, max: 100)
- `sort` (string: "title" | "stock" | "price" | "lastSale")
- `order` (string: "asc" | "desc")

**Response :**
```json
{
  "data": {
    "products": [
      {
        "id": "gid://shopify/Product/123",
        "title": "Robe Marguerite",
        "handle": "robe-marguerite",
        "imageUrl": "https://...",
        "totalStock": 45,
        "price": { "min": 89.00, "max": 99.00 },
        "lastSaleAt": "2024-11-15T10:30:00Z",
        "daysSinceLastSale": 21
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 156,
      "totalPages": 4
    }
  }
}
```

#### POST `/api/sets`

Crée un nouvel ensemble.

**Request Body :**
```json
{
  "name": "Candidats soldes été",
  "filters": [
    { "field": "stock", "operator": "gte", "value": 50 },
    { "field": "daysSinceLastSale", "operator": "gte", "value": 90 }
  ],
  "operation": "intersection",
  "baseSetIds": ["set_abc", "set_def"]
}
```

**Response :**
```json
{
  "data": {
    "set": {
      "id": "set_xyz",
      "name": "Candidats soldes été",
      "productCount": 156,
      "createdAt": "2024-12-06T14:30:00Z"
    }
  }
}
```

#### POST `/api/exports`

Génère un export CSV/PDF.

**Request Body :**
```json
{
  "setId": "set_xyz",
  "format": "csv",
  "columns": ["handle", "sku", "title", "price", "stock"],
  "includeVariants": true
}
```

**Response :**
```json
{
  "data": {
    "export": {
      "id": "exp_123",
      "status": "processing",
      "downloadUrl": null
    }
  }
}
```

---

## Modèles de Données

### Entités du Domaine

#### Shop (Boutique)

```typescript
interface Shop {
  id: string;                    // UUID interne
  shopifyId: string;             // ID Shopify (gid://shopify/Shop/xxx)
  domain: string;                // example.myshopify.com
  name: string;                  // Nom de la boutique
  email: string;                 // Email du propriétaire
  plan: ShopPlan;                // Plan Shopify
  accessToken: string;           // Token OAuth (chiffré)
  scopes: string[];              // Scopes accordés
  settings: ShopSettings;        // Paramètres personnalisés
  syncStatus: SyncStatus;        // État de synchronisation
  lastSyncAt: Date | null;       // Dernière sync complète
  createdAt: Date;
  updatedAt: Date;
}

interface ShopSettings {
  rules: {
    overstockThreshold: number;           // Seuil surstock (défaut: 50)
    overstockMonths: number;              // Mois de stock max (défaut: 6)
    dormantDays: number;                  // Jours sans vente = dormant (défaut: 90)
    slowMoverSales: number;               // Ventes min slow mover (défaut: 3)
    slowMoverPeriod: number;              // Période slow mover en jours (défaut: 30)
    bestsellerPercentile: number;         // Top % bestseller (défaut: 10)
    multiCollectionMax: number;           // Max collections par produit (défaut: 5)
    emptyCollectionMin: number;           // Min produits collection vide (défaut: 3)
  };
  notifications: {
    emailAlerts: boolean;
    weeklyDigest: boolean;
  };
  locale: string;                         // fr | en
}

type ShopPlan = 'starter' | 'growth' | 'plus';
type SyncStatus = 'pending' | 'syncing' | 'synced' | 'failed';
```

#### Product (Produit)

```typescript
interface Product {
  id: string;                    // UUID interne
  shopId: string;                // FK vers Shop
  shopifyId: string;             // gid://shopify/Product/xxx
  title: string;
  handle: string;
  status: ProductStatus;
  productType: string | null;    // Catégorie Shopify
  vendor: string | null;
  tags: string[];
  imageUrl: string | null;
  totalStock: number;            // Somme stock variants
  priceRange: PriceRange;
  createdAt: Date;               // Date création Shopify
  updatedAt: Date;               // Dernière modif Shopify
  syncedAt: Date;                // Dernière sync
  
  // Métriques calculées (dénormalisées pour performance)
  metrics: ProductMetrics;
}

interface ProductMetrics {
  salesLast30Days: number;
  salesLast90Days: number;
  lastSaleAt: Date | null;
  daysSinceLastSale: number | null;
  stockTurnoverDays: number | null;  // Jours de stock restant
  isOverstock: boolean;
  isDormant: boolean;
  isSlowMover: boolean;
  isBestseller: boolean;
  isOrphan: boolean;                  // Sans collection manuelle
  isIncomplete: boolean;              // Fiche incomplète
  collectionCount: number;
}

interface PriceRange {
  min: number;
  max: number;
  compareAtMin: number | null;
  compareAtMax: number | null;
}

type ProductStatus = 'active' | 'draft' | 'archived';
```

#### Variant

```typescript
interface Variant {
  id: string;                    // UUID interne
  productId: string;             // FK vers Product
  shopifyId: string;             // gid://shopify/ProductVariant/xxx
  sku: string | null;
  title: string;                 // Ex: "S / Bleu"
  price: number;
  compareAtPrice: number | null;
  inventoryQuantity: number;
  options: VariantOption[];
  createdAt: Date;
  updatedAt: Date;
}

interface VariantOption {
  name: string;     // Ex: "Taille"
  value: string;    // Ex: "S"
}
```

#### Collection

```typescript
interface Collection {
  id: string;                    // UUID interne
  shopId: string;                // FK vers Shop
  shopifyId: string;             // gid://shopify/Collection/xxx
  title: string;
  handle: string;
  isManual: boolean;             // Manual vs Smart collection
  productCount: number;
  rules: CollectionRule[] | null; // Pour smart collections
  createdAt: Date;
  updatedAt: Date;
}

interface CollectionRule {
  column: string;    // Ex: "tag", "type", "price"
  relation: string;  // Ex: "equals", "greater_than"
  condition: string; // Ex: "Sale"
}
```

#### ProductSet (Ensemble)

```typescript
interface ProductSet {
  id: string;                    // UUID interne
  shopId: string;                // FK vers Shop
  name: string;
  description: string | null;
  type: SetType;
  definition: SetDefinition;
  productCount: number;          // Cache du nombre de produits
  isTemplate: boolean;           // Ensemble pré-configuré
  createdAt: Date;
  updatedAt: Date;
  lastComputedAt: Date;          // Dernière évaluation
}

type SetType = 'filter' | 'operation' | 'manual';

interface SetDefinition {
  // Pour type 'filter'
  filters?: SetFilter[];
  
  // Pour type 'operation'
  operation?: 'intersection' | 'union' | 'difference';
  operands?: string[];  // IDs des ensembles sources
  
  // Pour type 'manual'
  productIds?: string[];
}

interface SetFilter {
  field: FilterField;
  operator: FilterOperator;
  value: FilterValue;
}

type FilterField = 
  | 'productType'
  | 'vendor'
  | 'tags'
  | 'status'
  | 'price'
  | 'compareAtPrice'
  | 'stock'
  | 'salesLast30Days'
  | 'salesLast90Days'
  | 'daysSinceLastSale'
  | 'collectionCount'
  | 'isOrphan'
  | 'isIncomplete'
  | 'createdAt';

type FilterOperator = 
  | 'eq' | 'neq' 
  | 'gt' | 'gte' | 'lt' | 'lte'
  | 'contains' | 'notContains'
  | 'in' | 'notIn'
  | 'isNull' | 'isNotNull';

type FilterValue = string | number | boolean | string[] | number[];
```

#### Export

```typescript
interface Export {
  id: string;                    // UUID interne
  shopId: string;                // FK vers Shop
  setId: string | null;          // FK vers ProductSet (null si rapport)
  reportType: ReportType | null; // Type de rapport source
  name: string;
  format: ExportFormat;
  status: ExportStatus;
  fileUrl: string | null;        // URL de téléchargement
  fileSize: number | null;       // Taille en bytes
  productCount: number;
  columns: string[];             // Colonnes incluses
  createdAt: Date;
  expiresAt: Date;               // Date d'expiration du fichier
}

type ExportFormat = 'csv' | 'pdf';
type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed';
type ReportType = 'collections' | 'promos' | 'health';
```

### Schéma de Base de Données (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Shop {
  id           String   @id @default(uuid())
  shopifyId    String   @unique
  domain       String   @unique
  name         String
  email        String
  plan         ShopPlan @default(starter)
  accessToken  String   // Chiffré via application
  scopes       String[]
  settings     Json     @default("{}")
  syncStatus   SyncStatus @default(pending)
  lastSyncAt   DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  products     Product[]
  collections  Collection[]
  productSets  ProductSet[]
  exports      Export[]
  syncLogs     SyncLog[]
  
  @@index([domain])
}

enum ShopPlan {
  starter
  growth
  plus
}

enum SyncStatus {
  pending
  syncing
  synced
  failed
}

model Product {
  id            String   @id @default(uuid())
  shopId        String
  shop          Shop     @relation(fields: [shopId], references: [id], onDelete: Cascade)
  shopifyId     String
  title         String
  handle        String
  status        ProductStatus @default(active)
  productType   String?
  vendor        String?
  tags          String[]
  imageUrl      String?
  totalStock    Int      @default(0)
  priceMin      Decimal  @db.Decimal(10, 2)
  priceMax      Decimal  @db.Decimal(10, 2)
  compareAtMin  Decimal? @db.Decimal(10, 2)
  compareAtMax  Decimal? @db.Decimal(10, 2)
  
  // Métriques dénormalisées
  salesLast30   Int      @default(0)
  salesLast90   Int      @default(0)
  lastSaleAt    DateTime?
  stockTurnover Float?
  isOverstock   Boolean  @default(false)
  isDormant     Boolean  @default(false)
  isSlowMover   Boolean  @default(false)
  isBestseller  Boolean  @default(false)
  isOrphan      Boolean  @default(false)
  isIncomplete  Boolean  @default(false)
  collectionCount Int    @default(0)
  
  shopifyCreatedAt DateTime
  shopifyUpdatedAt DateTime
  syncedAt         DateTime @default(now())
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  variants    Variant[]
  collections ProductCollection[]
  
  @@unique([shopId, shopifyId])
  @@index([shopId, status])
  @@index([shopId, productType])
  @@index([shopId, isOverstock])
  @@index([shopId, isDormant])
  @@index([shopId, isOrphan])
  @@index([shopId, totalStock])
  @@index([shopId, lastSaleAt])
}

enum ProductStatus {
  active
  draft
  archived
}

model Variant {
  id               String   @id @default(uuid())
  productId        String
  product          Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  shopifyId        String
  sku              String?
  title            String
  price            Decimal  @db.Decimal(10, 2)
  compareAtPrice   Decimal? @db.Decimal(10, 2)
  inventoryQuantity Int     @default(0)
  options          Json     @default("[]")
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  sales            Sale[]
  
  @@unique([productId, shopifyId])
  @@index([sku])
}

model Collection {
  id           String   @id @default(uuid())
  shopId       String
  shop         Shop     @relation(fields: [shopId], references: [id], onDelete: Cascade)
  shopifyId    String
  title        String
  handle       String
  isManual     Boolean  @default(true)
  productCount Int      @default(0)
  rules        Json?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  products     ProductCollection[]
  
  @@unique([shopId, shopifyId])
  @@index([shopId, isManual])
}

model ProductCollection {
  productId    String
  product      Product    @relation(fields: [productId], references: [id], onDelete: Cascade)
  collectionId String
  collection   Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)
  
  @@id([productId, collectionId])
}

model Sale {
  id         String   @id @default(uuid())
  variantId  String
  variant    Variant  @relation(fields: [variantId], references: [id], onDelete: Cascade)
  quantity   Int
  orderId    String   // Shopify Order ID
  orderDate  DateTime
  createdAt  DateTime @default(now())
  
  @@index([variantId, orderDate])
  @@index([orderDate])
}

model ProductSet {
  id           String   @id @default(uuid())
  shopId       String
  shop         Shop     @relation(fields: [shopId], references: [id], onDelete: Cascade)
  name         String
  description  String?
  type         SetType
  definition   Json
  productCount Int      @default(0)
  isTemplate   Boolean  @default(false)
  lastComputedAt DateTime @default(now())
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  exports      Export[]
  
  @@index([shopId, isTemplate])
}

enum SetType {
  filter
  operation
  manual
}

model Export {
  id           String       @id @default(uuid())
  shopId       String
  shop         Shop         @relation(fields: [shopId], references: [id], onDelete: Cascade)
  setId        String?
  productSet   ProductSet?  @relation(fields: [setId], references: [id], onDelete: SetNull)
  reportType   ReportType?
  name         String
  format       ExportFormat
  status       ExportStatus @default(pending)
  fileUrl      String?
  fileSize     Int?
  productCount Int          @default(0)
  columns      String[]
  error        String?
  createdAt    DateTime     @default(now())
  expiresAt    DateTime
  
  @@index([shopId, createdAt])
  @@index([status])
}

enum ExportFormat {
  csv
  pdf
}

enum ExportStatus {
  pending
  processing
  completed
  failed
}

enum ReportType {
  collections
  promos
  health
}

model SyncLog {
  id         String     @id @default(uuid())
  shopId     String
  shop       Shop       @relation(fields: [shopId], references: [id], onDelete: Cascade)
  type       SyncType
  status     SyncStatus
  stats      Json?      // { products: 1234, variants: 5678, collections: 89 }
  error      String?
  startedAt  DateTime   @default(now())
  completedAt DateTime?
  
  @@index([shopId, startedAt])
}

enum SyncType {
  full
  incremental
  webhook
}
```

---

## Workflows et Diagrammes de Séquence

### Workflow 1 : Synchronisation Initiale

```mermaid
sequenceDiagram
    participant User as Utilisateur
    participant App as Remix App
    participant Sync as SyncService
    participant Shopify as Shopify API
    participant DB as PostgreSQL
    participant Cache as Redis
    
    User->>App: Installe l'app
    App->>Shopify: OAuth Flow
    Shopify-->>App: Access Token
    App->>DB: Crée Shop record
    
    App->>Sync: Déclenche sync initiale
    activate Sync
    
    Sync->>Shopify: Bulk Operation (products)
    Shopify-->>Sync: Operation ID
    
    loop Poll status
        Sync->>Shopify: Check operation status
        Shopify-->>Sync: Status (running/completed)
    end
    
    Shopify-->>Sync: JSONL file URL
    Sync->>Sync: Parse JSONL
    Sync->>DB: Upsert Products (batch)
    Sync->>DB: Upsert Variants (batch)
    
    Sync->>Shopify: Query Collections
    Sync->>DB: Upsert Collections
    
    Sync->>Shopify: Query Orders (90 jours)
    Sync->>DB: Aggregate Sales
    
    Sync->>DB: Compute Metrics
    Note over Sync,DB: Calcul isOverstock, isDormant, etc.
    
    Sync->>Cache: Invalide cache
    Sync->>DB: Update Shop.syncStatus = synced
    
    deactivate Sync
    
    App-->>User: Dashboard affiché
```

### Workflow 2 : Création d'un Ensemble

```mermaid
sequenceDiagram
    participant User as Utilisateur
    participant UI as React/Polaris
    participant Loader as Remix Loader
    participant Action as Remix Action
    participant Sets as SetService
    participant DB as PostgreSQL
    participant Cache as Redis
    
    User->>UI: Ouvre Builder
    UI->>Loader: GET /app/builder/new
    Loader->>DB: Load shop settings, templates
    Loader-->>UI: Initial data
    
    User->>UI: Ajoute filtre (stock > 50)
    UI->>UI: Update local state
    
    User->>UI: Ajoute filtre (dormant = true)
    UI->>UI: Update local state
    
    User->>UI: Click "Aperçu"
    UI->>Loader: GET /api/sets/preview?filters=...
    Loader->>Sets: computePreview(filters)
    Sets->>DB: Query products with filters
    DB-->>Sets: Product IDs + count
    Sets->>Cache: Store preview (TTL: 5min)
    Sets-->>Loader: { count: 156, preview: [...] }
    Loader-->>UI: Affiche aperçu
    
    User->>UI: Nomme ensemble, click "Sauvegarder"
    UI->>Action: POST /app/builder/new
    Action->>Sets: createSet(definition)
    Sets->>DB: Insert ProductSet
    Sets->>DB: Compute & store productCount
    Sets->>Cache: Invalide cache related
    Sets-->>Action: Created set
    Action-->>UI: Redirect /app/builder/{setId}
```

### Workflow 3 : Traitement Webhook

```mermaid
sequenceDiagram
    participant Shopify as Shopify
    participant Webhook as Webhook Handler
    participant Queue as Job Queue
    participant Sync as SyncService
    participant DB as PostgreSQL
    participant Cache as Redis
    
    Shopify->>Webhook: POST /webhooks (products/update)
    Webhook->>Webhook: Verify HMAC
    Webhook->>Queue: Enqueue job
    Webhook-->>Shopify: 200 OK (< 5s)
    
    Queue->>Sync: Process webhook job
    activate Sync
    
    Sync->>DB: Get Shop by domain
    Sync->>Shopify: Query updated product
    Shopify-->>Sync: Product data
    
    Sync->>DB: Upsert Product
    Sync->>DB: Upsert Variants
    Sync->>DB: Update ProductCollections
    
    Sync->>DB: Recompute metrics
    Note over Sync,DB: isDormant, isOverstock, etc.
    
    Sync->>Cache: Invalidate product cache
    Sync->>Cache: Invalidate affected sets
    
    Sync->>DB: Log SyncLog
    deactivate Sync
```

### Workflow 4 : Export CSV

```mermaid
sequenceDiagram
    participant User as Utilisateur
    participant UI as React/Polaris
    participant Action as Remix Action
    participant Export as ExportService
    participant Sets as SetService
    participant DB as PostgreSQL
    participant Storage as S3/GCS
    
    User->>UI: Click "Exporter CSV"
    UI->>UI: Affiche modal (colonnes, options)
    User->>UI: Sélectionne colonnes, valide
    
    UI->>Action: POST /api/exports
    Action->>DB: Create Export (status: pending)
    Action->>Export: generateExport(exportId)
    Action-->>UI: { exportId, status: processing }
    
    UI->>UI: Affiche progress indicator
    
    activate Export
    Export->>Sets: getSetProducts(setId)
    Sets->>DB: Query all products in set
    DB-->>Sets: Products array
    Sets-->>Export: Products
    
    Export->>Export: Generate CSV content
    Export->>Storage: Upload file
    Storage-->>Export: File URL
    
    Export->>DB: Update Export (status: completed, fileUrl)
    deactivate Export
    
    UI->>Action: Poll GET /api/exports/{id}
    Action->>DB: Get Export
    Action-->>UI: { status: completed, fileUrl }
    
    UI-->>User: Affiche lien téléchargement
    User->>Storage: Download file
```

---

## Stack Technique Définitif

| Catégorie | Technologie | Version | Description | Justification |
|-----------|-------------|---------|-------------|---------------|
| **Langages** | TypeScript | 5.3.x | Langage principal frontend + backend | Type safety, écosystème riche, requis par Remix |
| **Runtime** | Node.js | 20.x LTS | Environnement d'exécution | LTS stable, performance, compatibilité Shopify CLI |
| **Framework Fullstack** | Remix | 2.x | Framework React SSR | Intégration Shopify App Template, loaders/actions, performance |
| **UI Library** | React | 18.x | Bibliothèque UI | Requis par Remix et Polaris |
| **Design System** | Shopify Polaris | 12.x | Composants UI Shopify | Obligatoire pour apps Shopify, cohérence UX |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first CSS | Complémentaire à Polaris pour custom styles |
| **Base de données** | PostgreSQL | 16.x | Base relationnelle principale | Robuste, JSON support, full-text search |
| **ORM** | Prisma | 5.x | Data access layer | Type-safe, migrations, excellent DX |
| **Cache** | Redis | 7.x | Cache et sessions | Performance, rate limiting, job queues |
| **Job Queue** | BullMQ | 5.x | File d'attente de jobs | Basé sur Redis, robuste, retry logic |
| **Visualisation** | D3.js | 7.x | Treemaps et graphiques | Flexibilité maximale pour visualisations custom |
|  | Recharts | 2.x | Graphiques React | Wrapper React simplifié pour charts standards |
| **Génération PDF** | PDFKit | 0.14.x | Création PDF | Léger, sans dépendances lourdes |
| **CSV** | Papaparse | 5.x | Parsing/génération CSV | Standard, performant |
| **Validation** | Zod | 3.x | Validation de schémas | Type inference TypeScript, runtime validation |
| **Tests Unitaires** | Vitest | 1.x | Framework de test | Rapide, compatible Vite/Remix |
| **Tests E2E** | Playwright | 1.40.x | Tests end-to-end | Multi-browser, fiable, maintenu par Microsoft |
| **CI/CD** | GitHub Actions | N/A | Pipeline CI/CD | Intégration GitHub, marketplace riche |
| **Hébergement** | Fly.io / Railway | N/A | Platform-as-a-Service | Simple, scaling auto, proche Shopify infra |
| **Object Storage** | AWS S3 / Cloudflare R2 | N/A | Stockage fichiers exports | Standard, économique, CDN intégré |
| **Monitoring** | Sentry | N/A | Error tracking | Standard industrie, intégration Remix |
| **Logs** | Pino | 8.x | Structured logging | Performant, JSON native |

---

## Infrastructure et Déploiement

### Architecture d'Infrastructure

```mermaid
graph TB
    subgraph "Internet"
        USER[Utilisateurs]
        SHOPIFY[Shopify Platform]
    end
    
    subgraph "CDN / Edge"
        CF[Cloudflare]
    end
    
    subgraph "Application Platform (Fly.io / Railway)"
        LB[Load Balancer]
        APP1[App Instance 1]
        APP2[App Instance 2]
        WORKER[Worker Instance<br/>Jobs Background]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL<br/>Managed)]
        REDIS[(Redis<br/>Managed)]
    end
    
    subgraph "Storage"
        S3[S3 / R2<br/>Exports Storage]
    end
    
    USER --> CF
    SHOPIFY --> CF
    CF --> LB
    LB --> APP1
    LB --> APP2
    APP1 --> PG
    APP2 --> PG
    APP1 --> REDIS
    APP2 --> REDIS
    WORKER --> PG
    WORKER --> REDIS
    WORKER --> S3
    APP1 --> S3
    APP2 --> S3
```

### Environnements

| Environnement | URL | Base de données | Usage |
|---------------|-----|-----------------|-------|
| Development | localhost:3000 | PostgreSQL local (Docker) | Développement local |
| Staging | staging.copilote-merch.app | PostgreSQL staging | Tests QA, démos |
| Production | app.copilote-merch.app | PostgreSQL production | Utilisateurs finaux |

### Variables d'Environnement

```bash
# .env.example

# Application
NODE_ENV=development
APP_URL=http://localhost:3000
SESSION_SECRET=your-session-secret-min-32-chars

# Shopify
SHOPIFY_API_KEY=your-api-key
SHOPIFY_API_SECRET=your-api-secret
SHOPIFY_SCOPES=read_products,read_inventory,read_orders,read_collections

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/copilote_dev

# Redis
REDIS_URL=redis://localhost:6379

# Storage (S3 compatible)
STORAGE_ENDPOINT=https://s3.amazonaws.com
STORAGE_BUCKET=copilote-exports
STORAGE_ACCESS_KEY=your-access-key
STORAGE_SECRET_KEY=your-secret-key
STORAGE_REGION=eu-west-1

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx

# Feature Flags
ENABLE_AI_COPILOT=false
ENABLE_PLAYGROUND=false
```

### Stratégie de Déploiement

1. **CI Pipeline (GitHub Actions)** :
   - Lint (ESLint + Prettier check)
   - Type check (tsc --noEmit)
   - Tests unitaires (Vitest)
   - Tests d'intégration
   - Build Docker image

2. **Déploiement Staging** :
   - Automatique sur merge dans `develop`
   - Migrations Prisma automatiques
   - Tests E2E post-déploiement

3. **Déploiement Production** :
   - Manuel via tag release ou merge dans `main`
   - Migrations Prisma avec confirmation
   - Blue-green deployment
   - Rollback automatique sur health check failure

### Stratégie de Rollback

- **Automatique** : Si les health checks échouent dans les 5 minutes post-déploiement
- **Manuel** : Via GitHub Actions workflow ou CLI Fly.io/Railway
- **Database** : Migrations Prisma réversibles, backup avant migration

---

## Stratégie de Gestion des Erreurs

### Approche Générale

Utilisation d'exceptions typées avec une hiérarchie de classes d'erreur personnalisées. Toutes les erreurs sont loggées de manière structurée avec contexte.

### Hiérarchie des Erreurs

```typescript
// app/lib/errors.ts

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, context);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`, 'NOT_FOUND', 404, { resource, id });
    this.name = 'NotFoundError';
  }
}

export class ShopifyApiError extends AppError {
  constructor(
    message: string,
    public shopifyErrors?: unknown[],
    context?: Record<string, unknown>
  ) {
    super(message, 'SHOPIFY_API_ERROR', 502, context);
    this.name = 'ShopifyApiError';
  }
}

export class RateLimitError extends AppError {
  constructor(public retryAfter: number) {
    super('Rate limit exceeded', 'RATE_LIMIT', 429, { retryAfter });
    this.name = 'RateLimitError';
  }
}

export class SyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'SYNC_ERROR', 500, context);
    this.name = 'SyncError';
  }
}
```

### Logging

```typescript
// app/lib/logger.server.ts

import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    env: process.env.NODE_ENV,
    service: 'copilote-merchandising',
  },
});

// Usage avec contexte
logger.info({ shopId, productCount }, 'Sync completed');
logger.error({ err, shopId, webhookTopic }, 'Webhook processing failed');
```

### Gestion des Erreurs API Shopify

```typescript
// app/lib/shopify/client.server.ts

const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

async function executeWithRetry<T>(
  operation: () => Promise<T>,
  context: { shopId: string; operation: string }
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (isRateLimitError(error)) {
        const retryAfter = getRetryAfter(error);
        logger.warn({ ...context, attempt, retryAfter }, 'Rate limited, waiting');
        await sleep(retryAfter * 1000);
        continue;
      }
      
      if (isRetryableError(error) && attempt < MAX_RETRIES) {
        const delay = BASE_DELAY * Math.pow(2, attempt - 1);
        logger.warn({ ...context, attempt, delay }, 'Retrying after error');
        await sleep(delay);
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError;
}
```

### Gestion Transactions

```typescript
// app/services/sync.server.ts

async function syncProducts(shopId: string, products: ShopifyProduct[]): Promise<void> {
  await prisma.$transaction(async (tx) => {
    for (const product of products) {
      await tx.product.upsert({
        where: { shopId_shopifyId: { shopId, shopifyId: product.id } },
        create: mapToProductCreate(shopId, product),
        update: mapToProductUpdate(product),
      });
      
      for (const variant of product.variants) {
        await tx.variant.upsert({
          where: { productId_shopifyId: { productId: product.id, shopifyId: variant.id } },
          create: mapToVariantCreate(product.id, variant),
          update: mapToVariantUpdate(variant),
        });
      }
    }
  }, {
    timeout: 30000, // 30 seconds
    isolationLevel: 'ReadCommitted',
  });
}
```

---

## Standards de Code

### Style Guide et Linter

- **ESLint** : Configuration basée sur `@remix-run/eslint-config` avec règles supplémentaires
- **Prettier** : Formatage automatique, intégré à ESLint
- **TypeScript** : Mode strict activé (`strict: true`)

```json
// .eslintrc.cjs
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
```

### Conventions de Nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| Variables | camelCase | `productCount`, `lastSyncAt` |
| Fonctions | camelCase | `computeSetProducts()`, `handleWebhook()` |
| Classes/Types/Interfaces | PascalCase | `ProductSet`, `ShopSettings` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRIES`, `DEFAULT_PAGE_SIZE` |
| Fichiers (composants) | PascalCase | `SetBuilder.tsx`, `ProductList.tsx` |
| Fichiers (autres) | kebab-case | `sync.server.ts`, `set-operations.ts` |
| Routes Remix | kebab-case avec points | `app.builder.$setId.tsx` |
| Variables d'env | UPPER_SNAKE_CASE | `DATABASE_URL`, `SHOPIFY_API_KEY` |

### Organisation des Tests

```plaintext
test/
├── unit/
│   └── *.test.ts           # Co-localisés avec le code source via vitest
├── integration/
│   └── *.test.ts           # Tests d'intégration DB/API
└── e2e/
    └── *.spec.ts           # Tests Playwright
```

Convention : `*.test.ts` pour Vitest, `*.spec.ts` pour Playwright.

### Opérations Asynchrones

Toujours utiliser `async/await`. Éviter les callbacks et `.then()` chains.

```typescript
// ✅ Correct
async function syncShop(shopId: string): Promise<void> {
  const shop = await prisma.shop.findUnique({ where: { id: shopId } });
  if (!shop) throw new NotFoundError('Shop', shopId);
  
  const products = await shopifyService.fetchProducts(shop);
  await syncService.upsertProducts(shopId, products);
}

// ❌ Éviter
function syncShop(shopId: string): Promise<void> {
  return prisma.shop.findUnique({ where: { id: shopId } })
    .then(shop => {
      if (!shop) throw new NotFoundError('Shop', shopId);
      return shopifyService.fetchProducts(shop);
    })
    .then(products => syncService.upsertProducts(shopId, products));
}
```

### Type Safety

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Interdiction d'utiliser `any`. Utiliser `unknown` si le type n'est pas connu, avec type guards.

### Conventions TypeScript/Remix Spécifiques

```typescript
// Imports - ordre standardisé
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Page, Card } from '@shopify/polaris';
import { prisma } from '~/lib/db.server';
import { SetService } from '~/services/sets.server';
import type { ProductSet } from '~/domain/product-set';

// Loaders - toujours typer la réponse
export async function loader({ request, params }: LoaderFunctionArgs) {
  const { shopId } = await requireShopSession(request);
  const set = await SetService.getById(params.setId!, shopId);
  
  if (!set) {
    throw new Response('Not Found', { status: 404 });
  }
  
  return json({ set });
}

// Composants - exports nommés pour les composants non-route
export function SetCard({ set }: { set: ProductSet }) {
  return (
    <Card>
      <p>{set.name}</p>
    </Card>
  );
}

// Export default uniquement pour les routes
export default function SetDetailPage() {
  const { set } = useLoaderData<typeof loader>();
  return <SetCard set={set} />;
}
```

### Gestion des Null/Undefined

```typescript
// Utiliser optional chaining et nullish coalescing
const productType = product.productType ?? 'Uncategorized';
const imageUrl = product.images?.[0]?.url;

// Éviter l'opérateur ! (non-null assertion)
// ❌ const id = params.setId!;
// ✅ 
if (!params.setId) {
  throw new Response('Set ID required', { status: 400 });
}
const id = params.setId;
```

---

## Stratégie de Tests

### Outils

| Outil | Usage |
|-------|-------|
| Vitest | Tests unitaires et d'intégration |
| Playwright | Tests end-to-end |
| MSW (Mock Service Worker) | Mock des API externes |
| Testcontainers | PostgreSQL/Redis pour tests d'intégration |

### Tests Unitaires

**Scope :** Fonctions pures, services métier isolés, utilitaires.

**Location :** Fichiers `*.test.ts` co-localisés avec le code source.

```typescript
// app/lib/utils/set-operations.test.ts

import { describe, it, expect } from 'vitest';
import { intersection, union, difference } from './set-operations';

describe('Set Operations', () => {
  describe('intersection', () => {
    it('returns common elements between two sets', () => {
      const setA = new Set(['a', 'b', 'c']);
      const setB = new Set(['b', 'c', 'd']);
      
      const result = intersection(setA, setB);
      
      expect(result).toEqual(new Set(['b', 'c']));
    });
    
    it('returns empty set when no common elements', () => {
      const setA = new Set(['a', 'b']);
      const setB = new Set(['c', 'd']);
      
      const result = intersection(setA, setB);
      
      expect(result).toEqual(new Set());
    });
  });
});
```

### Tests d'Intégration

**Scope :** Interactions avec la base de données, services complets.

**Location :** `test/integration/`

```typescript
// test/integration/sync.test.ts

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { prisma } from '~/lib/db.server';
import { SyncService } from '~/services/sync.server';
import { createTestShop, cleanupTestData } from '../helpers';

describe('SyncService', () => {
  let shopId: string;
  
  beforeAll(async () => {
    const shop = await createTestShop();
    shopId = shop.id;
  });
  
  afterAll(async () => {
    await cleanupTestData(shopId);
  });
  
  beforeEach(async () => {
    await prisma.product.deleteMany({ where: { shopId } });
  });
  
  it('syncs products from Shopify', async () => {
    const mockProducts = [
      { id: 'gid://shopify/Product/1', title: 'Test Product', ... },
    ];
    
    await SyncService.syncProducts(shopId, mockProducts);
    
    const products = await prisma.product.findMany({ where: { shopId } });
    expect(products).toHaveLength(1);
    expect(products[0].title).toBe('Test Product');
  });
});
```

### Tests End-to-End

**Scope :** Parcours utilisateur complets, intégration UI.

**Location :** `test/e2e/`

```typescript
// test/e2e/builder.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Set Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app/builder/new');
  });
  
  test('creates a new set with filters', async ({ page }) => {
    // Ajouter un filtre stock
    await page.click('[data-testid="add-filter"]');
    await page.selectOption('[data-testid="filter-field"]', 'stock');
    await page.selectOption('[data-testid="filter-operator"]', 'gte');
    await page.fill('[data-testid="filter-value"]', '50');
    
    // Vérifier l'aperçu
    await page.click('[data-testid="preview-button"]');
    await expect(page.locator('[data-testid="product-count"]')).toBeVisible();
    
    // Sauvegarder
    await page.fill('[data-testid="set-name"]', 'Test Set');
    await page.click('[data-testid="save-button"]');
    
    // Vérifier la redirection
    await expect(page).toHaveURL(/\/app\/builder\/set_/);
  });
});
```

### Coverage

**Cible :** 80% de couverture pour le code métier (`app/services/`, `app/domain/`, `app/lib/utils/`).

```bash
# Générer le rapport de couverture
npm run test:coverage
```

### Mocking

```typescript
// test/mocks/shopify.ts

import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const shopifyHandlers = [
  rest.post('https://*.myshopify.com/admin/api/*/graphql.json', (req, res, ctx) => {
    const { query } = req.body as { query: string };
    
    if (query.includes('products')) {
      return res(ctx.json({ data: { products: mockProducts } }));
    }
    
    return res(ctx.status(400));
  }),
];

export const server = setupServer(...shopifyHandlers);
```

---

## Bonnes Pratiques de Sécurité

### Validation des Entrées

Toutes les entrées utilisateur sont validées avec Zod au niveau des actions Remix.

```typescript
// app/routes/app.builder.new.tsx

import { z } from 'zod';

const CreateSetSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  filters: z.array(z.object({
    field: z.enum(['stock', 'price', 'productType', 'tags', ...]),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', ...]),
    value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
  })),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  
  const result = CreateSetSchema.safeParse(rawData);
  if (!result.success) {
    return json({ errors: result.error.flatten() }, { status: 400 });
  }
  
  // Process validated data
}
```

### Gestion des Secrets

- **Jamais** de secrets en dur dans le code
- Variables d'environnement pour tous les secrets
- Access tokens Shopify chiffrés en base avec `@shopify/shopify-api` crypto utilities
- Rotation des secrets via CI/CD secrets management

### Authentification et Autorisation

```typescript
// app/lib/auth.server.ts

import { authenticate } from '@shopify/shopify-app-remix/server';

export async function requireShopSession(request: Request) {
  const { session, admin } = await authenticate.admin(request);
  
  if (!session) {
    throw new Response('Unauthorized', { status: 401 });
  }
  
  return { session, admin, shopId: session.shop };
}

// Utilisé dans chaque loader/action protégé
export async function loader({ request }: LoaderFunctionArgs) {
  const { shopId } = await requireShopSession(request);
  // ...
}
```

### Isolation des Données (Multi-tenancy)

Toutes les requêtes Prisma incluent un filtre `shopId` :

```typescript
// ✅ Correct - toujours filtrer par shopId
const products = await prisma.product.findMany({
  where: { shopId, isOrphan: true },
});

// ❌ Dangereux - accès à toutes les données
const products = await prisma.product.findMany({
  where: { isOrphan: true },
});
```

### Sécurité des Webhooks

```typescript
// app/routes/webhooks.tsx

import crypto from 'crypto';

export async function action({ request }: ActionFunctionArgs) {
  const hmacHeader = request.headers.get('X-Shopify-Hmac-Sha256');
  const body = await request.text();
  
  const generatedHmac = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET!)
    .update(body, 'utf8')
    .digest('base64');
  
  if (hmacHeader !== generatedHmac) {
    logger.warn({ topic: request.headers.get('X-Shopify-Topic') }, 'Invalid webhook signature');
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Process webhook
}
```

### Headers de Sécurité

Configurés via Remix et/ou reverse proxy :

```typescript
// app/entry.server.tsx

const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
```

Note : `X-Frame-Options` est overridé pour l'iframe Shopify App Bridge.

### Audit Trail

```typescript
// Logging de toutes les actions sensibles
logger.info({
  action: 'export_created',
  shopId,
  userId: session.onlineAccessInfo?.associated_user?.id,
  exportId,
  setId,
  format,
}, 'Export created');
```

### Dépendances

- `npm audit` exécuté en CI
- Dependabot activé pour les mises à jour de sécurité
- Review obligatoire pour l'ajout de nouvelles dépendances

---

## Journal des Modifications

| Modification | Date | Version | Description | Auteur |
|--------------|------|---------|-------------|--------|
| Création initiale | 06/12/2024 | 1.0 | Document d'architecture complet basé sur PRD v2.0 et specs UX/UI | Claude |

---

*— Fin du document —*
