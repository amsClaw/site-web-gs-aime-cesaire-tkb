#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-8787}"
DASHBOARD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(cd "$DASHBOARD_DIR/../.." && pwd)"
URL="http://localhost:${PORT}/amsclaw/dashboard/"

SERVER_SCRIPT="$WORKSPACE_DIR/amsclaw/projects/dashboard-multi-agent/scripts/dashboard-server.js"

if ! command -v node >/dev/null 2>&1; then
  echo "Erreur : node est introuvable. Impossible de lancer le serveur local avec sauvegarde JSON."
  exit 1
fi

if command -v curl >/dev/null 2>&1 && curl -fsS --max-time 1 "$URL" >/dev/null 2>&1; then
  echo "Dashboard deja disponible : $URL"
  if command -v open >/dev/null 2>&1; then
    open "$URL"
  fi
  exit 0
fi

echo "Lancement du dashboard amsClaw..."
echo "Dossier : $DASHBOARD_DIR"
echo "Racine  : $WORKSPACE_DIR"
echo "Serveur : $SERVER_SCRIPT"
echo "URL     : $URL"
echo
echo "Pour arreter le serveur : Ctrl+C"

if command -v open >/dev/null 2>&1; then
  (sleep 1 && open "$URL") &
fi

cd "$WORKSPACE_DIR"
PORT="$PORT" node "$SERVER_SCRIPT"
