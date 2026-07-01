#!/bin/bash
# Sync skills-referentiel local -> GitHub Pages
# Compare le fichier HTML, si modifié : push sur GitHub

set -euo pipefail

SRC_FILE="/Users/amsfox/.openclaw/workspace/docs/skills-referentiel.html"
CLONE_DIR="/Users/amsfox/.openclaw/workspace/.sync/skills-referentiel"

if [ ! -f "$SRC_FILE" ]; then
  echo "⚠️  Référentiel source introuvable, skip"
  exit 0
fi

if diff -q "$SRC_FILE" "$CLONE_DIR/index.html" >/dev/null 2>&1; then
  echo "✅ Rien à synchroniser"
  exit 0
fi

echo "📝 Référentiel modifié, synchronisation..."
cp "$SRC_FILE" "$CLONE_DIR/index.html"

cd "$CLONE_DIR"

if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "✅ Aucune différence détectée après copie"
  exit 0
fi

git add -A
git commit -m "Sync référentiel skills $(date '+%Y-%m-%d %H:%M')"
git push origin main 2>&1

echo "✅ Référentiel synchronisé sur GitHub Pages"
echo "https://amsclaw.github.io/skills-referentiel/"
