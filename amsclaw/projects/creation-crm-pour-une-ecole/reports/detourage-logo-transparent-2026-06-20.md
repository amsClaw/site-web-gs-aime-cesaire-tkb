# Detourage logo transparent - 2026-06-20

## Objectif

Transformer le logo fourni en version utilisable dans le CRM sans conserver le fond noir.

## Modifications realisees

- Creation de `src/assets/logo-ecole-aime-cesaire-transparent.png` avec fond transparent.
- Regeneration de `src/assets/favicon-ecole.png` a partir de la version transparente.
- Mise a jour de `src/index.html` pour utiliser le PNG transparent.
- Mise a jour de `src/styles.css` pour supprimer les fonds noirs ajoutes autour du logo.
- Mise a jour des captures du guide utilisateur :
  - `docs/guide-utilisateur-assets/01-connexion.png`
  - `docs/guide-utilisateur-assets/02-tableau-de-bord.png`

## Script execute

Retouche locale effectuee avec `ffmpeg` :

```bash
ffmpeg -y -i src/assets/logo-ecole-aime-cesaire.jpg -vf "colorkey=0x000000:0.10:0.04,format=rgba" src/assets/logo-ecole-aime-cesaire-transparent.png
ffmpeg -y -i src/assets/logo-ecole-aime-cesaire-transparent.png -vf "scale=96:-1" src/assets/favicon-ecole.png
```

## Verification

- Le fichier PNG transparent contient bien un canal alpha.
- Controle visuel sur fond clair OK.
- Controle visuel sur fond sombre OK.
- Controle navigateur desktop OK.
- Controle navigateur mobile OK.

## Point de vigilance

Le detourage retire le noir du fichier source. Si l'ecole dispose plus tard d'un logo officiel en PNG transparent ou SVG, il faudra le preferer a cette version detouree.
