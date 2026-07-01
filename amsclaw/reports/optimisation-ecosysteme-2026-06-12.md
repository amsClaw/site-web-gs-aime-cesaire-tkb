# Optimisation ecosysteme OpenClaw - 2026-06-12

## Constat

Apres la notification utilisateur de 08:00, plusieurs heartbeats ont seulement verifie que le test reel n'avait pas encore ete fait.

Ce controle est utile, mais il ne doit pas devenir une boucle bruyante ou produire trop de fichiers.

## Optimisation proposee

Ajouter une logique de suivi `en attente utilisateur` pour les heartbeats.

Principe :

- si une action demande explicitement Ams ;
- si Ams a deja ete notifie ;
- si aucun changement n'est detecte ;
- alors le heartbeat doit seulement verifier l'etat et repondre `no_change`, sans creer de nouveau rapport.

## Quand refaire du bruit

Notifier seulement si :

- le projet attendu apparait ;
- un fichier attendu manque apres creation ;
- le dashboard ne repond plus ;
- une execution agent reste a verifier ;
- un nouveau blocage apparait ;
- une decision utilisateur est vraiment necessaire et n'a pas deja ete notifiee.

## Benefice

- Moins de bruit.
- Moins de rapports redondants.
- Meilleure distinction entre progres reel et attente utilisateur.
- Ams garde un fil clair : action attendue, puis verification quand l'action est faite.

## Application immediate

Pour le flux actuel :

```text
Tester une creation reelle de projet depuis l'IHM avec Ams.
```

Tant que `amsclaw/projects/relance-paiements-scolaires-whatsapp/` n'existe pas, ne pas renotifier.

Quand il existe :

- verifier les fichiers ;
- verifier `dashboard-data.json` ;
- marquer la tache de creation automatique comme terminee si tout est OK.

## Addendum - 2026-06-15 11:00

Controle mensuel leger effectue pendant heartbeat :

- 53 rapports `heartbeat-*.md` presents dans `amsclaw/reports` ;
- 71 rapports Markdown au total dans `amsclaw/reports` ;
- taille du dossier `amsclaw/reports` : 3,7 Mo ;
- aucun projet bloque ;
- aucun projet en pause ou cloture a archiver selon `amsclaw/PROJECTS_INDEX.md` ;
- audit dashboard / memoire : 0 divergence.

Constat :

le volume disque reste faible, donc il n'y a pas d'urgence technique. Le risque est surtout la lisibilite : trop de petits rapports heartbeat rendent la reprise moins directe.

Optimisation recommandee :

- conserver les rapports importants : matin, veille IA, priorites hebdo, controles mensuels, livraisons projet ;
- pour les heartbeats sans changement important, privilegier `heartbeat_respond` avec `notify=false` et eviter de creer un nouveau fichier ;
- produire un seul resume quotidien si plusieurs heartbeats confirment le meme etat ;
- ne pas archiver automatiquement sans validation d'Ams.

Decision :

pas d'archivage automatique. La prochaine optimisation utile serait de creer un resume quotidien consolide des heartbeats, puis de demander confirmation a Ams avant tout deplacement de fichiers.
