# Espace amsClaw

Objectif :
Centraliser les projets, dashboards, automatisations, rapports et ressources de travail sans melanger ces elements avec les fichiers de configuration du workspace OpenClaw.

## Structure

- `projects/` : projets actifs ou en construction.
- `dashboard/` : fichiers du dashboard multi-agents.
- `automation/` : scripts et automatisations.
- `reports/` : rapports generes, points d'avancement et syntheses.
- `resources/` : documents de reference, templates et supports utiles.
- `archive/` : elements termines ou retires de l'espace actif.

## Regles

- Les fichiers racine du workspace restent reserves a la configuration OpenClaw.
- Tout nouveau projet doit etre cree dans `amsclaw/projects/`.
- Tout projet doit avoir un objectif, un statut, une prochaine action et une documentation minimale.
- Tout projet doit garder une separation claire entre documentation, code, donnees, scripts, rapports et archives.
- Les decisions importantes doivent etre reportees dans `memory/decisions.md`.
- Les projets termines ou abandonnes doivent etre documentes avant archivage.

## Reference projet

- Index de reprise : `amsclaw/PROJECTS_INDEX.md`
- Guide d'organisation : `amsclaw/PROJECTS_GUIDE.md`
- Guide OpenClaw : `amsclaw/resources/GUIDE_OPENCLAW.html`
- Modele de README projet : `amsclaw/resources/project-readme-template.md`
