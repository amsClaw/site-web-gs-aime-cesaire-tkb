# Controle processus AAS fusionne - 2026-06-19

Objectif :
verifier si `docs/PROCESS_AAS_FUSIONNE.md` est coherent avec la logique OpenClaw avant relecture par Ams et peaufinage Codex / GPT-5.

## Documents relus

- `README.md`
- `docs/NEXT_STEPS.md`
- `docs/PROCESS_AAS_FUSIONNE.md`

## Verdict

Le draft fusionne est coherent et exploitable comme base de travail.

Il corrige plusieurs manques du draft initial :

- distinction claire entre mode leger et mode complet ;
- roles des agents specialises ;
- points de validation dashboard ;
- livrables minimum par mode ;
- recette explicite ;
- anti-patterns pour eviter la surdocumentation.

## Points forts

- Le mode leger est defini comme mode par defaut, ce qui protege Ams contre la complexite inutile.
- Les declencheurs du mode complet sont bien listes : paiement, donnees sensibles, comptes utilisateurs, usage multi-clients, API importantes.
- Le process inclut la creation projet, la documentation, le dashboard, le backlog, le developpement et la recette.
- Les validations Ams sont rattachees a des fichiers cibles, ce qui rend le suivi actionnable.

## Points a peaufiner avec Codex / GPT-5

1. **Noms definitifs des fichiers**
   - Stabiliser les noms `IDEE.md`, `MINI_SPEC.md`, `PLAN_DEV.md`, `PRD_V1.md`, etc.

2. **Checklists de passage de phase**
   - Ajouter une mini checklist Go / No-Go pour chaque validation importante.

3. **Templates OpenClaw**
   - Transformer les templates source en versions legeres et completes.

4. **Regle de recherche web**
   - Dire quand la recherche web est obligatoire : marche, prix, concurrence, reglementation, dependances techniques recentes.

5. **Test pilote**
   - Choisir un premier projet simple pour verifier que le mode leger ne ralentit pas l'execution.

## Risques

- Le document est deja assez complet : attention a ne pas le transformer en procedure trop lourde.
- Les templates peuvent devenir plus importants que l'execution si on les standardise trop vite.
- Le dashboard devra suivre les validations sans devenir un outil administratif pesant.

## Recommandation

Prochaine action :

```text
valider le processus fusionne comme base V0, puis demander a Codex / GPT-5 de produire une V0.1 plus nette avec checklists et templates.
```

Ne pas attendre une version parfaite avant de le tester sur un petit projet pilote.
