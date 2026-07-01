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
echo " Reinitialisation des donnees CRM ecole"
echo "=========================================="
echo
echo "Ce script va vider les donnees courantes du CRM :"
echo "- eleves ;"
echo "- classes ;"
echo "- utilisateurs ;"
echo "- commentaires ;"
echo "- photos."
echo
echo "Les sauvegardes deja presentes dans data/backups/ seront conservees."
echo "Une nouvelle sauvegarde de securite sera creee avant reinitialisation."
echo

read -r -p "Continuer ? [o/N] " start_answer
case "${start_answer}" in
  o|O|oui|OUI|Oui)
    ;;
  *)
    echo "Reinitialisation annulee."
    pause
    exit 0
    ;;
esac

RUNNING_PIDS="$(lsof -tiTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"
if [ -n "${RUNNING_PIDS}" ]; then
  echo
  echo "Le serveur CRM semble encore ouvert sur le port ${PORT}."
  echo "Il faut l'arreter avant de reinitialiser les donnees."
  echo
  read -r -p "Arreter le serveur maintenant ? [o/N] " stop_answer
  case "${stop_answer}" in
    o|O|oui|OUI|Oui)
      echo "Arret du serveur..."
      kill ${RUNNING_PIDS} 2>/dev/null || true
      sleep 2
      ;;
    *)
      echo "Reinitialisation annulee. Relance ce script apres avoir arrete le serveur."
      pause
      exit 1
      ;;
  esac
fi

echo
echo "Derniere confirmation obligatoire."
echo "Pour vider les donnees, tape exactement : VIDER TOUT"
read -r -p "> " confirm_text

if [ "${confirm_text}" != "VIDER TOUT" ]; then
  echo "Texte de confirmation incorrect. Reinitialisation annulee."
  pause
  exit 0
fi

mkdir -p "${BACKUP_DIR}"

timestamp="$(date +"%Y-%m-%dT%H-%M-%S")"
pre_reset="${BACKUP_DIR}/pre-reset-current-${timestamp}.json"

if [ -f "${DATA_FILE}" ]; then
  cp "${DATA_FILE}" "${pre_reset}"
  echo
  echo "Sauvegarde de securite creee :"
  echo "${pre_reset}"
else
  echo
  echo "Aucun fichier ${DATA_FILE} existant. Creation d'un fichier neuf."
fi

cat > "${DATA_FILE}" <<JSON
{
  "metadata": {
    "name": "CRM ecole GS AIME CESAIRE TKB",
    "version": "0.1.0",
    "updatedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  },
  "users": [],
  "classes": [],
  "students": []
}
JSON

echo
echo "Reinitialisation terminee."
echo "Au prochain lancement, le CRM recreera seulement les comptes de connexion de demarrage."
echo "Aucune classe ni aucun eleve ne sera recree automatiquement."
echo
echo "Compte de test admin : admin_test"
echo "Mot de passe : demo2026"
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
