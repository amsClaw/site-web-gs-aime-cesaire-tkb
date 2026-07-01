# Site web GS Aimé Césaire TKB

## Objectif

Créer le site web de l'école **GS Aimé Césaire TKB** en Guinée Conakry : vitrine de présentation de l'école, de ses activités, de ses offres pédagogiques, et point d'entrée pour les parents et prospects.

## Statut

Projet cree le 2026-06-20.

Phase : recette (Phase 5 du process AAS leger).

Processus applique : AAS V0.1 mode leger.

## Prochaine action

Faire la revue locale de la V1 avec `docs/CAHIER_RECETTE_LIGHT.md`, puis corriger les ajustements avant toute mise en production.

## Périmètre V1

V1 cadrée dans `docs/MINI_SPEC.md` :

1. Page d'accueil de présentation (mission, valeurs, photos, cycles)
2. Page "Notre école" (infos, classes, cycles)
3. Page "Admissions" (procédure, documents requis, contacts)
4. Page "Contact" (adresse, email, téléphones, Facebook/Messenger, Google Maps)
5. Design adapté mobile
6. Hébergement simple et économique

## Sources contenu

- Plaquette ecole recue le 2026-06-20 : `data/plaquette-ecole.pdf`
- Note d'extraction contenu : `docs/SOURCE_PLAQUETTE.md`
- Page Facebook actuelle : `docs/SOURCE_FACEBOOK.md`
- Photos source recues : `docs/SOURCE_PHOTOS.md`
- Logo repris du projet CRM : `src/assets/logo-ecole-aime-cesaire-transparent.png`

## Liens avec le projet CRM

Ce site web est destiné à la même école que le CRM créé dans `amsclaw/projects/creation-crm-pour-une-ecole/`.

Des passerelles futures sont possibles :
- Formulaire de pré-inscription → alimente le CRM
- Lien "Espace parents" → futur portail connecté au CRM
- Page "Tarifs et frais scolaires" → cohérente avec le module de suivi des paiements

**Attention :** la V1 du site doit rester indépendante du CRM. Les intégrations viendront plus tard.

## Methode projet

Processus AAS V0.1 mode leger :

1. Idee → `docs/IDEE.md` ✅ validee le 2026-06-20
2. Mini spec → `docs/MINI_SPEC.md` ✅ validee le 2026-06-20
3. Plan dev → `docs/PLAN_DEV.md` ✅ valide le 2026-06-20
4. Developpement ✅ realise le 2026-06-20
5. Recette → `docs/CAHIER_RECETTE_LIGHT.md` ← nous sommes ici

Validations Ams attendues :
- Valider le besoin (IDEE.md) ✅ fait le 2026-06-20
- Valider la mini spec (MINI_SPEC.md) ✅ fait le 2026-06-20
- Valider le plan dev (PLAN_DEV.md) ✅ fait le 2026-06-20
- Valider la recette finale ← prochaine validation attendue

## Organisation

```text
docs/       # specs, notes, décisions
src/        # code source du site
data/       # contenus, médias, exports
scripts/    # scripts de build, déploiement
tests/      # tests et recette
reports/    # rapports d'avancement
archive/    # anciennes versions
```

## Lancement ou utilisation

Version locale :
- `src/index.html`

Version de test GitHub Pages :
- https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/

Depot GitHub :
- https://github.com/amsClaw/site-web-gs-aime-cesaire-tkb

## Decisions importantes

- 2026-06-20 : projet cree depuis Telegram, lie au CRM ecole existant.
- 2026-06-20 : Ams confirme l'utilisation du process AAS V0.1 mode leger.
- 2026-06-20 : `docs/IDEE.md` produite via le template IDEATION_PROJET_LEGER.
- 2026-06-20 : le site doit rester independant du CRM en V1.
- 2026-06-20 : plaquette ecole recue et conservee comme source principale pour la mini-spec ; logo repris du CRM.
- 2026-06-20 : Ams valide `docs/IDEE.md`; `docs/MINI_SPEC.md` creee.
- 2026-06-20 : Ams valide `docs/MINI_SPEC.md`; `docs/PLAN_DEV.md` cree.
- 2026-06-20 : Ams valide `docs/PLAN_DEV.md`; lancement de la Phase 4 developpement.
- 2026-06-20 : Ams fournit le lien Google Maps confirme ; carte contact mise a jour avec les coordonnees `9.675889, -13.542859`.
- 2026-06-20 : V1 locale statique creee dans `src/` ; `docs/CAHIER_RECETTE_LIGHT.md` produit.
- 2026-06-20 : V1 de test publiee sur GitHub Pages : https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/

## Risques et points de vigilance

- Risque : vouloir trop de pages ou fonctionnalités dès le départ.
  - Mitigation : garder une V1 type "vitrine" avec 3-4 pages.
- Risque : mélanger le site et le CRM dans le même projet technique.
  - Mitigation : deux projets distincts, pas de dépendance technique en V1.
- Risque : hébergement coûteux ou complexe.
  - Mitigation : partir sur un site statique (HTML/CSS/JS) hébergé sur GitHub Pages, Netlify ou équivalent gratuit.

## Liens utiles

- Projet CRM école : `amsclaw/projects/creation-crm-pour-une-ecole/`
- Index des projets : `amsclaw/PROJECTS_INDEX.md`
