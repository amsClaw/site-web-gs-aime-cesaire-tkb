# Inbox fichiers amsClaw

Objectif :
servir de sas temporaire pour les fichiers qu'Ams depose afin qu'amsClaw les recupere et les rattache au bon projet.

## Dossier a utiliser

Depot general :

```text
amsclaw/inbox/
```

Si le projet est connu, utiliser de preference un sous-dossier avec l'ID du projet :

```text
amsclaw/inbox/<project-id>/
```

Exemple pour le site de l'ecole :

```text
amsclaw/inbox/site-web-gs-aime-cesaire-tkb/
```

## Regle de traitement

Quand Ams indique qu'un fichier a ete depose :

1. amsClaw verifie le contenu de `amsclaw/inbox/`.
2. amsClaw identifie le projet cible.
3. amsClaw copie le fichier dans le bon dossier projet :
   - `data/` pour PDF, images sources, exports, imports, fichiers de travail ;
   - `docs/` pour documentation projet ;
   - `src/assets/` pour les assets directement utilises par une app ou un site.
4. amsClaw verifie que la copie existe et que la taille est plausible.
5. amsClaw journalise la recuperation si elle affecte le projet.
6. amsClaw peut ensuite supprimer uniquement le fichier original situe dans `amsclaw/inbox/`.

## Garde-fous

- Le dossier `amsclaw/inbox/` est temporaire.
- Les dossiers projet restent la source de verite.
- Aucune suppression hors `amsclaw/inbox/` sans confirmation explicite d'Ams.
- Si le projet cible est ambigu, amsClaw demande confirmation avant de deplacer ou supprimer.
- Si le fichier semble sensible, limiter les copies et signaler le risque.
