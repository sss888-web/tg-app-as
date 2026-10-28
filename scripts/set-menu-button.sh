#!/usr/bin/env bash
# Одноразово выставить кнопку меню бота (без запуска polling).
# Использование: BOT_TOKEN=... WEBAPP_URL=https://... ./scripts/set-menu-button.sh

set -euo pipefail

if [[ -z "${BOT_TOKEN:-}" || -z "${WEBAPP_URL:-}" ]]; then
  echo "Нужны BOT_TOKEN и WEBAPP_URL" >&2
  exit 1
fi

URL="${WEBAPP_URL%/}/"

curl -sS "https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d "$(jq -n \
    --arg url "$URL" \
    '{menu_button:{type:"web_app",text:"Учугей займ",web_app:{url:$url}}}')"

echo ""
