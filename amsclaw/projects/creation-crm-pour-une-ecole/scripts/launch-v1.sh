#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${PORT:-8791}"
HOST="${HOST:-127.0.0.1}"
URL="http://127.0.0.1:${PORT}"
export PORT
export HOST

if [ ! -d node_modules ]; then
  echo "Installation des dependances..."
  npm install
fi

echo "Demarrage du CRM ecole V1..."
echo "URL locale : ${URL}"
if [ "${HOST}" = "0.0.0.0" ]; then
  echo "Mode reseau local active."
fi

if command -v open >/dev/null 2>&1; then
  (
    sleep 2
    open "${URL}"
  ) &
fi

npm start
