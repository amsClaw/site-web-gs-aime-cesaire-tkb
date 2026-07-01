# Cahier de recette light - Site web Groupe Scolaire Aime Cesaire TKB

Date de creation : 2026-06-20

Statut : recette locale initiale realisee par amsClaw

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

### Retours Ams traites apres publication test

Retours recus :
- hero desktop trop haut sur la page d'accueil ;
- logo trop petit et peu lisible dans l'en-tete ;
- lien Facebook a afficher avec le logo bleu Facebook.

Corrections appliquees :
- hauteur du hero desktop reduite ;
- espacement vertical du hero reduit ;
- logo agrandi dans l'en-tete avec fond blanc pour ameliorer la lisibilite ;
- ajout de `assets/facebook-blue.svg` ;
- liens Facebook mis a jour avec l'icone bleue.

Verification :
- commit `4f41a54` pousse sur GitHub ;
- build GitHub Pages termine avec succes ;
- CSS corrige et asset Facebook accessibles sur l'URL publique.

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
- carte basee sur les coordonnees confirmees `9.675889, -13.542859` ;
- lien externe `https://maps.app.goo.gl/xNSVErC1EoUhQYqr9`.

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

- WhatsApp definitif a confirmer si l'ecole veut l'afficher.
- Relecture finale des textes et contacts par Ams.

## Verdict recette locale initiale

OK pour revue locale par Ams.

Non OK pour mise en production tant que la revue finale Ams n'est pas terminee.
