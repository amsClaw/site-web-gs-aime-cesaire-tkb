# Cahier de recette light - Site web Groupe Scolaire Aime Cesaire TKB

Date de creation : 2026-06-20

Statut : **V1 fige et validee par Ams** le 2026-06-20

Derniers commits appliques avant gel :
- `42cbcaa` : retrait mention WhatsApp dans admissions
- `48b9f94` : icone Facebook en SVG inline
- `f2e9b24` : icone Messenger en SVG inline, classe refactoree en `icon-svg`

URL de test : https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/

Process : AAS V0.1 - mode leger

## Perimetre recu

Pages controlees :
- `src/index.html`
- `src/notre-ecole.html`
- `src/admissions.html`
- `src/contact.html`

Assets controles :
- `src/assets/css/styles.css`
- `src/assets/js/main.js`
- `src/assets/logo-ecole-aime-cesaire-transparent.png`
- `src/assets/favicon-ecole.png`
- `src/assets/photos/hero-entree.jpg`
- `src/assets/photos/cour-activite.jpg`
- `src/assets/photos/salle-maternelle.jpg`
- `src/assets/photos/salle-informatique.jpg`
- `src/assets/photos/bibliotheque.jpg`

## Tests realises

### Retours Ams traites pendant la recette

Retours recus :
- hero desktop trop haut sur la page d'accueil ;
- logo trop petit et peu lisible dans l'en-tete ;
- lien Facebook a afficher avec le logo bleu Facebook.

Corrections appliquees (3 rounds) :

**Round 1** (commit `4f41a54`) :
- hauteur du hero desktop reduite ;
- espacement vertical du hero reduit ;
- logo agrandi dans l'en-tete avec fond blanc pour ameliorer la lisibilite ;
- ajout de `assets/facebook-blue.svg` ;
- liens Facebook mis a jour avec l'icone bleue.

**Round 2** (commit `48b9f94`) :
- icone Facebook : remplacement du `<img>` par SVG inline pour corriger le rendu sur iPhone ;
- passage a `width: 1em` + `vertical-align: -0.125em` pour alignement parfait avec le texte.

**Round 3** (commits `42cbcaa`, `f2e9b24`) :
- retrait de la mention WhatsApp dans la page admissions ;
- icone Messenger ajoutee en SVG inline sur le bouton Messenger de la page contact ;
- classe `.icon-facebook` refactoree en `.icon-svg` pour mutualisation.

Verification :
- builds GitHub Pages successifs ;
- tous les assets et SVG inline accessibles sur l'URL publique.

### Publication GitHub Pages

Depot GitHub :
- https://github.com/amsClaw/site-web-gs-aime-cesaire-tkb

URL de test :
- https://amsclaw.github.io/site-web-gs-aime-cesaire-tkb/

Controle effectue :
- GitHub Pages active sur la branche `main`, dossier racine ;
- build GitHub Pages termine avec succes ;
- URL publique testee en HTTP 200.

### Disponibilite HTTP locale

Serveur local temporaire lance sur `http://127.0.0.1:8127/`, puis arrete apres test.

Resultats :
- `index.html` : HTTP 200
- `notre-ecole.html` : HTTP 200
- `admissions.html` : HTTP 200
- `contact.html` : HTTP 200
- `assets/css/styles.css` : accessible
- `assets/js/main.js` : accessible
- `assets/photos/hero-entree.jpg` : HTTP 200

### Navigation

Liens internes presents :
- Accueil
- Notre ecole
- Admissions
- Contact

Navigation mobile :
- bouton menu cree ;
- JS actif via `assets/js/main.js` ;
- page active marquee via `aria-current`.

### Contact

Controle effectue :
- email `mailto:aimecesairetkb@gmail.com` present ;
- lien Facebook present ;
- lien Messenger present ;
- deux numeros de telephone affiches ;
- lien Google Maps confirme present.

### Google Maps

Controle effectue :
- petit bloc Google Maps integre via `<iframe>` sur `contact.html` ;
- lien `Ouvrir dans Google Maps` present ;
- carte basee sur les coordonnees confirmees `9.691250, -13.560333` ;
- lien externe `https://www.google.com/maps?q=9.691250,-13.560333`.

Point de vigilance :
- verifier visuellement que Google Maps affiche bien l'emplacement attendu.

### Photos

Photos web generees dans `src/assets/photos/`.

Tailles observees :
- hero : environ 156 Ko ;
- autres photos : environ 212 Ko a 368 Ko.

Resultat :
- tailles acceptables pour une V1 statique ;
- originaux conserves dans `data/photos-source/inbox-2026-06-20/`.

## Tests non realises

- Controle visuel Playwright : non realise car Playwright n'est pas installe dans le workspace.
- Validation visuelle humaine mobile/tablette/desktop : a faire par Ams.
- Verification visuelle Google Maps par Ams.

## Points bloquants avant production

- WhatsApp definitif : l'ecole decide si elle veut l'afficher (option non retenue pour la V1).
- Relecture des textes et contacts par l'ecole cliente avant mise en ligne definitive.

## Verdict V1

**V1 fige et validee par Ams le 2026-06-20.**

Non OK pour mise en production tant que l'ecole cliente n'a pas valide les textes et les contacts.

Prochaine etape envisagee (V1.1) :
- Faire valider le site par l'ecole cliente directement.
- Preparer le deploiement sur un nom de domaine personnalise si demande.
- WhatsApp a confirmer avec l'ecole.
- Ajouts evolutifs possibles selon besoins remontes (photos supplementaires, actualites, etc.).
