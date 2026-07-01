# Plan de developpement - Site web Groupe Scolaire Aime Cesaire TKB

Date de creation : 2026-06-20

Statut : valide par Ams le 2026-06-20

Process : AAS V0.1 - mode leger

## Choix technique recommande

Creer un site statique simple en HTML, CSS et JavaScript leger.

Structure V1 :
- `index.html`
- `notre-ecole.html`
- `admissions.html`
- `contact.html`
- `assets/` pour logo, photos optimisees, CSS et JS.

Pas de framework au demarrage.

## Pourquoi ce choix est suffisant

Le besoin est un site vitrine :
- pas de compte utilisateur ;
- pas de paiement ;
- pas de base de donnees ;
- pas de back-office ;
- pas de synchronisation CRM ;
- pas de contenu dynamique obligatoire.

HTML/CSS/JS suffit pour livrer vite, garder le site portable et permettre un hebergement gratuit plus tard.

## Structure prevue

```text
src/
├── index.html
├── notre-ecole.html
├── admissions.html
├── contact.html
├── assets/
│   ├── logo-ecole-aime-cesaire-transparent.png
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── photos/
│       ├── hero-entree.jpg
│       ├── cour-activite.jpg
│       ├── salle-maternelle.jpg
│       ├── salle-informatique.jpg
│       └── bibliotheque.jpg
└── README_SITE.md
```

Sources conservees :

```text
data/photos-source/inbox-2026-06-20/
```

Les photos sources ne doivent pas etre modifiees. Les versions web seront generees dans `src/assets/photos/`.

## Donnees manipulees

### Contenus texte

- Nom : `Groupe Scolaire Aime Cesaire TKB`
- Adresse : `Samatra T8 Nord`
- Email : `aimecesairetkb@gmail.com`
- Telephones : `+224 628 780 205` / `+224 614 639 274`
- Mission : egalite des chances par l'education
- Cycles : maternelle, primaire, college
- Effectif : environ 370 eleves
- Partenariats : France Volontaires, La Guilde, Le Bouquin Volant, Service Civique

### Medias

Photos source :
- entree principale ;
- cour ;
- salle maternelle ;
- salle informatique ;
- bibliotheque.

Logo :
- `src/assets/logo-ecole-aime-cesaire-transparent.png`

### Liens externes

- Facebook : `https://www.facebook.com/share/1CvNrkTWhy/?mibextid=wwXIfr`
- Messenger : `https://www.facebook.com/messages/t/100084445643251/`
- Google Maps : petit bloc de carte integree avec coordonnees `9.691250, -13.560333`, plus lien externe `https://www.google.com/maps?q=9.691250,-13.560333`

## Flux principal

1. Un parent arrive sur la page d'accueil.
2. Il voit le nom, la photo principale, la mission et les cycles.
3. Il consulte `Notre ecole` pour verifier le cadre, la pedagogie et les partenariats.
4. Il consulte `Admissions` pour comprendre comment demander des informations.
5. Il va sur `Contact` pour envoyer un email, ouvrir Facebook/Messenger ou visualiser l'ecole dans un petit bloc Google Maps.

## Formulaire de contact

Recommandation V1 : ne pas creer de formulaire backend.

Raison :
- un formulaire statique fiable necessite un service externe ou un backend ;
- cela ajouterait une dependance inutile ;
- l'email, Messenger et les telephones suffisent pour une V1 statique.

Option retenue pour V1 :
- bouton email `mailto:aimecesairetkb@gmail.com` ;
- bouton Facebook ;
- bouton Messenger ;
- petit carre Google Maps integre ;
- bouton/lien `Ouvrir dans Google Maps` ;
- liens telephoniques `tel:` pour les deux numeros.

## Carte Google Maps

La page `contact.html` doit afficher une carte compacte integree directement dans la page.

