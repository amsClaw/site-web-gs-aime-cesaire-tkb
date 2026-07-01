# Mini analyse marche - Gestion scolaire legere

Date : 2026-06-12

## Verdict

Ne pas demarrer par une gestion scolaire complete.

Demarrer par un module plus petit :

```text
Suivi des frais scolaires, recus et relances WhatsApp.
```

Pourquoi :

- probleme plus urgent pour les ecoles privees ;
- valeur mesurable rapidement : moins d'impayes, moins de relances manuelles, meilleure trace des paiements ;
- MVP plus rapide qu'un logiciel complet de scolarite ;
- meilleur alignement avec l'opportunite `Relance paiements scolaires WhatsApp`.

## Client cible prioritaire

Ecoles privees urbaines ou periurbaines en Guinee.

Interlocuteurs :

- directeur d'ecole ;
- responsable administratif ;
- secretaire scolaire ;
- comptable ou personne chargee des paiements.

## Probleme prioritaire

Les inscriptions et le suivi eleve sont importants, mais le flux paiement est plus monetisable.

Probleme a tester :

```text
Les frais scolaires, recus et relances parents sont suivis manuellement, souvent entre cahiers, Excel et messages disperses.
```

## Premiere offre simple

Nom de travail :

```text
Relance paiements scolaires WhatsApp
```

Promesse :

```text
Je t'aide a suivre les frais scolaires, generer les recus et relancer les parents plus facilement.
```

V1 :

- liste eleves ;
- montant du ;
- montant paye ;
- reste a payer ;
- statut paiement ;
- recu simple ;
- message WhatsApp copiable pour relance ;
- export Excel ou PDF.

## Ce qu'il ne faut pas construire au depart

- notes et bulletins ;
- emploi du temps ;
- portail parent ;
- application mobile dediee ;
- paiement mobile integre automatiquement ;
- gestion multi-etablissements.

Ces elements peuvent venir apres validation du flux paiement.

## Hypothese business

Une petite ecole privee paiera plus facilement pour un outil qui ameliore la collecte et le suivi des frais que pour un outil generaliste de gestion scolaire.

## Offre de test terrain

Phrase a tester avec 3 ecoles :

```text
Si je te donne un tableau simple qui suit les paiements, genere les recus et prepare les relances WhatsApp aux parents, est-ce que ca te ferait gagner du temps chaque semaine ?
```

Questions a poser :

- Combien d'eleves avez-vous ?
- Comment suivez-vous les paiements aujourd'hui ?
- Qui relance les parents ?
- Combien de temps cela prend par semaine ?
- Avez-vous besoin d'un recu papier, PDF ou WhatsApp ?
- Quel montant mensuel serait acceptable si l'outil fonctionne ?

## Monetisation a tester

Option A :

```text
Forfait installation + formation.
```

Option B :

```text
Abonnement mensuel par ecole.
```

Option C :

```text
Forfait par trimestre scolaire.
```

Le plus simple a tester : installation + petit abonnement mensuel.

## Sources utiles

- World Bank Data suit la part des inscriptions primaires dans le prive par pays, utile pour quantifier le segment education privee : https://data.worldbank.org/indicator/SE.PRM.PRIV.ZS
- UNESCO presente SchoolPay comme exemple de plateforme qui repond aux problemes des paiements scolaires en cash et des pratiques papier en Ouganda : https://www.unesco.org/en/dtc-financing-toolkit/schoolpay
- CGAP souligne que les ecoles africaines exploitent encore peu le mobile money pour les frais scolaires, malgre des usages possibles dans les paiements d'inscription : https://www.cgap.org/blog/schools-in-africa-arent-taking-advantage-of-mobile-money-why
- Une experimentation au Benin montre l'interet d'un systeme mobile money combine a un suivi des transactions et des recus pour les frais scolaires : https://pmc.ncbi.nlm.nih.gov/articles/PMC5995370/

## Decision recommandee

Transformer `Relance paiements scolaires WhatsApp` en projet test via le dashboard.

Ne garder `Gestion scolaire legere` que comme vision plus large, a relancer si le module paiement obtient un signal terrain positif.

## Prochaine action

Creer le projet depuis le dashboard, puis produire une mini maquette de suivi paiement.
