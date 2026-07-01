# Processus de développement SaaS — Draft

> **Statut :** Draft — proposition en attente de relecture et validation par Ams
> **Dernière mise à jour :** 2026-06-18

## Objectif

Cadrer le développement d'une application SaaS de l'idée au déploiement, avec un minimum d'intervention humaine et un maximum de qualité.

## Principe

Ams intervient pour **valider** aux moments clés. amsClaw exécute tout le reste.

## Les 7 phases

---

### Phase ① — Idéation

**Objectif :** Transformer une idée vague en besoin clair et actionnable.

**Ce que fait amsClaw :**
- Pose une série de questions structurées pour murir l'idée :
  - Quel problème concret ça résout ?
  - Pour qui ? (cible, profil utilisateur)
  - Quel est le contexte d'utilisation ? (mobile, desktop, hors-ligne ?)
  - Quelle est la proposition de valeur unique ?
  - Quel modèle de revenu ? (abonnement, freemium, paiement à l'acte ?)
  - Quelle zone géographique ?
  - Quel est le critère de succès minimum ?
- Synthétise les réponses en une fiche idée claire

**Ams intervient :** Non — seulement pour répondre aux questions

**Livrable :** Fiche idée synthétique (1 page)

---

### Phase ② — Expression de besoin

**Objectif :** Formaliser le besoin en un document structuré, prêt à être validé.

**Ce que fait amsClaw :**
- Transforme la fiche idée en expression de besoin formelle
- Structure : contexte, problème, solution, utilisateurs, fonctionnalités attendues (MVP + backlog), contraintes techniques, critères de succès, risques identifiés
- Rédige en français clair, sans jargon technique inutile

**Ams intervient :** ✅ **Valide ou ajuste l'expression de besoin**
- Lecture + validation ou modification
- Une fois validée, c'est la référence pour la suite (on n'y revient pas)

**Livrable :** Document expression de besoin (2-3 pages)

---

### Phase ③ — Benchmark

**Objectif :** Identifier ce qui existe, ce qui marche, et ce qui pourrait être amélioré ou différenciant.

**Ce que fait amsClaw :**
- Recherche 5 à 10 applications/services similaires
- Pour chaque concurrent : modèle, forces, faiblesses, fonctionnalités clés, pricing
- Synthèse : ce qu'il FAUT reprendre, ce qu'il FAUT éviter, opportunités de différenciation
- Recommandations concrètes à intégrer au projet

**Ams intervient :** Non

**Règle :** Pas de rapport de 20 pages. 1 page de synthèse max. Temps estimé : ~1h.

**Livrable :** Fiche benchmark synthétique (1 page)

---

### Phase ④ — PRD + Architecture technique

**Objectif :** Produire le document qui servira de blueprint au développement.

**Ce que fait amsClaw :**
- **PRD :**
  - Fonctionnalités détaillées (user stories par priorité)
  - Parcours utilisateur (user flows)
  - Règles métier
  - Contraintes techniques
  - Définition du MVP (périmètre strict)
- **Architecture technique :**
  - Stack proposée (framework, base de données, hébergement, APIs)
  - Schéma d'architecture (généré via diagram-maker)
  - Modèle de données (entités principales)
  - Stratégie de déploiement

**Ams intervient :** ✅ **Valide le PRD et l'architecture**
- Lecture + validation ou modification
- Une fois validé, le développement peut commencer

**Livrable :** PRD (3-5 pages) + Schéma d'architecture + Schéma données

---

### Phase ⑤ — Maquette / Prototype

**Objectif :** Donner un rendu visuel du produit avant de coder, pour valider que tout le monde a la même vision.

**Ce que fait amsClaw :**
- Génère les écrans clés du MVP sous forme de maquettes
- Montre le parcours utilisateur principal
- Identifie les points de friction potentiels

**Ams intervient :** ✅ **Valide la maquette**
- Regarde le rendu (quelques minutes)
- Valide ou demande des ajustements
- C'est le dernier point de validation avant le code

**Livrable :** Maquettes des écrans clés (au format image, intégrées au doc projet)

---

### Phase ⑥ — Développement MVP

**Objectif :** Coder, tester et déployer la V1.

**Ce que fait amsClaw :**
- Met en place le projet (structure, dépendances, config)
- Développe les fonctionnalités selon le PRD validé
- Écrit les tests automatisés associés (unitaires + intégration)
- Versionne sur GitHub
- Déploie (GitHub Pages, VPS, ou autre selon l'architecture)
- Documente le code et l'API

**Ams intervient :** Non

**Livrable :** Application déployée et fonctionnelle + Tests verts + Code sur GitHub

---

### Phase ⑦ — Retour & Itérations

**Objectif :** Tester le produit réel et l'améliorer.

**Ce que fait amsClaw :**
- Attend le retour d'Ams après test du MVP
- Priorise et implémente les correctifs et améliorations
- Itère par cycles courts

**Ams intervient :** ✅ **Teste le produit et donne son retour**
- Utilise l'application, note les bugs et améliorations
- amsClaw implémente
- Cycle : test → retour → correction → nouveau test

**Livrable :** Produit amélioré par itérations

---

## Récapitulatif des interventions Ams

| Phase | Ams intervient ? | Temps estimé |
|---|---|---|
| ① Idéation | Répond aux questions | 15-30 min |
| ② Expression de besoin | ✅ Validation | 10-15 min |
| ③ Benchmark | — | — |
| ④ PRD + Architecture | ✅ Validation | 15-20 min |
| ⑤ Maquette | ✅ Validation | 5 min |
| ⑥ Dev MVP | — | — |
| ⑦ Retour | ✅ Test + feedback | Selon disponibilité |

**Total temps Ams estimé :** ~45-70 min par cycle (idéation → MVP → retour)

---

## Principes directeurs

1. **Simplicité d'abord** — pas d'architecture surdimensionnée pour un MVP
2. **Tests automatisés** — chaque fonctionnalité est testée
3. **Versionné** — tout le code sur GitHub
4. **Documenté** — PRD, architecture, code commenté
5. **Itératif** — V1 minimale, améliorations progressives
6. **Pas de surprise** — chaque validation garantit qu'on va dans la bonne direction

---

## Notes ouvertes (questions à trancher plus tard)

- Hébergement : préférence pour des solutions simples (Railway, Fly.io, VPS OVH) ?
- Stack : plutôt Next.js / Laravel / Django / autre ?
- Base de données : PostgreSQL / SQLite / Supabase ?
- Paiement : Stripe / PayPal / Mobile Money (Guinée) ?
- Domaine : .com / .fr / .gn / sous-domaine ?
- Quid du support client / documentation utilisateur ?

---

*Document généré le 2026-06-18 par amsClaw — Draft en attente de relecture.*
