# Telegram Mini App — УЧУГЭЙ СЕРВИС

Мини-приложение: **микрозаймы**, **кредиты**, **кредитные карты**, **автокредиты**. Ссылки `lig.su`.

## Локально

```bash
npm install
cp .env.example .env
npm run dev
```

В Telegram Mini App работает только по **HTTPS** (не `localhost` без туннеля).

---

## Схема: GitHub → Vercel + Render

| Часть | Где | Репозиторий |
|-------|-----|-------------|
| Mini App (React) | [Vercel](https://vercel.com) | `https://github.com/sss888-web/tg-app-as` |
| Telegram-бот | [Render](https://render.com) Worker | тот же репозиторий, папка **`bot/`** |

1. Код в **GitHub** — пушите изменения в `master`.
2. **Vercel** — production фронта: **`https://uchugey-servis.vercel.app`** (также работает `https://tg-app-as.vercel.app`) — `npx vercel --prod` или [проект uchugey-servis](https://vercel.com/app-tg/uchugey-servis).
3. **Render** — только бот (см. ниже). В `WEBAPP_URL` укажите **тот же HTTPS**, что на Vercel.

---

## Подключение к боту (@uchugey_xarchy_bot)

### Шаг 1. Собрать и задеплоить приложение

```bash
npm run build
```

Залейте содержимое папки **`dist`** на хостинг с HTTPS, например:

- [Vercel](https://vercel.com): импорт репозитория или `npx vercel --prod` (в корне есть `vercel.json`)
- Netlify, Cloudflare Pages, свой VPS + nginx

Получите URL вида `https://uchugey-zaym.vercel.app` — он понадобится в BotFather и в боте.

### Шаг 2. Привязать Mini App в BotFather

1. Откройте [@BotFather](https://t.me/BotFather).
2. `/mybots` → ваш бот → **Bot Settings** → **Menu Button** → **Configure menu button** → URL = ваш HTTPS (тот же, что `dist`).
3. Либо `/newapp` → выберите бота → укажите название и **тот же HTTPS URL**.

Ссылка для пользователей: `https://t.me/uchugey_xarchy_bot/app` (имя `app` — как в BotFather, если другое — подставьте своё).

### Шаг 3. Бот на Render (из GitHub)

1. [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint** (или **Background Worker** вручную).
2. Подключите репозиторий **`sss888-web/tg-app-as`** (ветка `master`).
3. Если вручную: **Root Directory** = `bot`, **Runtime** = Python, **Start Command** = `python bot.py`, **Build** = `pip install -r requirements.txt`.
4. **Environment** (секреты не коммитить):

   | Переменная | Значение |
   |------------|----------|
   | `BOT_TOKEN` | токен от @BotFather |
   | `WEBAPP_URL` | `https://uchugey-servis.vercel.app` (без слэша в конце — бот сам добавит `/`) |
   | `ADMIN_CHAT_ID` | ваш Telegram ID (заявки менеджеру) |

5. Deploy. После старта бот сам выставит **Menu Button** и по `/start` покажет **кнопку снизу** «Открыть УЧУГЭЙ СЕРВИС».

В корне есть **`render.yaml`** — можно развернуть сервис одним Blueprint.

Локально (для отладки) — тот же код в папке **`bot/`**:

### Шаг 3 (локально). Бот: кнопка и заявки

В репозитории есть простой бот в папке **`bot/`** (python-telegram-bot):

```bash
cd bot
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# заполните BOT_TOKEN, WEBAPP_URL, ADMIN_CHAT_ID (ваш Telegram ID для заявок)
python bot.py
```

Бот:

- ставит **кнопку меню** «Учугей сервис»;
- по `/start` — клавиша «Открыть УЧУГЭЙ СЕРВИС»;
- принимает **`web_app_data`** из формы заявки в Mini App.

Если у вас **уже работает свой бот** на другом коде — перенесите из `bot/bot.py` только:

- `MenuButtonWebApp` + `WEBAPP_URL`;
- обработчик `filters.StatusUpdate.WEB_APP_DATA`.

Без polling можно только выставить меню:

```bash
BOT_TOKEN=... WEBAPP_URL=https://... ./scripts/set-menu-button.sh
```

### Шаг 4. Проверка

1. Откройте бота в Telegram → кнопка меню или `/start` → Mini App.
2. Ссылки на банки открываются через `WebApp.openLink`.
3. Форма заявки (разделы с «Заявка») шлёт JSON в бот через `sendData` — только если приложение открыто **из бота**, не из браузера.

### Переменные фронта (`.env`)

| Переменная | Назначение |
|------------|------------|
| `VITE_CHANNEL_URL` | Ссылка на канал |
| `VITE_SUPPORT_USERNAME` | Fallback: чат менеджера, если открыли не из бота |
| `VITE_BOT_USERNAME` | Имя бота для подсказок (опционально) |

---

## Данные

- Микрозаймы: `src/data/offers.ts`, логотипы в `public/offers/`
- Кредиты: `src/data/consumerLoans.ts`, `consumerLoanCopy.ts`, `public/loans/`
- Карты: `src/data/creditCards.ts`, `public/cards/`
- Авто: `src/data/autoLoans.ts`, `public/auto/`

Документация Telegram: [Mini Apps](https://core.telegram.org/bots/webapps).
