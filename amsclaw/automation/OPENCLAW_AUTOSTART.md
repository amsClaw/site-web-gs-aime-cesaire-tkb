# Démarrage automatique OpenClaw

Date de mise en place : 2026-06-12

## Objectif

Lancer automatiquement OpenClaw au démarrage du Mac et ouvrir son interface web après la connexion utilisateur.

## État

- Gateway OpenClaw : déjà géré par le LaunchAgent `ai.openclaw.gateway`.
- Dashboard amsClaw : déjà géré par le LaunchAgent `com.amsclaw.dashboard`.
- Interface web OpenClaw : gérée par le LaunchAgent `com.openclaw.dashboard-login`.

## Fichiers

- Script lancé au login : `amsclaw/automation/openclaw-dashboard-at-login.sh`
- LaunchAgent macOS : `~/Library/LaunchAgents/com.openclaw.dashboard-login.plist`
- Logs : `~/Library/Logs/openclaw/dashboard-login.log`
- Logs d'erreur : `~/Library/Logs/openclaw/dashboard-login.err.log`

## Commandes utiles

Vérifier l'état :

```bash
launchctl print gui/$(id -u)/com.openclaw.dashboard-login
openclaw status
```

Relancer manuellement :

```bash
launchctl kickstart -k gui/$(id -u)/com.openclaw.dashboard-login
```

Désactiver l'ouverture automatique de l'interface :

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.openclaw.dashboard-login.plist
```

Réactiver :

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.openclaw.dashboard-login.plist
```
