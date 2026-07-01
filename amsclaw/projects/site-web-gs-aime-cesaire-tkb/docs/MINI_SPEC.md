# Mini spec - Site web Groupe Scolaire Aime Cesaire TKB

Date de creation : 2026-06-20

Statut : validee par Ams le 2026-06-20

Process : AAS V0.1 - mode leger

## Objectif UX

Donner a l'ecole une presence web officielle, claire et rassurante, consultable facilement sur mobile par les parents et prospects.

Le site doit :
- presenter l'ecole en moins d'une minute ;
- montrer le cadre reel avec des photos ;
- expliquer les cycles proposes ;
- rendre le contact simple ;
- rester statique, rapide et peu couteux.

## Sources validees

- Besoin valide : `docs/IDEE.md`
- Plaquette : `docs/SOURCE_PLAQUETTE.md`
- Photos : `docs/SOURCE_PHOTOS.md`
- Facebook : `docs/SOURCE_FACEBOOK.md`
- Logo : `src/assets/logo-ecole-aime-cesaire-transparent.png`

## Informations confirmees

- Nom a afficher : `Groupe Scolaire Aime Cesaire TKB`
- Adresse : `Samatra T8 Nord`
- Email : `aimecesairetkb@gmail.com`
- Telephones : `+224 628 780 205` / `+224 614 639 274`
- Photos : droit d'usage confirme par Ams
- Localisation Google Maps confirmee : `https://www.google.com/maps?q=9.691250,-13.560333`
- Coordonnees GPS extraites : `9.691250, -13.560333`
- Localisation : prevoir un petit bloc de carte Google Maps integree sur la page contact, avec lien externe en secours

## Pages V1

| Page | Objectif | Contenu principal | Action attendue |
|---|---|---|---|
| Accueil | Donner confiance rapidement | Hero avec photo, mission, chiffres cles, cycles, appel au contact | Contacter l'ecole ou explorer les pages |
| Notre ecole | Presenter l'identite et le cadre | Mission, valeurs, organisation scolaire, cadre securise, partenariats | Comprendre le serieux de l'etablissement |
| Admissions | Expliquer comment entrer en contact | Message simple, procedure a confirmer, documents a venir, contacts ecole | Demander des infos |
| Contact | Faciliter le premier contact | Adresse, email, telephones, Facebook/Messenger, petit carre Google Maps integre | Envoyer un message ou localiser l'ecole |

## Page Accueil

### Contenu attendu

- Logo et nom officiel.
- Photo forte : entree principale ou cour.
- Accroche proposee :
  `L'egalite des chances par l'education, a Samatra.`
- Sous-texte :
  `Maternelle, primaire et college dans un cadre franco-guineen propre, securise et bienveillant.`
- Chiffres / preuves :
  - 370 eleves
  - 3 cycles scolaires
  - Maternelle, primaire, college
- Apercu des cycles :
  - Maternelle : eveil, langage, motricite, coin jeux.
  - Primaire : fondamentaux, anglais, informatique.
  - College : approfondissement et preparation au lycee.
- Bloc contact court :
  - `Samatra T8 Nord`
  - `aimecesairetkb@gmail.com`
  - `+224 628 780 205`
  - `+224 614 639 274`

### Photos candidates

- `photo entrée principale ecole gs aime cesaire.jpg`
- `474810141_584549731036543_5693363171581819378_n.jpg`
- `469977057_553571270801056_3594892585241134358_n.jpg`

## Page Notre ecole

### Contenu attendu

- Mission :
  `Offrir aux enfants de Samatra un enseignement rigoureux dans un cadre securise et bienveillant.`
- Valeurs :
  - egalite des chances ;
  - discipline bienveillante ;
  - exigence pedagogique ;
  - ouverture franco-guineenne.
- Organisation scolaire :
  - maternelle ;
  - primaire ;
  - college.
- Priorites pedagogiques :
  - francais ;
  - mathematiques ;
  - informatique ;
  - anglais.
- Cadre de vie :
  - grande cour ;
  - bibliotheque / lecture ;
  - salle informatique ;
  - locaux propres ;
  - videosurveillance ;
  - equipe jeune et dynamique.
- Partenariats :
  - France Volontaires ;
  - La Guilde ;
  - Le Bouquin Volant ;
  - Service Civique.

### Photos candidates

- Salle maternelle : `469827470_553563220801861_2641045927797198720_n.jpg`
- Informatique : `475727681_589232170568299_5223376333149941088_n.jpg`
- Bibliotheque : `475841148_589232180568298_4095735046103596941_n.jpg`
- Bibliotheque / Guinee : `475981084_589232600568256_5011170415871012928_n.jpg`

## Page Admissions

### Objectif

Rassurer les familles et leur donner un point de contact, sans inventer une procedure qui n'est pas encore confirmee.

