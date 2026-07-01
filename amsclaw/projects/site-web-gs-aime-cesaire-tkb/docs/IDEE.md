# Idee projet

## Resume en une phrase

Creer un site vitrine pour l'ecole GS Aime Cesaire TKB a Samatra, Conakry, afin qu'elle dispose d'une presence en ligne propre, credible et mobile, capable de presenter l'ecole, rassurer les familles et faciliter le premier contact.

## Probleme concret

L'ecole dispose d'un CRM local et d'une presence Facebook, mais pas encore d'un site web officiel :
- Les parents et prospects ne peuvent pas decouvrir l'ecole facilement.
- Les informations (mission, cycles, cadre de vie, admissions, contacts) sont dispersees entre la plaquette, Facebook et les supports visuels.
- La page Facebook actuelle ressemble davantage a un profil qu'a une page institutionnelle complete.
- L'ecole n'a pas de point d'entree numerique pour les nouvelles familles.
- Pas d'outil pour recevoir des demandes de contact ou de pre-inscription.
- Les coordonnees visibles dans les sources etaient incoherentes ; Ams a confirme les informations a utiliser pour la suite du cadrage.

## Cible

- Parents d'eleves actuels (information : calendrier, contacts).
- Parents prospects recherchant une ecole en Guinee Conakry.
- Familles de Samatra / Conakry qui veulent verifier rapidement le serieux de l'ecole.
- Partenaires, volontaires ou visiteurs cherchant une presentation claire de l'ecole.

## Resultat minimum utile

Un site accessible en ligne avec :
- une page d'accueil presentant l'ecole ;
- une presentation claire de la mission : egalite des chances par l'education ;
- les cycles proposes : maternelle, primaire, college ;
- les points forts : enseignement en francais, mathematiques, informatique, anglais, cadre propre et securise ;
- quelques photos validees montrant l'entree, les salles, la cour, la bibliotheque ou l'informatique ;
- les informations pratiques confirmees (adresse, email, telephones, Facebook / Messenger) ;
- une localisation Google Maps confirmee pour l'adresse ;
- la possibilite de contacter l'ecole (lien direct, formulaire simple ou canal Facebook/Messenger).

## Informations deja recoltees

Sources disponibles :
- `docs/SOURCE_PLAQUETTE.md` : source principale de contenu.
- `docs/SOURCE_FACEBOOK.md` : presence Facebook actuelle et activites visibles.
- `docs/SOURCE_PHOTOS.md` : photos deposees par Ams.

Elements solides :
- Ecole franco-guineenne situee a Samatra, banlieue de Conakry.
- Cycles : maternelle, primaire, college.
- Effectif indique : environ 370 eleves.
- Mission : offrir aux enfants de Samatra un enseignement rigoureux, securise et bienveillant.
- Priorites pedagogiques : francais, mathematiques, informatique, anglais.
- Cadre de vie : grande cour, coin jeux maternelle, locaux propres, videosurveillance, equipe jeune et dynamique.
- Partenariats : France Volontaires, La Guilde, Le Bouquin Volant, Service Civique.
- Facebook actuel : profil `EcoleAime Cesaire`, ID `100084445643251`, lien Messenger possible.
- Activite Facebook utile : concours de lecture et de mathematiques du 3 avril 2026.
- Photos disponibles : entree principale, salle maternelle, cour, activites, salle informatique, bibliotheque.

Informations confirmees par Ams :
- Nom exact a afficher : `Groupe Scolaire Aime Cesaire TKB`.
- Adresse precise : `Samatra T8 Nord`.
- Email officiel : `aimecesairetkb@gmail.com`.
- Telephones : `+224 628 780 205` / `+224 614 639 274`.
- Site non destine a une mise en production immediate tant que les coordonnees definitives ne sont pas confirmees.
- Droit d'usage des photos : oui, l'ecole a le droit d'utiliser les photos transmises.
- Localisation Google Maps confirmee : `https://maps.app.goo.gl/xNSVErC1EoUhQYqr9`.
- Coordonnees extraites du lien : `9.675889, -13.542859`.

