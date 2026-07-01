# Templates OpenClaw AAS

> Version : V0.1
> Date : 2026-06-19
> Projet lie : Automatisation projet AAS

## Objectif

Ce dossier contient les templates reutilisables du process AAS OpenClaw.

Ils remplacent progressivement les prompts et templates manuels du dossier source `docs/automatisation Projets SAAS/` par des versions adaptees a amsClaw :

- agents specialises plutot qu'outils nommes ;
- sorties Markdown standardisees ;
- distinction mode leger / mode complet ;
- validations Ams visibles dans le dashboard ;
- garde-fous sur securite, couts, donnees sensibles et publication.

## Templates disponibles

### Ideation

- `IDEATION_PROJET_LEGER.md` : clarifier une petite idee sans surdocumenter.
- `IDEATION_SAAS_COMPLET.md` : adapter le SaaS Idea Accelerator pour un vrai projet SaaS.
- `ANALYSE_BUSINESS_MARCHE.md` : analyser opportunite, cible, concurrence, monetisation et risques.
- `BRIEF_PRODUIT.md` : transformer idee + benchmark en brief produit exploitable.

### Conception

- `ARCHITECTURE_LIGHT.md` : cadrage technique minimal pour petit projet.
- `ARCHITECTURE_COMPLETE.md` : architecture complete pour SaaS/app complexe.
- `FRONT_SPEC_LIGHT.md` : spec UX courte pour site, outil simple ou MVP.
- `FRONT_SPEC_COMPLETE.md` : spec UX complete pour produit avec parcours riches.

## Regle d'utilisation

Le mode leger reste le mode par defaut.

Utiliser les templates complets seulement si le projet comporte comptes utilisateurs, paiement, donnees sensibles, workflows metier, usage multi-clients, API importantes ou ambition SaaS durable.

