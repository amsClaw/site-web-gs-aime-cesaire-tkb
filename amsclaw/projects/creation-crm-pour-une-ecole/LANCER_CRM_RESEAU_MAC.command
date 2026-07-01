#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-8791}"
HOST="0.0.0.0"
LOCAL_URL="http://127.0.0.1:${PORT}"

LOCAL_IP="$(ipconfig getifaddr en0 2>/dev/null || true)"
if [ -z "${LOCAL_IP}" ]; then
  LOCAL_IP="$(ipconfig getifaddr en1 2>/dev/null || true)"
fi
if [ -z "${LOCAL_IP}" ]; then
  LOCAL_IP="<adresse-ip-du-serveur>"
fi

echo "Demarrage du CRM ecole V1 en mode reseau local..."
echo "URL sur ce Mac : ${LOCAL_URL}"
echo "URL pour les autres appareils du meme reseau : http://${LOCAL_IP}:${PORT}"
echo
echo "Attention : utiliser ce mode seulement sur le reseau local de l'ecole."
echo "Ne pas exposer ce port sur Internet."
echo

export PORT
export HOST
./scripts/launch-v1.sh
