# Recette - Creation de projet depuis modele

## Objectif

Valider que le dashboard peut creer un projet complet depuis le formulaire `Nouveau projet`, sans casser les donnees existantes.

## Pre-requis

- Dashboard ouvert : `http://127.0.0.1:8787/amsclaw/dashboard/`
- Serveur local actif.
- Aucun dossier existant :

```text
amsclaw/projects/relance-paiements-scolaires-whatsapp/
```

## Donnees de test conseillees

Nom :

```text
Relance paiements scolaires WhatsApp
```

Objectif :

```text
Tester un outil simple pour suivre les frais scolaires, generer des recus et preparer les relances parents.
```

Prochaine action :

```text
Rediger une phrase d'offre et une mini maquette de suivi paiement.
```

Priorite :

```text
Haute
```

Option a cocher :

```text
Créer aussi le dossier projet et les fichiers de base
```

## Etapes

1. Ouvrir l'onglet `Projets`.
2. Remplir le formulaire `Nouveau projet` avec les donnees ci-dessus.
3. Cocher `Créer aussi le dossier projet et les fichiers de base`.
4. Cliquer sur `Ajouter`.
5. Lire la confirmation.
6. Verifier que le dossier annonce est :

```text
amsclaw/projects/relance-paiements-scolaires-whatsapp/
```

7. Confirmer la creation.
8. Verifier que le projet apparait dans la vue `Projets`.
9. Verifier que les fichiers existent :

```text
amsclaw/projects/relance-paiements-scolaires-whatsapp/README.md
amsclaw/projects/relance-paiements-scolaires-whatsapp/docs/PROJECT_BRIEF.md
amsclaw/projects/relance-paiements-scolaires-whatsapp/docs/NEXT_STEPS.md
```

10. Verifier que `dashboard-data.json` contient le projet `relance-paiements-scolaires-whatsapp`.

## Resultat attendu

- Le projet est visible dans le dashboard.
- Le dossier projet existe.
- Les fichiers minimaux existent.
- Aucun fichier existant n'a ete ecrase.
- Le dashboard reste disponible en HTTP 200.

## Si le test echoue

Noter :

- le message affiche dans le dashboard ;
- le contenu de la confirmation ;
- le statut HTTP si visible ;
- les fichiers effectivement crees ou absents.

Ne pas supprimer manuellement sans decision explicite d'Ams.
