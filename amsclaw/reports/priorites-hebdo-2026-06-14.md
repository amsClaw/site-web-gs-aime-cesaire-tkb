# Priorites hebdomadaires

Date : 2026-06-14 13:30 Europe/Paris

## Synthese

La priorite de la semaine doit rester l'execution courte :

```text
tester la V1 locale du CRM ecole, corriger les ecarts critiques, puis livrer une version utilisable a Ams.
```

Le risque principal n'est pas le manque d'idees, mais la dispersion entre CRM, dashboard et relance paiements.

## Ordre recommande

1. `Creation CRM pour une ecole`
   - Pourquoi : la PRD, le cahier de recette et une premiere V1 locale existent.
   - Action : tester dans le navigateur et passer les cas critiques du cahier de recette.
   - Resultat attendu : liste courte d'ecarts a corriger ou validation technique V1.

2. `Dashboard multi-agent`
   - Pourquoi : il reste le cockpit de pilotage, mais il ne doit pas ralentir le CRM.
   - Action : stabiliser uniquement les points utiles au suivi, notamment les validations visibles comme taches.
   - Resultat attendu : dashboard fiable sans complexification.

3. `Relance paiements scolaires WhatsApp`
   - Pourquoi : potentiel business fort, mais pas encore cadre.
   - Action : attendre la fin du test CRM, puis identifier un premier cas concret.
   - Resultat attendu : cadrage V1 court, sans partir sur une gestion scolaire complete.

## Opportunites business detectees

- `Relance paiements scolaires WhatsApp` reste l'opportunite la plus monetisable a court terme si un cas ecole reel est disponible.
- Le CRM ecole peut devenir une brique de demonstration terrain pour vendre ensuite des modules simples : suivi eleves, relances, exports, tableaux de bord.
- Une offre de formation IA / Excel / automatisation pour petites structures peut etre gardee en idee, mais elle ne doit pas passer devant les produits concrets.

## Avancement des projets

- Aucun projet bloque.
- Aucun projet en pause.
- Aucun projet cloture.
- `Creation CRM pour une ecole` a change de phase : cadrage valide -> V1 locale a tester.
- `Dashboard multi-agent` reste actif avec un point a nettoyer : certaines actions guidees PRD sont moins prioritaires depuis que le CRM a deja passe la PRD et le cahier de recette.

## Correction effectuee pendant la revue

Le README du CRM indiquait encore l'ancienne prochaine action de developpement. Il a ete realigne sur l'etat courant :

```text
Tester la V1 locale dans le navigateur et passer les premiers cas critiques du cahier de recette.
```

## Notification

Ne pas notifier Ams.

Raison :

- aucune urgence ;
- aucun blocage ;
- la correction est documentaire ;
- la prochaine action reste claire.

## Revue du dimanche soir - 19:30 Europe/Paris

Controle effectue :

- `HEARTBEAT.md` relu explicitement.
- `amsclaw/PROJECTS_INDEX.md` relu.
- Audit dashboard relance : aucune divergence JSON / Markdown detectee.
- Rapport quotidien deja complete a 19:00, donc pas de nouveau rapport generique cree.

Priorite confirmee pour la semaine :

1. Finir la boucle de recette du CRM ecole avec `docs/commentaires_v1.md`.
2. Ne traiter que les retours qui bloquent l'usage ou ameliorent clairement la V1 locale.
3. Reporter les idees plus larges vers V2 pour eviter de transformer le CRM en gestion scolaire complete.
4. Reprendre le dashboard seulement pour nettoyer les validations visibles dans `Taches`.
5. Reprendre `Relance paiements scolaires WhatsApp` uniquement apres stabilisation des retours critiques CRM.

Veille IA utile :

- OpenAI met en avant les cours OpenAI Academy, Codex et les usages professionnels de l'IA generative.
- Anthropic a suspendu l'acces a Fable 5 et Mythos 5 apres directive gouvernementale americaine, ce qui confirme le risque de dependance a un fournisseur ou modele unique.
- Google Research publie sur l'IA en sante, le calcul bas carbone et l'audit du machine unlearning.

Impact pour Ams :

- garder les projets locaux exportables ;
- eviter de verrouiller une V1 sur un modele IA precis ;
- privilegier les outils utiles meme sans IA avancee : Excel, import/export, suivi simple, documentation claire.

Sources consultees :

- https://openai.com/news/
- https://www.anthropic.com/news/fable-mythos-access
- https://research.google/blog/

Decision heartbeat :

Ne pas notifier Ams : aucun blocage, aucune urgence, mais la priorite hebdomadaire est maintenant clarifiee et documentee.

## Nettoyage dashboard - 20:00 Europe/Paris

Action realisee :

- controle de l'action guidee `Valider la PRD` dans le code dashboard ;
- confirmation que le bouton n'est plus affiche avec l'etat actuel du CRM ecole ;
- correction de la documentation qui presentait encore ce cas comme disponible ;
- realignement de la prochaine action dashboard sur le seul sujet restant : cadrer `Validations projet visibles dans Taches`.

Fichiers mis a jour :

- `amsclaw/projects/dashboard-multi-agent/README.md` ;
- `amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md` ;
- `amsclaw/dashboard/GUIDE_UTILISATION.md` ;
- `amsclaw/PROJECTS_INDEX.md` ;
- `memory/active-projects.md` ;
- `memory/decisions.md` ;
- `amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json`.

Controle :

- JSON dashboard valide ;
- audit dashboard propre : 0 divergence JSON / Markdown ;
- ancien libelle obsolete introuvable dans les fichiers de pilotage.

Notification :

Ne pas notifier Ams : correction de pilotage utile, mais non urgente et sans decision requise.