Informations encore a confirmer :
- Telephone officiel definitif et eventuel numero WhatsApp.
- Procedure d'admission et documents demandes.

## Perimetre V1

1. **Page d'accueil** : presentation de l'ecole, mission, photo.
2. **Page "Notre ecole"** : cycles proposes, pedagogie, cadre de vie, valeurs.
3. **Page "Admissions"** : procedure, documents requis, contact (a confirmer).
4. **Page "Contact"** : adresse, email, telephones, Facebook/Messenger et localisation Google Maps.
5. **Design responsive** (adaptable mobile/tablette/desktop).
6. **Site statique** : HTML/CSS/JS pur, hebergement gratuit (GitHub Pages ou Netlify).
7. **Photos optimisees** : selection limitee de photos validees, avec preference pour les lieux et equipements.

## Hors perimetre V1

- Portail parents avec connexion et mot de passe.
- Synchronisation avec le CRM existant.
- Paiement en ligne des frais scolaires.
- Blog ou actualites dynamiques (peut etre ajoute en V2).
- Galerie photos avec gestion d'uploads.
- Base de donnees ou back-office.
- Reprise automatique de toutes les publications Facebook.
- Mise en production publique avant validation des coordonnees definitives.

## Risques / points de vigilance

- **Risque :** vouloir elargir le perimetre V1 (ajouter un blog, une galerie, un espace parents).
  - **Mitigation :** la V1 reste statique. Les evolutions sont documentees et repoussees en V2.
- **Risque :** hebergement payant ou complexe.
  - **Mitigation :** GitHub Pages ou Netlify (gratuit, HTTPS inclus, deploiement simple).
- **Risque :** dependance technique avec le CRM.
  - **Mitigation :** aucun lien technique en V1. Les passerelles (pre-inscription, espace parents) sont pour plus tard.
- **Risque :** publier de mauvaises coordonnees.
  - **Mitigation :** utiliser l'email officiel confirme, les deux numeros fournis par Ams et la localisation Google Maps confirmee.
- **Risque :** utiliser des photos sans autorisation claire.
  - **Mitigation :** Ams confirme le droit d'usage ; privilegier malgre tout les photos de locaux, cour, bibliotheque et equipements lorsque c'est possible.
- **Risque :** confondre page Facebook et site officiel.
  - **Mitigation :** le site devient la source institutionnelle, Facebook reste un lien externe et une preuve d'activite.

## Mode recommande

**Mode leger** — confirme par Ams.

Site vitrine statique, sans compte utilisateur, sans paiement, sans donnees sensibles, sans back-office.

Structure livrables :
- `docs/IDEE.md` ← ce fichier
- `docs/MINI_SPEC.md` (a venir)
- `docs/PLAN_DEV.md` (a venir)
- `docs/CAHIER_RECETTE_LIGHT.md` (a venir)
- Code source du site

## Prochaine validation Ams

**Validation effectuee par Ams le 2026-06-20.**

Ams confirme que :
- le probleme est bien de creer une presence web officielle au-dela de Facebook ;
- la cible prioritaire est bien les parents actuels/prospects et partenaires ;
- le resultat minimum utile est bien un site vitrine statique avec pages accueil, notre ecole, admissions, contact ;
- les sources retenues sont la plaquette, les photos recues et Facebook comme source secondaire ;
- le nom, l'adresse, l'email et les droits photos sont confirmes ;
- l'eventuel WhatsApp definitif reste a confirmer ;
- la localisation Google Maps doit etre integree dans la page contact ;
- les admissions et documents demandes seront traites en Phase 2.

Phase suivante lancee : **Phase 2 - Mini spec** avec creation de `docs/MINI_SPEC.md`.
