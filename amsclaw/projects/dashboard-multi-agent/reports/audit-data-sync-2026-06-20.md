# Audit synchronisation JSON / Markdown

Date : 2026-06-20

Objectif :
identifier les divergences entre la source operationnelle `dashboard-data.json` et la memoire durable Markdown sans modifier les donnees.

## Sources lues

- `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`
- `memory/active-projects.md`
- `memory/decisions.md`

## Synthese

- Projets dans le JSON : 7
- Projets dans la memoire Markdown : 7
- Projets seulement dans le JSON : 0
- Projets seulement dans la memoire Markdown : 0
- Prochaines actions divergentes : 0
- Statuts divergents : 0
- Decisions dashboard non retrouvees dans `memory/decisions.md` : 0

## Projets seulement dans le JSON

- Aucun

## Projets seulement dans la memoire Markdown

- Aucun

## Prochaines actions divergentes

- Aucune

## Statuts divergents

- Aucun

## Decisions dashboard non journalisees durablement

- Aucune

## Recommandation

Ne pas lancer de synchronisation automatique tant que les ecarts ci-dessus n'ont pas ete arbitres.