Implementation prevue :
- utiliser un `<iframe>` Google Maps base sur les coordonnees confirmees ;
- afficher la carte dans un conteneur carre ou quasi carre ;
- largeur responsive `100%` ;
- hauteur cible entre `260px` et `340px` selon le viewport ;
- bordure et coins sobres, sans surcharger la page ;
- ajouter sous la carte un lien texte ou bouton `Ouvrir dans Google Maps`.

Coordonnees cible :

```text
9.691250, -13.560333
```

Lien externe cible :

```text
https://www.google.com/maps?q=9.691250,-13.560333
```

## Preparation des photos

Actions prevues :
1. Selectionner 5 photos prioritaires.
2. Copier les originaux depuis `data/photos-source/` vers `src/assets/photos/`.
3. Renommer les fichiers avec des noms lisibles.
4. Optimiser les dimensions pour le web :
   - hero : largeur cible 1600 px ;
   - images de contenu : largeur cible 1000 a 1200 px ;
   - conserver une qualite suffisante.
5. Ajouter des textes alternatifs utiles.

Outil local possible :
- `sips` sur macOS pour redimensionner sans ajouter de dependance.

## SEO minimum

Chaque page doit avoir :
- un `<title>` clair ;
- une meta description ;
- une structure de titres logique ;
- le nom officiel de l'ecole ;
- les mots locaux : Samatra, Conakry, Guinee.

Pages principales :
- Accueil : presentation generale.
- Notre ecole : mission, cycles, cadre.
- Admissions : demande d'information.
- Contact : adresse, email, Facebook, Google Maps.

## Accessibilite minimum

- Contraste lisible.
- Navigation clavier basique.
- Textes alternatifs sur les images.
- Boutons/liens avec libelles explicites.
- Pas de texte incruste comme seule source d'information.

## Tests minimum

### Tests manuels

- Ouvrir chaque page localement.
- Verifier tous les liens de navigation.
- Verifier les liens email, Facebook, Messenger et Google Maps.
- Verifier que le petit bloc Google Maps s'affiche correctement et reste lisible sur mobile.
- Verifier l'affichage mobile, tablette et desktop.
- Verifier que les images ne sont pas trop lourdes.
- Verifier que les deux numeros de telephone sont presents et cliquables.

### Tests techniques simples

- Controle HTML basique.
- Recherche des liens casses internes.
- Controle des chemins images.
- Controle responsive via navigateur.

## Risques techniques

- **Risque :** images trop lourdes.
  - **Mitigation :** generer des versions web optimisees.
- **Risque :** lien court Google Maps difficile a embarquer directement.
  - **Mitigation :** utiliser les coordonnees extraites pour l'iframe et conserver le lien court comme bouton externe.
- **Risque :** formulaire statique non fiable.
  - **Mitigation :** ne pas creer de formulaire backend en V1.
- **Risque :** confusion entre telephone et WhatsApp.
  - **Mitigation :** afficher les numeros comme telephones simples tant que l'usage WhatsApp n'est pas confirme.
- **Risque :** duplication avec le CRM.
  - **Mitigation :** aucun lien technique avec le CRM en V1.

## Hors perimetre technique

- Back-office d'administration.
- Blog dynamique.
- Galerie administrable.
- Formulaire avec base de donnees.
- Paiement en ligne.
- Espace parents.
- Synchronisation CRM.
- Publication publique definitive avant revue finale Ams.

## Basculer en mode complet ?

Non.

Le projet reste en mode leger car il ne contient pas :
- authentification ;
- paiement ;
- donnees sensibles ;
- workflow metier ;
- base de donnees ;
- API critique ;
- multi-utilisateurs.

## Prochaine action developpement

Plan valide. Prochaines actions :

1. Optimiser et copier les photos dans `src/assets/photos/`.
2. Creer la structure HTML/CSS/JS.
3. Construire les 4 pages.
4. Tester localement.
5. Produire `docs/CAHIER_RECETTE_LIGHT.md`.

Informations a mettre a jour plus tard avant production :
- eventuel WhatsApp definitif ;
- eventuel ajustement de libelle d'adresse si Ams souhaite afficher plus que `Samatra T8 Nord`.
