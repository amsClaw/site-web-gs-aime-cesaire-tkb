#!/bin/bash
# Sync CRM guide utilisateur local -> GitHub Pages
# Compare le guide + assets, si modifié : push sur GitHub

set -euo pipefail

GUIDE_SRC="/Users/amsfox/.openclaw/workspace/amsclaw/projects/creation-crm-pour-une-ecole/docs"
CLONE_DIR="/Users/amsfox/.openclaw/workspace/.sync/crm-ecole-guide"

# Vérifier si le guide source existe
if [ ! -f "$GUIDE_SRC/GUIDE_UTILISATEUR_CRM.html" ]; then
  echo "⚠️  Guide source introuvable, skip"
  exit 0
fi

# Comparer le fichier HTML
if ! diff -q "$GUIDE_SRC/GUIDE_UTILISATEUR_CRM.html" "$CLONE_DIR/index.html" >/dev/null 2>&1; then
  echo "📝 Guide HTML modifié, synchronisation..."
else
  # Comparer les assets
  if diff -qr "$GUIDE_SRC/guide-utilisateur-assets" "$CLONE_DIR/guide-utilisateur-assets" >/dev/null 2>&1; then
    echo "✅ Rien à synchroniser"
    exit 0
  fi
  echo "📝 Assets modifiés, synchronisation..."
fi

# Copier les fichiers
cp "$GUIDE_SRC/GUIDE_UTILISATEUR_CRM.html" "$CLONE_DIR/index.html"
cp -r "$GUIDE_SRC/guide-utilisateur-assets"/* "$CLONE_DIR/guide-utilisateur-assets/"

cd "$CLONE_DIR"

# Vérifier s'il y a vraiment des changements
if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "✅ Aucune différence détectée après copie"
  exit 0
fi

git add -A
git commit -m "Sync guide utilisateur $(date '+%Y-%m-%d %H:%M')"
git push origin main 2>&1

echo "✅ Guide synchronisé sur GitHub Pages"
