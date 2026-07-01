# Acces distant de test via Cloudflare Tunnel

## Objectif

Permettre a un testeur distant d'ouvrir le CRM ecole depuis un navigateur, sans telecharger le dossier du projet.

Ce mode est prevu pour des sessions courtes de recette ou demonstration. Il ne remplace pas un hebergement de production.

## Pre-requis

- Le Mac d'Ams doit etre allume.
- Le CRM doit etre lance localement.
- La fenetre du tunnel Cloudflare doit rester ouverte pendant toute la session.
- Le testeur doit disposer d'un compte CRM.

## Procedure

1. Lancer le CRM avec `LANCER_CRM_MAC.command`.
2. Lancer `LANCER_TUNNEL_CLOUDFLARE_MAC.command`.
3. Attendre l'affichage d'une URL en `https://...trycloudflare.com`.
4. Envoyer cette URL au testeur.
5. A la fin de la session, fermer la fenetre du tunnel Cloudflare.

## Arreter le tunnel

Le tunnel Cloudflare reste actif tant que la fenetre Terminal ouverte par `LANCER_TUNNEL_CLOUDFLARE_MAC.command` reste ouverte.

Pour couper l'acces distant :

- fermer la fenetre Terminal du tunnel ;
- ou utiliser `Ctrl + C` dans cette fenetre.

Apres l'arret du tunnel, l'URL `https://...trycloudflare.com` ne doit plus repondre.

Important : fermer le tunnel ne coupe pas forcement le CRM local si celui-ci tourne dans une autre fenetre. Le CRM peut rester accessible sur le Mac via `http://127.0.0.1:8791`, mais il n'est plus accessible depuis Internet via le lien Cloudflare.

## Regles de securite

- Ne pas laisser le tunnel ouvert inutilement.
- Utiliser un compte de test.
- Eviter les donnees sensibles ou reelles pour les premieres sessions.
- Ne pas publier le lien dans un groupe ou un canal public.
- Si un doute existe, couper le tunnel et relancer une nouvelle session avec une nouvelle URL.

## Limites

- Si le Mac s'eteint ou perd Internet, le testeur perd l'acces.
- L'URL temporaire peut changer a chaque lancement.
- Ce mode sert a la recette distante, pas a l'exploitation quotidienne de l'ecole.
