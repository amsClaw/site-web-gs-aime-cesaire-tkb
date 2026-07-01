#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-8791}"
LOCAL_URL="http://127.0.0.1:${PORT}"

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "cloudflared n'est pas installe."
  echo "Installation recommandee : brew install cloudflared"
  read -r -p "Appuyez sur Entree pour fermer..."
  exit 1
fi

if ! curl -fsS "${LOCAL_URL}/api/health" >/dev/null 2>&1; then
  echo "Le CRM ne semble pas demarre sur ${LOCAL_URL}."
  echo
  echo "Etape 1 : lance d'abord LANCER_CRM_MAC.command"
  echo "Etape 2 : relance ensuite ce script pour obtenir le lien de test distant."
  echo
  read -r -p "Appuyez sur Entree pour fermer..."
  exit 1
fi

echo "Tunnel Cloudflare temporaire vers le CRM ecole."
echo
echo "URL locale du CRM : ${LOCAL_URL}"
echo "Quand le lien public apparait, envoie uniquement l'URL https://...trycloudflare.com au testeur."
echo
echo "Regles de test :"
echo "- utiliser un compte de test ;"
echo "- eviter les donnees sensibles/reelles pendant les premieres sessions ;"
echo "- fermer cette fenetre pour couper le lien distant apres la session."
echo

cloudflared tunnel --url "${LOCAL_URL}"

