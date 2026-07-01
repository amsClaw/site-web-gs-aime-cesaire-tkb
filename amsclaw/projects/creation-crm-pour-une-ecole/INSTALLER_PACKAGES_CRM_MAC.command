#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

pause() {
  echo
  read -r -p "Appuie sur Entree pour fermer cette fenetre..." _ || true
}

echo "=========================================="
echo " Verification packages CRM ecole - Mac"
echo "=========================================="
echo

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js n'est pas installe ou n'est pas disponible dans le PATH."
  echo

  if command -v brew >/dev/null 2>&1; then
    read -r -p "Installer Node.js avec Homebrew maintenant ? [o/N] " install_node
    case "${install_node}" in
      o|O|oui|OUI|Oui)
        echo
        echo "Installation de Node.js..."
        brew install node
        ;;
      *)
        echo
        echo "Installation annulee."
        echo "Installe Node.js, puis relance ce script."
        pause
        exit 1
        ;;
    esac
  else
    echo "Homebrew n'est pas installe."
    echo "Installe Node.js depuis https://nodejs.org puis relance ce script."
    pause
    exit 1
  fi
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm n'est pas disponible."
  echo "Reinstalle Node.js avec npm, puis relance ce script."
  pause
  exit 1
fi

echo "Node.js detecte : $(node --version)"
echo "npm detecte     : $(npm --version)"
echo

if [ ! -f package.json ]; then
  echo "Fichier package.json introuvable."
  echo "Verifie que ce script est bien a la racine du dossier CRM."
  pause
  exit 1
fi

echo "Installation / verification des dependances CRM..."
if [ -f package-lock.json ]; then
  npm install
else
  npm install
fi

echo
echo "Verification du lancement Node..."
node --input-type=module -e "await import('express'); await import('multer'); await import('exceljs');"

echo
echo "Packages CRM prets."
echo "Tu peux lancer le CRM avec LANCER_CRM_MAC.command."
pause