### Contenu attendu

- Message simple :
  `Les inscriptions et demandes d'information se font directement aupres de l'ecole.`
- Procedure V1 provisoire :
  1. Contacter l'ecole.
  2. Preciser le niveau souhaite.
  3. Prevoir un echange avec l'administration.
  4. Confirmer les documents requis.
- Bloc `Documents a confirmer` :
  - acte de naissance ;
  - bulletins ou dossier scolaire ;
  - photos d'identite ;
  - informations parent / tuteur ;
  - autres documents selon niveau.

Ces elements restent a valider avec Ams avant publication.

## Page Contact

### Contenu attendu

- Nom : `Groupe Scolaire Aime Cesaire TKB`
- Adresse : `Samatra T8 Nord`
- Email : `aimecesairetkb@gmail.com`
- Telephones : `+224 628 780 205` / `+224 614 639 274`
- Lien Facebook :
  `https://www.facebook.com/share/1CvNrkTWhy/?mibextid=wwXIfr`
- Lien Messenger possible :
  `https://www.facebook.com/messages/t/100084445643251/`
- Carte Google Maps :
  - afficher un petit carre de carte integree directement dans la page ;
  - format cible : bloc compact, environ carre sur mobile et desktop ;
  - garder un lien `Ouvrir dans Google Maps` en dessous ;
  - lien externe cible : `https://www.google.com/maps?q=9.691250,-13.560333` ;
  - coordonnees cible iframe : `9.691250, -13.560333`.

### Garde-fou

Ne pas mettre le site en production tant que la revue finale Ams n'est pas validee.

## Direction visuelle

### Style

- Sobre, scolaire, rassurant.
- Priorite aux vraies photos de l'ecole.
- Design clair, lisible sur mobile.
- Eviter une page trop marketing ou trop chargee.

### Couleurs possibles

S'appuyer sur :
- le logo de l'ecole ;
- les couleurs visibles dans l'ecole : bleu, jaune, rouge, vert ;
- une base claire pour garder une lecture facile.

### Typographie

- Titres lisibles et institutionnels.
- Texte simple, court, oriente parents.
- Pas de jargon.

## Medias

### Photos utilisables en V1

Priorite :
1. Entree principale.
2. Cour.
3. Salle maternelle.
4. Salle informatique.
5. Bibliotheque.

### Photos a eviter ou a utiliser avec prudence

- Photos trop centrees sur les enfants si le cadrage n'apporte pas d'information sur l'ecole.
- Ancienne affiche 2023-2024 : ne pas publier comme contenu principal, car elle est datee.

## SEO minimum

Mots et expressions a inclure naturellement :
- Groupe Scolaire Aime Cesaire TKB
- ecole a Samatra
- ecole a Conakry
- ecole franco-guineenne
- maternelle primaire college
- ecole francophone Guinee

Meta description proposee :
`Le Groupe Scolaire Aime Cesaire TKB accueille les eleves de la maternelle au college a Samatra T8 Nord, Conakry, dans un cadre franco-guineen propre, securise et bienveillant.`

## Contraintes

- Site statique.
- Responsive mobile / tablette / desktop.
- Pas de back-office.
- Pas de base de donnees.
- Pas de paiement.
- Pas de synchronisation CRM en V1.
- Pas de mise en production avant revue finale Ams.

## Etats vides / erreurs / confirmations

- Si formulaire de contact en V1 : afficher une confirmation claire apres envoi.
- Si aucun formulaire n'est retenu : utiliser des liens email, Facebook/Messenger et telephone.
- Google Maps utilise le lien confirme par Ams et les coordonnees extraites du lien court.

## Criteres d'acceptation UX

- Le site presente clairement l'ecole des la premiere vue.
- Le nom officiel est affiche correctement.
- Les cycles maternelle, primaire et college sont visibles.
- Les photos montrent un cadre reel et rassurant.
- Les coordonnees confirmees sont coherentes.
- Les deux numeros de telephone confirmes sont visibles sur la page contact.
- La page contact contient l'adresse, l'email, Facebook/Messenger, un petit carre Google Maps integre et un lien d'ouverture Google Maps.
- Le site est lisible sur mobile.
- Aucun element hors V1 n'est introduit.

## Points a valider par Ams

1. Structure des 4 pages.
2. Textes principaux proposes.
3. Photos prioritaires.
4. Usage de Facebook/Messenger comme canal de contact.
5. Formulaire de contact ou liens directs uniquement.
6. Procedure d'admission et documents demandes.
7. Strategie Google Maps : petit carre de carte embarquee avec coordonnees confirmees et lien Google Maps fourni par Ams.

## Prochaine etape

Phase suivante lancee : produire et valider `docs/PLAN_DEV.md`.
