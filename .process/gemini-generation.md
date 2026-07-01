# Génération d'images & vidéos — Processus Ams → amsClaw

## Règle

Quand Ams a besoin d'un visuel (image ou vidéo) pour un projet :
1. Je rédige un **prompt optimisé** pour **Gemini Pro** (via gemini.google.com)
2. Je précise **quel outil Gemini utiliser** (Gemini 2.5 Pro / Imagen 3 / Veo)
3. Ams colle le prompt sur gemini.google.com
4. Ams sauvegarde le fichier généré dans : `assets/generated/gemini/`
5. Je récupère le fichier pour l'intégrer au projet

## Outils Gemini Pro disponibles

### Images

| Outil | Usage | Description |
|---|---|---|
| **Gemini 2.5 Pro (Imagen 3)** | gemini.google.com | Génération d'images intégrée dans le chat. Prompt en langage naturel |
| **Imagen 3** (autonome) | gemini.google.com → Imagen | Génération d'images seule, plus de contrôle sur le style |

### Vidéos

| Outil | Usage | Description |
|---|---|---|
| **Veo 2 / Veo 3** | labs.google/veo | Génération vidéo via Gemini |
| **Gemini + Veo** | gemini.google.com | Génération vidéo via prompt dans le chat |

## Style de prompts que je rédige

- **Images :** description détaillée (sujet, style, couleurs, format, ambiance)
- **Vidéos :** scénario, mouvement, durée, style visuel
- Adapté au projet (moderne, professionnel, illustration, logo, bannière...)
- En français ou anglais selon le modèle

## Dossier de dépôt

Ams met les fichiers dans : `assets/generated/gemini/`
Je les récupère de là pour intégration dans le projet concerné.

---

Dernière mise à jour : 2026-06-18
