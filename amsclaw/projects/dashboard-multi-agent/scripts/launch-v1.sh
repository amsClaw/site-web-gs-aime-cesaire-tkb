#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE_DIR="$(cd "$PROJECT_DIR/../../.." && pwd)"

"$WORKSPACE_DIR/amsclaw/dashboard/launch-dashboard.sh"
