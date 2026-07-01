# Reprise projet site web - 2026-06-21

## Actions realisees

- Lecture de `amsclaw/PROJECTS_INDEX.md`.
- Lecture de la memoire projet dans `memory/active-projects.md` et `memory/2026-06-20.md`.
- Lecture de `README.md`, `docs/NEXT_STEPS.md` et `docs/CAHIER_RECETTE_LIGHT.md`.
- Verification de l'URL GitHub Pages.
- Verification de la presence en ligne de la galerie, de la photo equipe, de Messenger et du retrait de WhatsApp.
- Synchronisation Git locale par `git fetch origin` dans `src/`.
- Mise a jour de `README.md` pour aligner le statut avec la V1 figee.
- Creation de `docs/VALIDATION_ECOLE.md`.
- Integration locale de la nouvelle localisation Google fournie par Ams : `9°41'28.5"N 13°33'37.2"W`, convertie en `9.691250, -13.560333`.
- Publication GitHub Pages de la nouvelle localisation via le commit `136e8b4` (`fix(contact): update Google Maps location`).

## Etat constate

- Site public disponible en HTTP 200 :
  https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/
- Branche distante `origin/main` a jour jusqu'au commit `a55b69a`.
- La V1 est validee par Ams, mais pas encore validee par l'ecole cliente.
- La nouvelle localisation est publiee sur GitHub Pages et verifiee sur `contact.html`.

## Point de vigilance

Ne pas considerer le site comme definitivement en production tant que l'ecole n'a pas valide les textes, contacts, photos et la localisation.

## Prochaine action

Faire valider par l'ecole que la nouvelle localisation Google Maps pointe bien au bon endroit.
