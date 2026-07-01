#!/bin/bash
# Sync quotidien : vérifie guide CRM + skills référentiel, push si modifiés
# Lancé 1x/jour par cron OpenClaw

set -euo pipefail

# Use gh auth token for git push
GIT_TOKEN=$(gh auth token 2>/dev/null || echo "")
if [ -n "$GIT_TOKEN" ]; then
  export GIT_ASKPASS=/dev/null
fi

CHANGED=0

# --- Guide CRM ---
SRC_GUIDE="/Users/amsfox/.openclaw/workspace/amsclaw/projects/creation-crm-pour-une-ecole/docs"
CLONE_GUIDE="/Users/amsfox/.openclaw/workspace/.sync/crm-ecole-guide"

if [ -f "$SRC_GUIDE/GUIDE_UTILISATEUR_CRM.html" ]; then
  if ! diff -q "$SRC_GUIDE/GUIDE_UTILISATEUR_CRM.html" "$CLONE_GUIDE/index.html" >/dev/null 2>&1 || \
     ! diff -qr "$SRC_GUIDE/guide-utilisateur-assets" "$CLONE_GUIDE/guide-utilisateur-assets" >/dev/null 2>&1; then

    echo "📝 Guide CRM modifié → synchronisation"
    cp "$SRC_GUIDE/GUIDE_UTILISATEUR_CRM.html" "$CLONE_GUIDE/index.html"
    cp -r "$SRC_GUIDE/guide-utilisateur-assets"/* "$CLONE_GUIDE/guide-utilisateur-assets/"
    cd "$CLONE_GUIDE"
    git add -A
    git commit -m "Sync guide CRM $(date '+%Y-%m-%d')"
    git push origin main 2>&1
    echo "✅ Guide CRM mis à jour"
    CHANGED=1
  fi
else
  echo "⚠️  Guide CRM introuvable"
fi

# --- Skills référentiel ---
SRC_SKILLS="/Users/amsfox/.openclaw/workspace/docs/skills-referentiel.html"
CLONE_SKILLS="/Users/amsfox/.openclaw/workspace/.sync/skills-referentiel"

if [ -f "$SRC_SKILLS" ]; then
  if ! diff -q "$SRC_SKILLS" "$CLONE_SKILLS/index.html" >/dev/null 2>&1; then
    echo "📝 Référentiel skills modifié → synchronisation"
    cp "$SRC_SKILLS" "$CLONE_SKILLS/index.html"
    cd "$CLONE_SKILLS"
    git add -A
    git commit -m "Sync référentiel skills $(date '+%Y-%m-%d')"
    git push origin main 2>&1
    echo "✅ Référentiel skills mis à jour"
    CHANGED=1
  fi
else
  echo "⚠️  Référentiel skills introuvable"
fi

if [ "$CHANGED" -eq 0 ]; then
  echo "✅ Rien à synchroniser"
fi
