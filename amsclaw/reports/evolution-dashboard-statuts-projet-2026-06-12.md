# Evolution dashboard statuts projet - 2026-06-12

## Contexte

Ams souhaite continuer le dashboard apres avoir decide que les projets clotures doivent rester en memoire durable.

## Action realisee

Ajout d'une edition detaillee du statut projet dans le dashboard.

## Changements

- Ajout du champ `Statut` au formulaire projet.
- Ajout des statuts `Actif`, `En pause`, `Bloque`, `Cloture`.
- Ajout des filtres `Pause` et `Clotures` dans la vue `Projets`.
- Retour a la ligne propre des filtres quand l'ecran est etroit.
- Conservation des projets clotures dans le filtre `Tous`.
- Exclusion des projets clotures des actions prioritaires et du suivi quotidien.
- Conservation du statut choisi lors d'une creation de projet depuis modele.

## Fichiers modifies

- `amsclaw/dashboard/index.html`
- `amsclaw/dashboard/app.js`
- `amsclaw/dashboard/styles.css`
- `amsclaw/projects/dashboard-multi-agent/docs/ROADMAP.md`
- `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md`
- `amsclaw/projects/dashboard-multi-agent/README.md`

## Verification

- `node --check amsclaw/dashboard/app.js` : OK.
- Dashboard local : HTTP 200 sur `http://127.0.0.1:8787/amsclaw/dashboard/`.
- HTML et JS servis contiennent les nouveaux filtres et la normalisation des statuts projet.
