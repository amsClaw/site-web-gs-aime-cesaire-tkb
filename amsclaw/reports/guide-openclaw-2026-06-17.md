# Creation du guide OpenClaw

Date : 2026-06-17

Objectif :
creer un guide HTML local pour centraliser les commandes OpenClaw decouvertes par Ams, notamment le changement de modele, la configuration DeepSeek et le fallback Codex vers DeepSeek.

Fichiers modifies :

- `amsclaw/resources/GUIDE_OPENCLAW.html`
- `amsclaw/README.md`

Contenu initial :

- acces au dashboard ;
- commandes de changement de modele ;
- configuration de la cle API DeepSeek ;
- fallback automatique ;
- commandes gateway ;
- diagnostics rapides ;
- journal des commandes decouvertes.

Prochaine action :
enrichir le guide a chaque nouvelle commande utile decouverte.

Mise a jour complementaire :
Ams confirme que le guide doit aussi etre enrichi au fur et a mesure pour les differentes configurations OpenClaw. Une section `Configurations documentees` est ajoutee au guide HTML avec la configuration initiale DeepSeek / Codex / fallback automatique.

Mise a jour Telegram :
ajout d'une section `Bot Telegram` dans le guide HTML avec la creation BotFather, l'ajout du token, le redemarrage gateway, l'appairage DM et les commandes de diagnostic.

Configuration Telegram realisee :
le bot `@amsclawMM_bot` est ajoute a OpenClaw, le gateway est redemarre et la configuration est valide. Le bot est pret pour l'appairage DM.

Appairage Telegram valide :
le code d'appairage Telegram fourni par Ams est approuve. Le sender Telegram est autorise et configure comme owner des commandes OpenClaw.

Test Telegram valide :
un message de test est envoye depuis OpenClaw vers Telegram avec succes. Ams confirme que la reception fonctionne.

Workflow sessions Telegram :
ajout de la recommandation d'utiliser un groupe Telegram prive avec topics pour isoler les conversations par sujet, car un DM Telegram garde essentiellement une session par utilisateur.

Groupe Telegram avec topics valide :
Ams confirme que le bot repond dans le groupe apres ajout comme administrateur. Le guide HTML est enrichi avec la procedure d'ajout admin, le test texte avec mention et le point de vigilance sur les medias/captions.

Visibilite des discussions Telegram :
verification via `openclaw sessions --active 240` : OpenClaw affiche une session `group` pour le topic Telegram, distincte de la session DM. Le guide precise que ces sessions doivent apparaitre dans le suivi des discussions/sessions du dashboard web lorsqu'elles sont actives ou recentes.
