# Revue hebdomadaire du soir

Date : 2026-06-14 22:30 Europe/Paris

## Objectif

Mettre a jour la lecture hebdomadaire apres l'avancee du projet CRM ecole et preparer une reprise simple pour lundi.

## Etat portefeuille

### 1. Creation CRM pour une ecole

Statut : actif, V1 locale stabilisee.

Prochaine action :

```text
Faire la revue finale de livraison V1 avec Ams : runbook, exports, sauvegarde/restauration, puis decision de cloture V1 ou ouverture d'une V1.1 courte.
```

Lecture PMO :

- le projet a franchi l'etape la plus risquee de la V1 locale ;
- la prochaine etape est une revue de livraison, pas un nouveau developpement ;
- il faut eviter d'ajouter des fonctions avant une decision claire de cloture ou V1.1.

### 2. Dashboard multi-agent

Statut : actif, cockpit operationnel.

Prochaine action :

```text
Cadrer l'evolution Validations projet visibles dans Taches.
```

Lecture PMO :

- le dashboard a servi de cockpit pour piloter le CRM ;
- l'evolution reste utile, mais elle passe apres la revue finale CRM ;
- la synchronisation JSON / Markdown est saine au dernier audit.

### 3. Relance paiements scolaires WhatsApp

Statut : actif, non lance en execution.

Prochaine action :

```text
Identifier un premier cas de test concret : une ecole, une classe ou un fichier Excel existant.
```

Lecture business :

- le potentiel business reste fort ;
- le bon moment pour reprendre ce projet est apres decision de livraison V1 CRM ;
- le cadrage doit rester court pour eviter de recreer une gestion scolaire complete.

## Projets bloques

Aucun projet bloque detecte dans `PROJECTS_INDEX.md` ou `memory/active-projects.md`.

## Priorites recommandees pour lundi

1. Revue finale de livraison V1 CRM ecole avec Ams.
2. Decision : cloture V1 ou V1.1 courte.
3. Si V1 cloturee, cadrer `Validations projet visibles dans Taches` dans le dashboard.
4. Ensuite seulement, reprendre le premier cas de test `Relance paiements scolaires WhatsApp`.

## Point de vigilance

Le risque principal n'est plus technique sur le CRM V1. Le risque principal est la dispersion : ajouter trop vite de nouvelles fonctions avant de cloturer proprement la V1.

## Notification

Ne pas notifier Ams.

Raison :

- aucune urgence ;
- aucun blocage ;
- la prochaine action necessite une decision de livraison avec Ams, mais elle peut attendre la prochaine session de travail.
