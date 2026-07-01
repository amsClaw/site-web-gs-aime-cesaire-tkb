# Installation Cloudflare Tunnel - test distant - 2026-06-20

## Objectif

Permettre a un utilisateur distant, notamment en Guinee, de tester le CRM ecole depuis un simple lien web, sans telecharger le dossier complet du projet.

## Installation realisee

- Outil installe : `cloudflared`
- Methode : Homebrew
- Commande executee : `brew install cloudflared`
- Version installee : `cloudflared version 2026.6.1`

## Modifications de fichiers

- Ajout : `LANCER_TUNNEL_CLOUDFLARE_MAC.command`
- Ajout : `docs/ACCES_DISTANCE_TEST_CLOUDFLARE.md`
- Modification : `README.md`
- Modification : `docs/RUNBOOK_V1.md`

## Verification

- `cloudflared --version` OK
- `bash -n LANCER_TUNNEL_CLOUDFLARE_MAC.command` OK
- `npm test` OK : smoke tests et E2E OK
- Test technique court OK : generation d'une URL temporaire `trycloudflare.com`, puis arret du serveur et du tunnel de test.

## Regles d'usage

- Utiliser ce mode pour des sessions courtes de demonstration ou recette.
- Lancer d'abord le CRM local, puis le tunnel.
- Fermer la fenetre Terminal du tunnel ou utiliser `Ctrl + C` a la fin de la session.
- L'arret du tunnel coupe le lien public Cloudflare, mais n'arrete pas forcement le CRM local s'il tourne dans une autre fenetre.
- Eviter les donnees sensibles ou reelles pendant les premieres sessions.
- Ne pas publier le lien dans un groupe ou un canal public.
