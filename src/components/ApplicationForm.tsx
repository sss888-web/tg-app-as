import { useState } from "react";
import WebApp from "@twa-dev/sdk";
import type { Product } from "../data/products";

type Props = {
  product: Product;
  defaultName: string;
  onBack: () => void;
};

export function ApplicationForm({ product, defaultName, onBack }: Props) {
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const submit = () => {
    const trimmedPhone = phone.replace(/\s/g, "");
    if (!name.trim()) {
      WebApp.showAlert("Укажите, как к вам обращаться.");
      return;
    }
    if (trimmedPhone.length < 10) {
      WebApp.showAlert("Введите корректный номер телефона.");
      return;
    }

    const payload = {
      type: "application",
      productId: product.id,
      productTitle: product.title,
      name: name.trim(),
      phone: trimmedPhone,
      amount: amount.trim() || null,
      comment: comment.trim() || null,
      userId: WebApp.initDataUnsafe.user?.id ?? null,
    };

    WebApp.HapticFeedback.notificationOccurred("success");

    if (WebApp.initData) {
      WebApp.sendData(JSON.stringify(payload));
      WebApp.close();
      return;
    }

    const text = [
      `Заявка: ${product.title}`,
      `Имя: ${payload.name}`,
      `Телефон: ${payload.phone}`,
      payload.amount ? `Сумма: ${payload.amount}` : null,
      payload.comment ? `Комментарий: ${payload.comment}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const support = import.meta.env.VITE_SUPPORT_USERNAME as string | undefined;
    if (support) {
      const link = `https://t.me/${support.replace(/^@/, "")}?text=${encodeURIComponent(text)}`;
      WebApp.openTelegramLink(link);
    } else {
      WebApp.showAlert(
        `Заявка сформирована.\n\n${text}\n\nПодключите бота (sendData) или VITE_SUPPORT_USERNAME в .env.`,
      );
    }
  };

  return (
    <div className="screen">
      <button type="button" className="back-link" onClick={onBack}>
        ← Назад
      </button>
      <h2 className="screen__title">Заявка: {product.shortTitle}</h2>
      <p className="hint screen__lead">
        Оставьте контакты — менеджер свяжется с вами и подберёт условия. Это не
        оферта и не гарантия одобрения.
      </p>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label className="field">
          <span className="field__label">Имя</span>
          <input
            className="field__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            autoComplete="name"
          />
        </label>
        <label className="field">
          <span className="field__label">Телефон</span>
          <input
            className="field__input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 000-00-00"
            autoComplete="tel"
          />
        </label>
        <label className="field">
          <span className="field__label">Желаемая сумма (необязательно)</span>
          <input
            className="field__input"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100 000"
          />
        </label>
        <label className="field">
          <span className="field__label">Комментарий</span>
          <textarea
            className="field__input field__textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Срок, цель кредита, марка авто…"
            rows={3}
          />
        </label>
        <button type="submit" className="btn-primary">
          Отправить заявку
        </button>
      </form>
    </div>
  );
}
