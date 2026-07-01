#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-8791}"
DATA_FILE="data/app-data.json"
BACKUP_DIR="data/backups"

pause() {
  echo
  read -r -p "Appuie sur Entree pour fermer cette fenetre..." _
}

echo "=========================================="
echo " Restauration CRM ecole"
echo "=========================================="
echo

if [ ! -d "${BACKUP_DIR}" ]; then
  echo "Aucun dossier de sauvegarde trouve : ${BACKUP_DIR}"
  pause
  exit 1
fi

BACKUPS=()
while IFS= read -r file; do
  BACKUPS+=("${file}")
done < <(find "${BACKUP_DIR}" -maxdepth 1 -type f -name "*.json" -print | sort -r)

if [ "${#BACKUPS[@]}" -eq 0 ]; then
  echo "Aucune sauvegarde JSON trouvee dans ${BACKUP_DIR}"
  pause
  exit 1
fi

RUNNING_PIDS="$(lsof -tiTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"
if [ -n "${RUNNING_PIDS}" ]; then
  echo "Le serveur CRM semble encore ouvert sur le port ${PORT}."
  echo "Il faut l'arreter avant de restaurer les donnees."
  echo
  read -r -p "Arreter le serveur maintenant ? [o/N] " stop_answer
  case "${stop_answer}" in
    o|O|oui|OUI|Oui)
      echo "Arret du serveur..."
      kill ${RUNNING_PIDS} 2>/dev/null || true
      sleep 2
      ;;
    *)
      echo "Restauration annulee. Relance ce script apres avoir arrete le serveur."
      pause
      exit 1
      ;;
  esac
fi

echo "Sauvegardes disponibles :"
echo

index=1
for file in "${BACKUPS[@]}"; do
  size="$(du -h "${file}" | awk '{print $1}')"
  modified="$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "${file}")"
  echo " ${index}) $(basename "${file}")  |  ${modified}  |  ${size}"
  index=$((index + 1))
done

echo
read -r -p "Numero de la sauvegarde a restaurer, ou q pour annuler : " choice

if [ "${choice}" = "q" ] || [ "${choice}" = "Q" ]; then
  echo "Restauration annulee."
  pause
  exit 0
fi

if ! [[ "${choice}" =~ ^[0-9]+$ ]]; then
  echo "Choix invalide."
  pause
  exit 1
fi

if [ "${choice}" -lt 1 ] || [ "${choice}" -gt "${#BACKUPS[@]}" ]; then
  echo "Choix invalide."
  pause
  exit 1
fi

selected="${BACKUPS[$((choice - 1))]}"

echo
echo "Sauvegarde selectionnee :"
echo "$(basename "${selected}")"
echo
echo "Une copie de l'etat actuel sera creee avant restauration."
read -r -p "Confirmer la restauration ? [o/N] " confirm_answer

case "${confirm_answer}" in
  o|O|oui|OUI|Oui)
    ;;
  *)
    echo "Restauration annulee."
    pause
    exit 0
    ;;
esac

timestamp="$(date +"%Y-%m-%dT%H-%M-%S")"
pre_restore="${BACKUP_DIR}/pre-restore-current-${timestamp}.json"

if [ -f "${DATA_FILE}" ]; then
  cp "${DATA_FILE}" "${pre_restore}"
  echo
  echo "Copie de securite creee :"
  echo "${pre_restore}"
fi

cp "${selected}" "${DATA_FILE}"

echo
echo "Restauration terminee."
echo "Donnees restaurees depuis : $(basename "${selected}")"
echo

read -r -p "Relancer le CRM maintenant ? [o/N] " launch_answer
case "${launch_answer}" in
  o|O|oui|OUI|Oui)
    echo
    echo "Relance du CRM..."
    exec ./scripts/launch-v1.sh
    ;;
  *)
    echo
    echo "Tu peux relancer le CRM avec LANCER_CRM_MAC.command."
    pause
    ;;
esac
