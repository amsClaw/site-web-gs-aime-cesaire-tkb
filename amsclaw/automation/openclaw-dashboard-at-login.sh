#!/usr/bin/env bash
set -euo pipefail

LOG_DIR="$HOME/Library/Logs/openclaw"
mkdir -p "$LOG_DIR"
export PATH="/opt/homebrew/bin:/opt/homebrew/opt/node/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

{
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Demarrage automatique de l'interface OpenClaw"
  sleep 12
  /opt/homebrew/bin/openclaw dashboard --yes
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Commande openclaw dashboard terminee"
} >>"$LOG_DIR/dashboard-login.log" 2>>"$LOG_DIR/dashboard-login.err.log"
