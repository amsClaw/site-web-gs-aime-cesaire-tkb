#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-8791}"

pause() {
  echo
  read -r -p "Appuie sur Entree pour fermer cette fenetre..." _ || true
}

echo "=========================================="
echo " Arret du CRM ecole"
echo "=========================================="
echo

RUNNING_PIDS="$(lsof -tiTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"

if [ -z "${RUNNING_PIDS}" ]; then
  echo "Le CRM ne semble pas lance sur le port ${PORT}."
  echo "Aucune action necessaire."
  pause
  exit 0
fi

echo "Serveur CRM detecte sur le port ${PORT}."
echo "Processus : ${RUNNING_PIDS}"
echo
read -r -p "Arreter le CRM maintenant ? [o/N] " stop_answer

case "${stop_answer}" in
  o|O|oui|OUI|Oui)
    echo
    echo "Arret du serveur..."
    kill ${RUNNING_PIDS} 2>/dev/null || true
    sleep 2
    ;;
  *)
    echo "Arret annule."
    pause
    exit 0
    ;;
esac

STILL_RUNNING="$(lsof -tiTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"

if [ -n "${STILL_RUNNING}" ]; then
  echo
  echo "Le serveur repond encore apres la demande d'arret."
  echo "Processus restant : ${STILL_RUNNING}"
  echo "Tu peux relancer ce script une deuxieme fois si besoin."
  pause
  exit 1
fi

echo
echo "CRM arrete."
pause
