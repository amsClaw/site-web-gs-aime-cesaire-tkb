# Reveil heartbeat - optimisation ecosysteme

Date : 2026-06-13 23:00 Europe/Paris

## Objectif

Executer le heartbeat workspace sur l'angle optimisation de l'ecosysteme OpenClaw.

Le point controle :
les reveils rapproches produisent-ils une documentation utile, ou commencent-ils a ajouter du bruit ?

## Constat

Le 2026-06-13, plusieurs rapports utiles ont ete produits :

- suivi projets ;
- priorites ;
- veille IA ;
- revue hebdo ;
- synchronisation securisee ;
- validation creation projet CRM ;
- controle dashboard / CRM ;
- controle qualite PRD ;
- controle action guidee ;
- controle PMO ;
- opportunites business.

Cette richesse est utile pour tracer le travail, mais elle peut devenir trop granulaire si chaque heartbeat cree un nouveau fichier separe.

## Risque

Si le rythme reste tres rapproche, le dossier `reports/` risque de devenir moins lisible :

- trop de petits fichiers ;
- reprise plus lente ;
- information dispersee entre plusieurs rapports courts ;
- confusion entre rapport important et simple controle de routine.

## Optimisation proposee

Passer progressivement a une logique de synthese :

```text
1 rapport quotidien de synthese + rapports separes seulement pour les livraisons, validations ou incidents.
```

Regle simple proposee :

- heartbeat sans probleme : consigner uniquement dans le resultat `heartbeat_respond`, sans fichier ;
- heartbeat avec controle significatif mais non urgent : ajouter une section au rapport quotidien ;
- livraison, decision, blocage ou incident : creer un rapport dedie ;
- ne notifier Ams que pour decision utile, blocage, livraison ou risque.

## Impact attendu

- moins de bruit documentaire ;
- meilleure lisibilite du dashboard et des rapports ;
- reprise plus rapide ;
- conservation des traces importantes.

## Decision heartbeat

Ne pas appliquer cette optimisation automatiquement.

Raison :
Ams n'a pas demande de changer la regle de journalisation. La proposition est documentee pour arbitrage futur.

## Prochaine action recommandee

Lors de la prochaine revue dashboard, proposer a Ams de valider ou non cette regle :

```text
Rapport quotidien unique pour les heartbeats de routine, rapports dedies seulement pour les evenements importants.
```
