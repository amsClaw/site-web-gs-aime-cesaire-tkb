# Controle action guidee PRD

Date : 2026-06-13 21:30 Europe/Paris

## Objectif

Verifier le risque technique de l'action guidee `Valider la PRD`, car le projet CRM ecole sert de cas pilote pour faire avancer un projet depuis le dashboard sans terminal.

## Fichiers controles

- `amsclaw/dashboard/app.js`
- `amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js`
- `amsclaw/PROJECTS_INDEX.md`

## Controles executes

```sh
node --check amsclaw/dashboard/app.js
node --check amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js
curl http://127.0.0.1:8787/api/projects/creation-crm-pour-une-ecole/guided-actions/validate-prd
curl -X POST http://127.0.0.1:8787/api/projects/creation-crm-pour-une-ecole/guided-actions/unknown-action
```

## Resultat

- Syntaxe `app.js` : OK.
- Syntaxe `dashboard-server.js` : OK.
- Appel `GET` sur l'action guidee : refuse en `405 Method Not Allowed`.
- Action inconnue : refusee en `404 Not Found`.
- L'action reelle `validate-prd` n'a pas ete declenchee, car la validation doit rester une decision explicite d'Ams.

## Point de vigilance

L'endpoint direct peut etre appele en `POST` par l'interface lorsque Ams confirme l'action. C'est volontaire.

Pour la suite, si les actions guidees se multiplient, il faudra prevoir :

- confirmation explicite cote interface pour chaque action structurante ;
- journalisation automatique ;
- sauvegarde avant ecriture pour les actions qui modifient plusieurs fichiers ;
- controle anti-double validation si l'action reste accessible par URL directe.

## Decision heartbeat

Ne pas notifier Ams.

Raison :

- aucun blocage technique detecte ;
- l'action guidee est prete pour le test utilisateur ;
- la validation PRD reste volontairement en attente de decision humaine.
