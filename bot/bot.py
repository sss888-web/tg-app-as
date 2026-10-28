"""
Бот для @uchugey_xarchy_bot (или вашего): кнопка Mini App и заявки из WebApp.sendData.

Переменные окружения:
  BOT_TOKEN      — токен от @BotFather
  WEBAPP_URL     — HTTPS URL собранного приложения (index.html)
  ADMIN_CHAT_ID  — (опционально) куда слать заявки; иначе — в чат пользователя
"""

import json
import logging
import os

from telegram import KeyboardButton, MenuButtonWebApp, ReplyKeyboardMarkup, Update, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

TOKEN = os.environ["BOT_TOKEN"]
WEBAPP_URL = os.environ["WEBAPP_URL"].rstrip("/") + "/"
ADMIN_CHAT_ID = os.environ.get("ADMIN_CHAT_ID")


def format_application(data: dict) -> str:
    lines = [
        "📩 Заявка из Mini App",
        f"Продукт: {data.get('productTitle', '—')}",
        f"Имя: {data.get('name', '—')}",
        f"Телефон: {data.get('phone', '—')}",
    ]
    if data.get("amount"):
        lines.append(f"Сумма: {data['amount']}")
    if data.get("comment"):
        lines.append(f"Комментарий: {data['comment']}")
    if data.get("userId"):
        lines.append(f"Telegram ID: {data['userId']}")
    return "\n".join(lines)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = ReplyKeyboardMarkup(
        [
            [
                KeyboardButton(
                    text="🟢 Открыть УЧУГЭЙ ЗАЙМ",
                    web_app=WebAppInfo(url=WEBAPP_URL),
                )
            ]
        ],
        resize_keyboard=True,
    )
    await update.effective_message.reply_text(
        "Подбор микрозаймов, кредитов, карт и автокредитов — в приложении ниже.",
        reply_markup=keyboard,
    )


async def web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    raw = update.effective_message.web_app_data.data
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        data = {"raw": raw}

    text = format_application(data) if data.get("type") == "application" else f"Данные из Mini App:\n{raw}"

    if ADMIN_CHAT_ID:
        await context.bot.send_message(chat_id=int(ADMIN_CHAT_ID), text=text)
        await update.effective_message.reply_text("Заявка отправлена. Мы свяжемся с вами.")
    else:
        await update.effective_message.reply_text(
            f"{text}\n\n—\nЗаявка принята. Укажите ADMIN_CHAT_ID в боте, чтобы слать заявки менеджеру.",
        )


async def post_init(application: Application) -> None:
    await application.bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(
            text="Учугей займ",
            web_app=WebAppInfo(url=WEBAPP_URL),
        )
    )
    log.info("Menu button → %s", WEBAPP_URL)


def main() -> None:
    app = (
        Application.builder()
        .token(TOKEN)
        .post_init(post_init)
        .build()
    )
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, web_app_data))
    log.info("Bot polling…")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
